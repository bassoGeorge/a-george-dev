import { GetItemCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './dynamoDbClient.server';

type Character = { name: string; type: string };

export async function getAllCharactersFromDb(): Promise<Character[]> {
  const data = await ddbClient.send(
    new GetItemCommand({
      TableName: 'Experiment',
      Key: {
        pk: { S: '001' },
      },
    })
  );
  return (
    data.Item?.Characters.L?.map((char) => ({
      name: char?.M?.Name.S ?? '',
      type: char?.M?.Type.S ?? '',
    })) ?? []
  );
}

export async function listAllTablesFromDb() {
  return ddbClient.send(new ListTablesCommand({}));
}
