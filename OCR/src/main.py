 
import json
import uvicorn
 

from fastapi import FastAPI, File, UploadFile , HTTPException,Form,Request
from fastapi.responses import JSONResponse, StreamingResponse, FileResponse
import requests
import time
import os
import cv2
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from tempfile import NamedTemporaryFile


# from transformers import DetrImageProcessor, DetrForObjectDetection
from PIL import Image
import requests


api = FastAPI()

file_path = '/app/secrets.json'

if os.path.exists(file_path):
    print(f"File exists: {file_path}")
else:
    print(f"File does not exist: {file_path}")
    
# secrets.json 파일을 열고 정보를 불러옵니다.
with open('src/secrets.json', 'r') as f:
    secrets = json.load(f)

# secrets 내용을 출력하여 확인합니다. (필요한 경우)
# print(secrets)


# CLIENT_ID = secrets["CLIENT_ID"]  # Your Client ID
CLIENT_SECRET = secrets["CLIENT_SECRET"]  # Your Client Secret
API_URL = secrets["API_URL"]  
 
 
print('apiurl   '+API_URL)
print('secret   '+CLIENT_SECRET)


################################################################
def reorderPts(pts): # 꼭지점 순서 정렬
    idx = np.lexsort((pts[:, 1], pts[:, 0]))  # 칼럼0 -> 칼럼1 순으로 정렬한 인덱스를 반환
    pts = pts[idx]  # x좌표로 정렬
    
    if pts[0, 1] > pts[1, 1]:
        pts[[0, 1]] = pts[[1, 0]] # 스와핑

    if pts[2, 1] < pts[3, 1]:
        pts[[2, 3]] = pts[[3, 2]] # 스와핑

    return pts

