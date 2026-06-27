FROM node:20-alpine

WORKDIR /app

# 캐시 효율을 위해 패키지 명세서 먼저 복사
COPY package*.json ./

# 의존성 깔끔하게 설치
RUN npm install

# 전체 소스 코드 복사
COPY . .

# TypeScript 컴파일 및 Vite 프로덕션 빌드 실행 (dist 폴더 생성)
RUN npm run build

# Caddy와 통신할 포트 개방
EXPOSE 3000

# package.json의 preview 스크립트를 이용해 3000 포트로 외부 접속 허용하며 실행
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]
