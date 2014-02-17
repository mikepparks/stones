(function(gameEngine,ai) {

	ai.init = function() {
	};
	
	ai.makeMove = function() {
		// find open space
		var availableSlots = gameEngine.field.find('.stoneSlot:empty');
		var currSlot = $(availableSlots.get(gameEngine.utils.rand(availableSlots.length)));
		var currStoneData;
		
		if (gameEngine.logic.cpuStones.length > 0) {
			currStoneData = gameEngine.logic.cpuStones.pop();
		} else {
			return;
		}
		
		var currStone = $('<div>');
		currStone.addClass('stone');
		currSlot.append(currStone);
		
		currStone.data('stone', currStoneData);
		currStone.attr('data-owner', gameEngine.ui.SLOT_OWNER.CPU);
		currStone.attr('data-type', gameEngine.ui.SLOT_TYPE.STONE);
		currSlot.attr('data-type', gameEngine.ui.SLOT_TYPE.STONE);
		currStone.attr('data-icon',currStoneData.type);
		currStone.attr('data-selected',false);
		
		//currStone.text(currStoneData.type);
		
		gameEngine.ui.buildStone(currStone);
		
		gameEngine.logic.endTurn((currSlot.length > 0 ? currSlot : null));
	}
	
})(window.gameEngine,window.gameEngine.ai = (window.gameEngine.ai || {}));