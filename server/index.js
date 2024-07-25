//imports
const express = require("express");
const connectDB = require("./db");
const cors = require('cors');

// express
const app = express();
//body parser
app.use(express.json());
app.use(cors());

//connect to database
connectDB();
//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

//start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Your server is listening to port ${port}`);
});
