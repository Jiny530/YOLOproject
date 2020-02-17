var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);


var gameOver = false;
var pizza;
var nextPizza = Phaser.Math.Between(1, 4);
var Next;
var score = 0;
var scoreText;
var pizzaflag = 0; //피자 새로 불러올지 말지 결정
var arrowflag; //방향키 입력 받을지 안받을지 결정
var boxflag=1; //피자박스 누적
var domino;
var mr;
var hut;
var school;
var dominoSequence = [1,5,3,2,4,5,3,2,1,5,4,3]; //11
var mrSequence = [1, 4, 2, 4, 5, 1, 3, 4, 5, 2,3]; //10
var hutSequence = [1, 3, 2, 5, 1, 3, 4, 2, 4, 3,2]; //11
var schoolSequence = [3, 2, 4, 5, 3, 4, 1, 3, 4, 2,1]; //10
var dominoGroup;
var mrGroup;
var hetGroup;
var schoolGroup;
var boxGroup;
var boxNum=0;
var timerEvent;
var graphics;
var arrowdelay;
var arrowflag_flag=1;
var arrowright;
var si=0; //화살표 패턴 점수 인덱스
var ai=0; //화살표 생성시 활성화된 화살표 인덱스
var bacc1;
var back2;
var BOX;
var boxX=693;
var boxY=432;
var boxtext;
var isWrong; //틀렸을때 딜레이
var wrongDelay;
var wrongflag=0; //틀렸을때 잠시 지연

