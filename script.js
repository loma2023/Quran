let mylist = document.querySelector(".list")
let image = document.querySelector('.img-play');
let title = document.querySelector('.title');
let nameReader = document.querySelector('.nameReader');
let play_audio = document.querySelector(".play-audio")
let backbtn = document.querySelector('#back');
let playbtn = document.querySelector('#play');
let play = playbtn.querySelector("ion-icon");
let nextbtn = document.querySelector('#next');
let range =document.querySelector(".range")
let bottom_icon = document.querySelector(".bottom-icon")
let last_A = bottom_icon.querySelectorAll("a")[4]
let icon = last_A.querySelector("ion-icon")

bottom_icon.style.display = "none"

let url = "https://script.google.com/macros/s/AKfycbzgUtSc1-3yNaj-eDmEYkarwNhmhhr4I9OeNs6K_6LlQQZuW-OAeKKdhRdAl2DkcktIhw/exec"

fetch(url)
    .then((response) => response.json())
    .then((row) => {
        let element = '';
        let colum = row[0]
        for (let i = 1; i < colum.length; i++) {
            element += `
                <div class="reader" id="${i}" onclick="create_list(id)">
                    <img src="${row[0][i]}" alt="">
                    <h4>${row[1][i]}</h4>
                </div>`
            document.querySelector("#section_1").innerHTML = element
            document.querySelector("#section_2").innerHTML = element
            document.querySelector("#section_3").innerHTML = element
        }
    })

function create_list(id) {
    fetch(url)
        .then((response) => response.json())
        .then((row) => {
            let element = "";
            let item_id = 0;
            for (let i = 2; i < row.length; i++) {
                if (row[i][id].includes("https")) {
                    element += `
                    <div class="item" id="${item_id}">
                        <img src="${row[0][id]}" alt="">

                        <div class="Data-item">
                            <h4>${row[i][0]}</h4>
                            <h5>${row[1][id]}</h5>
                        </div>
                            <audio class="audio" src="${row[i][id] +".mp3"}"></audio>
                            <span></span>
                        <a  onclick="changeSong(event)"><i class="far fa-play-circle"></i></a>
                    </div>`
                    item_id = item_id + 1
                }
            }
            mylist.innerHTML = element
            image.src = row[0][id]
            title.innerText = mylist.querySelectorAll("h4")[0].innerText
            nameReader.innerText = row[1][id]
            play_audio.src = mylist.querySelectorAll(".audio")[0].src
            play_audio.load();
            play_audio.play()
            play.name = "pause";
            bottom_icon.style.display = ""
        })
}

function changeSong(event) {
    let btn = event.target;
    let parent = btn.parentElement.parentElement;
    image.src = parent.querySelector("img").src;
    title.innerText = parent.querySelector("h4").innerText;
    nameReader.innerText = parent.querySelector("h5").innerText;
    play_audio.id = parent.id
    play_audio.src = parent.querySelector(".audio").src
    play_audio.load();
    play_audio.play()
    play.name = "pause"
}

function next() {
    let item = document.querySelectorAll(".item")
    if (play_audio.id < item.length - 1) {
        play_audio.id = 1 + parseFloat(play_audio.id)
    } else {
        play_audio.id = 0
    }
    image.src = item[play_audio.id].querySelector("img").src;
    title.innerText = item[play_audio.id].querySelector("h4").innerText;
    nameReader.innerText = item[play_audio.id].querySelector("h5").innerText;
    play_audio.src = item[play_audio.id].querySelector(".audio").src
    play_audio.load();
    play_audio.play()
    play.name = "pause"
}

function Play() {
    if (play_audio.src.includes("https")) {
        if (play.name == "play") {
            play_audio.play();
            play.name = "pause"
        } else {
            play_audio.pause();
            play.name = "play"
        }
    }
}

function back() {
    let item = document.querySelectorAll(".item")
    if (play_audio.id > 0) {
        play_audio.id = parseFloat(play_audio.id) - 1
    } else {
        play_audio.id = item.length - 1
    }
    image.src = item[play_audio.id].querySelector("img").src;
    title.innerText = item[play_audio.id].querySelector("h4").innerText;
    nameReader.innerText = item[play_audio.id].querySelector("h5").innerText;
    play_audio.src = item[play_audio.id].querySelector(".audio").src
    play_audio.load();
    play_audio.play()
    play.name = "pause"
}

play_audio.addEventListener('ended', function () {next()})
play_audio.onloadedmetadata = function(){ range.max = play_audio.duration;range.value = play_audio.currentTime;}
if (play_audio.play()) {setInterval(() => {range.value = play_audio.currentTime;}, 1000);}
range.onchange =function() {if(play_audio.src.includes("https")) {play_audio.currentTime = range.value;play_audio.play();play.name = "pause"}}

// ====================================

function UpDown() {
    let play = document.querySelector(".play")
    if(icon.name === "arrow-up") {
        play.classList.add("active-play")
        icon.name = "arrow-down"
        bottom_icon.style.background = "none"
    }
    else{
        play.classList.remove("active-play")
        mylist.classList.remove("active-play")
        icon.name = "arrow-up"
        bottom_icon.style.background = "url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYugJtuBXf026-H6n3QslUczlcq0kEsfEE8lsgkX_0dVAGP3SJ)"
    }
}

function list() {
    if (mylist.classList.contains("active-play") == true){
        mylist.classList.remove("active-play")
        icon.name = "arrow-up"
        bottom_icon.style.background = "url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYugJtuBXf026-H6n3QslUczlcq0kEsfEE8lsgkX_0dVAGP3SJ)"
    }
    else{
        mylist.classList.add("active-play")
        icon.name = "arrow-down"
    }
}


function section(id) {
    let readers = document.querySelectorAll(".readers")
    readers.forEach(one => { one.classList.remove("active") });

    if (id == "book") {
        readers[0].classList.add("active")
    }
    else if (id == "sparkles") {
        readers[1].classList.add("active")
    }
    else if (id == "headset") {
        readers[2].classList.add("active")
    }
}
