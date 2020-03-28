// FIELDS
// this is a field that represents the currentPlayer num
let currentPlayer = 1
let playerOneMenLoss = 0
let playerTwoMenLoss = 0
let currentPosition = null
let movesElement = []
let board = document.querySelector(".checkers-board tbody")
const col = 8
const row = 8
let boardArr = table();
let rows;


// UTIL FUNCTIONS 

function gameOver() {
    if (playerOneMenLoss == 8) {
        // do something
    } else if (playerTwoMenLoss == 8) {
        // do something
    }
}

// a funtion to display table in form of a 2d array and marking players current position with ones and twos 
function table() {
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
    let rowEl;
    let markEven = true
    for (let i = 0; i < row; i++) {
        rowEl = document.createElement("tr")
        rowEl.className = "checkers-row"
        let man;
        markEven = !markEven // to enable marking the board !white
        for (let j = 0; j < row; j++) {
            let value = boardArr[i][j]
            let className = "checkers-man "
            let newDiv = document.createElement("div") // men div
            man = document.createElement("td") // crraetes a new td tag
            className += markEven ? "even" : "odd"
            man.className = className
            let postion = document.createAttribute("position")
            newDiv.className = value == 1 ? "one" : value == 2 ? "two" : "";
            postion.value = i + "-" + j
            // add event listener
            man.addEventListener("click", function (event) {
                checkMove([i, j], event.target.querySelector("div"))
            })
            newDiv.setAttributeNode(postion)
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
    rows = board.querySelectorAll("tr")
}



// onClick eventlistener 
function checkMove(position, currPositionElement) {
    const positionVal = boardArr[position[0]][position[1]]
    if (currentPlayer != positionVal && positionVal != 0) {
        return
    }
    let moves;
    if (boardArr[position[0]][position[1]] > 0) {
        currentPosition = null
    }
    if (currentPosition == null) {
        moves = validMoves(position).validMoves
        currentPosition = position
    } else {
        moves = validMoves(currentPosition).validMoves
    }

    let selectedMove = canMove(moves, currentPosition, position)
    if (selectedMove.length > 0) {
        return swapPosition(selectedMove, currPositionElement)
    }
    for (let arr of moves) {
        let move = rows[arr[0]].querySelectorAll("td")[arr[1]];
        move.classList.add("valid-move")
        movesElement.push(move)
    }
}

function swapPosition(selectedMove, currPositionElement) {
    const [i, j] = currentPosition
    const [m, n] = selectedMove
    let previousElement = rows[i].querySelectorAll("td")[j]
    previousElement = previousElement.querySelector("div")
    let playedId = currentPlayer == 1 ? "one" : "two";
    // swaps player position
    currPositionElement.classList.add(playedId)
    previousElement.classList.remove(playedId)
    // swap on main baord
    boardArr[i][j] = 0;
    boardArr[m][n] = currentPlayer
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    currentPosition = null;
    return
}


// a function that moves a man from a position to any valid position
function canMove(validMoves, currPosition, destPosition) {
    let selectedMove = []
    // console.log("currPosition", currPosition, "validMoves", validMoves, "destPosition", destPosition);
    if (currPosition && validMoves.length != 0) {
        for (let move of validMoves) {
            if (move[0] == destPosition[0] && move[1] == destPosition[1]) {
                selectedMove = [...move]
                break;
            }
        }
    }
    clearPreviousMoves()
    return selectedMove;
}


function clearPreviousMoves() {
    for (let move of movesElement) {
        move.classList.remove("valid-move")
    }
}


// this returns all valid moves available in a position
function validMoves(position) {
    let [i, j] = position
    let validMoves = []
    if (boardArr[i][j] == 0) {
        return {
            validMoves
        }
    }
    if (currentPlayer == 1) {
        if (move(i + 1, j - 1)) {
            validMoves.push([i + 1, j - 1])
        }
        if (move(i + 1, j + 1)) {
            validMoves.push([i + 1, j + 1])
        }
    } else {
        if (move(i - 1, j - 1)) {
            validMoves.push([i - 1, j - 1])
        }
        if (move(i - 1, j + 1)) {
            validMoves.push([i - 1, j + 1])
        }
    }
    let canEliminate = []
    validMoves = validMoves.filter(arr => (boardArr[arr[0]][arr[1]] == 0))
    return {
        canEliminate,
        validMoves
    }
}



function move(x, y) {
    if (x >= 0 && x < row && y >= 0 && y < col) {
        return true
    }
    return false
}


checkersGame()