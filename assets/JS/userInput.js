let searchLibrary = JSON.parse(localStorage.getItem('songSearchHistory')) || [];
let searchIndex = JSON.parse(localStorage.getItem('searchIndex'));
let lastHistory = window.history.length;
console.log(lastHistory);
// let lastLoaded = JSON.parse(songsOnLoad);
//lastSearch = JSON.parse(lastSearch);

window.addEventListener('load',function(){


    if(String(searchIndex) !== 'null'){
        
       getTokens(searchLibrary[searchIndex-1]);
      //  changeUrl(searchLibrary[searchIndex-1]);
        
    }
    else{
        getTokens('search for a song');
    }


});

this.document.getElementById('search-bar').addEventListener('keyup',function(){
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
let searchSubmit = document.getElementById('search-submit');

searchSubmit.addEventListener('click',function(event){

// let newState = {
//     page: 'index',
//     description: 'This is the next page'
// };

// history.pushState(newState,'','index.html');

let songName = document.getElementById('search-bar').value;
searchIndex = searchIndex + 1;
searchLibrary.push(songName);
changeUrl(songName);
getTokens(songName);
//event.preventDefault();

//songName = songName.trim().toLowerCase();

//if(!songName) return;

//if(!searchLibrary.includes(songName)){
 //   searchLibrary.push(songName);
//}
localStorage.setItem('songSearchHistory',JSON.stringify(searchLibrary));
localStorage.setItem('searchIndex',JSON.stringify(searchIndex));

});

window.addEventListener('popstate',function(event){
    event.preventDefault();
    alert('we changed');
    // const currentHistory = window.history.length;
    // if(currentHistory === lastHistory.length - 1){
    // //    let searchIndex = JSON.parse(localStorage.getItem('searchIndex'));
    // //    searchIndex = searchIndex -1;
    // //    console.log(searchIndex);
    // //    localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    //     this.history.back();
    // }
    // else if(currentHistory === lastHistory.length + 1){
    // //    let searchIndex = JSON.parse(localStorage.getItem('searchIndex'));
    // //    searchIndex = searchIndex + 1;
    // //    localStorage.setItem('searchIndex',JSON.stringify(searchIndex));
    //     this.history.forward();
    // }

});

window.addEventListener('popstate',function(event){
    event.preventDefault();
     alert('we changed');
      const currentHistory = window.history.length;
      if(currentHistory === lastHistory.length - 1){

          this.history.back();
     }
      else if(currentHistory === lastHistory.length + 1){

         this.history.forward();
      }
 
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
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash+'?'+newName;
    //let obj ={Title:songName, Url:currentUrl+newName }
    //history.replaceState(obj,obj.Title,obj.Url);
    history.pushState({path:newUrl},'',newUrl);
}