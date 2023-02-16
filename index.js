const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ckb7hbl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const productCollection = client.db('12-assignment').collection('allServices')

async function run() {
    try {
        app.get('/products', async (req, res) => {
            let query = {};
            if (req.query.category){
                const category = req.query.category;
                console.log(category, 'category2');
                query = { category}
            }
            const response = await productCollection.find(query).toArray();
            console.log(response, 'respnse');
            res.send(response)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err, 'error'));

app.get('/', (req, res) => {
    res.send('12 assignment server is running');
})

app.listen(port, () => {
    console.log(`12 assignment running on: ${port}`)
})