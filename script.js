// Initialize the Variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Jashn E Bahara ",          filePath: "song/0.mp3",  coverPath: "covers/cover.jpg"},
    {songName: "Kiya Kiya",                filePath: "songs/1.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Lal Chunariya",            filePath: "songs/2.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Mujhko Yaad Sataye Teri",  filePath: "songs/3.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Pehli Nazar Me",           filePath: "songs/4.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Pyaar Ki Kahani",          filePath: "songs/5.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Tujhe Bhula Diya",         filePath: "songs/6.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Tujhko Jo Paaya",          filePath: "songs/7.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Zara Sa",                  filePath: "songs/8.mp3", coverPath: "covers/cover.jpg"},
    {songName: "Gale Lag Ja",              filePath: "songs/9.mp3", coverPath: "covers/cover.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle Play / Pause Click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) { 
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1 ;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0 ;
    }
}) 

// Listen to Event
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1 ;
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
   element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   })
})

document.getElementById('next').addEventListener('click',() => {
    if(songIndex >= 9) {
        songIndex = 0
    } 
    else {
       songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',() => {
    if(songIndex <= 0) {
        songIndex = 9;
    } 
    else {
       songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})