// variaveis
let musicaAtual = 0
let nomeMusica = document.querySelector(".nomeMusica");
let artista = document.querySelector(".artista");
let musica = document.querySelector("#audio");
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
        pastamp3: "./assets/audio/LUMBERJACK (Audio).mp3",
        pastaogg: "./assets/audio/LUMBERJACK (Audio).ogg",
        artista: "Tyler, The Creator",
        cover: "./assets/cover/LUMBERJACK.png"
    },
    {
        nome: "Sakura",
        pastamp3: "./assets/audio/yun li - sakura [prod biffe] (official video).mp3",
        pastaogg: "./assets/audio/yun li - sakura [prod biffe] (official video).ogg",
        artista: "Yung Lixo",
        cover: "./assets/cover/sakura.jpg"
    },
    {
        nome: "Syphon Filter",
        pastamp3: "./assets/audio/yung lixo - syphon filter ft. yung buda [prod biffe] (official visualizer).mp3",
        pastaogg: "./assets/audio/yung lixo - syphon filter ft. yung buda [prod biffe] (official visualizer).ogg",
        artista: "Yung Lixo ft. Yung Buda",
        cover: "./assets/cover/syphonfilter.png"
    },
    {
        nome: "Tomodachi",
        pastamp3: "./assets/audio/yung lixo - tomodachi ft. SHO-SENSEI!! [prod biffe] (official video).mp3",
        pastaogg: "./assets/audio/yung lixo - tomodachi ft. SHO-SENSEI!! [prod biffe] (official video).ogg",
        artista: "Yung Lixo ft. SHO SENSEI!!",
        cover: "./assets/cover/tomodachi.png"
    },
    {
        nome: "Runaway",
        pastamp3: "./assets/audio/AURORA - Runaway (Audio).mp3",
        pastaogg: "./assets/audio/AURORA - Runaway (Audio).ogg",
        artista: "AURORA",
        cover: "./assets/cover/Runaway.jpg"
    },
    {
        nome: "Gimme Love",
        pastamp3: "./assets/audio/Joji - Gimme Love (Official Audio).mp3",
        pastaogg: "./assets/audio/Joji - Gimme Love (Official Audio).ogg",
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
    musica==null ? null : musica.remove();
    let audio = document.createElement("audio");
    audio.innerHTML = "<source src='" + musicas[i].pastamp3 + "' type='audio/mpeg'> <source src='" + musicas[i].pastaogg + "' type='audio/ogg'>";
    audio.setAttribute("id", "audio");
    document.querySelector("body").prepend(audio);
    musica = document.querySelector("#audio")

    nomeMusica.innerHTML = musicas[i].nome;
    artista.innerHTML = musicas[i].artista;
    cover.style.backgroundImage = "url(" + musicas[i].cover + ")";
    barra.value = 0;
    tempoAtual.innerHTML = "00:00";
    musicaAtual = i;         
    
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
    musica.volume = volume.value;
    playMusic();    
})

anterior.addEventListener("click", () => {
    if(musicaAtual <= 0){
        musicaAtual = musicas.length - 1;
    }else{
        musicaAtual--
    }
    setup(musicaAtual);
    musica.volume = volume.value;
    playMusic();
})

volume.addEventListener("mousemove", () => {
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
