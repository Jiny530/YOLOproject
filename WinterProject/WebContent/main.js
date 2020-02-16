  // mainscene
class SceneA extends Phaser.Scene{
    
    constructor ()
    {
       super({key:'Main'});

    }

    preload ()
    {
        this.load.image('blackjack', 'assets/blackjack/cardA.png');
        this.load.image('pizza', 'assets/pizza/Mr.Pizza.png');
        this.load.image('running', 'assets/running/cat.PNG');
        this.load.image('store24', 'assets/store24/과자_포카칩.PNG')
    }

    create ()
    {
        var blackjack = this.add.image(100,250,'blackjack').setScale(0.5,0.5);
        var pizza = this.add.image(300,250,'pizza');
        //console.log('image added')
        blackjack.setInteractive();
        blackjack.on('pointerdown', function (event) {
            this.scene.start('BlackJack');
        },this);
        pizza.setInteractive()
        pizza.on('pointerdown',function(event){
            console.log('clicked')
            this.scene.start('Pizza');
        },this);
    }
    

}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ SceneA, Pizza, BlackJack]
};

var game = new Phaser.Game(config);