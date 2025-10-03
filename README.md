# Shui Board
Backend: API Gateway + Lambda + DynamoDB (Serverless).  
Frontend: React + Vite (S3-hosting).

## Endpoints
- `POST /messages` — skapa meddelande (`username`, `text`)
- `GET /messages` — lista alla
- `PUT /messages/{id}` — uppdatera `text` (**404** om id saknas)

## Snabbstart
```bash
# 1) Backend
cd backend
npm i
npx serverless deploy --stage prod
# -> kopiera API-bas-URL, ex: https://ABC.execute-api.eu-north-1.amazonaws.com

# 2) Frontend
cd ../frontend
cp .env.example .env
# redigera .env: VITE_API_BASE_URL=<din API-URL>
npm i
npm run build

# 3) S3
aws s3 mb s3://shui-board-g-mk
aws s3 website s3://shui-board-g-mk --index-document index.html
aws s3 sync dist/ s3://shui-board-g-mk --delete
# (valfritt) bucket policy: se bucket-policy.json
```

