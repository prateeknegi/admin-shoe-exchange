if(Shoes.find().count() === 0 ){
	// var now = new Date().getTime();

	// var user1_id = Meteor.users.insert({
	// 	profile: {
	// 		name: 'User 1'
	// 	}
	// });

	// var user1 = Meteor.users.findOne(user1_id);

	// var user2_id = Meteor.users.insert({
	// 	profile: {
	// 		name: 'User 2'
	// 	}
	// });

	// var user2= Meteor.users.findOne(user2_id);

	// var shoeId1 = Shoes.insert({
	// 	ownerId: user1._id,
	// 	owner: user1.profile.name,
	// 	submitted: new Date(now - 7 * 3600 * 1000),
	// 	state: 'POSTED', 
	// 	type: 'Type A',
	// 	barType: 'Dobbs',
	// 	stilts: true, 
	// 	size: '2'
	// });

	// var shoeId2 = Shoes.insert({
	// 	ownerId: user2._id,
	// 	owner: user2.profile.name,
	// 	submitted: new Date(now - 5 * 3600 * 1000),
	// 	state: 'POSTED', 
	// 	type: 'Type B', 
	// 	barType: 'Ponsetti',
	// 	stilts: false, 
	// 	size: '5'
	// });

	// var shoeId3 = Shoes.insert({
	// 	ownerId: user1._id,
	// 	owner: user1.profile.name,
	// 	submitted: new Date(now - 1* 3600 * 1000),
	// 	state: 'POSTED', 
	// 	type: 'Type B',
	// 	barType: 'Dobbs',
	// 	size: '4',
	// 	stilts: true
	// });

	// Requests.insert({
	// 	shoeId: shoeId1,
	// 	requesterId: user2_id,
	// 	requestedBy: user2.profile.name,
	// 	addressLine1: '5753 Running Fox Ln',
	// 	addressLine2: '',
	// 	city: 'Mason',
	// 	postalState: 'Ohio',
	// 	country: 'USA',
	// 	zipcode: '45040',
	// 	comment: 'I would really appreciate if you consider me as the benefactor of your donation',
	// 	submitted: new Date(now - 6 * 3600 * 1000),
	// 	state: 'REQUESTED'
	// });

	// Requests.insert({
	// 	shoeId: shoeId2,
	// 	requesterId: user1_id,
	// 	requestedBy: user1.profile.name,
	// 	addressLine1: '5753 Running Fox Ln',
	// 	addressLine2: '',
	// 	city: 'Mason',
	// 	postalState: 'Ohio',
	// 	country: 'USA',
	// 	zipcode: '45040',
	// 	comment: 'I would really appreciate if you consider me as the benefactor of your donation',
	// 	submitted: new Date(now - 6 * 3600 * 1000),
	// 	state: 'REQUESTED'
	// });
}