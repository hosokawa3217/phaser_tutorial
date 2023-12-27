# phaser チュートリアル
JavaScript ゲームフレームワーク phaser のチュートリアル　

###15.コンテナでゲームームオブジェクトをまとめる
repository
https://github.com/hosokawa3217/phaser_tutorial/tree/main/18

Github Pages
https://hosokawa3217.github.io/phaser_tutorial/index18.html



複数のゲームオブジェクトをグループに登録する例
```javascript

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
    
```