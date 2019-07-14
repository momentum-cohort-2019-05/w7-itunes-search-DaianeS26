const playSong = document.querySelector("#audio")
const songSource = document.querySelector('#music-source')
const cors = "https://cors-anywhere.herokuapp.com/"


function q (sel){
    return document.querySelector(sel)
}

function qs(sel){
    return document.querySelectorAll(sel)
}

function musicNode(music){
    const musicDiv = document.createElement('div')
    musicDiv.classList.add('music')
    musicDiv.innerHTML = `
        <div class="w-30 center tc fl-l pa4 near-black">
        <h3>${music.trackName}</h3>
        <img src="${music.artworkUrl100}">
        <p><input class="playback f4 dim br3 ph3 pv2 mb2 dib white bg-dark-gray size" id="playback" type="button" src="${music.previewUrl}" value="Play"></p>
        </div>`
        // console.log(music.previewUrl)
    
    return musicDiv

}




// Main execution

document.addEventListener('DOMContentLoaded', function(){
    q('#music-results').addEventListener('click', function(event){
        if (event.target && event.target.matches('#playback')){
            songSource.src = event.target.src
            playSong.load()
            playSong.play()
        
        }
    })

    q('form').addEventListener('submit', function (event){
        event.preventDefault()
        const searchTerm = q('#music-name').value
        const url = `https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchTerm)}&limit=9`
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

    // q('#music-name').addEventListener('focus', function(){
    //     const clearField = q('#music-name')
    //     if (clearField.value === 'value' ){
    //         clearField.classList = 'blue';
    //     }
    // })
})