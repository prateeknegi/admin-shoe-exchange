Requests = new Mongo.Collection('requests');

Meteor.methods({
	shoeRequestInsert: function(shoeRequestAttributes){
		check(Meteor.userId(), String);
		check(shoeRequestAttributes, {
			shoeId: String, 
			addressLine1: String,
			addressLine2: String, 
			city: String,
			postalState: String, 
			country: String,
			zipcode: String, 
			message: String
		});

		var user = Meteor.user();
		var shoeRequest = _.extend(shoeRequestAttributes, {
			requesterId: user._id, 
			requestedBy: user.username, 
			submited: new Date(),
			state: 'REQUESTED',
		});

		var shoeRequestId = Requests.insert(shoeRequest);	
		return {
			_id : shoeRequestId
		}
	}, 

	shoeRequestUpdate: function(shoeRequestAttributes){
		check(Meteor.userId(), String);
		check(shoeRequestAttributes, {
			requestId: String, 
			addressLine1: String,
			addressLine2: String, 
			city: String,
			postalState: String, 
			country: String,
			zipcode: String, 
			message: String
		});
		var user = Meteor.user();
		var request = Requests.findOne(shoeRequestAttributes.requestId);
		if(!request){
			throw new Meteor.Error('invalidRequest', 'No such request exists');
		}
		var shoe = Shoes.findOne(request.shoeId);
		if(!shoe){
			throw new Meteor.Error('invalidRequest', 'No such shoe donation exits');
		}
		throwErrorIfRequestNotByUser(request);
		throwErrorIfDonationClosed(request, shoe);
		Requests.update(request._id, {$set: {
			addressLine1 : shoeRequestAttributes.addressLine1,
			addressLine2 : shoeRequestAttributes.addressLine2,
			city : shoeRequestAttributes.city,
			postalState : shoeRequestAttributes.postalState,
			country : shoeRequestAttributes.country,
			zipcode : shoeRequestAttributes.zipcode,
			message : shoeRequestAttributes.message
		}});
	}, 

	acceptRequest: function(requestId){
		check(Meteor.userId(), String);
		check(requestId, String);

		var request = Requests.findOne(requestId);
		if(!request){
			throw new Meteor.Error('invalidRequest', 'No such request exists');
		}
		var shoe = Shoes.findOne(request.shoeId);
		if(!shoe){
			throw new Meteor.Error('invalidRequest', 'No such shoe donation exits');
		}
		throwErrorIfNotAdmin(Meteor.user());
		throwErrorIfDonationNotActive(request, shoe);
		throwErrorIfDonationClosed(request, shoe);
		Requests.update(request._id, {$set: {state : 'ACCEPTED'}});
		Shoes.update(shoe._id, {$set: {state : 'PENDING'}});
	}, 

	cancelAcceptRequest: function(requestId){
		check(Meteor.userId(), String);
		check(requestId, String);

		var request = Requests.findOne(requestId);
		if(!request){
			throw new Meteor.Error('invalidRequest', 'No such request exists');
		}
		var shoe = Shoes.findOne(request.shoeId);
		if(!shoe){
			throw new Meteor.Error('invalidRequest', 'No such shoe donation exits');
		}
		throwErrorIfNotAdmin(Meteor.user());
		throwErrorIfRequestNotAccepted(request,shoe);
		throwErrorIfDonationClosed(request, shoe);
		Shoes.update(shoe._id, {$set: {state : 'POSTED'}});
		Requests.update(request._id, {$set: {state : 'REQUESTED'}});
	}
});

var throwErrorIfNotAdmin = function(user){
	var admin = (!user.profile) ? false: !!user.profile.admin;
	if(!admin){
		throw new Meteor.Error('NotAdminError', 'You do not have access to do this operation');
	}
}; 

var throwErrorIfRequestNotByUser = function(request){
	var currentUserId = Meteor.user()._id;
	if(! (currentUserId === request.requesterId)){
		throw new Meteor.Error('invalidRequest', 'Current user cannot update this request');
	}
};

var throwErrorIfDonationNotActive = function(request, shoe){
	if(shoe.state != 'POSTED'){
		throw new Meteor.Error('InvalidState', 'Another request cannot be accepted for this donation');
	}
};

var throwErrorIfDonationClosed = function(request, shoe){
	if(shoe.state == 'CLOSED'){
		throw new Meteor.Error('InvalidState', 'This action cannot be performed on closed donation');
	}
};

var throwErrorIfRequestNotAccepted = function(request, shoe){
	if(request.state != 'ACCEPTED'){
		throw new Meteor.Error('InvalidState', 'Cannot cancel request of not accepted request');
	}
};