const { client, index, type } = require("../elastic");

const getQuotesAsync = async req => {
  const query = {
    query: {
      match: {
        quote: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  };

  const {
    body: { hits }
  } = await client.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: index,
    type: type,
    body: query
  });

  const results = hits.total.value;

  const values = hits.hits.map(hit => {
    return {
      id: hit._id,
      quote: hit._source.quote,
      author: hit._source.author,
      score: hit._score
    };
  });

  return {
    results,
    values
  };
};

const createQuoteAsync = async (quote, author) => {
  return client.index({
    index,
    type,
    body: {
      quote,
      author
    }
  });
};

module.exports = {
  getQuotesAsync,
  createQuoteAsync
};
