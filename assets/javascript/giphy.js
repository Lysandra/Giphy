// Initial array of topics.
var topics = ["trending", "entertainment", "artists", "animals", "holidays", "sports", "memes", "emoticons"];


function displayTopicInfo() {
    
    var topic = $(this).attr("data-topic");
    console.log(this);
    console.log(topic);
    var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=h1NHIr3yaJuk2PdiaA0tcoCALN9xtn1G&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        $("#topic-display").empty();

        for (var i = 0; i < results.length; i++) {

            var topicDiv = $("<div>");    
            var topicRow = $("<row>");        
            var topicP = $("<p>").text("Rating: " + results[i].rating);
            var topicImage = $("<img>");

            topicImage.addClass("gif")
            topicImage.attr("src", results[i].images.fixed_height_still.url);

            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            console.log(results[i].images.fixed_height.url);
            console.log(topicImage.attr("data-animate"));
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-state", "still")
            topicRow.append(topicP);
            topicRow.append(topicImage);
            // topicDiv.append(topicP);
            // topicDiv.append(topicImage)
            topicDiv.append(topicRow);
            $("#topic-display").prepend(topicDiv);
        }
    });
};

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

function renderButtons() {

    $("#topic-buttons").empty();
    $("#find-topic").empty();


    for (var i = 0; i < topics.length; i++) {
        
        topicButton = $("<button>");
        topicButton.addClass("topic gifbutton btn btn-dark btn-lg");
        topicButton.attr("data-topic", topics[i]);
        topicButton.text(topics[i]);
        $("#topic-buttons").append(topicButton);
    }
};


$("#find-topic").on("click", function(event) {
    event.preventDefault();

    var topicNew = $("#topic-input").val().trim();

    topics.push(topicNew);
    console.log(topics);
    
    renderButtons();
    displayTopicInfo();
  });

$(document).on("click", ".topic", displayTopicInfo);

renderButtons();



  