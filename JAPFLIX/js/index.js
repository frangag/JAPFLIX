//Petición
let movies = [];
fetch("https://japceibal.github.io/japflix_api/movies-data.json").then(
  function (data) {
    data.json().then(function (respuesta) {
      movies = respuesta;
      //console.log(respuesta)
    });
  }
);
//Función para filtrar según title, overview, tagline y genres.
function getMovieByName(name) {
  let moviesfiltradas = movies.filter(function (movie) {
    let nameLowercase = name.toLowerCase();
    let selectedgenre = movie.genres.filter(function (genre) {
      return genre.name.toLowerCase().includes(nameLowercase);
    });
    return (
      movie.title.toLowerCase().includes(nameLowercase) ||
      movie.overview.toLowerCase().includes(nameLowercase) ||
      movie.tagline.toLowerCase().includes(nameLowercase) ||
      selectedgenre.length > 0
    );
  });
  return moviesfiltradas;
}
//Obtener input y boton,  guardarlos.
let input = document.getElementById("inputBuscar");
//Agrego evento al boton.
let botonBuscar = document.getElementById("btnBuscar");
botonBuscar.addEventListener("click", function () {
  if (input.value != 0) {
    //Este if verifica que el usuario haya puesto algún valor en el campo de búsqueda
    lista.innerHTML = "";
    let movie = getMovieByName(input.value);
    //Mostrar en pantalla
    imprimirPantalla(movie);
    //console.log(movie)
  }
});
let lista = document.getElementById("lista");

//FUNCION IMPRIMIR EN PANTALLA
function imprimirPantalla(array) {
  //console.log(array)
  let stars = `<div class="d-flex justify-content-between align-items-center">
                  <div class="ratings"> `;
  let enableStars = `<i class="fa fa-star rating-color"></i>`;
  let disableStars = `<i class="fa fa-star "></i>`;

  for (i = 0; i < array.length; i++) {
    let score = array[i].vote_average;
    let scoreRedondeado = Math.round(score / 2);
    for (j = 1; j <= scoreRedondeado; j++) {
      stars += enableStars;
    }
    for (k = scoreRedondeado; k < 5; k++) {
      stars += disableStars;
    }
    stars += `</div>`;

    lista.innerHTML += `<div onclick="showmovies(${array[i].id})" class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"  id="botonDesplegar">
        <div id="movie${array[i].id}" >
             <h5 class="title">${array[i].title}</h5>
                 <h6 class="tagline">${array[i].tagline}</h6>
                     ${stars}
        </div>
    </div>
    <hr>
    `;
    stars = `<div class="d-flex justify-content-between align-items-center">
        <div class="ratings">`;
  }
}
//PLACEMENT MOVIE
function showmovies(movieID) {
  const movie = movies.find(({ id }) => id === movieID);
  let nombre = movie.title;
  let reseña = movie.overview;
  let generos = movie.genres;
  console.log({ nombre, reseña, generos, movie });
  if (movie) {
    document.getElementById(
      "selectedMoviesInfo"
    ).innerHTML = `<h2 class="offcanvas-title">${nombre}</h2><br><h5 class="overview">${reseña}</h5> <hr id="off"> ${generos
      .map(function (genero) {
        return `<span class="text-muted">${genero.name}</span>`;
      })
      .join(" - ")}`;
    setDropdownMenu(movie);
  }
}
//DROPDOWN MENU
function setDropdownMenu({ release_date, runtime, budget, revenue }) {
  let dropdownMenu = document.getElementById("menudesplegable");
  dropdownMenu.innerHTML = `
          <li><a class="dropdown-item">Year: ${
            release_date.split("-")[0]
          }</a></li>
          <li><a class="dropdown-item">Runtime: ${runtime} mins</a></li>
          <li><a class="dropdown-item">Budget: $${budget}</a></li>
          <li><a class="dropdown-item">Revenue: $${revenue}</a></li>
      `;
}
