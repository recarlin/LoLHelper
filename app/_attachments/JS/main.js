// Russell Carlin
// ASD 1204
// Project 3
var championList = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Cho'gath", "Corki", "Dr. Mundo", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo", "Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yorick", "Ziggs", "Zilean"];
$('#home').on('pageinit', function(){
	var $db = $.couch.db('lolhelper');
	
	$.mobile.page.prototype.options.addBackBtn= true;

	$('#thumbnails div').on('click', function(){
		window.location=$(this).find('a').attr('href');
		return false;
	});
	
	$('#rosterGo').on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: '_view/roster',
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$.mobile.changePage('#browser');
			},
			error: function(){
				alert('Oh no!');
			},
			success: function(d){
				$('#display').empty();
				$.each(d, function(id, data){
					$.each(data, function(k, v){
						$('<li/>').appendTo('#display');
						$('#display li:last').append('<a href="" id="' + this.value.itemID + '">' + this.value.name + '</a>');
					});
				});
			},
			complete: function(){
				$('#contain ul').each(function(){
					$(this).listview('refresh');
				});
			}
		}); 
	});
	
	$('#rosterAdd').on('pageinit', function(){
		$('#rosterChampion').empty();
		$('#rosterChampion').append('<option data-placeholder="true" value="">Select a Champion</option>');
		$(championList).each(function(){
			$('#rosterChampion').append('<option value="' + this + '">' + this + '</option>');
		});
		$('#rosterChampion').selectmenu('refresh', true);
	});
	
	$('#submitRoster').on('click', function(e){
		e.preventDefault();
		var info = {};
		info.Champion = $('#rosterChampion').val();
		info.Lane = $('#lane').val();
		info.Build = $('#build').val();
		info.Runes = $('#runePage').val();
		info.Masteries = $('#masteries').val();
		info.type = 'roster';
		if ($('#rosterID') !== ''){
			info._id = $('#rosterID').text();
			info._rev = $('#rosterREV').text();
		} else {
			return false;
		};
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Champion saved to roster!');
			},
			error: function() {
				alert('Oh no!');
			}
		});
		return false;
	});
	
	$('#countersGo').on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: '_view/counters',
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$.mobile.changePage('#browser');
			},
			error: function(){
				alert('Oh no!');
			},
			success: function(d){
				$('#display').empty();
				$.each(d, function(id, data){
					$.each(data, function(k, v){
						$('<li/>').appendTo('#display');
						$('#display li:last').append('<a href="" id="' + this.value.itemID + '">' + this.value.name + '</a>');
					});
				});
			},
			complete: function(){
				$('#contain ul').each(function(){
					$(this).listview('refresh');
				});
			}
		}); 
	});
	
	$('#counterAdd').on('pageinit', function(){
		$('#counterChampion, #counters').empty().append('<option data-placeholder="true" value="">Select a Champion</option>');
		$(championList).each(function(){
			$('#counterChampion, #counters').append('<option value="' + this + '">' + this + '</option>');
		});
		$('#counterForm select').each(function(){
			$(this).selectmenu('refresh', true);
		});
	});
	
	$('#submitCounter').on('click', function(e){
		e.preventDefault();
		var info = {};
		info.name = $('#counterChampion').val();
		info.champs = $('#counters').val();
		info.stats = $('#statItem').val();
		info.type = 'counter';
		if ($('#counterID') !== ''){
			info._id = $('#counterID').text();
			info._rev = $('#counterREV').text();
		} else {
			return false;
		};
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Counter saved!');
			},
			error: function() {
				alert("ERROR.");
			}
		});
		return false;
	});
	
	$('#combosGo').on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: '_view/combos',
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$.mobile.changePage('#browser');
			},
			error: function(){
				$.mobile.changePage('#home');
			},
			success: function(d){
				$('#display').empty();
				$.each(d, function(id, data){
					$.each(data, function(k, v){
						$('<li/>').appendTo('#display');
						$('#display li:last').append('<a href="" id="' + this.value.itemID + '">' + this.value.style + '</a>');
					});
				});
			},
			complete: function(){
				$('#contain ul').each(function(){
					$(this).listview('refresh');
				});
			}
		}); 
	});
	
	$('#comboAdd').on('pageinit', function(){
		$('#ADCarry, #support').empty().append('<option data-placeholder="true" value="">Select a Champion</option>');
		$(championList).each(function(){
			$('#ADCarry, #support').append('<option value="' + this + '">' + this + '</option>');
		});
		$('#comboForm select').each(function(){
			$(this).selectmenu('refresh', true);
		});
	});
	
	$('#submitCombo').on('click', function(e){
		e.preventDefault();
		var info = {};
		info.style = $('#style').val();
		info.ad_carry = $('#ADCarry').val();
		info.support = $('#support').val();
		info.type = 'combo';
		if ($('#comboID') !== ''){
			info._id = $('#comboID').text();
			info._rev = $('#comboREV').text();
		} else {
			return false;
		};
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Combo saved!');
				$('#comboID').empty();
				$('#comboREV').empty();
			},
			error: function() {
				alert('Oh no!');
			}
		});
		return false;
	});
	
	$('#display').on('click', 'a' ,function(){
		var getInfo = '/lolhelper/' + $(this).attr('id');
		$.ajax({
			url: getInfo,
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$.mobile.changePage('#dataDisplay');
			},
			error: function(){
				alert('Oh no!');
			},
			success: function(d){
				var dataType = d.type;
				$('#infoDisplay').empty();
				$('#storeID').empty();
				if (dataType === 'roster'){
					$('#infoDisplay').append('<h3>Champion:</h3><p>' + d.Champion + '<h4>Lane:</h4><p>' + d.Lane + '<h4>Build:</h4><p>' + d.Build + '<h4>Rune Page:</h4><p>' + d.Runes +'<h4>Masteries:</h4><p>' + d.Masteries);
					$('#storeID').text(d._id);
				} else {
					if (dataType === 'counter'){
						$('#infoDisplay').append('<h3>Champion:</h3><p>' + d.name + '<h4>Counter Champions:</h4><p>' + d.champs + '<h4>Counter Items and Stats:</h4><p>' + d.stats);
						$('#storeID').text(d._id);
					} else {
						$('#infoDisplay').append('<h3>AD Carry:</h3><p>' + d.ad_carry + '<h4>Support:</h4><p>' + d.support);
						$('#storeID').text(d._id);
					};
				};
			}
		}); 
	});
	
	$('#delete').on('click', function(){
		var	deleteThis = $('#storeID').text(),
			r = confirm('Delete?');
		if (r === false){
			alert('Delete canceled!');
		} else {
			$db.openDoc(deleteThis, {
	        	success: function(doc){
		            $db.removeDoc(doc, {
		                success: function(){
		                    $.mobile.changePage("#home");
		                    alert('Deleted!');
		                },
		                error: function(){
		                    alert('Oh no!');
		                }
	        		});
		        },
		        error: function() {
		            alert('Oh no!');
		        }
		    });
		    return false;
		};
	});
	
	$('#edit').on('click', function(){
		var	deleteThis = $('#storeID').text();
		$db.openDoc(deleteThis, {
			success: function(doc){
				if (doc.type === 'roster'){
					var a = doc.Champion,
						b = doc.Lane,
						c = doc.Build,
						d = doc.Runes,
						e = doc.Masteries;
						
					$.mobile.changePage("#rosterAdd");

					
					$('#rosterChampion').val( a );
					$('#lane').val( b );
					$('#build').val( c );
					$('#runePage').val( d );
					$('#masteries').val( e );
					$('#rosterForm select').each(function(){
						$(this).selectmenu('refresh', true);
					});
					$('#rosterID').text(deleteThis);
					$('#rosterREV').text(doc._rev);
				} else {
					if (doc.type === 'counter'){
						var f = doc.name,
							g = doc.champs,
							h = doc.stats;
						
						$.mobile.changePage("#counterAdd");
						
						$('#counterChampion').val( f );
						$.each(g, function(){
							$('#counters option:contains("' + this + '")').attr('selected', 'selected');
						});
						$('#statItem').val( h );
						$('#counterForm select').each(function(){
							$(this).selectmenu('refresh', true);
						});
						$('#counterID').text(deleteThis);
						$('#counterREV').text(doc._rev);
					} else {
						var i = doc.style,
							j = doc.ad_carry,
							k = doc.support;
						$.mobile.changePage("#comboAdd");
	
						$('#style').val( i );
						$('#ADCarry').val( j );
						$('#support').val( k );
						$('#comboForm select').each(function(){
							$(this).selectmenu('refresh', true);
						});
						$('#comboID').text(deleteThis);
						$('#comboREV').text(doc._rev);
					};
				};
			},
			error: function(){
				alert('Oh no!');
			}
		});
	});
});