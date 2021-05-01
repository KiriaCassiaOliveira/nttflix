$(document).ready(() => {
  page('/', index);
  page();
})

function index() {
  $("#content").html("");
  const home = `<div id="home">
    <form>
    <input type="text" id="searchTerm" style="font-style:italic; color:#000" placeholder="Qual filme você procura?"/>
    <button id="searchButton">
    <i class="fa fa-search"></i>
    </button>
    </form>
</div>`
  $("#content").html(home);
  getMovies();
}

function getMovies(){
  $("#searchButton").on( "click", (event) => {
    $("#home").css("height", "250px").css("align-items", "flex-end");
    event.preventDefault();
    showMovies()
  });
}

function showMovies() {
  fetch(`http://www.omdbapi.com/?apikey=a763ab84&s=${$("#searchTerm").val()}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => insertMovies(data))
    .catch(error => alert("Ops... tivemos um problema, tente novamente mais tarde!!", error))
}
function insertMovies(data) {
  clearMovies();
  data.Search.forEach(item => {
    let content = `
    <div class="movie-item">
      <img src="${item.Poster}"  width="150" height="200">
      <h3>${item.Title}</h3>
      <a href="https://www.imdb.com/title/${item.imdbID}">IMDB</a>
    </div> `;
    $('#movies').append(content);
  });


  function clearMovies(){
    $('#movies').html("");
  }

}