def detect_and_save_business_card(image):
    # 이미지를 numpy 배열로 변환
    nparr = np.frombuffer(image.file.read(), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 출력 영상 설정
    dw, dh = 720, 400
    srcQuad = np.array([[0, 0], [0, 0], [0, 0], [0, 0]], np.float32)
    dstQuad = np.array([[0, 0], [0, dh], [dw, dh], [dw, 0]], np.float32)
    dst = np.zeros((dh, dw), np.uint8)

    # 입력 영상 전처리
    src_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, src_bin = cv2.threshold(src_gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # 외곽선 검출 및 명함 검출
    contours, _ = cv2.findContours(src_bin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    for pts in contours:
        # 너무 작은 객체는 무시
        if cv2.contourArea(pts) < 1000:
            continue

        # 외곽선 근사화
        approx = cv2.approxPolyDP(pts, cv2.arcLength(pts, True)*0.02, True)

        # 컨벡스가 아니고, 사각형이 아니면 무시
        if not cv2.isContourConvex(approx) or len(approx) != 4:
            continue

        # 명함의 꼭지점을 찾은 후에 꼭지점을 정렬하고 원근 변환 행렬 계산
        srcQuad = reorderPts(approx.reshape(4, 2).astype(np.float32))

    pers = cv2.getPerspectiveTransform(srcQuad, dstQuad)
    dst = cv2.warpPerspective(img, pers, (dw, dh))

    # 임시 파일로 저장
    temp_output_file = NamedTemporaryFile(delete=False, suffix='.png')
    cv2.imwrite(temp_output_file.name, dst)

    return temp_output_file
###########################################



# CORS 미들웨어 설정
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 여기에 허용할 출처를 명시합니다.
    allow_credentials=True,
    allow_methods=["*"],  # 허용할 HTTP 메소드
    allow_headers=["*"],  # 허용할 헤더
)

@api.post("/process_ocr")

async def process_ocr(file: bytes = File(...), message: str = Form(...)):
    headers = {'X-OCR-SECRET': CLIENT_SECRET}
    files = {'file': ('filename', file, 'image/jpeg')}
    data = {'message': message}
    response = requests.post(API_URL, headers=headers, files=files, data=data)

    if response.status_code == 200:
        return JSONResponse(content=response.json())
    else:
        return JSONResponse(status_code=response.status_code, content={"message": "OCR 처리 실패"})


@api.post("/process_image/scanv2/")
async def process_image(image: UploadFile = File(...)):
    try:
        # 이미지를 읽어옴
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_color = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # 이미지 흑백 변환
        img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
        
        # 이미지 이진화
        ret, img_binary = cv2.threshold(img_gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        
        # 가우시안 블러를 통한 노이즈 제거
        img_blur = cv2.GaussianBlur(img_binary, (5, 5), 0)
        
        # 케니 엣지 검출
        edges = cv2.Canny(img_blur, 50, 150)
        
        # 윤곽선 찾기
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for idx, contour in enumerate(contours):
            # 윤곽선의 영역 계산
            area = cv2.contourArea(contour)

            # 일정 크기 이상의 영역만 저장
            if area > 1000:
                # 윤곽선이 그려진 부분만 잘라내기
                x, y, w, h = cv2.boundingRect(contour)
                contour_area = img_color[y:y+h, x:x+w]
                
                # 이미지를 JPEG 형식으로 인코딩하여 전송
                retval, buffer = cv2.imencode('.jpg', contour_area)
                io_buf = BytesIO(buffer)
                return StreamingResponse(io_buf, media_type="image/jpeg")
        
        raise HTTPException(status_code=400, detail="No contour area found")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@api.post("/process_image/scanv3/")
async def process_image(image: UploadFile = File(...)):
    output_file = detect_and_save_business_card(image)
    return FileResponse(output_file.name)


@api.post("/process_image/scanv4/")
async def process_image(image: UploadFile = File(...)):
    try:
        # 이미지를 읽어옴
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_color = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # 이미지 흑백 변환
        img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
        
        # 이미지 이진화
        ret, img_binary = cv2.threshold(img_gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        
        # 가우시안 블러를 통한 노이즈 제거
        img_blur = cv2.GaussianBlur(img_binary, (5, 5), 0)
        
        # 케니 엣지 검출
        edges = cv2.Canny(img_blur, 50, 150)
        
        # 윤곽선 찾기
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for idx, contour in enumerate(contours):
            # 윤곽선의 영역 계산
            area = cv2.contourArea(contour)

            # 일정 크기 이상의 영역만 저장
            if area > 1000:
                # 꼭지점 검출
                epsilon = 0.1 * cv2.arcLength(contour, True)
                approx = cv2.approxPolyDP(contour, epsilon, True)
                
                if len(approx) == 4:  # 꼭지점이 4개인 경우
                    # 꼭지점 좌표를 배열로 변환
                    pts = np.float32([point[0] for point in approx])
                    
                    # 꼭지점 좌표 정렬
                    rect = np.zeros((4, 2), dtype="float32")
                    s = pts.sum(axis=1)
                    rect[0] = pts[np.argmin(s)]
                    rect[2] = pts[np.argmax(s)]
                    diff = np.diff(pts, axis=1)
                    rect[1] = pts[np.argmin(diff)]
                    rect[3] = pts[np.argmax(diff)]
                    
                    # 원근 변환을 위한 좌표 설정
                    pts1 = rect
                    pts2 = np.float32([[0, 0], [500, 0], [500, 300], [0, 300]])
                    
                    # 원근 변환 행렬 계산
                    matrix = cv2.getPerspectiveTransform(pts1, pts2)
                    
                    # 원근 변환 적용
                    result = cv2.warpPerspective(img_color, matrix, (500, 300))
                    
                    # 이미지를 JPEG 형식으로 인코딩하여 전송
                    retval, buffer = cv2.imencode('.jpg', result)
                    io_buf = BytesIO(buffer)
                    return StreamingResponse(io_buf, media_type="image/jpeg")
        
        raise HTTPException(status_code=400, detail="No contour area found")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# def calculate_max_width_height(src_quad):
#     # Calculate width
#     width_a = np.sqrt((src_quad[0][0] - src_quad[1][0]) ** 2 + (src_quad[0][1] - src_quad[1][1]) ** 2)
#     width_b = np.sqrt((src_quad[3][0] - src_quad[2][0]) ** 2 + (src_quad[3][1] - src_quad[2][1]) ** 2)
#     max_width = max(width_a, width_b)
#     # Calculate height
#     height_a = np.sqrt((src_quad[0][0] - src_quad[3][0]) ** 2 + (src_quad[0][1] - src_quad[3][1]) ** 2)
#     height_b = np.sqrt((src_quad[1][0] - src_quad[2][0]) ** 2 + (src_quad[1][1] - src_quad[2][1]) ** 2)
#     max_height = max(height_a, height_b)
#     return max_width, max_height


# @app.post("/process_business_card/")
# async def process_business_card(file: UploadFile = File(...)):
#     # 파일을 메모리에 저장
#     contents = await file.read()
    
#     # OCR 요청 데이터 준비
#     request_json = {
#         'images': [{'format': file.content_type.split('/')[-1].upper(), 'name': 'string'}],
#         'requestId': str(uuid.uuid4()),
#         'version': 'V2',
#         'timestamp': int(time.time() * 1000)
#     }
    
#     # payload = {'message': json.dumps(request_json).encode('UTF-8')}
#     # files = [('file', (file.filename, contents, file.content_type))]
#     headers = {'X-OCR-SECRET': CLIENT_SECRET}
#     files = {
#         'file': (file.filename, contents, file.content_type),
#         'message': (None, json.dumps(request_json), 'application/json')
#     }
#     # OCR API로 요청 전송
#     response = requests.post(API_URL, headers=headers, files=files)
#     # 응답 처리
#     if response.status_code == 200:
#         ocr_result = response.json()
#         # OCR 결과를 문자열로 보기 좋게 출력하기 위해 json.dumps() 사용
#         print('OCR 결과: ' + json.dumps(ocr_result, ensure_ascii=False, indent=2))
        
#         # OCR 결과를 원하는 형태로 가공
#         text_results = " ".join(
#             [field['inferText']
#             for image in ocr_result['images']
#                 for field in image.get('fields', [])]
#         )
        
#         return JSONResponse(content={"OCR 결과": text_results}, status_code=200)

#     else:
#         # 실패시 HTTPException 대신 JSONResponse를 사용하여 오류 메시지 반환
#         return JSONResponse(content={"error": "OCR 서비스 처리 실패", "details": response.text}, status_code=response.status_code)

# HUGGINGFACEHUB_API_TOKEN = secrets["HUGGINGFACEHUB_API_TOKEN"]  
# print('tokkkkkkkkk  '+HUGGINGFACEHUB_API_TOKEN)

# import json
# import requests
# import time
# import cv2
 
 
# # token_access = "<your token access>"

# headers = {"Authorization": f"Bearer {HUGGINGFACEHUB_API_TOKEN}"}

# API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50"

# def query(filename):
#     with open(filename, "rb") as f:
#         data = f.read()
#     while True:
#       try:
#           time.sleep(1)
#           response = requests.request("POST", API_URL, headers=headers, data=data)
#           break

#       except Exception:
#           continue

#     return json.loads(response.content.decode("utf-8"))

# data = query("savana.jpg")

# print(data)





# from transformers import AutoModelForImageSegmentation, AutoFeatureExtractor
# from tensorflow.keras.models import load_model

# import torch
# from PIL import Image, ImageDraw
# import requests
# import numpy as np

# from tensorflow.keras.layers import Conv2DTranspose
# from tensorflow.keras.utils import CustomObjectScope


# from huggingface_hub import notebook_login

# notebook_login()

  
 
# import cv2
# import numpy as np
# import tensorflow as tf

# # 객체 감지 모델 로드
# model = tf.keras.models.load_model('card_detection_model.h5')

# # 입력 이미지 로드
# image = cv2.imread('src/backgroundcard.jpg')

# # 이미지 크기 조정 및 전처리
# resized_image = cv2.resize(image, (256, 256))
# preprocessed_image = resized_image / 255.0  # 정규화

# # 객체 감지 수행
# predictions = model.predict(np.expand_dims(preprocessed_image, axis=0))

# # 신뢰도 임계값 설정
# confidence_threshold = 0.5

# # predictions 배열의 구조 확인
# print(predictions.shape)
# print(predictions)

# # 예측 결과 처리
# for prediction in predictions[0]:  # 첫 번째 차원이 배치 크기를 나타내는 경우
#     # class_index = int(prediction[4])
#     class_index = int(prediction[0][0])
#     # confidence = prediction[2]
#     confidence = prediction[0][0]
    
#     if class_index == 0 and confidence > confidence_threshold:
#         box = prediction[0:4] * [image.shape[1], image.shape[0], image.shape[1], image.shape[0]]
#         (startX, startY, endX, endY) = box.astype("int")
#         business_card = image[startY:endY, startX:endX]
#         cv2.imwrite('business_card_extracted.jpg', business_card)

  

# image = Image.open("IMAGE_PATH")

# processor = DetrImageProcessor.from_pretrained("TahaDouaji/detr-doc-table-detection")
# model = DetrForObjectDetection.from_pretrained("TahaDouaji/detr-doc-table-detection")

# inputs = processor(images=image, return_tensors="pt")
# outputs = model(**inputs)

# # convert outputs (bounding boxes and class logits) to COCO API
# # let's only keep detections with score > 0.9
# target_sizes = torch.tensor([image.size[::-1]])
# results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

# for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
#     box = [round(i, 2) for i in box.tolist()]
#     print(
#             f"Detected {model.config.id2label[label.item()]} with confidence "
#             f"{round(score.item(), 3)} at location {box}"
#     )

if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=8000)
