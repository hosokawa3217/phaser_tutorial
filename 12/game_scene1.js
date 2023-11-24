
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
        this.add.image(600, 400, 'alien1');
        this.add.text(250, 100, 'Scene 1').setFontSize(64).setColor('#ff0');
        //クリックイベントを取得できるテキストオブジェクトを作成
        this.text1 = this.add.text(200, 200, 'click! Scene2 start !').setFontSize(32).setColor('#0ff').setInteractive({ useHandCursor: true });
		this.text2 = this.add.text(200, 250, 'Click! Scene2 load !').setFontSize(32).setColor('#0ff').setInteractive({ useHandCursor: true });
    }

    update() {
        //テキストオブジェクトにon()イベントを追加する
		this.text1.on('pointerdown', function (pointer) {
			// 遷移実行
			this.scene.start("MyScene2")
			// this.scene.pause();
			}, this);

		this.text2.on('pointerdown', function (pointer) {
			// 並列実行
			this.scene.launch("MyScene2")
			// this.scene.pause();
			}, this);	
	
    }


}