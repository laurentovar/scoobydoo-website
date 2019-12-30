//function calls the api and returns the response 

function callAPI() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://127.0.0.1:8080/api/v1/picture/2', true);

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

callAPI();



//use jquery to fill the p tag with the response
