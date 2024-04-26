# 기존 멀티 스테이지 빌드의 builder 단계 제거 (필요에 따라)
FROM node:lts-alpine

WORKDIR /FRONTEND

# package.json과 package-lock.json을 먼저 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install 

# 프로젝트 소스 복사
COPY . .

# 환경변수 PATH 설정  
ENV PATH /FRONTEND/node_modules/.bin:$PATH

# 애플리케이션 실행
CMD ["npm", "run", "dev-tab:teamsfx"]
 