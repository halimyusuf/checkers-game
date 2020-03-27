// FIELDS
// this is a field that represents the currentPlayer num
let currentPlayer = 1
let playerOneMenLoss = 0
let playerTwoMenLoss = 0

// UTIL FUNCTIONS 

function gameOver() {
    if (playerOneMenLoss == 8) {
        // do something
    } else if (playerTwoMenLoss == 8) {
        // do something
    }
}

// a funtion to display table in form of a 2d array and marking players current position with ones and twos 
function table(row, col) {
    if (row != col) return "row must be equal to column"
    let board = []
    let player1Men = markPlayer(col, 1)
    board = board.concat(player1Men)
    for (let i = 0; i < row - 4; i++) {
        let arr = []
        for (let j = 0; j < col; j++) {
            arr.push(0)
        }
        board.push(arr)
    }
    let player2Men = markPlayer(col, 2).reverse()
    board = board.concat(player2Men)
    return board
}

// a function to display 1 and 2 to represent player one and two respectively
function markPlayer(colSpan, player) {
    let arr1 = Array(colSpan)
    let arr2 = Array(colSpan)
    let emp = 0
    if (player == 2) {
        emp = player
        player = 0
    }

    for (let i = 0; i < colSpan; i++) {
        arr1[i] = i % 2 == 0 ? emp : player
        arr2[i] = i % 2 != 0 ? emp : player
    }
    return [arr1, arr2]
}


// PLAYING WITH THE DOM


// board.style.backgroundColor = "blue"
function displayBoard(row, col) {
    let board = document.querySelector(".checkers-board tbody")
    let boardArr = table(row, col);
    let rowEl;
    let markEven = true

    for (let i = 0; i < row; i++) {
        rowEl = document.createElement("tr")
        rowEl.className = "checkers-row"
        let man;
        markEven = !markEven // to enable marking the board !white
        for (let j = 0; j < row; j++) {
            let value = boardArr[i][j]
            man = document.createElement("td") // crraetes a new td tag
            let className = "checkers-man "
            className += markEven ? "even" : "odd"

            man.className = className
            let newDiv = document.createElement("div") // men div
            if (value == 1) {
                newDiv.className = "one"
            }
            if (value == 2) {
                newDiv.className = "two"
            }

            man.appendChild(newDiv) // append man div to man 
            rowEl.appendChild(man) //append man to current row
            markEven = !markEven
        }
        board.appendChild(rowEl)
    }

}

//controls the whole game
function checkersGame() {
    displayBoard(8, 8)
}


checkersGame()