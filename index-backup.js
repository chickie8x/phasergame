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
	scene: {
		preload,
		create,
		update,
	}
};

var game = new Phaser.Game(config);

const score = {
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
var bird;
var scoreDisplay;
var base;
var gameStart = false

/** Load assets into RAM */
function preload() {
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
function create() {
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
	bird = this.physics.add.sprite(144, 256, 'bird1').play('bird')
	bird.body.allowGravity = false
	bird.setCollideWorldBounds(true);
	const styleText = {
		fontFamily: 'Arial',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: '20px'
	}
	let textStart = this.add.text(80, 140, 'Touch to start', styleText)
	textStart.setAlign('center')
	base = this.physics.add.staticGroup();
	base = this.add.tileSprite(168, 456, 336, 112, 'base');
	this.keyPress = this.input.keyboard.on('keydown', function (event) {
		if (event.code === 'Space') {
			bird.body.allowGravity = true
			bird.body.velocity.y = -200
			gameStart = true
			textStart.destroy()
		}
	});
	this.physics.add.existing(base)
	base.body.collideWorldBounds = true
	base.body.immovable = true
	base.body.allowGravity = false
	base.body.setCollideWorldBounds = true
	base.body.onCollide = true
	base.body.collideWorldBounds = true;
}

/** runs in a loop, used to check for input changes */
function update() {
	base.tilePositionX += 2

}


