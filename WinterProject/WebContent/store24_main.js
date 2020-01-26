var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 768,
    height: 512,
    disableContextMenu: true,
    scene: {
        preload: preload,
        create: create,
        update:update,
    }
};

var game = new Phaser.Game(config);

var rand_noodle1;
var rand_noodle2;
var speed1;
var speed2;

/*
var noodle_list=[  //누들 이미지 이름 담은 array
    'noodle1',
    'noodle2'
]*/

function preload ()
{
    this.load.image('noodleex', 'assets/store24/라면_까불닭.png');
    this.load.image('noodleex2', 'assets/store24/라면_육개장.png');
}

function create ()
{

   rand_noodle1=this.add.image(32,100,'noodleex').setOrigin(0);
   rand_noodle1.setScale(0.3,0.3);
   speed1 = Phaser.Math.GetSpeed(600, 3);

   rand_noodle2=this.add.image(400,250,'noodleex2').setOrigin(0);
   rand_noodle2.setScale(0.3,0.3);
   speed2 = Phaser.Math.GetSpeed(-600, 3);
}

/*
function pick_rand_noodle(){
    var rand_noodle=this.noodle[];//랜덤으로 이미지 선택

}*/


function update(time,delta)
{
    rand_noodle1.x+=speed1*delta;
    if (rand_noodle1.x >768)
    {
        rand_noodle1.x = -150;
    }
    rand_noodle2.x+=speed2*delta;
    if (rand_noodle2.x+150 < 0)
    {
        rand_noodle2.x = 768;
    }
}
