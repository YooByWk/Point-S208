
import io
import time
import sys
import re
import numpy as np
import platform
from PIL import ImageFont, ImageDraw, Image
from matplotlib import pyplot as plt
import json

import cv2
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials
from azure.core.credentials import AzureKeyCredential


from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import uvicorn
from typing import List

from azure.ai.formrecognizer import FormRecognizerClient


def plt_imshow(title='image', img=None, figsize=(8, 5)):
    plt.figure(figsize=figsize)

    if type(img) == list:
        if type(title) == list:
            titles = title
        else:
            titles = []

            for i in range(len(img)):
                titles.append(title)

        for i in range(len(img)):
            if len(img[i].shape) <= 2:
                rgbImg = cv2.cvtColor(img[i], cv2.COLOR_GRAY2RGB)
            else:
                rgbImg = cv2.cvtColor(img[i], cv2.COLOR_BGR2RGB)

            plt.subplot(1, len(img), i + 1), plt.imshow(rgbImg)
            plt.title(titles[i])
            plt.xticks([]), plt.yticks([])

        plt.show()
    else:
        if len(img.shape) < 3:
            rgbImg = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        else:
            rgbImg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        plt.imshow(rgbImg)
        plt.title(title)
        plt.xticks([]), plt.yticks([])
        plt.show()


def put_text(image, text, x, y, color=(0, 255, 0), font_size=22):
    if type(image) == np.ndarray:
        color_coverted = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(color_coverted)

    if platform.system() == 'Darwin':
        font = 'AppleGothic.ttf'
    elif platform.system() == 'Windows':
        font = 'malgun.ttf'

    image_font = ImageFont.truetype(font, font_size)
    font = ImageFont.load_default()
    draw = ImageDraw.Draw(image)

    draw.text((x, y), text, font=image_font, fill=color)

    numpy_image = np.array(image)
    opencv_image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)

    return opencv_image


# secrets.json 파일을 열고 정보를 불러옵니다.
with open('secrets.json', 'r') as f:
    secrets = json.load(f)

SUBSCRIPTION_KEY = secrets["SUBSCRIPTION_KEY"]
ENDPOINT_URL = secrets["ENDPOINT_URL"]



computervision_client = ComputerVisionClient(ENDPOINT_URL, CognitiveServicesCredentials(SUBSCRIPTION_KEY))
form_recognizer_client = FormRecognizerClient(endpoint=ENDPOINT_URL, credential=AzureKeyCredential(SUBSCRIPTION_KEY))


path = 'sampleimage/kim.jpg'
imageData = open(path, "rb").read()
sbuf = io.BytesIO(imageData)

response = computervision_client.read_in_stream(sbuf, raw=True)
operationLocation = response.headers["Operation-Location"]
operationID = operationLocation.split("/")[-1]

# 이메일 주소를 저장할 리스트
emails = []
email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

# while True:
#     read_result = computervision_client.get_read_result(operationID)
#     if read_result.status not in ['notStarted', 'running']:
#         break
#     time.sleep(1)
#
# if read_result.status == OperationStatusCodes.succeeded:
#     img = cv2.imread(path)
#     roi_img = img.copy()
#
#     for text_result in read_result.analyze_result.read_results:
#         for line in text_result.lines:
#             text = line.text
#             box = list(map(int, line.bounding_box))
#             (tlX, tlY, trX, trY, brX, brY, blX, blY) = box
#             pts = ((tlX, tlY), (trX, trY), (brX, brY), (blX, blY))
#
#             topLeft = pts[0]
#             topRight = pts[1]
#             bottomRight = pts[2]
#             bottomLeft = pts[3]
#
#             cv2.line(roi_img, topLeft, topRight, (0, 255, 0), 2)
#             cv2.line(roi_img, topRight, bottomRight, (0, 255, 0), 2)
#             cv2.line(roi_img, bottomRight, bottomLeft, (0, 255, 0), 2)
#             cv2.line(roi_img, bottomLeft, topLeft, (0, 255, 0), 2)
#             roi_img = put_text(roi_img, text, topLeft[0], topLeft[1] - 10, font_size=30)
#
#             print(text)
#
#             # 이메일 주소 찾기
#             found_emails = re.findall(email_regex, text)
#             emails.extend(found_emails)
#
#     plt_imshow(["Original", "ROI"], [img, roi_img], figsize=(16, 10))
#
# # 찾은 이메일 주소 출력
# for email in emails:
#     print(email)


async def extract_business_card_info(image_data):
    # Form Recognizer 서비스 키와 엔드포인트를 설정합니다.
    key = SUBSCRIPTION_KEY
    endpoint = ENDPOINT_URL
    
     # Form Recognizer 비동기 클라이언트 생성
    form_recognizer_client = FormRecognizerClient(endpoint=endpoint, credential=AzureKeyCredential(key))
    try:
        # 이미지 데이터로부터 명함 정보를 비동기적으로 추출
        poller = await form_recognizer_client.begin_recognize_business_cards(image_data)
        business_cards = await poller.result()

        extracted_info = {"ContactNames": [], "Emails": [], "PhoneNumbers": []}

        for business_card in business_cards:
            contact_names = business_card.fields.get("ContactNames")
            if contact_names:
                for name in contact_names.value:
                    extracted_info["ContactNames"].append(name.value_data.text)
            
            emails = business_card.fields.get("Emails")
            if emails:
                for email in emails.value:
                    extracted_info["Emails"].append(email.value_data.text)
            
            phones = business_card.fields.get("PhoneNumbers")
            if phones:
                for phone in phones.value:
                    extracted_info["PhoneNumbers"].append(phone.value_data.text)
        
        return extracted_info
    finally:
        # 클라이언트 리소스를 명시적으로 해제
         form_recognizer_client.close()


# 이미지 처리 및 텍스트 추출 함수
async def process_image(image_data):
    emails = []
    info = []
    email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

    sbuf = io.BytesIO(image_data)
    response = computervision_client.read_in_stream(sbuf, raw=True)
    operation_location = response.headers["Operation-Location"]
    operation_id = operation_location.split("/")[-1]

    # 분석할 시각적 특징
    # visual_features = ["Categories", "Description", "Objects", "Tags", "Faces", "Brands"]

    while True:
        read_result = computervision_client.get_read_result(operation_id)
        # analysis = computervision_client.analyze_image(image_data, visual_features=visual_features)

        if read_result.status not in ['notStarted', 'running']:
            break
        time.sleep(1)

    if read_result.status == "succeeded":
        img = Image.open(io.BytesIO(image_data))
        img_np = np.array(img)
        roi_img = img_np.copy()

        for text_result in read_result.analyze_result.read_results:
            for line in text_result.lines:
                text = line.text
                info.append(text)

                box = list(map(int, line.bounding_box))
                (tlX, tlY, trX, trY, brX, brY, blX, blY) = box
                pts = ((tlX, tlY), (trX, trY), (brX, brY), (blX, blY))

                topLeft = pts[0]

                roi_img = put_text(roi_img, text, topLeft[0], topLeft[1] - 10, font_size=30)
                found_emails = re.findall(email_regex, text)
                emails.extend(found_emails)

    return emails, roi_img,info,info


app = FastAPI()


@app.post("/ocr/extract/")
async def extract_emails(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="지원되지 않는 파일 형식입니다.")

    image_data = await file.read()
    emails, processed_image,info,analysis = await process_image(image_data)
    infos = await extract_business_card_info(image_data)

    print(info)
    print(emails)
    print(infos)

    # return {"emails": emails , "info": info, "images":analysis}
    return {"emails": emails , "info": info,"infos":infos}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