function preload() {
    this.load.image('Domino', 'assets/pizza/Domino.png');
    this.load.image('Mr', 'assets/pizza/Mr.Pizza.png');
    this.load.image('Hut', 'assets/pizza/Hut.png');
    this.load.image('School', 'assets/pizza/School.png');
    
    this.load.image('up', 'assets/pizza/up.png');
    this.load.image('down', 'assets/pizza/down.png');
    this.load.image('left', 'assets/pizza/left.png');
    this.load.image('right', 'assets/pizza/right.png');
    this.load.image('space', 'assets/pizza/space1.png');
    this.load.image('back1', 'assets/pizza/back1.png');
    this.load.image('back2', 'assets/pizza/back2.png');
    this.load.image('back3', 'assets/pizza/back3.png');
    this.load.image('scoretext', 'assets/pizza/scoretext.png');
    this.load.image('box','assets/pizza/box.png');
    //this.load.image('timeBar','assets/pizza/timeBar.png')
}
//키보드 버튼 하나 누르는 거에 반응하는 곳
function create() {
    /* 배경 - 수정할 것 
    for (var k=0;k<4;k++){
        for(var j=0;j<6;j++){
            
            if (k%2==1 && j%2==1){
                this.add.image(64+128*j,64+128*k,'back1');
            }
            else if (k%2==1 && j%2==0){
                this.add.image(64+128*j,64+128*k,'back2');
            }
            else if (k%2==0 && j%2==1){
                this.add.image(64+128*j,64+128*k,'back2');
            }
            else if (k%2==0 && j%2==0){
                this.add.image(64+128*j,64+128*k,'back1');
            }
            
            if (1<=k && k<=2 && 1<=j&& j<=4){
                this.add.image(64+128*j,64+128*k,'back3');
            }
            
        }
    }
    */
    domino = this.add.image(384, 240, 'Domino').setScale(0.8,0.8);
    mr = this.add.image(384, 240, 'Mr').setScale(0.8,0.8);
    hut = this.add.image(384, 240, 'Hut').setScale(0.8,0.8);
    school = this.add.image(384, 240, 'School').setScale(0.8,0.8);

    domino.visible = false;
    mr.visible = false;
    hut.visible = false;
    school.visible = false;

    dominoGroup = this.add.group();
    mrGroup = this.add.group();
    hutGroup = this.add.group();
    schoolGroup = this.add.group();
    boxGroup = this.add.group();

    childMaking(1,dominoGroup, dominoSequence,this);
    childMaking(2,mrGroup, mrSequence,this);
    childMaking(3,hutGroup, hutSequence,this);
    childMaking(4,schoolGroup, schoolSequence,this);

    //this.add.image(580,50,'scoretext').setScale(0.25,0.25);
    //scoreText = this.add.text(630, 35, ' 0', { fontSize: '32px', fscoreTextill: '#000' });

    BOX = this.add.image(668,472,'box').setScale(0.6,0.6);
    boxtext = this.add.text(705,464, 'X 0', { fontSize: '20px', fscoreTextill: '#000' });


    this.input.keyboard.on('keyup_UP', function (event) {
        if ((!gameOver) && (arrowflag==0))
        {
            if (pizza == 1) {
                up_right(domino, dominoGroup, dominoSequence, this);
            }
            else if (pizza == 2) {
                up_right(mr, mrGroup, mrSequence, this);
            }
            else if (pizza == 3) {
                up_right(hut, hutGroup, hutSequence, this);
            }
            else if (pizza == 4) {
                up_right(school, schoolGroup, schoolSequence, this);
            }
        }
    });
    this.input.keyboard.on('keyup_DOWN', function (event) {
        if(!gameOver && arrowflag==0)
        {
            if (pizza == 1) {
                down_right(domino, dominoGroup, dominoSequence, this);
            }
            else if (pizza == 2) {
                down_right(mr, mrGroup, mrSequence, this);
            }
            else if (pizza == 3) {
                down_right(hut, hutGroup, hutSequence, this);
            }
            else if (pizza == 4) {
                down_right(school, schoolGroup, schoolSequence, this);
            }
        }
    });
    this.input.keyboard.on('keyup_LEFT', function (event) {
        if (!gameOver && arrowflag==0)
        {
            if (pizza == 1) {
                left_right(domino, dominoGroup, dominoSequence, this);
            }
            else if (pizza == 2) {
                left_right(mr, mrGroup, mrSequence, this);
            }
            else if (pizza == 3) {
                left_right(hut, hutGroup, hutSequence, this);
            }
            else if (pizza == 4) {
                left_right(school, schoolGroup, schoolSequence, this);
            }
        }
    });
    this.input.keyboard.on('keyup_RIGHT', function (event) {
        if(!gameOver && arrowflag==0)
        {
            if (pizza == 1) {
                right_right(domino, dominoGroup, dominoSequence, this);
            }
            else if (pizza == 2) {
                right_right(mr, mrGroup, mrSequence, this);
            }
            else if (pizza == 3) {
                right_right(hut, hutGroup, hutSequence, this);
            }
            else if (pizza == 4) {
                right_right(school, schoolGroup, schoolSequence, this);
            }
        }
    });
    this.input.keyboard.on('keyup_SPACE', function (event) {
        if(!gameOver && arrowflag==0)
        {
            if (pizza == 1) {
                space_right(domino, dominoGroup, dominoSequence, this);
            }
            else if (pizza == 2) {
                space_right(mr, mrGroup, mrSequence, this);
            }
            else if (pizza == 3) {
                space_right(hut, hutGroup, hutSequence, this);
            }
            else if (pizza == 4) {
                space_right(school, schoolGroup, schoolSequence, this);
            }
        }
    });

    

    //타이머
    timerEvent = this.time.addEvent({ delay: 30000 });
    graphics = this.add.graphics({ x: 0, y: 512 });
    
    graphics.angle=-90;
}

var timeSourse;

