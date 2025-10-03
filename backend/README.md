# Shui Board (G) — Backend

Endpoints:
- POST /messages  — body: { "username": "mk", "text": "hej" }
- GET  /messages  — alla meddelanden
- PUT  /messages/{id} — body: { "text": "nytt" }  (404 om id saknas i DB)

DynamoDB skapas av Serverless (ingen manuell provisionering behövs). CORS är påslaget.

## Deploy
```bash
cd backend
npm i
npx serverless deploy --stage prod
```
Notera din API-bas-URL från outputen.

## Felsökning
- Se **CloudWatch Logs** för respektive Lambda vid fel.
