//  [Audios]
const somHitchao = new Audio();
somHitchao.src = './Efeitos/hit.wav'

const somPulo = new Audio();
somPulo.src = './Efeitos/pulo.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//  [Chão]
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            
            chao.x = movimentacao % repeteEm;
        },
        desenha() {
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
                chao.largura, chao.altura, //Tamanho do recorte na Sprite
                chao.x, chao.y, //Posição dentro do canvas
                chao.largura, chao.altura //Tamanho dentro do canvas
            );
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
                chao.largura, chao.altura, //Tamanho do recorte na Sprite
                (chao.x + chao.largura), chao.y, //Posição dentro do canvas
                chao.largura, chao.altura //Tamanho dentro do canvas
            );
        },
    };
    
    return chao;
}

//  [Plano de Fundo]
const planodefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 114,
    x: 0,
    y: canvas.height - 215,

    desenha() {

        contexto.fillStyle = '#06aaff';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY, //Sprite X, Sprite Y
            planodefundo.largura, planodefundo.altura, //Tamanho do recorte na Sprite
            planodefundo.x, planodefundo.y, //Posição dentro do canvas
            planodefundo.largura, planodefundo.altura //Tamanho dentro do canvas
        );


        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY, //Sprite X, Sprite Y
            planodefundo.largura, planodefundo.altura, //Tamanho do recorte na Sprite
            (planodefundo.x + planodefundo.largura), planodefundo.y, //Posição dentro do canvas
            planodefundo.largura, planodefundo.altura //Tamanho dentro do canvas
        );
    }
};

//  [Colisão]
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {

        return true;
    }

    return false;
}

//  [Pássaro]
function criaflappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            somPulo.play();
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza(){
            if(fazColisao(flappyBird, chao)){
                console.log('Fez colisao');

                somHitchao.play();

                mudaParaTela(telas.INICIO);
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
    
        },
    
        desenha() {
    
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte na Sprite
                flappyBird.x, flappyBird.y, //Posição dentro do canvas
                flappyBird.largura, flappyBird.altura //Tamanho dentro do canvas
            );
        }
    };

    return flappyBird;
}





//  [Tela de Início]
const mensagemgetredy = {

    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {

        contexto.drawImage(
            sprites,
            mensagemgetredy.sX, mensagemgetredy.sY,
            mensagemgetredy.w, mensagemgetredy.h,
            mensagemgetredy.x, mensagemgetredy.y,
            mensagemgetredy.w, mensagemgetredy.h
        );

    }

};



//  [Telas]
const globais = {

};

let telaAtiva = {

};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaflappyBird();
            globais.chao = criaChao();
        },
        desenha() {
            planodefundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemgetredy.desenha();
        },
        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

telas.JOGO = {
    desenha() {
        planodefundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();        
    },
    click(){

        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};


//  [Loops]
function loop() {
   
    telaAtiva.desenha();
    telaAtiva.atualiza();
   
    requestAnimationFrame(loop);

}


//  [Obtendo o Click do Usuário]
window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});


//  [Chamada das Funções]
mudaParaTela(telas.INICIO);
loop();