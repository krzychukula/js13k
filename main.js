var canvas, context, game, renderer, input;

init();
animate();

function init() {
    var width = 480;//240;//640;
    var height = 640;//320;//960;

    var dw = window.innerWidth / window.devicePixelRatio;
    var dh = window.innerHeight / window.devicePixelRatio;

    width = (dw < width) ? dw : width;
    height = (dh < height) ? dh : height;


//    canvas = document.createElement( 'canvas' );
//
//    canvas.width = width;
//    canvas.height = height;
//
//    context = canvas.getContext( '2d' );


    //game = new Game(canvas, context, width, height);
    var gameWorker = new Worker('worker.js');
    gameWorker.addEventListener('message', function(event) {
        console.log("Called back by the worker!\n", event.data);
        gameWorker.data = event.data;
    }, false);
     
    gameWorker.postMessage({type: "setSize", width: width, height:height}); // start the worker.

    renderer = new Renderer(gameWorker, width, height);
    input = new Input(gameWorker, renderer);

}

function animate(dt) {
    window.requestAnimationFrame( animate );
    renderer.frame(dt);

}
