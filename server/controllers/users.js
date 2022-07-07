import AWS from 'aws-sdk';
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'gs_hack_1';
AWS.config.update({ region: 'us-east-1' });
import { v4 as uuidv4 } from 'uuid'

export const registerUser = async (req, res) => {
    var params = {
        TableName: tableName
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]['Name']);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
}


export const loginUser = async (req, res) => {
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
