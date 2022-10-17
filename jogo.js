console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//  [Chão]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 122,
    x: 0,
    y: canvas.height - 111,

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
    }
};

//  [Plano de Fundo]
const planodefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 104,
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

//  [Pássaro]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza(){
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
let telaAtiva = {

};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;
}

const telas = {
    INICIO: {
        desenha() {
            planodefundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemgetredy.desenha();
        },
        atualiza() {

        }
    }
};


telas.JOGO = {
    desenha() {
        planodefundo.desenha();
        chao.desenha();
        flappyBird.desenha();        
    },
    atualiza() {
        flappyBird.atualiza();
    }
};


//  [Loops]
function loop() {
   
    telaAtiva.desenha();
    telaAtiva.atualiza();
   
    requestAnimationFrame(loop);

}



mudaParaTela(telas.INICIO);
loop();