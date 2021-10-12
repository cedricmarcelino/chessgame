const body = document.body
const rowLabel = [8,7,6,5,4,3,2,1]
rowLabel.toString()
const columnLabel = ['A','B','C','D','E','F','G','H']
let counter = 1
let turn = "white"
let checked = false
let dragged 
let prevBox
let checkedKing
let prevCaptured = ""
let prevCapturedContainer = ""
let captured = false
let checkmate = false
let possibleMoves = {}
const win = new Audio('win.wav')
const move = new Audio('move.wav')
const no = new Audio('no.wav')
let rotated=false
let promoteTo = ""
let promoteCounter = "1"
let heldPiece = ""

// GENERATE CHESS BOARD
function generateBoard() {
    const board = document.createElement('div')
    board.setAttribute("id","board")
    body.appendChild(board)
    const playerTurn = document.createElement('div')
    playerTurn.setAttribute("id","playerTurn")
    body.appendChild(playerTurn)
    const playerTurnLabel = document.createElement('h1')
    playerTurnLabel.setAttribute("id","playerTurnLabel")
    playerTurnLabel.innerHTML = "White's Turn"
    playerTurn.appendChild(playerTurnLabel)
    const rotateBtn = document.createElement("span")
    rotateBtn.setAttribute("id","rotateBtn")
    rotateBtn.innerHTML = "⇅"
    body.appendChild(rotateBtn)
    const movementBoard = document.createElement('div')
    movementBoard.setAttribute("id","movementBoard")
    body.appendChild(movementBoard)
    const moveList = document.createElement('ul')
    moveList.setAttribute("id","moveList")
    movementBoard.appendChild(moveList)
    

    rotateBtn.addEventListener("click", function (){
        rotate()
    })

    for(let row=0; row<8; row++){
        const rowContainer = document.createElement('div')
        rowContainer.setAttribute("class","rowContainer")
        board.appendChild(rowContainer)
        for(let col=0; col<8; col++){
            const box = document.createElement('div')
            box.setAttribute("id",`${columnLabel[col]}${rowLabel[row]}`)
            box.setAttribute("class","box empty")
            //const gridLabel = document.createElement('span')
            //gridLabel.innerHTML = `${columnLabel[col]}${rowLabel[row]}`
            rowContainer.appendChild(box)
            //box.appendChild(gridLabel)
            if(row%2===0){
                if(counter%2===0){
                    box.classList.add("darkbox")
                }else{
                    box.classList.add("lightbox")
                }

            } else {
                if(counter%2===0){
                    box.classList.add("lightbox")
                }else{
                    box.classList.add("darkbox")
                }
            }
            counter++
        }
    }

}

generateBoard()

