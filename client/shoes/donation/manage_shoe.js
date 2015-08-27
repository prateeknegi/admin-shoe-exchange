Template.manageShoe.helpers({
	requests : function(){
		return Requests.find({}, {sort: {submitted: -1}});
	},
	isPending: function(){
		return this.state == 'PENDING';
	}, 
	isClosed: function(){
		return this.state == 'CLOSED';
	}
});

Template.manageShoe.events({
	'click .deleteDonation' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to delete donation?")){
			var currentShoeId = this._id;
			Meteor.call('removeDonation', currentShoeId, function(error, result){
				if(error){
					return Errors.throw(error.reason);
				}
				Router.go('shoeList');
			});
		}
	},
	'click .closeDonation' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to close donation? Have you mailed the shoes to the address provided below ?")){
			var currentShoeId = this._id;
			Meteor.call('closeDonation', currentShoeId, function(error, result){
				if(error){
					return Errors.throw(error.reason);
				}
				Router.go('shoeList');
			});
		}
	}
});
