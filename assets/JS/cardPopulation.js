 const coverCardContainer = document.getElementById(`cover-cards-container`)


 function populateCoverCards(data) { //Pass this function in the API fetch request with the data parameter to populate the cards for the cover songs

    //Create a for loop that loops through the data and for each object populate the following elements

    const coverCardBody = document.createElement(`div`); //Element witch holds card content
    const coverCardArt = document.createElement(`img`); //Album or Song art
    const coverCardTitle = document.createElement(`h3`); //Name of Song
    const coverCardArtist = document.createElement(`h4`); //Name of Artist
    const coverCardLink = document.createElement(`p`); //Spotify link to song


    coverCardBody.appendChild(coverCardArt);
    coverCardBody.appendChild(coverCardTitle);
    coverCardBody.appendChild(coverCardArtist);
    coverCardBody.appendChild(coverCardLink);
    coverCardContainer.appendChild(coverCardBody)
 }