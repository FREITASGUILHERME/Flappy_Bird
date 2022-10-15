console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    desenha() {

        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, //Tamanho do recorte na Sprite
            flappyBird.x, flappyBird.y, //Posição dentro do canvas
            flappyBird.largura, flappyBird.altura //Tamanho dentro do canvas
        );
    }
}

function loop() {

    flappyBird.desenha();

    requestAnimationFrame(loop);

}

loop();