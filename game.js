
function Game(canvas, ctx){
    var that = this;
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.mouse = {x: this.width/2, y: 0};
    this.bullets = [];
    this.enemies = [];
    
    this.currentLevel = 0;
    this.levels = [{
        bulletsTimeout: 400,
        enemiesTimeout: 600,
        startEnemies: 30,
        enemies: 30
    }];
    this.tower = new Tower(this.width/2, this.height, 10, 20, 'rgb(0,0,0)');
    this.viewfinder = new Viewfinder(0, 0, 20, 20, 'rgb(0,0,0)');
    this.toClean = 0;
    this.enemiesToClean = 0;
    this.addEnemy = 1;
    this.score = 0;
    this.lifes = 3;
    this.beforeStart = true;
    this.tweetHandler = false;
    
    this.bulletsTimeout = 400;
    function bulletsFactory(){
        that.addBullet = true;
        that.bulletsTimeout -= 0.1;
        setTimeout(bulletsFactory, that.bulletsTimeout);
    }
    bulletsFactory();
    
    this.enemiesTimeout = 600;
    function enemiesFactory(){
        that.addEnemy = true;
        that.enemiesTimeout -= 0.9;
        setTimeout(enemiesFactory, that.enemiesTimeout);
    }
    enemiesFactory();
    
//    this.createEnemies = setInterval(function() {
//        that.addEnemy = true;
//    }, 1000);
    
//     this.createBullets = setInterval(function() {
//        that.addBullet = true;
//    }, 400);
    
}

Game.prototype.startFactories = function(){
    
}

Game.prototype.image = new Image();
Game.prototype.image.src = 'data:image/  png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AkLDSMPVfdqJwAAAWRJREFUOMttk79rwlAQxz9B5UEEFwmCZigGMhQydyiEjkKhf1P/HbeOmfo3FC2CgpkMFDIIAVOC2nSwl96L3vbuvbv7/rjnHA5v9XZXkaU5k6lH4Btcd4BEWRZsdxWBb9juqiYvZ2exntf6UjeSQmkozbI0B2Ay9ei8PD+9njqGwDfsizOPD3eMhn2Ox4p9cebz44vvHxgN+/R6htGwz3hsOHUMWZrj1PV7LZ11BL4BuJnXlJzFel5naU4c+xY8gDj2AXDdAUmyas6SA+gKF4Ao9Kzp+uFsdm8hKcsCwKYgha47sAQTUdt3AI7YKNNvqa1RiivyxrIxS3MLqsDU6DSthkKSrJop7YUqy6IpWG5ya6Gi0Ls0WG7yK+v0Qz29bauzWM/rKPSsSRq+LrxlcTfwDf8ILsKIoHqaXl+txdVfaG+bjraFzSK14YH3d/Zaol2aRCEN5W4bnqgvumgK4pA4UJYFvxvMELAqKY7sAAAAAElFTkSuQmCC';

Game.prototype.clear = function(){
    this.ctx.fillStyle = 'rgb(245,245,245)';
    this.ctx.fillRect( 0, 0, 255, 255 );    
}

Game.prototype.tile = function(){
    
    for (x = 0; x <= this.width; x = x + 16) {
            for (y = 0; y <= this.width; y = y + 16) {
                this.ctx.drawImage(this.image, x, y);
            }
        }
    
}




