Template.shoeList.helpers({
	shoes: function(){
		return Shoes.find({}, {sort: {submitted: -1}})
	}
});