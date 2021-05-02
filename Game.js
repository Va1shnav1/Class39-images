class Game{
    constructor(){

    }
    getState(){
        var stateRef = database.ref('gameState')
        console.log("hello");
        stateRef.on("value", function(data){
            GS = data.val();
        })
        console.log(GS);
    }
    updateState(State){
        database.ref('/').update({
            gameState:State
        })
    }
    async start(){
        if(GS===0){
            player=new Player();
            var playerCountRef=await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                pCount=playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        p1=createSprite(100, 100, 100, 100);
        p2=createSprite(300, 100, 100, 100);
        p1.addImage(wCar);
        p2.addImage(rCar);
        cars = [p1, p2];
    }
    play(){
        form.hide();
        //text("Game Start", 150, 150);
        Player.getPlayerInfo();
        player.getFinishedPlayers();
        if(allPlayers!== undefined){
            background(Ground);
            image(Track, 0, -displayHeight*5, displayWidth, displayHeight*6);
            var carX = 0;
            var carY = 0;
            var index = 0;
            //for(var plr= 0; plr<allPlayers.length;plr++)
            for(var plr in allPlayers ){
                carY=displayHeight-allPlayers[plr].Distance;
                carX=carX+400;
                index = index+1;
                console.log("carX"+ carX);
                console.log("carY"+ carY);
                cars[index-1].x=carX;
                cars[index-1].y=carY;
                if(index===player.index){
                    cars[index-1].shapeColor="red";
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                }else{
                    cars[index-1].shapeColor="black";
                }
                textSize(20);
                fill("white");
                text(allPlayers[plr].Name+":"+allPlayers[plr].Distance, cars[index-1].x, cars[index-1].y+70)
                //pos+=30;
            }
            
        }
        if(keyIsDown(UP_ARROW)&& player.index!==null){
            console.log("up arrow");
            player.distance+=50;
            player.update();
        }
        if(player.Distance>4400 && finishedPlayers<= 2){
            Player.updateFinishedPlayers();
            player.rank=finishedPlayers;
            player.update();
        }
        drawSprites();
    }
    end(){
        text("You have reached the end!", displayWidth/2, displayHeight);
        console.log("You have reached the end");
    }
}
