
// シーンクラス
 class MyScene extends Phaser.Scene {

    preload() {
        this.load.image('background', '11/assets/background.png');
        this.load.image('taro', '11/assets/taro.png');
        this.load.image('hanako', '11/assets/hanako.png');
    }

   // コンストラクタ
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーン初期化処理
    create() {
        this.add.image(400, 300, 'background');
        this.physics.add.sprite(500, 400, 'taro');
        this.physics.add.sprite(100, 400, 'hanako');
        
    }

    update() {
    }


}