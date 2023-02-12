const form = document.getElementById("form");
const input = document.getElementById("input");
const main = document.getElementById("main");

const api_url =
'https:api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=ecf4f42d6bd52794f40f581d46ac41e3&page=1';
const img_path = "https://image.tmdb.org/t/p/w500";
const search_api =
'https://api.themoviedb.org/4/search/movie?api_key=ecf4f42d6bd52794f40f581d46ac41e3&query="';

// console.log(input);

getMovies(api_url);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
//   console.log(data);
  showMovies(data.results);
}

form.addEventListener("submit",(e)=>{
    if(input.value && input.value!==""){
        getMovies(search_api+input.value)
        input.value="";
    }else{
        window.location.reload()
    }
    // console.log(search_api + input.value);
    e.preventDefault();
})
function showMovies(movies) {
    main.innerHTML = "";
    console.log(movies);
    movies.forEach((movie) => {
        const movieHandle = document.createElement("div");
        movieHandle.classList.add("movies");
        const { original_title, overview, poster_path, vote_average } = movie;
    
        movieHandle.innerHTML = `
        <img  src="${img_path + poster_path} " alt="${original_title} ">
                <div class="movie-info">
                    <h3>${original_title}</h3>
                    <span class="${getRatingColor(vote_average)} ">${vote_average} </span>
                </div>
                <div class="overview">
                    <h3>${original_title}</h3>
                    <p>${overview}</p>
                </div>
        `;
        main.appendChild(movieHandle);
    }); 
};
function getRatingColor(vote) {
    if(vote>=8){
        return "green"
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }
}
