window.Renderer = (function () {
    function Renderer (game, width, height) {

        this.game = game;
        this.width = width;
        this.height = height;


        this.canvas = document.createElement( 'canvas' );

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = canvas.getContext( '2d' );

        document.body.appendChild( canvas );
    }
})();