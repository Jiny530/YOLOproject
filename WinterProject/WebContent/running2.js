var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
        
var move;
var movingspeed=3;

//배경 변수
var cloud1;
var cloud2;
var cloud3;
var cloud4;
var tree1;
var tree2;
var tree3;
var tree4;
var grass1;
var grass2;
var grass3;
var grass4;
var bench;
var platforms;
var limit; //검정색 뒤로 배경 움직이게

var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var randomList=['heart', 'banana', 'cat', 'rock', 'trash'];
var sprite; //뛰는 캐릭터
var objects; //생성된 object 그룹
var random; //생성될 object
var nameObjects= new Array();
        

var hearts;

var game = new Phaser.Game(config);
        //game.world.bounds.setTo(384, 256, 640, 360);

function preload ()
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
    this.load.image('bench', 'assets/running/bench2.png');
    this.load.image('timebar', 'assets/running/timebar2.png');

    this.load.spritesheet('character', 'assets/running/character.png', { frameWidth: 64, frameHeight: 64 });

    this.load.image('heart', 'assets/running/heart.png');
    this.load.image('banana', 'assets/running/banana.png');
    this.load.image('cat', 'assets/running/cat.png');
    this.load.image('rock', 'assets/running/rock.png');
    this.load.image('trash', 'assets/running/trash.png');
    
 }
        
function create ()
{
    platforms = this.physics.add.staticGroup(); //캐릭터가 뛰는 바닥 static
       
    this.add.image(384,256,'background'); //검정 바탕
    this.add.image(384,256,'bg'); //하늘색 바탕
    platforms.create(384, 426, 'ground2'); //캐릭터가 뛰는 바닥
    speed = Phaser.Math.GetSpeed(600, movingspeed); //움직이는 배경 스피드
    speed2 = Phaser.Math.GetSpeed(400, movingspeed);
    //  The score
    scoreText = this.add.text(678, 20, ': 0', { fontSize: '25px', fill: '#fff' });
    this.add.image(663,30,'heart'); //획득한 하트
    timebar=this.add.image(485,30,'timebar'); //타임바

    /* 뒤에서 움직이는 애들 */
    cloud1=this.add.image(200,160,'cloud');
    cloud2=this.add.image(360,200,'cloud');
    cloud3=this.add.image(580,180,'cloud');
    cloud4=this.add.image(790,210,'cloud');
    tree1=this.add.image(250,312,'tree');
    tree2=this.add.image(500,312,'tree2');
    tree3=this.add.image(750,312,'tree3');
    tree4=this.add.image(900,312,'tree4');
    grass1=this.add.image(150,363,'grass');
    grass2=this.add.image(230,363,'grass');
    grass3=this.add.image(680,363,'grass');
    grass4=this.add.image(800,363,'grass');
    bench=this.add.image(370,345,'bench');


    //this.add.image(200,300,'cat');

    //player = this.physics.add.sprite(100, 300, 'dude');

    /* 움직이는 애들 검정색 뒤로 사라지게 검정색 하나 더 놔둠*/
    limit=this.physics.add.staticGroup();
    limit.create(35, 256, 'limitbg');
    limit.create(740, 256, 'limitbg');

   /*캐릭터가 계속 움직이게 하는 */
    var characterAnimation = this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('character'),
        frameRate: 30,
        repeat: -1
    });
    sprite=this.physics.add.sprite(120,345,'character');
    sprite.play('walk');
    
    /*타임바 */
    timerEvent = this.time.addEvent({ delay: 30000 });
    timebar2 = this.add.graphics({ x: 0, y: 0 });
    

        
    //  Player physics properties. Give the little guy a slight bounce.
    //player.setBounce(0.2);
    //player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    /*this.anims.create({
        key: '',
        frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
        
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
        
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    */

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(sprite, platforms);
    //this.physics.add.collider(limit, cloud1);
    //this.physics.add.collider(player, limit2);
     
    //만들어진 오브젝트 모두 group화
    objects=this.physics.add.group();
    //hearts=this.add.group();
    //오브젝트 만드는 함수
    //timedEvent=this.time.addEvent({ delay: speed2, callback: firstObject, callbackScope: this, loop: false });
    timedEvent2=this.time.addEvent({ delay:450, callback: spawnObject, callbackScope: this, loop: true }); 
    //this.physics.add.overlap(sprite, checkHeart, collectHeart, null, this);
    
}

function update (time, delta)
{
    if (gameOver)
    {
        sprite.anims.setRepeat(0); //캐릭터 뛰는 거 멈춤
        return;
    }
     
    moveBackground(time,delta);
    timeBar(timebar2);
    moveObject(time,delta);
    destroyFailObject();
    //scoreCount();
    //checkHeart()
    this.physics.add.overlap(sprite, checkHeart(), collectHeart, null, this);
}

function checkHeart(){
    if(nameObjects.length>0){
        var temp=nameObjects.shift();
        var object=objects.getChildren();
        if(temp=='heart'){
            console.log(object[0]);
            return object[0];
            //this.physics.add.overlap(sprite, object[0], collectHeart, null, this);
        } 
        else if(temp=='banana'){
        }
        else if(temp=='cat'){
        }
        else if(temp=='rock'){
        }
        else if(temp=='trash'){
        }
    }
    
}

