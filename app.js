const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
var User = require('./User');
const home = path.join(__dirname + "/public/home.html");
const login = path.join(__dirname + "/public/index.html");
const phone = path.join(__dirname + "/public/phone.html");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Base_url = "mongodb+srv://Satyam:Satyamza1@cluster0.hs8sbo4.mongodb.net/login?retryWrites=true&w=majority";



mongoose.connect('mongodb+srv://Satyam:Satyamza1@cluster0.hs8sbo4.mongodb.net/login?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('CONNECTED  TO DB'));



app.get("/", (req, res, ) => {
    res.sendFile(home);
});
app.get("/login", (req, res, ) => {
    res.sendFile(login);
});
app.get("/phone", (req, res, ) => {
    res.sendFile(phone);
});



app.post('/lop', (req, res) => {
    const user = new User({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        country: req.body.country

    });

    try {
        console.log(user);
        const savedUser = user.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }

    res.write(user);
});


app.listen(port, () => {
    console.log(`Server start port number ${port}`);
})