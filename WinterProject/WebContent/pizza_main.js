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
var score = 0;
var scoreText;
var pizzaflag = 0;
var domino;
var mr;
var hut;
var school;
var dominoSequence = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2];
var mrSequence = [1, 1, 1, 1, 2, 2, 2, 2, 3, 4];
var hutSequence = [1, 3, 2, 4, 1, 3, 4, 2, 1, 3];
var schoolSequence = [3, 2, 4, 1, 3, 4, 2, 3, 4, 2];
var dominoGroup;
var mrGroup;
var hetGroup;
var schoolGroup;
var timerEvent;
var graphics;
var arrowdelay;
var si=0; //화살표 패턴 점수 인덱스
var ai=0; //화살표 생성시 활성화된 화살표 인덱스

function preload() {
    this.load.image('Domino', 'assets/pizza/Domino.png');
    this.load.image('Mr', 'assets/pizza/Mr.Pizza.png');
    this.load.image('School', 'assets/pizza/School.png');
    this.load.image('Hut', 'assets/pizza/Hut.png');
    this.load.image('arrow', 'assets/pizza/arrow.png');
    //this.load.image('timeBar','assets/pizza/timeBar.png')
}
//키보드 버튼 하나 누르는 거에 반응하는 곳
function create() {

    //Phaser.Actions.GridAlign(group.getChildren(), { width: 12, cellWidth: 70, cellHeight: 70, x: -20, y: 0 });

    domino = this.add.image(384, 200, 'Domino').setScale(0.7,0.7);
    mr = this.add.image(384, 200, 'Mr').setScale(0.7,0.7);;
    hut = this.add.image(384, 200, 'Hut').setScale(0.7,0.7);
    school = this.add.image(384, 200, 'School').setScale(0.7,0.7);

    domino.visible = false;
    mr.visible = false;
    hut.visible = false;
    school.visible = false;

    dominoGroup = this.add.group({
        key: 'arrow',
        repeat: 9,
        setXY: { x: 150, y: 350, stepX: 50 },
        setScale: { x: 0.5, y: 0.5 }
    });
    mrGroup = this.add.group({
        key: 'arrow',
        repeat: 9,
        setXY: { x: 150, y: 350, stepX: 50 },
        setScale: { x: 0.5, y: 0.5 }
    });
    hutGroup = this.add.group({
        key: 'arrow',
        repeat: 9,
        setXY: { x: 150, y: 350, stepX: 50 },
        setScale: { x: 0.5, y: 0.5 }
    });
    schoolGroup = this.add.group({
        key: 'arrow',
        repeat: 9,
        setXY: { x: 150, y: 350, stepX: 50 },
        setScale: { x: 0.5, y: 0.5 }
    });

    childMaking(dominoGroup, dominoSequence);
    childMaking(mrGroup, mrSequence);
    childMaking(hutGroup, hutSequence);
    childMaking(schoolGroup, schoolSequence);

    
    this.input.keyboard.on('keyup_UP', function (event) {
        if (!gameOver)
        {
            if (pizza == 1) {
                up_right(domino, dominoGroup, dominoSequence);
            }
            else if (pizza == 2) {
                up_right(mr, mrGroup, mrSequence);
            }
            else if (pizza == 3) {
                up_right(hut, hutGroup, hutSequence);
            }
            else if (pizza == 4) {
                up_right(school, schoolGroup, schoolSequence);
            }
        }
    });
    this.input.keyboard.on('keyup_DOWN', function (event) {
        if(!gameOver)
        {
            if (pizza == 1) {
                down_right(domino, dominoGroup, dominoSequence);
            }
            else if (pizza == 2) {
                down_right(mr, mrGroup, mrSequence);
            }
            else if (pizza == 3) {
                down_right(hut, hutGroup, hutSequence);
            }
            else if (pizza == 4) {
                down_right(school, schoolGroup, schoolSequence);
            }
        }
    });
    this.input.keyboard.on('keyup_LEFT', function (event) {
        if (!gameOver)
        {
            if (pizza == 1) {
                left_right(domino, dominoGroup, dominoSequence);
            }
            else if (pizza == 2) {
                left_right(mr, mrGroup, mrSequence);
            }
            else if (pizza == 3) {
                left_right(hut, hutGroup, hutSequence);
            }
            else if (pizza == 4) {
                left_right(school, schoolGroup, schoolSequence);
            }
        }
    });
    this.input.keyboard.on('keyup_RIGHT', function (event) {
        if(!gameOver)
        {
            if (pizza == 1) {
                right_right(domino, dominoGroup, dominoSequence);
            }
            else if (pizza == 2) {
                right_right(mr, mrGroup, mrSequence);
            }
            else if (pizza == 3) {
                right_right(hut, hutGroup, hutSequence);
            }
            else if (pizza == 4) {
                right_right(school, schoolGroup, schoolSequence);
            }
        }
    });

    //타이머
    timerEvent = this.time.addEvent({ delay: 30000 });
    graphics = this.add.graphics({ x: 20, y: 492 });
    
    graphics.angle=-90;
}


