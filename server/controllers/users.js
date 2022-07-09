import AWS from 'aws-sdk';


const tableName = 'gs_hack_users';
import { v4 as uuidv4 } from 'uuid'

export const loginUser = async (req, res) => {
    var params = {
        TableName: tableName
    };

    var details = req.body;
    var reply = {'message': 'failure'}

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);
            
            console.log(details)
            for (const body of items){
                console.log(body)
                if(body['username'] == details['username']){
                    if(body['password'] == details['password']){
                        reply['message'] = 'success'
                    }
                }
            }

            res.contentType = 'application/json'
            res.send(reply)
        }
    });


}


export const registerUser = async (req, res) => {
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


export const updateUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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

export const getUserTasks = async (req, res) => {
    
    var body = req.body;    
    
    var params = {
        TableName: tableName,
        KeyConditionExpression: 'ID = :ID',
        ExpressionAttributeValues: {
            ':ID': body['ID']
        }
    };

    console.log(params)

    client.query(params, (err, data) => {
        if (err) {
            console.error("Unable to get item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data)
            var response = data['Items'][0]['user_task_list']
            
            res.contentType = 'application/json';
            res.send(response)


        }
    });

}

export const createUserTask = async (req, res) => {
    var body = req.body;    
    
    var params = {
        TableName: tableName,
        KeyConditionExpression: 'ID = :ID',
        ExpressionAttributeValues: {
            ':ID': body['user_id']
        }
    };

    console.log(params)
    var user_task_list = null

    client.query(params, (err, data) => {
        if (err) {
            console.error("Unable to get item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data)
            user_task_list = data['Items'][0]['user_task_list']
            var id = body.user_id
            var key = `${body.user_id}^${body.task_id}`
            delete body.user_id
            user_task_list[key] = body
            var update_body  = {'user_task_list': user_task_list}

            let updateExpression='set';
            let ExpressionAttributeNames={};
            let ExpressionAttributeValues = {};
            for (const property in update_body) {
                updateExpression += ` #${property} = :${property} ,`;
                ExpressionAttributeNames['#'+property] = property ;
                ExpressionAttributeValues[':'+property]=update_body[property];
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
    });

    
}