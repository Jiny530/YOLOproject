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

var bg_매대위;
var bg_매대아래;
var bg_판1;
var bg_판2;
var bg_판3;
var bg_판4;

var 편순이;
var 물건속도=3; //작을수록 빠름

/*
var noodle_list=[  //누들 이미지 이름 담은 array
    'noodle1',
    'noodle2'
]*/

function preload ()
{
    this.load.image('라면_까불닭', 'assets/store24/라면_까불닭.png');
    this.load.image('라면_육개장', 'assets/store24/라면_육개장.png');
    this.load.image('라면_미역국', 'assets/store24/라면_미역국.png');
    this.load.image('라면_신라면', 'assets/store24/라면_신라면.png');
    this.load.image('라면_진라면', 'assets/store24/라면_진라면.png');
    this.load.image('라면_오짬', 'assets/store24/라면_오짬.png');
    this.load.image('라면_참깨라면', 'assets/store24/라면_참깨라면.png');

    this.load.image('과자_꼬깔콘', 'assets/store24/과자_꼬깔콘.png');
    this.load.image('과자_오징어', 'assets/store24/과자_오징어.png');
    this.load.image('과자_초코송이', 'assets/store24/과자_초코송이.png');
    this.load.image('과자_포카칩', 'assets/store24/과자_포카칩.png');
    this.load.image('과자_홈런볼', 'assets/store24/과자_홈런볼.png');
    this.load.image('과자_다이제', 'assets/store24/과자_다이제.png');
    this.load.image('과자_도리', 'assets/store24/과자_도리.png');


    this.load.image('긴판', 'assets/store24/긴판.png');
    this.load.image('오른마무리판', 'assets/store24/오른마무리판.png');
    this.load.image('매대', 'assets/store24/매대.png');

    this.load.image('편순이', 'assets/store24/편순이.png');
}

function create ()
{
   bg_판1=this.add.image(0,480,'긴판').setOrigin(0);
   bg_판1.setScale(1/3,1/3);
   bg_판2=this.add.image(256,480,'오른마무리판').setOrigin(0);
   bg_판2.setScale(1/7,1/7);
   bg_판3=this.add.image(384,480,'긴판').setOrigin(0);
   bg_판3.setScale(1/3,1/3);
   bg_판4=this.add.image(630,480,'오른마무리판').setOrigin(0);
   bg_판4.setScale(1/7,1/7);

   bg_매대위=this.add.image(512,0,'매대').setOrigin(0);
   bg_매대위.setScale(1/3,1/3);
   bg_매대아래=this.add.image(0,0,'매대').setOrigin(0);
   bg_매대아래.setScale(1/3,1/3);

   편순이=this.add.image(280,100,'편순이').setOrigin(0);
   편순이.setScale(1/5,1/5);

   rand_noodle2=this.add.image(0,380,'라면_육개장').setOrigin(0);
   rand_noodle2.setScale(1/8,1/8);
   speed2 = Phaser.Math.GetSpeed(600, 물건속도);
}

/*
function pick_rand_noodle(){
    var rand_noodle=this.noodle[];//랜덤으로 이미지 선택

}*/


function update(time,delta)
{
    rand_noodle2.x+=speed2*delta;
    if (rand_noodle2.x > 768)
    {
        rand_noodle2.x = 0;
    }
}
