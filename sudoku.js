function nextStep(row, col) {
    if (col === 8) {
        if (row === 8) {
            return "None";
        }
        return [row + 1, 0];
    }
    return [row, col + 1];
}

function validPosition(board, row, col, number) {
    // Row
    if (board[row].includes(number)) {
        return false;
    }
    // Column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === number) {
            return false;
        }
    }
    // Top Left
    if (row < 3 && col < 3) {
        if ([board[0][0], board[0][1], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]].includes(number)) {
            return false;
        }
    }
    // Top Middle
    else if (row < 3 && col > 2 && col < 6) {
        if ([board[0][3], board[0][4], board[0][5], board[1][3], board[1][4], board[1][5], board[2][3], board[2][4], board[2][5]].includes(number)) {
            return false;
        }
    }
    // Top Right
    else if (row < 3 && col > 5) {
        if ([board[0][6], board[0][7], board[0][8], board[1][6], board[1][7], board[1][8], board[2][6], board[2][7], board[2][8]].includes(number)) {
            return false;
        }
    }
    // Middle Left
    else if (row > 2 && row < 6 && col < 3) {
        if ([board[3][0], board[3][1], board[3][2], board[4][0], board[4][1], board[4][2], board[5][0], board[5][1], board[5][2]].includes(number)) {
            return false;
        }
    }
    // Middle Middle
    else if (row > 2 && row < 6 && col > 2 && col < 6) {
        if ([board[3][3], board[3][4], board[3][5], board[4][3], board[4][4], board[4][5], board[5][3], board[5][4], board[5][5]].includes(number)) {
            return false;
        }
    }
    // Middle Right
    else if (row > 2 && row < 6 && col > 5) {
        if ([board[3][6], board[3][7], board[3][8], board[4][6], board[4][7], board[4][8], board[5][6], board[5][7], board[5][8]].includes(number)) {
            return false;
        }
    }
    // Bottom Left
    else if (row > 5 && col < 3) {
        if ([board[6][0], board[6][1], board[6][2], board[7][0], board[7][1], board[7][2], board[8][0], board[8][1], board[8][2]].includes(number)) {
            return false;
        }
    }
    // Bottom Middle
    else if (row > 5 && col > 2 && col < 6) {
        if ([board[6][3], board[6][4], board[6][5], board[7][3], board[7][4], board[7][5], board[8][3], board[8][4], board[8][5]].includes(number)) {
            return false;
        }
    }
    // Bottom Right
    else if (row > 5 && col > 5) {
        if ([board[6][6], board[6][7], board[6][8], board[7][6], board[7][7], board[7][8], board[8][6], board[8][7], board[8][8]].includes(number)) {
            return false;
        }
    }
    return true;
}

function solve(board, row, col) {
    if (board[row][col] !== 0) {
        let location = nextStep(row, col);
        if (location === "None") {
            return board;
        }
        return solve(board, location[0], location[1]);
    } else {
        for (let number = 1; number <= 9; number++) {
            if (validPosition(board, row, col, number)) {
                board[row][col] = number;
                let location = nextStep(row, col);
                if (location === "None") {
                    return board;
                }
                let next = solve(board, location[0], location[1]);
                if (next !== "Error") {
                    return board;
                }
                board[row][col] = 0;
            }
        }
        return "Error";
    }
}

function randomSolve(board, row, col) {
    if (board[row][col] !== 0) {
        let location = nextStep(row, col);
        if (location === "None") {
            return board;
        }
        return randomSolve(board, location[0], location[1]);
    } else {
        used = [];
        while (true) {
            if (used.length === 9) {
                break;
            }
            let number = Math.floor(Math.random() * 9 + 1);
            if (!used.includes(number)) {
                used.push(number);
                if (validPosition(board, row, col, number)) {
                    board[row][col] = number;
                    let location = nextStep(row, col);
                    if (location === "None") {
                        return board;
                    }
                    let next = randomSolve(board, location[0], location[1]);
                    if (next !== "Error") {
                        return board;
                    }
                    board[row][col] = 0;
                }
            }
        }
        return "Error";
    }
}

function randomRemoval(board, givens) {
    while (true) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            givens += 1
        }
        if (givens === 81) {
            break;
        }
    }
    return board;
}

function generate() {
    let board = [];
    while (true) {
        let template = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        board = randomSolve(template, 0, 0);
        if (board !== "Error") {
            break;
        }
    }

    let givens = Math.floor(Math.random() * 24 + 22);
    board = randomRemoval(board, givens);
    return board;
}

