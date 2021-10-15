const body = document.body
const rowLabel = [8,7,6,5,4,3,2,1]
rowLabel.toString()
const columnLabel = ['A','B','C','D','E','F','G','H']
let counter = 1
let turn = "white"
let whiteIsChecked = false
let blackIsChecked = false
let dragged 
let prevBox
let checkedKing = ""
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
let piecePossibleMoves = []
let pieceOnPossMove = ""
let passingPawn = ""
let passingBox = ""
let leftPiece = `empty`
let rightPiece = `empty`
let passingPawnLoc = ``

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
                piecePossibleMoves = possibleMoves[heldPiece]
            })
        }

        // ROOK GENERATION
        for(let i = 0; i < 8; i++){

            if( columnLabel[i] === 'A' || columnLabel[i] === 'H'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}rook.png`)
                piece.setAttribute("class",`${pieceColorClass}piece rook`)
                piece.setAttribute("class",`${pieceColorClass}piece rook firstmove`)
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
                piece.setAttribute("class",`${pieceColorClass}piece king firstmove`)
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
        const droppedElementId = e.dataTransfer.getData("text/plain")
        const droppedElement = document.getElementById(droppedElementId)
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
                if(blackIsChecked === false && whiteIsChecked === false){
                    if(board[boardLoc[0]][boardLoc[1]] === "empty"){
                        board[boardLoc[0]][boardLoc[1]] = heldPiece
                        dropZone.appendChild(droppedElement)
                        if(passingBox === dropZone.id && (droppedElementId.includes(`pawn`))){
                            delete possibleMoves[passingPawn.id]
                            passingPawn.remove()
                        }
                        posSetter()
                        checkPieceMoves()
                        isChecked()
                        if((blackIsChecked === false && whiteIsChecked === false) || (turn==="white" && whiteIsChecked === false && blackIsChecked === true) || (turn==="black" && blackIsChecked === false && whiteIsChecked === true)){

                            if(droppedElementId !== "kingE1" && droppedElementId !== "kingE8"){
                                move.currentTime = 0
                                move.play()
                                pawnPromotionChecker()
                                updateTurn()
                                let moveRecord = prevBox.id + " to " + targetID
                                let newMove = document.createElement('li')
                                newMove.innerHTML = moveRecord
                                document.getElementById("moveList").appendChild(newMove)
                                isCheckmate()
                                document.querySelectorAll(".pawn").forEach(function (item) {
                                    item.classList.remove("passing")
                                    })
                                passingPawn = ""
                                passingBox = ""
                                passingPawnLoc = ""
                                leftPiece = `empty`
                                rightPiece = `empty`
                                if(droppedElement.classList.contains("firstmove") && droppedElement.classList.contains("pawn")){
                                    if(droppedElement.classList.contains("whitepiece") && dropZone.id.includes(`4`)){
                                        droppedElement.classList.add("passing")
                                        passingPawn = droppedElement
                                        passingPawnLoc = droppedElement.parentElement
                                        passingBox = targetID[0]+(parseInt(targetID[1])-1)
                                    }
                                    else if(droppedElement.classList.contains("blackpiece") && dropZone.id.includes(`5`)){
                                        droppedElement.classList.add("passing")
                                        passingPawn = droppedElement
                                        passingPawnLoc = droppedElement.parentElement
                                        passingBox = targetID[0]+(parseInt(targetID[1])+1)
                                    }
                                }
                                droppedElement.classList.remove("firstmove")
                            } else {
                                let blackMovesPossible = []
                                let whiteMovesPossible = []
                                for (const piece in possibleMoves) {
                                    if(piece.includes(`7`) || piece.includes(`8`)){
                                        possibleMoves[piece].forEach(function(move){
                                            blackMovesPossible.push(move)
                                        })
                                    } 
                                    if(piece.includes(`1`) || piece.includes(`2`)) {
                                        possibleMoves[piece].forEach(function(move){
                                            whiteMovesPossible.push(move)
                                        })
                                    }
                                }

                                if(droppedElementId === "kingE1" && droppedElement.classList.contains(`firstmove`) && (dropZone.id === `G1` || dropZone.id === `C1`)){
                                    //WHITE RIGHT CASTLING
                                    if(droppedElementId === "kingE1" && dropZone.id === `G1` && blackMovesPossible.includes(`75`) === false){
                                        const castledRook = document.getElementById(`rookH1`)
                                        const castledRookTarget = document.getElementById(`F1`)
                                        castledRookTarget.appendChild(castledRook)
                                        posSetter()
                                        checkPieceMoves()
                                        move.currentTime = 0
                                        move.play()
                                        pawnPromotionChecker()
                                        updateTurn()
                                        let moveRecord = prevBox.id + " to " + targetID
                                        let newMove = document.createElement('li')
                                        newMove.innerHTML = moveRecord
                                        document.getElementById("moveList").appendChild(newMove)
                                        isCheckmate()
                                        droppedElement.classList.remove("firstmove")

                                    } 
                                    //WHITE LEFT CASTLING
                                    else if(droppedElementId === "kingE1" && dropZone.id === `C1` && blackMovesPossible.includes(`73`) === false ){
                                        const castledRook = document.getElementById(`rookA1`)
                                        const castledRookTarget = document.getElementById(`D1`)
                                        castledRookTarget.appendChild(castledRook)
                                        posSetter()
                                        checkPieceMoves()
                                        move.currentTime = 0
                                        move.play()
                                        pawnPromotionChecker()
                                        updateTurn()
                                        let moveRecord = prevBox.id + " to " + targetID
                                        let newMove = document.createElement('li')
                                        newMove.innerHTML = moveRecord
                                        document.getElementById("moveList").appendChild(newMove)
                                        isCheckmate()
                                        droppedElement.classList.remove("firstmove")
                                    } else {
                                        prevBox.appendChild(dragged)
                                        posSetter()
                                        checkPieceMoves()
                                        isChecked()
                                        no.currentTime = 0
                                        no.play()
                                    }


                                } else if (droppedElementId === "kingE8" && droppedElement.classList.contains(`firstmove`) && (dropZone.id === `G8` || dropZone.id === `C8`)){
                                    //BLACK RIGHT CASTLING
                                    if(droppedElementId === "kingE8" && dropZone.id === `G8` && whiteMovesPossible.includes(`05`) === false ) {   
                                        const castledRook = document.getElementById(`rookH8`)
                                        const castledRookTarget = document.getElementById(`F8`)
                                        castledRookTarget.appendChild(castledRook)
                                        posSetter()
                                        checkPieceMoves()
                                        move.currentTime = 0
                                        move.play()
                                        pawnPromotionChecker()
                                        updateTurn()
                                        let moveRecord = prevBox.id + " to " + targetID
                                        let newMove = document.createElement('li')
                                        newMove.innerHTML = moveRecord
                                        document.getElementById("moveList").appendChild(newMove)
                                        isCheckmate()
                                        droppedElement.classList.remove("firstmove")
                                    } 
                                    //BLACK LEFT CASTLING
                                    else if(droppedElementId === "kingE8" && dropZone.id === `C8` && whiteMovesPossible.includes(`03`) === false ) {
                                        const castledRook = document.getElementById(`rookA8`)
                                        const castledRookTarget = document.getElementById(`D8`)
                                        castledRookTarget.appendChild(castledRook)
                                        posSetter()
                                        checkPieceMoves()
                                        move.currentTime = 0
                                        move.play()
                                        pawnPromotionChecker()
                                        updateTurn()
                                        let moveRecord = prevBox.id + " to " + targetID
                                        let newMove = document.createElement('li')
                                        newMove.innerHTML = moveRecord
                                        document.getElementById("moveList").appendChild(newMove)
                                        isCheckmate()
                                        droppedElement.classList.remove("firstmove")
                                    } else {
                                        prevBox.appendChild(dragged)
                                        posSetter()
                                        checkPieceMoves()
                                        isChecked()
                                        no.currentTime = 0
                                        no.play()
                                    }

                                } else {
                                    move.currentTime = 0
                                    move.play()
                                    pawnPromotionChecker()
                                    updateTurn()
                                    let moveRecord = prevBox.id + " to " + targetID
                                    let newMove = document.createElement('li')
                                    newMove.innerHTML = moveRecord
                                    document.getElementById("moveList").appendChild(newMove)
                                    isCheckmate()
                                    droppedElement.classList.remove("firstmove")
                                }
                            }
                        } else if ((turn==="white" && whiteIsChecked === true) || (turn==="black" && blackIsChecked === true)) {
                            prevBox.appendChild(dragged)
                            
                            if(passingBox === dropZone.id && (droppedElementId.includes(`pawn`))){
                                passingPawnLoc.appendChild(passingPawn)
                            }
                            posSetter()
                            checkPieceMoves()
                            isChecked()
                            no.currentTime = 0
                            no.play()
                        }
                    } else if(board[boardLoc[0]][boardLoc[1]] !== "empty"){
                        const pieceToCapture = board[boardLoc[0]][boardLoc[1]]
                        board[boardLoc[0]][boardLoc[1]] = heldPiece
                        delete possibleMoves[pieceToCapture]
                        const pieceToCaptureDOM = document.getElementById(pieceToCapture)
                        pieceToCaptureDOM.remove()
                        dropZone.appendChild(droppedElement)
                        posSetter()
                        checkPieceMoves()
                        isChecked()
                        if((blackIsChecked === false && whiteIsChecked === false) || (turn==="white" && whiteIsChecked === false && blackIsChecked === true) || (turn==="black" && blackIsChecked === false && whiteIsChecked === true)){
                            move.currentTime = 0
                            move.play()
                            pawnPromotionChecker()
                            updateTurn()
                            let moveRecord = prevBox.id + " to " + dropZone.id + " captures " + pieceToCapture
                            let newMove = document.createElement('li')
                            newMove.innerHTML = moveRecord
                            document.getElementById("moveList").appendChild(newMove)
                            isCheckmate()
                            
                            document.querySelectorAll(".pawn").forEach(function (item) {
                                item.classList.remove("passing")
                                })
                            passingPawn = ""
                            passingPawnLoc = ""
                            passingBox = ""
                            leftPiece = `empty`
                            rightPiece = `empty`
                            droppedElement.classList.remove("firstmove")
                        } else if ((turn==="white" && whiteIsChecked === true) || (turn==="black" && blackIsChecked === true)) {
                            prevBox.appendChild(dragged)
                            dropZone.appendChild(pieceToCaptureDOM)
                            board[boardLoc[0]][boardLoc[1]] = pieceToCapture
                            posSetter()
                            checkPieceMoves()
                            isChecked()
                            no.currentTime = 0
                            no.play()
                        }
                    }
                } else if (whiteIsChecked === true || blackIsChecked === true) {
                    if(board[boardLoc[0]][boardLoc[1]] === "empty"){
                        board[boardLoc[0]][boardLoc[1]] = heldPiece
                        dropZone.appendChild(droppedElement)
                        posSetter()
                        checkPieceMoves()
                        isChecked()
                        
                        if((turn==="white" && whiteIsChecked === false) || (turn==="black" && blackIsChecked === false)){
                            move.currentTime = 0
                            move.play()
                            pawnPromotionChecker()
                            updateTurn()
                            let moveRecord = prevBox.id + " to " + targetID
                            let newMove = document.createElement('li')
                            newMove.innerHTML = moveRecord
                            document.getElementById("moveList").appendChild(newMove)
                            isCheckmate()
                            document.querySelectorAll(".pawn").forEach(function (item) {
                                item.classList.remove("passing")
                                })
                            passingPawn = ""
                            passingBox = ""
                            passingPawnLoc = ""
                            leftPiece = `empty`
                            rightPiece = `empty`
                            if(droppedElement.classList.contains("firstmove") && droppedElement.classList.contains("pawn")){
                                if(droppedElement.classList.contains("whitepiece") && dropZone.id.includes(`4`)){
                                    droppedElement.classList.add("passing")
                                    passingPawn = droppedElement
                                    passingPawnLoc = droppedElement.parentElement
                                    passingBox = targetID[0]+(parseInt(targetID[1])-1)
                                }
                                else if(droppedElement.classList.contains("blackpiece") && dropZone.id.includes(`5`)){
                                    droppedElement.classList.add("passing")
                                    passingPawn = droppedElement
                                    passingPawnLoc = droppedElement.parentElement
                                    passingBox = targetID[0]+(parseInt(targetID[1])+1)
                                }
                            }
                            droppedElement.classList.remove("firstmove")
                        } else{
                            prevBox.appendChild(dragged)
                            posSetter()
                            checkPieceMoves()
                            isChecked()
                            no.currentTime = 0
                            no.play()
                        }
                    } else if(board[boardLoc[0]][boardLoc[1]] !== "empty"){
                        const pieceToCapture = board[boardLoc[0]][boardLoc[1]]
                        board[boardLoc[0]][boardLoc[1]] = heldPiece
                        delete possibleMoves[pieceToCapture]
                        const pieceToCaptureDOM = document.getElementById(pieceToCapture)
                        pieceToCaptureDOM.remove()
                        dropZone.appendChild(droppedElement)
                        posSetter()
                        checkPieceMoves()
                        isChecked()
                        if((turn==="white" && whiteIsChecked === false) || (turn==="black" && blackIsChecked === false) ){
                            move.currentTime = 0
                            move.play()
                            pawnPromotionChecker()
                            updateTurn()
                            let moveRecord = prevBox.id + " to " + dropZone.id + " captures " + pieceToCapture
                            let newMove = document.createElement('li')
                            newMove.innerHTML = moveRecord
                            document.getElementById("moveList").appendChild(newMove)
                            isCheckmate()
                            document.querySelectorAll(".pawn").forEach(function (item) {
                                item.classList.remove("passing")
                                })
                            passingPawn = ""    
                            passingBox = ""
                            passingPawnLoc = ""
                            leftPiece = `empty`
                            rightPiece = `empty`
                            droppedElement.classList.remove("firstmove")
                        } else{
                            prevBox.appendChild(dragged)
                            dropZone.appendChild(pieceToCaptureDOM)
                            board[boardLoc[0]][boardLoc[1]] = pieceToCapture
                            posSetter()
                            checkPieceMoves()
                            isChecked()
                            no.currentTime = 0
                            no.play()
                        }
                    }
                }
            }else {
                no.currentTime = 0
                no.play()
            }
    } else {
        no.currentTime = 0
        no.play()
    }
    posSetter()
    checkPieceMoves()
    prevCapturedContainer = ""
    prevCaptured = ""
    captured = false
    pieceOnPossMove = ""
    document.querySelectorAll(".box").forEach(function (item) {
        item.classList.remove("possibleMove")
        })

    if(whiteIsChecked === true && possibleMoves[`kingE1`] !== undefined){
        if(possibleMoves[`kingE1`].includes(`72`)){
            const index = possibleMoves[`kingE1`].indexOf(`72`)
            possibleMoves[`kingE1`].splice(index,1)
        } else if (possibleMoves[`kingE1`].includes(`76`)){
            const index = possibleMoves[`kingE1`].indexOf(`76`)
            possibleMoves[`kingE1`].splice(index,1)
        }
    } else if(blackIsChecked === true && possibleMoves[`kingE8`] !== undefined){
        if(possibleMoves[`kingE8`].includes(`06`)){
            const index = possibleMoves[`kingE1`].indexOf(`06`)
            possibleMoves[`kingE8`].splice(index,1)
        } else if (possibleMoves[`kingE8`].includes(`02`)){
            const index = possibleMoves[`kingE8`].indexOf(`02`)
            possibleMoves[`kingE8`].splice(index,1)
        }
    }

    

        })
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

                    //PASSING CAPTURE UP RIGHT
                    if(col < 7 && row > 0){
                        let possibleCapture = document.getElementById(`${board[row][col+1]}`)
                        if(board[row][col+1] !== "empty"){
                            if(possibleCapture.classList.contains(`passing`)){
                                pawnMove.push(`${[row-1]}${[col+1]}`)
                            }
                        }
                    }

                    //PASSING CAPTURE UP LEFT
                    if(col > 0 && row > 0){
                        let possibleCapture = document.getElementById(`${board[row][col-1]}`)
                        if(board[row][col-1] !== "empty"){
                            if(possibleCapture.classList.contains(`passing`)){
                                pawnMove.push(`${[row-1]}${[col-1]}`)
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

                    //PASSING DOWN LEFT CAPTURE
                    if(col > 0 && row < 7){
                        let possibleCapture = document.getElementById(`${board[row][col-1]}`)
                        if(board[row][col-1] !== "empty"){
                            if(possibleCapture.classList.contains(`passing`)){
                                pawnMove.push(`${[row+1]}${[col-1]}`)
                            }
                        }
                    }
                    //PASSING DOWN RIGHT CAPTURE
                    if(col < 7 && row < 7){
                        let possibleCapture = document.getElementById(`${board[row][col+1]}`)
                        if(board[row][col+1] !== "empty"){
                            if(possibleCapture.classList.contains(`passing`)){
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
                        //if() add condition if rook is gone
                        if(!!document.getElementById(`rookH1`)){
                            if(piece.id === "kingE1" && piece.classList.contains("firstmove") && document.getElementById(`rookH1`).classList.contains("firstmove") && board[7][5] === `empty` && board[7][6] === `empty`  ){
                                kingsMove.push(`76`)
                                pieceMove = []
                            }
                        }
                        if(!!document.getElementById(`rookA1`)){
                            if(piece.id === "kingE1" && piece.classList.contains("firstmove") && document.getElementById(`rookA1`).classList.contains("firstmove") && board[7][1] === `empty` && board[7][2] === `empty` && board[7][3] === `empty` ){
                                kingsMove.push(`72`)
                                pieceMove = []
                            }
                        }
                        if(!!document.getElementById(`rookH8`)){
                            if(piece.id === "kingE8" && piece.classList.contains("firstmove") && document.getElementById(`rookH8`).classList.contains("firstmove") && board[0][5] === `empty` && board[0][6] === `empty`  ){
                                kingsMove.push(`06`)
                                pieceMove = []                      
                            }
                        }
                        if(!!document.getElementById(`rookA8`)){
                            if(piece.id === "kingE8" && piece.classList.contains("firstmove") && document.getElementById(`rookA8`).classList.contains("firstmove") && board[0][1] === `empty` && board[0][2] === `empty` && board[0][3] === `empty` ){
                                kingsMove.push(`02`)
                                pieceMove = []
                            }                           
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
        if(blackIsChecked === true){
            document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
        }
        turn = "black"
        disableWhite()
    } else if(turn === "black"){
        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn`
        if(whiteIsChecked === true){
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
    checkHorseMoves()
    checkKingMoves()
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
    let piecesOnPossMove = []

    possibleMovesKeys.forEach(function (item){
        possibleMoves[item].forEach(function(item){
            possibleMoveArr.push(item)
        })
    })

    possibleMoveArr.forEach(function (item){
        let curRow = item[0]
        let curCol = item[1]
        piecesOnPossMove.push(board[curRow][curCol])
    })

    if(piecesOnPossMove.includes("kingE1") === true){
        whiteIsChecked = true
    }else if (piecesOnPossMove.includes("kingE1") === false){
        whiteIsChecked = false
    }

    if(piecesOnPossMove.includes("kingE8") === true){
        blackIsChecked = true
    }else if (piecesOnPossMove.includes("kingE8") === false){
        blackIsChecked = false
    }
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
    
                            if(board[moveRow][moveCol] !== "empty"){
                                const eatenPiece = board[moveRow][moveCol]
                                delete possibleMoves[eatenPiece]
                            }

                            board[removeRow][removeCol] = "empty"
                            board[moveRow][moveCol] = currentPiece
                            checkPieceMoves()
                            isChecked()
                            posSetter()
                            if(whiteIsChecked === false){
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
                            if(blackIsChecked === false){
                                cancelCheckMoves.push(`${moveRow}${moveCol}`)
                            }
                            checkPieceMoves()
                        })
                    }
                }
            }
        }
    })
    posSetter()

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
            dragged = ""
            prevBox = ""
            checkedKing =  "'"
            prevCaptured = ""
            prevCapturedContainer = ""
            whiteIsChecked = false
            blackIsChecked = false
            captured = false
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

