const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const bird = new Image()
bird.src = "bird.png"
const pipe = new Image()
pipe.src = "pipe.png"
const pipe_r = new Image()
pipe_r.src = "pipe_r.png"

canvas.width = 850
canvas.height = 400
let animationId;
let frames = 0
let bird_p_x = 180
let bird_p_y = 100
let bird_w = 50
let bird_h = 50
let gravity = 0
let bpx = bird_p_x+13
let bpy = bird_p_y+16
let bx = bird_w-27
let by = bird_h-31
let score = 0
let v = 1
let playing = false
let pipes_array=[]
let hscore = 0




window.addEventListener("keydown" , (e)=>{
    if (e.key == " "){
        if (playing){
            gravity = -3
        }else{
            bird_p_x = 180
            bird_p_y = 100
            bird_w = 50
            bird_h = 50
            gravity = 0
            bpx = bird_p_x+13
            bpy = bird_p_y+16
            bx = bird_w-27
            by = bird_h-31
            score = 0
            v = 1
            playing = true
            pipes_array=[]
            animate()
        }
    }
    if (e.key == "Escape"){
        if (playing){
            cancelAnimationFrame(animationId)
            playing = false
        }else{
            playing = true
            animate()
        }
    }
})

function move(){
    bpy += gravity
    bird_p_y += gravity
    gravity += 0.1
    if (gravity > 3){
        gravity = 3
    } 
    if (bpy > canvas.height){
        lost()
    }
}

function lost(){
    cancelAnimationFrame(animationId)
    playing = false
}

function manage_pipes(){
    if (frames % 200 === 0){
        v+=0.05
        pipes_array.push(new Pipe())
    }
    for (let i=0;i<pipes_array.length;i++){
        if(pipes_array[i].xposition < -pipes_array[i].width){
            pipes_array.splice(i, 1);
            score++
        }
        if ((bpx+bx > pipes_array[i].xposition && bpx < pipes_array[i].xposition+pipes_array[i].width) && 
        (bpy+by > canvas.height-pipes_array[i].height || bpy < canvas.height-pipes_array[i].height - 100)){
            lost()
        }
        pipes_array[i].draw()
    }
}

function animate(){
    animationId = requestAnimationFrame(animate);
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '38px Arial'
    ctx.drawImage(bird,bird_p_x,bird_p_y,bird_w,bird_h)
    move()
    manage_pipes()
    if (score > hscore)hscore = score
    ctx.fillStyle = "red"
    ctx.fillText("Score : "+score,10,40)
    ctx.fillStyle = "yellow"
    ctx.fillText("Highest score : "+hscore,350,40)
}
