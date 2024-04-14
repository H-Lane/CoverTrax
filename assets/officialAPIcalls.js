// Spotify client id and client secret code used to pull api key
const clientId = '691b00a249f243f7b35fa7db79bf6ddd';
const clientSecret = '98b920a1452a4878a9e8879811a51515';
let userSongChoice = 'roar';
// let singer = null;

function getTokens(songName){

    //use client id and client secret to get api key
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
        console.log(data);

        //data is the spotify api key
        //song name is the song name input from the user
        this.getSong(data, songName);
    })
    .catch(function(error){
    console.error('error:',error);
    });
}

function getSong(tokens, songName){
    
    //turn user text input into an array and replace spaces with underscores
    let name = songName.split(' ');
    console.log(name);
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

    //combie url components to make api query for specific song
    let start = 'https://api.spotify.com/v1/search?q=';
    let end = '&type=track&limit=10';
    let song = start+newName+end;

        //songArray will hold 10 songs. the 1st will be the original version and the rest will be covers of the song
       // let songsArray = [];


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
        console.log(data.tracks.items);

        //creating array of song objects. each song object holds the artist(s), title, release date, album art, isrc code and a link to the spotify song

        // for(let i = 0; i < data.tracks.items.length; i++){
            
        //     //group songs with multiple artits in an artist array
        //     let artistArray = [];
        //     for(let ar = 0; ar < data.tracks.items[i].artists.length; ar++){
        //         artistArray.push(data.tracks.items[i].artists[ar].name);
        //     }

        //     //add an object {artist[], song name, }
        //     songsArray.push({
        //         artist: artistArray,
        //         songName : data.tracks.items[i].name,
        //         releaseDate : data.tracks.items[i].album.release_date,
        //         albumArt : data.tracks.items[i].album.images,
        //         spotifyLink : data.tracks.items[i].external_urls.spotify,
        //         songISRC : data.tracks.items[i].external_ids.isrc,
        //         songLyrics:''

        //     });
        // }

        let songISRC = data.tracks.items[0].external_ids.isrc;
        // this.getLyrics(songsArray);
        this.getLyrics(songISRC);

        })
        .catch(function(error){
        console.error('error:',error);
        });
        // console.log(data.tracks.items);
        //console.log(songsArray);
}
function getLyrics(songISRC){

//for(let i = 0; i < songsArray.length; i++){ old for loop

    let trackID = '';
    let musixmatchRUL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_isrc=';
    const musixMatchAPI = '&apikey=1188903a78d32beda5a7c1bb2fbda729';
   // const musixISRC = String(songsArray[0].songISRC);
    let musixSearch = musixmatchRUL + songISRC + musixMatchAPI;

    fetch(musixSearch,{
        method:'GET',
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        trackID = data.message.body.track.track_id;
        console.log(data.message.body.track.track_id);

        musixmatchRUL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=';
       
        musixSearch = musixmatchRUL + trackID + musixMatchAPI;

        fetch(musixSearch,{
            method:'GET',
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // trackID = data.message.body.track.track_id;
            // console.log(data.message.body.lyrics.lyrics_body);
            //songsArray[0].songLyrics = data.message.body.lyrics.lyrics_body;

                //function recieves api data and function will create <p> element containing song lyrics
               populateLyrics(data);
                

             console.log(data.message.body.lyrics.lyrics_body);
        })
        .catch(function(error){
            console.error('error:',error);
        });

        //console.log(songsArray);
    })

    .catch(function(error){
        console.error('error:',error);
    });

//}

}


getTokens(userSongChoice);
