var arrayURL = [];

//function to build array with url for image tags
function buildArray(search, array) {
    var urlQuery = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+search+"&limit=10";

  $.ajax({
    url: urlQuery,
    method: "GET"
  }).then(function(response) {
        for (var i = 0; i < 10; i++) {
            array.push(response.data[i].images.fixed_height.url);
        }
        console.log(response);
        console.log("------------------------------")
        imageBoard(arrayURL, ".container", 5, 2);
    });
}
//function to build grid of gifs
function imageBoard(array, appendReference, column, row) {
    var count = 0;
    //Add Div for Row
        for (var i = 0; i < row; i++)
        {
            var rowDiv = $("<div>");
            //Classify as row and add or subtract any padding
            rowDiv.addClass("row pb-3");
            $(appendReference).append(rowDiv);
            //Add Div for Column and img tag
            for (var j = 0; j < column; j++) {
                var colDiv = $("<div>");
                var belly = $("<img>");
                belly.addClass("belly");
                belly.attr("id", "belly"+count);
                var colSize = 12/column; //for bootstrap row class
                //Classify as column and add or subtract any padding
                colDiv.addClass("col-"+colSize+" box pr-3");
                colDiv.append(belly);
                rowDiv.append(colDiv); 
                console.log(array[count]);
                $("#belly"+count).attr("src", array[count]);
                count++;
            }
        }
}

buildArray("sexy", arrayURL);

