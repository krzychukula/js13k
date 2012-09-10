var canvas, context, game;

init();
animate();

function init() {

    canvas = document.createElement( 'canvas' );
    
    canvas.width = 256;
    canvas.height = 256;

    context = canvas.getContext( '2d' );
    game = new Game(canvas, context);

    document.body.appendChild( canvas );
    //listeners
//    canvas.addEventListener('click', function(e) {
//         e.preventDefault();
//        game.mouse = game.getMouse(e);
//        game.addBullet = true;
//      }, true);
     canvas.addEventListener('mousemove', function(e) {
          e.preventDefault();
        game.mouse = game.getMouse(e);
                
      }, true);
     canvas.addEventListener('touchmove', function(e) {
          e.preventDefault();
        game.mouse = game.getMouse(e);
                
      }, true);

}

function animate(dt) {
    window.requestAnimationFrame( animate );
    game.draw(dt);

}

////

////TRASH

////

function convertToRadians(degree) {
    return degree*(Math.PI/180);
}

function draw(dt) {

    var time = dt * 0.002;
    var x = Math.sin( time ) * 30 + 128;
    var y = Math.cos( time * 1 ) * 50 + 128;

    context.fillStyle = 'rgb(245,245,245)';
    context.fillRect( 0, 0, 255, 255 );

    context.fillStyle = 'rgb(255,0,0)';
    context.beginPath();
    context.arc( x, y, 10, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();
    
    game.draw();
}