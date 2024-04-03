const cards = document.querySelectorAll(".wrapper div");
let isFlippedCard = false;
let first_card, second_card;
let lock = false;
let move = 0;
let correct = 0; 

function random_cards(item){
    let random = Math.floor(Math.random()*12);
    item.style.order = random;
}

cards.forEach(random_cards);


function resetBoard(){
    isFlippedCard = false;
    first_card = null;
    second_card = null;
    lock = false;
}

function disbleCards(){
    first_card.removeEventListener("click", flip_card);
    second_card.removeEventListener("click", flip_card);
    resetBoard();
    correct += 1;
    if (correct == 6) {
        document.querySelector(".model-wrapper").style.display = "flex";
        document.querySelector(".move").textContent = move;
        addScore(move);
    }
}

function unflipCards(){
    lock = true;
    setTimeout(()=>{
        first_card.classList.remove("flip");
        second_card.classList.remove("flip");
        resetBoard();
    },600)
}

function flip_card(event){
    move += 0.5;
    if (lock) {
        return lock;
    }
    if (event.target.parentElement==first_card) {
        return first_card;
    }
    event.target.parentElement.classList.add("flip");
    if (!isFlippedCard) {
        first_card = event.target.parentElement;
        isFlippedCard = true;
        return;
    }
    second_card = event.target.parentElement;
    if (first_card.dataset.education == second_card.dataset.education) {
        disbleCards();
    }
    else{
        unflipCards();
    }
    
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flip_card);
}


document.querySelector(".modal-img__close").addEventListener("click", ()=>{
    document.querySelector(".model-wrapper").style.display = "none";
});


document.querySelector(".modal-button__new").addEventListener("click", ()=>{
    document.querySelector(".model-wrapper").style.display = "none";
    cards.forEach((i)=>{
        i.classList.remove("flip");
        i.addEventListener("click", flip_card);
        random_cards(i);
    });
    resetBoard();
    move = 0;
    correct = 0;
});

document.querySelector(".modal-button__record").addEventListener("click", ()=>{
    document.querySelector(".modal-records").style.display = "block";
    let record = getScores();
    record.forEach((item) =>{
        const li = document.createElement("li");
        li.textContent = `Количество шагов: ${item}`;
        document.querySelector("ul").appendChild(li); 
    });
});

document.querySelector(".modal-records-img__close").addEventListener("click", ()=>{
    document.querySelector(".modal-records").style.display = "none";
});

function getScores(){
    const scores = localStorage.getItem("scores");
    if(scores != null){
        return JSON.parse(scores);
    }
    else{
        return [];
    }
}

function addScore(score){
    const scores = getScores();
    scores.push(score);
    if(scores.length > 10){
        scores.shift();
    }
    localStorage.setItem("scores", JSON.stringify(score));
}