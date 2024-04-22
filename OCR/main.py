#
# import io
# import time
# import sys
# import re
# import numpy as np
# import platform
# from PIL import ImageFont, ImageDraw, Image
# from matplotlib import pyplot as plt
import json
#
# import cv2
# from azure.cognitiveservices.vision.computervision import ComputerVisionClient
# from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
# from msrest.authentication import CognitiveServicesCredentials
# from azure.core.credentials import AzureKeyCredential
#
#
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.responses import JSONResponse
# import uvicorn
# from typing import List
#
# from azure.ai.formrecognizer import FormRecognizerClient
#
#
# def plt_imshow(title='image', img=None, figsize=(8, 5)):
#     plt.figure(figsize=figsize)
#
#     if type(img) == list:
#         if type(title) == list:
#             titles = title
#         else:
#             titles = []
#
#             for i in range(len(img)):
#                 titles.append(title)
#
#         for i in range(len(img)):
#             if len(img[i].shape) <= 2:
#                 rgbImg = cv2.cvtColor(img[i], cv2.COLOR_GRAY2RGB)
#             else:
#                 rgbImg = cv2.cvtColor(img[i], cv2.COLOR_BGR2RGB)
#
#             plt.subplot(1, len(img), i + 1), plt.imshow(rgbImg)
#             plt.title(titles[i])
#             plt.xticks([]), plt.yticks([])
#
#         plt.show()
#     else:
#         if len(img.shape) < 3:
#             rgbImg = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
#         else:
#             rgbImg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#
#         plt.imshow(rgbImg)
#         plt.title(title)
#         plt.xticks([]), plt.yticks([])
#         plt.show()
#
#
# def put_text(image, text, x, y, color=(0, 255, 0), font_size=22):
#     if type(image) == np.ndarray:
#         color_coverted = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         image = Image.fromarray(color_coverted)
#
#     if platform.system() == 'Darwin':
#         font = 'AppleGothic.ttf'
#     elif platform.system() == 'Windows':
#         font = 'malgun.ttf'
#
#     image_font = ImageFont.truetype(font, font_size)
#     font = ImageFont.load_default()
#     draw = ImageDraw.Draw(image)
#
#     draw.text((x, y), text, font=image_font, fill=color)
#
#     numpy_image = np.array(image)
#     opencv_image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)
#
#     return opencv_image
#
#
# # secrets.json 파일을 열고 정보를 불러옵니다.
# with open('secrets.json', 'r') as f:
#     secrets = json.load(f)
#
# SUBSCRIPTION_KEY = secrets["SUBSCRIPTION_KEY"]
# ENDPOINT_URL = secrets["ENDPOINT_URL"]
#
#
#
# computervision_client = ComputerVisionClient(ENDPOINT_URL, CognitiveServicesCredentials(SUBSCRIPTION_KEY))
# form_recognizer_client = FormRecognizerClient(endpoint=ENDPOINT_URL, credential=AzureKeyCredential(SUBSCRIPTION_KEY))
#
#
# path = 'sampleimage/kim.jpg'
# imageData = open(path, "rb").read()
# sbuf = io.BytesIO(imageData)
#
# response = computervision_client.read_in_stream(sbuf, raw=True)
# operationLocation = response.headers["Operation-Location"]
# operationID = operationLocation.split("/")[-1]
#
# # 이메일 주소를 저장할 리스트
# emails = []
# email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
#
#
# async def extract_business_card_info(image_data):
#     # Form Recognizer 서비스 키와 엔드포인트를 설정합니다.
#     key = SUBSCRIPTION_KEY
#     endpoint = ENDPOINT_URL
#
#      # Form Recognizer 비동기 클라이언트 생성
#     form_recognizer_client = FormRecognizerClient(endpoint=endpoint, credential=AzureKeyCredential(key))
#     try:
#         # 이미지 데이터로부터 명함 정보를 비동기적으로 추출
#         poller = await form_recognizer_client.begin_recognize_business_cards(image_data)
#         business_cards = await poller.result()
#
#         extracted_info = {"ContactNames": [], "Emails": [], "PhoneNumbers": []}
#
#         for business_card in business_cards:
#             contact_names = business_card.fields.get("ContactNames")
#             if contact_names:
#                 for name in contact_names.value:
#                     extracted_info["ContactNames"].append(name.value_data.text)
#
#             emails = business_card.fields.get("Emails")
#             if emails:
#                 for email in emails.value:
#                     extracted_info["Emails"].append(email.value_data.text)
#
#             phones = business_card.fields.get("PhoneNumbers")
#             if phones:
#                 for phone in phones.value:
#                     extracted_info["PhoneNumbers"].append(phone.value_data.text)
#
#         return extracted_info
#     finally:
#         # 클라이언트 리소스를 명시적으로 해제
#          form_recognizer_client.close()
#
#
# # 이미지 처리 및 텍스트 추출 함수
# async def process_image(image_data):
#     emails = []
#     info = []
#     email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
#
#     sbuf = io.BytesIO(image_data)
#     response = computervision_client.read_in_stream(sbuf, raw=True)
#     operation_location = response.headers["Operation-Location"]
#     operation_id = operation_location.split("/")[-1]
#
#     # 분석할 시각적 특징
#     # visual_features = ["Categories", "Description", "Objects", "Tags", "Faces", "Brands"]
#
#     while True:
#         read_result = computervision_client.get_read_result(operation_id)
#         # analysis = computervision_client.analyze_image(image_data, visual_features=visual_features)
#
#         if read_result.status not in ['notStarted', 'running']:
#             break
#         time.sleep(1)
#
#     if read_result.status == "succeeded":
#         img = Image.open(io.BytesIO(image_data))
#         img_np = np.array(img)
#         roi_img = img_np.copy()
#
#         for text_result in read_result.analyze_result.read_results:
#             for line in text_result.lines:
#                 text = line.text
#                 info.append(text)
#
#                 box = list(map(int, line.bounding_box))
#                 (tlX, tlY, trX, trY, brX, brY, blX, blY) = box
#                 pts = ((tlX, tlY), (trX, trY), (brX, brY), (blX, blY))
#
#                 topLeft = pts[0]
#
#                 roi_img = put_text(roi_img, text, topLeft[0], topLeft[1] - 10, font_size=30)
#                 found_emails = re.findall(email_regex, text)
#                 emails.extend(found_emails)
#
#     return emails, roi_img,info,info
#
#
# app = FastAPI()
#
#
# @app.post("/ocr/extract/")
# async def extract_emails(file: UploadFile = File(...)):
#     if file.content_type not in ["image/jpeg", "image/png"]:
#         raise HTTPException(status_code=400, detail="지원되지 않는 파일 형식입니다.")
#
#     image_data = await file.read()
#     emails, processed_image,info,analysis = await process_image(image_data)
#     infos = await extract_business_card_info(image_data)
#
#     print(info)
#     print(emails)
#     print(infos)
#
#     # return {"emails": emails , "info": info, "images":analysis}
#     return {"emails": emails , "info": info,"infos":infos}
#
#
# 
#
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
#

