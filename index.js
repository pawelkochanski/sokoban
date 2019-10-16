const buttons = document.querySelectorAll('.menu_button');
for (const button of buttons) {
    button.addEventListener('click', () =>{
        document.querySelector('.menu').classList.add('hidden');
        const game = new Game(button.innerText);
        document.addEventListener('keydown', (key) => {
            //debugger;
            game.player.move(key.key, game);
        });
    })
}


const easy = [
        "WWWWWWWW",
        "WWWWFFFW", 
        "WWFCFFFW",
        "WWFWFFTW",
        "WFFTWWWW",
        "WFWCFFWW",
        "WPCFWFWW",
        "WFTFFFWW",
        "WWWWWWWW"
    ];

const medium = [
        "WWWWWWWW",
        "WWWTFWWW",
        "WWWTFPWW",
        "WWWFCFWW",
        "WFFCWWWW",
        "WFWFWWWW",
        "WFFFWWWW",
        "WWWWWWWW"
    ];

const hard = [
        "WWWWWWWWW",
        "WWWWWFFFW",
        "WWFFFCFFW",
        "WWFFWTTFW",
        "WFFCWWWWW",
        "WTCPWWWWW",
        "WWWWWWWWw"
    ];



class Thing{
    constructor(posx,posy,tile){
        this.posx = posx;
        this.posy = posy;
        this.tile = tile;
    }
    render(){
        if(this.renderClass!=""){
            const img = document.createElement('img');
            img.className = this.renderClass;
            this.tile.append(img);
        }
        
    }

    clear(){
        this.tile.innerHTML = "";
    }
}

class Wall extends Thing{
    constructor(posx,posy){
        super(posx,posy);
        this.renderClass="wall";
    }
}


class Movable extends Thing{

    constructor(posx,posy){
        super(posx,posy);
    }

    move(key,game){
        debugger;
        let newposx = this.posx;
        let newposy = this.posy;
        switch(key){
            case "ArrowUp":
                newposy-=1;
                break;
            case "ArrowDown":
                newposy+=1;
                break;
            case "ArrowLeft":
                newposx-=1;
                break;
            case "ArrowRight":
                newposx+=1;
                break;
        }
        const destination = game.boardmap[newposy][newposx];
        if(destination===null){
            if(this instanceof Crate){
                debugger;
                let selector ='div[data-x="' + this.posx +'"][data-y="' +this.posy+ '"].target';
                let target = document.querySelector(selector);
                if(target != null){
                    game.crates++;
                }
                selector ='div[data-x="' + newposx +'"][data-y="' +newposy+ '"].target';
                target = document.querySelector(selector);
                if(target != null){
                    game.crates--;
                    if(game.crates == 0){
                        game.finish();
                    }
                }

            }
            if(this instanceof Player)
                game.movesCount++;
            this.clear();
            game.boardmap[newposy][newposx] = this;
            const selector ='div[data-x="' + newposx +'"][data-y="' +newposy+ '"]';
            this.tile = document.querySelector(selector);
            game.boardmap[this.posy][this.posx] = null;
            this.posx=newposx;
            this.posy=newposy;
            this.render();
            return true;
        }
        else if(destination instanceof Crate && !(this instanceof Crate))   {
            if(destination.move(key,game)){
                this.move(key,game);
                return true;
            }
        }
        return false;
            
    }
}

class Player extends Movable{
    constructor(posx,posy){
        super(posx,posy);
        this.renderClass="player";
    }

    
}

class Crate extends Movable{
    constructor(posx,posy){
        super(posx,posy);
        this.renderClass="crate";
    }

    
}

class Game{

    constructor(difficulty){
        let map;
        switch(difficulty){
            case "Easy":
                map = easy;
                break;
            case "Medium":
                map = medium;
                break;
            case "Hard":
                map = hard;
                break;
            default:     
        }
        this.sizex=map[0].length;
        this.sizey=map.length;
        this.crates=0;
        this.movesCount = 0;
        //read map global variable
        const board = document.querySelector('.board');
        this.boardmap = [];
        for (let indey = 0; indey < this.sizey; indey++) {
            //debugger;
            const row = document.createElement('div'); 
            row.classList.add("row");
            board.append(row);
            const rowmap = []
            for (let index = 0; index < this.sizex; index++) {
                const tile = document.createElement('div');
                tile.setAttribute('data-x',index.toString());
                tile.setAttribute('data-y',indey.toString());
                tile.classList.add("floor");
                let thing = null;
                switch(map[indey].charAt(index)){
                    case "W":
                        thing = new Wall(index,indey); 
                        break;
                    case "C":
                        thing = new Crate(index,indey);
                        this.crates++;
                        break;
                    case "T":
                        tile.classList.remove("floor"); 
                        tile.classList.add("target");
                        break;   
                    case "P":
                        thing = new Player(index,indey);
                        this.player = thing;
                    break;  
                }
                rowmap[index] = thing;
                row.append(tile);
                if(thing!=null){
                    thing.tile = tile;
                    thing.render();
                }
                
            }
            
            this.boardmap[indey] = rowmap;
        }
    }

    finish(){
        debugger;
        const board = document.querySelector('.board');
        board.innerHTML="<h1>Congratulations! You Won :D</h1><h2>You beat this level with " + this.movesCount + " moves!</h2><h2>If you wanna go again just refresh the page!</h2>";
    }

    
}