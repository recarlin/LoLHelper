// Russell Carlin
// ASD 1204
// Project 2

$('#home').live('pageinit', function(){

	$.mobile.page.prototype.options.addBackBtn= true;

    $('#thumbnails div').on('click', function(){
     window.location=$(this).find('a').attr('href');
     return false;
    });
    
    $('#browser').on('pageinit', function(){
	    $.getJSON('externalData/roster.json', function(data){
			$.each(data, function(id, info){
				$('<ul/>', {html: id + ': '}).appendTo('#display');
				$.each(info, function(key, value){
					$('<li/>', {html: key + ": " + value}).appendTo('#display ul:last');
				});
			});
		});
		$('#display').listview('refresh');
	});
});