import type { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let params: DynamoDBClientConfig =
  process.env.NODE_ENV !== 'production' &&
  process.env.USE_LOCAL_DYNAMO_DB == 'true'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      }
    : {
        region: 'ap-south-1',
      };

if (process.env.DYNAMO_DB_ACCCESS_ID && process.env.DYNAMO_DB_SECRET) {
  params = {
    ...params,
    credentials: {
      accessKeyId: process.env.DYNAMO_DB_ACCCESS_ID,
      secretAccessKey: process.env.DYNAMO_DB_SECRET,
    },
  };
}

export const ddbClient = new DynamoDBClient(params);