// GENERATE CHESS PIECES
function generatePieces(){
    
    let generatorChecker = "white";
    let row1 = ""
    let row2 = ""
    let pieceColor = ""

    for(let i=0; i<2; i++){
        if(generatorChecker === "white"){
            row1 = "2"
            row2 = "1"
            pieceColor = "w"
            pieceColorClass = "white"
        }else if (generatorChecker === "black"){
            row1 = "7"
            row2 = "8"
            pieceColor = "b"
            pieceColorClass = "black"
        }

        // PAWN GENERATION AND EVENT LISTENERS
        for(let i = 0; i < 8; i++){
            const box = document.querySelector(`#${columnLabel[i]}${row1}`)
            const piece = document.createElement('img')
            piece.setAttribute("src",`chesspiece/${pieceColor}pawn.png`)
            piece.setAttribute("class",`${pieceColorClass}piece pawn firstmove`)
            piece.setAttribute("id",`pawn${columnLabel[i]}${row1}`)
            piece.setAttribute("draggable", "true")
            box.appendChild(piece)

            piece.addEventListener("dragstart", e => {
                e.dataTransfer.setData("text/plain", piece.id)
                possibleMovesGenerator(piece)
                dragged = event.target
                prevBox = dragged.parentElement
                heldPiece = piece.id
            })
        }

        // ROOK GENERATION
        for(let i = 0; i < 8; i++){

            if( columnLabel[i] === 'A' || columnLabel[i] === 'H'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}rook.png`)
                piece.setAttribute("class",`${pieceColorClass}piece rook`)
                piece.setAttribute("id",`rook${columnLabel[i]}${row2}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    heldPiece = piece.id
                })
            }
        }

        // QUEEN GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'D'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}queen.png`)
                piece.setAttribute("class",`${pieceColorClass}piece queen`)
                piece.setAttribute("id",`queen${columnLabel[i]}${row2}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    heldPiece = piece.id
                })
            }
        }

        // KING GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'E'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}king.png`)
                piece.setAttribute("class",`${pieceColorClass}piece king`)
                piece.setAttribute("id",`king${columnLabel[i]}${row2}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    heldPiece = piece.id
                })
            }
        }

        // BISHOP GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'C' || columnLabel[i] === 'F'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}bishop.png`)
                piece.setAttribute("class",`${pieceColorClass}piece bishop`)
                piece.setAttribute("id",`bishop${columnLabel[i]}${row2}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    heldPiece = piece.id
                })
            }
        }

        // HORSE GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'B' || columnLabel[i] === 'G'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}horse.png`)
                piece.setAttribute("class",`${pieceColorClass}piece horse`)
                piece.setAttribute("id",`horse${columnLabel[i]}${row2}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    heldPiece = piece.id
                })
            }
        }
        generatorChecker = "black"
    }
}

generatePieces()



let board = [
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ["empty","empty","empty","empty","empty","empty","empty","empty",],
]

let column = {"A": "0","B": "1","C": "2","D": "3","E": "4","F": "5","G": "6","H": "7"}
let row = {"8": "0","7": "1","6": "2","5": "3","4": "4","3": "5","2": "6","1": "7"}
let lastPieceMoved = ""

function posSetter(){
    resetBoard()
    const pieces = document.querySelectorAll("img")
    pieces.forEach(function (piece) {
        const posID = piece.parentElement.id
        const posColumn = posID[0]
        const posRow = posID[1]
        board[row[posRow]][column[posColumn]] = piece.id
    })
}

function resetBoard () {
    board = [
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
        ["empty","empty","empty","empty","empty","empty","empty","empty",],
    ]
}

posSetter()





//ASSIGNING DROP ZONES
for (const dropZone of document.querySelectorAll(".box")) {
    dropZone.addEventListener("dragover", e => {
        e.preventDefault()
        dropZone.classList.add("drophover")
    })

    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("drophover")
    })

    dropZone.addEventListener("dragend",  e=> {
        document.querySelectorAll(".box").forEach(function (item) {
        item.classList.remove("possibleMove")
        })
    })

    dropZone.addEventListener("drop", e=>{ 
        e.preventDefault()
        dropZone.classList.remove("drophover")
            if(possibleMoves[heldPiece] !== undefined) {
                let targetID = e.target.id
                if(e.target.tagName == 'IMG'){
                    targetID = e.target.parentElement.id
                }
                let targetRow = column[targetID[0]]
                let targetCol = row[targetID[1]]
                let boardLoc = targetCol+""+targetRow
            
                if(possibleMoves[heldPiece].includes(boardLoc)){
                    const droppedElementId = e.dataTransfer.getData("text/plain")
                    const droppedElement = document.getElementById(droppedElementId)
    
                    if(checked === false){
                        legalMove(e,droppedElement,dropZone,boardLoc)
                        if((checked === true && turn === "white" && checkedKing === "kingE8") || (checked === true && turn === "black" && checkedKing === "kingE1")){
                            prevBox.appendChild(dragged)
                            if(captured === true){
                                prevCapturedContainer.appendChild(prevCaptured)
                            }
                            no.currentTime = 0
                            no.play()
                            posSetter()
                            checkPieceMoves()
                            checked = false
                            updateTurn()
                        } else {
                            move.currentTime = 0
                            move.play()
                            if(captured === true){
                                let moveRecord = prevBox.id + " to " + targetID + " captures " + e.target.id
                                console.log(moveRecord)
                                let newMove = document.createElement('li')
                                newMove.innerHTML = moveRecord
                                document.getElementById("moveList").appendChild(newMove)
                            } else {
                                let moveRecord = prevBox.id + " to " + targetID
                                console.log(moveRecord)
                                let newMove = document.createElement('li')
                                newMove.innerHTML = moveRecord
                                document.getElementById("moveList").appendChild(newMove)
                            }
                        }
                    } else if (checked === true) {
                        dropZone.appendChild(droppedElement)
                        const pieceOnPossMove = board[boardLoc[0]][boardLoc[1]]
                        if(pieceOnPossMove !== "empty"){
                            const capturedPiece = document.getElementById(pieceOnPossMove)
                            prevCaptured = capturedPiece
                            prevCapturedContainer = prevCaptured.parentElement
                            capturedPiece.remove()
                            delete possibleMoves[pieceOnPossMove]
                            captured = true
                        }
                        posSetter()
                        checkPieceMoves()
                        isChecked()
                            if(checked === true){
                                prevBox.appendChild(dragged)
                                if(captured === true){
                                    prevCapturedContainer.appendChild(prevCaptured)
                                }
                                posSetter()
                                checkPieceMoves()
                                no.currentTime = 0
                                no.play()
                            } else if (checked === false) {
                                prevBox.appendChild(dragged)
                                if(captured === true){
                                    prevCapturedContainer.appendChild(prevCaptured)
                                }
                                posSetter()
                                checkPieceMoves()
                                legalMove(e,droppedElement,dropZone,boardLoc)
                                if(captured === true){
                                    let moveRecord = prevBox.id + " to " + targetID + " captures " + e.target.id
                                    console.log(moveRecord)
                                    let newMove = document.createElement('li')
                                    newMove.innerHTML = moveRecord
                                    document.getElementById("moveList").appendChild(newMove)
                                } else {
                                    let moveRecord = prevBox.id + " to " + targetID
                                    console.log(moveRecord)
                                    let newMove = document.createElement('li')
                                    newMove.innerHTML = moveRecord
                                    document.getElementById("moveList").appendChild(newMove)
                                }
                                move.currentTime = 0
                                move.play()
                            }
                    }
                } else {
                    no.currentTime = 0
                    no.play()
                }
            } else {
                no.currentTime = 0
                no.play()
            }
        prevCapturedContainer = ""
        prevCaptured = ""
        captured = false
        //RESETS POSSIBLE MOVE CLASS ON DROP
        document.querySelectorAll(".box").forEach(function (item) {
        item.classList.remove("possibleMove")
        })
    })
}

function legalMove (e,droppedElement,dropZone,boardLoc){
        dropZone.appendChild(droppedElement)
        const pieceOnPossMove = board[boardLoc[0]][boardLoc[1]]
        if(pieceOnPossMove !== "empty"){
            const capturedPiece = document.getElementById(pieceOnPossMove)
            prevCaptured = capturedPiece
            prevCapturedContainer = prevCaptured.parentElement
            capturedPiece.remove()
            delete possibleMoves[pieceOnPossMove]
            captured = true
        }
        droppedElement.classList.remove("firstmove")
        posSetter()
        checkPieceMoves()
        isChecked()
        updateTurn()
        if(checked === true){
            isCheckmate()
        }
}

//ITERATE THROUGH POSSIBLE MOVES
function possibleMovesGenerator(piece){

    if(possibleMoves[piece.id] === undefined){

    } else {
        possibleMoves[piece.id].forEach(function (item){
            const moveRow = item[0]
            const finalRow = getKeyByValue(row, moveRow)
            const moveCol = item[1]
            const finalCol = getKeyByValue(column, moveCol)
            document.getElementById(`${finalCol}${finalRow}`).classList.add("possibleMove")
        })
    }
    
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

//PAWN MOVE LOGIC
function checkPawnMoves() {
//ITERATE OVER PIECES AND CHECK IF PAWN
    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            const piece = document.getElementById(`${board[row][col]}`)
            const keyName = board[row][col]
            if(!!piece === true){
                if(piece.classList.contains("whitepiece") && piece.classList.contains("pawn")){
                    let pieceMove = []
                    let pawnMove = []
                    upMovement(pieceMove,row,col,piece)
                    possibleMoves[keyName] = pieceMove
                    //
                    if(piece.classList.contains("firstmove")=== true && possibleMoves[keyName][1] !== undefined){
                        //possibleMoves[keyName] = [possibleMoves[keyName][0],possibleMoves[keyName][1]]
                        if(possibleMoves[keyName][0] !== undefined){
                            pawnMove.push(possibleMoves[keyName][0])
                        }
                        if(possibleMoves[keyName][1] !== undefined){
                            pawnMove.push(possibleMoves[keyName][1])
                        }
                    }
                    else{
                        //possibleMoves[keyName] = [possibleMoves[keyName][0]]
                        if(possibleMoves[keyName][0] !== undefined){
                            pawnMove.push(possibleMoves[keyName][0])
                        }
                    }

                    //UP LEFT CAPTURE
                    if(col > 0 && row > 0){
                        let possibleCapture = document.getElementById(`${board[row-1][col-1]}`)
                        if(board[row-1][col-1] !== "empty"){
                            if(piece.classList[0] !== possibleCapture.classList[0]){
                                pawnMove.push(`${[row-1]}${[col-1]}`)
                            }
                        }
                    }
                    //UP RIGHT CAPTURE
                    if(col < 7 && row > 0){
                        let possibleCapture = document.getElementById(`${board[row-1][col+1]}`)
                        if(board[row-1][col+1] !== "empty"){
                            if(piece.classList[0] !== possibleCapture.classList[0]){
                                pawnMove.push(`${[row-1]}${[col+1]}`)
                            }
                        }
                    }
                    possibleMoves[keyName] = pawnMove
                } else if (piece.classList.contains("blackpiece") && piece.classList.contains("pawn")) {
                    let pieceMove = []
                    let pawnMove = []
                    downMovement(pieceMove,row,col,piece)
                    possibleMoves[keyName] = pieceMove

                    if(piece.classList.contains("firstmove")=== true && possibleMoves[keyName][1] !== undefined){
                        //possibleMoves[keyName] = [possibleMoves[keyName][0],possibleMoves[keyName][1]]
                        if(possibleMoves[keyName][0] !== undefined){
                            pawnMove.push(possibleMoves[keyName][0])
                        }

                        if(possibleMoves[keyName][1] !== undefined){
                            pawnMove.push(possibleMoves[keyName][1])
                        }
                    }
                    else{
                        //possibleMoves[keyName] = [possibleMoves[keyName][0]]
                        if(possibleMoves[keyName][0] !== undefined){
                            pawnMove.push(possibleMoves[keyName][0])
                        }
                    }

                    //DOWN LEFT CAPTURE
                    if(col > 0 && row < 7){
                        let possibleCapture = document.getElementById(`${board[row+1][col-1]}`)
                        if(board[row+1][col-1] !== "empty"){
                            if(piece.classList[0] !== possibleCapture.classList[0]){
                                pawnMove.push(`${[row+1]}${[col-1]}`)
                            }
                        }
                    }
                    //DOWN RIGHT CAPTURE
                    if(col < 7 && row < 7){
                        let possibleCapture = document.getElementById(`${board[row+1][col+1]}`)
                        if(board[row+1][col+1] !== "empty"){
                            if(piece.classList[0] !== possibleCapture.classList[0]){
                                pawnMove.push(`${[row+1]}${[col+1]}`)
                            }
                        }
                    }
                    possibleMoves[keyName] = pawnMove
                }
            }
        }
    }
}

//ROOK MOVE LOGIC
function checkRookMoves() {
//ITERATE OVER PIECES AND CHECK IF ROOK
    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            const piece = document.getElementById(`${board[row][col]}`)
            const keyName = board[row][col]
            if(!!piece === true){
                if(piece.classList.contains("rook")){
                    let pieceMove = []
                    upMovement(pieceMove,row,col,piece)
                    downMovement(pieceMove,row,col,piece)
                    leftMovement (pieceMove,row,col,piece)
                    rightMovement (pieceMove,row,col,piece)
                    possibleMoves[keyName] = pieceMove
                } 
            }
        }
    }
}

//BISHOP MOVE LOGIC
function checkBishopMoves() {
    //ITERATE OVER PIECES AND CHECK IF ROOK
        for (let row = 0; row < 8; row++){
            for (let col = 0; col < 8; col++){
                const piece = document.getElementById(`${board[row][col]}`)
                const keyName = board[row][col]
                if(!!piece === true){
                    if(piece.classList.contains("bishop")){
                        let pieceMove = []
                        upRightMovement(pieceMove,row,col,piece)
                        downLeftMovement(pieceMove,row,col,piece)
                        upLeftMovement (pieceMove,row,col,piece)
                        downRightMovement (pieceMove,row,col,piece)
                        possibleMoves[keyName] = pieceMove
                    } 
                }
            }
        }
    }

//QUEEN MOVE LOGIC
function checkQueenMoves() {
    //ITERATE OVER PIECES AND CHECK IF ROOK
        for (let row = 0; row < 8; row++){
            for (let col = 0; col < 8; col++){
                const piece = document.getElementById(`${board[row][col]}`)
                const keyName = board[row][col]
                if(!!piece === true){
                    if(piece.classList.contains("queen")){
                        let pieceMove = []
                        upMovement(pieceMove,row,col,piece)
                        downMovement(pieceMove,row,col,piece)
                        leftMovement (pieceMove,row,col,piece)
                        rightMovement (pieceMove,row,col,piece)
                        upRightMovement(pieceMove,row,col,piece)
                        downLeftMovement(pieceMove,row,col,piece)
                        upLeftMovement (pieceMove,row,col,piece)
                        downRightMovement (pieceMove,row,col,piece)
                        possibleMoves[keyName] = pieceMove
                    } 
                }
            }
        }
    }



//KING MOVE LOGIC
function checkKingMoves() {
    //ITERATE OVER PIECES AND CHECK IF ROOK
        for (let row = 0; row < 8; row++){
            for (let col = 0; col < 8; col++){
                const piece = document.getElementById(`${board[row][col]}`)
                const keyName = board[row][col]
                if(!!piece === true){
                    if(piece.classList.contains("king")){
                        let pieceMove = []
                        let kingsMove = []
                        upMovement(pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        downMovement(pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        leftMovement (pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        rightMovement (pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        upRightMovement(pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        downLeftMovement(pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        upLeftMovement (pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        downRightMovement (pieceMove,row,col,piece)
                        if(pieceMove[0] !== undefined){
                            kingsMove.push(pieceMove[0])
                            pieceMove = []
                        }
                        possibleMoves[keyName] = kingsMove
                    } 
                }
            }
        }
    }

//HORSE MOVE LOGIC
function checkHorseMoves() {
    //ITERATE OVER PIECES AND CHECK IF HORSE
        for (let row = 0; row < 8; row++){
            for (let col = 0; col < 8; col++){
                const piece = document.getElementById(`${board[row][col]}`)
                const keyName = board[row][col]
                if(!!piece === true){
                    if(piece.classList.contains("horse")){
                        let horseMove = []
                        //(2-UP)(1LEFT) **
                        if(col > 0 && row > 1){
                            let possibleCapture = document.getElementById(`${board[row-2][col-1]}`)
                            if(board[row-2][col-1] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row-2]}${[col-1]}`)
                            }
                        }

                        //(1-UP)(2LEFT) **
                        if(col > 1 && row > 0){
                            let possibleCapture = document.getElementById(`${board[row-1][col-2]}`)
                            if(board[row-1][col-2] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row-1]}${[col-2]}`)
                            }
                        }

                        //(2-UP)(1RIGHT) **
                        if(col < 7 && row > 1){
                            let possibleCapture = document.getElementById(`${board[row-2][col+1]}`)
                            if(board[row-2][col+1] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row-2]}${[col+1]}`)
                            }
                        }

                        //(1-UP)(2RIGHT) **
                        if(col < 6 && row > 0){
                            let possibleCapture = document.getElementById(`${board[row-1][col+2]}`)
                            if(board[row-1][col+2] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row-1]}${[col+2]}`)
                            }
                        }

                        //(2-DOWN)(1LEFT) **
                        if(col > 0 && row < 6){
                            let possibleCapture = document.getElementById(`${board[row+2][col-1]}`)
                            if(board[row+2][col-1] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row+2]}${[col-1]}`)
                            }
                        }

                        //(1-DOWN)(2LEFT) **
                        if(col > 1 && row < 7){
                            let possibleCapture = document.getElementById(`${board[row+1][col-2]}`)
                            if(board[row+1][col-2] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row+1]}${[col-2]}`)
                            }
                        }

                        //(2-DOWN)(1RIGHT) **
                        if(col < 7 && row < 6){
                            let possibleCapture = document.getElementById(`${board[row+2][col+1]}`)
                            if(board[row+2][col+1] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row+2]}${[col+1]}`)
                            }
                        }

                        //(1-DOWN)(2RIGHT) 
                        if(col < 6 && row < 7){
                            let possibleCapture = document.getElementById(`${board[row+1][col+2]}`)
                            if(board[row+1][col+2] === "empty" || piece.classList[0] !== possibleCapture.classList[0]){
                                horseMove.push(`${[row+1]}${[col+2]}`)
                            }
                        }

                        possibleMoves[keyName] = horseMove
                    
                    } 
                }
            }
        }
    }

