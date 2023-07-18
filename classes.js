class Pipe{
    constructor(){
        this.xposition = canvas.width
        this.width = 50
        let random_v = Math.floor(Math.random() * (canvas.height-99));
        this.height = random_v
    }
    draw(){
        let space = 10
        ctx.drawImage(pipe,this.xposition,canvas.height-this.height,this.width,this.height+space)
        ctx.drawImage(pipe_r,this.xposition,-space,this.width,canvas.height-this.height-100+space)
        this.xposition-=v
    }
}