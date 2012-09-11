
function Enemy(x, y, w, h, fill) {
  // This is a very simple and unsafe constructor. 
  // All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  //this.image = new Image();
  //this.image.src = 'data:image/  png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAQCAYAAADqDXTRAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AkLCTIxwEb8QAAAAmBJREFUOMudlE1IVFEUx3+j06uwGcZx4lWKTPjRCANJECK4yaIx2rdwE1SMtXUR4iIkQVy1VikhhAJX7lJR2wjuaoSBKe3j+dCmIedpyjA61rwWcq9vxvdy9L963Ht+53/PPeddF0UKBlrN4jVtfcFFiSqFdxcDzbX3AFC99aS2vogtsxTjUnn50XSpw7xyISIBIQF+/jlF4seko/FxeFlpNvcbgBevJwH4/nWTy3U+ALrvd8h9J52IDwZazdmJFtPoD5iq32fefXrdVP0+0+gPmLMTLaZdr07KuwQQCffybuMB7Y+vAlDTUMXqchqAuaFFrpX3EtPHbYdK9PLD3wFH/k7lKFPxAbT1BVdZAbzTydzQIgAfp79JILjTWdAnO6ne+v/yVrnEKY2Mhr8iiJHR0M68KTiIvyIoE4vTWquMhHvlwDjxIn9MH983ffUyT9/gElW5ZxIUEoE9PVvcjtTQfmPrkOncey/TU6sMDnoRBVh5gLTynL6eRh4+KsOthHTGkk2sZN1UlRcGWrXaHGY0BUooDvMH60pIZzTVBs0+QHfkV7JuxpIelFDi4JfZW1ExVM0ROqlE1XsplYLpbWyrNrfjlTSoN+X9AzRdvCV7FdPHUUI6S/Nrh6a3sa3azH2qxfoaJZIzsgAjo7GcmsUT3mBpfm1/eq2JrP1IJGdQvfVycu0MresiVhgW5xNx8nqTm/EuYBjgtNsjA8+dest5j0I+nwaIAiM2vtF8PsbO7hN+befQ03VyY/fPtjV/wdsbdepJrf/sMIBuZLssy1bj6BGxxRpx2cFHyLbS47D/AIU9UjYGM5rlAAAAAElFTkSuQmCC';
  this.fill = fill || 'rgba(0,245,245, 0.1 )';
  this.spriteX = 0;
  var that = this;
  setInterval(function(){
      if(!that.spriteX){
          that.spriteX = 16;
      }else{
          that.spriteX = 0;
      }
  }, 560);
}

Enemy.prototype.image = new Image();
Enemy.prototype.image.src = 'data:image/  png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAQCAYAAADqDXTRAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AkLCTIxwEb8QAAAAmBJREFUOMudlE1IVFEUx3+j06uwGcZx4lWKTPjRCANJECK4yaIx2rdwE1SMtXUR4iIkQVy1VikhhAJX7lJR2wjuaoSBKe3j+dCmIedpyjA61rwWcq9vxvdy9L963Ht+53/PPeddF0UKBlrN4jVtfcFFiSqFdxcDzbX3AFC99aS2vogtsxTjUnn50XSpw7xyISIBIQF+/jlF4seko/FxeFlpNvcbgBevJwH4/nWTy3U+ALrvd8h9J52IDwZazdmJFtPoD5iq32fefXrdVP0+0+gPmLMTLaZdr07KuwQQCffybuMB7Y+vAlDTUMXqchqAuaFFrpX3EtPHbYdK9PLD3wFH/k7lKFPxAbT1BVdZAbzTydzQIgAfp79JILjTWdAnO6ne+v/yVrnEKY2Mhr8iiJHR0M68KTiIvyIoE4vTWquMhHvlwDjxIn9MH983ffUyT9/gElW5ZxIUEoE9PVvcjtTQfmPrkOncey/TU6sMDnoRBVh5gLTynL6eRh4+KsOthHTGkk2sZN1UlRcGWrXaHGY0BUooDvMH60pIZzTVBs0+QHfkV7JuxpIelFDi4JfZW1ExVM0ROqlE1XsplYLpbWyrNrfjlTSoN+X9AzRdvCV7FdPHUUI6S/Nrh6a3sa3azH2qxfoaJZIzsgAjo7GcmsUT3mBpfm1/eq2JrP1IJGdQvfVycu0MresiVhgW5xNx8nqTm/EuYBjgtNsjA8+dest5j0I+nwaIAiM2vtF8PsbO7hN+befQ03VyY/fPtjV/wdsbdepJrf/sMIBuZLssy1bj6BGxxRpx2cFHyLbS47D/AIU9UjYGM5rlAAAAAElFTkSuQmCC';
  

Enemy.prototype.draw = function(ctx, num){
    ctx.save();
    
    ctx.fillStyle = this.fill;
        
    //ctx.fillStyle = '#AA00AA';
    //ctx.fillRect(this.x - this.w /2, this.y - this.h, this.w, this.h);
    
    //context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    //0  - 16px sprite
    ctx.drawImage(this.image, this.spriteX,0,13,16, this.x , this.y, this.w, this.h);
    
    //ctx.fillStyle = '#AA00AA';
    //ctx.fillRect(this.x, this.y , this.w, this.h);
    
    //ctx.fillStyle = 'red';
    //ctx.font = "10pt Calibri";
    //ctx.fillText(num, this.x, this.y);
    
    this.y += 1;
        
    ctx.restore();
}