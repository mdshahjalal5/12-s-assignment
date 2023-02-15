const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.nameUser}:${process.env.password}@cluster0.ckb7hbl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log('uri', uri)
async function run() {
    try {
        const productCollection = client.db('emaJohn').collection('products')
        // app.get('/products', async(req, res)=>{
        //         const response =  await productCollection.find({}).toArray();
        //         console.log(response, 'respnse');
        //         res.send(response)
        //     })
        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page, size, 'page, size');
            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.skip(page * size).limit(size).toArray();
            const count = await productCollection.estimatedDocumentCount();
            console.log(count, 'count get');
            res.send({ count, products });
        });

        app.post('/productsByIds', async (req, res) => {
            const ids = req.body;
            const objectIds = ids.map(id => new ObjectId(id))
            const query = { _id: { $in: objectIds } };
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

    }
    finally {

    }
}
run().catch(err => console.error(err, 'error'));

app.get('/', (req, res) => {
    res.send('ema john server is running');
})

app.listen(port, () => {
    console.log(`ema john running on: ${port}`)
})