//initial load of page
//2 = the default image
let imageId = 3;
getImage(imageId);


//function calls the api and returns the response



function createOptionsButton(option_id, divRow){
    console.log(option_id);
    console.log(divRow);
    //call the options api

    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint

    request.open('GET', 'http://localhost:8080/api/v1/options/' + option_id, true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        showNOptionButtons();
        switch (divRow){
            case 1:
                $("#row1").html("<button type='button' class='btn btn-secondary glow' id ='option1' name="+ data.step_text_id + "> "+ data.optionText + " </button>");
                break;
            case 2:
                $("#row2").html("<button type='button' class='btn btn-secondary glow' id ='option2' name="+ data.step_text_id + "> "+ data.optionText + " </button>");
                break;
            case 3:
                $("#row3").html("<button type='button' class='btn btn-secondary glow' id ='option3' name="+ data.step_text_id + "> "+ data.optionText + " </button>");
                break;
            case 4:
                $("#row4").html("<button type='button' class='btn btn-secondary glow' id ='option4' name="+ data.step_text_id + "> "+ data.optionText + " </button>");
                break;

        }

        console.log(data);

        return data;
    };
    // Send request
    request.send()
}

function getStoryText(storyTextID){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint

    request.open('GET', 'http://localhost:8080/api/v1/storyText/' + storyTextID, true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        console.log(data);
        $('.card-text').html("<p>" + JSON.stringify(data.text) + "</p>");


        //Call GetPicture with the picId from response
        getImage(data.picUrl);


        needButton(data);

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


function getNextButton(nextID){
    console.log("NextID is: " + nextID);
    $("#nextButtonContainer").html("<button type='button' class='btn btn-secondary glow' id ='nextButton' name="+ nextID + "> Next </button>");
    //<button type="button" class="btn btn-secondary glow" id="Option2" name="5" style="display: none">Eat Cookies!</button>
}


//when you click the start button the card for the story text shows
$("#startButton").click(function(){
    $("#story-text-body").show();

    $("#startButton").hide();
    $(".glow").hide();

    //Get Picture
    //nextPicture();

    //Get Starting Story Text
    getStoryText(13)

    //Show Next Button
    getNextButton(14);

    // $("#Option1").show();
    //     // $("#Option2").show();
});

//for each options button go to next storyText
$(".navButtons").on('click', '#option1', function () {
    //get the id of the next button
    let nextId = $("#option1").attr("name");

    //call get Story Text to get the text using the nextId
    let response = getStoryText(nextId);

    //show next button
    showNextButtonContainer();

    //hide the options after you click
    hideNOptionButtons();

});
$(".navButtons").on('click', '#option2', function () {
    //get the id of the next button
    let nextId = $("#option1").attr("name");

    //call get Story Text to get the text using the nextId
    let response = getStoryText(nextId);

    //show next button
    showNextButtonContainer();

    //hide the options after you click
    hideNOptionButtons();

});
$(".navButtons").on('click', '#option3', function () {
    //get the id of the next button
    let nextId = $("#option1").attr("name");

    //call get Story Text to get the text using the nextId
    let response = getStoryText(nextId);

    //show next button
    showNextButtonContainer();

    //hide the options after you click
    hideNOptionButtons();

});
$(".navButtons").on('click', '#option4', function () {
    //get the id of the next button
    let nextId = $("#option1").attr("name");

    //call get Story Text to get the text using the nextId
    let response = getStoryText(nextId);

    //show next button
    showNextButtonContainer();

    //hide the options after you click
    hideNOptionButtons();

});


//check to see if you need options button
function needButton(storyTextReponse) {
    if(storyTextReponse.option1 === null && storyTextReponse.option2 === null && storyTextReponse.option3 === null && storyTextReponse.option4 === null){
        //create the next button
        console.log("There were no options");

        //Show Next Button using the id from the DB
        console.log("Next Story Text ID: " +  storyTextReponse.nextStoryTextID);
        getNextButton(storyTextReponse.nextStoryTextID);
    }
    else {
        console.log("There are options");
        //check to see how many exist
        let bucketOptions = [];
        if(storyTextReponse.option1 !== null){
            bucketOptions.push(storyTextReponse.option1);
        }
        if(storyTextReponse.option2 !== null){
        bucketOptions.push(storyTextReponse.option2);
        }
        if (storyTextReponse.option3 !== null){
            bucketOptions.push(storyTextReponse.option3);
        }
        if (storyTextReponse.option4 !== null){
            bucketOptions.push(storyTextReponse.option4);
        }
        console.log(bucketOptions);
        console.log("Options length:" + bucketOptions.length);

        //call hideNextButton
        hideNextButton();

        let row = 1;
        bucketOptions.forEach(function(option){
            createOptionsButton(option, row);
            row++;
        })
    }

}
//go on to next part of story from options
$(".navButtons").on('click', '#nextButton', function () {
    //get the id of the next button
    console.log("press");
    let nextId = $("#nextButton").attr("name");

    //call get Story Text to get the text using the nextId
    let response = getStoryText(nextId);

});

function getNextButtonId() {
    let nextId = $("#nextButton").attr("name");
    return nextId;
}

//hide the next button
function hideNextButton() {
    $("#nextButtonContainer").hide();
}

//show the next button
function showNextButtonContainer() {
    $("#nextButtonContainer").show();
}

//hide the options button
function hideNOptionButtons() {
    $("#row1").hide();
    $("#row2").hide();
    $("#row3").hide();
    $("#row4").hide();
}

//hide the options button
function showNOptionButtons() {
    $("#row1").show();
    $("#row2").show();
    $("#row3").show();
    $("#row4").show();
}