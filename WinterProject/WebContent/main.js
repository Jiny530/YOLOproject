  
//공통변수
date=30; //30일부터 1일 까지 0이면 게임 엔딩
joy=5; //즐거움 1~10일 까지 0이면 게임 오버
money=10000; //돈 10000원에서 시작 0이면 게임 오버 -> 1초당 1000원씩 감소

minigame_start=0;


  // mainscene
class Main extends Phaser.Scene{
    
    constructor ()   //this.변수명으로 선언 및 사용
    {
        super({key:'Main'});
        this.gameOver=false; //true이면 게임종료
        this.ending=0; //ending이 1이면 게임오버, ending이 2이면 엔딩씬
        //메인 화면 UI 설정
        this.mainLeftBar;

        this.dateText;
        this.joyText;
        //메인 게임 변수
        this.music;

        this.mainCharacter;
        this.playerMove=true;
        this.cursors;
        
        this.button_ok;
        this.button_no;

        this.buildings;
        this.공원;
        this.블랙잭;
        this.편의점;
        this.피자나라;

        
        this.런닝방법;
        this.블랙잭방법;
        this.피자방법;
        this.편순이방법;
        this.whichGame=0;
    }


    preload ()
    {   
        this.load.audio('미니게임보통bgm','assets/music/미니게임보통bgm.mp3');

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

        this.load.image('okButton','assets/공통팝업창/확인버튼.PNG');
        this.load.image('noButton','assets/공통팝업창/X_버튼.PNG');

        this.load.image('런닝방법','assets/running/런닝런닝방법.PNG');
        this.load.image('편의점방법','assets/store24/편순이방법.png');
        this.load.image('블랙잭방법','assets/blackjack/blackjack_tutorial.png')
        this.load.image('편순이방법','assets/store24/편순이방법.png');
        this.load.image('피자방법','assets/pizza/피자방법.PNG');

        

    
    }

    create ()   
    { 
        this.music = this.sound.add('미니게임보통bgm');
        this.music.loop=true;
        this.sound.mute=false;
        this.music.play();
        //메인게임화면 설정
        this.mainLeftBar=this.add.image(0,0,'왼쪽바').setOrigin(0);
        this.dateText=this.add.bitmapText(45,45,'myfont',date,36)
        this.joyText = this.add.bitmapText(70,125,'myfont',''+joy,20)

        this.cursors = this.input.keyboard.createCursorKeys(); //위,아래,왼쪽,오른쪽 방향키

        //미니게임 건물 배치
        this.공원=this.physics.add.image(544, 288, '공원');
        this.블랙잭=this.physics.add.image(608, 96, '블랙잭');
        this.편의점=this.physics.add.image(352, 288, '편의점');
        this.피자나라=this.physics.add.image(288, 160, '피자나라');

        this.mainLeftBar=this.add.image(0,0,'왼쪽바').setOrigin(0);

        this.mainCharacter=this.physics.add.sprite(480,416,'mainCharacter');
        this.mainCharacter.setCollideWorldBounds(true);

        this.런닝방법=this.add.image(384, 256, '런닝방법').setScale(0.65);
        this.런닝방법.visible=false;

        this.블랙잭방법=this.add.image(384, 256, '블랙잭방법').setScale(0.65);
        this.블랙잭방법.visible=false;

        this.피자방법=this.add.image(384, 256, '피자방법').setScale(0.65);
        this.피자방법.visible=false;

        this.편순이방법=this.add.image(384, 256, '편순이방법').setScale(0.65);
        this.편순이방법.visible=false;
        
        this.button_ok = this.add.image(620, 395, 'okButton').setInteractive();
        this.button_ok.visible=false;

        this.button_no = this.add.image(635, 120,'noButton').setInteractive();
        this.button_no.visible=false;
        
        
        this.button_no.on('pointerdown', (event) => {
            this.button_ok.visible=false;
            this.button_no.visible=false;
            this.mainCharacter.setX(480);
            this.mainCharacter.setY(416);
            this.playerMove=true;
            
            if (this.whichGame==1){
                this.런닝방법.visible=false;
            }
            else if (this.whichGame==2){
                this.블랙잭방법.visible=false;
            }
            else if (this.whichGame==3){
                this.피자방법.visible=false;
            }
            else if (this.whichGame==4){
                this.편순이방법.visible=false;
            }

        });

        
        this.button_ok.on('pointerdown', (event) => {
            this.button_ok.visible=false;
            this.button_no.visible=false;
            this.mainCharacter.setX(480);
            this.mainCharacter.setY(416);  
            this.playerMove=true;
            //this.events.on('shutdown', this.shutdown, this);
            this.music.stop();
            if (this.whichGame==1){
                this.런닝방법.visible=false;
                this.scene.switch('Running');
            }
            else if (this.whichGame==2){
                this.블랙잭방법.visible=false;
                this.scene.switch('BlackJack');
            }
            else if (this.whichGame==3){
                this.피자방법.visible=false;
                this.scene.switch('Pizza');
            }
            else if (this.whichGame==4){
                this.편순이방법.visible=false;
                this.scene.switch('Store24');
            }

            console.log(money);
            console.log(joy);
            
        });

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
        this.physics.add.overlap(this.mainCharacter, this.공원, this.runningOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.블랙잭, this.blackJackorNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.피자나라, this.pizzaOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.편의점, this.store24OrNot, null, this);
        
        
    }

