class Movie{
   static currentPage=1
   static  numberOfMovies=""
   static topRated=""
    static Rating=""
     static test=1
     toprated=0
    static topratedMovie
    static movies=[]
    constructor (){

    }
   init(){
    this.cacheElements();

    this.fetch();
    this.render();
    this.events();


    Movie.Rating=Movie.movies.results[Movie.currentPage].vote_average;
    Movie.numberOfMovies=Movie.movies.results.length;
    for(var i=0;i<Movie.movies.results.length;i++){
        if(Movie.movies.results[i].vote_average>this.toprated){
            this.toprated=Movie.movies.results[i].vote_average;
            Movie.topratedMovie=Movie.movies.results[i].title;


        }
      

    }
    //eventsMediator.on("page.dec",this.increment.bind(this));
        //eventsMediator.on("page.inc",this.increment.bind(this));







   }increment(){
    this.test++;
    console.log("done")

   }
   decrement(){
    this.test--;
    console.log("done")
   }
   
    cacheElements(){
       
        this.$list = $("#list");
        this.movieTemplate = $("#Movie-template").html();


    }
    fetch(){
        $.ajax({
            type: "Get",
            async: false,            
            url: "https://api.themoviedb.org/3/movie/popular?api_key=04aa449477733665f4190bfde752bc4c&page="+Movie.currentPage,
            cache: false,
            dataType: "json",
            
            success: function (data) {
              Movie.movies = data;
              document.getElementById("loader").style.display = "none";

              console.log(Movie.movies);
            
            
             
              
              
    
            }
          })

    }
    render(){
       console.log(this.movieTemplate)
       this.$list.html(Mustache.render(this.movieTemplate,{movies:Movie.movies.results}));


    }
    events(){


        document.addEventListener("click", function (evnt) {
            console.log(evnt.target.id);
            var doc=$("#description");
            var img=$("#image");
            doc.html();
            for(var i=0;i<Movie.movies.results.length;i++){
                if(evnt.target.id==Movie.movies.results[i].id){
                    img.attr("src","https://image.tmdb.org/t/p/original/"+Movie.movies.results[i].poster_path);
                    doc.html(Movie.movies.results[i].overview);



                }
            }
        });
    }
}
var movie=new Movie;
movie.init();

class upperPart{

    init(){
        this.cache();
        this.render();
    }

    cache(){
        this.currentPage=$("#current-page");
        this.topRated=$("#top_ratedd");
        this.totalMovies=$("#total-movies");
        this.rating=$("#rating");
   
    }
    render(){

        this.currentPage.html("current page : "+Movie.currentPage);
        this.rating.html("Average Rating : "+Movie.Rating);
        this.totalMovies.html("Total Movies :"+Movie.numberOfMovies);
        this.topRated.html("Top Rated :"+Movie.topratedMovie);

    }
   


}
var upper=new upperPart;


class pagination{

    init(){
        this.cach();
        this.bindevents();
    }
    cach(){
        this.next=$("#next-button");
        this.prev=$("#prev-button");

    }
    bindevents(){
        this.next.on("click", this.increment.bind(this));
        this.prev.on("click",this.decrement.bind(this));
    }
    decrement(){
        Movie.currentPage--;
        console.log(Movie.currentPage);

        eventsMediator.emit("page.dec");
        this.render();
        upper.init();
        movie.init();




    }
    increment(){
        Movie.currentPage++;
        console.log(Movie.currentPage);
        eventsMediator.emit("page.inc", Movie.currentPage);

        this.render();
        upper.init();
        movie.init();


       


    }
    render(){
        Movie.Rating=Movie.movies.results[Movie.currentPage].vote_average;
        console.log(Movie.Rating);
        Movie.numberOfMovies=Movie.movies.results.length;
        console.log(Movie.numberOfMovies);



    }

}
var Pagination=new pagination;
Pagination.init();
movie.init();
upper.init();


var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
      this.events[eventName] = this.events[eventName]
        ? this.events[eventName]
        : [];
      this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callBackfn) {
          callBackfn(data);
        });
      }
    },
  };