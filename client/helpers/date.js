Template.registerHelper('formatDate', function(date) {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
});

Template.registerHelper('checkedIf', function(currentValue, optionValue){
	return (currentValue == optionValue)? 'selected' : '';
});