

function populateHistory(searches){
    //alert('you are in');
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

    historyList.addEventListener('click',function(event){
        if(event.target.className==='search-item'){
            
            songName = event.target.textContent;
            lastSearch = songName;
            allSearches.push(songName);
            searchIndex = allSearches.length;
            localStorage.setItem('lastSearch',JSON.stringify(lastSearch));
            sessionStorage.setItem('searchIndex',JSON.stringify(searchIndex));
            sessionStorage.setItem('allSearches',JSON.stringify(allSearches));
            getTokens(event.target.textContent);
        }
    });
        console.log(historyBox);
        console.log(searches);
    document.body.appendChild(historyBox);
    
}