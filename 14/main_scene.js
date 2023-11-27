// 効果音のサンプル
class MainScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }

    // シーンの事前読み込み処理
    preload() {
        this.load.image('alien1', 'assets/alien1.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('block', 'assets/block.png');//w:400,h:32
        this.load.image('platform', 'assets/platform.png');//w:400,h:32
        // 効果音のロード
        this.load.audio('GOAL', '14/getstar_se.mp3');
        this.load.audio('JUMP', '14/jump_se.mp3');
        
    }

    // シーン初期化処理
    create() {
        //効果音の設定は　https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/を参照のこと
        this.goal_sound = this.sound.add('GOAL',{volume:0.1});
        this.jump_sound = this.sound.add('JUMP',{volume:0.2});
        
        const platform = this.physics.add.staticSprite(D_WIDTH/2,D_HEIGHT/2, 'platform');
        platform.setScale(2, 0.5);
        platform.refreshBody();
        const block = this.physics.add.staticSprite(D_WIDTH/2,D_HEIGHT/2 -20, 'block');

        let group = this.physics.add.staticGroup();
        group.add(platform);
        group.add(block);

        const alien1 = this.physics.add.sprite(100, D_HEIGHT/2 -50, 'alien1');
        this.alien1 = alien1;
        this.physics.add.collider( alien1, group);

        const star = this.physics.add.sprite(D_WIDTH-100, D_HEIGHT/2 -50, 'star');
        this.physics.add.collider( star, group);

         // 星に衝突したら
         this.physics.add.overlap(alien1, star, collectStar, null, this);
         function collectStar(p,star){  
             star.disableBody(true, true);
            //  効果音をならす
            this.goal_sound.play();

         }
    }

     // 毎フレーム実行される繰り返し処理
    update() {
        // エイリアンを矢印キーで移動させる
        this.arrow_move(this.input.keyboard.createCursorKeys(), this.alien1);

        //画面の右端にきたら移動停止
        if(this.alien1.x > D_WIDTH-50) this.alien1.setVelocityX(0);

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

