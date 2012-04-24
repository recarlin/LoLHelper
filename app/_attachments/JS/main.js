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
				$.mobile.changePage('#home');
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
	
	$('#display').on('click', 'a' ,function(){
		
		$.ajax({
			url: '_view/roster',
			type: 'GET',
			dataType: 'json',
			beforeSend: function(){
				$.mobile.changePage('#dataDisplay');
			},
			error: function(){
				alert('Oh no!');
			},
			success: function(d){
				var dataType = this.type;
				$('#infoDisplay').empty();
				if (dataType === 'roster'){
					$('<li/>', {html: 'Lane: ' + this.value.lane}).appendTo('#display ul:last');
					$('<li/>', {html: 'Build: ' + this.value.build}).appendTo('#display ul:last');
					$('<li/>', {html: 'Runes: ' + this.value.runes}).appendTo('#display ul:last');
					$('<li/>', {html: 'Masteries: ' + this.value.masteries}).appendTo('#display ul:last');
				} else {
					if (dataType === 'counter'){
						$('<li/>', {html: 'Counter Champions: ' + this.value.champs}).appendTo('#display ul:last');
						$('<li/>', {html: 'Counter Stats and Items: ' + this.value.stats}).appendTo('#display ul:last');
					} else {
						$('<li/>', {html: 'AD Carry: ' + this.value.ad_carry}).appendTo('#display ul:last');
						$('<li/>', {html: 'Support: ' + this.value.support}).appendTo('#display ul:last');
					};
				}
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
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Champion saved to roster!');
			},
			error: function() {
				alert("ERROR.");
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
				$.mobile.changePage('#home');
			},
			success: function(d){
				$('#display').empty();
				$.each(d, function(id, counter){
					$.each(counter, function(k, v){
						$('<li/>', {html: this.value.name}).appendTo('#display');
						$('#display li:last').append('<ul></ul>');
						$('<li/>', {html: 'Counter Champions: ' + this.value.champs}).appendTo('#display ul:last');
						$('<li/>', {html: 'Counter Stats and Items: ' + this.value.stats}).appendTo('#display ul:last');
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
				$.each(d, function(id, combo){
					$.each(combo, function(k, v){
						$('<li/>', {html: this.value.style}).appendTo('#display');
						$('#display li:last').append('<ul></ul>');
						$('<li/>', {html: 'AD Carry: ' + this.value.ad_carry}).appendTo('#display ul:last');
						$('<li/>', {html: 'Support: ' + this.value.support}).appendTo('#display ul:last');
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
		$db.saveDoc(info, {
			success: function() {
				$.mobile.changePage('#home', 'slidedown');
				alert('Combo saved!');
			},
			error: function() {
				alert("ERROR.");
			}
		});
		return false;
	});
	
});