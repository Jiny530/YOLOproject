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
var limit2;

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
    //this.load.image('hi','assets/running/limit2.png');
    this.load.image('heart', 'assets/running/heart.png');
    //this.load.image('banana', 'assets/running/banana.png');
    //this.load.image('rock', 'assets/running/rock.png');
    //this.load.image('cloud', 'assets/running/cloud.png');
    //this.load.image('star', 'assets/running/star.png');
    this.load.spritesheet('dude', 'assets/running/dude.png', { frameWidth: 32, frameHeight: 48 });
    //this.load.image('ground', 'assets/running/platform.png');
    this.load.image('cat', 'assets/running/cat.png');
    this.load.image('cloud', 'assets/running/cloud3.png');
    this.load.image('limit', 'assets/running/limit2.png');
 }
        
function create ()
{
    platforms = this.physics.add.staticGroup();
            
    this.add.image(384,256,'background');
    this.add.image(384,256,'bg');
    //this.add.image(384, 256, 'hi');
    platforms.create(384, 426, 'ground2');
    
            
            
    //this.add.image(384,256,'heart');
    //this.add.image(384,256,'star');
    this.add.image(663,20,'heart');
    this.add.image(200,160,'cloud');
    this.add.image(360,200,'cloud');
    this.add.image(580,180,'cloud');
    this.add.image(200,300,'cat');
    
        

    player = this.physics.add.sprite(100, 300, 'dude');
    //limit2= this.physics.add.sprite(384, 256, 'dude');
        
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
    //this.physics.add.collider(player, limit2);
            
        
    //  The score
    scoreText = this.add.text(678, 10, ': 0', { fontSize: '25px', fill: '#fff' });

    }
        
function update ()
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
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}
