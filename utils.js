(function(exports, cfg) {
	exports.setCanvasSize = function(){
		//todo preserve proportions
		cfg.canvas.width = cfg.width;
		cfg.canvas.height = cfg.height;
	};
	exports.captureClick = function(e){
		//todo preserve proportions
		e.preventDefault();
		var tx = (e.pageX - (k.canvas.offsetLeft ? k.canvas.offsetLeft : 0));
		var ty = (e.pageY - (k.canvas.offsetTop ? k.canvas.offsetTop : 0));
		cfg.pos = {
			x: tx,
			y: ty
		};
	};

	exports.drawText = function(text, cfg){
		k.c.fillStyle = "white";
		var fontHeigth = 30;
        k.c.font = "italic "+fontHeigth+"px Arial ";

        cfg = cfg || {};

        var metrics = k.c.measureText(text);
        var posX = k.hw - (metrics.width/2);
        var posY = k.hh;

        if(cfg.bottom){
			posY = k.height - fontHeigth;
        }

        k.c.fillText(text, posX , posY);
	};
	exports.drawCircle = function(centerX, centerY, radius){
        k.c.beginPath();
        k.c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        k.c.fillStyle = "#8ED6FF";
        k.c.fill();
        k.c.lineWidth = 5;
        k.c.strokeStyle = "black";
        k.c.stroke();
	};
	exports.clearCanvas = function(){
		k.c.clearRect(0,0,k.width,k.height);
	};
})(k.utils, k);