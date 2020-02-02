const elastic = require("../elastic");
const seeder = require("../seeder");
require("dotenv").config();

const connectEsAsync = async () => {
  try {
    const isElasticReady = await elastic.checkConnection();
    console.log(isElasticReady);
    if (isElasticReady) {
      const elasticIndex = await elastic.esclient.indices.exists({
        index: elastic.index
      });

      console.log(elasticIndex);

      if (!elasticIndex.body) {
        await elastic.createIndex(elastic.index);
        await elastic.setQuotesMapping();
        await seeder.populateDatabase();
      }
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectEsAsync;
