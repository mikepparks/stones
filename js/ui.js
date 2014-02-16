(function(gameEngine,ui) {
	ui.SLOT_TYPE = {
		'EMPTY': 0,
		'STONE': 1
	};

	ui.SLOT_OWNER = {
		'PLAYER': 0,
		'CPU': 1
	};

	ui.updateScore = function() {
		$('#scoreDisplay').text(gameEngine.score);
	};
	
	ui.updateTime = function() {
		var seconds = 0;
		var minutes = 0;
		$('#timeDisplay').text(minutes + ':' + seconds);
	};
	
	ui.buildStone = function(stoneObject) {
		var stoneSides = ['N','E','S','W'];
		var sidePoints = stoneObject.data('stone').side;
		
		for (var i = 0; i < gameEngine.logic.STONE_SIDE; ++i) {
			var currSide = $('<div>');
			
			currSide.addClass('side '+stoneSides[i]);
			
			stoneObject.append(currSide);
			
			for (var sideCount = 0; sideCount < sidePoints[i]; ++sideCount) currSide.append($('<div>').addClass('point'));
			
			var stoneSize,sideSize,marginSize;
			if ((stoneSides[i] == 'N') || (stoneSides[i] == 'S')) {
				stoneSize = stoneObject.width();
				sideSize = (currSide.find('.point').length > 0 ? currSide.find('.point').width() * sidePoints[i] : 0);
				marginSize = ((stoneSize - sideSize) / 2);
				
				currSide.css('left',marginSize+'px');
			} else {
				stoneSize = stoneObject.height();
				sideSize = (currSide.find('.point').length > 0 ? currSide.find('.point').height() * sidePoints[i] : 0);
				marginSize = ((stoneSize - sideSize) / 2);
				
				currSide.css('top',marginSize+'px');
			}
		}
	};
	
	ui.init = function() {
		console.log('Game UI Initializing...');
		
		ui.updateScore();
		
		gameEngine.field.find('.stoneSlot').each(function(i,o) {
			var currSlot = $(o);
			
			currSlot.attr('data-type', ui.SLOT_TYPE.EMPTY);
			currSlot.attr('data-selected',false);
			
			currSlot.click(function() {
				if (currSlot.attr('data-type') == ui.SLOT_TYPE.EMPTY) {
					// find the currently selected player slot
					var playerStone = gameEngine.playerSlots.find('.stoneSlot > .stone[data-selected="true"]');
					
					if (playerStone.length > 0) {
						var currStone = $('<div>');
						currStone.addClass('stone');
						currSlot.append(currStone);
						
						currStone.data('stone',playerStone.data('stone'));
						currStone.attr('data-owner',playerStone.data('owner'));
						currStone.attr('data-type',playerStone.attr('data-type'));
						currStone.text(playerStone.data('stone').type);
						
						ui.buildStone(currStone);
					
						playerStone.remove();
						
						console.dir(currStone.data());
					}
				} else {
				}
			});
		});
		
		//logic.playerStones
		gameEngine.playerSlots.find('.stoneSlot').each(function(i,o) {
			var currSlot = $(o);
			var currStone = $('<div>');
			currStone.addClass('stone');
			currSlot.append(currStone);
			
			currStone.data('stone', gameEngine.logic.playerStones[i]);
			currStone.attr('data-owner', ui.SLOT_OWNER.PLAYER);
			currStone.attr('data-type', ui.SLOT_TYPE.STONE);
			currStone.attr('data-selected',false);
			
			currStone.text(gameEngine.logic.playerStones[i].type);
			
			ui.buildStone(currStone);
			
			currStone.click(function() {
				if (currStone.attr('data-type') == ui.SLOT_TYPE.STONE) {
					gameEngine.playerSlots.find('.stoneSlot > .stone').not(currStone).attr('data-selected',false);
					gameEngine.playerSlots.find('.stoneSlot').not(currStone.parent('.stoneSlot')).attr('data-selected',false);
					currStone.attr('data-selected',true);
					currSlot.attr('data-selected',true);
				} else {
					currStone.attr('data-selected',false);
					currSlot.attr('data-selected',false);
				}
			});
		});
		
		console.log('Game UI Initialized.');
	};
})(window.gameEngine,window.gameEngine.ui = (window.gameEngine.ui || {}));