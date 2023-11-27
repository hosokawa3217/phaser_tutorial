# phaser チュートリアル
JavaScript ゲームフレームワーク phaser のチュートリアル　

###15.コンテナ
ゲームームオブジェクト
[https://hosokawa3217.github.io/phaser_tutorial/index15.html](サンプル)

container()は初期位置とオブジェクトを指定する
```javascript
container = this.add.container(100, 100, [obj,hpBar]);
```

オブジェクトに設定してある位置や角度などの情報は作成したコンテナを親にした関係になり、重力や物理演算などの挙動もコンテナ単位で設定可能
```javascript
this.physics.world.enable(container);
container.body.setGravityY(300).setBounce(0.5).setCollideWorldBounds(true);
```