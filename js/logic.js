(function(gameEngine,logic) {
	logic.MAX_STONES = 5;
	logic.STONE_SIDE = 4;

	logic.playerStones = [];
	logic.cpuStones = [];
	
	var usedPlayerStones = [];
	var usedCPUStones = [];

	logic.update = function() {
		if (!gameEngine.pause) {
		}
	};
	
	logic.generateStone = function() {
		var stoneData = {};
		stoneData.side = [];
		
		stoneData.type = gameEngine.utils.randRange(1,20);

		for (var i = 0; i < logic.STONE_SIDE; ++i) {
			stoneData.side[i] = gameEngine.utils.randRange(0,4);
		}
		
		return stoneData;
	};
	
	logic.init = function() {
		console.log('Game Logic Initializing...');
		
		for (var i = 0; i < logic.MAX_STONES; ++i) {
			logic.playerStones[i] = logic.generateStone();
			while (usedPlayerStones.indexOf(logic.playerStones[i].type) > -1) {
				logic.playerStones[i] = logic.generateStone();
			}
			usedPlayerStones.push(logic.playerStones[i].type);
			
			logic.cpuStones[i] = logic.generateStone();
			while (usedCPUStones.indexOf(logic.cpuStones[i].type) > -1) {
				logic.cpuStones[i] = logic.generateStone();
			}
			usedCPUStones.push(logic.cpuStones[i].type);
		}
		
		console.log('Game Logic Initialized.');
	};
})(window.gameEngine,window.gameEngine.logic = (window.gameEngine.logic || {}));