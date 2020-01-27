var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    scene: {
        preload: preload,
        create: create,
        update:update,
    }
};


var game = new Phaser.Game(config);

var bg_매대위;
var bg_매대아래;
var bg_판1;
var bg_판2;
var bg_판3;
var bg_판4;

var 편순이;

var 물건속도=3; //작을수록 빠름
var speed;
var product;

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

    this.load.image('노란타일', 'assets/store24/노란타일.png');
    this.load.image('초록타일', 'assets/store24/초록타일.png');
}



function create ()
{   
    //배경타일설정
    for(var i =0;i<8;i++){
        if(i<4){
            for(var j=0;j<12;j++){
                var tile=this.add.image(j*64,i*64,'노란타일').setOrigin(0);
                tile.setScale(1/4,1/4);
            }
        }
        else{
            for(var j=0;j<12;j++){
                var tile=this.add.image(j*64,i*64,'초록타일').setOrigin(0);
                tile.setScale(1/4,1/4);
            }
        }
    }

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

    product=this.add.image(0,350,'과자_도리').setOrigin(0);
    product.setScale(1/7,1/7);
    speed = Phaser.Math.GetSpeed(600, 물건속도);

    //this.time.events.loop(Phaser.Timer.SECOND*2, createProduct, this); //주기적으로 함수 호출 
}

/*
function createProduct(){    
    var product=this.add.image(0,480,'과자_홈런볼').setOrigin(0);
    product.setScale(1/7,1/7);
}*/

function update(time,delta)
{
   product.x += speed * delta;
   if (product.x > 768)
    {
        product.x =-30;
    }
}
