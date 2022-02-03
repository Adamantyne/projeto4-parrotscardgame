let numeroCartas = 0, carta = [], cartas ="";
let tabuleiro = document.querySelector(".tabuleiro");
let gifs = [0,1,2,3,4,5,6,7], contadorGifs=0;


perguntaCartas();
function perguntaCartas(){
    while(numeroCartas<4 || numeroCartas>14 || numeroCartas%2!==0){
        numeroCartas = parseInt(prompt("Quantas cartas deseja colocar ?")) 
    }
    criandoCartas();
}

function focando(focado){
    focado.classList.add("focus");
}

function criandoCartas(){
    for(let i=0; i < numeroCartas; i++){
        if(contadorGifs===numeroCartas/2){
            contadorGifs=0;
        }
        carta[i] = ` 
        <div onclick="focando(this)" class="card">
            <div class="frontFace face">
                <img src="imagens/front.png" alt="Costas da carta">
            </div>
            <div class="backFace face">
                <img src="imagens/${gifs[contadorGifs]}.gif" alt="Costas da carta">
            </div>
        </div>
        `
        contadorGifs++;
    }
    cartas = carta.join(' ')
}

tabuleiro.innerHTML= cartas;
