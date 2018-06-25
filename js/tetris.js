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
    drawElementMenu(offset, context) {
        arrayOperation(this.matrix, offset, context)
    }
    drawElementArea(offset, context) {
        arrayOperation(this.matrix, offset, context)
    }
}

/*Objects*/
const tetramino = {
    type: 'T',
    offset: {
        x: 1,
        y: 0
    },
    matrix: createElement("T"),
    //twist:false, //test
    context: tetris_context
};
const area = genArea(20, 30);

const colors = [
    '#00f0f0',
    '#ffffff',
    '#f0a000',
    '#f0f000',
    '#00f000',
    '#a000f0',
    '#f00000',
]

/*show menu items*/
function showMenu() {
    var arrayEl = ['S', 'Z', 'T', 'I', 'L', 'O', 'J'];
    var count = 1;
    for (z in arrayEl) {
        let item = new Element(createElement(arrayEl[z]));
        item.drawElementMenu({
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
                [2, 2, 2],
                [0, 2, 0],
            ];
            break;
        case 'L':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
            break;
        case 'J':
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
            break;
        case 'S':
            return [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0],
            ];
            break;
        case 'Z':
            return [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0],
            ];
            break;
        case 'O':
            return [
                [7, 7],
                [7, 7],
            ];
            break;
        default:
            return null;
            break;
    }
}

function arrayOperation(matrix, offset, context) {
    matrix = transpose(matrix);
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                context.fillStyle = colors[--matrix[i][j]];
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

function twist(dir) {
    const pos = tetramino.offset.x;
    let offset = 1;
    twistElement(tetramino.matrix, dir);
    while (encounter(area, tetramino)) {
        tetramino.offset.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > tetramino.matrix[0].length) {
            twistElement(tetramino.matrix, -dir);
            tetramino.offset.x = pos;
            return;
        }
    }
}

function twistElement(matrix, pos) {
    for (var i = 0; i < matrix.length; ++i) {
        for (var j = 0; j < i; ++j) {
            [
                matrix[j][i],
                matrix[i][j]
            ] = [
                matrix[i][j],
                matrix[j][i]
            ];
        }
    }
    if (pos > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function draw() {
    tetris_context.fillStyle = '#194885';
    tetris_context.fillRect(0, 0, tetris.width, tetris.height);
    arrayOperation(area, {
        x: 0,
        y: 0,
    }, tetramino.context);

    let item = new Element(tetramino.matrix);
    item.drawElementArea(tetramino.offset, tetramino.context);
}

function update() {
    draw();
    tetramino.offset.y++;
    if (encounter(area, tetramino)) {
        tetramino.offset.y--;
        synthesis(area, tetramino);
        reset();
        clearLine();
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

function synthesis(area, tetramino) {
    for (var i = 0; i < tetramino.matrix.length; i++) {
        for (var j = 0; j < tetramino.matrix.length; j++) {
            if (tetramino.matrix[i][j] != 0) {
                area[i + (tetramino.offset.y)][j + (tetramino.offset.x)] = tetramino.matrix[i][j];
            }
        }
    }
}

function encounter(area, tetramino) {
    const [m, o] = [tetramino.matrix, tetramino.offset];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (area[y + o.y] &&
                    area[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function tetraminoMove(pos) {
    tetramino.offset.x += pos;
    if (encounter(area, tetramino)) {
        tetramino.offset.x -= pos;
    }
}

function clearLine() {
    outer: for (let y = area.length - 1; y > 0; --y) {
        for (let x = 0; x < area[y].length; ++x) {
            if (area[y][x] === 0) {
                continue outer;
            }
        }
        const row = area.splice(y,1)[0].fill(0);
        area.unshift(row);
    }
}

function reset() {
    var arrayEl = ['S', 'Z', 'T', 'I', 'L', 'O', 'J'];
    tetramino.matrix = createElement(arrayEl[arrayEl.length * Math.random() | 0]);
    tetramino.offset.y = 0;
    tetramino.offset.x = (area[0].length / 2 | 0) - (tetramino.matrix[0].length / 2 | 0);
    if (encounter(area, tetramino)) {
        area.forEach(row => row.fill(0));
        alert("Game over");
        location.reload();
    }
}

/*Controls*/
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case (37):
        case (65):
            tetraminoMove(-1);
            break;
        case (39):
        case (68):
            tetraminoMove(1);
            break;
        case (40):
        case (83):
            update();
            break;
        case (13):
            start();
            break;
        case (107):
            twist(1);
            break;
        case (109):
            twist(-1);
            break;
        default:
            null;
            break;
    }
})