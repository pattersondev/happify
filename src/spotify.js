// here is all the spotify logic
const endpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotify-chart.web.app/";
// const redirectUri = "http://localhost:3000/";
const clientId = "f2b894fcb4124520b5f217d79c5ac489";
const scopes = ["user-top-read"];
// gets the hash from the url because spotify gives you the token as a url response
export const getResponseToken = () =>
  window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
// url for spotify
export const loginUrl = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
