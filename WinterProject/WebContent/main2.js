class Main2 extends Phaser.Scene{

    constructor ()
    {
        super({key:'Main2'});
        console.log('Main called');

        this.music;

        this.mainCharacter;
        this.cursors;

        this.buildings;
        this.공원;
        this.블랙잭;
        this.편의점;
        this.피자나라;
        this.okButtonRunning;
        this.런닝런닝방법;

    }

    preload ()
    {
        this.load.audio('런닝런닝bgm','assets/music/런닝런닝bgm.mp3');

        this.load.spritesheet('mainCharacter','assets/main/mainCharacter.PNG', { frameWidth: 64, frameHeight: 64 });
        this.load.image('공원','assets/main/공원.PNG');
        this.load.image('블랙잭','assets/main/블랙잭.PNG');
        this.load.image('편의점','assets/main/편의점.PNG');
        this.load.image('피자나라','assets/main/피자나라.PNG');
        this.load.image('런닝런닝방법','assets/running/런닝런닝방법.PNG');
        this.load.image('okButton','assets/공통팝업창/확인버튼.PNG');
    }

    create ()
    {   
        this.music = this.sound.add('런닝런닝bgm');
        this.music.loop=true;
        this.sound.mute=false;
        this.music.play();

        this.cursors = this.input.keyboard.createCursorKeys();
    

        this.buildings = this.physics.add.staticGroup(); //빌딩 그룹화
        /*this.buildings.create(544, 288, '공원');
        this.buildings.create(608, 96, '블랙잭');
        this.buildings.create(352, 288, '편의점');
        this.buildings.create(288, 160, '피자나라');
        */
        
        //미니게임 건물 배치
        this.공원=this.physics.add.image(544, 288, '공원');
        this.블랙잭=this.physics.add.image(608, 96, '블랙잭');
        this.편의점=this.physics.add.image(352, 288, '편의점');
        this.피자나라=this.physics.add.image(288, 160, '피자나라');
        //this.add.image(288, 96, '피자나라');
        //this.add.image(288, 32, '피자나라');

        
        this.buildings.add(this.공원);
        this.buildings.add(this.블랙잭);
        this.buildings.add(this.편의점);
        this.buildings.add(this.피자나라);

        this.mainCharacter=this.physics.add.sprite(480,416,'mainCharacter');
        this.mainCharacter.setCollideWorldBounds(true);

        this.런닝런닝방법=this.add.image(384, 256, '런닝런닝방법');
        this.런닝런닝방법.setScale(0.65);
        this.okButtonRunning = this.add.image(620, 395, 'okButton');
        this.okButtonRunning.setInteractive();
        this.okButtonRunning.on('pointerdown', (event) => {
            this.런닝런닝방법.visible=false;
            this.okButtonRunning.visible=false;
            this.events.on('shutdown', this.shutdown, this);
            this.mainCharacter.setX(480);
            this.mainCharacter.setY(416);
            
            this.scene.restart('Running');
            this.scene.switch('Running');
            
        });
        this.런닝런닝방법.visible=false;
        this.okButtonRunning.visible=false;
        

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
    
        /*
        this.input.once('pointerdown',function(event){
            console.log('clicked')
            this.scene.start('Running');
        },this);

        */
        //this.physics.add.collider(this.mainCharacter, this.buildings);
        this.physics.add.overlap(this.mainCharacter, this.공원, this.runningOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.블랙잭, this.blackJackorNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.피자나라, this.pizzaOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.편의점, this.store24OrNot, null, this);
    }

    update() {
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


        /*
        if(this.mainCharacter.x>256 && this.mainCharacter.x<320){
            this.scene.switch('Pizza');
        }
        if(this.mainCharacter.x>320 && this.mainCharacter.x<384){
            this.scene.switch('Store');
        }
        if(this.mainCharacter.y>256 && this.mainCharacter.y<320){
            this.scene.switch('Running');
        }
        if(this.mainCharacter.y>64 && this.mainCharacter.y<128){
            this.scene.switch('Blackjack');
        }
        */

    }
    runningOrNot(){
        this.런닝런닝방법.visible=true;
        this.okButtonRunning.visible=true;
    }

    blackJackorNot(){

    }

    pizzaOrNot(){

    }

    store24OrNot(){

    }

    goToRunning(){
        this.scene.start('Running');
    }

    goToBlackJack(){
        this.scene.start('Blackjack');
    }

    goToPizza(){
        this.events.on('shutdown', this.shutdown, this);
        this.scene.start('Pizza');
    }

    goToStore24(){
        this.scene.start('Store24');
    }

    shutdown()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
    
};

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
    scene: [ Main2, Pizza, Running ]
};


var game = new Phaser.Game(config);