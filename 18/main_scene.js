// 効果音のサンプル
class MainScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
        this.player=undefined;
        this.coinsGroup=undefined;
        this.starsGroup=undefined;
    }

    // シーンの事前読み込み処理
    preload() {
        this.load.image('star', 'assets/star.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('alien1', 'assets/alien1.png');
    }

    // シーン初期化処理
    create() {

        this.player = this.physics.add.image(D_WIDTH/2, D_HEIGHT/2+70, 'alien1');
        
        this.coinsGroup = this.physics.add.group();
        // コイングループ：for文2重ループを用いて2行9列で配置
        for(let i=0; i<2; i++){    
            for(let j=0; j<9; j++){    
                this.coinsGroup.create(50+j*70, 50+i*70,'coin' );
            }
        }

        this.bombsGroup = this.physics.add.group();
        //爆弾グループ  for文とcreateMultipleで配置
        for(let i=0; i<2; i++){    
               // 複数のGameObjectをグループに追加する
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
            this.bombsGroup.createMultiple({
                            key: 'bomb',
                            repeat: 8,
                            setXY: { x: 50, y: 200+i*70, stepX: 70 }
            })
        }
        
        // 星グループ：星を三行9列で斜めに表示させる
        this.starsGroup = this.physics.add.group();
        for(let i=0; i<3; i++){          
            // 複数のGameObjectをグループに追加する
            // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
            this.starsGroup.createMultiple({
                key: 'star',
                repeat: 8,
                setXY: { x: 50, y: 400+i*50, stepX: 70 , stepY: 10}
            })
        }
        // プレイヤーと衝突したら消去する
        this.physics.add.overlap(this.player, this.coinsGroup, function(p,c){c.destroy();}, null, this)
        // プレイヤーと衝突したら表示を消す、対象の物理エンジン処理を止める
        this.physics.add.overlap(this.player, this.starsGroup, function(p,s){s.disableBody(true, true);}, null, this)
    }

     // 毎フレーム実行される繰り返し処理
    update() {
        // let cursors = this.input.keyboard.createCursorKeys();
        this.arrow_move(this.input.keyboard.createCursorKeys(), this.player)

    }

     //矢印キーで移動 
     arrow_move(cursors, object){
    
        if(cursors.up.isDown){
            object.setVelocityY(-200);// 上方向の速度を設定
    
        }else if(cursors.down.isDown){
            object.setVelocityY(200);// 左方向の速度を設定
    
        }else if(cursors.left.isDown){
            object.setVelocityX(-200);// 左方向の速度を設定
    
        }else if(cursors.right.isDown){
            object.setVelocityX(200);// 右方向の速度を設定
    
        }else{
            object.setVelocityX(0);
            object.setVelocityY(0);
        }
    }

}

