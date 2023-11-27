// 効果音のサンプル
class MainScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }

    // シーンの事前読み込み処理
    preload() {
        this.load.image('star', 'assets/star.png');
        this.load.image('alien1', 'assets/alien1.png');
        
    }

    // シーン初期化処理
    create() {
        const alien1 = this.add.image(0, 20, 'alien1');
        const image1 = this.add.image(0, -30, 'star');
        const image2 = this.add.image(30, 30, 'star');
        const image3 = this.add.image(-50, 30, 'star');
        // コンテナに格納
        this.container = this.add.container(200, 200, [ alien1, image1, image2, image3 ]);
        // コンテナを物理演算の対象とする
        this.physics.world.enable(this.container);
        // コンテナの大きさはデフォルトで０なので、コンテナの大きさを再定義する
        this.container.setSize(60, 60);
        // コンテナに速度ベクトルを与える。setBounceによる弾性を与える。setCollideWorldBoundsにより画面の境界で反射するようにする
        this.container.body.setVelocity(100, -200).setBounce(1, 0.99).setCollideWorldBounds(true);
        
    }

     // 毎フレーム実行される繰り返し処理
    update() {
        if (this.container.body.velocity.x < 0)
        {
            this.container.rotation -= 0.02;
        }
        else
        {
            this.container.rotation += 0.02;
        }

    }

     //矢印キーで移動 
     arrow_move(cursors, object){
    
        if(cursors.up.isDown){
            object.setVelocityY(-200);// 上方向の速度を設定
             //  効果音をならす
            this.jump_sound.play();
            
        }else if(cursors.left.isDown){
            object.setVelocityX(-200);// 左方向の速度を設定
    
    
        }else if(cursors.right.isDown){
            object.setVelocityX(200);// 右方向の速度を設定
    
        }else{
            // object.setVelocityX(0);
            // object.setVelocityY(0);
        }
    }

}

