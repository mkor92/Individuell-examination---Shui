import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc, TABLE_NAME, ok, bad, nf, err } from "./_common.js";

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) return bad("id path parameter is required");
    const body = JSON.parse(event.body || "{}");
    const text = (body.text || "").trim();
    if (!text) return bad("text is required");

    try {
      const out = await ddbDoc.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET #t = :t",
        ExpressionAttributeNames: { "#t": "text" },
        ExpressionAttributeValues: { ":t": text },
        ConditionExpression: "attribute_exists(id)",
        ReturnValues: "ALL_NEW"
      }));
      return ok(out.Attributes);
    } catch (e) {
      if (e?.name === "ConditionalCheckFailedException") return nf("Message does not exist");
      throw e;
    }
  } catch (e) {
    return err(e);
  }
};
