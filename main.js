// Create variables

const playSong = document.querySelector("#audio")
const songSource = document.querySelector('#music-source')
const cors = "https://cors-anywhere.herokuapp.com/"

// function to target dom

function q (sel){
    return document.querySelector(sel)
}

function qs(sel){
    return document.querySelectorAll(sel)
}

//Create elements to display on the page

function musicNode(music){
    const musicDiv = document.createElement('div')
    musicDiv.classList.add('music', 'flex-item')
        //if music title is longer than 15 characters. It will be shortened.
        if (music.trackName.length >= 15) {
            music.trackName = music.trackName.substring(0, 15) + "..."
        }
    musicDiv.innerHTML = `
        <h3>${music.trackName}</h3>
        <img class='img-div' src="${music.artworkUrl100}">
        <p><input class="playback f4 dim br4 ph3 pv2 mb2 dib white bg-blue size" id="playback" type="button" src="${music.previewUrl}" value="Play"></p>`
        // console.log(music.previewUrl)
    
    return musicDiv

}


// Main execution

document.addEventListener('DOMContentLoaded', function(){
    //play song when clicked
    q('#music-results').addEventListener('click', function(event){
        if (event.target && event.target.matches('#playback')){
            songSource.src = event.target.src
            playSong.load()
            playSong.play()
        
        }
    })

    q('form').addEventListener('submit', function (event){
        //get songs from itunes api through fetch
        event.preventDefault()
        const searchTerm = q('#music-name').value
        const url = `https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchTerm)}&limit=40`
        const resultsDiv = q('#music-results')
    
        fetch(cors + url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data){
                resultsDiv.innerHTML = ''
                // console.log(data)
                for (let music of data.results){
                    resultsDiv.appendChild(musicNode(music))
                    // console.log(music)
                }
        })
    })
})