const axios = require("axios");
const lighthouse_config = require("../../lighthouse.config");

module.exports = async (fileSizeInBytes, network = "testnet") => {
  try {
    // Get ticker for the given currency
    const response = await axios.get(
      lighthouse_config.URL +
        `/api/lighthouse/get_ticker?symbol=${lighthouse_config[network]["symbol"]}`
    );
    const token_price_usd = response.data;

    // Get cost of file
    const totalSize = fileSizeInBytes / (1024 * 1024 * 1024);
    const total_cost_usd = totalSize * 5;
    const total_cost = total_cost_usd / token_price_usd;

    return {
      total_cost: total_cost,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
