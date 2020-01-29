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
var sum1=0
var sum2=0
var sum
function preload ()
{
    
    
    this.load.image('stop', 'assets/blackjack/stop.png');
    this.load.image('card','assets/blackjack/card.png');

    this.load.image('card1','assets/blackjack/card1.png')
    this.load.image('card2','assets/blackjack/card2.png')
    this.load.image('card8','assets/blackjack/card8.png')
    this.load.image('carda','assets/blackjack/cardA.png')
    this.load.image('card3','assets/blackjack/card 3.png')
    this.load.image('card4','assets/blackjack/card 4.png')
    this.load.image('card5','assets/blackjack/card 5.png')
    this.load.image('card6','assets/blackjack/card 6.png')
    this.load.image('card7','assets/blackjack/card 7.png')
    this.load.image('card9','assets/blackjack/card 9.png')
    this.load.image('cardk','assets/blackjack/card k.png')
    
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
    sum=this.add.text(100,100,"합계1: "+sum1+" 합계2: "+sum2,{fill:'#fff'});


}

function update(){
   var rand;
    if(click){  // 클릭 시 카드 추가
        rand = Math.floor(Math.random() * 11)+1;
        var cardname;
        if(rand==10)
            cardname='cardk'
        else if(rand==11)
            cardname='carda'
        else
            cardname='card'+rand

        cardlocate+=100;
        card=this.add.image(cardlocate,400,cardname,0);
        card.scale=0.2;

        // 카드의 합 계산
        if(rand==11){
            sum1+=1
            sum2+=11
        }else{
            sum1+=rand
            sum2+=rand
        }
        sum.setText("합계1: "+sum1+" 합계2: "+sum2,{fill:'#fff'})

        click=false;
    }
    
}

