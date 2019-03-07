var arrayURL = [];
var arrayMoveURL = [];
var buttonSearch = ["angry", "happy", "sad", "frustrated", "excited", "depressed"];

//function for console
function log(item){
    console.log(item);
    console.log("===========---------============");
}
//function to make a button
function addAButton(search, appendReference) {
    var newButton = $("<button>");
    newButton.attr("type", "button");
    newButton.addClass("btn btn-primary");
    newButton.data("query", search);
    newButton.text(search.toUpperCase());
    $(appendReference).append(newButton);

}


//function to clear the board
function clearBoard () {
    arrayURL = [];
    arrayMoveURL = [];
    $(".bellyWrapper").remove();
}

//function to build array with url for image tags
function buildArray(search, array1, array2) {
    clearBoard();
    var urlQuery = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+search+"&limit=10";
  $.ajax({
    url: urlQuery,
    method: "GET"
  }).then(function(response) {
        for (var i = 0; i < 10; i++) {
            array1.push(response.data[i].images.fixed_height_still.url);
            array2.push(response.data[i].images.fixed_height.url);
        }
        imageBoard(array1, array2, ".container", 5, 2);
    });
}
//function to build grid of gifs
function imageBoard(array1, array2, appendReference, column, row) {
    var count = 0;
    
    //Add Div for Row
        for (var i = 0; i < row; i++)
        {
            var rowDiv = $("<div>");
            //Classify as row and add or subtract any padding
            rowDiv.addClass("row pb-3 bellyWrapper");
            $(appendReference).append(rowDiv);
            //Add Div for Column and img tag
            for (var j = 0; j < column; j++) {
                var colDiv = $("<div>");
                var belly = $("<img>");
                belly.addClass("belly");
                belly.attr("id", "belly"+count);
                belly.data("play", false);
                var colSize = 12/column; //for bootstrap row class
                //Classify as column and add or subtract any padding
                colDiv.addClass("col-"+colSize+" box pr-3");
                colDiv.append(belly);
                rowDiv.append(colDiv); 
                $("#belly"+count).attr("src", array1[count]);
                count++;
            }
        }
        $(".belly").click(function() {
            var thisID = $(this).attr("id");
            thisIDNumber = thisID.substr(-1);
            var isPlay = $(this).data("play");
            if (isPlay === false) {
            $(this).attr("src", array2[thisIDNumber]);
            $(this).data("play", true);
            }
            else {
            $(this).attr("src", array1[thisIDNumber]);
            $(this).data("play", false);
            }
        });

        
}

    //set the buttons
    for (var i=0; i<buttonSearch.length; i++) {
        addAButton(buttonSearch[i], ".jumbotron");
    }

    $(".btn").click(function() {
        search = $(this).data("query");
        buildArray(search, arrayURL, arrayMoveURL);
    })

    $("#add-giffy").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var giffy = $("#giffy-input").val().trim();
        clearBoard();
        $(".btn").remove();
        buttonSearch.push(giffy);
        //set the buttons
        for (var i=0; i<buttonSearch.length; i++) {
        addAButton(buttonSearch[i], ".jumbotron");
        buildArray(giffy, arrayURL, arrayMoveURL);
        }
        $(".btn").click(function() {
            search = $(this).data("query");
            buildArray(search, arrayURL, arrayMoveURL);
            $("#giffy-input").attr("value", "");
        })
    });

//buildArray("angry", arrayURL, arrayMoveURL);



