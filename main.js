var canvas, context, game;

init();
animate();

function init() {
    var width = 640;
    var height = 960;

    width = (document.width < width) ? document.width : width;
    height = (document.height < height) ? document.height : height;


    canvas = document.createElement( 'canvas' );

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext( '2d' );


    game = new Game(canvas, context, width, height);
    document.body.appendChild( canvas );
    //listeners
    function addBullet(e) {
        e.preventDefault();
        game.e = e;
        game.addBullet = true;
    }
    function move(e) {
        e.preventDefault();
        game.e = e;
    }
    canvas.addEventListener('click', addBullet, true);
    canvas.addEventListener('touchstart', addBullet, true);
     //canvas.addEventListener('mousemove', move, true);
     //canvas.addEventListener('touchmove', move, true);

}

function animate(dt) {
    window.requestAnimationFrame( animate );
    game.frame(dt);

}
