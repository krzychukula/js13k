(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var canvas, context, game;





function Game(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = {x: this.width/2, y: 0};
    this.bullets = [];
    this.tower = new Tower(this.width/2, this.height, 10, 20, 'rgb(0,0,0)');
    this.viewfinder = new Viewfinder(0, 0, 20, 20, 'rgb(0,0,0)');
}
Game.prototype.clear = function(){
    this.ctx.fillStyle = 'rgb(245,245,245)';
    this.ctx.fillRect( 0, 0, 255, 255 );
}

Game.prototype.draw = function(){
    var shapes = this.shapes;
    this.clear();
 
    // ** Add stuff you want drawn in the background all the time here **
    this.tower.draw(this.ctx, this.mouse);
    this.viewfinder.draw(this.ctx, this.mouse);
 
    // draw all shapes
    var l = shapes.length;
    for (var i = 0; i < l; i++) {
      var shape = shapes[i];
      if(!shape) continue;
      // We can skip the drawing of elements that have moved off the screen:
      if (shape.x > this.width || shape.y > this.height ||
          shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
      shapes[i].draw(this.ctx);
    }
}
function Tower(x, y, w, h, fill) {
  // This is a very simple and unsafe constructor. 
  // All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || '#AAAAAA';
}
Tower.prototype.getRotate = function(mouse){
    //Math.atan(2);
    //tg = a/b
    var a = mouse.x - this.x;
   var b = mouse.y - this.y;
   var tg = a/b;
   var atan = -Math.PI*2-Math.atan(tg);
   return atan;
}
Tower.prototype.draw = function(ctx, mouse){
    ctx.save();
    
    ctx.fillStyle = this.fill;
    context.beginPath();
    context.arc( this.x, this.y, 10, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();
    if(typeof mouse !== "undefined"){
           //Math.atan(2);
           //tg = a/b
           var atan = this.getRotate(mouse);
           ctx.translate(this.x, this.y);
           ctx.rotate(atan);
           ctx.fillRect(0-this.w/2, 0-this.h, this.w, this.h);
           
    }
    //ctx.fillStyle = '#AA00AA';
    //ctx.fillRect(this.x - this.w /2, this.y - this.h, this.w, this.h);
        
    ctx.restore();
}

//from introduction to canvas http://simonsarris.com/blog/510-making-html5-canvas-useful

// Constructor for Shape objects to hold data for all drawn objects.
// For now they will just be defined as rectangles.
function Bullet(x, y, w, angle, fill) {
  // This is a very simple and unsafe constructor. 
  // All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.angle = angle || 0;
  this.fill = fill || '#AAAAAA';
}
 
// Draws this shape to a given context
Bullet.prototype.draw = function(ctx) {
  ctx.fillStyle = this.fill;
    context.beginPath();
    context.arc( this.x, this.y, this.w, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();
  //ctx.fillRect(this.x, this.y, this.w, this.h);
};

function Viewfinder(x, y, w, h, fill) {
  // This is a very simple and unsafe constructor. 
  // All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || '#AAAAAA';
}
 
// Draws this shape to a given context
Viewfinder.prototype.draw = function(ctx, mouse) {
  
    if(typeof mouse !== "undefined"){
        ctx.strokeStyle = this.fill;
        context.beginPath();
        context.arc( mouse.x, mouse.y, this.w, 0, Math.PI * 2, true );
        context.closePath();
        context.stroke();
    }
    
    
  //ctx.fillRect(this.x, this.y, this.w, this.h);
};

Game.prototype.getMouse = function(e) {
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;
 
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }
 
  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  //offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  //offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
 
  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
 
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}



// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/


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
    canvas.addEventListener('click', function(e) {
        var mouse = game.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        //todo
        game.shapes.push( new Bullet(mx, my, 10, 10, 'rgba(127, 255, 212, .5)') );
      }, true);
     canvas.addEventListener('mousemove', function(e) {
        game.mouse = game.getMouse(e);
                
      }, true);

}

function animate(dt) {
    requestAnimationFrame( animate );
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