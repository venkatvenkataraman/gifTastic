var listOfAnimals =  ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird",
                      "ferret","turtle", "sugar glider", "chinchilla", "hedge hog",
                      "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig",
                      "serval", "salamander", "frog"];

window.onload = function(){
    // for (var i = 0; i<listOfAnimals.length; i++) {
    for (var i = (listOfAnimals.length-1); i>=0; i--) {
        var r= $("<input type='button' class='btnClass' data-animal='"+listOfAnimals[i]+"' value='"+listOfAnimals[i]+"' />");
        $("#buttonsAppearHere").prepend(r, " ");
    }
  };

  // Adding click event listener to all buttons
  $(document).on("click", ".btnClass", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-animal");

      console.log("Animal selected: " + animal);
      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          $( "#gifsAppearHere").empty();

          // Looping through each result item
          // maxRetrievals=results.length;
          // if (maxRetrievals>10) {maxRetrievals=10;}
          for (var i = 0; i < results.length; i++) {
          // for (var i = 0; i < maxRetrievals; i++) {
            // Creating and storing a div tag
            var animalDiv = $("<div/>");

            // Creating a paragraph tag with the result item's rating
            var ratingNormalized = results[i].rating;
            if (ratingNormalized == ""){
               ratingNormalized = "No rating";
            }
            var p = $("<p>").text("Rating: " + ratingNormalized);
            // var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");


            //Add a class to img tag
            animalImage.addClass("gif");

            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "animate");

            animalDiv.attr("id", "col" + (i+1));

            // Appending the paragraph and image tag to the animalDiv

            animalDiv.append(animalImage);
            animalDiv.append(p);
            // console.log(animalDiv);
            // var idName="#col"+(i+1);
            // console.log(idName);
            // $('"#col"+(i+1)').empty();
            // Prependng the animalDiv to the HTML page in the "#gifsAppearHere" div
            $("#gifsAppearHere").prepend(animalDiv);

          }
        });
     });

    //Adding a new animal
    $("#addAnAnimalForm").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        console.log($("#addAnAnimal").val());
        listOfAnimals.push($("#addAnAnimal").val());
        $("#buttonsAppearHere").empty();
        // for (var i = 0; i<listOfAnimals.length; i++) {
        for (var i = (listOfAnimals.length-1); i>=0; i--) {
            console.log(i);
            var r= $("<input type='button' class='btnClass' data-animal='"+listOfAnimals[i]+"' value='"+listOfAnimals[i]+"' />");
            $("#buttonsAppearHere").prepend(r, " ");
        }
    });

    $(document).on("click", ".gif", function(){
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
