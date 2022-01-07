const AWS = require('aws-sdk')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

app.use(cors())

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
    // console.log(hackers)
    return hackers
};

const addUpdatePerson = async (hacker) => {
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
    return await dynamoClient.get(params).promise()
}

const getPersonByName = async (name) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'hackerName',
        KeyConditionExpression: 'hackerName = :hackerName',
        ExpressionAttributeValues: {
            ':hackerName': name,
        },
    }
    return await dynamoClient.query(params).promise()
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

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

app.get('/', (req, res) => {
    res.send('')
})

app.get('/hackers', async (req, res) => {
    try {
        const hackers = await getPeople()
        res.json(hackers)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})

app.get('/hackers/:id', async (req, res) => {
    const id = req.params.id
    try {
        const hacker = await getPersonByID(id)
        res.json(hacker)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})

app.get('/hackers/names/:name', async (req, res) => {
    const name = req.params.name
    try {
        const hacker = await getPersonByName(name)
        res.json(hacker)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})

app.post('/hackers', async (req, res) => {
    const hacker = req.body
    try {
        const newHacker = await addUpdatePerson(hacker)
        res.json(newHacker)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})

app.put('/hackers/:id', async (req, res) => {
    const hacker = req.body
    const { id } = req.params
    hacker.id = id
    try {
        const newHacker = await addUpdatePerson(hacker)
        res.json(newHacker)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})

app.delete('/hackers/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.json(await delPersonByID(id))
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Whoops, something went wrong...' })
    }
})