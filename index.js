const buttons = document.querySelectorAll('.menu_button');
for (const button of buttons) {
    button.addEventListener('click', () =>{
        document.querySelector('.menu').classList.add('hidden');
        const game = new Game(button.innerText);
        document.addEventListener('keydown', (key) => {
            //debugger;
            game.move(key.key);
        });
    })
}


const map = [
        "WWWWWWWW",
        "WFFFFFFW", 
        "WFCFTFFW",
        "WFFFFFFW",
        "WTFFPFFW",
        "WFFCFFTW",
        "WFFFFCFW",
        "WWWWWWWW",];


class Game{

    move(key){
        //debugger;
        switch(key){
            case "ArrowUp":
                this.posy-=1;
                break;
            case "ArrowDown":
                this.posy+=1;
                break;
            case "ArrowLeft":
                this.posx-=1;
                break;
            case "ArrowRight":
                this.posx+=1;
                break;
        }
        const selector ='div[data-x="' + this.posx +'"][data-y="' +this.posy+ '"]';
        const destination = document.querySelector(selector);
        this.player.querySelector('img').classList.remove("player");
        destination.querySelector('img').classList.add("player");
        this.player = destination;
        setTimeout(function(){}, 2000);

    }

    constructor(difficulty){
        switch(difficulty){
            default:
                this.sizex=8;
                this.sizey=8;
                this.crates=3
                this.keyhelper=0;
                
        }
        //debugger;
        //read map global variable
        const board = document.querySelector('.board');
        for (let indey = 0; indey < this.sizey; indey++) {
            const row = document.createElement('div'); 
            row.classList.add("row");
            for (let index = 0; index < this.sizex; index++) {
                const tile = document.createElement('div');
                tile.setAttribute('data-x',index.toString());
                tile.setAttribute('data-y',indey.toString());
                tile.classList.add("floor");
                const img = document.createElement('img');
                switch(map[indey].charAt(index)){
                    case "W":
                        img.className = "wall";  
                        break;
                    case "C":
                        img.className = "crate";  
                        break;
                    case "T":
                        tile.classList.remove("floor"); 
                        tile.classList.add("target");
                        break;   
                    case "P":
                        this.posx=index;
                        this.posy=indey;
                        img.className = "player";
                        this.player = tile;
                    break;  
                }
                tile.append(img);
                row.append(tile);
            }
            board.append(row);
        }
    }

    

}