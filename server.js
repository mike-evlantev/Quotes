const express = require("express");
const cors = require("cors");
const connectEsAsync = require("./config/elasticDb");
const quotes = require("./routes/quotes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Body parser
app.use(express.json());

// Security
app.use(cors());

// Routing
app.use("/quotes", quotes);

// Db
connectEsAsync();

// Server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
