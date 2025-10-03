# Shui Board — Backend

Endpoints:
- POST /messages  — body: { "username": "mk", "text": "hej" }
- GET  /messages  — alla meddelanden
- PUT  /messages/{id} — body: { "text": "nytt" }  (404 om id saknas i DB)

## Deploy
```bash
cd backend
npm i
npx serverless deploy --stage prod
