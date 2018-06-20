/*Input
 Tetris controls*/
const tetris = document.getElementById('tetris');
const tetris_context = tetris.getContext('2d');
tetris_context.fillStyle = '#194885';
tetris_context.fillRect(0, 0, tetris.width, tetris.height);
tetris_context.scale(20, 20);

/*Input
 Menu contols*/
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
    drawElementMenu(color, offset, context) {
        arrayOperation(this.matrix, color, offset, context)
    }
    drawElementArea(color, offset, context) {
        arrayOperation(this.matrix, color, offset, context)
    }
}

/*Objects*/
const tetramino = {
    type: 'Z',
    color: 'white',
    offset: {
        x: 0.5,
        y: 3
    },
    context: tetris_context
};
const area = genArea(20, 30);

/*show menu items*/
function showMenu() {
    var arrayEl = ['S', 'Z', 'T', 'I', 'L', 'O', 'J'];
    var count = 0.3;
    for (z in arrayEl) {
        let item = new Element(createElement(arrayEl[z]));
        item.drawElementMenu('red', {
            x: 0.5,
            y: count
        }, menu_context);
        count += 4;
    }
}
showMenu();

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
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
            break;
        case 'L':
            return [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ];
            break;
        case 'J':
            return [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ];
            break;
        case 'S':
            return [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ];
            break;
        case 'Z':
            return [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ];
            break;
        case 'O':
            return [
                [1, 1],
                [1, 1],
            ];
            break;
        default:
            return null;
            break;
    }
}

function arrayOperation(matrix, color, offset, context) {

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                context.fillStyle = color;
                context.lineWidth = 0.1;
                context.fillRect(i + offset.x,
                    j + offset.y,
                    1, 1);
                context.strokeRect(i + offset.x,
                    j + offset.y,
                    1, 1)
            }
        }
    }
}

function twistElement(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                matrix[j][i] = 1;
                matrix[i][j] = 0;
            }
        }
    }
}

function draw() {
    tetris_context.fillStyle = '#194885';
    tetris_context.fillRect(0, 0, tetris.width, tetris.height);
    let item = new Element(createElement(tetramino.type));
    item.drawElementArea(tetramino.color, tetramino.offset, tetramino.context);
}

function update() {
    draw();
    if (tetramino.offset.y != 27) tetramino.offset.y++; // 27 this is test
    var timerId = setTimeout(update, 500);
}

function start() {
    update();
}

function genArea(width, height) {
    const area = [];
    for (var i = 0; i < height; i++) {
        area.push(new Array(width).fill(0));
    }
    return area;
}

function synthesis(area, tetramino) {

}

/*Controls*/
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case (37):
        case (65):
            tetramino.offset.x--;
            break;
        case (39):
        case (68):
            tetramino.offset.x++;
            break;
        case (40):
        case (83):
            tetramino.offset.y += 3;
            break;
        case (13):
            start();
            break;
        default:
            null;
            break;
    }
})