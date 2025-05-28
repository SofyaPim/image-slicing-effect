window.addEventListener("load", function () {
  /**
   * @type {HTMLCanvasElement}
   */
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 720;
  canvas.height = 750;

  
  class Cell {
    constructor(effect, x, y) {
      this.effect = effect;
      this.x = x;
      this.y = y;
      this.width = this.effect.cellWidth;
      this.height = this.effect.cellHeight;
      this.image = document.getElementById('canvasImage');
      // this.slideX = Math.random() * 10;//add a shaking
      // this.slideY = Math.random() * 20;
      this.slideX = 0;
      this.slideY = 0;
      this.vx = 0;
      this.vy = 0;
      this.ease = 0.01;
      this.friction = 0.99;

    }
    draw(context){
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height,this.x, this.y, this.width, this.height);
      //  context.strokeRect(this.x, this.y, this.width, this.height);     
    }
    update(){
      // this.slideX = Math.random() * 5;//add a shaking
      // this.slideY = Math.random() * 2;  
        const dx = this.effect.mouse.x - this.x;
        const dy = this.effect.mouse.y - this.y;
        const distance = Math.hypot(dy,dx);
        if(distance < this.effect.mouse.radius){
          const angle = Math.atan2(dy, dx)
          const force = distance / this.effect.mouse.radius;
          this.vx = force * Math.sin(angle);
          this.vy = force * Math.cos(angle);
        }
        this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
        this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
    }
    
  }
  class Effect {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.cellWidth = this.width/35;
      this.cellHeight = this.height/55;
      this.imageGrid = [];
      this.createGrid();
      this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100
       }
      
      this.canvas.addEventListener('mousemove', e => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      })
      this.canvas.addEventListener('mouseleave', e => {
        this.mouse.x = undefined;
        this.mouse.y = undefined;
      })
    }
    createGrid(){
      for (let y = 0; y < this.height; y += this.cellHeight) {
        for (let x = 0; x < this.width; x += this.cellWidth) {
         this.imageGrid.push(new Cell(this, x, y));
          
        }      
      }
    }
    render(context){
    
       this.imageGrid.forEach((cell, i) => {
        // if(i < 1979)cell.draw(context);
       cell.draw(context);
       cell.update();
       })
    } 
  }

const effect = new Effect(canvas);
function animate() {
  effect.render(ctx);
 
  requestAnimationFrame(animate);
}

  animate();

 
});
