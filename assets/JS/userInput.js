let songsOnLoad = localStorage.getItem('songSearchHistory');
let lastSearch = localStorage.getItem('lastSearch');
let lastLoaded = JSON.parse(songsOnLoad);
lastSearch = JSON.parse(lastSearch);

window.addEventListener('load',function(){

    //this.alert(lastLoaded);
    if(String(lastSearch) !== 'null'){
        
        getTokens(lastSearch);
        
    }
    else{
        getTokens('nothing');
    }

});

let searchSubmit = document.getElementById('search-submit');

    searchSubmit.addEventListener('click',function(){
    let songSearch = document.getElementById('search-bar').value;
    console.log(songSearch);

    songSearch = songSearch.trim().toLowerCase();

    if(!songSearch) return;

    if(!lastLoaded.includes(songSearch)){
        lastLoaded.push(songSearch);
    }
    localStorage.setItem('songSearchHistory',JSON.stringify(lastLoaded));
    localStorage.setItem('lastSearch',JSON.stringify(songSearch));
    
    getTokens(songSearch);

});

