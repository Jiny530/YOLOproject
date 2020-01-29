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
var cloudAll;
var cloud1;
var cloud2;
var cloud3;
var tree1;
var tree2;

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
    this.load.image('tree', 'assets/running/tree.png');
    this.load.image('tree2', 'assets/running/tree2.png');
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
    cloud1=this.physics2.add.sprite(200,160,'cloud');

    //cloud1.setDamping(true);
    //cloud1.setDrag(0.99);
    //cloud1.setMaxVelocity(200);

    cloud2=this.add.image(360,200,'cloud');
    cloud3=this.add.image(580,180,'cloud');
    
    tree1=this.add.image(250,312,'tree');
    tree2=this.add.image(500,312,'tree2');

    //this.add.image(200,300,'cat');

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

    // group with all active platforms.
    this.platformGroup = this.add.group({

        // once a platform is removed, it's added to the pool
        removeCallback: function(platform){
            platform.scene.platformPool.add(platform)
        }
    });

    // pool
    this.platformPool = this.add.group({

        // once a platform is removed from the pool, it's added to the active platforms group
        removeCallback: function(platform){
            platform.scene.platformGroup.add(platform)
        }
    });

    let minDistance = config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }




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

    //cloud1.setAcceleration(50);
    //this.physics.world.wrap(sprite, 32);
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}
