// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す


class MainScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/sky.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/ground.png');//w:480,h:32
        this.load.image('alien1', 'assets/alien1.png');
        this.load.image('alien2', 'assets/alien2.png');
        this.load.image('alien3', 'assets/alien3.png');
        this.load.image('platform', 'assets/platform.png');//w:400,h:32
        this.load.image('block', 'assets/block.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('coin', 'assets/coin.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');
        // 星を(200,200)に追加
        this.add.image(200, 200, 'star');

        // Player1の画像を物理演算を持った画像にする
        const player = this.physics.add.sprite(500, 350, 'alien1');
        // MainSceneクラスのプロパティにplayerを設定
        this.player = player

    }

     // 毎フレーム実行される繰り返し処理
    update() {
       // プレイヤーの向きフラグを変更
        if (this.player.x >= D_WIDTH - 100) this.player_direction = -1;
        if (this.player.x <= 100) this.player_direction = 1;

        // プレイヤーの移動
        // +X方向の移動フラグならプレイヤーを右に移動
        if (this.player_direction == 1) {
            this.player.setVelocityX(100);

        // -X方向の移動フラグならプレイヤーを左に移動
        } else {
            this.player.setVelocityX(-100);
        }
     
    }

}

