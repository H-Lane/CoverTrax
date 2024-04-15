window.addEventListener('load',function(){

    console.log('page loaded');
    let lastSearch = localStorage.getItem('songSearchHistory');
    console.log(lastSearch);
    if(String(lastSearch) !== 'null'){
        
        return lastSearch[0];
    }

});
