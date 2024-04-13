
//spotify security codes
const clientId = '691b00a249f243f7b35fa7db79bf6ddd'; 
const clientSecret = '98b920a1452a4878a9e8879811a51515'; 
//stand in for user song name input 
let userSongChoice = 'roar';


function getTokens(songName){

    //spotify encoding magic to get api key
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}`
        },
        body: 'grant_type=client_credentials'
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //function uses data which is apikey from spotify given by spotify and songName which is song input by user
        this.getSong(data, songName);
    })
    .catch(function(error){
    console.error('error:',error);
    });
}

//function uses tokens = apikey from spotify and songName = user input to return an array with song details
function getSong(tokens, songName){

    //split song name so that code can reassemble it using _ for space so that url can handle it
    let name = songName.split(' ');
    let newName = '';
    for(let i =0;i<name.length;i++){
        console.log(name[i]);
        if(i === 0){
            newName = name[i] + '_';
        }
        else if(i === name.length-1){
            newName = newName + name[i];
        }else{
            newName = newName  + name[i] +'_';
        }
    }
    console.log(newName);

    //join spotify api address with song name and query type 'track' to get the track details from spotify
    let start = 'https://api.spotify.com/v1/search?q=';
    let end = '&type=track';
    let song = start+newName+end;

    //this is the array with the song details that spotify will produce
        let songsArray = [];

        //getting tracks from spotify
        fetch(song,{
            method: 'GET',
            headers: {
            'Authorization': `${tokens.token_type} ${tokens.access_token}`
            }
        })
        .then(function(response){
        return response.json();
        })
        .then(function(data){

        for(let i = 0; i < data.tracks.items.length; i++){
            
            let artistArray = [];//temp array to hold multiple artist for a single track

            for(let ar = 0; ar < data.tracks.items[i].artists.length; ar++){
                artistArray.push(data.tracks.items[i].artists[ar].name);
            }

            //result array is ann array of object of 1) artist list 2) name of song 3) release date of song 4) array of links to album art 5) link to song on spotify
            songsArray.push({
                artist: artistArray,
                songName : data.tracks.items[i].name,
                releaseDate : data.tracks.items[i].album.release_date,
                albumArt : data.tracks.items[i].album.images,
                spotifyLink : data.tracks.items[i].external_urls.spotify

            });
        }
        })
        .catch(function(error){
        console.error('error:',error);
        });
        console.log(songsArray);
}
getTokens(userSongChoice);