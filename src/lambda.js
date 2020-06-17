const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const parseSnsMessage = require('./parse-sns-event');
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = (event) => {
  let messages = parseSnsMessage(event);
  return Promise.all(messages.map(saveToDynamoDB));
};

saveToDynamoDB = async (data) => {
  if (!data) return;
  data.id = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: data
  };

  try {
    return await docClient.put(params).promise()
  } catch (e) {
    console.log(e);
    throw e;
  }
};
