/* Tetris controls*/
const tetris = document.getElementById('tetris');
const tetris_context = tetris.getContext('2d');
tetris_context.fillStyle = '#194885';
tetris_context.fillRect(0, 0, tetris.width, tetris.height);
tetris_context.scale(20, 20);

/* Menu contols*/
const menu = document.getElementById('menu');
const menu_context = menu.getContext('2d');
menu_context.lineWidth = 3.5;
menu_context.strokeRect(0, 0, menu.width, menu.height);
menu_context.scale(20, 20);

/* Class*/
class Element {
    constructor(matrix) {
        this.matrix = matrix;
    }
    drawElement(color, offset) {
        arrayOperation(this.matrix, color, offset)
    }
}


/* Patterns elements */
function createElement(type) {
    switch (type) {
        case 'I':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
            break;
        case 'T':
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
            ];
            break;
        case 'L':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
            ];
            break;
        case 'J':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
            ];
            break;
        case 'S':
            return [
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
            ];
            break;
        case 'Z':
            return [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ];
            break;
        case 'O':
            return [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
            ];
            break;
        default:
            return null;
            break;
    }
}

var arrayEl = ['S', 'Z', 'T', 'I', 'L', 'O', 'J']; //test array
var count = 0.3;
for (z in arrayEl) {
    let item = new Element(createElement(arrayEl[z]));
    item.drawElement('red', {
        x: 0.5,
        y: count
    });
    count += 4;
}

/* var i_item = new Element(createElement('S'));
i_item.drawElement('red', {
    x: 0.5,
    y: 0.5
});

var j_item = new Element(createElement('T'));
j_item.drawElement('red', {
    x: 0.5,
    y: 5
}); */

function arrayOperation(matrix, color, offset) {

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                menu_context.fillStyle = color;
                menu_context.strokeStyle = 'yelloy';//test
                menu_context.lineWidth = 0.1;//test
                menu_context.fillRect(i + offset.x,
                    j + offset.y,
                    1, 1);
                menu_context.strokeRect(i + offset.x,
                    j + offset.y,
                    1, 1)
            }
        }
    }
}