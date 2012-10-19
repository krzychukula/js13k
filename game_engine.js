self.Game = (function () {
    function Game (width, height) {
        width = width || 100;
        height = height || 100;
        
        this.width = width;
        this.height = height;
    }
    
    Game.prototype.setSize = function(data){
        this.width = data.width;
        this.height = data.height;
    }
    
    Game.prototype.frame = function(dt){
        return 'hello from game! '+this.width+'x'+this.height;
    }
    
    return Game;
    
})();