// UPDATING THE TURN AND DISABLING MOVE FOR OTHER PLAYER
function updateTurn(){
    if(turn === "white"){
        document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn`
        if(checked === true){
            document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
        }
        turn = "black"
        disableWhite()
    } else if(turn === "black"){
        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn`
        if(checked === true){
            document.getElementById(`playerTurnLabel`).innerHTML = `White's turn, white is checked.`
        }
        turn = "white"
        disableBlack()
    }
}



checkPieceMoves()
disableBlack()

function checkPieceMoves(){
    checkPawnMoves()
    checkRookMoves()
    checkBishopMoves()
    checkQueenMoves()
    checkKingMoves()
    checkHorseMoves()
    removePieceWithNoMoves()
}

function upMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while(row>0 && pieceBlock===false){ 
        if(board[row-1][col]==="empty"){ 
            pieceMove.push(`${row-1}${col}`)
        } else{
            if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row-1][col]}`).classList[0])){
                pieceMove.push(`${row-1}${col}`)
            }
                pieceBlock = true
        }
        row--
    }
        
}

function downMovement(pieceMove,row,col,piece) {
    let pieceBlock = false
    while(row<7 && pieceBlock===false){ 
                if(board[row+1][col]==="empty"){ 
                    pieceMove.push(`${row+1}${col}`)
                } else{
                    if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row+1][col]}`).classList[0])){
                        pieceMove.push(`${row+1}${col}`)
                    }
                    pieceBlock = true
                }
                row++
            }
}

function leftMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while(col>0 && pieceBlock===false){ 
        if(board[row][col-1]==="empty"){
            pieceMove.push(`${row}${col-1}`)
        } else{
            if(piece.classList[0] !== document.getElementById(`${board[row][col-1]}`).classList[0]){
                pieceMove.push(`${row}${col-1}`)
            }
            pieceBlock = true
        }
        col--
    }
}

function rightMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while(col<7 && pieceBlock===false){ 
        if(board[row][col+1]==="empty"){ 
            pieceMove.push(`${row}${col+1}`)
        } else{
            if(piece.classList[0] !== document.getElementById(`${board[row][col+1]}`).classList[0]){
                pieceMove.push(`${row}${col+1}`)
            }
            pieceBlock = true
        }
        col++
    }

}

function upRightMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while((col<7 && row>0) && pieceBlock===false){ 
            if(board[row-1][col+1]==="empty"){ 
                pieceMove.push(`${row-1}${col+1}`)
            } else{
                if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row-1][col+1]}`).classList[0])){
                    pieceMove.push(`${row-1}${col+1}`)
                }
                    pieceBlock = true
            }
            row--
            col++
        }
}

function upLeftMovement (pieceMove,row,col,piece){
    let pieceBlock = false
    while((col>0 && row>0) && pieceBlock===false){ 
        if(board[row-1][col-1]==="empty"){ 
            pieceMove.push(`${row-1}${col-1}`)
        } else{
            if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row-1][col-1]}`).classList[0])){
                pieceMove.push(`${row-1}${col-1}`)
            }
                pieceBlock = true
        }
        row--
        col--
    }
}

function downRightMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while((col < 7 && row < 7) && pieceBlock===false){ 
        if(board[row+1][col+1]==="empty"){ 
            pieceMove.push(`${row+1}${col+1}`)
        } else{
            if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row+1][col+1]}`).classList[0])){
                pieceMove.push(`${row+1}${col+1}`)
            }
            pieceBlock = true
        }
        row++
        col++
    }
}

function downLeftMovement (pieceMove,row,col,piece) {
    let pieceBlock = false
    while((col > 0 && row < 7) && pieceBlock===false){ 
        if(board[row+1][col-1]==="empty"){ 
            pieceMove.push(`${row+1}${col-1}`)
        } else{
            if(piece.classList.contains("pawn") !== true && (piece.classList[0] !== document.getElementById(`${board[row+1][col-1]}`).classList[0])){
                pieceMove.push(`${row+1}${col-1}`)
            }
            pieceBlock = true
        }
        row++
        col--
    }
}

function removePieceWithNoMoves() {
    const possibleMovesKeys = Object.keys(possibleMoves)
    possibleMovesKeys.forEach(function (item){
        if(possibleMoves[item][0] === undefined ){
            delete possibleMoves[item]
        }
    })
}

function disableBlack(){
    for (const blackpiece of document.querySelectorAll(".blackpiece")) {
        blackpiece.setAttribute("draggable", "false")
    }
    for (const whitepiece of document.querySelectorAll(".whitepiece")) {
        whitepiece.setAttribute("draggable", "true")
    }

}

function disableWhite(){
    for (const blackpiece of document.querySelectorAll(".blackpiece")) {
        blackpiece.setAttribute("draggable", "true")
    }
    for (const whitepiece of document.querySelectorAll(".whitepiece")) {
        whitepiece.setAttribute("draggable", "false")
    }
}

function isChecked() {
    const possibleMovesKeys = Object.keys(possibleMoves)
    let possibleMoveArr = []

    possibleMovesKeys.forEach(function (item){
        possibleMoves[item].forEach(function(item){
            possibleMoveArr.push(item)
        })
    })

    possibleMoveArr.every(function (item){
        let curRow = item[0]
        let curCol = item[1]
        if(board[curRow][curCol] === "kingE1" || board[curRow][curCol] === "kingE8"){
            checked = true
            checkedKing = board[curRow][curCol]
            return false
        } else {
            checked = false
            checkedKing = ""
            return true
        }
    })
}

function isCheckmate(){
    const pieceWithMoves = Object.keys(possibleMoves)
    let cancelCheckMoves = []

    pieceWithMoves.forEach(function (item) {
        let currentPiece = item
        
        if(turn==="white"){
            let pieceCurrLoc
            for(let row = 0; row < 8; row++){
                for(let col = 0; col < 8; col++){
                    if(item===board[row][col] && (item.includes("2") || item.includes("1"))){
                        pieceCurrLoc = `${row}${col}`
                        let movePiece = possibleMoves[item]
                        movePiece.forEach(function (item){
                            let moveRow = item[0]
                            let moveCol = item[1]
                            let removeRow = pieceCurrLoc[0]
                            let removeCol = pieceCurrLoc[1]
                            board[removeRow][removeCol] = "empty"
                            board[moveRow][moveCol] = currentPiece
                            checkPieceMoves()
                            isChecked()
                            posSetter()
                            if(checked === false){
                                cancelCheckMoves.push(`${moveRow}${moveCol}`)
                            }
                            checkPieceMoves()
                        })
                    }
                }
            }
        } else if(turn==="black"){
            let pieceCurrLoc
            for(let row = 0; row < 8; row++){
                for(let col = 0; col < 8; col++){
                    if(item===board[row][col] && (item.includes("7") || item.includes("8"))){
                        pieceCurrLoc = `${row}${col}`
                        let movePiece = possibleMoves[item]
                        movePiece.forEach(function (item){
                            let moveRow = item[0]
                            let moveCol = item[1]
                            let removeRow = pieceCurrLoc[0]
                            let removeCol = pieceCurrLoc[1]

                            if(board[moveRow][moveCol] !== "empty"){
                                const eatenPiece = board[moveRow][moveCol]
                                delete possibleMoves[eatenPiece]
                            }

                            board[removeRow][removeCol] = "empty"
                            board[moveRow][moveCol] = currentPiece
                            checkPieceMoves()
                            isChecked()
                            posSetter()
                            if(checked === false){
                                cancelCheckMoves.push(`${moveRow}${moveCol}`)
                            }
                            checkPieceMoves()
                        })
                    }
                }
            }
        }
    })

    checked = true //LOOK AT THIS
    if(cancelCheckMoves.length===0){
        checkmate = true
        for (const blackpiece of document.querySelectorAll(".blackpiece")) {
            blackpiece.setAttribute("draggable", "false")
        }
        for (const whitepiece of document.querySelectorAll(".whitepiece")) {
            whitepiece.setAttribute("draggable", "false")
        }
        document.getElementById(`playerTurnLabel`).innerHTML = `Checkmate, `

        if(turn === "black"){
            document.getElementById(`playerTurnLabel`).append(`white wins!`)
        } else {
            document.getElementById(`playerTurnLabel`).append(`black wins!`)
        }
        win.currentTime = 0
        win.play()
        const resetBtnWrapper = document.createElement(`div`)
        resetBtnWrapper.setAttribute(`id`,`resetBtnWrapper`)
        body.appendChild(resetBtnWrapper)
        const resetBtn = document.createElement(`button`)
        resetBtn.setAttribute(`id`,`resetBtn`)
        resetBtn.innerHTML = "New Game"
        resetBtnWrapper.appendChild(resetBtn)

        resetBtn.addEventListener("click", function() {
            turn = "white"
            checked = false
            dragged = ""
            prevBox = ""
            checkedKing = ""
            prevCaptured = ""
            prevCapturedContainer = ""
            captured = false
            checkmate = false
            checkmate = false
            possibleMoves = {}
            let oldPieces = document.querySelectorAll(`img`)
            oldPieces.forEach(function (item){
                item.remove()
            })
            generatePieces()
            resetBoard ()
            posSetter()
            checkPieceMoves()
            disableBlack()
            document.getElementById(`playerTurnLabel`).innerHTML = `White's turn`
            document.getElementById(`moveList`).innerHTML = ``
            resetBtnWrapper.remove()
            if(rotated===true){
                rotate()
            }
        })
    }
}

function rotate(){
    document.getElementById("board").classList.toggle("rotate")
    const box = document.querySelectorAll(".box")
    box.forEach(function (item) {
        item.classList.toggle("rotate")
    })
    move.currentTime = 0
    move.play()

    if (rotated === false){
        rotated = true
    } else {
        rotated = false
    }
}

function pawnPromotion (promoteTo){
    let pieceToChange = ""
    let pieceToChangeLoc = ""
    let pieceColor
    let pieceColorId
    board[0].forEach(function (item){
        if(item.includes("pawn") && item.includes("2")){
            pieceColor = "w"
            pieceColorId = "white"
        } else if (item.includes("pawn") && item.includes("7")){
            pieceColor = "b"
            pieceColorId = "black"
        }
            //DISPLAY CHOICE OF PIECE ON WEBPAGE
        pieceToChange = item
        pieceToChangeLoc = board[0].indexOf(item)
        pieceToChangeLoc = pieceToChangeLoc.toString()
        let pieceToChangeCol = getKeyByValue(column, pieceToChangeLoc)
        document.getElementById(pieceToChange).remove()
        switch(promoteTo){
            case "queen":
                const piece = document.createElement('img')
                const box = document.getElementById(`${pieceToChangeCol}8`)
                piece.setAttribute("src",`chesspiece/${pieceColorClass}queen.png`)
                piece.setAttribute("class",`whitepiece queen`)
                piece.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                box.appendChild(piece)

                piece.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", piece.id)
                    possibleMovesGenerator(piece)
                    dragged = event.target
                    prevBox = dragged.parentElement
                    posSetter()
                    checkPieceMoves()
                })
                promoteCounter++
                break;
        }
    })
}
