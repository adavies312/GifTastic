$(document).ready(function () {

    var topics = ["Batman", "Superman", "Green Lantern","Wonder Woman", "Aquaman", "Swamp Thing", "Catwoman"];

    var API_KEY = "kOF7wM4ji1Ee6gr2SWQ5HjLi0oh22CkE";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";

function makeButtons () {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info topic btn-lg");
        button.text(topics[i]);
        $("#buttons").append(button);
    }
};
    function createImageDiv(response, i) {
        var img = $("<img class='giphy-img'>");
        // set the src of the element
        img.attr("src", response.data[i].images.downsized_still.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "still");

        var gifCard = $("<div class = 'gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);
        return gifCard;
    }

    $(document).on("click",".topic", function () {
        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var imageDiv = createImageDiv(response, i);

                $("#gifs").append(imageDiv);
            }
        });
    });

    
    $(document).on("click", ".giphy-img", function () {
        var state = $(this).attr("data-state");
        //if the data state is animated
        if (state === "animated") {
            //change the data-state to still 
            $(this).attr("data-state", "still");
            // change the src from the animated to the still version
            $(this).attr("src", $(this).attr("data-still"));

        } else {
            // else change the state to animated
            $(this).attr("data-state", "animated");
            //change the src to animated version
            $(this).attr("src", $(this).attr("data-animated"))
        }
    })


    $("#newGif").on("click", function(){
        var search = $("#search").val().trim();
        topics.push(search);
        $("#new-topic")[0].reset();
        makeButtons();
        return false; 

    })
    makeButtons();
});