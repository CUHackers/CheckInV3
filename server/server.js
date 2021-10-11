const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.TABLE_NAME

const getPeople = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const hackers = await dynamoClient.scan(params).promise()
    console.log(hackers)
    return hackers
};

const addUpdatePerson = async (hacker) =>{
    const params = {
        TableName: TABLE_NAME,
        Item: hacker
    }
    return await dynamoClient.put(params).promise()
}

const getPersonByID = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.scan(params).promise()
}

const delPersonByID = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.delete(params).promise()
}