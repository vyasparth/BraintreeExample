/**
 * CustomerTokenController
 *
 * @description :: Server-side logic for managing Customertokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	/*	Creates a clientToken which contains all the authorization details of a customer,
			if the customer is a new one, no params are to be passed, else send the param
			customerId to get the payment details of the related user
	*/
	createToken : function(req, res) {

		var param = req.allParams();
		braintreeService.clientToken.generate({'customerId' : param.customerId}, function (err, response) {
    	
			if(err) res.send(err);

			console.log(req.params);
    		res.send(response.clientToken);
  		});
	},

	/*	Create a customer to get the customerId
		params - first and last name, company, emai, phone,fax,website
		card details - credit cards, addresses, paymentFields and customFields	
	*/
	createCustomer : function(req, res) {

		var param = req.allParams();
		braintreeService.customer.create({
		  
		  firstName: param.firstName,
		  lastName: param.lastName,
		  company: param.company,
		  email: param.email,
		  phone: param.phone,
		  fax: param.fax,
		  website: param.website
		}, function (err, result) {
		  		
		  	if(err) res.send(err);

			console.log(result);
    		res.send(result);
		});
	},
	getAllPlans : function(req, res) {

		braintreeService.plan.all(function(err, response) {
			if(err){
				callback(err)
			}
			else{
				res.send(response);
			}
		});
	},
	makePayment : function(req, res) {

		var param = req.allParams();

		braintreeService.transaction.sale({
				amount: param.amount,
				paymentMethodNonce: param.nonceFromTheClient,
			    options: {
					submitForSettlement: true
				}
			}, function (err, result) {

				if(err){
					res.send(err)
				}
				else{
					res.send(result);
				}
			});
		},
		getPaymentMethodNonce : function(req, res) {

			braintreeService.paymentMethodNonce.create('f742dr', function(err, response) {
		  
				var nonce = response.paymentMethodNonce.nonce;
			 	res.send(response);
			});
		},
		subscribePlan : function(req, res) {

			var param = req.allParams();

			braintreeService.subscription.create({
				
				paymentMethodToken: param.paymentMethodToken,
				planId: param.planId
				}, function (err, result) {

					if(err) res.send(err);
					else res.send(result);
			});
		},

		findCostumer : function(req, res) {

			var param = req.allParams();

			braintreeService.customer.find(param.customerId, function (err, result) {

					if(err) res.send(err);
					else res.send(result);
			});
		},
		// transactionHistory : function(req, res) {

			
		// }

};

