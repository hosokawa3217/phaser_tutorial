// import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload()
    {
    }

    create()
    {
        this.cameras.main.setBackgroundColor("#333388");
        this.add.text(200, 200, 'Hello World', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"}); 

    }
}
