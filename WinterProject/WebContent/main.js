  
//공통변수
date=30; //30일부터 1일 까지 0이면 게임 엔딩
joy=5; //즐거움 1~10일 까지 0이면 게임 오버
money=10000; //돈 10000원에서 시작 0이면 게임 오버 -> 초당 100원씩 감소

minigame_start=0;


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


        this.mainCharacter;
        this.cursors;

        this.buildings;
        this.공원;
        this.블랙잭;
        this.편의점;
        this.피자나라;
    }


    preload ()
    {
        //메인게임 날짜, 즐거움, 돈 _ 왼쪽 바
        this.load.image('왼쪽바', 'assets/main/메인게임UI왼쪽바.png');


        this.load.image('blackjack', 'assets/blackjack/cardA.png');
        this.load.image('pizza', 'assets/pizza/Mr.Pizza.png');
        this.load.image('running', 'assets/running/cat.PNG');
        this.load.image('store24', 'assets/store24/과자_포카칩.PNG')


        this.load.spritesheet('mainCharacter','assets/main/mainCharacter.PNG', { frameWidth: 64, frameHeight: 64 }); //mainCharacter
        //건물들
        this.load.image('공원','assets/main/공원.PNG');
        this.load.image('블랙잭','assets/main/블랙잭.PNG');
        this.load.image('편의점','assets/main/편의점.PNG');
        this.load.image('피자나라','assets/main/피자나라.PNG');
        this.load.bitmapFont('myfont', 'assets/main/font/font.png', 'assets/main/font/font.fnt');
    }

    create ()   
    {   //메인게임화면 설정
        this.mainLeftBar=this.add.image(0,0,'왼쪽바').setOrigin(0);

        this.cursors = this.input.keyboard.createCursorKeys(); //위,아래,왼쪽,오른쪽 방향키

        //미니게임 건물 배치
        this.공원=this.physics.add.image(544, 288, '공원');
        this.블랙잭=this.physics.add.image(608, 96, '블랙잭');
        this.편의점=this.physics.add.image(352, 288, '편의점');
        this.피자나라=this.physics.add.image(288, 160, '피자나라');

        this.mainCharacter=this.physics.add.sprite(480,416,'mainCharacter');
        this.mainCharacter.setCollideWorldBounds(true);

        //메인캐릭터 상하좌우 움직임
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'still',
            frames: [ { key: 'mainCharacter', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });

        //빌딩에 메인 캐릭터가 닿으면 그 씬으로 넘어감
        this.physics.add.overlap(this.mainCharacter, this.공원, this.goToRunning, null, this);
        this.physics.add.overlap(this.mainCharacter, this.블랙잭, this.goToBlackjack, null, this);
        this.physics.add.overlap(this.mainCharacter, this.피자나라, this.goToPizza, null, this);
        this.physics.add.overlap(this.mainCharacter, this.편의점, this.goToStore24, null, this);


        /*

        
        var blackjack = this.add.image(100,250,'blackjack').setScale(0.5,0.5);
        var pizza = this.add.image(300,250,'pizza');
        //console.log('image added')
        blackjack.setInteractive();
        blackjack.on('pointerdown', function (event) {
            this.scene.start('BlackJack');
        /*blackjack.on('pointerdown', function (event) {
            this.scene.start('BlackJack');
        },this);*/
        pizza.setInteractive()
        pizza.on('pointerdown',function(event){
            console.log('clicked')
            this.scene.start('Pizza');
        },this);



        
        var dateText=this.add.bitmapText(45,45,'myfont',''+date,36)
        var joyText = this.add.bitmapText(70,125,'myfont',''+joy,20)
        this.mainLeftBar.setInteractive()
        this.mainLeftBar.on('pointerdown', function (event) {
            this.money=-5;
            console.log(this.money)
        },this);
    }

    update()
    {
        if(!this.gameOver && (this.joy<=0 || this.money<=0)){
            this.gameOver=true;
            this.scene.start('GameOver')
        }
        
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
        
        //메인 캐릭터 상하좌우 방향키 누를 때 움직임
        if (this.cursors.left.isDown) {
            this.mainCharacter.setVelocityX(-160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.mainCharacter.setVelocityX(160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(-160);

            this.mainCharacter.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(160);

            this.mainCharacter.anims.play('down', true);
        }
        else
        {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('still');
        }

        
    }

    //각 미니게임으로 넘어가기
    goToRunning(){
        this.scene.start('Running');
    }

    goToBlackjack(){
        this.scene.start('Blackjack');
    }

    goToPizza(){
        this.scene.start('Pizza');
    }

    goToStore24(){
        this.scene.start('Store24');
        }        

        /*if (minigame_start==1){
            this.scene.remove('Pizza');
            minigame_start=0;
        }*/
    
}

class GameOver extends Phaser.Scene {
    constructor () {
        super({key:'GameOver'})
    }
    preload() {
        this.load.image('popup','assets/ending/endingPopUp.PNG')
        this.load.image('title','assets/ending/gameOverTitle.PNG')

    }
    create() {
        this.add.image(0,0,'popup').setOrigin(0)
        this.add.image(768/2,115,'title')
    }
}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [ Main, Pizza, BlackJack, Store24, Running ,GameOver]
};

var game = new Phaser.Game(config);