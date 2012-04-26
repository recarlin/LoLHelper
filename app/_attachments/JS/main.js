// Russell Carlin
// ASD 1204
// Project 4
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
		$('#rosterChampion').append('<option data-placeholder="true" value="">Select Champion</option>');
		$(championList).each(function(){
			$('#rosterChampion').append('<option value="' + this + '">' + this + '</option>');
		});
		$('#rosterChampion').selectmenu('refresh', true);
	});
	
	$('#submitRoster').on('click', function(e){
		e.preventDefault();
		var info = {},
			gotID = $('#rosterID').text();
		
		if (gotID !== ''){
			info._id = $('#rosterID').text();
			info._rev = $('#rosterREV').text();
		};
		info.Champion = $('#rosterChampion').val();
		info.Lane = $('#lane').val();
		info.Build = $('#build').val();
		info.Runes = $('#runePage').val();
		info.Masteries = $('#masteries').val();
		info.type = 'roster';
	
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Champion saved!');
				$('#rosterID, #rosterREV').empty();
				$('#rosterField input').val('');
				$('#rosterField select').val('');
				$('#rosterForm select').each(function(){
					$(this).selectmenu('refresh', true);
				});
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
		$('#counterChampion, #counters').empty().append('<option data-placeholder="true" value="">Select Champion</option>');
		$(championList).each(function(){
			$('#counterChampion, #counters').append('<option value="' + this + '">' + this + '</option>');
		});
		$('#counterForm select').each(function(){
			$(this).selectmenu('refresh', true);
		});
	});
	
	$('#submitCounter').on('click', function(e){
		e.preventDefault();
		var info = {},
			gotID = $('#counterID').text();
		
		if (gotID !== ''){
			info._id = $('#counterID').text();
			info._rev = $('#counterREV').text();
		};
		info.name = $('#counterChampion').val();
		info.champs = $('#counters').val();
		info.stats = $('#statItem').val();
		info.type = 'counter';
		
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Counters saved!');
				$('#counterID, #counterREV').empty();
				$('#counterField input').val('');
				$('#counterField select').val('');
				$('#counters option:contains("Select Champion")').removeAttr('selected');
				$('#counterForm select').each(function(){
					$(this).selectmenu('refresh', true);
				});
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
						$('#display li:last').append('<a href="" id="' + this.value.itemID + '">' + this.value.ad_carry + ' and ' + this.value.support + '</a>');
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
		var info = {},
			gotID = $('#comboID').text();
		
		if (gotID !== ''){
			info._id = $('#comboID').text();
			info._rev = $('#comboREV').text();
		};
		info.style = $('#style').val();
		info.ad_carry = $('#ADCarry').val();
		info.support = $('#support').val();
		info.strat = $('#strat').val();
		info.type = 'combo';
		
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Combo saved!');
				$('#comboID, #comboREV').empty();
				$('#comboField input').val('');
				$('#comboField select').val('');
				$('#comboForm select').each(function(){
					$(this).selectmenu('refresh', true);
				});
			},
			error: function() {
				alert('Oh no!');
			}
		});
		return false;
	});
	
	$('#timersGo').on('click', function(e){
		e.preventDefault();
		$.mobile.changePage('#timers');
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
					$('#infoDisplay').append('<h3>Champion:</h3><p>' + d.Champion + '</p><h4>Lane:</h4><p>' + d.Lane + '</p><h4>Build:</h4><p>' + d.Build + '</p><h4>Rune Page:</h4><p>' + d.Runes +'</p><h4>Masteries:</h4><p>' + d.Masteries + '</p>');
					$('#storeID').text(d._id);
				} else {
					if (dataType === 'counter'){
						$('#infoDisplay').append('<h3>Champion:</h3><p>' + d.name + '</p><h4>Counter Champions:</h4><p>' + d.champs + '</p><h4>Counter Items and Stats:</h4><p>' + d.stats + '</p>');
						$('#storeID').text(d._id);
					} else {
						$('#infoDisplay').append('<h3>' + d.ad_carry + ' and ' + d.support + '</h3><h4>Style:</h4><p>' + d.style + '</p><h4>Strategy:</h4><p>' + d.strat + '</p>');
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
						
						$('#counters').val('');
						$('#counters option:contains("Select Champion")').removeAttr('selected');
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
							k = doc.support,
							l = doc.strat;
						$.mobile.changePage("#comboAdd");
	
						$('#style').val( i );
						$('#ADCarry').val( j );
						$('#support').val( k );
						$('#strat').val( l );
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