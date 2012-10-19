window.Renderer = (function () {
    function Renderer (game, width, height) {

        this.game = game;
        this.width = width;
        this.height = height;
        
        this.canvas = document.createElement( 'canvas' );

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext( '2d' );

        document.body.appendChild( this.canvas );
    }
    
    Renderer.prototype.image = new Image();
    Renderer.prototype.image.src = 'data:image/  png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AkLDSMPVfdqJwAAAWRJREFUOMttk79rwlAQxz9B5UEEFwmCZigGMhQydyiEjkKhf1P/HbeOmfo3FC2CgpkMFDIIAVOC2nSwl96L3vbuvbv7/rjnHA5v9XZXkaU5k6lH4Btcd4BEWRZsdxWBb9juqiYvZ2exntf6UjeSQmkozbI0B2Ay9ei8PD+9njqGwDfsizOPD3eMhn2Ox4p9cebz44vvHxgN+/R6htGwz3hsOHUMWZrj1PV7LZ11BL4BuJnXlJzFel5naU4c+xY8gDj2AXDdAUmyas6SA+gKF4Ao9Kzp+uFsdm8hKcsCwKYgha47sAQTUdt3AI7YKNNvqa1RiivyxrIxS3MLqsDU6DSthkKSrJop7YUqy6IpWG5ya6Gi0Ls0WG7yK+v0Qz29bauzWM/rKPSsSRq+LrxlcTfwDf8ILsKIoHqaXl+txdVfaG+bjraFzSK14YH3d/Zaol2aRCEN5W4bnqgvumgK4pA4UJYFvxvMELAqKY7sAAAAAElFTkSuQmCC';
    
    Renderer.prototype.clear = function(){
        this.ctx.fillStyle = 'rgb(245,245,245)';
        this.ctx.fillRect( 0, 0, this.width, this.height );    
    };
    
    Renderer.prototype.tile = function(){
        if(!this.tileCanvas){
            this.tileCanvas = document.createElement( 'canvas' );
    
            this.tileCanvas.width = this.width;
            this.tileCanvas.height = this.height;
    
            this.tileCanvasCtx = this.tileCanvas.getContext( '2d' );
            //this.tileCanvasCtx.fillStyle = 'rgb(245,245,245)';
    
            for (var x = 0; x <= this.width; x = x + 16) {
                for (var y = 0; y <= this.height; y = y + 16) {
                    this.tileCanvasCtx.drawImage(this.image, x, y);
                }
            }
            //document.body.appendChild( this.tileCanvas );
        }
    
        this.ctx.drawImage(this.tileCanvas, 0, 0);
    
    };
    
    Renderer.prototype.frame = function(dt){
        //this.game.frame(dt);
        
        this.game.postMessage({type: "frame", diff: dt});
        
        //from last frame;
        this.game.data
        
        
        //this.clear();
        this.tile();
    }
    
    return Renderer;
    
})();