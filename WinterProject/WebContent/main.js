  
//공통변수
date=30; //30일부터 1일 까지 0이면 게임 엔딩
joy=5; //즐거움 1~10일 까지 0이면 게임 오버
money=10000; //돈 10000원에서 시작 0이면 게임 오버 -> 초당 100원씩 감소



  // mainscene
class Main extends Phaser.Scene{
    
    constructor ()   //this.변수명으로 선언 및 사용
    {
        super({key:'Main'});
        this.gameOver=false; //true이면 게임종료
        this.ending=0; //ending가 1이면 개미엔딩 - 편의점, 2면 개미엔딩 - 피자나라, 3이면 베짱이엔딩 - 런닝, 4면 베짱이엔딩 - 블랙잭

        //메인 화면 UI 설정
        this.mainLeftBar;

        //메인 게임 변수
    }


    preload ()
    {
        //메인게임 날짜, 즐거움, 돈 _ 왼쪽 바
        this.load.image('왼쪽바', 'assets/main/메인게임UI왼쪽바.png');


        this.load.image('blackjack', 'assets/blackjack/cardA.png');
        this.load.image('pizza', 'assets/pizza/Mr.Pizza.png');
        this.load.image('running', 'assets/running/cat.PNG');
        this.load.image('store24', 'assets/store24/과자_포카칩.PNG')
    }

    create ()
    {   //메인게임화면 설정
        this.mainLeftBar=this.add.image(0,0,'왼쪽바').setOrigin(0);


        /*
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
            this.scene.switch('Pizza');
        },this);*/



        
    }

    update()
    {
        if (this.gameOver)
        {
            if (this.ending==1){
                this.scene.start('개미_편의점');
            }
            else if (this.ending==2){
                this.scene.start('개미_피자나라');
            }
            else if (this.ending==3){
                this.scene.start('베짱이_런닝');
            }
            else if (this.ending==4){
                this.scene.start('베짱이_블랙잭');
            }
        }        
    }
    

}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ Main, Pizza, BlackJack, Store24]
};

var game = new Phaser.Game(config);