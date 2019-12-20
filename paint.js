class paint{
    constructor(){
        this.canvas = document.getElementById("board");
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d");
        this.drawBackground();
        this.color = '#ff0000';
        this.tool = 'pen';
        this.lineWidth = 5;

        this.currentPos = {
            x:0,
            y:0
        }

        this.drawing = false;

        this.image = null;

        // listen mouse event
        this.listenEvent();
        this.drawLine(10,10,100,100);
    }
    getMousePos(evt){
        var rect = this.canvas.getBoundingClientRect();
        return{
            x:evt.clientX - rect.left,
            y:evt.clientY - rect.top
        };
    }

    mousedown(event){
        // console.log("mouse down");
        this.image = new Image;
        this.image.src = this.canvas.toDataURL("image/bmp", 1.0);

        let mousePos = this.getMousePos(event);
        this.drawing = true;
    }
    mousemove(event) {
        let mousePos = this.getMousePos(event);
        if(this.drawing){
            this.drawLine(this.currentPos, mousePos);
        }
        this.currentPos = mousePos;
    }
    mouseup(event) {
        this.drawing = false;
    }

    listenEvent(){
        this.canvas.addEventListener(
            'mousedown', (event) => this.mousedown(event));
        this.canvas.addEventListener(
            'mousemove',(event) => this.mousemove(event));
        this.canvas.addEventListener(
            'mouseup', (event) => this.mouseup(event));
    }

    undo(){
        this.ctx.drawImage(this.image, 0,0,800,500);
    }

    drawBackground(){
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0,0,800,500);
    }

    drawLine(startPos, endPos){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.x, startPos.y);
        this.ctx.lineTo(endPos.x, endPos.y);
        this.ctx.stroke();
    }
}

var p = new paint();