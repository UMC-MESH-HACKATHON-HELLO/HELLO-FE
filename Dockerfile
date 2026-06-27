# package.json에 정의된 대로 TypeScript 컴파일 및 Vite 빌드 실행
# (실행 시 dist 폴더가 생성됩니다)
RUN npm run build

# 2. 실행 스테이지
FROM node:18-alpine
WORKDIR /app

# Caddy와 통신할 내부 포트 개방
EXPOSE 3000

# 빌드 결과물 전체를 실행 환경으로 복사
COPY --from=builder /app /app

# package.json의 preview 스크립트를 활용해 호스트 및 포트(3000)를 강제 지정하여 실행
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]
