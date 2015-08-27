Template.registerHelper('checkedGlyph', function(value) {
	if(value){
		return 'glyphicon glyphicon-ok text-success';
	} else {
		return 'glyphicon glyphicon-remove text-error';
	}
});

Template.registerHelper('barTypeText', function(value) {
	if(value === 'none'){
		return 'No Bar';
	}
	if(value === 'ponseti'){
		return 'Ponseti Abduction Rotation Bars';
	}
	if(value === 'dobbs'){
		return 'Mitchell Spring Assisted Dobbs Brace';
	}
	return value;
});

Template.registerHelper('shoeDonationStatePanel', function(state) {
	if(state === 'POSTED'){
		return 'panel-green';
	}
	if(state === 'PENDING'){
		return 'panel-blue';
	}
	return 'panel-grey';
});