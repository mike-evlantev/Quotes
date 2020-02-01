const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const client = new Client({ node: process.env.ELASTIC_URL });
const index = "quotes";
const type = "quotes";

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in Elasticsearch.
 */

async function createIndex(index) {
  try {
    await client.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

/**
 * @function setQuotesMapping,
 * @returns {void}
 * @description Sets the quotes mapping to the database.
 */

async function setQuotesMapping() {
  try {
    const schema = {
      quote: {
        type: "text"
      },
      author: {
        type: "text"
      }
    };

    await client.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema
      }
    });

    console.log("Quotes mapping created successfully");
  } catch (err) {
    console.error("An error occurred while setting the quotes mapping:");
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

function checkConnection() {
  return new Promise(async resolve => {
    console.log("Checking connection to Elasticsearch...");
    let isConnected = false;

    while (!isConnected) {
      try {
        await client.cluster.health({});
        console.log("Successfully connected to Elasticsearch");
        isConnected = true;

        // eslint-disable-next-line no-empty
      } catch (_) {}
    }

    resolve(true);
  });
}

module.exports = {
  client,
  setQuotesMapping,
  checkConnection,
  createIndex,
  index,
  type
};
