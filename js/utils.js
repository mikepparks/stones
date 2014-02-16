(function(gameEngine,utils) {
	utils.randRange = function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	utils.rand = function(max) {
		return utils.randRange(0,max-1);
	}
	
	utils.pad = function(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	
})(window.gameEngine,window.gameEngine.utils = (window.gameEngine.utils || {}));