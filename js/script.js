document.addEventListener("DOMContentLoaded", () => {
  getFilms();
});
//массив фильмов
let arrFilms = [];
const onPage = 6;
let topFilm = document.querySelector(".popular-list");

function getFilms() {
  fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/top", {
    method: "GET",
    headers: {
      "X-API-KEY": "51441db6-2864-4273-9781-63813a61ec2e",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => showTopFilms(json))
    .catch((err) => console.log(err));
}

function showTopFilms(promise) {
  arrFilms.push(promise.films);
  console.log(arrFilms[0]);
  for (let i = 0; i < Math.ceil(arrFilms[0].length / onPage); i++) {
    buttons.innerHTML += `<button class="btn-pag" data-from=${
      i * onPage
    } data-to=${i * onPage + onPage}>${i + 1}</button>`;
  }
  for (let i = 0; i < onPage; i++) {
    topFilm.innerHTML += `<li  class="popFilm flex">
        <div id=${arrFilms[0][i].filmId} class="film" >
            <img src=${arrFilms[0][i].posterUrl} class="popFilm-img" alt="Постер фильма" srcset="">
        </div>
    </li>`;
  }
}

document.body.addEventListener("click", (e) => {
  if (!e.target.matches(".btn-pag")) return;
  topFilm.innerHTML = "";

  const from = e.target.dataset.from;
  const to = e.target.dataset.to;
  const sliced = arrFilms[0].slice(from, to);

  for (let i = 0; i < sliced.length; i++) {
    topFilm.innerHTML += `<li  class="popFilm flex">
       <div id=${sliced[i].filmId} class="film" >
           <img src=${sliced[i].posterUrl} class="popFilm-img" alt="Постер фильма" srcset="">
       </div>
   </li>`;
  }
});

//получаем список фильмов по ключевым словам

let btnSearch = document.querySelector("#btnSearch");

btnSearch.addEventListener("click", () => {
  getFilmbyName();
});

function getFilmbyName() {
  let search = document.querySelector("#search");
  //ПОЧЕМУ-ТО ВЫДАЕТ ОШИБКИ ПРИ ВСТАВКЕ ЗНАЧЕНИЯ ВАЛЬЮ Я НЕ СМОГЛА С ЭТИМ БОРОТЬСЯ 
  fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=мстители&page=1`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "51441db6-2864-4273-9781-63813a61ec2e",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => outputFilm(json))
    .catch((err) => console.log(err));
}

function outputFilm(film){ 
    console.log(film) 
    let listSearch= document.querySelector("#searchFilms")
    for (let i = 0; i < 6; i++) {
        listSearch.innerHTML += `<li class="popFilm flex">
        <div class="film" >
            <img src=${film.items[i].posterUrl} class="popFilm-img" alt="Постер фильма" srcset="">
        </div>
    </li>`;;
      }
      
}