function pawnPromotionChecker(){
    board[0].forEach(function (item){
        if(item.includes("pawn") && item.includes("2")){
            pawnPromotionbanner()
        }
    })
    board[7].forEach(function (item){
        if(item.includes("pawn") && item.includes("7")){
            pawnPromotionbanner()
        }
    })
}

function pawnPromotionbanner() {
    const promotionBannerWrapper = document.createElement(`div`)
    promotionBannerWrapper.setAttribute("id",`promotionBannerWrapper`)
    body.appendChild(promotionBannerWrapper)
    const promotionBanner = document.createElement(`div`)
    promotionBanner.setAttribute("id",`promotionBanner`)
    promotionBannerWrapper.appendChild(promotionBanner)
    const promotionBannerHeader = document.createElement(`h1`)
    promotionBannerHeader.setAttribute("id",`promotionBannerHeader`)
    promotionBannerHeader.innerHTML = "Pawn Promotion"
    promotionBanner.appendChild(promotionBannerHeader)

    const queenBtn = document.createElement(`button`)
    queenBtn.setAttribute("id",`queenBtn`)
    queenBtn.innerHTML = "Queen"
    promotionBanner.appendChild(queenBtn)
    queenBtn.addEventListener("click", function(){
        pawnPromotion("queen")
        promotionBannerWrapper.remove()
    })

    const rookBtn = document.createElement(`button`)
    rookBtn.setAttribute("id",`rookBtn`)
    rookBtn.innerHTML = "Rook"
    promotionBanner.appendChild(rookBtn)
    rookBtn.addEventListener("click", function(){
        pawnPromotion("rook")
        promotionBannerWrapper.remove()
    })

    const horseBtn = document.createElement(`button`)
    horseBtn.setAttribute("id",`horseBtn`)
    horseBtn.innerHTML = "Knight"
    promotionBanner.appendChild(horseBtn)
    horseBtn.addEventListener("click", function(){
        pawnPromotion("horse")
        promotionBannerWrapper.remove()
    })

    const bishopBtn = document.createElement(`button`)
    bishopBtn.setAttribute("id",`bishopBtn`)
    bishopBtn.innerHTML = "Bishop"
    promotionBanner.appendChild(bishopBtn)
    bishopBtn.addEventListener("click", function(){
        pawnPromotion("bishop")
        promotionBannerWrapper.remove()
    })
}

