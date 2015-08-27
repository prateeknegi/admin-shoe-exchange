Template.shoeRequest.helpers({
	
});
Template.shoeRequest.events({
	'submit form': function(e){
		e.preventDefault();
		var shoeRequest = {
			shoeId: this._id,
			message: $(e.target).find('[name=message]').val(), 
			addressLine1: $(e.target).find('[name=addressLine1]').val(),
			addressLine2: '',
			city: $(e.target).find('[name=city]').val(),
			postalState: $(e.target).find('[name=postalState]').val(),
			country: 'USA',
			zipcode: $(e.target).find('[name=zipcode]').val()
		};

		Meteor.call('shoeRequestInsert', shoeRequest, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
			Router.go('shoeList');
		});
	}
});