from fastapi import FastAPI, File, UploadFile , HTTPException
from fastapi.responses import JSONResponse
import requests
import uuid
import time

app = FastAPI()

# secrets.json 파일을 열고 정보를 불러옵니다.
with open('secrets.json', 'r') as f:
    secrets = json.load(f)


# CLIENT_ID = secrets["CLIENT_ID"]  # Your Client ID
CLIENT_SECRET = secrets["CLIENT_SECRET"]  # Your Client Secret
API_URL = secrets["API_URL"]  
 
 
print('apiurl   '+API_URL)
print('secret   '+CLIENT_SECRET)
 
# print('secret'+CLIENT_SECRET)

# @app.post("/recognize")
# async def recognize_business_card(file: UploadFile = File(...)):
#     headers = {
#         'X-OCR-SECRET': CLIENT_SECRET,
#     }
    
#     files = {'file': (file.filename, await file.read(), file.content_type)}
#     response = requests.post(API_URL, headers=headers, files=files)
#     try:
#         return JSONResponse(status_code=response.status_code, content=response.json())
#     except ValueError:  # JSON 디코딩 에러 처리
#         return JSONResponse(status_code=500, content={"message": "Server error"})

@app.post("/process_business_card/")
async def process_business_card(file: UploadFile = File(...)):
    # 파일을 메모리에 저장
    contents = await file.read()
    
    # OCR 요청 데이터 준비
    request_json = {
        'images': [{'format': file.content_type.split('/')[-1].upper(), 'name': 'string'}],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(time.time() * 1000)
    }
    
    # payload = {'message': json.dumps(request_json).encode('UTF-8')}
    # files = [('file', (file.filename, contents, file.content_type))]
    headers = {'X-OCR-SECRET': CLIENT_SECRET}
    files = {
        'file': (file.filename, contents, file.content_type),
        'message': (None, json.dumps(request_json), 'application/json')
    }
    # OCR API로 요청 전송
    response = requests.post(API_URL, headers=headers, files=files)
    
     # 응답 처리
    if response.status_code == 200:
        ocr_result = response.json()
        print('ocrrrrrrrrrrrr'+ocr_result)
        # OCR 결과를 원하는 형태로 가공
        text_results = " ".join(
            [field['inferText'] 
             for image in ocr_result['images'] 
                 for field in image.get('fields', [])]
        )
        return JSONResponse(content={"OCR 결과": text_results}, status_code=200)
    
    else:
        # 실패시 HTTPException 대신 JSONResponse를 사용하여 오류 메시지 반환
        return JSONResponse(content={"error": "OCR 서비스 처리 실패", "details": response.text}, status_code=response.status_code)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
