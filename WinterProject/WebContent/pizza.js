class Pizza extends Phaser.Scene {

    constructor() {

        super({ key: 'Pizza', active: false, auto_start: false });

        /* 이미지 위치, 크기 상수 */
        this.boxX = 720;
        this.boxY = 445;
        this.timerSize = 265;

        /* 피자박스 방향키 패턴 */
        this.arrow = ['none','up','down','left','right','space'];
        this.dominoSequence = [1, 5, 3, 2, 4, 5, 3, 2, 1, 5, 3]; 
        this.mrSequence = [1, 4, 2, 4, 5, 1, 3, 4, 5, 2, 5]; 
        this.hutSequence = [1, 3, 2, 5, 1, 3, 4, 2, 4, 3, 5]; 
        this.schoolSequence = [3, 2, 4, 5, 3, 4, 1, 3, 4, 2, 1]; 

        /* 게임 플레이 변수 */
        this.currPizza;
        this.nextPizza;    
        this.curr_idx;      // 현재 방향키 패턴의 인덱스
        this.set_idx;       // 방향키 패턴 생성 인덱스
        this.setDelay;      // 패턴 생성 딜레이
        this.wrongDelay;    // 틀렸을 시 패널티 딜레이
        this.lifeCount = 3;
        this.boxCount = 0;  // 접은 박스 개수
        this.timer;
        this.timeBar;        
        
        /* 게임 플레이 플래그 */
        this.gameOver = false;
        this.timerRunning = false;      // 타이머 활성화 여부
        this.inputActivated = false;    // 방향키 입력 활성화 여부

        /* 이미지, 텍스트 오브젝트 */
        this.player;
        this.box;
        this.domino;        // 피자판
        this.mr;
        this.hut;
        this.school;
        this.dominoGroup;   // 방향키 패턴
        this.mrGroup;
        this.hutGroup;
        this.schoolGroup;
        this.lifeGroup;
        this.daedGroup;
        this.endPopop;
        this.OKbutton;
        this.boxText;
        this.pizzaText;
        this.moneyText;
        this.joyText;
    }

    preload() { // 이미지 로드
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)

        this.load.image('Domino', 'assets/pizza/도미노.png');
        this.load.image('Mr', 'assets/pizza/미스터피자.png');
        this.load.image('Hut', 'assets/pizza/피자핫.png');
        this.load.image('School', 'assets/pizza/피자스쿨.png');
        this.load.image('up', 'assets/pizza/up.png');
        this.load.image('down', 'assets/pizza/down.png');
        this.load.image('left', 'assets/pizza/left.png');
        this.load.image('right', 'assets/pizza/right.png');
        this.load.image('space', 'assets/pizza/space1.png');
        this.load.image('back1', 'assets/pizza/back1.png');
        this.load.image('back2', 'assets/pizza/back2_1.png');
        this.load.image('scoretext', 'assets/pizza/scoretext.png');
        this.load.image('box', 'assets/pizza/box.png');
        this.load.image('player','assets/pizza/pizza_player.png')
        this.load.image('life_pink','assets/pizza/분홍하트.png');
        this.load.image('life_gray','assets/pizza/회색하트.png');
        this.load.image('게임끝팝업','assets/pizza/피자게임끝.png');
        this.load.image('ok','assets/공통팝업창/확인버튼.png');
        this.load.image('가운데타일','assets/pizza/eeee.png');
        this.load.bitmapFont('myfont', 'assets/main/font/font.png', 'assets/main/font/font.fnt');
    }

    // 변수 초기화
    init(){
        this.gameOver = false;
        this.timerRunning = false;
        this.inputActivated = false; 
        this.nextPizza = Phaser.Math.Between(1, 4); 
        this.boxCount = 0;
        this.curr_idx = 0; 
        this.set_idx = 0; 
        this.lifeCount = 3;
    }

     // 피자박스 그룹의 방향키패턴 이미지를 생성, 배치
     childMaking(group, sequence) {
        var temp;
        var x = 275; 
        var y = 175;

        for (var i = 0; i < sequence.length; i++) {
            // 시퀀스 넘버에 따라 상하좌우 화살표 혹은 스페이스바 이미지를 추가
            temp = this.add.image(0,0,this.arrow[sequence[i]]).setScale(0.65,0.65);

            if (i < 3) { // 왼쪽
                temp.setX(x);
                temp.setY(y + i * 55);
            }
            else if (i > 7) { // 아래
                temp.setX(x + 4 * 55);
                temp.setY(y + (10 - i) * 55);
            }
            else { // 오른쪽
                temp.setX(x + (i - 3) * 55);
                temp.setY(y + 3 * 55);
            }
            temp.visible = false;
            group.add(temp);
        }
    }

    // 처음 환경 세팅
    create() {

        // 배경타일
        for(var i =0;i<4;i++){
            if(i%2==0){
                for(var j=0;j<6;j++)
                {
                    if (j%2==0)  this.add.image(j*128,i*128,'back1').setOrigin(0);
                    else this.add.image(j*128,i*128,'back2').setScale(4,4).setOrigin(0);
                }
            }
            else{
                for(var j=0;j<6;j++)
                {
                    if (j%2==0) this.add.image(j*128,i*128,'back2').setScale(4,4).setOrigin(0);
                    else  this.add.image(j*128,i*128,'back1').setOrigin(0);
                }
            }
        }

        // 생명
        this.lifeGroup=this.add.group(); // 남은 생명
        this.deadGroup=this.add.group(); // 잃은 생명
        for (var i = 0; i < this.lifeCount; i++){
            var temp1 = this.add.image(30+i*50,30,'life_gray').setScale(1.2,1.2).setVisible(true);
            var temp2 = this.add.image(30+i*50,30,'life_pink').setScale(1.2,1.2).setVisible(true);
            this.deadGroup.add(temp1);
            this.lifeGroup.add(temp2);
        }
        
        this.add.image(415,256,'가운데타일').setScale(1.3,1.3); // 피자박스를 나타낼 타일
        
        // 타이머 생성
        this.timer = this.time.addEvent({ delay: 5000 });
        this.timeBar = this.add.graphics({ x: 253, y: 115 });

        // 캐릭터 이미지 (게임 플레이에 영향 X)
        this.player = this.add.image(668,400,'player').setScale(0.2,0.2);

        // 피자그룹
        this.domino = this.add.image(384, 240, 'Domino').setScale(0.75, 0.75);
        this.mr = this.add.image(384, 240, 'Mr').setScale(0.55,0.55);
        this.hut = this.add.image(384, 240, 'Hut').setScale(0.75, 0.75);
        this.school = this.add.image(384, 240, 'School').setScale(0.75, 0.75);

        this.domino.visible = false;
        this.mr.visible = false;
        this.hut.visible = false;
        this.school.visible = false;

        this.dominoGroup = this.add.group();
        this.mrGroup = this.add.group();
        this.hutGroup = this.add.group();
        this.schoolGroup = this.add.group();

        // 피자그룹마다 시퀀스에 맞는 방향키 패턴 이미지 생성
        this.childMaking(this.dominoGroup, this.dominoSequence);
        this.childMaking(this.mrGroup, this.mrSequence);
        this.childMaking(this.hutGroup, this.hutSequence);
        this.childMaking(this.schoolGroup, this.schoolSequence);

        // 피자박스 몇개나 접었는지 
        this.box = this.add.image(640, 40,'box').setScale(0.7, 0.7);
        this.boxText = this.add.bitmapText(705, 32, 'myfont','X 0', 20);

        // 방향키 입력에 정답 체크 함수 매핑
        this.input.keyboard.on('keyup_UP', (event) => { this.orderCheck(1); });
        this.input.keyboard.on('keyup_DOWN', (event) => { this.orderCheck(2); });
        this.input.keyboard.on('keyup_LEFT', (event) => { this.orderCheck(3); });
        this.input.keyboard.on('keyup_RIGHT', (event) => { this.orderCheck(4); });
        this.input.keyboard.on('keyup_SPACE', (event) => { this.orderCheck(5); });

        // 결과창
        this.endPopup=this.add.image(384, 256,'게임끝팝업').setScale(0.6);
        this.endPopup.visible=false;
        this.OKbutton=this.add.image(600, 375,'ok').setInteractive();
        this.OKbutton.visible=false;

        // ok버튼 누르면 메인으로 이동
        this.OKbutton.on('pointerdown', (event) => 
        {
            this.endPopup.visible=false;
            this.OKbutton.visible=false;
            music.stop();

            date -= 1;
            joy -= 2;
            money += this.boxCount*1000;

            this.scene.restart('pizza');
            this.scene.wake('Main'); // 이거 없으면 이전 입력을 계속 갖고있음
            this.scene.switch('Main');
        });   

        this.init(); // 변수 초기화
        this.newPizza(); // 피자박스 세팅
    }

    update() 
    {
        if (this.timerRunning && !this.gameOver) 
        {            
            // 매 틱마다 시간초 바를 다시 그림
            this.timeBar.clear();
            this.timeBar.fillStyle(0xCEF279);
            this.timeBar.fillRect(0, 0, this.timerSize * (1 - this.timer.getProgress()), 30);

            // 제한시간이 다 되면 생명 차감 후 다음 패턴으로 넘어감
            if (this.timer.getProgress() == 1) {
                this.inputActivated = false;
                this.boxIncomplete();
            }
        }
    }
    
    // 새로운 피자박스 패턴 불러오기
    newPizza()
    {
        this.curr_idx = 0;
        this.timerRunning = false;
        this.currPizza = this.nextPizza;
        this.nextPizza = Phaser.Math.Between(1, 4);

        // 시간바 초기화
        this.timeBar.clear();
        this.timeBar.fillStyle(0xCEF279);
        this.timeBar.fillRect(0, 0, this.timerSize, 30); 

        // 접은 박스 개수가 많아지면 시간초 짧게 함
        if (this.boxCount<30) this.setDelay = this.time.addEvent({ delay: 100-this.boxCount*2, callback: this.setPizza, callbackScope: this, repeat: 10 });
        else this.setDelay = this.time.addEvent({ delay: 40, callback: this.setPizza, callbackScope: this, repeat: 10 });

    }
    
    // 현재 피자 인덱스에 맞는 피자박스 패턴 세팅
    setPizza() 
    {
        switch (this.currPizza) {
            case 1: this.setting(this.domino, this.dominoGroup); break;
            case 2: this.setting(this.mr, this.mrGroup); break;
            case 3: this.setting(this.hut, this.hutGroup); break;
            case 4: this.setting(this.school, this.schoolGroup); break;
        }
    }  

    // 피자박스 배치
    setting(pizza, group) 
    {
        var children = group.getChildren();
        children[this.set_idx].clearTint();
        children[this.set_idx].visible = true;
        
        pizza.visible = true;
        this.set_idx++;

        if (this.set_idx == 11)
        {
            this.set_idx = 0;
            this.startTimer(); 
        }
    }
    
    // 새로운 패턴의 제한시간 활성화
    startTimer()
    {
        this.inputActivated = true;
        this.timerRunning = true;
        if (this.boxCount<30)  this.timer = this.time.addEvent({ delay: 7000-this.boxCount*150 });
        else this.timer = this.time.addEvent({ delay: 2000 });
    }

    // 피자박스 정리
    resetting(pizza, group) 
    {
        pizza.visible = false;
        group.children.iterate((child) => { child.visible = false; });
    }

    // 키보드 입력이 들어오면 현재 피자박스 종류에 따라 분류 
    orderCheck(order) 
    {
        if (!this.gameOver && this.inputActivated) {
            switch (this.currPizza) {
                case 1: this.isOrderRight(this.domino, this.dominoGroup, this.dominoSequence, order); break;
                case 2: this.isOrderRight(this.mr, this.mrGroup, this.mrSequence, order); break;
                case 3: this.isOrderRight(this.hut, this.hutGroup, this.hutSequence, order); break;
                case 4: this.isOrderRight(this.school, this.schoolGroup, this.schoolSequence, order); break;
            }
        }
    }

    // 들어온 키보드 입력이 현재 패턴과 맞는 순서인지 확인
    isOrderRight(pizza, group, sequence, order) 
    {
        var children = group.getChildren();
        if (sequence[this.curr_idx] == order) // 패턴을 맞췄다면
        {
            children[this.curr_idx].visible = false;
            if (this.curr_idx == sequence.length - 1) { // 마지막 순서였다면
                pizza.visible = false;
                this.boxComplete();
            }
            else this.curr_idx++;
        }
        else { // 패턴을 틀렸다면
            children[this.curr_idx].tint = 0xa6a6a6;
            this.inputActivated = false;
            this.wrongDelay = this.time.addEvent({ delay: 500, callback: this.boxIncomplete, callbackScope: this });;
        }
    }    

    // 박스 접기 성공 - 카운트 플러스, 플레이어의 손 옆에 박스 얹기
    boxComplete()
    {        
        this.boxCount += 1;
        var BOX = this.add.image(this.boxX, this.boxY - 10 * this.boxCount, 'box').setScale(0.7, 0.7);
        BOX.visible = true; 
        this.boxText.setText('X ' + this.boxCount);
        this.newPizza();
    }

    // 박스 접기 실패 - 패턴을 틀렸거나 시간제한을 넘겼다면 생명 차감 및 재배치
    boxIncomplete() 
    {
        this.timerRunning = false;
        this.lifeDown();
        switch(this.currPizza){
            case 1: this.resetting(this.domino, this.dominoGroup); break;
            case 2: this.resetting(this.mr, this.mrGroup); break;
            case 3: this.resetting(this.hut, this.hutGroup); break;
            case 4: this.resetting(this.school, this.schoolGroup); break;
        }
        this.newPizza();
    }

    lifeDown()
    {
        var childrun = this.lifeGroup.getChildren();
        childrun[3 - this.lifeCount].visible = false;
        this.lifeCount -= 1;

        if (this.lifeCount == 0) this.endPizza();
    }

    //게임 오버
    endPizza()
    {
        this.gameOver=true;
        this.input.keyboard.shutdown();

        // 팝업창
        this.endPopup.visible=true;
        this.OKbutton.visible=true;
        this.pizzaText=this.add.bitmapText(410, 220, 'myfont',this.boxCount+' 판',35 );
        this.moneyText=this.add.bitmapText(250, 340, 'myfont',this.boxCount*1000,35 );
        this.joyText=this.add.bitmapText(410, 340, 'myfont','-2',35 );
    }
}
