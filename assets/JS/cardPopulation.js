 const coverCardContainerEl = document.getElementById(`cc-container`)


 function populateCoverCards(data) { //Pass this function in the API fetch request with the data parameter to populate the cards for the cover songs

    //Create a for loop that loops through the data and for each object populate the following elements

    const ccBodyEl = document.createElement(`div`); //Element which holds card content
    const ccArtEl = document.createElement(`img`); //Album or Song art
    const ccTitleEl = document.createElement(`h3`); //Name of Song
    const ccArtistEl = document.createElement(`h4`); //Name of Artist
    const ccLinkEl = document.createElement(`p`); //Spotify link to song


    ccBodyEl.appendChild(ccArtEl);
    ccBodyEl.appendChild(ccTitleEl);
    ccBodyEl.appendChild(ccArtistEl);
    ccBodyEl.appendChild(ccLinkEl);
    coverCardContainerEl.appendChild(ccBodyEl)
 }