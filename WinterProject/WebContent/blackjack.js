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
var dealerSum1=0
var dealerSum2=0
var sum
var moneyText
var money=100
function preload ()
{
    
    
    this.load.image('stop', 'assets/blackjack/stop.png');
    this.load.image('go','assets/blackjack/go.png');

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
var cards;
var cardlocate=0;
var click_stop=false;
var click_go=false;
var button_stop;
var button_go;

var GAME_OVER = 0
var GAME_START = 1
var TURN_STOP=2
var gameState= GAME_OVER

var PLAYER=1
var DEALER=2
function create ()
{
   
    button_stop=this.add.image(600,100,'stop',0);
    button_stop.scale=0.2
    button_go = this.add.image(500,100,'go',0)
    button_go.scale=0.2
    cards= this.add.group();

    button_stop.setInteractive();
    button_stop.on('pointerdown',function(pointer){
        if(!click_stop) click_stop=true;
    });
    button_go.setInteractive();
    button_go.on('pointerdown',function(pointer){
        if(!click_go) click_go=true;
    })
    sum=this.add.text(100,50,"합계1: "+sum1+" 합계2: "+sum2,{fill:'#fff'});
    moneyText=this.add.text(100,100,"판돈: "+money)
    gameState=GAME_START

}

function random_card(who){
    rand = Math.floor(Math.random() * (11))+1;
    var cardname;
    if(rand==10)
        cardname='cardk'
    else if(rand==11)
        cardname='carda'
    else
        cardname='card'+rand
    cardlocate+=100;
    
    // 카드의 합 계산
    if(who==PLAYER){
        if(rand==11){
            sum1+=1
            sum2+=11
        }else{
            sum1+=rand
            sum2+=rand
        }    
    }
    if(who==DEALER){
        if(rand==11){
            dealerSum1+=1
            dealerSum2+=11
        }else{
            dealerSum1+=rand
            dealerSum2+=rand
        }    
    }
    return cardname;
}

function update(){
   var rand;
   if(gameState==GAME_START){
        if(click_go){  // 클릭 시 카드 추가
            var cardname=random_card(PLAYER);
            card=this.add.image(cardlocate,400,cardname,0);
            cards.add(card)
            card.scale=0.2
            sum.setText("합계1: "+sum1+" 합계2: "+sum2,{fill:'#fff'})

            click_go=false;

            // 합계가 21을 초과하면 게임 오버
            if(sum1>21){
                sum.setText("게임 오버!!")
                sum1=0
                sum2=0
                gameState=GAME_OVER
                money*=-1
                moneyText.setText("번돈 : "+money)
                money*=-1
                console.log(gameState)
            }
        }
        
        if(click_stop){
            gameState=TURN_STOP
            console.log(gameState)
            // 딜러 카드 오픈
            cardlocate=0
            while(dealerSum1<=11){
                var cardname=random_card(DEALER);
                card=this.add.image(cardlocate,200,cardname,0);
                cards.add(card)
                card.scale=0.2
    
                // 카드의 합 계산
                
            }
            while(dealerSum1<=21){
                rand = Math.floor(Math.random())
                if(rand==1){
                    var cardname=random_card(DEALER);
                    card=this.add.image(cardlocate,200,cardname,0);
                    cards.add(card)
                    card.scale=0.2
                }
                else{
                    break;
                }
            }
            if(sum2<=21)
                sum1=sum2
            if(dealerSum2<=21)
                dealerSum1=dealerSum2
            if(sum1>dealerSum1){
                sum.setText("플레이어 승리")
            }
            else{
                sum.setText("딜러 승리")
                money*=-1
                moneyText.setText("번돈 : "+money)
                gameState=GAME_OVER
            }
            click_stop=false
        }
    }
    if(gameState==TURN_STOP){
        if(click_go){
            cards.clear(true,true)
            sum1=sum2=dealerSum1=dealerSum2=cardlocate=0;
            click_go=false
            gameState=GAME_START
            money*=2
            moneyText.setText("판돈: "+money)
            console.log(gameState)
            sum.setText("합계1: "+sum1+" 합계2: "+sum2,{fill:'#fff'})
        }
        if(click_stop){
            click_stop=false
            moneyText.setText("번돈 : "+money)
            sum.setText("게임 종료!!")
            console.log(gameState)
            gameState=GAME_OVER
        }
    }
    if(gameState==GAME_OVER){
        

    }

    
}

