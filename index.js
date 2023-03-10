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
const orders = client.db('12-assignment').collection('allOrders')

async function run() {
    try {
        app.get('/products', async (req, res) => {
            let query = {};
            if (req.query.email){
                const email = req.query.email;
                query = { email}
            }
            if (req.query.category){
                const category = req.query.category;
                query = { category}
            }
            const response = await productCollection.find(query).toArray();
            res.send(response)
        })
        app.get('/orders', async (q, s) => {
            let query = {}
            if (q.query.email) {
                query = {
                    email: q.query.email,
                }
            }
            // const ordersData = orders.find()
            const ordersData = await orders.find(query).toArray();
            s.send(ordersData)
        })
        app.post('/orders', (q, s)=>{
            const order = q.body;
            orders.insertOne(order)
                .then(res => {
                    s.send(res)});
        })
        app.post('/product', (q, s)=>{
            const product = q.body;
            productCollection.insertOne(product)
                .then(res => {
                    s.send(res)})
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
})