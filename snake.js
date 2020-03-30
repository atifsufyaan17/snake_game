
function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    
    gameOver=false;
    cs=66;
    score=0;
    gameOver=false;

    food = getRandomFood();

    appleImg = new Image();
    appleImg.src = 'apple.png';
    trophyImg = new Image();
    trophyImg.src = 'trophy.png';

    snake = {
        color:"blue",
        initLen:5,
        cells:[],
        direction:'right',

        createSnake:function(){
            for(var i=this.initLen;i>=1;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){            
            pen.fillStyle = this.color;
            for(var i=0;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },
        updateSnake:function(){
            var oldHeadX = this.cells[0].x;
            var oldHeadY = this.cells[0].y;
            if(oldHeadX==food.x && oldHeadY==food.y){
				console.log("Food eaten");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }

            var newHeadX, newHeadY;
            if(this.direction=='right'){
                newHeadX = oldHeadX+1;
                newHeadY = oldHeadY;
            }
            else if(this.direction=='left'){
                newHeadX = oldHeadX-1;
                newHeadY = oldHeadY;
            }
            else if(this.direction=='down'){
                newHeadX = oldHeadX;
                newHeadY = oldHeadY+1;
            }
            else if(this.direction=='up'){
                newHeadX = oldHeadX;
                newHeadY = oldHeadY-1;
            }            

            this.cells.unshift({x:newHeadX,y:newHeadY});

            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);
            if(newHeadX<0 || newHeadX>lastX || newHeadY<0 || newHeadY>lastY){
                gameOver=true;
            }
        }
    };
    snake.createSnake();

    function keyPressed(e){
        if(e.key=='ArrowRight'){
            snake.direction='right';
        }
        else if(e.key=='ArrowLeft'){
            snake.direction='left';
        }
        else if(e.key=='ArrowDown'){
            snake.direction='down';
        }
        else if(e.key=='ArrowUp'){
            snake.direction='up';
        }
    }

    document.addEventListener('keydown',keyPressed);
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.drawImage(appleImg,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophyImg,18,22,cs,cs);

    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score,50,50);
}
function update(){
    snake.updateSnake();
}
function getRandomFood(){
    var food_x = Math.round(Math.random()*(W-cs)/cs);
    var food_y = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:food_x,
        y:food_y,
        color:"red"
    };

    return food;
}
init();
function gameLoop(){
    if(gameOver==true){
        clearInterval(g);
        alert("Game over!");
        return;
    }

    draw();
    update();
}

var g = setInterval(gameLoop,100);