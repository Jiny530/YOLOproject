var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
        
var player;
var move;
var movingspeed=3;
var limit;

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
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
        
var game = new Phaser.Game(config);
        //game.world.bounds.setTo(384, 256, 640, 360);

function preload ()
{   
    //640,360
    this.load.image('background', 'assets/running/background4.png');
    this.load.image('bg', 'assets/running/bg5.png');
    this.load.image('ground2','assets/running/ground4.png');
    this.load.image('heart', 'assets/running/heart.png');
    //this.load.image('banana', 'assets/running/banana.png');
    //this.load.image('rock', 'assets/running/rock.png');
    //this.load.image('star', 'assets/running/star.png');
    this.load.spritesheet('dude', 'assets/running/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('character', 'assets/running/character.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('cat', 'assets/running/cat.png');
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
    
 }
        
function create ()
{
    platforms = this.physics.add.staticGroup(); //캐릭터가 뛰는 바닥 static
       
    this.add.image(384,256,'background'); //검정 바탕
    this.add.image(384,256,'bg'); //하늘색 바탕
    platforms.create(384, 426, 'ground2'); //캐릭터가 뛰는 바닥
    speed = Phaser.Math.GetSpeed(600, movingspeed); //움직이는 애들 스피드
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

    player = this.physics.add.sprite(100, 300, 'dude');

    /* 움직이는 애들 검정색 뒤로 사라지게 검정색 하나 더 놔둠*/
    limit=this.physics.add.staticGroup();
    limit.create(35, 256, 'limitbg');
    limit.create(740, 256, 'limitbg');

    character=this.physics.add.sprite(100, 300, 'character');
        
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
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


    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(character, platforms);
    //this.physics.add.collider(limit, cloud1);
    //this.physics.add.collider(player, limit2);
            
        
    
}
        
function update (time, delta)
{
    if (gameOver)
    {
        return;
    }
        
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        
        player.anims.play('right', true);
    }
    /*else if(corsors.down.isDown){
        player.setVelocityX(0);
        player.anims.play('down', true)

    }*/
    else
    {
        player.setVelocityX(0);
        
        player.anims.play('turn');
    }
        
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-300);
    }

    moveBackground(time,delta);
    
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

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
