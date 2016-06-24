var braintree = require("braintree");
module.exports = {

	gateway : {
	  environment: braintree.Environment.Sandbox,
	  merchantId: PROCESS.ENV.MERCHANT_ID,
	  publicKey: PROCESS.ENV.PUBLIC_KEY,
	  privateKey: PROCESS.ENV.PRIVATE_KEY
	}
};