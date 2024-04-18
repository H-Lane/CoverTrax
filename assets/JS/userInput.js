let searchLibrary = JSON.parse(localStorage.getItem('songSearchHistory')) || [];
let searchIndex = JSON.parse(sessionStorage.getItem('searchIndex'));
let allSearches = JSON.parse(sessionStorage.getItem('allSearches')) ||[];
let lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
//let currentState = JSON.parse(localStorage.getItem('currentStates'));
let lastHistory = window.history.length;
console.log(lastHistory);
let searchSubmit = document.getElementById('search-submit');
let back = document.getElementById('back');
let forward = document.getElementById('forward');
let searchHistory = document.getElementById('search-history');
//let searchName = '';
// let lastLoaded = JSON.parse(songsOnLoad);
//lastSearch = JSON.parse(lastSearch);

window.addEventListener('load',function(){


    if(String(lastSearch) !== 'null'){ 
        setUrl(lastSearch);
        getTokens(lastSearch);
    }
    else{
        getTokens('search for a song');
    }

    document.getElementById('search-bar').addEventListener('keyup',function(){
        // alert('there was a key up');
         let searchText = this.value;
         let suggestionBox = document.getElementById('suggestion-box');
         suggestionBox.innerHTML = '';
         if(searchText.length>0){
     
             getTokensSS(searchText);
             
     
         }else{
             suggestionBox.style.display = 'none';
         }
     
     });
      
    searchSubmit.addEventListener('click',function(event){
    
    //event.preventDefault();
    let songName = document.getElementById('search-bar').value;
    //searchLibrary.push(songName);
    getTokens(songName);
    changeUrl(songName);
    
    lastSearch = songName;
    allSearches.push(songName);
    searchIndex = allSearches.length;
    localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
    sessionStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    sessionStorage.setItem('allSearches',JSON.stringify(allSearches));
    songName = songName.trim().toLowerCase();

    if(!songName) return;

    if(!searchLibrary.includes(songName)){
        searchLibrary.push(songName);
    }
    localStorage.setItem('songSearchHistory',JSON.stringify(searchLibrary));
    
    });

    
    // window.addEventListener('popstate',function(event){
    
    //     searchIndex = searchIndex - 1;
    //     localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    
    //  });
    
     back.addEventListener('click',function(event){
        
        if(searchIndex > 1){
            searchIndex = searchIndex - 1;
            sessionStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            lastSearch = allSearches[searchIndex-1];
            console.log(lastSearch);
            localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
            setUrl(lastSearch);
            getTokens(lastSearch);
            location.reload();
        }
        else{
            alert('Cannot go any further back!');
        }
    });
    forward.addEventListener('click',function(event){
        if(searchIndex < allSearches.length){
            searchIndex = searchIndex + 1;
            sessionStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            lastSearch = allSearches[searchIndex-1];
            localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
            setUrl(lastSearch);
            getTokens(lastSearch);
            location.reload();
        }
        else{
            alert('cannot go any further forward');
        }
    });
    searchHistory.addEventListener('click',function(event){

        //alert('event');
        populateHistory(searchLibrary);

    });


});

// window.addEventListener('beforeunload',function(event){
//     let startIndex = allSearches.length-1;
//     lastSearch = allSearches[startIndex];
//     localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
// });

function changeUrl(songName){
    let name = songName.split(' ');
    // console.log(name);
    let newName = '';
    for(let i =0;i<name.length;i++){
        // console.log(name[i]);
        if(i === 0){
            newName = name[i] + '_';
        }
        else if(i === name.length-1){
            newName = newName + name[i];
        }else{
            newName = newName  + name[i] +'_';
        }
    }
    if(newName.charAt(newName.length-1) === '_'){
        newName = newName.slice(0,-1);
    }
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash+'?'+newName;
    //let obj ={Title:songName, Url:currentUrl+newName }
    //history.replaceState(obj,obj.Title,obj.Url);
    history.pushState({path:newUrl},'',newUrl);
    localStorage.setItem('currentState',JSON.stringify(event.state));
  //  searchName = window.location.search.slice(1);
    //history.replaceState({path:newUrl},'',newUrl);
    //return(searchName);
}
function setUrl(songName){
    let name = songName.split(' ');
    // console.log(name);
    let newName = '';
    for(let i =0;i<name.length;i++){
        // console.log(name[i]);
        if(i === 0){
            newName = name[i] + '_';
        }
        else if(i === name.length-1){
            newName = newName + name[i];
        }else{
            newName = newName  + name[i] +'_';
        }
    }
    if(newName.charAt(newName.length-1) === '_'){
        newName = newName.slice(0,-1);
    }
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash+'?'+newName;
    //let obj ={Title:songName, Url:currentUrl+newName }
    //history.replaceState(obj,obj.Title,obj.Url);
    history.replaceState({path:newUrl},'',newUrl);
    //searchName = window.location.search.slice(1);
   // return(searchName);
}