(function(gameEngine) {
	gameEngine.field = {};
	gameEngine.playerSlots = {};
	
	gameEngine.score = 0;
	gameEngine.timer = 0;
	gameEngine.pause = false;

	var timerHandle;

	gameEngine.updateScore = function(scoreInc) {
		if (!gameEngine.pause) {
			gameEngine.score+=scoreInc;
			gameEngine.ui.updateScore();
		}
	};

	gameEngine.updateTime = function() {
		gameEngine.logic.update();
		if (!gameEngine.pause) {
			++gameEngine.timer;
			gameEngine.ui.updateTime();
		}
	};

	gameEngine.gameInit = function() {
		gameEngine.logic.init();
		gameEngine.ui.init();
		gameEngine.ai.init();

		timerHandle = setInterval(gameEngine.updateTime,1000);
		gameEngine.ui.updateTime();
	};

	gameEngine.init = function(field,playerSlots) {
		console.log('Game Engine Initializing...');

		gameEngine.field = field;
		gameEngine.playerSlots = playerSlots;
		
		$('#startGame').click(function() {
			$(this).hide();
			gameEngine.gameInit();
			gameEngine.ui.updateScore();
		});

		console.log('Game Engine Initialized.');
	};
})(window.gameEngine = (window.gameEngine || {}));