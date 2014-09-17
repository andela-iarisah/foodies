var foodies = {
	base: "https://api.yummly.com/v1/api/",
	parameter: {
		_app_key: "87f181456268c338b0edf7bdb5006a77",
		_app_id: "5e4de867",
		q: null,
	},
	
	init: function() {
		$('#submit').click(foodies.searchRecipe);
		$('li.style').click(foodies.getRecipe);
	},

	iteration: function(response) {
		$('div#toAttach').empty();
		var image = '<ul>';
		$.each(response.matches, function(index, food) {
				image += '<li class= "style">';
				image += '<a class= "float" href= "' + food.imageUrlsBySize[90] + '">';
				image += '<img class= "resize" src="' + food.imageUrlsBySize[90] + '">';
				image +=  '<p class= "width">' + food.recipeName + '</p></li></a>';
			});
		image += '</ul>'
		$('div#toAttach').append(image);
	},

	searchRecipe: function() {
		foodies.parameter.q = $("#search").val();
			console.log(foodies.parameter.q);
			var search;
				$.getJSON(foodies.base + 'recipes?callback=?', foodies.
				parameter, function(response){
					console.log(response);
					foodies.iteration(response);
			});
				foodies.parameter.q = $('#search').val('');
	},	

	getRecipe: function() {
		foodies.iterationGet(recipe);
			$.getJSON(foodies.base + 'recipe/recipe-id?callback=?', foodies.parameter + result, function(recipe){
				console.log(recipe);
			});
		
	},
}
$(document).ready(foodies.init);