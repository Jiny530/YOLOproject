var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 768,
    height: 512,
    disableContextMenu: true,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('balls', 'assets/images/stop.png', { frameWidth: 512, frameHeight: 512 });
}

function create ()
{
    var graphics = this.add.graphics();

    var color = 0xffff00;
    var thickness = 2;
    var alpha = 1;
    button=this.add.image(300,250,'balls',0);
    //  Events

    var sx = 0;
    var sy = 0;
    var draw = false;

    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();

    this.input.on('pointerdown', function (pointer) {

        
        button.visible=false;
    });

    this.input.on('pointerup', function () {

        button.visible=true;

    });

    this.input.on('pointermove', function (pointer) {

        if (draw && pointer.noButtonDown() === false)
        {
            graphics.clear();
            graphics.lineStyle(thickness, color, alpha);
            graphics.strokeRect(sx, sy, pointer.x - sx, pointer.y - sy);
        }

    });
}
