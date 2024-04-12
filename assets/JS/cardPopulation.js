const coverCardContainerEl = document.getElementById(`cc-container`);
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

  console.log(data);
  for (let i = 1; i < data.items.length; i++) {
    const ccBodyEl = document.createElement(`div`); //Element which holds card content
    const ccArtEl = document.createElement(`img`); //Album or Song art
    const ccTitleEl = document.createElement(`h3`); //Name of Song
    const ccArtistEl = document.createElement(`h4`); //Name of Artist
    const ccLinkEl = document.createElement(`p`); //Spotify link to song

    ccArtEl.src = data.items[i].album.images[0].url; //populate song art
    ccTitleEl.textContent = data.items[i].name; //populate song title

    // Need to make a FOR loop to loop through the artists array and populate all of them if there are more than one

    ccArtistEl.textContent = `By: `;

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

    ccLinkEl.textContent = data.items[i];

    ccBodyEl.appendChild(ccArtEl);
    ccBodyEl.appendChild(ccTitleEl);
    ccBodyEl.appendChild(ccArtistEl);
    ccBodyEl.appendChild(ccLinkEl);
    coverCardContainerEl.appendChild(ccBodyEl);
    if (i === 9) break;
  }
}
