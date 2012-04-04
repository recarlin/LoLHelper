// Russell Carlin
// ASD 1204
// Project 2

$('#home').on('pageinit', function(){

	$.mobile.page.prototype.options.addBackBtn= true;

    $('#thumbnails div').on('click', function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#roster').on('click', function(e){
	    e.preventDefault();
	    $.ajax({
	    	url: 'xhr/roster.json',
	    	type: 'GET',
	    	dataType: 'json',
	    	beforeSend: function(){
	    		$.mobile.changePage("#browser")
	    	},
	    	error: function(){
	    		$.mobile.changePage("#home")
	    	},
	    	success: function(data){
	    		$('#display').empty();
	    		$.each(data, function(id, info){
					$('<ul/>', {html: info.champ + ': '}).appendTo('#display');
					$.each(info, function(key, value){
						$('<li/>', {html: key + ": " + value}).appendTo('#display ul:last');
					});
				});
	    	},
	    	complete: function(){
	    		$('#display').listview('refresh');
			}
		}); 
	});
});