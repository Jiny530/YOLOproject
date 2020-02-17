money=0;
happiness=0;
class Main extends Phaser.Scene{

    constructor ()
    {
        super({key:'Main'});
        console.log('Main called');

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
        this.load.image('blackjack', 'assets/blackjack/cardA.png');
        this.load.image('pizza', 'assets/pizza/Mr.Pizza.png');
        this.load.image('running', 'assets/running/cat.PNG');
        this.load.image('store24', 'assets/store24/과자_포카칩.PNG')

        this.load.spritesheet('mainCharacter','assets/main/mainCharacter.PNG', { frameWidth: 64, frameHeight: 64 });
        this.load.image('공원','assets/main/공원.PNG');
        this.load.image('블랙잭','assets/main/블랙잭.PNG');
        this.load.image('편의점','assets/main/편의점.PNG');
        this.load.image('피자나라','assets/main/피자나라.PNG');
    }

    create ()
    {   
        this.cursors = this.input.keyboard.createCursorKeys();

        this.buildings = this.physics.add.staticGroup(); //빌딩 그룹화
        /*this.buildings.create(544, 288, '공원');
        this.buildings.create(608, 96, '블랙잭');
        this.buildings.create(352, 288, '편의점');
        this.buildings.create(288, 160, '피자나라');
        */
        
        //미니게임 건물 배치
        this.공원=this.physics.add.image(544, 288, '공원');
        this.공원.angle=270;
        this.블랙잭=this.physics.add.image(608, 96, '블랙잭');
        this.블랙잭.angle=90;
        this.편의점=this.physics.add.image(352, 288, '편의점');
        this.피자나라=this.physics.add.image(288, 160, '피자나라');
        //this.add.image(288, 96, '피자나라');
        //this.add.image(288, 32, '피자나라');
        this.피자나라.angle=180;

        
        this.buildings.add(this.공원);
        this.buildings.add(this.블랙잭);
        this.buildings.add(this.편의점);
        this.buildings.add(this.피자나라);

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
    
        /*
        this.input.once('pointerdown',function(event){
            console.log('clicked')
            this.scene.start('Running');
        },this);

        */
        this.physics.add.collider(this.mainCharacter, this.buildings);
        this.physics.add.overlap(this.mainCharacter, this.공원, this.goToRunning, null, this);
        this.physics.add.overlap(this.mainCharacter, this.블랙잭, this.goToBlackjack, null, this);
        this.physics.add.overlap(this.mainCharacter, this.피자나라, this.goToPizza, null, this);
        this.physics.add.overlap(this.mainCharacter, this.편의점, this.goToStore24, null, this);
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

    goToRunning(){
        this.scene.switch('Running');
    }

    goToBlackjack(){
        this.scene.switch('Blackjack');
    }

    goToPizza(){
        this.scene.switch('Pizza');
    }

    goToStore24(){
        this.scene.switch('Store24');
    }
    
};


class Running extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'Running',active:false,auto_start:false });
        console.log('Running called')


        this.move;
        this.movingspeed=3;

        //배경 변수
        this.cloud1;
        this.cloud2;
        this.cloud3;
        this.cloud4;
        this.tree1;
        this.tree2;
        this.tree3;
        this.tree4;
        this.grass1;
        this.grass2;
        this.grass3;
        this.grass4;
        this.bench;
        this.platforms;
        this.limit; //검정색 뒤로 배경 움직이게
        this.limitground;

        this.cursors;
        this.score = 0;
        this.gameOver = false;
        this.scoreText;

        this.heartText;
        this.objectText;
        this.otherText;

        this.sprite; //뛰는 캐릭터
        this.timebar;
        this.timerEvent;
        this.random;
                
        //그룹
        this.hearts; //하트 담는 그룹
        this.objects; //고양이, 쓰레기
        this.others; //바나나, 돌
        this.nameObjects= new Array(); //고양이, 쓰레기 이름 담는 배열
        this.randomList=['heart', 'banana', 'cat', 'rock', 'trash'];

        //result 팝업
        this.happiness;
        this.okButton;
        this.okText;
        this.result;
        this.scoreResultText;
        this.totalScoreText;
        this.totalText;
        this.popup;

        //+1, +5, -5
        this.plus1;
        this.plus5;
        this.minus5;
    }

    preload ()
    {
            //640,360
        /* 배경 */
        this.load.image('background', 'assets/running/background4.png');
        this.load.image('bg', 'assets/running/bg5.png');
        this.load.image('ground2','assets/running/ground4.png');
        this.load.image('cloud', 'assets/running/cloud3.png');
        this.load.image('tree', 'assets/running/tree.png');
        this.load.image('tree2', 'assets/running/tree2.png');
        this.load.image('limitbg', 'assets/running/limit4.png');
        this.load.image('tree3', 'assets/running/tree3.png');
        this.load.image('tree4', 'assets/running/tree4.png');
        this.load.image('grass', 'assets/running/grass.png');
        this.load.image('bench', 'assets/running/bench2.png');
        //this.load.image('bench', 'assets/running/bench2.png');
        this.load.image('timebar', 'assets/running/timebar2.png');
        this.load.image('score', 'assets/running/score.png');
        this.load.image('+1', 'assets/running/+1.png');
        this.load.image('+5', 'assets/running/+5.png');
        this.load.image('-5', 'assets/running/-5.png');
        this.load.image('limitground', 'assets/running/limit.png');

        this.load.spritesheet('character', 'assets/running/character.png', { frameWidth: 64, frameHeight: 64 });

        //오브젝트들
        this.load.image('heart', 'assets/running/heart.png');
        this.load.image('banana', 'assets/running/banana.png');
        this.load.image('cat', 'assets/running/cat.png');
        this.load.image('rock', 'assets/running/rock.png');
        this.load.image('trash', 'assets/running/trash.png');

        //result 팝업
        this.load.image('happiness', 'assets/running/result/happiness.png');
        this.load.image('okButton', 'assets/running/result/okButton.png');
        this.load.image('okText', 'assets/running/result/okText.png');
        this.load.image('result', 'assets/running/result/result.png');
        this.load.image('scoreResultText', 'assets/running/result/scoreResultText.png');
        this.load.image('totalScoreText', 'assets/running/result/totalScoreText.png');
        this.load.image('totalText', 'assets/running/result/totalText.png');
         
    }

    create ()
    {
        this.limitground=this.physics.add.image(384, 426, 'limitground');
        this.platforms = this.physics.add.staticGroup(); //캐릭터가 뛰는 바닥 static
        this.add.image(384, 256, 'background'); //검정 바탕
        this.add.image(384, 256, 'bg'); //하늘색 바탕
        this.platforms.create(384, 426, 'ground2'); //캐릭터가 뛰는 바닥
        this.speed = Phaser.Math.GetSpeed(550, this.movingspeed); //움직이는 배경 스피드
        this.speed2 = Phaser.Math.GetSpeed(600, this.movingspeed);
        //  The score
        this.scoreText = this.add.text(678, 20, ': 0', { fontSize: '25px', fill: '#fff' });

        this.plus1=this.add.image(120, 250,'+1');
        this.plus5=this.add.image(120, 250,'+5');
        this.minus5=this.add.image(120, 250,'-5');
        this.plus1.visible=false;
        this.plus5.visible=false;
        this.minus5.visible=false;
        /*this.heartText = this.add.text(120, 250, '+1', { fontSize: '25px', fill: '#fff' });
        this.heartText.visible = false;
        this.objectText = this.add.text(120, 250, '+5', { fontSize: '25px', fill: '#fff' });
        this.objectText.visible = false;
        this.otherText = this.add.text(120, 250, '-5', { fontSize: '25px', fill: '#fff' });
        this.otherText.visible = false;
        */
        this.add.image(663, 30, 'heart'); //획득한 하트
        
        var timebarBg = this.add.image(485, 30, 'timebar'); //타임바

        /* 뒤에서 움직이는 애들 */
        this.cloud1 = this.add.image(200, 160, 'cloud');
        this.cloud2 = this.add.image(360, 200, 'cloud');
        this.cloud3 = this.add.image(580, 180, 'cloud');
        this.cloud4 = this.add.image(790, 210, 'cloud');
        this.tree1 = this.add.image(250, 312, 'tree');
        this.tree2 = this.add.image(500, 312, 'tree2');
        this.tree3 = this.add.image(750, 312, 'tree3');
        this.tree4 = this.add.image(900, 312, 'tree4');
        this.grass1 = this.add.image(150, 363, 'grass');
        this.grass2 = this.add.image(230, 363, 'grass');
        this.grass3 = this.add.image(680, 363, 'grass');
        this.grass4 = this.add.image(800, 363, 'grass');
        this.bench = this.add.image(370, 345, 'bench');

        //this.add.image(140, 280, 'score');

        

        /* 움직이는 애들 검정색 뒤로 사라지게 검정색 하나 더 놔둠*/
        this.limit = this.physics.add.staticGroup();
        this.limit.create(35, 256, 'limitbg');
        this.limit.create(740, 256, 'limitbg');
        

        /*캐릭터가 계속 움직이게 하는 */
        var characterAnimation = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('character'),
            frameRate: 30,
            repeat: -1
        });

        this.sprite = this.physics.add.sprite(90, 345, 'character');
        this.sprite.setGravityY(700);
        this.sprite.setBounce(0.2);
        this.sprite.play('walk');

        /*타임바 */
        this.timerEvent = this.time.addEvent({ delay: 30000 });
        this.timebar = this.add.graphics({ x: 0, y: 0 });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.sprite, this.platforms);

        //만들어진 오브젝트 모두 group화
        this.objects = this.physics.add.group();
        this.others = this.physics.add.group();
        this.hearts = this.physics.add.group();

        //오브젝트 만드는 함수
        //timedEvent=this.time.addEvent({ delay: speed2, callback: firstObject, callbackScope: this, loop: false });
        var timedEvent2 = this.time.addEvent({ delay: 550, callback: this.spawnObject, callbackScope: this, loop: true });

        //this.input.keyboard.on('keydown_W', checkObject, this);
        //this.physics.add.collider(this.others, this.limitground);
        //this.physics.add.collider(this.objects, this.limitground);

       
    }


    update(time, delta) {
        if (this.gameOver) {
            this.sprite.anims.setRepeat(0); //캐릭터 뛰는 거 멈춤

            /*//팝업창 나오게
            this.result.visible = true;
            this.happiness.visible = true;
            this.okButton.visible = true;
            this.okText.visible = true;
            this.scoreResultText.visible = true;
            this.totalScoreText.visible = true;
            this.totalText.visible = true;
            */
            this.popUp();
            //오브젝트 안보이게
            this.sprite.visible=false;
            //this.objects.getChildren().visible=false;
            //this.others.getChildren().visible=false;
            //this.hearts.getChildren().visible=false;
            return;
        }

        //점프 체크
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-400);
        }


        this.moveBackground(time, delta); //뒤에 배경 움직이게
        this.timeBar(this.timebar); //타임바
        this.moveObject(time, delta); //오브젝트 모두 움직이게
        this.destroyFailObject(); //오브젝트가 sprite 지나가면 destroy

        this.checkObject();
        var heartChildren = this.hearts.getChildren();
        //var object=objects.getChildren();
        var temp = this.others.getChildren();
        this.physics.add.overlap(this.sprite, heartChildren, this.collectHeart, null, this); //하트는 겹치면 점수 얻음
        //this.physics.add.overlap(sprite, object[0], checkObject, null, this); //sprite랑 겹칠 때 left, down 키보드 누르기(고양이, 쓰레기)
        this.physics.add.overlap(this.sprite, temp[0], this.checkOther, null, this); //sprite랑 겹치면 실패(바나나, 돌) 점프해서 피해야 함


        this.plus1.visible=false;
        this.plus5.visible=false;
        this.minus5.visible=false;
        
    }

    popUp(){
        //result 팝업창
        //this.popup=this.add.group();
        this.add.image(35, 256, 'limitbg');
        this.add.image(740, 256, 'limitbg');
        this.result = this.add.image(384, 256, 'result');
        this.happiness = this.add.image(320, 300, 'happiness');
        this.happiness.setScale(1/8,1/8);
        this.okButton = this.add.image(384, 256, 'okButton');
        this.okButton.setInteractive();
        this.okButton.on('pointerdown', this.goToMain);
        //this.okButton = game.add.button(384, 256, 'okButton', actionOnClick, this, 2, 1, 0);
        this.okText = this.add.image(620, 395, 'okText');
        this.scoreResultText = this.add.image(200, 230, 'scoreResultText');
        this.totalScoreText = this.add.image(384, 110, 'totalScoreText');
        this.totalText = this.add.image(200, 300, 'totalText');
        


        var scoreText2=this.add.text(300, 220, ': 0', { fontSize: '25px', fill: '#000' });
        scoreText2.setText(this.score);
        var totalText2=this.add.text(400, 290, ': 0', { fontSize: '25px', fill: '#000' });
        if(this.score<0){
            totalText2.setText(0);
        }
        else if(this.score<=30){
            totalText2.setText(1);
            happiness+=1;
        }
        else if(this.score<=80){
            totalText2.setText(2);
            happiness+=2;
        }
        else if(this.score>80){
            totalText2.setText(3);
            happiness+=3;
        }
    }

    goToMain(){
        console.log('pointerdown');
        this.scene.switch('Main');
    }
        //min=1, max=4
    randomNumber(min, max) {
        var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return randVal;
    }
    //min=450, max=900
    randomNum(min, max) {
        var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return randVal;
    }

    //확률이 높으면 0 리턴, 나머지는 random 함수로부터 숫자 하나 불러짐(1~4)
    randomObject() {
        //randomList=["heart", "banana", "cat", "rock", "trash"]
        if (Math.random() < 0.7) {
            //random=randomList[0];
            this.random = 0;
        }
        else {
            var num = this.randomNumber(1, 4);
            //random=randomList[num];
            this.random = num;
        }
        return this.random;
    }

    //마지막 위치에 새로운 오브젝트 생성->loop를 통해 반복
    spawnObject(time, delta) {
        if (!this.gameOver) {
            var temp = this.randomObject(); //0~4사이 숫자
            if (temp == 0) {
                //nameObjects.push("heart");
                var object = this.physics.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.hearts.add(object);
            }
            else if (temp == 1) {
                //nameObjects.push("banana");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.others.add(object);
            }
            else if (temp == 2) {
                this.nameObjects.push("cat");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.objects.add(object);
            }

            else if (temp == 3) {
                //nameObjects.push("rock");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.others.add(object);
            }

            else if (temp == 4) {
                this.nameObjects.push("trash");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.objects.add(object);
            }

        }
    }
    //고양이, 쓰레기일 때 제대로 키보드 눌렀는 지 확인
    checkObject() {
        var object = this.objects.getChildren();
        if (object.length > 0) {
            if (object[0].x < 120 && object[0].x > 60) {
                var temp = this.nameObjects[0];
                if (temp == 'cat') {
                    if (this.cursors.left.isDown) {
                        this.score += 5;
                        this.scoreText.setText(':' + this.score);
                        object[0].destroy();
                        this.nameObjects.shift();
                    }
                }
                else if (temp == 'trash') {
                    if (this.cursors.down.isDown) {
                        this.score += 5;
                        this.scoreText.setText(':' + this.score);
                        object[0].destroy();
                        this.nameObjects.shift();
                    }
                }
            }
        }
    }

    delayObjectText() {
        this.objectText.visible = false;
    }

    //바나나, 돌일 때는 점프해서 피해야 하는데 실패했을 경우
    checkOther(time, delta) {
        var temp = this.others.getChildren();
        temp[0].destroy();
        this.score -= 5;
        this.scoreText.setText(':' + this.score);
        //this.minus5.visible = true;
        /*
        this.time.addEvent({
            delay: 700,
            callback: this.delayOtherText,
            loop: false
        })
        */

    }

    //하트랑 sprite랑 겹치면 점수 얻게하는 함수
    collectHeart() {
        var heartChildren = this.hearts.getChildren();
        heartChildren[0].destroy();
        this.score += 1;
        this.scoreText.setText(':' + this.score);
        this.plus1.visible = true;
        /* this.time.addEvent({
            delay: 700,
            callback: this.delayHeartText,
            loop: false
        });
        */
        //this.plus1.visible = false;

    }

    delayHeartText() {
        this.plus1.visible = false;
    }

    //타임바
    timeBar() {
        this.timebar.clear();
        //D27FFF
        this.timebar.fillStyle(0xA807FF);
        var timeSource;
        if (!this.gameOver) {
            this.timebar.fillRect(400, 20, 200 - 200 * this.timerEvent.getProgress(), 20);
            timeSource = 200 - 200 * this.timerEvent.getProgress();
        }
        else {
            this.timebar.fillRect(400, 20, timeSource, 20);
        }
        if ((1 - this.timerEvent.getProgress()) == 0) {
            this.gameOver = true;
        }

    }
    //모든 오브젝트 움직이는 함수
    moveObject(time, delta) {
        var heartChildren = this.hearts.getChildren();
        var object = this.objects.getChildren();
        var temp = this.others.getChildren();
        for (var i = 0; i < heartChildren.length; i++) {
            heartChildren[i].x += -this.speed2 * delta;
        }
        for (var j = 0; j < object.length; j++) {
            object[j].x += -this.speed2 * delta;
        }
        for (var k = 0; k < temp.length; k++) {
            temp[k].x += -this.speed2 * delta;
        }
    }

    //오브젝트 적당한 처리 실패했을 때 오브젝트 없애기
    destroyFailObject() {
        var object = this.objects.getChildren();
        var heartChildren = this.hearts.getChildren();
        var temp = this.others.getChildren();
        if (object.length > 0) {
            if (object[0].x < 60) {
                object[0].destroy();
                this.nameObjects.shift();
                this.score -= 5;
                this.scoreText.setText(':' + this.score);
            }
        }
        if (heartChildren.length > 0) {
            for (var i = 0; i < heartChildren.length; i++) {
                if (heartChildren[i].x < 20) {
                    heartChildren[i].destroy();
                }
            }
        }

        if (temp.length > 0) {
            for (var j = 0; j < temp.length; j++) {
                if (temp[j].x < 20) {
                    temp[j].destroy();
                }
            }
        }
    }

    //배경 움직이는 것
    moveBackground(time, delta) {
        this.cloud1.x += -this.speed * delta;
        this.cloud2.x += -this.speed * delta;
        this.cloud3.x += -this.speed * delta;
        this.cloud4.x += -this.speed * delta;
        this.tree1.x += -this.speed * delta;
        this.tree2.x += -this.speed * delta;
        this.tree3.x += -this.speed * delta;
        this.tree4.x += -this.speed * delta;
        this.grass1.x += -this.speed * delta;
        this.grass2.x += -this.speed * delta;
        this.grass3.x += -this.speed * delta;
        this.grass4.x += -this.speed * delta;
        this.bench.x += -this.speed * delta;
        if (this.cloud1.x < 0) {
            this.cloud1.x = 800;
        }
        if (this.cloud2.x < 0) {
            this.cloud2.x = 800;
        }
        if (this.cloud3.x < 0) {
            this.cloud3.x = 800;
        }
        if (this.cloud4.x < 0) {
            this.cloud4.x = 800;
        }
        if (this.tree1.x < 0) {
            this.tree1.x = 800;
        }
        if (this.tree2.x < 0) {
            this.tree2.x = 800;
        }
        if (this.tree3.x < 0) {
            this.tree3.x = 800;
        }
        if (this.tree4.x < 0) {
            this.tree4.x = 800;
        }
        if (this.grass1.x < 0) {
            this.grass1.x = 800;
        }
        if (this.grass2.x < 0) {
            this.grass2.x = 800;
        }
        if (this.grass3.x < 0) {
            this.grass3.x = 800;
        }
        if (this.grass4.x < 0) {
            this.grass4.x = 800;
        }
        if (this.bench.x < 0) {
            this.bench.x = 800;
        }

    }

};



var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [Main,Running,Pizza]
};

var game = new Phaser.Game(config);
