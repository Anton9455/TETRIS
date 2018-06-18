/* Tetris controls*/
const tetris = document.getElementById('tetris');
const tetris_context = tetris.getContext('2d');
tetris_context.fillStyle = '#194885';
tetris_context.fillRect(0, 0, tetris.width, tetris.height);

/* Menu contols*/
const menu = document.getElementById('menu');
const menu_context = menu.getContext('2d');
menu_context.lineWidth = 3.5;
menu_context.strokeRect(0, 0, menu.width, menu.height);
menu_context.scale(20, 20);

class Element {
    constructor(matrix) {
        this.matrix = matrix;
    }
    get_I(position, color, offset, orientation) {
        arrayOperation_I(this.matrix, position, color, offset, orientation)
    }
}

const matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

var i_item = new Element(matrix);
i_item.get_I(4, 'red', {
        x: 0.5,
        y: 0.5
    },
    true);

function arrayOperation_I(matrix, position, color, offset, orientation) {
    if (orientation == true) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (i == position - 1) {
                    matrix[i][j] = 1;
                    menu_context.fillStyle = color;
                    menu_context.fillRect(i + offset.x,
                        j + offset.y,
                        1, 1);
                }
            }
        }
    } else {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (j == position - 1) {
                    matrix[i][j] = 1;
                    menu_context.fillStyle = color;
                    menu_context.fillRect(i + offset.x,
                        j + offset.y,
                        1, 1);
                }
            }
        }

    }
}