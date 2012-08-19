(function(exports){

    var k = exports.k = exports.k || {};
    k.utils = {};
    k.height = 480;//1280;
    k.width  = 320;//720;
    k.hh = k.height/2;
    k.hw = k.width/2;
    k.pos = {
        x: k.hw,
        y: k.hh
    };

    k.draw = function(){
        k.utils.clearCanvas();

        var posText = "x:"+k.pos.x+" y:"+k.pos.y;
        k.utils.drawText(posText, {bottom: true});

        k.utils.drawCircle(k.pos.x, k.pos.y, 30);

        k.utils.drawText("Hello!");

        requestAnimationFrame(k.draw);
    };

    k.init = function(ev) {

        k.canvas = document.getElementById('c');
        k.c = k.canvas.getContext('2d');
        // your code
        k.utils.setCanvasSize();


        k.canvas.addEventListener('click', k.utils.captureClick, false);
        // prevent elastic scrolling
        document.body.addEventListener('touchmove',function(event){
            event.preventDefault();
        },false);   // end body.onTouchMove

        requestAnimationFrame(k.draw);
    };


    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', k.init , false);
    }

})( window );


    // canvas.addEventListener('click', exports.getPosition, false);
    // // attach the touchstart, touchmove, touchend event listeners.
    // canvas.addEventListener('touchstart', exports.getPosition, false);
    // canvas.addEventListener('touchmove', exports.getPosition, false);
    // canvas.addEventListener('touchend', exports.getPosition, false);