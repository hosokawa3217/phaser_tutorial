// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {

    
    // time=Phaser.time; //時間クラス　

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('alien1', 'assets/alien1.png');
        this.load.image('alien2', 'assets/alien2.png');
        this.load.image('alien3', 'assets/alien3.png');
        this.load.image('platform', 'assets/platform.png');//w:400,h:32
    }

    // シーン初期化処理
    create() {
        // 単体画像をシーンに追加(X座標,Y座標,画像名)
        // this.add.image(D_WIDTH/2,D_HEIGHT/2, 'platform');
        const platform = this.physics.add.staticSprite(D_WIDTH/2,D_HEIGHT/2, 'platform');

        platform.setScale(2, 0.5);
        platform.refreshBody();
    
        const alien1 = this.physics.add.sprite(D_WIDTH/2, D_HEIGHT/4-30, 'alien1');
        const alien2 = this.physics.add.sprite(D_WIDTH/2-40,D_HEIGHT/4+30, 'alien2');
        const alien3 = this.physics.add.sprite(D_WIDTH/2+40, D_HEIGHT/4+30, 'alien3');

        let group = this.physics.add.group();
        group.setXY(0, 100);
        
        group.add(alien1);
        group.add(alien2);
        group.add(alien3);

        // group.setXY(200, 100);
        // group.addMultiple([ alien1, alien2, alien3 ]);
        group.angle(30);
        group.setVelocityX(30);
        
        let group_children = group.getChildren();
        group_children.forEach(element => {
            element.setBounce(1.2);
            element.setCollideWorldBounds(true);
            element.setMaxVelocity(200,200);
        });


        // NG group.setBounce(0.5);
        // NG group.setCollideWorldBounds(true);

        // this.physics.world.enable(container);
        // // setCollideWorldBounds:このボディがワールド境界と衝突するかどうかを設定
        // container.body.setBounce(0.5).setCollideWorldBounds(true);
        // container.body.setVelocityX(100);

        this.physics.add.collider( group, platform);
        // this.physics.add.collider(  [ alien1, alien2, alien3 ], ground);
        // this.physics.add.image(350, 450, 'platform', null, { isStatic: true }).setScale(2, 0.5).setAngle(10);
        // this.physics.add.collider(physicsContainer, platform);// 静止物の衝突処理を設定する
        // const platform = this.physics.add.image(350, 450, 'platform', null, { isStatic: true })
        // platform.setScale(2, 0.5).setAngle(10);
    }

     // 毎フレーム実行される繰り返し処理
    update(time, delta) {

        // this.physics.world.collide(this.physicsContainer, [ this.platform ]);
    }

}