Game.prototype.draw = function(){
    var that = this;
    if(this.beforeStart){
        this.clear();
        this.drawSplash(this.ctx);
        this.canvas.addEventListener('click', function(e){
            var timeout = 0;
            if(that.blockClick){
                return;   
            }           
            that.beforeStart = false;
        });        
        return;   
    }
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
    
    var level = this.levels[this.currentLevel];
    
    
    
    
    if(level.enemies && this.addEnemy){
        
        var x = Math.floor(Math.random() * (this.width - 26)) + 2;
        //var x = Math.floor(Math.random() * (this.width /2)) + this.width /2;
        game.enemies.push( new Enemy(x, 0, 26, 32, 'rgba(125, 50, 50, 1)') );
        this.addEnemy = false;
        level.enemies--;
    }
    //enemies
    var enemies = this.enemies;
    var l = ( enemies && enemies.length) ? enemies.length : 0;
    //Bullets
    var bullets = this.bullets;
    var bl = ( bullets && bullets.length) ? bullets.length : 0;
    
    var collision = false;
    var yCollision = false;
    
    if(l && bl){
        for (var i = 0; i < l; i++) {
            var enemy = enemies[i];
            if(enemy && enemy.live){
                for (var j = 0; j < bl; j++) {
                    var b = bullets[j];
                    if(b){
                        collision = false;
                        yCollision = false;
                        
                        //a.y < b.y + b.height &&
                        // a.y + a.height > b.y
                        var eTopY = enemy.y;
                        var eBottomY = enemy.y + enemy.h;
                        var bTopY = b.y - b.w;
                        var bBottomY = b.y + b.w;
                        if( eTopY < bBottomY &&
                         eBottomY > bTopY){
                           //console.log('y collision b:'+j+' e:'+i);
                           yCollision = true;
                             
                        }
                        
                        //look for collisions
                        var eLeftX = enemy.x;
                        var eRightX = enemy.x + enemy.w;
                        var bLeftX = b.x - b.w;
                        var bRightX = b.x + b.w;
                        
                        if(yCollision && 
                         eLeftX < bRightX &&
                         eRightX > bLeftX ){
                           //console.log('x collision b:'+j+' e:'+i);
                           collision = true;
                             
                        }
                        
                        
                        
                        if(collision){
                            console.log('BUUM!!!!');
                             enemies[i].kill();
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
    
    this.tile();
    
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
            enemies[i].draw(this.ctx, i);
            if(enemy.toRemove){
                enemies[i] = false;
                this.enemiesToClean++;
            }
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
            bullets[i].draw(this.ctx, i);
            
        }
    }
    
    this.drawInfo(this.ctx);
    
    // ** Add stuff you want drawn in the background all the time here **
    this.tower.draw(this.ctx, this.mouse);
    this.viewfinder.draw(this.ctx, this.mouse);
    
    if(this.toClean > 2){
        //console.log('clean', l);
        this.bullets = bullets.filter(function(e){return e});
        //console.log('cleaned: ', this.bullets.length);
        this.toClean = 0;
    }
    if(this.enemiesToClean > 0){
        //console.log('enemies clean', l);
        this.enemies = enemies.filter(function(e){return e});
        //console.log('enemies cleaned: ', this.enemies.length);
        this.enemiesToClean = 0;
    }
    
    
    if(!level.enemies && !this.enemies.length){
     //todo change level   
     this.changeLevel();
    }
    
    
}

Game.prototype.changeLevel = function(){
    var that = this;
 this.enemies = [];
 this.bullets = [];
 this.currentLevel++;
 this.beforeStart = true;
 if(!this.levels[this.currentLevel]){
    this.levels[this.currentLevel] = this.levels[this.currentLevel - 1];
    this.levels[this.currentLevel].enemiesTimeout -= 50;
    this.levels[this.currentLevel].bulletsTimeout -= 25;
    this.levels[this.currentLevel].enemies = this.levels[this.currentLevel].startEnemies += 10;
 }
 var level = this.levels[this.currentLevel];
 this.bulletsTimeout = level.bulletsTimeout;
 this.enemiesTimeout = level.enemiesTimeout;
 this.blockClick = true;
 setTimeout(function(){
     that.blockClick = false;
 }, 200);
}


Game.prototype.drawInfo = function(ctx){
    ctx.fillStyle = 'red';
    ctx.font = "bold 30pt Calibri";
    ctx.fillText(new Array(this.lifes+1).join("♥"), 20, this.height - 10);
    
    ctx.fillStyle = 'rgba(0,0,0, 0.9)';
    ctx.font = "bold 14pt Calibri";
    ctx.fillText("SCORE: " + this.score, this.width / 2 + 20, this.height - 10);
    
    ctx.fillStyle = 'rgba(0,0,0, 0.6)';
    ctx.font = "bold 12pt Calibri";
    ctx.fillText("Level: " + (this.currentLevel+1) + ' wave:'+this.levels[this.currentLevel].enemies, 10, 14);
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

Game.prototype.drawSplash = function(ctx){ 
    if(this.currentLevel == 0){
            
        ctx.fillStyle = 'black';
        ctx.font = "bold 20pt Calibri";
        ctx.fillText("Click or tap to start!", 10, 100);
        ctx.font = "13pt Calibri";
        ctx.fillText("Tip: click or tap for instant fire", 10, 200);
    }else{
        ctx.fillStyle = 'black';
        ctx.font = "bold 18pt Calibri";
        ctx.fillText("Click or start level: " + (this.currentLevel+1) , 10, 100);
        ctx.font = "13pt Calibri";
        ctx.fillText("Tip: click or tap for instant fire", 10, 200);
    }
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


