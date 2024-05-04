# 파이썬 베이스 이미지 사용
FROM python:3.8

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파이썬 패키지 설치를 위한 requirements.txt 복사
COPY requirements.txt /app/

# requirements.txt에 명시된 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install docker

# 현재 디렉토리의 모든 파일을 컨테이너의 작업 디렉토리로 복사
COPY . /app

# 스크립트 실행
CMD ["flask", "run", "--host=0.0.0.0"]
