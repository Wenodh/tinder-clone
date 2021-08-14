import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import dotenv from 'dotenv';
import Cors from 'cors';

dotenv.config();
//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://wenodh:${process.env.PASSWORD}@cluster0.3eycs.mongodb.net/tinderDb?retryWrites=true&w=majority`;

//middleWares
app.use(express.json());
app.use(Cors());

//db Config
mongoose.connect(
    connection_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err, s) => {
        !err ? console.log('connected to db') : console.log(err.message);
    }
);

//Api Endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello');
});

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        err ? res.status(500).send(err) : res.status(201).send(data);
    });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        err ? res.status(500).send(err) : res.status(200).send(data);
    });
});

//Listener
app.listen(port, () => {
    console.log(`listening on localhost: ${port}`);
});
