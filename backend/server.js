require('dotenv').config();

//intialize express
const express = require('express');

//create app
const app = express();

//import cors
const cors = require('cors');

//middleware
app.use(express.json());

app.use(cors({
  origin: "https://cloudio-user.onrender.com/",
  methods: ["GET", "POST"],
  credentials: true
}));

//routes
app.use('/', require('./routes/routes'));

//start server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})