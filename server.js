const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

/**
 * @function start
 * @returns {void}
 * @description Starts the HTTP Express server.
 */

function start() {
  return app
    .use(cors())
    .use("/quotes", routes)
    .use((_req, res) =>
      res.status(404).json({ success: false, error: "Route not found" })
    )
    .listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = {
  start
};
