# Shui Board (G) – v2

**Uppgift:** Individuell examination – Shui (**G-krav**).  
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

## Inlämning (Azomo)
1. Länka till GitHub-repot (backend + frontend + denna README).
2. Lägg **S3 website-URL** i kommentaren, t.ex. `http://shui-board-g-mk.s3-website.eu-north-1.amazonaws.com`.
3. Lägg också din **API-bas-URL**.
4. Verifiera att inga fel syns i webbkonsolen (CORS m.m. hanteras i Lambda).

## Test
- Postman: `shui-g.postman_collection.json` (ange `{{baseUrl}}`).
- VSCode REST Client: `api.http` (ändra `@baseUrl`).

## Rensa
```bash
cd backend
npx serverless remove --stage prod
```
