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
    this.load.image('background', 'assets/background4.png');
    this.load.image('bg', 'assets/bg5.png');
    this.load.image('ground2','assets/ground4.png');
    //this.load.image('hi','assets/limit2.png');
    this.load.image('heart', 'assets/heart.png');
    //this.load.image('banana', 'assets/banana.png');
    //this.load.image('rock', 'assets/rock.png');
    //this.load.image('cloud', 'assets/cloud.png');
    //this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    //this.load.image('ground', 'assets/platform.png');
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
        

    player = this.physics.add.sprite(100, 300, 'dude');
        
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
    //this.physics.add.collider(player, limit);
            
        
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
