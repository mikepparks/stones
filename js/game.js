(function(gameEngine) {
	gameEngine.container = {};

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
		gameEngine.ui.init();
		gameEngine.logic.init();

		timerHandle = setInterval(gameEngine.updateTime,1000);
		gameEngine.ui.updateTime();
	};

	gameEngine.init = function(container) {
		console.log('Game Engine Initializing...');

		gameEngine.container = container;
		
		gameEngine.gameInit();

		console.log('Game Engine Initialized.');
	};
})(window.gameEngine = (window.gameEngine || {}));