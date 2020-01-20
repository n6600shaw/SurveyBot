var movies = []

$(document).ready(function () {


    $('#search').click(function () {
        var title = $('#search-input').val().trim();

        searchId(title)


    })
    $(".bubble").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log($(this).id)
        //(... rest of your JS code)
    });

    $('#submit').click(function () {


    })

})


function searchId(title) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=" + title,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "491ae47e37mshefd259e513c863fp170a61jsn3da7f02397b4"
        }
    }
    $.ajax(settings).done(function (response) {
        var ids = []
        var result = response['Search']

        $('#search-result').html('')
        movies = []
        if (result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]['imdbID'])
                if (!ids.includes(result[i]['imdbID'])) {
                    ids.push(result[i]['imdbID'])
                }
            }
        } else {
            console.log("no result")
        }
        for (var i = 0; i < ids.length; i++) {
            searchInfo(ids[i])
        }
    });

}

function searchInfo(id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://imdb8.p.rapidapi.com/title/get-top-stripe?currentCountry=US&purchaseCountry=US&tconst=" + id,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "491ae47e37mshefd259e513c863fp170a61jsn3da7f02397b4"
        }
    }

    $.ajax(settings).done(function (response) {
        movies[id] = response
        createCard(response, id)
    });

}

function createCard(movie, id) {
    var el = "<div onclick='show(this)' id='" + id + "'class='ui card bubble'><div class='image'><img src='" + movie.title.image.url + "'></div><div class='content'> <div style='word-wrap: break-word !important;' class='header'>" + movie.title.title + "</div> <div class='meta'> <span class='date'>Released in" + movie.title.year + "</span> </div> </div> </div>"
    $('#search-result').append(el)
}

function show(card) {
    /*
    $('#review').html('')
    console.log(movies[card.id].title.title)
    var el = "<img class='poster' src='" + movies[card.id].title.image.url + "'>"
    var el2 = " <div class=\"field\">\n" +
        "    <h3>What do you want to say about '" + movies[card.id].title.title + "' ?</h3><br>\n" +
        "    <textarea id='review-content'rows=\"5\"></textarea>\n" +
        "  </div>"
    var el3 = "<button onclick='submit()' class='ui primary button'>Rate review!</button>"
    $('#review').append(el)
    $('#review').append(el2)
    $('#review').append(el3)

    console.log(card.id)*/
    movieTitle = movies[card.id].title.title
    botMessage = "What would like to say about" + movieTitle +"?"
    lastUserMessage = movieTitle
    newEntry()
}

function submit(){
        console.log("Sdfsd")
            var url = "http://localhost:5000/predict"
        var review = lastUserMessage
    console.log(review)
        var data = {
            'review': review,
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data, null, '\t'),
            contentType: 'application/json;charset=UTF-8'
        }).done(function (result) {
            if(result=="Positive"){
                botMessage = "Awesome! I'am glad that you like "+ movieTitle+"!"
            }else{
                botMessage = "Sorry to hear that you did not enjoy "+ movieTitle+ "..."
            }

            newEntry()
            movieTitle = ""
            lastUserMessage = ""

        });
}




