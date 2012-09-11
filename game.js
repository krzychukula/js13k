
function Game(canvas, ctx){
    var that = this;
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = {x: this.width/2, y: 0};
    this.bullets = [];
    this.enemies = [];
    this.tower = new Tower(this.width/2, this.height, 10, 20, 'rgb(0,0,0)');
    this.viewfinder = new Viewfinder(0, 0, 20, 20, 'rgb(0,0,0)');
    this.toClean = 0;
    this.enemiesToClean = 0;
    this.addEnemy = 1;
    this.score = 0;
    this.lifes = 3;
    this.tweetHandler = false;
    
    
    this.createEnemies = setInterval(function() {
        that.addEnemy = true;
    }, 1000);
    
     this.createBullets = setInterval(function() {
        that.addBullet = true;
    }, 400);
    
}
Game.prototype.clear = function(){
    this.ctx.fillStyle = 'rgb(245,245,245)';
    this.ctx.fillRect( 0, 0, 255, 255 );
}

Game.prototype.drawResult = function(ctx){    
    ctx.fillStyle = 'red';
    ctx.font = "italic 30pt Calibri";
    ctx.fillText("GAME OVER!", 10, 90);
    ctx.font = "italic 20pt Calibri";
    ctx.fillText("Killed: " + this.score, 70, 140);
    ctx.fillStyle = 'blue';
    ctx.font = "italic 15pt Calibri";
    ctx.fillText("Click to tweet your score!", 20, 180);
    ctx.font = "italic 10pt Calibri";
    ctx.fillText("Refresh to play again :)", 60, 200);
}


Game.prototype.draw = function(){
    var that = this;
    if(this.lifes < 1){
        this.clear();
        this.drawResult(this.ctx);  
        
        if(!this.tweetHandler){
            this.canvas.addEventListener('click', function(e){
                window.open( 'https://twitter.com/share?url='+
                    encodeURIComponent(location.href)+
                    '&text='+
                    encodeURIComponent('Just ended canon defense! My score is: ' + that.score + '. Try the game at: ')
                ,'_blank' );
            });
            this.tweetHandler = true;
        }
        return;
    }
    
    if(this.addBullet){
        var mouse = this.mouse;

        //todo
        var d = game.tower.getDiffs(mouse);
        game.bullets.push( new Bullet(game.tower.x + (20 * d.dx), game.tower.y + (20 * d.dy), 5, d.dx, d.dy, 'rgba(0, 0, 0, 1)') );
        this.addBullet = false;
    }
    if(this.addEnemy){
        var x = Math.floor(Math.random() * this.width) + 1;
        game.enemies.push( new Enemy(x, 0, 26, 32, 'rgba(125, 50, 50, 1)') );
        this.addEnemy = false;
    }
    //enemies
    var enemies = this.enemies;
    var l = ( enemies && enemies.length) ? enemies.length : 0;
    //Bullets
    var bullets = this.bullets;
    var bl = ( bullets && bullets.length) ? bullets.length : 0;
    if(l && bl){
        for (var i = 0; i < l; i++) {
            var enemy = enemies[i];
            if(enemy){
                for (var j = 0; j < bl; j++) {
                    var b = bullets[j];
                    if(b){
                        //enemy.xx = enemy.x + enemy.w;  
                        //enemy.yy = enemy.y + enemy.h;
                        //bullet.xx = bullet.x + bullet.w;
                        //bullet.yy = bullet.y + bullet.w;
                       
                       //look for collisions
                        if(enemy.x < b.x + b.w&&
                         enemy.x + enemy.w > b.x - b.w &&
                         enemy.y < b.y - b.w &&
                         enemy.y + enemy.h > b.y - b.w){
                             console.log('BUUM!!!!');
                             enemies[i] = false;
                             bullets[j] = false;
                             this.enemiesToClean++;
                             this.toClean++;
                             this.score++;
                             break;
                             
                        }
                       
                    }
                }
            }
        }
    }
    
    this.clear();
    
    for (var i = 0; i < l; i++) {
      var enemy = enemies[i];
      
      // We can skip the drawing of elements that have moved off the screen:
      if (!enemy || enemy.y > this.height ){
              
              //enemy at the bottom!!!!!
              if(enemy){
                this.lifes--;
              }
              
              enemies[i] = false;
              this.enemiesToClean++;
              continue;
              
        }else{
            enemies[i].draw(this.ctx);
        }
    }
    
    
    
    //draw bullets
    for (var i = 0; i < bl; i++) {
      var bullet = bullets[i];
      
      // We can skip the drawing of elements that have moved off the screen:
      if (!bullet || bullet.x > this.width || bullet.y > this.height ||
          bullet.x + bullet.w < 0 || bullet.y + bullet.h < 0 || bullet.offset > this.height){
              
              bullets[i] = false;
              this.toClean++;
              
        }else{
            bullets[i].draw(this.ctx);
        }
    }
    
    this.drawScore(this.ctx);
    this.drawLifes(this.ctx);
    
    // ** Add stuff you want drawn in the background all the time here **
    this.tower.draw(this.ctx, this.mouse);
    this.viewfinder.draw(this.ctx, this.mouse);
    
    if(this.toClean > 2){
        //console.log('clean', l);
        this.bullets = bullets.filter(function(e){return e});
        //console.log('cleaned: ', this.bullets.length);
        this.toClean = 0;
    }
    if(this.enemiesToClean > 2){
        //console.log('enemies clean', l);
        this.enemies = enemies.filter(function(e){return e});
        //console.log('enemies cleaned: ', this.enemies.length);
        this.enemiesToClean = 0;
    }
}


Game.prototype.drawScore = function(ctx){
    ctx.font = "italic 10pt Calibri";
    ctx.fillText("SCORE: " + this.score, this.width - 80, this.height - 10);
}

Game.prototype.drawLifes = function(ctx){
    ctx.font = "italic 10pt Calibri";
    ctx.fillText("Lifes: " + this.lifes, 10, this.height - 10);
}


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
 if( e.targetTouches && e.targetTouches[0] ){
     mx = e.targetTouches[0].pageX - offsetX;
     my = e.targetTouches[0].pageY - offsetY;
 }else{
      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;
 }
 
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}


