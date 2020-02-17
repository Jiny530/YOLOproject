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

var bg_매대오;
var bg_매대왼;
var bg_음료매대;
//var 판그룹;  나중에

var music;

var bg_판1;
var bg_판2;
var bg_판3;
var bg_판4;

var 편순이;

var 물건속도=3; //작을수록 빠름
var speed;
var life=5;  //생명갯수변수
var hearts; //이미지그룹
var diehearts;
var 점수항목; //score 이미지
var 콤보항목;
var score=0; //실제점수
var scoreText; //점수쓸공간
var combo=0;  //콤보변수

var 총상품=0;
var 상품간격= 900; //0.9초기준시작

var products; //group
var rand_product;//랜덤으로 뽑을 상품
var childs; //상품getchildren()

var timedEvent; //timer event

//var currentPoint=[0,0]; //현재 인풋 받는 상품child의 위치 [x,y]
var inputGood; //맞음, 틀림 팝업 오브젝트
var inputBad;
var inputMiss;

 //상품 리스트
 
var snackList=["과자_꼬깔콘","과자_다이제","과자_도리","과자_오징어","과자_초코송이","과자_포카칩","과자_홈런볼"];
var noodleList=["라면_까불닭","라면_미역국","라면_신라면","라면_오짬","라면_육개장","라면_진라면","라면_참깨라면"];
var drinkList=["음료_데미사과","음료_데미오렌지","음료_데자와","음료_사이다","음료_콜라","음료_포카리","음료_핫6"];
var noList=["기타_갈고양이","기타_강아지","기타_검고양이","기타_쓰레기봉지"];
var productList=[snackList,noodleList,drinkList,noList]; //배열변수자체를 배열의 요소로!

var productList_leverl=[snackList,noodleList];
var productList_lever2=[snackList,noodleList,noList];
var productList_lever3=[snackList,noodleList,noList,drinkList];  //왼 오 스페이스 위 인풋짝

var inputList=[]; //랜덤상품고를때마다 눌러야할 키 넣기

function preload ()
{

    this.load.audio('store24_bgm','assets/music/편의점bgm.mp3')
    
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

    this.load.image('음료_데미사과', 'assets/store24/음료_데미사과.png');
    this.load.image('음료_데미오렌지', 'assets/store24/음료_데미오렌지.png');
    this.load.image('음료_데자와', 'assets/store24/음료_데자와.png');
    this.load.image('음료_사이다', 'assets/store24/음료_사이다.png');
    this.load.image('음료_콜라', 'assets/store24/음료_콜라.png');
    this.load.image('음료_포카리', 'assets/store24/음료_포카리.png');
    this.load.image('음료_핫6', 'assets/store24/음료_핫6.png');

    this.load.image('기타_갈고양이', 'assets/store24/기타_갈고양이.png');
    this.load.image('기타_검고양이', 'assets/store24/기타_검고양이.png');
    this.load.image('기타_강아지', 'assets/store24/기타_강아지.png');
    this.load.image('기타_쓰레기봉지', 'assets/store24/기타_쓰레기봉지.png');

    this.load.image('판1', 'assets/store24/판1.png');
    this.load.image('판2', 'assets/store24/판2.png');
    this.load.image('오른매대', 'assets/store24/오른매대상품.png');
    this.load.image('왼매대', 'assets/store24/왼매대상품.png');
    this.load.image('음료매대', 'assets/store24/음료매대.png');

    this.load.image('편순이', 'assets/store24/편순이.png');
    this.load.image('생명컬러', 'assets/store24/생명컬러.png');
    this.load.image('생명흑백', 'assets/store24/생명흑백.png');

    this.load.image('노란타일', 'assets/store24/노란타일.png');
    this.load.image('초록타일', 'assets/store24/초록타일.png');

    this.load.image('점수항목', 'assets/store24/scoretext.png');
    this.load.image('콤보항목', 'assets/store24/콤보ui.png');
    this.load.image('틀림', 'assets/store24/틀림팝업.png');
    this.load.image('맞음', 'assets/store24/맞음팝업.png');
    this.load.image('미스', 'assets/store24/미스팝업.png');
}



