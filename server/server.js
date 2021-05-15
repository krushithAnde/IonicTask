const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const employee = require('./models/employee');
var url = "mongodb+srv://dbKrushitha:dbAkki@2017@krushithatest.8tsww.mongodb.net/ionic_test?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
const employeeRouter = require('./routes/employees');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT,OPTIONS")
    next();
});
app.use('/employees', employeeRouter);

app.listen(8080, () => console.log('Server Started'));