//키보드 꾹 누르고 있는게 계속 반영되는 곳
function update() {
    if (gameOver)
    {
        return;
    }

    if (pizzaflag == 0 ) {
        pizzaflag = 1;
        pizza = Phaser.Math.Between(1, 4);
        
        if (pizza == 1) {
            arrowdelay = this.time.addEvent({delay: 100, callback: onEvent, callbackScope: this, repeat: 10});
        }
        else if (pizza == 2) {
            arrowdelay = this.time.addEvent({delay: 100, callback: onEvent, callbackScope: this, repeat: 10});
        }
        else if (pizza == 3) {
            arrowdelay = this.time.addEvent({delay: 100, callback : onEvent, callbackScope: this, repeat: 10});
        }
        else if (pizza == 4) {
            arrowdelay = this.time.addEvent({delay: 100, callback: onEvent, callbackScope: this, repeat: 10});
        }
    }
    
    //타이머
    graphics.clear();
    graphics.fillStyle(90000);
    graphics.fillRect(0, 0, 450-450 * timerEvent.getProgress(), 30);
    
    if ((1-timerEvent.getProgress())==0 || score<0 )
    {
        gameOver = true;
    }
}

function onEvent(){
    if (pizza==1){
        setting(domino,dominoGroup);
    }
    else if (pizza==2){
        setting(domino,dominoGroup);   
    }
    else if (pizza==3){
        setting(domino,dominoGroup);   
    }
    else if (pizza==4){
        setting(domino,dominoGroup);   
    }
}

function setting(pizza, group) {
    pizza.visible = true;
    var arrowflag=0;
    group.children.iterate(function (child) {
        console.log(child.visible);
        if (child.visible == false && arrowflag==0 )
        {
            child.visible = true;
            arrowflag=1;
            ai+=1;
        }
        if (ai==10) //화살표 모두 활성화 시켰으면 인덱스 원상복귀
        {
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



function up_right(pizza, group, sequence) {
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
                if (now == 9) {
                    score += 100;
                    si = 0;
                    pizzaflag = 0;
                    arrowflag = 0;
                    pizza.visible = false;
                }
                console.log(score);
            }
            else {
                //child.tint = 0xff0000;
                resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                arrowflag = 0;
                console.log(score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}
function down_right(pizza, group, sequence) {
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
                if (now == 9) {
                    score += 100;
                    si = 0;
                    pizzaflag = 0;
                    arrowflag = 0;
                    pizza.visible = false;
                }
                console.log(score);
            }
            else {
                //child.tint = 0xff0000;
                resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                arrowflag = 0;
                console.log(score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}
function left_right(pizza, group, sequence) {
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
                if (now == 9) {
                    score += 100;
                    si = 0;
                    pizzaflag = 0;
                    arrowflag = 0;
                    pizza.visible = false;
                }
                console.log(score);
            }
            else {
                //child.tint = 0xff0000;
                resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                arrowflag = 0;
                console.log(score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}
function right_right(pizza, group, sequence) {
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
                if (now == 9) {
                    score += 100;
                    si = 0;
                    pizzaflag = 0;
                    arrowflag = 0;
                    pizza.visible = false;
                }
                console.log(score);
            }
            else {
                //child.tint = 0xff0000;
                resetting(pizza, group);
                si = 0;
                score -= 50;
                pizzaflag = 0;
                arrowflag = 0;
                console.log(score);
            }
        }
        now++; //현재 판단해야하는 자식이 아니면 다음자식으로
    });

}

function childMaking(group, sequence) {
    var i = 0;
    var color = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c];

    group.children.iterate(function (child) {
        //도미노피자 화살표 순서에 따라 자식들 염색
        if (sequence[i] == 1) //위
        {
            child.tint = color[0];
        }
        else if (sequence[i] == 2) //아래
        {
            child.tint = color[1];
            child.angle = 180;
        }
        else if (sequence[i] == 3) //왼쪽
        {
            child.tint = color[2];
            child.angle = 270;
        }
        else if (sequence[i] == 4) //오른쪽
        {
            child.tint = color[3];
            child.angle = 90;
        }
        child.visible = false;
        i++;
    });
}