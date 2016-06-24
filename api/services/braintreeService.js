
var braintree = require("braintree");
const config = require('../../config/braintree');

module.exports = braintree.connect(config.gateway);