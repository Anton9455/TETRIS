/* Tetris controls*/
const tetris = document.getElementById('tetris');
const tetris_context = tetris.getContext('2d');
tetris_context.fillStyle = '#194885';
tetris_context.fillRect(0, 0, tetris.width, tetris.height);

/* Menu contols*/
const menu = document.getElementById('menu');
const menu_context = menu.getContext('2d');
menu_context.lineWidth = 3.5;
menu_context.strokeRect(0,0,menu.width, menu.height);
menu_context.scale(20,20);

class Element{
    constructor(matrix){
        this.matrix = matrix;
    }
    get_I() {
        for(var i=0; i<this.matrix.length;i++){
            for(var j=0; j<this.matrix[i].length;j++){
                if(j == this.matrix.length-1){
                    this.matrix[i][j] = 1;
                    menu_context.fillStyle ='red';
                    menu_context.fillRect(i + 0.5, //0.5 - отступ от левого края
                                          j + 0.5,
                                          1,1);
                }
            }
        }
    }
}

const matrix = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
var i_item = new Element(matrix);
i_item.get_I();

function arrayOperation(matrix, position, color, offset){
    for(var i=0; i<matrix.length;i++){
        for(var j=0; j<matrix[i].length;j++){
            if(i == position-1){
                matrix[i][j] = 1;
                menu_context.fillStyle =color;
                menu_context.fillRect(i + offset.x,
                                      j + offset.y,
                                      1,1);
            }
        }
    }
}