function create ()
{   
    music = this.sound.add('store24_bgm');
    music.loop=true;
    this.sound.mute=false;
    music.play();

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

    //생명그룹 하트 다섯개
    hearts=this.add.group();
    for(var i=0;i<5;i++){
        var temp=this.add.image(i*64,0,'생명컬러').setOrigin(0).setScale(1/10,1/10);
        hearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2,3,4 heart
    }

    diehearts=this.add.group();
    for(var i=0;i<5;i++){
        var temp=this.add.image(i*64,-100,'생명흑백').setOrigin(0).setScale(1/10,1/10);
        diehearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2,3,4 heart
    }
    
    //랜덤으로 선택된 상품그룹화
    products=this.add.group();  //디폴트스페이스로처리
    //판그룹=game.add.group();  나중에 무빙효과낼때

    bg_판1=this.add.image(0,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판2=this.add.image(256,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판3=this.add.image(384,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판4=this.add.image(512,430,'판1').setOrigin(0).setScale(1/3,1/3);

    bg_매대왼=this.add.image(0,64,'왼매대').setOrigin(0).setScale(1/3,1/3);
    bg_음료매대=this.add.image(280,20,'음료매대').setOrigin(0).setScale(1/3,1/3);
    bg_매대오=this.add.image(512,64,'오른매대').setOrigin(0).setScale(1/3,1/3);    

    편순이=this.add.image(280,100,'편순이').setOrigin(0).setScale(1/5,1/5);

    점수항목=this.add.image(8*64+20,0,'점수항목').setOrigin(0).setScale(1/4,1/4);
    scoreText = this.add.text(10*64+20, 13, '0', { fontSize: '40px', fill: '#000' });
    comboText = this.add.text(7*64+20, 13, '0', { fontSize: '40px', fill: '#000' });
    speedText = this.add.text(700, 480, '0', { fontSize: '20px', fill: '#000' });

    콤보항목=this.add.image(5*64-20,-17,'콤보항목').setOrigin(0).setScale(1/2.7,1/2.7);

    inputGood=this.add.sprite(300,200,'맞음').setOrigin(0).setScale(0.8,0.8); 
    inputBad=this.add.sprite(300,200,'틀림').setOrigin(0).setScale(0.8,0.8); 
    inputMiss=this.add.sprite(550,250,'미스').setOrigin(0).setScale(0.5,0.5);
    inputGood.alpha=0;
    inputBad.alpha=0;
    inputMiss.alpha=0;

    //주기적으로 상품 생성하는 함수 호출
    timedEvent=this.time.addEvent({ delay: 상품간격, callback: createProduct, callbackScope: this, loop: true }); 
    speed = Phaser.Math.GetSpeed(600, 물건속도);

    //키보드
    this.input.keyboard.on('keydown', function (event) {
        var tempkey;
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT)
        {   
            tempkey='LEFT';
            checkInput(tempkey);
            //console.log("스페이스바");
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT)
        {
            tempkey='RIGHT';
            checkInput(tempkey);
            //console.log("오른");
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP){
            tempkey='UP';
            checkInput(tempkey);
            //console.log("위");
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE){
            tempkey='SPACE';
            checkInput(tempkey);
            //console.log("왼");
        }
    });
}


//상품child생성
function createProduct(){

    //점수에 따라 상품 목록 리스트 바뀜
    if (score <= 100){
        productList=productList_leverl;
        //console.log("level1");
    }
    else if(score>=200 && score<300){   //구간은 위아래 제한 다 있어야해!
        productList=productList_lever2;
        //console.log("level2");
    }
    else if(score >=300){
        productList=productList_lever3;
        //console.log("level3");
    }

    var rand_productList=pickProductList(); //상품종류고르기
    rand_product=randomProduct(rand_productList); //제품종류고르기->제품이름반환

    var temp=this.add.image(-120,340,rand_product).setOrigin(0);
    temp.setScale(1/7,1/7);
    products.add(temp,{addToScene:true}); //group에 넣고 displaylist에 넣기 true 처리
    }

//놓치거나 잘못 입력된 상품 처리 (생명-1)
function failProduct(){
    life -=1;
    reduceHeart(); // 하트감소함수호출

}

//천천히 없애기
/*
function fadePicture(picture) {
    this.add.tween(picture).to( { alpha: 0 },0, Phaser.Easing.Linear.None, true);
}*/


function checkInput(inkey){
    
    //키보드 입력과 해당 상품 기대 입력값이 같으면 성공
    if (inkey == inputList[0]){
        inputBad.alpha=0;
        inputGood.alpha=0;
        inputGood.alpha=1;

        childs[0].destroy();
        inputList.shift();
        console.log("성공");
        score+=10;
        combo+=1; //콤보+1
        scoreText.setText(score);
        comboText.setText(combo);
    }
    else{ //잘못 입력했을 경우
        inputBad.alpha=0;
        inputGood.alpha=0;
        inputBad.alpha=1;

        if (combo != 0){ //이미콤보가쌓인경우
            combo=0; //콤보리셋
        }
        comboText.setText(combo); //0보이기
        console.log("실패");
        failProduct() //생명감소만한다.
    }
    //아니면 실패->생명하나 감소 reduceLife()호출
}

//하트이미지변환(흑백으로)
function reduceHeart(){
    var dieheartchilds=diehearts.getChildren();
    dieheartchilds[life].setY(0);
    console.log("하트하나없앰");
}

//위치중 제일 오른쪽에 있는 child 받아와서 input 입력값과 

function update(time,delta)
{
    childs=products.getChildren();
   

    for (var i=0; i<childs.length; i++){
        childs[i].x += speed*delta;
        if(childs[i].x > 720){
            inputMiss.alpha=1;
            if(childs[i].x > 768){
                inputMiss.alpha=0;
                console.log(i); //사라지는 인덱스 출력
                childs[i].destroy(); 
                inputList.shift();  //입력받아야할 배열에서 값 삭제
                //콤보처리
                if (combo != 0){ //이미콤보가쌓인경우
                    combo=0; //콤보리셋
                }
                comboText.setText(combo);
                console.log("아웃");
                failProduct();
            }
        }
    }

    //콤보 5의배수마다 속도 점차 증가
   /* if(combo%5==0){
        if(상품간격>0){
            var temp=combo/5;
            speed=speed+combo*0.001 //speed 클수록 빠름
            상품간격= 상품간격-combo*1000;
        }
    }*/

    //점수의 100배수마다 속도 점차 증가
    if(score%100==0){
        if(speed<0.5){
            var temp=score/100;
            speed=speed+temp*0.0001 //speed 클수록 빠름
            상품간격= 상품간격/temp*10000;  //상품나오는 delay
        }
    }

    //리셋-combo 기준 수정
    /*if(combo==0){
        speed=Phaser.Math.GetSpeed(600, 물건속도);
        상품간격=1000;
    }
    */
    speedText.setText(speed); //작을수록 빠름
    


    //게임오버
    if (life == 0){
        //몫숨 다 소모하면, gameover 
        game.destroy();   //->상품 중지 하지 않아도 됨. total 점수판만 팝업해도 괜찮을 듯..
        music.destroy();
        if(총상품==combo){
            //all combo
        }
        console.log("게임오버");
    }
    
}


function pickProductList(){
    var tempindex=getRandomInt(0,productList.length); //상품종류선택 index이용
    //console.log(productList[tempindex]);
    if (tempindex ==0){
        //0:snake
        inputList.push('LEFT');
    }
    else if (tempindex ==1){
        //1:noodle
        inputList.push('RIGHT');
    } 
    else if (tempindex ==2){
        //2:drink
        inputList.push('SPACE');
    } 
    else if (tempindex ==3){
        //3:no
        inputList.push('UP');
    } 
    console.log(inputList);
    return productList[tempindex]; //고른 list이름 반환
}
function randomProduct(listname){
    var tempindex=getRandomInt(0,listname.length);
    //console.log(tempindex);
    console.log(listname[tempindex]);
    return listname[tempindex]; //특정제품이름반환
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }