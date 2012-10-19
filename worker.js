self.postMessage("I'm working befor postMessage().");

self.importScripts('game_engine.js');

self.game = new Game();

self.onmessage = function(event) {
    var data = event.data;
    
    var event = data.type;
    if(game[event]){
        game[event](data);
    }
    
  self.postMessage(self.game.frame());
};