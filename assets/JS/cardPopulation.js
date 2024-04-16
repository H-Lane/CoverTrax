const coverCardContainerEl = document.getElementById(`cc-container`);
const otLyricsContainer = document.getElementById(`ot-lyrics-container`)
// let test = {
//     items: [
//         {

//         },
//         {
//             artists: [
//                 {
//                     name: "John Smith"
//                 },
//                 {
//                     name: "Billy Bubba"
//                 },
//                 {
//                     name: "Heya"
//                 },
//             ]
//         }
//     ]
// };

// populateCoverCards(test);

function populateCoverCards(data) {
  //Pass this function in the API fetch request with the data parameter to populate the cards for the cover songs

  //Create a for loop that loops through the data and for each object populate the following elements


  for (let i = 1; i < data.items.length; i++) {
    const ccDivEl = document.createElement(`div`); //Element that Holds each Card for CSS purpose
    const ccBodyEl = document.createElement(`div`); //Element which holds card content
    const ccArtEl = document.createElement(`img`); //Album or Song art
    const ccTitleEl = document.createElement(`h3`); //Name of Song
    const ccArtistEl = document.createElement(`h4`); //Name of Artist
    const ccLinkEl = document.createElement(`p`); //Spotify link to song

    //MIKE ADD CLASSES HERE
    ccBodyEl.classList.add(`uk-card`, `uk-card-body`, `uk-card-default`);
    ccArtEl.classList.add(`none`);
    ccTitleEl.classList.add(`uk-card-title`);
    ccArtContEl.classList.add(`uk-card-media-top`);
    
    ccArtEl.src = data.items[i].album.images[0].url; //populate song art
    ccTitleEl.textContent = data.items[i].name; //populate song title
    ccLinkEl.textContent = data.items[i].external_urls.spotify;//populate spotify song link

    ccArtistEl.textContent = `By: `; //Populate Artists names. The following loop handles multiple artists if there is more than one.

    for (let j = 0; j < data.items[i].artists.length; j++) {
      if (
        j === data.items[i].artists.length - 1 &&
        data.items[i].artists.length > 1
      ) {
        ccArtistEl.textContent += "and " + data.items[i].artists[j].name;
      } else if (data.items[i].artists.length === 2) {
        ccArtistEl.textContent += data.items[i].artists[j].name + " ";
      } else if (data.items[i].artists.length === 1) {
        ccArtistEl.textContent += data.items[i].artists[j].name;
      } else {
        ccArtistEl.textContent += data.items[i].artists[j].name + ", ";
      }
    }


    ccBodyEl.appendChild(ccTitleEl);
    ccBodyEl.appendChild(ccArtEl);
    ccBodyEl.appendChild(ccArtistEl);
    ccBodyEl.appendChild(ccLinkEl);
    ccDivEl.appendChild(ccBodyEl)
    coverCardContainerEl.appendChild(ccDivEl);
    if (i === 9) break;
  }
}

populateLyrics(data){ //populate lyrics onto their HTML container
  const otLyricsEl = document.createElement(`p`);
  otLyricsEl.textContent = data.message.body.lyrics.lyrics_body;
  otLyricsContainer.appendChild(otLyricsEl);
}
