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
					$('<li/>', {html: info.champ + ': '}).appendTo('#display');
					$('#display li:last').append('<ul></ul>');
					$.each(info, function(key, value){
						$('<li/>', {html: key + ": " + value}).appendTo('#display ul:last');
					});
				});
	    	},
	    	complete: function(){
	    		$('#contain ul').each(function(){
	    			$(this).listview();
	    			$(this).listview('refresh');
	    		});
			}
		}); 
	});
	
	$('#counters').on('click', function(e){
	    e.preventDefault();
	    $.ajax({
	    	url: 'xhr/counters.xml',
	    	type: 'GET',
	    	dataType: 'xml',
	    	beforeSend: function(){
	    		$.mobile.changePage("#browser")
	    	},
	    	error: function(){
	    		$.mobile.changePage("#home")
	    	},
	    	success: function(d){
	    		$('#display').empty();
	    		console.log(d);
	    	},
	    	complete: function(){
	    		$('#contain ul').each(function(){
	    			$(this).listview();
	    			$(this).listview('refresh');
	    		});
			}
		}); 
	});
	
	$('#combos').on('click', function(e){
	    e.preventDefault();
	    $.ajax({
	    	url: 'xhr/combos.csv',
	    	type: 'GET',
	    	dataType: 'csv',
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
	    		$('#contain ul').each(function(){
	    			$(this).listview();
	    			$(this).listview('refresh');
	    		});
			}
		}); 
	});
});