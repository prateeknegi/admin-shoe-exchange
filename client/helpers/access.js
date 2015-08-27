Template.registerHelper('isAdmin', function() {
  if(!Meteor.userId()){
  	return false;
  }
  var user = Meteor.user()
  if(!user.profile){
  	return false;
  }
  return !!user.profile.admin;
});

Template.registerHelper('isLoggedIn', function(){
	return !!Meteor.userId();
})

Template.registerHelper('isAlreadyRequestedByUser', function(){
	if(!!Meteor.user()) {
		var request = Requests.findOne({shoeId: this._id});
		return (!!request && !!request.shoeId);
	}
	return false;
});