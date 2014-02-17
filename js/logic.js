(function(gameEngine,logic) {
	logic.MAX_STONES = 5;
	logic.STONE_SIDE = 4;
	logic.MAX_SIDE = 3;

	logic.playerStones = [];
	logic.cpuStones = [];
	
	var usedPlayerStones = [];
	var usedCPUStones = [];
	
	logic.turn = -1;
	logic.playerUsedSlot = null;
	logic.cpuUsedSlot = null;
	
	var timerHandle;

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
		
		gameEngine.logic.turn = gameEngine.utils.randRange(0,1);
		
		timerHandle = setInterval(logic.updateTurn,1000);
		
		console.log('Game Logic Initialized.');
	};
	
	logic.checkConnecting = function(selectedSlot) {
		var stoneSides = ['N','E','S','W'];
		var selectedStone = selectedSlot.find('.stone');
		
		var slotN = gameEngine.field.find('.stoneSlot[data-x="'+(parseInt(selectedSlot.attr('data-x')))+'"][data-y="'+(parseInt(selectedSlot.attr('data-y'))-1)+'"]');
		var slotE = gameEngine.field.find('.stoneSlot[data-x="'+(parseInt(selectedSlot.attr('data-x'))+1)+'"][data-y="'+(parseInt(selectedSlot.attr('data-y')))+'"]');
		var slotS = gameEngine.field.find('.stoneSlot[data-x="'+(parseInt(selectedSlot.attr('data-x')))+'"][data-y="'+(parseInt(selectedSlot.attr('data-y'))+1)+'"]');
		var slotW = gameEngine.field.find('.stoneSlot[data-x="'+(parseInt(selectedSlot.attr('data-x'))-1)+'"][data-y="'+(parseInt(selectedSlot.attr('data-y')))+'"]');
		
		// check if slots contain a stone
		var stoneN = (slotN.find('.stone').length > 0 ? slotN.find('.stone') : null);
		var stoneE = (slotE.find('.stone').length > 0 ? slotE.find('.stone') : null);
		var stoneS = (slotS.find('.stone').length > 0 ? slotS.find('.stone') : null);
		var stoneW = (slotW.find('.stone').length > 0 ? slotW.find('.stone') : null);
		
		// for N, check S side
		var selectedWinsN = ((stoneN !== null) && (selectedStone.data('stone').side[stoneSides.indexOf('N')] > stoneN.data('stone').side[stoneSides.indexOf('S')]));

		// for E, check W side
		var selectedWinsE = ((stoneE !== null) && (selectedStone.data('stone').side[stoneSides.indexOf('E')] > stoneE.data('stone').side[stoneSides.indexOf('W')]));
		
		// for S, check N side
		var selectedWinsS = ((stoneS !== null) && (selectedStone.data('stone').side[stoneSides.indexOf('S')] > stoneS.data('stone').side[stoneSides.indexOf('N')]));
		
		// for W, check E side
		var selectedWinsW = ((stoneW !== null) && (selectedStone.data('stone').side[stoneSides.indexOf('W')] > stoneW.data('stone').side[stoneSides.indexOf('E')]));
		
		// now set flip state
		if ((stoneN !== null) && (stoneN.attr('data-owner') != selectedStone.attr('data-owner')) && selectedWinsN) stoneN.attr('data-owner',selectedStone.attr('data-owner'));
		if ((stoneE !== null) && (stoneE.attr('data-owner') != selectedStone.attr('data-owner')) && selectedWinsE) stoneE.attr('data-owner',selectedStone.attr('data-owner'));
		if ((stoneS !== null) && (stoneS.attr('data-owner') != selectedStone.attr('data-owner')) && selectedWinsS) stoneS.attr('data-owner',selectedStone.attr('data-owner'));
		if ((stoneW !== null) && (stoneW.attr('data-owner') != selectedStone.attr('data-owner')) && selectedWinsW) stoneW.attr('data-owner',selectedStone.attr('data-owner'));
	};
	
	logic.updateTurn = function() {
		// check if field is full
		if (gameEngine.field.find('.stoneSlot:empty').length == 0) {
			clearInterval(timerHandle);
			console.log('Game Over');
		}

		// process previous turn
		if (logic.playerUsedSlot != null) {
			console.log('Player played turn');
			logic.checkConnecting(logic.playerUsedSlot);
			logic.playerUsedSlot = null;
		}
		
		if (logic.cpuUsedSlot != null) {
			console.log('CPU played turn');
			logic.checkConnecting(logic.cpuUsedSlot);
			logic.cpuUsedSlot = null;
		}
	
		// handle turns
		if (logic.turn == gameEngine.ui.SLOT_OWNER.PLAYER) {
			// wait
		} else if (logic.turn == gameEngine.ui.SLOT_OWNER.CPU) {
			// make CPU play a turn
			gameEngine.ai.makeMove();
		}
		
		gameEngine.ui.updateScore();
	};
	
	logic.endTurn = function(usedSlot) {
		if (logic.turn == gameEngine.ui.SLOT_OWNER.PLAYER) {
			logic.turn = gameEngine.ui.SLOT_OWNER.CPU;
			logic.playerUsedSlot = usedSlot;
		} else if (logic.turn == gameEngine.ui.SLOT_OWNER.CPU) {
			logic.turn = gameEngine.ui.SLOT_OWNER.PLAYER;
			logic.cpuUsedSlot = usedSlot;
		} else {
			// game not running
		}
	}
	
})(window.gameEngine,window.gameEngine.logic = (window.gameEngine.logic || {}));