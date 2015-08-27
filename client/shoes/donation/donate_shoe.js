Template.donateShoe.events({
	'submit form': function(e){
		e.preventDefault();
		var shoeDonation = {
			type: $(e.target).find('[name=type]').val(), 
			size: $(e.target).find('[name=size]').val(), 
			toeStilts: $(e.target).find('[name=toeStilts]').prop('checked'),
			pfs: $(e.target).find('[name=pfs]').prop('checked'),
			barType: $(e.target).find('[name=barType]').val() 
		}

		Meteor.call('addShoeToDonation', shoeDonation , function(error, results){
			if(error){
				return Errors.throw(error.reason);
			}

			Router.go('shoeList');
		});
		console.log(shoeDonation);
	}
});