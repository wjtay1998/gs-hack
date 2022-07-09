import AWS from 'aws-sdk';


const tableName = 'gs_hack_2';
import { v4 as uuidv4 } from 'uuid'

export const getTasks = async (req, res) => {
    var params = {
        TableName: tableName
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
}

export const getOneTask = async (req, res) => {
    var id = req.params.id;    
    
    var params = {
        TableName: tableName,
        KeyConditionExpression: 'ID = :ID',
        ExpressionAttributeValues: {
            ':ID': id
        }
    };

    console.log(params)

    client.query(params, (err, data) => {
        if (err) {
            console.error("Unable to get item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data)
            var response = data['Items'][0]
            
            res.contentType = 'application/json';
            res.send(response)


        }
    });
}


export const createTask = async (req, res) => {
    var body = req.body;
    body['ID'] = uuidv4()
    
    
    var params = {
        TableName: tableName,
        Item: body
    };

    console.log(params)

    client.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


export const updateTask = async (req, res) => {
    var body = req.body;
    var id = body["ID"]
    delete body.ID
    let updateExpression='set';
    let ExpressionAttributeNames={};
    let ExpressionAttributeValues = {};
    for (const property in body) {
        updateExpression += ` #${property} = :${property} ,`;
        ExpressionAttributeNames['#'+property] = property ;
        ExpressionAttributeValues[':'+property]=body[property];
    }

    updateExpression = updateExpression.slice(0, -1);

    var params = {
        TableName: tableName,
        Key: {
            "ID" : id
        },
        UpdateExpression:updateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    };

    console.log(params)

    client.update(params, (err, data) => {
        if (err) {
            console.error("Unable to add item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const deleteTask = async (req, res) => {
    var body = req.body;
    var params = {
        TableName: tableName,
        Key: {
            "ID": body["ID"]
        }
    };

    client.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to add item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted item:", JSON.stringify(data, null, 2));
        }
    });
}

export const completeTask = async (req, res) => {
    var body = req.body;
    var params = {
        TableName: tableName,
        Item: {
            "Id": uuidv4(),
            "Name": body["name"]
        }
    };

    client.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}