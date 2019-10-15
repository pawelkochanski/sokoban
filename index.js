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
        "WFFFFFFW",
        "WFFFFFFW",
        "WFFFPFFW",
        "WFFFFFFW",
        "WFFFFFFW",
        "WWWWWWWW",];

class Game{
    constructor(difficulty){
        switch(difficulty){
            default:
                this.sizex=8;
                this.sizey=8;
        }
        debugger;
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
                    case "P":
                        img.className = "player";
                    break;  
                }
                tile.append(img);
                row.append(tile);
            }
            board.prepend(row);    
        }
    }

}