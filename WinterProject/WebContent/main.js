var config = {
    type: Phaser.WEBGL,
    parent: 'body-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 768,
    height: 512,
    disableContextMenu: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('blackjack', 'assets/blackjack/cardA.png');
    this.load.image('pizza','assets/pizza/Mr.Pizza.png');
    this.load.image('running','assets/running/cat.PNG');
    this.load.image('store24','assets/store24/과자_포카칩.PNG')
}
var blackjack
var pizza
var running
var store
function create ()
{
    blackjack=this.add.image(100,250,'blackjack');
    blackjack.scale=0.2
    blackjack.setInteractive();
    blackjack.on('pointerdown',function(pointer){
        if(!click_stop) click_stop=true;
    });

    pizza=this.add.image(200,250,'pizza')
    pizza.scale=0.5
    pizza.setInteractive();
    pizza.on('pointerdown',function(pointer){
        if(!click_stop) click_stop=true;
    });

    running=this.add.image(300,250,'running')
    running.scale=2
    running.setInteractive();
    running.on('pointerdown',function(pointer){
        if(!click_stop) click_stop=true;
    });

    store=this.add.image(400,250,'store24')
    store.scale=0.1
    store.setInteractive();
    store.on('pointerdown',function(pointer){
        if(!click_stop) click_stop=true;
    });
}
function update (){

}
