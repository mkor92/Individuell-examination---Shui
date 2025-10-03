import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc, TABLE_NAME, ok, err } from "./_common.js";

export const handler = async () => {
  try {
    const out = await ddbDoc.send(new ScanCommand({ TableName: TABLE_NAME }));
    const items = (out.Items || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    return ok(items);
  } catch (e) {
    return err(e);
  }
};
