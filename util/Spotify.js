const clientId = '78b06b6dbf9f4a90b975949db06bd524';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const access_token = window.location.href.match(/access_token=([^&]*)/);
        const expires_in = window.location.href.match(/expires_in=([^&]*)/);

        if (access_token & expires_in) {
            accessToken = access_token[1];
            let expiresIn = Number(expires_in[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        const spotifyURL =  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = spotifyURL;
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            if(response.ok) {
                return response.json();
            }
        throw new Error ('Request failed!');
        }).then(jsonResponse => {
            if(jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => (
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
                return [];
        })
    },
    savePlaylist(name, trackURIS) {
        if (!name || !trackUris.length) {
          return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIS})
                });
            });
        });
    }

};

export default Spotify;
