const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;
const static_dir = '../public';

const app = express();

app.use(bodyParser.json()); // Указываем, что содержимое - JSON

app.use(express.static(static_dir));

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addGoods', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;

        cart.push(item);
        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
            console.log('done');
            res.end(); //отправляем ответ без содержимого
        });
    });
});

app.listen(3000, () => {
    console.log('server is running on port ' + port + '!');
});