function collectHeart()
{
    var object=objects.getChildren();
    object[0].destroy();
    score += 1;
    scoreText.setText(':'+ score);
}

//타임바
function timeBar(timebar2){
    timebar2.clear();
    //D27FFF
    timebar2.fillStyle(0xA807FF);

    if (!gameOver){
        timebar2.fillRect(400,20, 200-200 * timerEvent.getProgress(), 20);
        timeSource=200-200 * timerEvent.getProgress();
    }
    else {
        timebar2.fillRect(400, 20, timeSource, 20);
    }
    if ((1-timerEvent.getProgress())==0 )
    {
        gameOver = true;
    }

}

//처음 시작할 때 생긴 오브젝트들 (x 범위 안에 있는 애들)
/*function firstObject(){
    var spritePosition=sprite.x;
    for (var i=0;i<13 ;i++){
        var objectPosition=spritePosition+i*60;
        var temp=randomObject();

        var object=this.add.image(objectPosition,360, randomList[temp]);
        objects.add(object);
    }
    return objectPosition;
}
*/

/*function checkObject(){
    var temp=nameObjects.shift();
    if(temp=='heart'){
        objects.getChildren();
    }
    else if(temp=='banana'){
    }
    else if(temp=='cat'){
    }
    else if(temp=='rock'){
    }
    else if(temp=='trash'){
    }
}
*/

//마지막 위치에 새로운 오브젝트 생성->loop를 통해 반복
function spawnObject(){
    if(!gameOver){
        var temp=randomObject();
        if(temp==0){
            nameObjects.push("heart");
            var object=this.physics.add.image(840, 360, randomList[temp]);
            this.physics.add.collider(sprite, object);
            //hearts.add(object);
            objects.add(object);
        }
        else if(temp==1){
            nameObjects.push("banana");
            var object=this.add.image(840, 360, randomList[temp]);
            objects.add(object);
        }
        else if(temp==2){
            nameObjects.push("cat");
            var object=this.add.image(840, 360, randomList[temp]);
            objects.add(object);
        }
        else if(temp==3){
            nameObjects.push("rock");
            var object=this.add.image(840, 360, randomList[temp]);
            objects.add(object);
        }
        else if(temp==4){
            nameObjects.push("trash");
            var object=this.add.image(840, 360, randomList[temp]);
            objects.add(object);
        }
    }
}

function moveObject(time, delta){
    var temp=objects.getChildren();
    for(var i=0;i<temp.length;i++){
        temp[i].x += -speed2 * delta;
    }
}

//오브젝트 적당한 처리 실패했을 때 오브젝트 없애기
function destroyFailObject(){
    if(objects.length>0){
        var temp=objects.getChildren();
        console.log(temp[0]);
        if(temp[0].x<120){
            temp[0].destroy();
        }
    }
    
    /*for(var i=0;i<temp.length;i++){
        if(temp[i].x<120){
            temp[0].destroy();
        }
    }
    */
}

function randomObject(){
    //randomList=["heart", "banana", "cat", "rock", "trash"]
    if(Math.random()<0.7){
        //random=randomList[0];
        random=0;
    }
    else{
        var num=randomNumber(1,4);
        //random=randomList[num];
        random=num;
    }
    return random;
}

//min=1, max=4
function randomNumber(min, max){
    var randVal=Math.floor(Math.random()*(max-min+1))+min;
    return randVal;
}

/*function scoreCount(){
    var temp=objects.getChildren();
    if(temp[0]==='heart'){ //하트이면
    }
}
*/



//배경 움직이는 것
function moveBackground(time, delta){
    cloud1.x += -speed * delta;
    cloud2.x += -speed * delta;
    cloud3.x += -speed * delta;
    cloud4.x += -speed * delta;
    tree1.x += -speed * delta;
    tree2.x += -speed * delta;
    tree3.x += -speed * delta;
    tree4.x += -speed * delta;
    grass1.x += -speed * delta;
    grass2.x += -speed * delta;
    grass3.x += -speed * delta;
    grass4.x += -speed * delta;
    bench.x += -speed * delta;
    if (cloud1.x < 0)
    {
        cloud1.x = 800;
    }
    if (cloud2.x < 0)
    {
        cloud2.x = 800;
    }
    if (cloud3.x < 0)
    {
        cloud3.x = 800;
    }
    if (cloud4.x < 0)
    {
        cloud4.x = 800;
    }
    if (tree1.x < 0)
    {
        tree1.x = 800;
    }
    if (tree2.x < 0)
    {
        tree2.x = 800;
    }
    if (tree3.x < 0)
    {
        tree3.x = 800;
    }
    if (tree4.x < 0)
    {
        tree4.x = 800;
    }
    if (grass1.x < 0)
    {
        grass1.x = 800;
    }
    if (grass2.x < 0)
    {
        grass2.x = 800;
    }
    if (grass3.x < 0)
    {
        grass3.x = 800;
    }
    if (grass4.x < 0)
    {
        grass4.x = 800;
    }
    if (bench.x < 0)
    {
        bench.x = 800;
    }

}
