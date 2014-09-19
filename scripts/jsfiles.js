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
		var image = '<ul>';
		var recipe_id;
		if (data.matches.length > 0) {
			$.each(data.matches, function(index, food) {
				recipe_id = food.id;
				 if ($.isEmptyObject(food.imageUrlsBySize)) {
					image += '<a target= "_blank" href= "' + foodies.base_0 + "external/" + recipe_id + '"><li class= "style">';
					image += '<img class= "resize" src="images/unavailable.jpg">';
					image += '<p class= "ingredients hidden">' + recipe_id + '<br><br><input type= "button"  class="recipe" value="Get Recipe"></p>';
				image +=  '<p class= "width">' + food.recipeName + '</p></li></a>';	
				}
				else {
				image += '<a target= "_blank" href= "' + foodies.base_0 + "external/" + recipe_id + '"><li class= "style">';
				image += '<img class= "resize" src="' + food.imageUrlsBySize[90] + '">';
				image += '<p class= "ingredients hidden">' + recipe_id + '<br><br><input type= "button"  class="recipe" value="Get Recipe"></p>';
				image +=  '<p class= "width">' + food.recipeName + '</p></li></a>';	
			}
			});
		}
		else {
			$('div.header').hide();
			$('body').append(error).append('<p class= "right">Sorry your input is temporarily unavailable</p>').append(errorRedirect);
		}
			image += '</ul>'
			$('div#toAttach').append(image);
	},

	searchRecipe: function(response) {
		foodies.parameter.q = $("#search").val();	
		if (!isNaN(foodies.parameter.q)) {
			$('div.header').hide();
			$('div#toAttach').append(error).append('<p class= "right">Please type a valid input</p>').append(errorRedirect);
		}
		else {
			var search;
				$.getJSON(foodies.base + 'api/recipes?callback=?', foodies.parameter, function(response){
					foodies.iteration(response);
			});
				foodies.parameter.q = $('#search').val('');
		}
	},	
}
$(document).ready(foodies.init);