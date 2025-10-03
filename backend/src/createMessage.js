import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ddbDoc, TABLE_NAME, created, bad, err } from "./_common.js";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const username = (body.username || "").trim();
    const text = (body.text || "").trim();
    if (!username) return bad("username is required");
    if (!text) return bad("text is required");

    const item = {
      id: uuidv4(),
      username,
      text,
      createdAt: new Date().toISOString()
    };

    await ddbDoc.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    return created(item);
  } catch (e) {
    return err(e);
  }
};