window.addEventListener("click", function(event) {
    if (!solved) {
        let targetElement = event.target;
        if (targetElement.nodeName !== "INPUT" && targetElement.nodeName !== "TD") {
            cancelSelect();
        }
    }
});

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function cellColor(row, col) {
    if (((row < 3 || row > 5) && (col < 3 || col > 5)) || ((row > 2 && row < 6) && (col > 2 && col < 6))) {
        return "green";
    }
    return "blue";
}

function cancelSelect() {
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].className === "greenCell") {
            cells[i].style.backgroundColor = "green";
        } else {
            cells[i].style.backgroundColor = "blue";
        }
        cells[i].children[0].style.color = "white";
    }
}

function createBoard() {
    let height = window.innerHeight * 0.1;
    let table = document.createElement("table");
    table.align = "center";
    table.style.marginTop = height + "px";
    table.cellPadding = "0px";
    table.cellSpacing = "10px";
    let tbody = document.createElement("tbody");
    for (let row = 0; row < 9; row++) {
        let tr = document.createElement("tr");
        for (let col = 0; col < 9; col++) {
            let td = document.createElement("td");
            td.setAttribute("row", row);
            td.setAttribute("col", col);

            let size = window.innerHeight * 0.075;
            td.style.height = size + "px";
            td.style.width = size + "px";

            if (cellColor(row, col) === "green") {
                td.setAttribute("class", "greenCell");
            } else {
                td.setAttribute("class", "blueCell");
            }

            let input = document.createElement("input");
            input.style.height = size + "px";
            input.style.width = size + "px";
            input.maxLength = 1;
            if (board[row][col] !== 0) {
                input.value = board[row][col];
                input.readOnly = true;
            }

            setInputFilter(input, function(value) {
                return /^[1-9]*$/.test(value);
            });

            td.addEventListener("click", function() {
                if (!solved) {
                    if (selected) {
                        cancelSelect();
                    } else {
                        selected = true;
                    }
                    td.style.backgroundColor = "yellow";
                    input.style.color = "black";
                }
            });

            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    document.getElementById("clearButton").addEventListener("click", function(){
        for (let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++) {
                if (original[i][j] === 0) {
                    board[i][j] = 0;
                }
            }
        }

        let cells = document.getElementsByTagName("input");
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].readOnly) {
                cells[i].value = "";
            }
        }
        if (!solved) {
            cancelSelect();
        }
    });
    document.getElementById("submitButton").addEventListener("click", function(){
        let solution = solve(original, 0, 0);
        solved = true;
        let cells = document.getElementsByTagName("input");
        let td = document.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].readOnly) {
                let row = Math.floor(i / 9);
                let col = i % 9;
                if (cells[i].value === solution[row][col].toString()) {
                    cells[i].style.color = "white";
                } else {
                    cells[i].value = solution[row][col];
                    cells[i].style.color = "red";
                }
                cells[i].readOnly = true;
            } else {
                cells[i].style.color = "white";
            }
            if (td[i].className === "greenCell") {
                td[i].style.backgroundColor = "green";
            } else {
                td[i].style.backgroundColor = "blue";
            }
        }
    });
    document.getElementById("solveButton").addEventListener("click", function(){
        let solution = solve(original, 0, 0);
        solved = true;
        let cells = document.getElementsByTagName("input");
        let td = document.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].readOnly) {
                let row = Math.floor(i / 9);
                let col = i % 9;
                cells[i].value = solution[row][col];
                cells[i].style.color = "red";
                cells[i].readOnly = true;
            } else {
                cells[i].style.color = "white";
            }
            if (td[i].className === "greenCell") {
                td[i].style.backgroundColor = "green";
            } else {
                td[i].style.backgroundColor = "blue";
            }
        }
    });
    document.getElementById("newButton").addEventListener("click", function(){
        location.reload();
    });

    let container = document.getElementsByClassName("container-fluid")[0];
    container.insertBefore(table, container.firstElementChild);
    container.style.display = "block";
}

let selected = false;
let solved = false;
let board = generate();
let original = [];
for (let i = 0; i < 9; i++) {
    let temp = [];
    for (let j = 0; j < 9; j++) {
        temp.push(board[i][j]);
    }
    original.push(temp);
}
createBoard();