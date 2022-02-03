let numeroCartas = 0, carta = [], cartas ="";
let tabuleiro = document.querySelector("section");

perguntaCartas();
function perguntaCartas(){
    while(numeroCartas<4 || numeroCartas>14 || numeroCartas%2!==0){
        numeroCartas = parseInt(prompt("Quantas cartas deseja colocar ?")) 
    }
    criandoCartas();
}
function criandoCartas(){
    for(let i=0; i < numeroCartas; i++){
        carta[i] = ` 
        <div>
        <img src="imagens/front.png" alt="Costas da carta">
        </div>
        `
    }
    cartas = carta.join(' ')
}

tabuleiro.innerHTML= cartas;