function pawnPromotion(promoteTo){
    let pieceToChange = ""
    let pieceToChangeLoc = ""

    board[0].forEach(function (item){
        if(item.includes("pawn") && item.includes("2")){
            //DISPLAY CHOICE OF PIECE ON WEBPAGE
            pieceToChange = item
            pieceToChangeLoc = board[0].indexOf(item)
            pieceToChangeLoc = pieceToChangeLoc.toString()
            let pieceToChangeCol = getKeyByValue(column, pieceToChangeLoc)
            document.getElementById(pieceToChange).remove()
            let moveRecord
            let newMove

            switch(promoteTo){
                case "queen":
                    const newQueen = document.createElement('img')
                    const locOfNewQ = document.getElementById(`${pieceToChangeCol}8`)
                    newQueen.setAttribute("src",`chesspiece/wqueen.png`)
                    newQueen.setAttribute("class",`whitepiece queen`)
                    newQueen.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewQ.appendChild(newQueen)
                    disableWhite()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(blackIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
                    }
                    moveRecord = `Promoted ${pieceToChange} to Queen`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newQueen.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newQueen.id)
                        possibleMovesGenerator(newQueen)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newQueen.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "bishop":
                    const newBishop = document.createElement('img')
                    const locOfNewB = document.getElementById(`${pieceToChangeCol}8`)
                    newBishop.setAttribute("src",`chesspiece/wbishop.png`)
                    newBishop.setAttribute("class",`whitepiece bishop`)
                    newBishop.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewB.appendChild(newBishop)
                    disableWhite()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(blackIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
                    }

                    moveRecord = `Promoted ${pieceToChange} to Bishop`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newBishop.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newBishop.id)
                        possibleMovesGenerator(newBishop)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newBishop.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "rook":
                    const newRook = document.createElement('img')
                    const locOfNewR = document.getElementById(`${pieceToChangeCol}8`)
                    newRook.setAttribute("src",`chesspiece/wrook.png`)
                    newRook.setAttribute("class",`whitepiece rook`)
                    newRook.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewR.appendChild(newRook)
                    disableWhite()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(blackIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
                    }

                    moveRecord = `Promoted ${pieceToChange} to Rook`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newRook.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newRook.id)
                        possibleMovesGenerator(newRook)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newRook.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "horse":
                    const newHorse = document.createElement('img')
                    const locOfNewH = document.getElementById(`${pieceToChangeCol}8`)
                    newHorse.setAttribute("src",`chesspiece/whorse.png`)
                    newHorse.setAttribute("class",`whitepiece horse`)
                    newHorse.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewH.appendChild(newHorse)
                    disableWhite()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(blackIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `Black's turn, black is checked.`
                    }
                
                    moveRecord = `Promoted ${pieceToChange} to Horse`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newHorse.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newHorse.id)
                        possibleMovesGenerator(newHorse)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newHorse.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
            }
        }
    })

    board[7].forEach(function (item){
        if(item.includes("pawn") && item.includes("7")){
            //DISPLAY CHOICE OF PIECE ON WEBPAGE
            pieceToChange = item
            pieceToChangeLoc = board[7].indexOf(item)
            pieceToChangeLoc = pieceToChangeLoc.toString()
            let pieceToChangeCol = getKeyByValue(column, pieceToChangeLoc)
            document.getElementById(pieceToChange).remove()
            let moveRecord
            let newMove

            switch(promoteTo){
                case "queen":
                    const newQueen = document.createElement('img')
                    const locOfNewQ = document.getElementById(`${pieceToChangeCol}1`)
                    newQueen.setAttribute("src",`chesspiece/bqueen.png`)
                    newQueen.setAttribute("class",`blackpiece queen`)
                    newQueen.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewQ.appendChild(newQueen)
                    disableBlack()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(whiteIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn, white is checked.`
                    }

                    moveRecord = `Promoted ${pieceToChange} to Queen`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newQueen.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newQueen.id)
                        possibleMovesGenerator(newQueen)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newQueen.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "bishop":
                    const newBishop = document.createElement('img')
                    const locOfNewB = document.getElementById(`${pieceToChangeCol}1`)
                    newBishop.setAttribute("src",`chesspiece/bbishop.png`)
                    newBishop.setAttribute("class",`blackpiece bishop`)
                    newBishop.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewB.appendChild(newBishop)
                    disableBlack()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(whiteIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn, white is checked.`
                    }
                    
                    moveRecord = `Promoted ${pieceToChange} to Bishop`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newBishop.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newBishop.id)
                        possibleMovesGenerator(newBishop)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newBishop.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "rook":
                    const newRook = document.createElement('img')
                    const locOfNewR = document.getElementById(`${pieceToChangeCol}1`)
                    newRook.setAttribute("src",`chesspiece/brook.png`)
                    newRook.setAttribute("class",`blackpiece rook`)
                    newRook.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewR.appendChild(newRook)
                    disableBlack()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(whiteIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn, white is checked.`
                    }

                    moveRecord = `Promoted ${pieceToChange} to Rook`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newRook.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newRook.id)
                        possibleMovesGenerator(newRook)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newRook.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
                
                case "horse":
                    const newHorse = document.createElement('img')
                    const locOfNewH = document.getElementById(`${pieceToChangeCol}1`)
                    newHorse.setAttribute("src",`chesspiece/bhorse.png`)
                    newHorse.setAttribute("class",`blackpiece horse`)
                    newHorse.setAttribute("id",`${promoteTo}copy${promoteCounter}`)
                    locOfNewH.appendChild(newHorse)
                    disableBlack()
                    posSetter()
                    checkPieceMoves()
                    isChecked()
                    if(whiteIsChecked === true){
                        document.getElementById(`playerTurnLabel`).innerHTML = `White's turn, white is checked.`
                    }

                    moveRecord = `Promoted ${pieceToChange} to Horse`
                    newMove = document.createElement('li')
                    newMove.innerHTML = moveRecord
                    document.getElementById("moveList").appendChild(newMove)

                    newHorse.addEventListener("dragstart", e => {
                        e.dataTransfer.setData("text/plain", newHorse.id)
                        possibleMovesGenerator(newHorse)
                        dragged = event.target
                        prevBox = dragged.parentElement
                        heldPiece = newHorse.id
                        posSetter()
                        checkPieceMoves()
                    })
                    promoteCounter++
                    break;
            }
        }
    })
}


