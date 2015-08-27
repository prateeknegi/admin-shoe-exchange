Template.editRequest.helpers({
	request : function(){
		return Requests.findOne();
	}
});

Template.editRequest.events({
	'submit form': function(e){
		e.preventDefault();
		var editRequest = {
			requestId: Requests.findOne()._id,
			message: $(e.target).find('[name=message]').val(), 
			addressLine1: $(e.target).find('[name=addressLine1]').val(),
			addressLine2: '',
			city: $(e.target).find('[name=city]').val(),
			postalState: $(e.target).find('[name=postalState]').val(),
			country: 'USA',
			zipcode: $(e.target).find('[name=zipcode]').val()
		};

		Meteor.call('shoeRequestUpdate', editRequest, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
			Router.go('shoeList');
		});
	}
});