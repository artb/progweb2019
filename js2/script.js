function mensagem(){
    console.log("Escolha sua jogada:");
    console.log("1 - Papel");
    console.log("2 - Pedra");
    console.log("3 - Tesoura ")
}

function analise(entrada1, entrada2){
    if(entrada1 == 1 && entrada2 == 1 ){
        console.log("A rodada empatou!");
        return(0);
    } else if(entrada1 == 2 && entrada2 == 2 ){
        console.log("A rodada empatou!");
        return(0);
    } else if(entrada1 == 3 && entrada2 == 3 ){
        console.log("A rodada empatou!");
        return(0);
    }//empates 
    else if(entrada1 == 1 && entrada2 == 2 ){
        console.log("Você ganhou!!");
        return(1);
    } else if(entrada1 == 1 && entrada2 == 3 ){
        console.log("Você perdeu!!");
        return(-1);
    }//Papel
    else if(entrada1 == 2 && entrada2 == 1 ){
        console.log("Você perdeu!!");
        return(-1);
    } else if(entrada1 == 2 && entrada2 == 3 ){
        console.log("Você ganhou!!");
        return(1);
    }//Pedra
    else if(entrada1 == 3 && entrada2 == 1 ){
        console.log("Você ganhou!!");
        return(1);
    } else if(entrada1 == 3 && entrada2 == 2 ){
        console.log("Você perdeu!!");
        return(-1);
    }
}

function computadoJogou(jogo){
    if(jogo == 1){
        console.log("O computador jogou Papel")
    } else if(jogo == 1){
        console.log("O computador jogou Pedra")
    } else{
        console.log("O computador jogou Tesoura")
    }
}

function jogo(){
    var pontuacao = 0;
    while(true){
        mensagem();
        var jogador = parseInt(prompt());
        var computador = Math.ceil(Math.random() * 3);
        computadoJogou(computador);
        var resultado = analise(jogador,computador);
        if(resultado == -1){
            console.log("A sua pontuação foi: " + pontuacao);
            document.write("<h2>Você ganhou " + pontuacao +"!!</h1>")
            break;
        }else{
            pontuacao = pontuacao + resultado;
        }
    }
    
}

