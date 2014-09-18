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

	iterationSearch: function(response) {
		$('div#toAttach').empty();
		var image = '<ul>';
		$.each(response.matches, function(index, food) {
				// image += '<a href= "' + foodies.base + 'api/recipe/' + food.id + '?_app_id=' +'">';
				image += '<a name= "recipe"><li class= "style">';
				image += '<img class= "resize" src="' + food.imageUrlsBySize[90] + '">';
				// image += '<p class= "id">' + food.id + '</p>';
				image += '<p class= "ingredients hidden">' + food.ingredients + '<br><br><input type= "submit" value="Get Recipe" class="recipe"></p>';
				image +=  '<p class= "width">' + food.recipeName + '</p>';
				image += '<input type= "submit" value="Click me!" class="button"></li></a>';
				
			});
		image += '</ul>'
		$('div#toAttach').append(image);
		$('input.button').click(function () {
			// $(this).attr('disabled', true);
			console.log('Show me');
			$('.button').siblings('p.ingredients').addClass('hidden');
			$(this).siblings('p.ingredients').removeClass('hidden');
		});
			$('input.recipe').click(function(response) {
				$.each(response.matches, function(index, recipe) {
					foodies.parameter.recipe_id = recipe.recipe_id;
				});
				$('div.hide').html(foodies.base_0 + foodies.parameter.recipe_id);
			});
	},

	// iterationGet: function(response) {
	// 	var get = 
	// 		$.each('#toAttach', function(index, recipe) {
	// 			foodies.parameter.recipe_id = recipe.recipe_id;
	// 		});
	// 			$.getJSON(foodies.base + 'recipes?callback=?', foodies.parameter, function(recipe){
	// 					$('li.style').click(function() {
	// 						$(this).window.open(foodies.base + 'recipes?callback?');
	// 				});
	// 			});
	// },

	searchRecipe: function() {
		foodies.parameter.q = $("#search").val();
			console.log(foodies.parameter.q);
			var search;
				$.getJSON(foodies.base + 'api/recipes?callback=?', foodies.
				parameter, function(response){
					console.log(response);
					foodies.iterationSearch(response);
					for (var i = 0; i<11; i++) {
						console.log(response.matches[i]);
					}
			});
				foodies.parameter.q = $('#search').val('');
	},	

	// getRecipe: function() {
		
	// 	foodies.iterationGet(response);
	// },
}
$(document).ready(foodies.init);