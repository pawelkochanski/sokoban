document.querySelectorAll('.menu_button').forEach((button) => {
    console.log(button);
    button.addEventListener('click', () =>{
        document.querySelector('.menu').classList.add('hidden');
        const game = new Game(button.innerText);
    })
});

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
    constructor(difficulty){
        switch(difficulty){
            default:
                this.sizex=8;
                this.sizey=8;
                this.crates=3
                
        }
        debugger;
        //read map global variable
        const board = document.querySelector('.board');
        for (let indey = 0; indey < this.sizey; indey++) {
            const row = document.createElement('div'); 
            row.classList.add("row");
            for (let index = 0; index < this.sizex; index++) {
                const tile = document.createElement('div');
                tile.classList.add("tile");
                const img = document.createElement('img');
                switch(map[indey].charAt(index)){
                    case "W":
                        img.className = "wall";  
                        break;
                    case "C":
                        img.className = "crate";  
                        break;
                    case "T":
                        img.className = "target";  
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
            board.prepend(row);    
            board.addEventListener('keypress', (key) => {
                move(key.code);
            })
        }
    }

    move(key,board){
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
                this.posy+=1;
                break;
        }
        for (const key in board.elements) {
            if (object.hasOwnProperty(key) && key == posy) {
                const element = object[key];
            }
            for (const iter in board.elements) {
                if (object.hasOwnProperty(iter) && iter == posx) {
                    const tile = object[iter];
                }
                
            }
        }

    }

}