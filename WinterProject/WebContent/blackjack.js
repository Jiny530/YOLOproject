class BlackJack extends Phaser.Scene{

    constructor() {
        super({ key: 'BlackJack'});
        console.log('sceneB called')


        this.sum1=0
        this.sum2 = 0
        this.dealerSum1 = 0
        this.dealerSum2 = 0

        this.sum
        this.moneyText
        this.money = 100

        this.cards;
        this.cardlocate = 0;
        this.click_stop = false;
        this.click_go = false;

        this.GAME_OVER = 0
        this.GAME_START = 1
        this.TURN_STOP = 2
        this.gameState = this.GAME_OVER

        this.PLAYER = 1
        this.DEALER = 2
        

    }
    preload() {

        this.load.image('stop', 'assets/blackjack/stop.png');
        this.load.image('go', 'assets/blackjack/go.png');

        this.load.image('card1', 'assets/blackjack/card1.png')
        this.load.image('card2', 'assets/blackjack/card2.png')
        this.load.image('card8', 'assets/blackjack/card8.png')
        this.load.image('carda', 'assets/blackjack/cardA.png')
        this.load.image('card3', 'assets/blackjack/card 3.png')
        this.load.image('card4', 'assets/blackjack/card 4.png')
        this.load.image('card5', 'assets/blackjack/card 5.png')
        this.load.image('card6', 'assets/blackjack/card 6.png')
        this.load.image('card7', 'assets/blackjack/card 7.png')
        this.load.image('card9', 'assets/blackjack/card 9.png')
        this.load.image('cardk', 'assets/blackjack/card k.png')

        this.load.image('bg','assets/blackjack/bg_pattern4.png')
        this.load.image('board','assets/blackjack/board.png')
        this.load.image('cactus','assets/blackjack/cactus.png')
        this.load.image('character','assets/blackjack/player (3).PNG')
        this.load.image('dealerC','assets/blackjack/dealer (1).png')
        
    }
    create() {

        //변수 초기화
        this.sum1=0
        this.sum2 = 0
        this.dealerSum1 = 0
        this.dealerSum2 = 0

        this.moneyText
        this.money = 5000

        this.cardlocate = 769/2+512/2-15;
        this.click_stop = false;
        this.click_go = false;

        this.GAME_OVER = 0
        this.GAME_START = 1
        this.TURN_STOP = 2

        this.PLAYER = 1
        this.DEALER = 2

      
        
        //배경 꾸미기
        this.add.tileSprite(0,0,768,512,'bg').setOrigin(0)
        this.add.image(768/2,512/2,'board')
        var cactus=this.add.image(768/2+512/2,100,'cactus').setOrigin(0)
        cactus.setScale(0.2)
        var character=this.add.image(768/2+512/2+50,400,'character')
        character.setScale(0.2)
        var dealerCharacter = this.add.image(768/2-512/2-50,125,'dealerC')
        dealerCharacter.setScale(0.2)


        var button_stop;
        var button_go;
        button_stop = this.add.image(600, 100, 'stop', 0);
        button_stop.scale = 0.2
        button_go = this.add.image(500, 100, 'go', 0)
        button_go.scale = 0.2
        this.cards = this.add.group();

        button_stop.setInteractive();
        button_stop.on('pointerdown', function (event) {
            console.log(this.click_stop)
            if (!this.click_stop) this.click_stop = true;
        },this);
        button_go.setInteractive();
        button_go.on('pointerdown', function (event) {
            if (!this.click_go) this.click_go = true;
        },this)
        this.sum = this.add.text(768/2, 512/2, "합계1: " + this.sum1 + " 합계2: " + this.sum2, { fill: '#fff' });
        this.moneyText = this.add.text(768/2, 512/2+25, "판돈: " + this.money)
        this.gameState = this.GAME_START
    }
    
    update(){
        var rand;
        var card;
        if (this.gameState == 1) {
            if (this.click_go) {  // 클릭 시 카드 추가
                var cardname = this.random_card(this.PLAYER);
                card = this.add.image(this.cardlocate, 400, cardname, 0);
                this.cards.add(card)
                card.scale = 0.2
                this.sum.setText("합계1: " + this.sum1 + " 합계2: " + this.sum2, { fill: '#fff' })

                this.click_go = false;

                // 합계가 21을 초과하면 게임 오버
                if (this.sum1 > 21) {
                    this.sum.setText("게임 오버!!")
                    this.sum1 = 0
                    this.sum2 = 0
                    this.gameState = this.GAME_OVER
                    this.money *= -1
                    this.moneyText.setText("번돈 : " + this.money)
                    console.log(this.gameState)
                }
            }

            if (this.click_stop) {
                this.gameState = this.TURN_STOP
                console.log(this.gameState)
                // 딜러 카드 오픈
                this.cardlocate = 768/2-512/2+10
                while (this.dealerSum1 <= 11) {
                    var cardname = this.random_card(this.DEALER);
                    card = this.add.image(this.cardlocate, 150, cardname, 0);
                    this.cards.add(card)
                    card.scale = 0.2

                    // 카드의 합 계산

                }
                while (this.dealerSum1 <= 21) {
                    rand = Math.floor(Math.random())
                    if (rand == 1) {
                        var cardname = this.random_card(this.DEALER);
                        card = this.add.image(this.cardlocate, 150, cardname, 0);
                        this.cards.add(card)
                        card.scale = 0.2
                    }
                    else {
                        break;
                    }
                }
                if (this.sum2 <= 21)
                    this.sum1 = this.sum2
                if (this.dealerSum2 <= 21)
                    this.dealerSum1 = this.dealerSum2
                if (this.sum1 > this.dealerSum1) {
                    this.sum.setText("플레이어 승리")
                }
                else {
                    this.sum.setText("딜러 승리")
                    this.money *= -1
                    this.moneyText.setText("번돈 : " + this.money)
                    this.gameState = this.GAME_OVER
                }
                this.click_stop = false
            }
        }
        if (this.gameState == this.TURN_STOP) {
            if (this.click_go) {
                this.cards.clear(true, true)
                this.sum1 = this.sum2 = this.dealerSum1 = this.dealerSum2 = 0;
                this.cardlocate=769/2+512/2;
                this.click_go = false
                this.gameState = this.GAME_START
                this.money *= 2
                this.moneyText.setText("판돈: " + this.money)
                console.log(this.gameState)
                this.sum.setText("합계1: " + this.sum1 + " 합계2: " + this.sum2, { fill: '#fff' })
            }
            if (this.click_stop) {
                this.click_stop = false
                this.moneyText.setText("번돈 : " + this.money)
                this.sum.setText("게임 종료!!")
                console.log(this.gameState)
                this.gameState = this.GAME_OVER
            }
        }
        if (this.gameState == this.GAME_OVER) {
            if(this.click_stop){
                money+=this.money
                console.log(money+' '+this.money)
                date-=1
                this.scene.restart('blackJack')
                this.scene.wake('Main')
                music.stop();
                this.scene.switch('Main')
            }

        }
    }
    random_card(who){
        var rand = Math.floor(Math.random() * (11)) + 1;
        var cardname;
        if (rand == 10)
            cardname = 'cardk'
        else if (rand == 11)
            cardname = 'carda'
        else
            cardname = 'card' + rand

        // 카드의 합 계산
        if (who == this.PLAYER) {
        this.cardlocate -= 75;
        if (rand == 11) {
                this.sum1 += 1
                this.sum2 += 11
            } else {
                this.sum1 += rand
                this.sum2 += rand
            }
        }
        if (who == this.DEALER) {
        this.cardlocate += 75;
        if (rand == 11) {
                this.dealerSum1 += 1
                this.dealerSum2 += 11
            } else {
                this.dealerSum1 += rand
                this.dealerSum2 += rand
            }
        }
        return cardname;
    }
}