//키보드 꾹 누르고 있는게 계속 반영되는 곳
function update() {
    
    if (arrowflag_flag==0){
        arrowflag_flag=1;
        arrowright = this.time.addEvent({delay: 150, callback: onEvent1, callbackScope: this});
    }

    if (pizzaflag == 0 ) { //새로운 피자박스 및 방향키 패턴 불러오기
        
        arrowflag=1;
        if (isWrong == true){
            isWrong=false;
            wrongDelay = this.time.addEvent({delay: 500, callback: wrongEvent, callbackScope: this});
        }
        if (boxflag ==0){
            boxflag=1;
            var BOX = this.add.image(boxX,boxY-10*boxNum,'box').setScale(0.7,0.7);
            BOX.visible=true;
            boxtext.setText('X '+boxNum);
        }
        if (wrongflag==0){
            pizzaflag=1;
            pizza = nextPizza;
            nextPizza = Phaser.Math.Between(1, 4);
            switch(nextPizza){
                case 1: Next = this.add.image(708,60,'Domino').setScale(0.5,0.5); break;
                case 2: Next = this.add.image(708,60,'Mr').setScale(0.5,0.5); break;
                case 3: Next = this.add.image(708,60,'Hut').setScale(0.5,0.5); break;
                case 4: Next = this.add.image(708,60,'School').setScale(0.5,0.5); break;
            }
            arrowdelay = this.time.addEvent({delay: 100, callback: onEvent, callbackScope: this, repeat: 10});
            
        }
    }
        
    //타이머
    graphics.clear();
    graphics.fillStyle(0xffcc00);
    if (!gameOver){
        graphics.fillRect(0, 0, 512-512 * timerEvent.getProgress(), 30);
        timeSource=450-450 * timerEvent.getProgress();
    }
    else {
        graphics.fillRect(0, 0, timeSource, 30);
    }
    if ((1-timerEvent.getProgress())==0 || score<0 )
    {
        gameOver = true;
    }


    if (gameOver)
    {
        return;
    }
}




function onEvent(){

    switch(pizza){
        case 1: setting(domino,dominoGroup); break;
        case 2: setting(mr,mrGroup);  break;
        case 3: setting(hut,hutGroup);  break;
        case 4: setting(school,schoolGroup); break;
    }

}
function onEvent1(){
    arrowflag=0;
}
function wrongEvent(){
    if (pizza==1){
        resetting(domino,dominoGroup);
    }
    else if (pizza==2){
        resetting(mr,mrGroup);   
    }
    else if (pizza==3){
        resetting(hut,hutGroup);   
    }
    else if (pizza==4){
        resetting(school,schoolGroup); 
    }
    wrongflag=0;
}

function setting(pizza, group) {
    pizza.visible = true;
    var flag=0;
    group.children.iterate(function (child) {
        if (child.visible == false && flag==0 )
        {
            child.clearTint();
            child.visible = true;
            flag=1;
            ai+=1;
        }
        if (ai==10) //화살표 모두 활성화 시켰으면 인덱스 원상복귀
        {            
            arrowflag_flag=0;
            ai=0;
        }
    });


}
function resetting(pizza, group) {
    pizza.visible = false;
    group.children.iterate(function (child) {
        child.visible = false;
    });
}



