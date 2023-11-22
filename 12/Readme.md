# Sceneの取り扱い① 遷移、並列実行

## index.html

```html
    <script type="text/javascript" charset="UTF-8" src="../api/phaser.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="game_boot.js"></script>
    <script type="text/javascript" charset="UTF-8" src="game_scene1.js"></script>
    <script type="text/javascript" charset="UTF-8" src="game_scene2.js"></script>
```
game_boot.js は、phaserの初期化を行うためのファイルです。
game_scene1.js は、シーン１の処理を記述するためのファイルです。
game_scene2.js は、シーン２の処理を記述するためのファイルです。


## シーンを作る、登録する

シーンを複数記述する場合、呼び出すためのキーを設定する必要があります。
そのため、コンストラクタ内で設定を記述しています。

シーン１：MyScene1クラス
```javascript
 class MyScene1 extends Phaser.Scene {

    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('alien1', '../assets/alien1.png');
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

        // Player1の画像を物理演算を持った画像にする
        this.text1 = this.add.text(200, 200, 'click! Scene2 start !').setFontSize(32).setColor('#0ff').setInteractive({ useHandCursor: true });
		this.text2 = this.add.text(200, 250, 'Click! Scene2 load !').setFontSize(32).setColor('#0ff').setInteractive({ useHandCursor: true });
    }

```

シーンを複数記述する場合、呼び出すためのキーを設定する必要があるため、 コンストラクタ内で設定を記述しています。  
つづいて、シーン２の記述です。

シーン２：MyScene2クラス
```javascript
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
```
MyScene2クラスのコンストラクタでは、**自動実行がオフ**になるように設定しています。

２つのシーンのクラスを作成したので、GameConfig内のsceneに記述します。
```javascript
    config = {
        type: Phaser.AUTO,
        width: D_WIDTH, // 画面横幅
        height: D_HEIGHT, // 画面縦幅
        scene: [MyScene1,MyScene2], // シーンを登録する
        
        physics: { // 物理演算設定(使用する場合)
            default: 'arcade', // 使用する物理エンジン
            arcade: {
                gravity: { y: 0 }, // 重力
                debug: true // デバックモード
            }
        },
    };
```
この状態で実行すると、MyScene1が自動実行され、MyScene2は実行されません。

## start()で遷移、launchで並列実行

この状態からSceneの切り替えを実行するにはstartかlaunchを使います。 
遷移（切り替えながらの実行）をしたければstartを、 呼び出し元のSceneと並行で実行したければlaunchを使います。


Myscene1のupdate()に、テキスト１をクリックしたら、MyScene2に遷移するように記述します。
```javascript
    update() {
        // クリックイベントを取得できるテキストオブジェクトを作成
        this.text1.on('pointerdown', function (pointer) {
            // クリックされたら、MyScene2を遷移実行する
            this.scene.start('MyScene2');
        }, this);
    }
```
また、並行実行も確認するために、テキスト２をクリックしたら、launch()が実行されるように記述します。
```javascript
   this.text2.on('pointerdown', function (pointer) {
			// MyScene2を遷移実行する
        this.scene.launch("MyScene2")
        }, this);	
	
```

## 総括
以上、シーンの基礎の基礎として登録と実行の方法を紹介いたしました。
基礎の基礎なのでまとめるほどの内容でもないかもしれませんが、 実行で肝要なのは

- コンストラクタでキーを設定
- GameConfig内でシーンを登録しておく 
- *startで遷移しながらの実行、Launchで並列実行

というところになります。
