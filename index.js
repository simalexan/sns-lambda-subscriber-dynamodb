const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');
const parseSnsMessage = require('./parse-sns-event');
const TOPIC_ARN = process.env.TOPIC_ARN;
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = (event) => {
    let messages = parseSnsMessage(event);
    return Promise.all(messages.map(saveToDynamoDB));
};

saveToDynamoDB = (data) => {

    if (!data) {
        return Promise.resolve();
    }

    data[PRIMARY_KEY] = uuidv4();
    let params = {
        TableName: TABLE_NAME,
        Item: data
    }
    return dynamoDb.put(params)
        .promise()
        .then(response => response)
        .catch(err => {
            console.log(err);
            return err;
        });
};