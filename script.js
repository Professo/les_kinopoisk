const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movis');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    server = 'https://api.themoviedb.org/3/search/multi?api_key=ead41c3eaac089640f31601bd088ab4e&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            console.log(nameItem);
            //inner = inner + '<div class="col-3">' + nameItem + '</div>';
            //inner += '<div class="col-12">' + nameItem + '</div>'; //+= суммирование присаиванием
            inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`; //ies6 обратные кавычки. переменные внутрь строки
        });
        movie.innerHTML = inner;
        //console.log(output);
    });
}