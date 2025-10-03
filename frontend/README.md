# Shui Board — Frontend

Konfig:
```
cp .env.example .env
# sätt VITE_API_BASE_URL till din API Gateway URL (utan slash på slutet).
```

Bygg & kör lokalt:
```
npm i
npm run dev
```

Deploy till S3:
```
npm run build
aws s3 mb s3://shui-board-g-mk
aws s3 website s3://shui-board-g-mk --index-document index.html
aws s3 sync dist/ s3://shui-board-g-mk --delete
```
