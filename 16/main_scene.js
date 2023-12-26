let platforms;
let player;
// 効果音のサンプル
class MainScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }

    // シーンの事前読み込み処理
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');

// 連続シートを区分けして読み込む
// このdude.pngは32*48のキャラクターが9つ横並びになっている
// この画像で、横32px,縦48pxで区切って読み込みこむ
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );  
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

    //  プレイヤーは動的物理オブジェクトにする
        player = this.physics.add.sprite(100, 150, 'dude');
        player.setBounce(0.2);//着地したときに0.2だけ跳ね
        player.setCollideWorldBounds(true);//弾む機能をTrueでON

        this.physics.add.collider(player, platforms);// 静止物の衝突処理を設定する
        
        this.anims.create({
        //左キーを押したとき
            key: 'left',
            //配列番号0から3番を
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            //10フレームごとに順繰りに表示して
            frameRate: 10,
            //アニメーションをループする。
            repeat: -1
        });

        //  右キーを押すとスプライトシートの5-8がループするアニメが流れる
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    // X方向に1秒で0進むとスプライトシート4のturnがループで流れる
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    }

     // 毎フレーム実行される繰り返し処理
    update() {
        let cursors = this.input.keyboard.createCursorKeys();

//      //矢印キーで移動 
        if(cursors.left.isDown){// 左キーを押しているとき
            player.setVelocityX(-160);// 左方向の速度を設定
            player.anims.play('left', true);
            console.log("left");
        }else if(cursors.right.isDown){
            player.setVelocityX(160);// 右方向の速度を設定
            player.anims.play('right', true);

        }else{
            player.anims.play('turn');
            player.setVelocityX(0);

        }

// 上キーを押している状態で、playerのbodyの下方面が何かに触れているとき
// Y方向に1秒で-200進みます。(=ジャンプ)
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-200);
        }
    }

}