function up_right(pizza, group, sequence, a) {
    var now = 0;
    var flag = 0;
    group.children.iterate(function (child) {

        //현재 자식과 같은지
        if (flag == 0 && now == si) {
            if (sequence[now] == 1) //위쪽화살표이면
            {
                child.visible = false;
                si++;
                score += 10;
                flag = 1;
                if (now == 10) {
                    score += 100;
                    si = 0;
                    boxNum+=1;
                    boxflag=0;
                    pizzaflag = 0;
                    pizza.visible = false;
                }
                //scoreText.setText(' '+score);
            }
            else {
                child.tint = 0xa6a6a6;
                wrongflag=1;
                isWrong=true;
                //resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                //scoreText.setText(' '+score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}
function down_right(pizza, group, sequence, a) {
    var now = 0;
    var flag = 0;
    group.children.iterate(function (child) {

        //현재 자식과 같은지
        if (flag == 0 && now == si) {
            if (sequence[now] == 2) //위쪽화살표이면
            {
                child.visible = false;
                si++;
                score += 10;
                flag = 1;
                if (now == 10) {
                    score += 100;
                    si = 0;
                    boxNum+=1;
                    boxflag=0;
                    pizzaflag = 0;
                    pizza.visible = false;
                }
                //scoreText.setText(' '+score);
            }
            else {
                child.tint = 0xa6a6a6;
                wrongflag=1;
                isWrong=true;
                //resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                //scoreText.setText(' '+score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}
function left_right(pizza, group, sequence, a) {
    var now = 0;
    var flag = 0;
    group.children.iterate(function (child) {

        //현재 자식과 같은지
        if (flag == 0 && now == si) {
            if (sequence[now] == 3) //위쪽화살표이면
            {
                child.visible = false;
                si++;
                score += 10;
                flag = 1;
                if (now == 10) {
                    score += 100;
                    si = 0;
                    boxNum+=1;
                    boxflag=0;
                    pizzaflag = 0;
                    pizza.visible = false;
                }
                //scoreText.setText(' '+score);
            }
            else {
                child.tint = 0xa6a6a6;
                wrongflag=1;
                isWrong=true;
                //resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                //scoreText.setText(' '+score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });
}
function right_right(pizza, group, sequence, a) {
    var now = 0;
    var flag = 0;
    group.children.iterate(function (child) {

        //현재 자식과 같은지
        if (flag == 0 && now == si) {
            if (sequence[now] == 4) //위쪽화살표이면
            {
                child.visible = false;
                si++;
                score += 10;
                flag = 1;
                if (now == 10) {
                    score += 100;
                    si = 0;
                    boxNum+=1;
                    pizzaflag = 0;
                    boxflag=0;
                    pizza.visible = false;
                }
                //scoreText.setText(' '+score);
            }
            else {
                child.tint = 0xa6a6a6;
                wrongflag=1;
                isWrong=true;
                //resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                //scoreText.setText(' '+score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}

function space_right(pizza, group, sequence, a) {
    var now = 0;
    var flag = 0;
    group.children.iterate(function (child) {

        //현재 자식과 같은지
        if (flag == 0 && now == si) {
            if (sequence[now] == 5) //위쪽화살표이면
            {
                child.visible = false;
                si++;
                score += 10;
                flag = 1;
                if (now == 10) {
                    score += 100;
                    si = 0;
                    boxNum+=1;
                    pizzaflag = 0;
                    boxflag=0;
                    pizza.visible = false;
                }
                //scoreText.setText(' '+score);
            }
            else {
                child.tint = 0xa6a6a6;
                wrongflag=1;
                isWrong=true;
                //resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                //scoreText.setText(' '+score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}



var x;
var y;
function childMaking(pizza,group, sequence, a) {
    var temp;
    for (var i=0;i<sequence.length;i++){

        if (sequence[i]==1){
            temp = a.add.image(0,0,'up').setScale(0.7,0.7);
        }
        else if (sequence[i] == 2) //아래
        {
            temp = a.add.image(0,0,'down').setScale(0.7,0.7);
        }
        else if (sequence[i] == 3) //아래
        {
            temp = a.add.image(0,0,'left').setScale(0.7,0.7);
        }
        else if (sequence[i] == 4) //아래
        {
            temp = a.add.image(0,0,'right').setScale(0.7,0.7);
        }
        else if (sequence[i] == 5) //아래
        {
            temp = a.add.image(0,0,'space').setScale(0.7,0.7);
        }

        
        if (pizza==1){
            x=264;
            y=175;
            if (i<3){
                temp.setX(x);
                temp.setY(y+i*60);
            }
            else if (i>7){
                temp.setX(x+4*60);
                temp.setY(y+(10-i)*60);
            }
            else {
                temp.setX(x+(i-3)*60);
                temp.setY(y+3*60);
            }
        }
        else if (pizza==2){
            x=324;
            y=355;
            if (i<3){
                temp.setX(x+i*60);
                temp.setY(y);
            }
            else if (i>7){
                temp.setX(x+(10-i)*60);
                temp.setY(y-4*60);
            }
            else {
                temp.setX(x+3*60);
                temp.setY(y-(i-3)*60);
            }
        }
        else if (pizza==3){
            x=504;
            y=295;
            if (i<3){
                temp.setX(x);
                temp.setY(y-i*60);
            }
            else if (i>7){
                temp.setX(x-4*60);
                temp.setY(y-(10-i)*60);
            }
            else {
                temp.setX(x-(i-3)*60);
                temp.setY(y-3*60);
            }
        }
        else if (pizza==4){
            x=444;
            y=115;
            if (i<3){
                temp.setX(x-i*60);
                temp.setY(y);
            }
            else if (i>7){
                temp.setX(x-(10-i)*60);
                temp.setY(y+4*60);
            }
            else {
                temp.setX(x-3*60);
                temp.setY(y+(i-3)*60);
            }

        }
        
        temp.visible=false;
        group.add(temp);
    
    }

}