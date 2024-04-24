 
import json
import uvicorn
 

from fastapi import FastAPI, File, UploadFile , HTTPException,Form,Request
from fastapi.responses import JSONResponse
import requests
import uuid
import time
import os

app = FastAPI()

file_path = '/app/src/main.py'

if os.path.exists(file_path):
    print(f"File exists: {file_path}")
else:
    print(f"File does not exist: {file_path}")
    
# secrets.json 파일을 열고 정보를 불러옵니다.
with open('/app/src/secrets.json', 'r') as f:
    secrets = json.load(f)

# secrets 내용을 출력하여 확인합니다. (필요한 경우)
# print(secrets)


# CLIENT_ID = secrets["CLIENT_ID"]  # Your Client ID
CLIENT_SECRET = secrets["CLIENT_SECRET"]  # Your Client Secret
API_URL = secrets["API_URL"]  
 
 
print('apiurl   '+API_URL)
print('secret   '+CLIENT_SECRET)
 
# print('secret'+CLIENT_SECRET)

@app.post("/process_ocr/")
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

# if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=8000)
