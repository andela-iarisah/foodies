var error = '<div class= "error"><img height= "500px" width= "500px" 			class= "center" src= "images/error.jpg"/></div>';
var errorRedirect = '<div class= "align"><a href= "index.html"><input 					id= "return" type= "button" value= "Return to Page">   				</div></a>';
var foodies = {
	base_0: "http://www.yummly.com/recipe/",
	base: "http://api.yummly.com/v1/",
	parameter: {
		_app_key: "87f181456268c338b0edf7bdb5006a77",
		_app_id: "5e4de867",
		q: null,
		recipe_id: null,
	},
	
	init: function() {
		$('#submit').click(foodies.searchRecipe);
	},

	iteration: function(data) {
		$('div#toAttach').empty();
		var result = '<ul>';
		var recipe_id;
		if (data.matches.length > 0) {
			$.each(data.matches, function(index, food) {
				console.log(data.matches);
			recipe_id = food.id;
				 if ($.isEmptyObject(food.imageUrlsBySize)) {
					result += '<a target= "_blank" href= "' + foodies.base_0 + "external/" + recipe_id + '"><li class= "style">';
					result += '<img class= "resize" src="images/unavailable.jpg"></a>';
					result += '<p class= "ingredients"><font class= "diff_color">Ingredients include:</font><br>' + food.ingredients + '</p>'
					result +=  '<p class= "width">' + food.recipeName + '</p></li>';	
					}
				else {
					result += '<a target= "_blank" href= "' + foodies.base_0 + "external/" + recipe_id + '"><li class= "style">';
					result += '<img class= "resize" src="' + food.imageUrlsBySize[90] + '"></a>';
					result += '<p class= "ingredients"><font class= "diff_color">Ingredients include:</font><br>' + food.ingredients + '</p>'
					result +=  '<p class= "width">' + food.recipeName + '</p></li>';	
				}
			});
		}
		else {
			$('div.header').hide();
			$('body').html(error+ '<p class= "right">Sorry your input is temporarily unavailable</p>' + errorRedirect);
		}
			result += '</ul>';
			$('div#toAttach').append(result);
				$('p.ingredients').hide();
				$('p.width').mouseenter(function() {
					$(this).slideUp();
					$(this).siblings().slideDown();
				});
				$('p.ingredients').mouseleave(function() {
					$(this).slideUp();
					$(this).siblings().slideDown();
				});
	},

	searchRecipe: function(response) {
		foodies.parameter.q = $("#search").val();	
		if (!isNaN(foodies.parameter.q)) {
			$('div.header').hide();
			$('div#toAttach').html(error + '<p class= "right">Please type a valid input</p>' + errorRedirect);

		}
		else {
			$.getJSON(foodies.base + 'api/recipes?callback=?', foodies.parameter, function(response){
			foodies.iteration(response);
			});
				foodies.parameter.q = $('#search').val('');
		}
	},
}
$(document).ready(foodies.init);