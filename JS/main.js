// Russell Carlin
// ASD 1204
// Project 1

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
    
    $('#gGuideForm').validate({
    	invalidHandler: function(form, validator){},
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
    
    $('#browser').bind('pagebeforeshow', function(){
	    $.getJSON('JS/filler.json', function(data){
			$.each(data, function(id, info){
				$('<ul/>', {html: id + ': ', 'data-role':'listview'}).appendTo('#display');
				$.each(info, function(key, value){
					$('<li/>', {html: key + ": " + value}).appendTo('#display ul:last');
				});
			});
		});
		$('#display ul').listview('refresh');
	});
});