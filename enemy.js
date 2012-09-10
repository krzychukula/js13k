
function Enemy(x, y, w, h, fill) {
  // This is a very simple and unsafe constructor. 
  // All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || 'rgba(0,245,245, 0.1 )';
}

Enemy.prototype.draw = function(ctx, mouse){
    ctx.save();
    
    ctx.fillStyle = this.fill;
        
    //ctx.fillStyle = '#AA00AA';
    ctx.fillRect(this.x - this.w /2, this.y - this.h, this.w, this.h);
    
    this.y += 1;
        
    ctx.restore();
}