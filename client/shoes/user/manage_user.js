Template.manageUser.helpers({
	users: function(){
		return Meteor.users.find();
	}
});