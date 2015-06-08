$(document).ready(function(){
	//:tells you what function to call acording to the url	
	var App = Backbone.Router.extend({
		routes:{
			'': 'home',
			'search/:query': 'search'
		

		},
		//:
		home:function(){
			console.log('home');
		
			//:function that gets called when you type in URL
		},
		search:function(query){
			console.log('search', query);
			var url=  'http://www.omdbapi.com/?s='+query+'&y=&plot=short&r=json';
			var $divtitle = $('#divtitle')
			$divtitle.empty()

			//:gets the url of the movie
			$.get(url, movie);
			function movie(theMovie){
				//:gives you the title of the movie and nothing more
				$divtitle.text(theMovie.Title);
				for (var i = 0; i<theMovie.Search.length; i++){
					var movieli = _.template($movietemplate);
					$divtitle.append(movieli(theMovie.Search[i]));

				}
				//:makes the movie an array according to the variable below
								//:variable that holds the list from html
				console.log($listofmovies);
				console.log(theMovie)


			}

		}



	});
	
	var myRouter = new App();
	//: HAVE TO HAVE THIS IDK WHAT IT IS (some bull shit)
	Backbone.history.start();
	//:sets the button to push enter, or clicking the button (has to be a form)
	$('#inputform').submit(inputform);
	var $listofmovies = [];
	var $movietemplate ='<li movieId="<%=imdbID%>" movietitle="<%=Title%>"><%=Title %><br><%=Year%><br><%=Type%><br></li>';
	$('body').on ('click', 'li', 
		function(e){
			var movieid = $(e.target).attr ('movieId');
			var movietitle = $(e.target).attr ('movietitle');
			$listofmovies.push ({id:movieid,title:movietitle});
			var $watchlist = $('#watchlist')
			$watchlist.empty()
			for (var i = 0; i< $listofmovies.length; i++){
				console.log($listofmovies[i])
				$watchlist.append('<div>'+$listofmovies[i].title+'</div>')
			}






	});


	function inputform(event){
		console.log (inputform)
		//:keeps page from refreshing (it refreshes defaultly)
		event.preventDefault();
		console.log ($('#inputbox').val());
		//:getting the info they type into the inputbox
		var goToPage='search/'+($('#inputbox').val());
		console.log (goToPage)
		//:changes the url when you hit submit 
		myRouter.navigate(goToPage,{trigger:true})


	}
})
