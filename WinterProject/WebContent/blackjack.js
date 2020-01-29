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
    
    
    this.load.image('stop', 'assets/blackjack/stop.png');
    this.load.image('card','assets/blackjack/card.png');
}
var cardlocate=0;
var click=false;
var button;
function create ()
{
   
    button=this.add.image(600,100,'stop',0);
    this.add.image(cardlocate,400,'card',0);
    button.scale=0.2

    
    
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    // this.input.mouse.disableConstextMenu();
    button.setInteractive();
    button.on('pointerdown',function(pointer){
        
        if(!click) click=true;
    });

}
function addCard () {
    card=this.add.image(cardlocate,400,'card',0);
    cardlocate=cardlocate+300;
}

function update(){
   
    if(click){
        cardlocate+=100;
        this.add.image(cardlocate,400,'card',0);
        click=false;
    }
}
