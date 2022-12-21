//@ts-check

class mainScreen extends Phaser.Scene {

	score = {
		0: '0.png',
		1: '1.png',
		2: '2.png',
		3: '3.png',
		4: '4.png',
		5: '5.png',
		6: '6.png',
		7: '7.png',
		8: '8.png',
		9: '9.png',
	}

	gameOver = false


	/** Load assets into RAM */
	preload() {
		this.load.image('background', './assets/sprites/background-day.png')
		this.load.image('bird1', './assets/sprites/bluebird-downflap.png')
		this.load.image('bird2', './assets/sprites/bluebird-midflap.png')
		this.load.image('bird3', './assets/sprites/bluebird-upflap.png')
		this.load.image('score', './assets/sprites/0.png')
		this.load.image('base', './assets/sprites/base.png')
		this.load.image('gameover', './assets/sprites/gameover.png')
		this.load.image('pipe', './assets/sprites/pipe-green.png')
	}

	/** Create and initialize scene components */
	create() {
		this.add.image(144, 256, 'background')
		this.anims.create({
			key: 'bird',
			frames: [
				{ key: 'bird1' },
				{ key: 'bird2' },
				{ key: 'bird3' }
			],
			frameRate: 10,
			repeat: -1
		})
		this.bird = this.physics.add.sprite(144, 256, 'bird1').play('bird')
		this.bird.body.allowGravity = false
		this.bird.setCollideWorldBounds(true);
		this.bird.setBounce(0.3)

		this.base = this.add.tileSprite(148, 456, 336,112, 'base');
		this.physics.add.existing(this.base, true);
    	this.physics.add.collider(this.bird, this.base, function(_bird, _base){
			
		});

		const styleText = {
			fontFamily: 'Arial',
			color: '#fff',
			fontWeight: 'bold',
			fontSize: '20px'
		}
		this.textStart = this.add.text(80, 140, 'Touch to start', styleText)
		this.textStart.setAlign('center')	
		this.keyPress = this.input.keyboard.on('keydown', function (event) {
			if (event.code === 'Space') {
				this.scene.bird.body.allowGravity = true
				this.scene.bird.body.velocity.y = -200
				this.scene.gameStart = true
				this.scene.textStart.destroy()
			}
		});
	}

	/** runs in a loop, used to check for input changes */
	update() {
		this.base.tilePositionX += 2
	}
}

// @ts-ignore
var config = {
	type: Phaser.AUTO,
	willReadFrequently: true,
	width: 288,
	height: 512,
	parent: 'game',
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 600 },
			debug: false,
		},
	},
	scene: mainScreen
};

var game = new Phaser.Game(config);