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

	iteration: function(response) {
		$('div#toAttach').empty();
		var image = '<ul>';
		var recipe_id;
		$.each(response.matches, function(index, food) {
				recipe_id = food.id;
				console.log(recipe_id);
				image += '<a target= "_blank" href= "' + foodies.base_0 + "external/" + recipe_id + '"><li class= "style">';
				image += '<img class= "resize" src="' + food.imageUrlsBySize[90] + '">';
				image += '<p class= "ingredients hidden">' + recipe_id + '<br><br><input type= "button"  class="recipe" value="Get Recipe"></p>';
				image +=  '<p class= "width">' + food.recipeName + '</p></li></a>';	
			});
		image += '</ul>'
		$('div#toAttach').append(image);
	},

	searchRecipe: function() {
		foodies.parameter.q = $("#search").val();
			console.log(foodies.parameter.q);
			var search;
				$.getJSON(foodies.base + 'api/recipes?callback=?', foodies.parameter, function(response){
					console.log(response);
					foodies.iteration(response);
			});
				foodies.parameter.q = $('#search').val('');
	},	
}
$(document).ready(foodies.init);