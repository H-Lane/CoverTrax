const coverCardContainerEl = document.getElementById(`cc-container`);
const otLyricsContainer = document.getElementById(`ot-lyrics-container`);
const otCardContainerEl = document.getElementById(`ot-container`);

function populateCoverCards(data) {
  //Pass this function in the API fetch request with the data parameter to populate the cards for the cover songs

  //Create a for loop that loops through the data and for each object populate the following elements

  console.log(data);
  coverCardContainerEl.innerHTML = "";

  for (let i = 1; i < data.tracks.items.length; i++) {
    const ccDivEl = document.createElement(`div`); //Element that Holds each Card for CSS purpose
    const ccBodyEl = document.createElement(`div`); //Element which holds card content
    const ccArtContEl = document.createElement(`div`); //Container for the album art styling
    const ccArtEl = document.createElement(`img`); //Album or Song art
    const ccTitleEl = document.createElement(`h3`); //Name of Song
    const ccArtistEl = document.createElement(`h4`); //Name of Artist
    const ccLinkEl = document.createElement(`a`); //Spotify link to song

    //MIKE ADD CLASSES HERE
    ccDivEl.classList.add(
      `uk-card`,
      `uk-card-body`,
      `uk-card-default`,
      `uk-card-media-top`,
      `uk-card-title`
    );
    ccBodyEl.classList.add(`uk-card`, `uk-card-body`, `uk-card-media-top`);
    ccArtContEl.classList.add(`uk-card-media-top`);
    ccArtEl.classList.add(`none`);
    ccTitleEl.classList.add(`uk-card-title`);
    ccArtistEl.classList.add();
    ccLinkEl.classList.add(`lyrics-button`);

    ccArtEl.src = data.tracks.items[i].album.images[0].url; //populate song art
    ccTitleEl.textContent = data.tracks.items[i].name; //populate song title

    ccLinkEl.setAttribute("href", data.tracks.items[i].external_urls.spotify);
    ccLinkEl.setAttribute("target", "_blank"); //Opens a new tab when clicked
    ccLinkEl.textContent = "Link to song"; //populate spotify song link
    // ccLinkEl.textContent = data.tracks.items[i].external_urls.spotify

    ccArtistEl.textContent = `By: `; //Populate Artists names. The following loop handles multiple artists if there is more than one.

    for (let j = 0; j < data.tracks.items[i].artists.length; j++) {
      if (
        j === data.tracks.items[i].artists.length - 1 &&
        data.tracks.items[i].artists.length > 1
      ) {
        ccArtistEl.textContent += "and " + data.tracks.items[i].artists[j].name;
      } else if (data.tracks.items[i].artists.length === 2) {
        ccArtistEl.textContent += data.tracks.items[i].artists[j].name + " ";
      } else if (data.tracks.items[i].artists.length === 1) {
        ccArtistEl.textContent += data.tracks.items[i].artists[j].name;
      } else {
        ccArtistEl.textContent += data.tracks.items[i].artists[j].name + ", ";
      }
    }

    ccArtContEl.appendChild(ccArtEl);
    ccBodyEl.appendChild(ccTitleEl);
    ccBodyEl.appendChild(ccArtContEl);
    ccBodyEl.appendChild(ccArtistEl);
    ccBodyEl.appendChild(ccLinkEl);
    ccDivEl.appendChild(ccBodyEl);
    coverCardContainerEl.appendChild(ccDivEl);
    if (i === 9) break;
  }
}

function populateLyrics(data) {
  //populate lyrics onto their HTML container
  const otLyricsEl = document.getElementById(`ot-lyrics`);
  otLyricsEl.textContent = data.message.body.lyrics.lyrics_body;
  console.log(data);
}

function populateOtCard(data) {
  const otDivEl = document.getElementById(`ot-container`); //Element that points to the container for the ot card
  const otBodyEl = document.getElementById(`ot-body`); //Element points to the the content for the ot card
  const otArtContEl = document.getElementById(`ot-art-container`); //Element that has the style container for the art
  const otArtEl = document.getElementById(`ot-album-art`); //Element that points to the album art
  const otTitleEl = document.getElementById(`ot-song-title`); //Element that points to the song name
  const otArtistEl = document.getElementById(`ot-artist`); //Element that points to the artists names
  const otLinkEl = document.getElementById(`ot-song-link`); //Element that points to the spotify link

  otArtEl.src = data.tracks.items[0].album.images[0].url; //populate song art
  otTitleEl.textContent = data.tracks.items[0].name; //populate song title
  otLinkEl.href = data.tracks.items[0].external_urls.spotify; //populate spotify song link
  otLinkEl.textContent = "Find this song on Spotify";

  otArtistEl.textContent = `By: `; //Populate Artists names. The following loop handles multiple artists if there is more than one.

  for (let j = 0; j < data.tracks.items[0].artists.length; j++) {
    if (
      j === data.tracks.items[0].artists.length - 1 &&
      data.tracks.items[0].artists.length > 1
    ) {
      otArtistEl.textContent += "and " + data.tracks.items[0].artists[j].name;
    } else if (data.tracks.items[0].artists.length === 2) {
      otArtistEl.textContent += data.tracks.items[0].artists[j].name + " ";
    } else if (data.tracks.items[0].artists.length === 1) {
      otArtistEl.textContent += data.tracks.items[0].artists[j].name;
    } else {
      otArtistEl.textContent += data.tracks.items[0].artists[j].name + ", ";
    }
  }
}
// On page load, pull the most recent search term out of the local storage array using array.length - 1, then use that term to pass into our fetch requests to populate the page and run the populate functions.
