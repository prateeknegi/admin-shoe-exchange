var throwErrorIfNotAdmin = function(user){
	var admin = (!user.profile) ? false: !!user.profile.admin;
	if(!admin){
		throw new Meteor.Error('NotAdminError', 'You do not have access to do this operation');
	}
}; 

Meteor.methods({
	allowAdminAccess : function(userId){
		check(Meteor.userId(), String);
		check(userId, String);

		var currrentUser = Meteor.user();
		throwErrorIfNotAdmin(currrentUser);

		var user = Meteor.users.findOne(userId);
		if(!user){
			throw new Meteor.Error('invalidRequest', 'No such user exists');
		}

		Meteor.users.update(user._id, {$set: {
			"profile.admin" : true
		}});
	},

	removeAdminAccess : function(userId){
		check(Meteor.userId(), String);
		check(userId, String);

		var currrentUser = Meteor.user();
		throwErrorIfNotAdmin(currrentUser);

		var user = Meteor.users.findOne(userId);
		if(!user){
			throw new Meteor.Error('invalidRequest', 'No such user exists');
		}

		Meteor.users.update(user._id, {$set: {
			"profile.admin" : false
		}});
	}
});