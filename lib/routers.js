Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
});

var requireAdminAccess = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('adminAccessRequired');
		}
	} else {
		if(!!Meteor.user().profile['admin']){
			this.next();
		} else {
			this.render('adminAccessRequired');
		}
	}
};

Router.route('/', {
	name: 'shoeList',
	waitOn: function() {
		Meteor.subscribe('shoes')
		if(!!Meteor.userId()){
			Meteor.subscribe('requestsByUser', Meteor.userId());
		}
	}
});

Router.route('donationInformation', {
	name: 'shoeDonationInformation'
});

Router.route('/addDonation', {
	name: 'donateShoe'
});
Router.onBeforeAction(requireAdminAccess, {
	only: 'donateShoe'
});

Router.route('/manageDonation/:_id', {
	name: 'manageShoe',
	data: function() {
		return Shoes.findOne(this.params._id);
	},
	waitOn: function() {
		return [ 
			Meteor.subscribe('shoe', this.params._id), 
			Meteor.subscribe('requestsByShoe', this.params._id)
		];
  	}
});
Router.onBeforeAction(requireAdminAccess, {
	only: 'manageShoe'
});
Router.onBeforeAction(
	function(){
		var shoe = this.data();
		if(!!shoe) {
			this.next();
		} else {
			this.render('notAllowed');
		}
	}, 
	{ only: 'manageShoe'}
);

Router.route('/submitRequest/:_id', {
	name: 'shoeRequest',
	data: function() {
		return Shoes.findOne(this.params._id);
	}, 
	waitOn: function() {
		return [ 
			Meteor.subscribe('shoe', this.params._id), 
			Meteor.subscribe('userRequest', this.params._id, Meteor.user()._id)
		];
  	}
});


Router.route('/editRequest/:_id', {
	name: 'editRequest',
	data: function() {
		return Shoes.findOne(this.params._id);
	}, 
	waitOn: function() {
		return [ 
			Meteor.subscribe('shoe', this.params._id), 
			Meteor.subscribe('userRequest', this.params._id, Meteor.user()._id)
		];
  	}
});


Router.route('/manageUsers', {
	name: 'manageUser',
	data: function() {
		return Meteor.users.find();
	},
	waitOn: function() {
		return [ 
			Meteor.subscribe('allusers') 
		];
	}
});


var requireLoginForRequest = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('loginRequiredForRequest');
		}
	} else {
		this.next();
	}
};


Router.onBeforeAction(requireLoginForRequest, {
	only: 'shoeRequest'
});