// document.querySelectorAll(".pawn").forEach(function (item) {
//     if(item.classList.contains("passing")){
//         const boxID = dropZone.id
//         let boardRow = parseInt(column[boxID[0]])
//         let boardCol = parseInt(row[boxID[1]])
        
        
//         if(board[boardCol][boardRow-1] !== undefined && board[boardCol][boardRow-1] !== `empty`){
//             leftPiece = board[boardCol][boardRow-1]
//             console.log(leftPiece)
//         }

//         if(board[boardCol][boardRow+1] !== undefined && board[boardCol][boardRow+1] !== `empty`){
//             rightPiece = board[boardCol][boardRow+1]
//             console.log(rightPiece)
//         }

//         if(item.id.includes(`2`)){
//             if(leftPiece.includes(`pawn`) && leftPiece.includes(`7`)){
//                 if(possibleMoves[leftPiece] !== undefined){
//                     possibleMoves[leftPiece].push(`${boardCol+1}${boardRow}`)
//                 } else {
//                     possibleMoves[leftPiece] = [`${boardCol+1}${boardRow}`]
//                 }
//             } 
//             if(rightPiece.includes(`pawn`) && rightPiece.includes(`7`)){
//                 if(possibleMoves[rightPiece] !== undefined){
//                     possibleMoves[rightPiece].push(`${boardCol+1}${boardRow}`)
//                 } else {
//                     possibleMoves[rightPiece] = [`${boardCol+1}${boardRow}`]
//                 }
//             }
//         } else if (item.id.includes(`7`)) {
//             if(leftPiece.includes(`pawn`) && leftPiece.includes(`2`)){
//                 if(possibleMoves[leftPiece] !== undefined){
//                     possibleMoves[leftPiece].push(`${boardCol-1}${boardRow}`)
//                 } else {
//                     possibleMoves[leftPiece] = [`${boardCol-1}${boardRow}`]
//                 }
//             } 

//             if(rightPiece.includes(`pawn`) && rightPiece.includes(`2`)){
//                 if(possibleMoves[rightPiece] !== undefined){
//                     possibleMoves[rightPiece].push(`${boardCol-1}${boardRow}`)
//                 } else {
//                     possibleMoves[rightPiece] = [`${boardCol-1}${boardRow}`]
//                 }
//             }
//         }
//     }
//     })