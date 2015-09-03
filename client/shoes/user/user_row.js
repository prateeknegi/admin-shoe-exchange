Template.userRow.helpers({
	username: function(){
		var user = this;
		return (!!user.username) ? user.username : user.profile.name;
	}, 
	isAdmin: function(){
		var user = this;
		var admin = (!user.profile) ? false: !!user.profile.admin;
	}, 
	email: function(){
		var user = this;
		return (!user.emails || !user.emails[0]) ? "" : user.emails[0].address;
	}
});

Template.userRow.events({
	'click .revoke' :  function(e){
		e.preventDefault();

		var currentUserId = this._id;
		Meteor.call('removeAdminAccess', currentUserId, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
		});
	},

	'click .allow' :  function(e){
		e.preventDefault();

		var currentUserId = this._id;
		Meteor.call('allowAdminAccess', currentUserId, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
		});
	}
});