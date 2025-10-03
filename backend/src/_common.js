import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const ddbDoc = DynamoDBDocumentClient.from(new DynamoDBClient({}));
export const TABLE_NAME = process.env.TABLE_NAME;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "*"
};

export const res = (statusCode, body) => ({
  statusCode,
  headers: cors,
  body: JSON.stringify(body)
});

export const ok = (b) => res(200, b);
export const created = (b) => res(201, b);
export const bad = (m) => res(400, { error: m });
export const nf = (m="Not Found") => res(404, { error: m });
export const err = (e) => res(500, { error: e?.message ?? "Internal Server Error" });
