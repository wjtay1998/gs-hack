const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'gs_hack_1';
AWS.config.update({ region: 'us-west-2' });

