// Client ID and Client Secret should be securely stored and accessed
const clientId = 'bfc1b1aded5e4f4f99913f89099439ce'; // Replace with your actual client ID
const clientSecret = '170438d9ad2f44ef8cbb1d9f8d157ef2'; // Replace with your actual client secret

function getTokens(){
// Encode Client ID and Secret
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}` // Basic <base64 encoded clientId:clientSecret>
        },
        body: 'grant_type=client_credentials' // Data sent as URL-encoded form
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        this.trackRequestApi(data)
        console.log(data)
    })
    .catch(function(error){
    console.error('error:',error)
    });
}

// 


// MAKE SURE THAT WE SEPARATE THE USER INPUT SONG NAME BY UNDERSCORES. REPLACE SPACES WITH UNDERSCORES

// Make sure the users input matches the "name" key value pair on the index. Use an if conditional to check the user input against the key value 



function trackRequestApi(tokens) {
    url = 'https://api.spotify.com/v1/search?q=Sounds_of_Silence&type=track'
    
    fetch(url,{
        headers: {
            'Authorization': `${tokens.token_type} ${tokens.access_token}` // Basic <base64 encoded clientId:clientSecret>
        },
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}

getTokens();
trackRequestApi();