(function () {
    //AREA DE VARIAVEIS
    var FPS = 300;
    const PROB_NUVEM = 5;
    const PROB_PTERO = 1;
    const PROB_KQT = 1;
    const PROB_KQT_HARD = 2;
    var gameLoop;
    var deserto;
    var dino;
    var nuvens = [];
    var pteros = [];
    var cactos = [];
    var digitos = [];
    var digitosHigh = [];
    var pontuacao = 0;
    var cntr_obs = 0;
    var cont_nuvens = 0;
    var cont_ptero = 0;
    var cont_cactos = 0;
    var score;
    var highScore;
    var segundos_spent = 0;
    var game_status = -1; //-1 Aguardando 0 Em execucao - 1 Pausado - 2 GAMEOVER
    var letraschatas;
    var botao;
    var gg;
    //DEFINIR FUNCOES CONSTRUTORAS // OBJETOS E SEUS RESPECTIVOS MODIFICADORES
    function init () {
        deserto = new Deserto();
        dino = new Dino();
        var posicionador = 5;
        var posicionador2 = 65;
        for(var i = 0; i < 5; i++){
            posicionador += 10;
            posicionador2 += 10;
            score = new Score(posicionador);
            digitos.push(score);
            highScore = new Score(posicionador2);
            highScore.element.className = "highscore";
            digitosHigh.push(highScore);
        }
        letraschatas = new Hi();
    }
    //*********************************************************************** */
    function Deserto () {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.element.style.backgroundColor = 'white';
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    Deserto.prototype.daytime = function(){
        this.element.style.backgroundColor = this.element.style.backgroundColor == 'white' ? 'black' : 'white';
    }
    //*********************************************************************** */
    function Pterodatilus(){
        this.sprites = {
            'ptero1':'-135px',
            'ptero2':'-181px',
        };
        this.element = document.createElement("div");
        this.element.className = "pterodatilus";
        this.element.style.backgroundPositionX = this.sprites.ptero1;
        this.element.style.right = "0px";
        var randomnumber = Math.floor(Math.random() * 3);
        if(randomnumber == 0){
            this.element.style.bottom = "3px";
        } else if(randomnumber == 1){
            this.element.style.bottom = "33px";
        } else{
            this.element.style.bottom = "48px";
        }
        deserto.element.appendChild(this.element);
    }

    Pterodatilus.prototype.voar = function(){
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
        this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.ptero1)?this.sprites.ptero2:this.sprites.ptero1;
        game_status = colisao(dino.element.getBoundingClientRect(),this.element.getBoundingClientRect());
    }
    //*********************************************************************** */
    function Dino () {
        this.sprites = {
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'abaixado1':'-942px',
            'abaixado2':'-1001px',

        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "80px";
        this.element = document.createElement("div");
        this.element.id = "dino";
        this.element.className = "correndo";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        this.element.style.left = "5px";
        deserto.element.appendChild(this.element);
    } 

    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.className = "correndo";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
        }
        else if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
        else if(this.status == 3){
            this.element.className = "agachado";
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.abaixado1)?this.sprites.abaixado2:this.sprites.abaixado1;
        }
    }

    Dino.prototype.morrer = function (){
        this.element.style.backgroundPositionX = "-854px";
    }
    //*********************************************************************** */
    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random()*120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }
    //*********************************************************************** */
    function Cactus(){
        this.sprites = {
            'cactusjr':'-228px',
            'cactusgg':'-332px',
            'cactusggjr':'-431px',   
        };
        this.element = document.createElement("div");
        this.element.id = "cactus";
        this.element.className = "jr";
        this.element.style.right = "0px";
        this.element.style.backgroundPositionX = this.sprites.cactusjr;
        this.element.style.bottom = "3px";

        if(segundos_spent > 250){
            var randomnumber = Math.floor(Math.random() * 6);
            if(randomnumber <=2){
                this.element.style.backgroundPositionX = this.sprites.cactusjr;
            } else if(randomnumber > 2 && randomnumber <= 4){
                this.element.style.backgroundPositionX = this.sprites.cactusgg;
            } else{
                this.element.style.backgroundPositionX = this.sprites.cactusggjr;
            }
        }else{
            var randomnumber = Math.floor(Math.random() * 3);
            this.element.style.backgroundPositionX = this.sprites.cactusjr;
        }
        this.element.className = qualCactus(randomnumber);
        deserto.element.appendChild(this.element);
    }

    function qualCactus(id){
        if(id == 0) return "jr";
        if(id == 1) return "jr2";
        if(id == 2) return "jr3";
        if(id == 3) return "gg1";
        if(id == 4) return "gg2";
        if(id == 5) return "ggjr";
    }

    Cactus.prototype.mover = function(){
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
        game_status = colisao(dino.element.getBoundingClientRect(),this.element.getBoundingClientRect());
    }
     //*********************************************************************** */
    function Score(margem){
        this.sprites = {
            'num':'-484px',
        };
        this.element = document.createElement("div");
        this.element.className = "score";
        this.element.style.right = margem + "px";
        this.element.style.backgroundPositionX = this.sprites.num;
        this.element.style.top = "5px";
        deserto.element.appendChild(this.element);
    }

    Score.prototype.contar = function(pos){
        this.element = digitos[pos].element;
        var atual = this.element.style.backgroundPositionX;
        var padrao = /\d+/g;
        atual = parseInt(atual.match(padrao)[0]);
        if(atual == 574){
            this.element.style.backgroundPositionX = -484 + "px";
            digitos[pos + 1].contar(pos + 1);

        }else{
            this.element.style.backgroundPositionX = (-atual - 10) + "px";
        } 
    }

    Score.prototype.contar2 = function(pos){
        this.element = digitosHigh[pos].element;
        var atual = this.element.style.backgroundPositionX;
        var padrao = /\d+/g;
        atual = parseInt(atual.match(padrao)[0]);
        if(atual == 574){
            this.element.style.backgroundPositionX = -484 + "px";
            digitosHigh[pos + 1].contar2(pos + 1);

        }else{
            this.element.style.backgroundPositionX = (-atual - 10) + "px";
        } 
    }
    //*********************************************************************** */
    function Hi(){
        this.sprites = {
            'hi':'-584px',
        };
        this.element = document.createElement("div");
        this.element.className = "hi";
        this.element.style.right = "130px";
        this.element.style.backgroundPositionX = this.sprites.hi;
        this.element.style.top = "5px";
        deserto.element.appendChild(this.element);
    }
    //*********************************************************************** */
    function letras_GG(){
        this.element = document.createElement("div");
        this.element.className = "gameover";
        this.element.style.right = "170px";
        this.element.style.backgroundPositionX = "-484px";
        this.element.style.top = "35px";
        deserto.element.appendChild(this.element);
    }
    //*********************************************************************** */
    function botaozinho(){
        this.element = document.createElement("div");
        this.element.className = "botaozinho";
        this.element.style.right = "250px";
        this.element.style.backgroundPositionX = "-3px";
        this.element.style.top = "55px";
        this.element.addEventListener('click', function() {
            document.location.href = '';
          });
        deserto.element.appendChild(this.element);
    }
    //*********************************************************************** */
    //*********************************************************************** */
    //EVENT LISTENERS E CONTROLE DE ESTADO

    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status==0) dino.status = 1;
        if(e.key == "ArrowDown" && dino.status == 0) dino.status = 3;
        if(e.key == "ArrowDown" && dino.status == 1) dino.status = 2;
        if(e.keyCode == 80){
            (game_status == 0)?game_status = 1:game_status = 0;
        }
        if(e.key == "ArrowUp" && game_status == -1){
            game_status = 0;
            gameLoop = setInterval(run, 1000/FPS);
        }
    });

    window.addEventListener("keyup",function(e){
        if(e.key == "ArrowDown" && dino.status == 3) dino.status = 0;
    });

    


    function colisao(dinossauro,obstaculo){
        /*estrutura para deteccao de toque
            bottom: 252.875
            height: 44
            left: -187
            right: -138
            top: 208.875
            width: 49
            x: -187
            y: 208.875
        */
        var dl = dinossauro.left;
        var dr = dinossauro.right;
        var dt = dinossauro.top;
        var db = dinossauro.bottom;
        //SOCORRO
        var ol = obstaculo.left;
        var or = obstaculo.right;
        var ot = obstaculo.top;
        var ob = obstaculo.bottom;

        let dinox = dinossauro.x; //capturando a posição em x
        let dinoy = dinossauro.y; //capturando a posição em y
        let dinow = dinossauro.width; //capturando a largura
        let dinoh = dinossauro.height; //capturando a altura

        let obstaculox = obstaculo.x; //capturando a posição em x
        let obstaculoy = obstaculo.y; //capturando a posição em y
        let obstaculow = obstaculo.width; //capturando a largura
        let obstaculoh = obstaculo.height; //capturando a altura

        const colisao1 = (obstaculox + obstaculow >= dinox) && (dinox + dinow >= obstaculox); //
        const colisao2 = (obstaculoy + obstaculoh >= dinoy) && (dinoy + dinoh >= obstaculoy);  

        // console.log("socorro");
        // console.log(colisao1,colisao2);
        // console.log(dinossauro);

        if((colisao1 && colisao2)){
            return 2;
        }else{
            return 0;
        }

        /*
        ol + (Math.abs(ol - or)) >= 
        //Nao houve colisao
        // if(ol>dr || or<dl){console.log("passou liso");}
        // if(ot>db || ob<dt){console.log("passou liso");}
    
        //Acho que houve colisao
        if(ol < 63 && or > 15){
            // console.log(dinossauro,obstaculo);
            if(ob > dt){
                if(ot > db){
                    //essa situacao eh de fuga
                    return 0;
                }
                // if(ot <= db){
                //     console.log("Tocou top - bottom");
                // }
                // pteros.shift();
                return 2;
            }
        }
        // if(ol>dl && ol<dr){console.log("Tocou");}
        // if(or>dl && or<dr){console.log("Tocou");}
        // if(ot>dt && ot<db){console.log("Tocou");}
        // if(ob>dt && ob<db){console.log("Tocou");}
        */
    }

    //*********************************************************************** */
    //*********************************************************************** */
    //MAIN
    function run () {
        //A melhor gambiarra que ja fiz ate o dia de hoje
        if(game_status == 1){
            do {
                object.onkeypress = function(){game_status = 0};
            } while (game_status == 1);
        }
        if(game_status == 2){
            dino.morrer();
            gg = new letras_GG();
            botao = new botaozinho();
            clearInterval(gameLoop);
        }
        pontuacao++;
        if(pontuacao % 30 == 0){
            segundos_spent++;
            FPS += 1;
            if(segundos_spent % 60 == 0){   
                // console.log('vou mudar a cor');
                deserto.daytime();
            }
            digitos[0].contar(0);
            digitosHigh[0].contar2(0);
        }
        dino.correr();
        deserto.mover();
        if (Math.floor(Math.random()*1000) <= PROB_NUVEM) {
            cont_nuvens++;
            nuvens.push(new Nuvem());
            if(cont_nuvens > 15){
                console.log("estou limpando a memoria nuvens");
                nuvens.splice(0,5);
                cont_nuvens = 0;    
            }
        }
        nuvens.forEach(function (n) {
            n.mover();
        });
        //Chance de um ptero nascer
        if (Math.floor(Math.random()*1000) <= PROB_PTERO && Math.abs(pontuacao - cntr_obs) > 200 ) {
            cont_ptero++;
            cntr_obs = pontuacao;
            pteros.push(new Pterodatilus());
            if(cont_ptero > 15){
                console.log("estou limpando a memoria ptero");
                pteros.splice(0,5);
                cont_ptero = 0;    
            }
        }
        pteros.forEach(function (n) {
            n.voar();
        });
        if (Math.floor(Math.random()*1000) <= PROB_KQT && Math.abs(pontuacao - cntr_obs) > 100 ){
            cont_cactos++;
            cntr_obs = pontuacao;
            cactos.push(new Cactus());
            if(cont_cactos > 15){
                console.log("estou limpando a memoria cactos");
                cactos.splice(0,5);
                cont_cactos = 0;    
            }
        }
        cactos.forEach(function (n) {
            n.mover();
        });
        //Em caso de game over
        //clearInterval(gameLoop);
    
    }
    init();
})();