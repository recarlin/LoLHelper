// Russell Carlin
// MIU 1202
// Project 4
var types = {
        LoL:['Bruiser', 'AP Carry', 'AD Carry', 'Support', 'Jungle'],
        WoW:['Death Knight', 'Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'],
        Skyrim:['Caster', 'Melee', 'Ranger', 'Stealth', 'Tank'],
        MC: ['Redstone', 'Builds', 'Servers', 'Textures', 'Adventure'],
        TQ: ['Earth', 'Defense', 'Dream', 'Hunting', 'Nature', 'Rogue', 'Spirit', 'Storm', 'Warfare']
};

$(document).ready(function(){

	$.mobile.page.prototype.options.addBackBtn= true;

    $('#clickTop').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickMid').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickBot').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#clickJungle').click(function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#gGame').change(function() {
    	var x= $('#gGame').val()
    	$('#gType option').not('#default').remove()
        for(index in types[x]) {
        	$('#gType').append('<option value="' + types[x][index] + '">' + types[x][index] + '</option>')
        };
    	$('#gType').selectmenu('refresh', true);
    });
    
    $('#bGame').change(function() {
    	var x= $('#bGame').val()
    	$('#bType option').not('#default').remove()
        for(index in types[x]) {
        	$('#bType').append('<option value="' + types[x][index] + '">' + types[x][index] + '</option>')
        };
    	$('#bType').selectmenu('refresh', true);
    });
    
    $('#gGuideForm').validate({
    	invalidHandler: function(form, validator){},
    	submitHandler: function(){
    		alert('Guide saved!');
    		location.reload();
    	}
    });
    
    $('#bGuideForm').validate({
    	invalidHandler: function(form, validator){
    		alert('Error saving guide.');
    		location.reload();
    	},
    	submitHandler: function(){
    		alert('Guide saved!');
    		location.reload();
    	}
    });
    
    $('#gSlide').hide();
    
    $('#gELO').click(function(){
	    if ($('#gELO').is(':checked')){
	    	$('#gSlide').show()
    	} else {
			$('#gSlide').hide()
		};
    });
    
    
	    $.getJSON('JS/JSON.js', function(data) {
			var filler = [];
			
			$.each(data, function(key, val) {
				items.push('<li id="' + key + '">' + val + '</li>');
			});
			
			$('<ul/>', {
				'class': 'my-new-list',
				html: items.join('')
			}).appendTo('body');
		});
	});
});