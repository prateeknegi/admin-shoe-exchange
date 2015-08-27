Template.requestItem.helpers({
	donationActive : function(){
		return Template.parentData().state == 'POSTED';
	}, 
	requestAccepted : function(){
		return this.state == 'ACCEPTED';
	},
	donationClosed: function(){
		return Template.parentData().state == 'CLOSED';
	}
});

Template.requestItem.events({
	'click .acceptRequest' : function(e){
		e.preventDefault();

		var requestId = this._id;
		Meteor.call('acceptRequest', requestId, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
		});
	},
	'click .cancelAcceptRequest': function(e){
		e.preventDefault();

		var requestId = this._id;
		Meteor.call('cancelAcceptRequest', requestId, function(error, result){
			if(error){
				return Errors.throw(error.reason);
			}
		});
	}
});