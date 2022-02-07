let numeroCartas, carta = [], cartas ="";
const tabuleiro = document.querySelector(".tabuleiro");
let gifs = [0,1,2,3,4,5,6], contadorGifs=0,primeiraRemessa, segundaRemessa, primeiraCarta, segundaCarta, digaNaoProGlitch = true;
let jogadas=0, tempo=0, acertos =0, intervalo=null;


perguntarCartas();
function perguntarCartas(){
    while(numeroCartas<4 || numeroCartas>14 || numeroCartas%2!==0){
        numeroCartas = parseInt(prompt("Escolha um número par de cartas entre 4 e 14")) 
    }
    criandoCartas();
}

function criandoCartas(){
    gifs.sort(embaralhandoCartas);
    for(let i=0; i < numeroCartas; i++){
        if(contadorGifs===numeroCartas/2){
            contadorGifs=0;
        }
        carta[i] = ` 
        <article onclick="focandoNaCarta(this, ${gifs[contadorGifs]})" class="carta" data-identifier="card">
            <div class="faceDaFrente face" data-identifier="back-face">
                <img src="imagens/front.png" alt="Costas da carta">
            </div>
            <div class="faceDeTras face" data-identifier="front-face">
                <img src="imagens/${gifs[contadorGifs]}.gif" alt="Face da carta">
            </div>
        </article>
        `
        contadorGifs++;
    }
    carta.sort(embaralhandoCartas);
    cartas = carta.join(' ')
    tabuleiro.innerHTML= cartas;
}

function embaralhandoCartas() { 
	return Math.random() - 0.5; 
}

function focandoNaCarta(cartaFocada, numeracaoDaCarta){
    if(tempo ===0){
        tempo++;
        intervalo =setInterval(atualizarCronometro,1000);
    }
    if(digaNaoProGlitch == true){
        cartaFocada.classList.add("focus");
        if(primeiraRemessa == undefined){
            primeiraRemessa = numeracaoDaCarta;
            primeiraCarta = cartaFocada;
            calculandoJogadas();
        }
        else{
            segundaRemessa = numeracaoDaCarta;
            segundaCarta = cartaFocada;
            if(primeiraCarta === segundaCarta){
                segundaCarta=undefined;
                segundaRemessa=undefined;
            }
            else{
                calculandoJogadas();
                if(primeiraRemessa!==segundaRemessa){
                    digaNaoProGlitch=false;
                    setTimeout(desvirandoCartas, 1000);
                    setTimeout(evitarBug, 1000);
                    primeiraRemessa = undefined;
                }
                else{
                    primeiraRemessa = undefined;
                    acertos++;
                    primeiraCarta.removeAttribute("onclick");
                    segundaCarta.removeAttribute("onclick");
                    digaNaoProGlitch=false;
                    setTimeout(evitarBug, 200);
                    if(acertos>=numeroCartas/2){
                    clearInterval(intervalo);
                    setTimeout(finalizarJogo, 500);
                    }    
                }
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
function calculandoJogadas(){
    jogadas++;
    let jogadasFeitas = document.querySelector(".jogadas");
    jogadasFeitas.innerHTML=`Jogadas feitas: ${jogadas}`
}
function atualizarCronometro(){
    let cronometro = document.querySelector(".cronometro");
    cronometro.innerHTML=`Tempo: ${tempo}`;
    tempo++;
}
function finalizarJogo(){
    numeroCartas=undefined;
    primeiraRemessa=undefined, segundaRemessa=undefined, primeiraCarta=undefined; segundaCarta=undefined;
    alert(`Você ganhou em ${jogadas} jogadas / ${tempo} segundos!`);
    let jogarNovamente = prompt("Deseja jogar novamente ? \n digite 'sim' ou 'não'")
    if (jogarNovamente === "sim"){
        jogadas=-1; tempo=0; acertos =0, contadorGifs=0, carta = [], cartas ="";
        calculandoJogadas()
        atualizarCronometro()
        tempo--;
        perguntarCartas();
    }
}
