# phaser チュートリアル
JavaScript ゲームフレームワーク phaser のチュートリアル　

##　概要
スプライトアニメーションを実装するコード例

## Github Pages
https://hosokawa3217.github.io/phaser_tutorial/index17.html

```js

    this.anims.create({
    //左キーを押したとき
        key: 'left',
        //配列番号0から3番を
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //10フレームごとに順繰りに表示して
        frameRate: 10,
        //アニメーションをループする。
        repeat: -1
    });

    //  右キーを押すとスプライトシートの5-8がループするアニメが流れる
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // X方向に1秒で0進むとスプライトシート4のturnがループで流れる
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });


```