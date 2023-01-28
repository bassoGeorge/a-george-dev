import { ListTablesCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./dynamoDbClient";

type Character = { name: string, type: string }

export async function getAllCharactersFromDb() {
  console.log(">>>>>>> trying out : ");
  const data = await ddbClient.send(new ScanCommand({
    TableName: 'Characters',
    ProjectionExpression: '#n, #t',
    ExpressionAttributeNames: {'#n': 'name', '#t': 'type'}
  }));
  return data.Items?.map(item => ({
    name: item.name.S,
    type: item.type.S
  })) ?? [];
}

export async function listAllTablesFromDb() {
  return ddbClient.send(new ListTablesCommand({}));
}
