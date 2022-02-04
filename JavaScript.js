let numeroCartas = 0, carta = [], cartas ="";
let tabuleiro = document.querySelector(".tabuleiro");
let gifs = [0,1,2,3,4,5,6,7], contadorGifs=0,primeiroNumero, segundoNumero, primeiraCarta, segundaCarta, digaNaoProGlitch = true;


perguntaCartas();
function perguntaCartas(){
    while(numeroCartas<4 || numeroCartas>14 || numeroCartas%2!==0){
        numeroCartas = parseInt(prompt("Escolha um número par de cartas entre 2 e 14")) 
    }
    criandoCartas();
}


function criandoCartas(){
    for(let i=0; i < numeroCartas; i++){
        if(contadorGifs===numeroCartas/2){
            contadorGifs=0;
        }
        carta[i] = ` 
        <div onclick="focandoNaCarta(this, ${gifs[contadorGifs]})" class="card">
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

function focandoNaCarta(cartaFocada, numeracaoDaCarta){
    if(digaNaoProGlitch == true){
        cartaFocada.classList.add("focus");
        if(primeiroNumero == undefined){
            primeiroNumero = numeracaoDaCarta;
            primeiraCarta = cartaFocada;
        }
        else{
            segundoNumero = numeracaoDaCarta;
            segundaCarta = cartaFocada;
            if(primeiraCarta === segundaCarta){
                segundaCarta=null;
                segundoNumero=null;
            }
            if(primeiroNumero!==segundoNumero){
                digaNaoProGlitch=false;
                setTimeout(desvirandoCartas, 900);
                setTimeout(evitarBug, 900);
                primeiroNumero = undefined;
            }
            else{
                primeiroNumero = undefined;    
            }
        }
    }
    

}

function desvirandoCartas(){
    primeiraCarta.classList.remove("focus");
    segundaCarta.classList.remove("focus");
}
function evitarBug(){
    digaNaoProGlitch=true;
}

tabuleiro.innerHTML= cartas;
