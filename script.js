// variaveis
let musicaAtual = 0
let nomeMusica = document.querySelector(".nomeMusica");
let artista = document.querySelector(".artista");
let musica = document.querySelector("#audio");
// let musicaArray = musica[i]
let cover = document.querySelector(".cover");
let barra = document.querySelector(".barra");
let tempoAtual = document.querySelector(".tempoAtual");
let duracao = document.querySelector(".duracao");
let anterior = document.querySelector(".anterior");
let play = document.querySelector(".play");
let proximo = document.querySelector(".proximo");
let volume = document.querySelector(".volume");
let mais = document.querySelector("#mais");
let menos = document.querySelector("#menos");
musica.volume = 0.5;

// musicas
let musicas = [
    {
        nome: "LUMBERJACK",
        pasta: "./assets/audio/LUMBERJACK (Audio).mp3",
        artista: "Tyler, The Creator",
        cover: "./assets/cover/LUMBERJACK.png"
    },
    {
        nome: "Sakura",
        pasta: "./assets/audio/yun li - sakura [prod biffe] (official video).mp3",
        artista: "Yung Lixo",
        cover: "./assets/cover/sakura.jpg"
    },
    {
        nome: "Syphon Filter",
        pasta: "./assets/audio/yung lixo - syphon filter ft. yung buda [prod biffe] (official visualizer).mp3",
        artista: "Yung Lixo ft. Yung Buda",
        cover: "./assets/cover/syphonfilter.png"
    },
    {
        nome: "Tomodachi",
        pasta: "./assets/audio/yung lixo - tomodachi ft. SHO-SENSEI!! [prod biffe] (official video).mp3",
        artista: "Yung Lixo ft. SHO SENSEI!!",
        cover: "./assets/cover/tomodachi.png"
    },
    {
        nome: "Runaway",
        pasta: "./assets/audio/AURORA - Runaway (Audio).mp3",
        artista: "AURORA",
        cover: "./assets/cover/Runaway.jpg"
    },
    {
        nome: "Gimme Love",
        pasta: "./assets/audio/Joji - Gimme Love (Official Audio).mp3",
        artista: "Joji",
        cover: "./assets/cover/GimmeLove.jpg"
    }

]

// formatar o tempo

const formatTime = time => {
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = `0${min}`
    }

    let sec = Math.floor(time % 60);
    if (sec < 10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`   
}

setInterval(() => {
    barra.value = musica.currentTime;
    tempoAtual.innerHTML = formatTime(musica.currentTime);
    if (Math.floor(musica.currentTime) == Math.floor(barra.max)){
        proximo.click();
    }
}, 500);

// funçoes

// setup inicial do player
let setup = i => {   
    nomeMusica.innerHTML = musicas[i].nome;
    artista.innerHTML = musicas[i].artista;
    cover.style.backgroundImage = "url(" + musicas[i].cover + ")";
    barra.value = 0;
    musica.src = musicas[i].pasta;        
    tempoAtual.innerHTML = "00:00";
    musicaAtual = i
    
    musica.onloadedmetadata = function(){            
    setTimeout(() => {
        barra.max = musica.duration
        duracao.innerHTML = formatTime(musica.duration)
    }, 300);}     
}
setup(musicaAtual)

play.addEventListener("click", () => {
    if(play.className.includes("pause")){
        musica.play();
        play.classList.remove("pause");
        let iconPlay = document.querySelector(".play").childNodes;
        document.querySelector(".play").removeChild(iconPlay[0]);
        play.innerHTML = "<i class='fas fa-pause'></i>"
    }else{
        musica.pause();
        play.classList.add("pause");
        let iconPause = document.querySelector(".play").childNodes;
        document.querySelector(".play").removeChild(iconPause[0]);
        play.innerHTML = "<i class='fas fa-play'></i>"
    }    
})

barra.addEventListener("change", () => {
    musica.currentTime = barra.value;
});

const playMusic = () => {
    musica.play();
    play.classList.remove("pause");
}

proximo.addEventListener("click", () => {
    if(musicaAtual >= musicas.length - 1){
        musicaAtual = 0;
        
    }else{
        musicaAtual++;
        
    }
    setup(musicaAtual);
    playMusic();
})

anterior.addEventListener("click", () => {
    if(musicaAtual <= 0){
        musicaAtual = musicas.length - 1;
    }else{
        musicaAtual--
    }
    setup(musicaAtual);
    playMusic();
})

volume.addEventListener("change", () => {
    musica.volume = volume.value;
})

mais.addEventListener("click", () => {
    musica.volume = musica.volume + 0.1
    volume.value = musica.volume
    console.log(volume.value)
})

menos.addEventListener("click", () => {
    musica.volume = musica.volume - 0.1
    volume.value = musica.volume
    console.log(volume.value)
})

