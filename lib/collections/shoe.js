Shoes = new Mongo.Collection('shoes');

Meteor.methods({

	addShoeToDonation : function(shoeAttributes){
		check(Meteor.userId(). String);
		var user = Meteor.user();
		throwErrorIfNotAdmin(user);

		check(shoeAttributes, {
			size: String,
			type: String,
			barType: String,
			toeStilts: Boolean,
			pfs: Boolean
		});
		
		var username = (!!user.username) ? user.username : user.profile.name;
		var shoe = _.extend(shoeAttributes, {
			ownerId : user._id,
			owner : username,
			submitted : new Date(),
			state: 'POSTED',
			requestCount: 0
		});

		var shoeId = Shoes.insert(shoe);
		return {
			_id: shoeId
		}
	}, 

	closeDonation: function(shoeId){
		check(Meteor.userId(). String);
		throwErrorIfNotAdmin(Meteor.user());

		var shoe = Shoes.findOne(shoeId);
		if(!shoe){
			throw new Meteor.Error('invalidRequest', 'No such shoe donation exits');
		}
		Shoes.update(shoe._id, {$set: {state : 'CLOSED'}});			
	},

	removeDonation: function(shoeId){
		check(Meteor.userId(). String);
		throwErrorIfNotAdmin(Meteor.user());

		Shoes.remove(shoeId);
	}
});

var throwErrorIfNotAdmin = function(user){
	var admin = (!user.profile) ? false: !!user.profile.admin;
	if(!admin){
		throw new Meteor.Error('NotAdminError', 'You do not have access to do this operation');
	}
}; 