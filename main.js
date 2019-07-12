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
        <h3>${music.name}</h3>
        <p>${music.album}</p>`
    
    return musicDiv

}

function displayMusicData (musicUrl){
    fetch(musicUrl)
    .then(res => res.json())
    .then(function (data){
        const dataDisplay = q('#music-data')
        dataDisplay.innerHTML = `
            <h3> More info about ${data.name}</h3>`

    })
}

document.addEventListener('DOMContentLoaded', function(){
    q('#music-results').addEventListener('click', function(event){
        console.log(event.target)
        // if (event.target && event.target.matches()){

        // }
        // // Add music event
    })

    q('form').addEventListener('submit', function (event){
        event.preventDefault()
        const searchTerm = q('#music-name').value
        const url = `https://itunes-api-proxy.glitch.me/search?=${encodeURIComponent(searchTerm)}`
        console.log(url)
        const resultsDiv = q('#music-results')

        fetch(url)
        .then(response => response.json())
        .then (function (data){
            resultsDiv.innerHTML = ''
            for (let music of data.results){
                resultsDiv.appendChild(musicNode(music))
            }
        })
    })
})