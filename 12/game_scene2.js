class MyScene2 extends Phaser.Scene {

	preload() {
		this.load.image('back', '../assets/back.png');
		this.load.image('alien2', '../assets/alien2.png');
	}

	constructor() {
        //active: false で自動実行をオフにする
        super({ key: 'MyScene2', active: false });
    }

	
    create() {
		this.add.image(200, 300, 'back').setDisplaySize(200, 300);
		this.add.image(200, 400, 'alien2');
		this.add.text(250, 100, 'Scene 2').setFontSize(64).setColor('#f0f');
		
		//クリックイベントを取得できるテキストオブジェクトを作成
		this.text = this.add.text(250, 300, 'click! Scene1 start !').setFontSize(32).setColor('#f0f').setInteractive({ useHandCursor: true });
	}

	update() {
			//テキストオブジェクトにon()イベントを追加する
		this.text.on('pointerdown', function (pointer) {
			// 遷移
			this.scene.start("MyScene1")
			// 一時停止
			this.text.setText('Scene1 start OK!!');
			this.scene.pause();

			}, this);
}

}
