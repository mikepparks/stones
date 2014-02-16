(function(gameEngine,logic) {

	logic.update = function() {
		if (!gameEngine.pause) {
		}
	};

	logic.init = function() {
		console.log('Game Logic Initializing...');
		
		console.log('Game Logic Initialized.');
	};
})(window.gameEngine,window.gameEngine.logic = (window.gameEngine.logic || {}));