 
import json
import uvicorn
 

from fastapi import FastAPI, File, UploadFile , HTTPException,Form,Request
from fastapi.responses import JSONResponse
import requests
import uuid
import time
import os
from fastapi.middleware.cors import CORSMiddleware


from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
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

# CORS 미들웨어 설정
api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://example.com", "https://example2.com"],  # 여기에 허용할 출처를 명시합니다.
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

HUGGINGFACEHUB_API_TOKEN = secrets["HUGGINGFACEHUB_API_TOKEN"]  
print('tokkkkkkkkk  '+HUGGINGFACEHUB_API_TOKEN)

import json
import requests
import time
import cv2
 
# token_access = "<your token access>"

headers = {"Authorization": f"Bearer {HUGGINGFACEHUB_API_TOKEN}"}

API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50"

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    while True:
      try:
          time.sleep(1)
          response = requests.request("POST", API_URL, headers=headers, data=data)
          break

      except Exception:
          continue

    return json.loads(response.content.decode("utf-8"))

data = query("savana.jpg")

print(data)



from transformers import AutoModelForImageSegmentation, AutoFeatureExtractor
from tensorflow.keras.models import load_model

import torch
from PIL import Image, ImageDraw
import requests
import numpy as np

from tensorflow.keras.layers import Conv2DTranspose
from tensorflow.keras.utils import CustomObjectScope


from huggingface_hub import notebook_login

notebook_login()

  
 
import cv2
import numpy as np
import tensorflow as tf

# 객체 감지 모델 로드
model = tf.keras.models.load_model('card_detection_model.h5')

# 입력 이미지 로드
image = cv2.imread('src/backgroundcard.jpg')

# 이미지 크기 조정 및 전처리
resized_image = cv2.resize(image, (256, 256))
preprocessed_image = resized_image / 255.0  # 정규화

# 객체 감지 수행
predictions = model.predict(np.expand_dims(preprocessed_image, axis=0))

# 신뢰도 임계값 설정
confidence_threshold = 0.5

# predictions 배열의 구조 확인
print(predictions.shape)
print(predictions)

# 예측 결과 처리
for prediction in predictions[0]:  # 첫 번째 차원이 배치 크기를 나타내는 경우
    # class_index = int(prediction[4])
    class_index = int(prediction[0][0])
    # confidence = prediction[2]
    confidence = prediction[0][0]
    
    if class_index == 0 and confidence > confidence_threshold:
        box = prediction[0:4] * [image.shape[1], image.shape[0], image.shape[1], image.shape[0]]
        (startX, startY, endX, endY) = box.astype("int")
        business_card = image[startY:endY, startX:endX]
        cv2.imwrite('business_card_extracted.jpg', business_card)

  

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
