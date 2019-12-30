//function calls the api and returns the response 

//2 = the default image
let imageId = 2;

function getOptions(){

}

function getStoryText(){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint

    request.open('GET', 'http://localhost:8080/api/v1/storyText/', true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        console.log(data);
        $('.card-text').html("<p" + JSON.stringify(data.text) + ">");
        return data;
    };
    // Send request
    request.send()
}

function getImage(imageID) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint

    request.open('GET', 'http://127.0.0.1:8080/api/v1/picture/' + imageID, true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        console.log(data);
        $('#loading').html("<img id ='intro' src=" + JSON.stringify(data.picUrl) + ">");
        return data;
    };

// Send request
    request.send()
}

//function that will call the next picture
function nextPicture(){
    imageId++;
    getImage(imageId);
}

getImage(imageId);

//when you click the start button the card for the story text shows
$("#startButton").click(function(){
    $("#story-text-body").show();

    $("#startButton").hide();
    $(".glow").hide();

    nextPicture();

    $("#Option1").show();
    $("#Option2").show();
});


$("#Option1").click(function () {
    let x = $("#Option1").attr("name");
    console.log(x);
    getImage(x)

});

$("#Option2").click(function () {
    let x = $("#Option2").attr("name");
    console.log(x);
    getImage(x)

});
