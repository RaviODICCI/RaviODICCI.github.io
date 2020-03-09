(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window._score = 0;

window.onload = function () {
  var game;
  var w = 520;
  var h = 750;
  var innerWidth = window.innerWidth * window.devicePixelRatio;
  var innerHeight = window.innerHeight * window.devicePixelRatio;
  var gameRatio = innerHeight/h;
  if(innerHeight < h && gameRatio > 0){
    w = w*gameRatio;
    h = h*gameRatio;
  }
  game = new Phaser.Game(w,h , Phaser.AUTO, 'catch-game');


  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));


  game.state.start('boot');

};

},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';


function Boot() {
console.log("here");
}

Boot.prototype = {

  preload: function() {
    this.game.load.crossOrigin = "Anonymous";
    this.load.image('preloader', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.input.addPointer();
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {
  this.promoCodes =  "GOTBALLS";
  this.playagain;
  this.titleText = "";
  this.style = { font: '85px Arial', fill: '#006CD1', align: 'center'};
}

GameOver.prototype = {

  preload: function () {
  },
  create: function () {
    var bg = null;

    if(_score == 0 || _score < 0){
      bg = this.add.sprite(0, 0, 'game-over');
      //TODO: convert to shared button
      this.game.add.button(this.game.world.centerX, 615, 'restart', this.playAgain, this, 2, 1, 0).anchor.setTo(0.5, 0.5);
    } else if(_score > 0){
      bg = this.add.sprite(0, 0, 'winner');

      this.game.add.button(this.game.world.centerX, 490, 'enter', this.enterEmail, this, 2, 1, 0).anchor.setTo(0.5, 0.5);
      this.game.add.button(this.game.world.centerX, 560, 'restart', this.playAgain, this, 2, 1, 0).anchor.setTo(0.5, 0.5);
      this.titleText = this.game.add.text(this.game.world.centerX-10, 315, _score, this.style);
      this.titleText.anchor.setTo(0.5, 0.5);
    }
    bg.alpha = 0;
    this.game.add.tween(bg).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.addTerms();
    //
    // this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    // this.congratsText.anchor.setTo(0.5, 0.5);
    //
    // this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    // this.instructionText.anchor.setTo(0.5, 0.5);

  },
  reder: function(){
    game.debug.body();
  },
  update: function () {
    // if(this.game.input.activePointer.justPressed()) {
    //
    // }
    /** TODO: when email successfully fired, change sprite to winner with % and coupon **/
  },
  playAgain: function () {
    _score = 0;
    this.game.state.start('play');
  }, enterEmail: function () {
    this.add.sprite(0, 0, 'winner-code');
    this.game.add.text(this.game.world.centerX-10, 315, _score, this.style).anchor.setTo(0.5, 0.5);
    var couponCode = this.promoCodes+_score;
    this.game.add.text(this.game.world.centerX, 565, couponCode, { font: '45px Arial', fill: '#006CD1', align: 'center'}).anchor.setTo(0.5, 0.5);
    /* Submit email to yieldify */
    this.game.add.button(this.game.world.centerX, 645, 'continue', function(){ window.location.href="http://kitbag.com/stores/kitbag/en?yie_coupon=" + couponCode; }, this, 2, 1, 0).anchor.setTo(0.5, 0.5);
  },
  addTerms: function(){
    //define you region
    var topLeftQuarter = new Phaser.Rectangle(60,this.game.height-50,this.game.width-150,25);

    //listen for pointers
    this.game.input.onDown.add(function(pointer){
        //this is the test, contains test for a point belonging to a rect definition
        var inside = topLeftQuarter.contains(pointer.x,pointer.y)
        //function(){ window.location.href="http://kitbag.com/stores/kitbag/en/help?hpg-terms"; }
        console.log('pointer is inside region top left quarter', inside)
    })
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.add.sprite(0, 0, 'main');
    // this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'drop');
    // this.sprite.anchor.setTo(0.5, 0.5);

    //this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    //this.titleText.anchor.setTo(0.5, 0.5);

    // this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    // this.instructionsText.anchor.setTo(0.5, 0.5);

    // this.sprite.angle = -20;
    // this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

  },
  render: function(){
    //this.game.debug.spriteBounds(this.myInput);
  },
  update: function() {
     if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
     }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

'use strict';


function Play() {
	this._player = null;
	this._dropGroup = null;
	this._spawnDropTimer = 0;
	this._fontStyle = null;
	this.GAME_LENGTH = 15;

	// define variables to reuse them in item functions
	Play._scoreText = null;
	_score = 0;
	Play._health = 0;

	Play.clock = this.GAME_LENGTH;
	Play.countDownText, this.timerEvent;

}


Play.prototype = {
  create: function() {
    // start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 500;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'background');
		// this.add.sprite(10, 5, 'score-bg');
		// add pause button
		//this.add.button(Play.width-96-10, 5, 'button-pause', this.managePause, this);
		//Timer
		Play.countDownText = this.add.text(290, 65, "--:--", { font: "25px Arial", fill: "#fff", stroke: "#000", strokeThickness: 5, align: "center" });
		this.timerEvent = this.time.events.loop(Phaser.Timer.SECOND, this.tick);

  this.scale.pageAlignHorizontally = true;

		// create the player
		this._player = this.add.sprite(0, this.game.height-70, 'catcher');
		this._player.anchor.setTo(0.5, 0.5);
		this.game.physics.enable(this._player, Phaser.Physics.ARCADE);
		this._player.body.immovable = true;
		this._player.body.allowGravity = false;
		this._player.setCollision;
		this._player.scale.set(.8);
		this._player.body.setSize(75,50,0,0);
		// add player animation
		//this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
		//this._player.animations.play('idle');
		// set font style
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn timer
		this._spawnPlayTimer = 0;
		// initialize the score text with 0
		Play._scoreText = this.add.text(150, 55, "0", this._fontStyle);
		// set health of the player
		Play._health = 10;
		// create new group for candy
		this._dropGroup = this.add.group();
		this._dropGroup.enableBody = true;
		this._dropGroup.physicsBodyType = Phaser.Physics.ARCADE;
		// spawn first candy
		Play.item.spawnDrop(this);

  },
	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
 tick : function(){
	 Play.clock -= 1;
	  if(Play.clock < 10) {
				Play.clock = "0" + Play.clock;
			}
	  if(Play.clock === 0) {
	    //To remove event:
	    Play.clock = 0;
		    Play.countDownText.setText("00:00");
	  } else {
	    Play.countDownText.setText("00:" + Play.clock);
	  }
 },
	collisionHandler: function(player, drop){
		console.log(">>", player, drop);
		console.log('YAYYYYYYYYY');
		this.game.add.tween(player).to( { y: player.position.y + 10 }, 100, Phaser.Easing.Back.InOut, true, 0, 0, true);
   //this.game.add.tween(player).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
		drop.kill();
		// add points to the score
		_score += drop.points;
		console.log(drop.points)
		// update score text
		this.checkGameOver();
		Play._scoreText.setText(_score);
	},
	checkGameOver: function(game) {
		// if the health of the player drops to 0, the player dies = game over
		if(Play.clock == 0 || _score == 10  ) {
			var screen = "";
			console.log("GAME OVERRRRR");
			// show the game over message
			if(_score == 0 || _score < 0) {
				screen = "game-over"
		 } else {
			 screen = "winner"
		 }
		 //this.add.sprite(0, 0, screen);
			// pause the game
			//this.game.paused = true;
			this.game.time.events.remove(this.timerEvent);
			this.game.state.clearCurrentState();
		 this.game.state.start("gameover");
	 }
	},
	update: function(){
		// update timer every frame
		this._spawnPlayTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnPlayTimer > 2500 && this._dropGroup.total < 2) {
			// reset it
			this._spawnPlayTimer = 0;
			// and spawn new candy
			Play.item.spawnDrop(this);
		}
		//catcher follow mouse
    
		if(this.game.input.mousePointer.worldX > 100 || this.game.input.mousePointer.worldX < this.game.width - 100){
				this._player.x = this.game.input.mousePointer.worldX;
		}

		// loop through all candy on the screen
		this._dropGroup.forEach(function(drop){
			// to rotate them accordingly
			drop.angle += drop.rotateMe;
		});
		this.checkGameOver();
		this.physics.arcade.collide(this._player, this._dropGroup, this.collisionHandler, null, this);
	},
	render: function() {
// this.game.debug.body(this._player, 'rgba(0, 255, 255, 0.5)');
//  this._dropGroup.forEachAlive(this.renderGroup, this);
	},
	renderGroup: function(member){
		this.game.debug.body(member);

	},
	shutdown: function() {
		Play.clock = this.GAME_LENGTH;
		this._player.destroy();
		this._dropGroup.destroy();
	}
};

Play.item = {
	spawnDrop: function(that){
		console.log(this)
		console.log(that)
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = 120 + Math.floor(Math.random()*(that.game.width - 240));
		// define the offset for every candy
		//var dropOffset = [-27,-36,-36,-38,-48];
		// randomize candy type
	 // var candyType = Math.floor(Math.random()*5);
		// create new candy
		var dropBall = (Math.random() < 0.7 ? "drop" : "drop-negative");
		var candy = that.game.add.sprite(dropPos,120, dropBall);
		// add new animation frame
		//candy.animations.add('anim', [candyType], 10, true, false);
		// play the newly created animation
		//candy.animations.play('anim');
		// enable candy body for physic engine
		that.game.physics.enable(candy, Phaser.Physics.ARCADE);
		// enable candy to be clicked/tapped
		//candy.inputEnabled = true;
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removePlay, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		//set setSize
		candy.body.setSize(50,50,0,0);
		//vel
		candy.body.velocity.x = (Math.random() < 0.5 ? -1 : 1) * 90 * (Math.random());
		candy.body.velocity.y = -200 * (Math.random() * .5);
		candy.points = (dropBall == "drop" ? 1 : -1);
		// add candy to the group
		that._dropGroup.add(candy);
	},
	removePlay: function(candy){
		// kill the candy
		candy.kill();
		// decrease player's health
		//Play._health -= 10;
	}
};


module.exports = Play;

},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.game.load.crossOrigin = "Anonymous";
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    this.load.image('drop', '//newdicci-prod-uk.s3.amazonaws.com/images/imgs/000/009/826/cropped/present.png?1573951826');
    this.load.image('drop-negative', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/drop-negative.png');
    this.load.image('catcher', 'https://newdicci-prod-uk.s3.amazonaws.com/images/imgs/000/009/772/cropped/0aunjai-1_copy.png');

    this.stage.backgroundColor = '#B4D9E7';

    // load images
    this.load.image('background', '//newdicci-prod-uk.s3.amazonaws.com/images/imgs/000/009/825/cropped/background_catch.png?1573950669');
    this.load.image('main', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/main-menu.png');
    this.load.image('game-over', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/menu-lose.png');
    this.load.image('winner', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/menu-winning.png');
    this.load.image('winner-code', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/menu-code.png');
    this.load.image('winner-email', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/menu-winningemail.png');
    this.load.image('restart', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/btn-playagain.png');
    this.load.image('enter', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/btn-enter.png');
    this.load.image('continue', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/btn-continue.png');
    this.load.image('start', '//yieldify-static-files.s3.amazonaws.com/kitbag/game/assets/btn-start.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 260;
    this.scale.minHeight = 375;
    this.scale.pageAlignHorizontally = true;

  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])