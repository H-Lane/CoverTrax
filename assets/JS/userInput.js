let searchLibrary = JSON.parse(localStorage.getItem('songSearchHistory')) || [];
let searchIndex = JSON.parse(localStorage.getItem('searchIndex'));
//let currentState = JSON.parse(localStorage.getItem('currentStates'));
let lastHistory = window.history.length;
console.log(lastHistory);
let searchSubmit = document.getElementById('search-submit');
let back = document.getElementById('back');
let forward = document.getElementById('forward');
//let searchName = '';
// let lastLoaded = JSON.parse(songsOnLoad);
//lastSearch = JSON.parse(lastSearch);

window.addEventListener('load',function(){


    if(String(searchLibrary) !== 'null'){ 
        setUrl(searchLibrary[searchIndex-1]);
        getTokens(searchLibrary[searchIndex-1]);

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
    searchLibrary.push(songName);
    searchIndex = searchLibrary.length;
    getTokens(songName);
    changeUrl(songName);
    localStorage.setItem('songSearchHistory',JSON.stringify(searchLibrary));
    localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    
    });

    
    window.addEventListener('popstate',function(event){
    
        searchIndex = searchIndex - 1;
        localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    
     });
    
     back.addEventListener('click',function(event){
        
        if(searchIndex > 1){
            searchIndex = searchIndex - 1;
            localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            setUrl(searchLibrary[searchIndex-1]);
            getTokens(searchLibrary[searchIndex-1]);
            location.reload();
        }
        else{
            alert('Cannot go any further back!');
        }
    });
    forward.addEventListener('click',function(event){
        if(searchIndex < searchLibrary.length){
            searchIndex = searchIndex+1;
            localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            setUrl(searchLibrary[searchIndex-1]);
            getTokens(searchLibrary[searchIndex-1]);
            location.reload();
        }
        else{
            alert('cannot go any further forward');
        }
    });

});


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