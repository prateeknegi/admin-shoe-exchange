Meteor.publish('shoes', function(){
	return Shoes.find({state : {$ne: 'CLOSED'}});
});

Meteor.publish('shoe', function(shoeId){
	return Shoes.find({_id: shoeId});
});
Meteor.publish('shoeByUserId', function(shoeId, donorId){
	return Shoes.find({_id: shoeId, ownerId: donorId});
});

Meteor.publish('userRequest', function(shoeId,requesterId){
	check(shoeId, String);
	check(requesterId, String);
	return Requests.find({shoeId: shoeId, requesterId: requesterId});
});
Meteor.publish('requestsByShoe', function(shoeId){
	check(shoeId, String);
	return Requests.find({shoeId: shoeId});
});
Meteor.publish('requestsByUser', function(requesterId){
	return Requests.find({requesterId: requesterId});
});
