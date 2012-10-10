var canvas, context, game;

init();
animate();

function init() {
    var width = 480;//240;//640;
    var height = 640;//320;//960;

    var dw = window.innerWidth / window.devicePixelRatio;
    var dh = window.innerHeight / window.devicePixelRatio;

    width = (dw < width) ? dw : width;
    height = (dh < height) ? dh : height;


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
    canvas.addEventListener('mousemove', move, true);
    canvas.addEventListener('touchmove', move, true);

}

function animate(dt) {
    window.requestAnimationFrame( animate );
    game.frame(dt);

}