    update()
    {
        this.dateText.setText(date)
        if(!this.gameOver && (joy<=0 || money<=0)){
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
        if (this.cursors.left.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(-160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('left', true);
        }
        else if (this.cursors.right.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('right', true);
        }
        else if (this.cursors.up.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(-160);

            this.mainCharacter.anims.play('up', true);
        }
        else if (this.cursors.down.isDown && this.playerMove) {
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
    runningOrNot(){
        this.whichGame=1;
        this.playerMove=false;
        this.런닝방법.visible=true;
        this.button_ok.visible=true;
        this.button_no.visible=true;
    }

    blackJackorNot(){
        this.whichGame=2;
        this.블랙잭방법.visible=true;
        this.playerMove=false;
        this.button_ok.visible=true;
        this.button_no.visible=true;
    }

    pizzaOrNot(){
        this.whichGame=3;
        this.피자방법.visible=true;
        this.playerMove=false;
        this.button_ok.visible=true;
        this.button_no.visible=true;
    }

    store24OrNot(){
        this.whichGame=4;
        this.편순이방법.visible=true;
        this.playerMove=false;
        this.button_ok.visible=true;
        this.button_no.visible=true;
    }

    shutdown()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
    
}

//게임 오버, 게임 엔딩 팝업 관리
class GameOver extends Phaser.Scene {
    constructor () {
        super({key:'GameOver'})

    }
    preload() {
        //this.load.image('popup','assets/ending/endingPopUp.PNG')
        //this.load.image('title','assets/ending/gameOverTitle.PNG')

        //게임오버
        this.load.image('즐거움게임오버','/assets/ending/즐거움게임오버.png');
        this.load.image('돈게임오버','/assets/ending/돈게임오버.png');

        //게임엔딩
        this.load.image('공원게임엔딩','/assets/ending/공원게임엔딩.png');
        this.load.image('피자박스게임엔딩','/assets/ending/피자박스게임엔딩.png');
        this.load.image('편순이게임엔딩','/assets/ending/편순이게임엔딩.png');
        this.load.image('블랙잭게임엔딩','/assets/ending/블랙잭게임엔딩.png');
    }
    create() {
        //this.add.image(0,0,'popup').setOrigin(0)
        //this.add.image(768/2,115,'title')
        if ( date >=0 && money<=0){
            var title = this.add.image(0,0,'돈게임오버').setOrigin(0)
            title.setScale(0.64)
        }
    }
}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [ Main, Pizza, BlackJack, Store24, Running ,GameOver]
};

var game = new Phaser.Game(config);