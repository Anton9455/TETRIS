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
        x: 1,
        y: 3
    },
    //twist:false, //test
    context: tetris_context
};
const area = genArea(20, 30);

/*show menu items*/
function showMenu() {
    var arrayEl = ['S', 'Z', 'T', 'I', 'L', 'O', 'J'];
    var count = 1;
    for (z in arrayEl) {
        let item = new Element(createElement(arrayEl[z]));
        item.drawElementMenu('red', {
            x: 1,
            y: count
        }, menu_context);
        count += 4;
    }
}
showMenu();

function transpose(a) {
    var w = a.length || 0;
    var h = a[0] instanceof Array ? a[0].length : 0;
    if (h === 0 || w === 0) {
        return [];
    }
    var i, j, t = [];
    for (i = 0; i < h; i++) {
        t[i] = [];
        for (j = 0; j < w; j++) {
            t[i][j] = a[j][i];
        }
    }
    return t;
}

/* Patterns elements */
function createElement(type) {
    switch (type) {
        case 'I':
            return [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
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
    matrix = transpose(matrix);
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
    /* if(tetramino.twist) {//test
        twistElement(item.matrix);
        tetramino.twist = false;
    }  */
    item.drawElementArea(tetramino.color, tetramino.offset, tetramino.context);
    synthesis(area, item.matrix, tetramino);
}

function update() {
    draw();
    if (tetramino.offset.y != 27) { // 27 this is test
        tetramino.offset.y++;
    }
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

function synthesis(area, matrix, tetramino) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] != 0) {
                area[i + (tetramino.offset.y)][j + (tetramino.offset.x)] = matrix[i][j];
            }
        }
    }
}

/*Controls*/
/* document.addEventListener("keydown",function(event){
    switch(event.keyCode){
        case (103): tetramino.twist = true;
        break;
        default: null;
        break;
    }
}); */
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