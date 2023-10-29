const express = require('express');
const { getContacts, upDateContact } = require('./controller/contacts');
require("dotenv").config();
const cors = require("cors");
const app = express()
const mongoose = require('mongoose')
//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//db connection
console.log(process.env.DB_URL);
const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB GOT CONNECTED`))
    .catch((error) => {
      console.log(`DB CONNECTION ISSUES`);
      console.log(error);
      process.exit(1);
    });
};
connectWithDb()

app.get('/get-contacts',getContacts)
app.put('/update-contact', upDateContact)

app.listen(process.env.PORT,() => {
   console.log(`Server Running on port ${process.env.PORT}`); 
})