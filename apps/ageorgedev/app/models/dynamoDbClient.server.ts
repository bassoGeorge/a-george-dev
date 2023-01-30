import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const params =
  process.env.NODE_ENV !== 'production' &&
  process.env.USE_LOCAL_DYNAMODB == 'true'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      }
    : {
        region: 'ap-south-1',
      };

export const ddbClient = new DynamoDBClient(params);
