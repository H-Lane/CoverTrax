

//function responds to a click event of the search history button on the website and dynamically creates a history list element. the list items are under a parent click event and take the user back to the previous search they click on.
function populateHistory(searches){
    //alert('you are in');
    
    //the history list elements include a div with a title and list elements
    let searchTitle = document.createElement('h2');
    searchTitle.textContent = 'Search History';
    let historyBox = document.createElement('div');
    historyBox.id= 'history-box';
    let historyList = document.createElement('ul');
    historyList.id = 'history-list';
    historyBox.appendChild(searchTitle);
    for(let i = 0; i < searches.length; i++){
        let listItem = document.createElement('li');
        listItem.className = 'search-item';
        listItem.textContent = searches[i];
        
       // console.log(listItem.textContent);
       historyList.appendChild(listItem);
    }
    historyBox.appendChild(historyList);

        //event listener added to the ul parent and is listening for clicks on the li targets
    historyList.addEventListener('click',function(event){
        if(event.target.className==='search-item'){
            
            //get the text content of the li element that was clicked on add it the the most recent search history and session history
            songName = event.target.textContent;
            lastSearch = songName;
            allSearches.push(songName);
            searchIndex = allSearches.length;
            localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
            sessionStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            sessionStorage.setItem('allSearches',JSON.stringify(allSearches));
            //search for song selected from history
            getTokens(event.target.textContent);
        }
    });
      //  console.log(historyBox);
       // console.log(searches);

       //add list to the page
    document.body.appendChild(historyBox);
    
}