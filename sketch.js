var ball;
var database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition=database.ref("ball/position");
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown("A")){
        writePosition(-1,0);
    }
    else if(keyDown("D")){
        writePosition(1,0);
    }
    else if(keyDown("W")){
        writePosition(0,-1);
    }
    else if(keyDown("S")){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function writePosition(x,y){
database.ref("ball/position").set({
    x:position.x+x,
    y:position.y+y
})
}

function showError(){
    console.log("it displays the errors");
}