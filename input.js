window.Input = (function () {
    function Input (game, renderer) {
        this.game = game;
        this.renderer = renderer;
        
        //listeners
        function click(e) {
            e.preventDefault();
            game.click = e;
        }
        function move(e) {
            e.preventDefault();
            game.move = e;
        }
        renderer.canvas.addEventListener('click', click, true);
        renderer.canvas.addEventListener('touchstart', click, true);
        
        renderer.canvas.addEventListener('mousemove', move, true);
        renderer.canvas.addEventListener('touchmove', move, true);
    }
    
    
    return Input;
    
})();