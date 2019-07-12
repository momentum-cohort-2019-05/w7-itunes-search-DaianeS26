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
        <h3>${music.trackName}</h3>
        <p>Album: ${music.collectionName}</p>
        <img src="${music.artworkUrl100}">
        <p><input class="playback br2" id="playback" type="button" src="${music.previewUrl}" value="Play"></p>`
        // console.log(music.previewUrl)
    
    return musicDiv

}

const playSong = document.querySelector("#audio")
const songSource = document.querySelector('#music-source')


// function playMusic(){
//     songSource.src = playback.src
//     playSong.load()
//     songSource.play()

// }

// function displayMusicData (musicUrl){
//     fetch(musicUrl)
//     .then(res => res.json())
//     .then(function (data){
//         const dataDisplay = q('#music-data')
//         dataDisplay.innerHTML = `
//             <h3> More info about ${data.artistName}</h3>`

//     })
// }

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
        const url = `https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchTerm)}`
        const resultsDiv = q('#music-results')
    
        fetch(url)
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