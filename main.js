let inputValue = document.getElementById('inputValue');
let button = document.getElementById("button");

button.addEventListener('click',function(){
    let inputResult= inputValue.value;
    function getSongs(){
        fetch('https://api.lyrics.ovh/suggest/'+inputResult)
        .then(response => response.json())
        .then(data => displaySongs(data));
    }
    getSongs();

    function displaySongs(songs){
       const lyricList = document.getElementById('lyricList');
       const title = document.getElementsByClassName("lyrics-name").innerHTML;
       const artist =  document.getElementsByClassName("author-lead").innerHTML;
        let htmlTemplate = ``;
        for (let i = 0; i < 10; i++) {
            htmlTemplate += `
                <div id="fancy" class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songs.data[i].title}</h3>
                        <p class="author lead">Album by <span>${songs.data[i].artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="getLyrics('${songs.data[i].artist.name}','${songs.data[i].title}')">Get Lyrics</button>
                    </div>
                </div>
            `
        }
       lyricList.innerHTML = htmlTemplate;
    }
})


function getLyrics(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => displayLyricsInfo(data))


}

function displayLyricsInfo(data){
    const specificLyrics = document.getElementById('lyrics-container');
    let htmlTemplate =``;
    htmlTemplate +=`<div class="single-lyrics text-center">
    
    <pre class="lyric text-white">${data.lyrics}</pre>
    </div>
            
    `
    specificLyrics.innerHTML = htmlTemplate;
}