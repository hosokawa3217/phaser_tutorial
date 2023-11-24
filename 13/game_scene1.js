
// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
 class MyScene1 extends Phaser.Scene {

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('alien1', 'assets/alien1.png');
    }

   // コンストラクタ
    constructor() {
         //Sceneを拡張してクラスを作る際にコンストラクタでSceneの設定を渡します
         //keyでシーンのキー、activeでシーンの自動実行を設定できます
        super({ key: 'MyScene1', active: true });
    }

    // シーン初期化処理
    create() {
        this.add.image(400, 300, 'sky');

        this.player = this.physics.add.sprite(200, 150, 'alien1');
        this.player.angle = 0;
        //クリックイベントを取得できるテキストオブジェクトを作成
        this.text1 = this.add.text(100, 300, 'click! to Rotation!').setFontSize(32).setColor('#00f').setInteractive({ useHandCursor: true });
		this.text2 = this.add.text(100, 400, 'Click! to Move and Rotation !').setFontSize(32).setColor('#0f0').setInteractive({ useHandCursor: true });
    }

    update() {
        //テキストオブジェクトにon()イベントを追加する
		this.text1.on('pointerdown', function (pointer) {
            // 回転角度を更新
            this.player.angle += 1;
            // 回転角度を設定
            this.player.setAngle( this.player.angle );

			}, this);

		this.text2.on('pointerdown', function (pointer) {
            this.player.angle += 1;
            this.player.setAngle(this.player.angle );
            this.player.setVelocityX(20);   // 右方向の速度を設定
            
			}, this);	
	
    }


}