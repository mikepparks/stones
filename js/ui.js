(function(gameEngine,ui) {
	ui.updateScore = function() {
		$('#scoreDisplay').text(gameEngine.score);
	};
	
	ui.updateTime = function() {
		var seconds = 0;
		var minutes = 0;
		$('#timeDisplay').text(minutes + ':' + seconds);
	};
	
	ui.init = function() {
		console.log('Game UI Initializing...');
		
		ui.updateScore();
		
		console.log('Game UI Initialized.');
	};
})(window.gameEngine,window.gameEngine.ui = (window.gameEngine.ui || {}));