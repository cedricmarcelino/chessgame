const body = document.body
const rowLabel = [8,7,6,5,4,3,2,1]
rowLabel.toString()
const columnLabel = ['A','B','C','D','E','F','G','H']
let counter = 1;
let dropColorChecker = "white"
let turn = "white"
let oppositeTurn = "black"
let possibleMoves = []
let arrayTest = []
let eatenPiece = ""
let sampleEpath = ""

body.addEventListener("mouseup", function(){
    for (const dropZone of document.querySelectorAll(".box")) {
        dropZone.classList.remove("possibleMove")
    }
})
//GENERATING ARRAY FOR POSITIONS
const rowsPerBoard = 8; columnsPerBoard = 8;

let board = new Array(rowsPerBoard);            
for (let r = 0; r < rowsPerBoard; r++) {
    board[r] = new Array(columnsPerBoard);      
}

// GENERATE CHESS BOARD
function generateBoard() {
    const board = document.createElement('div')
    board.setAttribute("id","board")
    body.appendChild(board)

    for(let row=0; row<8; row++){
        const rowContainer = document.createElement('div')
        rowContainer.setAttribute("class","rowContainer")
        board.appendChild(rowContainer)
        for(let col=0; col<8; col++){
            const box = document.createElement('div')
            box.setAttribute("id",`${columnLabel[col]}${rowLabel[row]}`)
            box.setAttribute("class","box empty")
            const gridLabel = document.createElement('span')
            gridLabel.innerHTML = `${columnLabel[col]}${rowLabel[row]}`
            rowContainer.appendChild(box)
            box.appendChild(gridLabel)
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
let generatorChecker = "white";
let row1 = ""
let row2 = ""
let pieceColor = ""
let prevBox = ""

function generatePieces(){
    
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

        // PAWN GENERATION
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
                let currentPos = e.target.parentElement.id
                let currentPosCol = currentPos[0]
                let colIndex = columnLabel.indexOf(currentPosCol)
                let currentPosRow = parseInt(currentPos[1])
                let currPiece = e.target
                let downCtr = 1
                let upwardCtr = 1
                prevBox = currentPos

                // SETTING MOVEMENT FOR PAWNS

                //FIRST MOVE
                if(currPiece.classList.contains("whitepiece") && currPiece.classList.contains("firstmove")){
                    //MOVE LOGIC OF PAWN
                    while(!!document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`) === true && document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains("empty") && upwardCtr < 3){
                        possibleMoves.push(`${currentPosCol}${currentPosRow+upwardCtr}`)
                        upwardCtr++
                    }
                    //CAPTURE LOGIC OF PAWN
                    //TO THE UP LEFT
                    if(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+1}`) === true && document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow+1}`)
                    }
                    //TO THE UP RIGHT
                    if(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+1}`) === true && document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow+1}`)
                    }
                    possibleMovesGenerator()

                } else if (currPiece.classList.contains("blackpiece") && currPiece.classList.contains("firstmove")){
                    while(!!document.getElementById(`${currentPosCol}${currentPosRow-downCtr}`) === true && document.getElementById(`${currentPosCol}${currentPosRow-downCtr}`).classList.contains("empty")&& downCtr < 3){
                        possibleMoves.push(`${currentPosCol}${currentPosRow-downCtr}`)
                        downCtr++
                    }
                    //CAPTURE LOGIC OF PAWN
                    if(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-1}`) === true && document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow-1}`)
                    }

                    if(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-1}`) === true && document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow-1}`)
                    }
                    possibleMovesGenerator()
                }

                //THE REST OF GAME
                if(currPiece.classList.contains("whitepiece") && !currPiece.classList.contains("firstmove")){
                    
                    //MOVE LOGIC OF PAWN
                    if(!!document.getElementById(`${currentPosCol}${currentPosRow+1}`) === true && document.getElementById(`${currentPosCol}${currentPosRow+1}`).classList.contains("empty")){
                        possibleMoves.push(`${currentPosCol}${currentPosRow+1}`)
                    }

                    //CAPTURE LOGIC OF PAWN
                    if(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+1}`) === true && document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow+1}`)
                    }

                    if(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+1}`) === true && document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow+1}`)
                    }

                    possibleMovesGenerator()
                } else if (currPiece.classList.contains("blackpiece") && !currPiece.classList.contains("firstmove")){
                    if(!!document.getElementById(`${currentPosCol}${currentPosRow-1}`) === true && document.getElementById(`${currentPosCol}${currentPosRow-1}`).classList.contains("empty")){
                        possibleMoves.push(`${currentPosCol}${currentPosRow-1}`)
                    }

                    //CAPTURE LOGIC OF PAWN
                    if(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-1}`) === true && document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow-1}`)
                    }

                    if(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-1}`) === true && document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`)){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow-1}`)
                    }
                    possibleMovesGenerator()
                }
            })
        }

        // DEFINING FUNCTION FOR ROOK MOVEMENTS
        const rookMove = function rookMovement(e,piece) {
            e.dataTransfer.setData("text/plain", piece.id)
            console.log(e)
            let currentPos = e.target.parentElement.id
            let currentPosCol = currentPos[0]
            let colIndex = columnLabel.indexOf(currentPosCol)
            let currentPosRow = parseInt(currentPos[1])
            let upwardCtr = 1
            let downwardCtr = 1
            let leftCtr = 1
            let rightCtr = 1
            prevBox = currentPos
            let possibleCapture = false

            // SETTING MOVEMENT FOR ROOK

            //UPWARD
            while(!!document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`) === true && (document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains("empty") || document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }

                possibleMoves.push(`${currentPosCol}${currentPosRow+upwardCtr}`)
                upwardCtr++
            }
            possibleCapture = false
            //DOWNWARD
            while(!!document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`) === true && (document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`).classList.contains("empty") || document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }

                possibleMoves.push(`${currentPosCol}${currentPosRow-downwardCtr}`)
                downwardCtr++
            }

            possibleCapture = false
            //LEFT
            while(!!document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`) === true && (document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }

                possibleMoves.push(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`)
                leftCtr++
            }

            possibleCapture = false
            //RIGHT
            while(!!document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`) === true && (document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }

                possibleMoves.push(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`)
                rightCtr++
            }
            possibleCapture = false
            possibleMovesGenerator()
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
                piece.addEventListener("dragstart", function(e) {rookMove(e,piece)})
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
                piece.addEventListener("dragstart", function(e) {rookMove(e,piece)})
                piece.addEventListener("dragstart", function(e) {bishopMove(e,piece)})
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
                    console.log(e)
                    let currentPos = e.target.parentElement.id
                    let currentPosCol = currentPos[0]
                    let colIndex = columnLabel.indexOf(currentPosCol)
                    let currentPosRow = parseInt(currentPos[1])
                    let upwardCtr = 1
                    let downwardCtr = 1
                    let leftCtr = 1
                    let rightCtr = 1
                    let upleftCtr = 1
                    let uprightCtr = 1
                    let downleft = 1
                    let downright = 1
                    prevBox = currentPos
    
                    // SETTING MOVEMENT FOR KING
    
                    //UPWARD
                    while(!!document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`) === true && (document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains("empty") || document.getElementById(`${currentPosCol}${currentPosRow+upwardCtr}`).classList.contains(`takenBy${oppositeTurn}`)) && upwardCtr === 1){

                        possibleMoves.push(`${currentPosCol}${currentPosRow+upwardCtr}`)
                        upwardCtr++
                    }
    
                    //DOWNWARD
                    while(!!document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`) === true && downwardCtr === 1 && (document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`).classList.contains("empty") || document.getElementById(`${currentPosCol}${currentPosRow-downwardCtr}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${currentPosCol}${currentPosRow-downwardCtr}`)
                        downwardCtr++
                    }
    
                    //LEFT
                    while(!!document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`) === true && leftCtr === 1 && (document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-leftCtr]}${currentPosRow}`)
                        leftCtr++
                    }
    
                    //RIGHT
                    while(!!document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`) === true && rightCtr === 1 && (document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+rightCtr]}${currentPosRow}`)
                        rightCtr++
                    }
                    
                    //DIAGONAL UPLEFT

                    while(!!document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`) === true && upleftCtr === 1 && (document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`)
                        upleftCtr++
                    }

                    //DIAGONAL UPRIGHT

                    while(!!document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`) === true && uprightCtr === 1 && (document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`)
                        uprightCtr++
                    }

                    //DIAGONAL DOWNRIGHT

                    while(!!document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`) === true && downright === 1 && (document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`)
                        downright++
                    }


                    //DIAGONAL DOWNLEFT

                    while(!!document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`) === true && downleft === 1 && (document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`)
                        downleft++
                    }
                    possibleMovesGenerator()
                })
            }

            
        }

        // DEFINING FUNCTION FOR BISHOP MOVEMENTS
        const bishopMove = function bishopMovement (e, piece){
            e.dataTransfer.setData("text/plain", piece.id)
            console.log(e)
            let currentPos = e.target.parentElement.id
            let currentPosCol = currentPos[0]
            let colIndex = columnLabel.indexOf(currentPosCol)
            let currentPosRow = parseInt(currentPos[1])
            let upleftCtr = 1
            let uprightCtr = 1
            let downleft = 1
            let downright = 1
            prevBox = currentPos
            let possibleCapture = false

            //DIAGONAL UPLEFT

            while(!!document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`) === true && (document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }
                possibleMoves.push(`${columnLabel[colIndex-upleftCtr]}${currentPosRow+upleftCtr}`)
                upleftCtr++
            }

            possibleCapture = false
            //DIAGONAL UPRIGHT

            while(!!document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`) === true && (document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }
                possibleMoves.push(`${columnLabel[colIndex+uprightCtr]}${currentPosRow+uprightCtr}`)
                uprightCtr++
            }

            possibleCapture = false
            //DIAGONAL DOWNRIGHT

            while(!!document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`) === true && (document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }
                possibleMoves.push(`${columnLabel[colIndex+downright]}${currentPosRow-downright}`)
                downright++
            }

            possibleCapture = false
            //DIAGONAL DOWNLEFT

            while(!!document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`) === true  && (document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`).classList.contains(`takenBy${oppositeTurn}`)) && possibleCapture === false){

                if(document.getElementById(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`).classList.contains(`takenBy${oppositeTurn}`)){
                    possibleCapture = true
                }
                possibleMoves.push(`${columnLabel[colIndex-downleft]}${currentPosRow-downleft}`)
                downleft++
            }
            possibleCapture = false
            possibleMovesGenerator()
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
                piece.addEventListener("dragstart", function(e) {bishopMove(e,piece)})
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
                    console.log(e)
                    let currentPos = e.target.parentElement.id
                    let currentPosCol = currentPos[0]
                    let colIndex = columnLabel.indexOf(currentPosCol)
                    let currentPosRow = parseInt(currentPos[1])
                    let upleftCtr = 1
                    let uprightCtr = 1
                    let downleft = 1
                    let downright = 1
                    let upleftCtr2 = 1
                    let uprightCtr2 = 1
                    let downleft2 = 1
                    let downright2 = 1
                    prevBox = currentPos
                    let possibleCapture = false

                    //SETTING MOVEMENT FOR HORSE 1

                    //DIAGONAL UPLEFT 1

                    while(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+2}`) === true && upleftCtr===1 && (document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+2}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow+2}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow+2}`)
                        upleftCtr++
                    }

                    //DIAGONAL UPRIGHT 1

                    while(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+2}`) === true && uprightCtr===1 && (document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+2}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow+2}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow+2}`)
                        uprightCtr++
                    }

                    //DIAGONAL DOWNRIGHT 1

                    while(!!document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-2}`) === true && downright===1 && (document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-2}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+1]}${currentPosRow-2}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+1]}${currentPosRow-2}`)
                        downright++
                    }

                    //DIAGONAL DOWNLEFT 1

                    while(!!document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-2}`) === true && downleft===1 && (document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-2}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-1]}${currentPosRow-2}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-1]}${currentPosRow-2}`)
                        downleft++
                    }

                    //SETTING MOVEMENT FOR HORSE 2

                    //DIAGONAL UPLEFT 2

                    while(!!document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow+1}`) === true && upleftCtr2===1 && (document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow+1}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-2]}${currentPosRow+1}`)
                        upleftCtr2++
                    }

                    //DIAGONAL UPRIGHT 2

                    while(!!document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow+1}`) === true && uprightCtr2===1 && (document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow+1}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow+1}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+2]}${currentPosRow+1}`)
                        uprightCtr2++
                    }

                    //DIAGONAL DOWNRIGHT 2

                    while(!!document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow-1}`) === true && downright2===1 && (document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow-1}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex+2]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex+2]}${currentPosRow-1}`)
                        downright2++
                    }

                    //DIAGONAL DOWNLEFT 2

                    while(!!document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow-1}`) === true && downleft2===1 && (document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow-1}`).classList.contains("empty") || document.getElementById(`${columnLabel[colIndex-2]}${currentPosRow-1}`).classList.contains(`takenBy${oppositeTurn}`))){
                        possibleMoves.push(`${columnLabel[colIndex-2]}${currentPosRow-1}`)
                        downleft2++
                    }
                    possibleMovesGenerator()
                })
            }
        }
    generatorChecker = "black"
    }
}

generatePieces()
takenBoxClassGenerator()

// ASSIGNING DROP LISTENER TO BOARD

for (const dropZone of document.querySelectorAll(".box")) {

    

    dropZone.addEventListener("dragover", e => {
        e.preventDefault()
        dropZone.classList.add("drophover")
    })



    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("drophover")
    })

    // DROP LISTENERS
    dropZone.addEventListener("drop", e=>{ 
        dropZone.classList.remove("drophover")
        console.log(e)
        if(e.target.classList.contains(`possibleMove`) || e.target.parentElement.classList.contains(`possibleMove`)){
            e.preventDefault()
            dropZone.classList.remove("drophover")
            const droppedElementId = e.dataTransfer.getData("text/plain")
            const droppedElement = document.getElementById(droppedElementId)
            dropZone.appendChild(droppedElement)

            //ITERATE ON E.PATH TO CHECK FOR DIV AND ADD/REMOVE SPECIFIC CLASSES
            for(let i = 0 ; i < 5 ; i++){
                if(e.path[i].classList.contains(`empty`) && e.path[i].classList.contains(`box`)){
                    e.path[i].classList.add(`takenBy${dropColorChecker}`)
                    e.path[i].classList.remove(`empty`)
                }
            }
            document.getElementById(prevBox).classList.remove(`takenBy${dropColorChecker}`)
            document.getElementById(prevBox).classList.add(`empty`)

            //REMOVING FIRST MOVE CLASS FOR PAWNS THAT HAS BEEN MOVED ALREADY
            droppedElement.classList.remove("firstmove")
            console.log(e)
            //ITERATE ON E.PATH TO CHECK FOR DIV OF THE CAPTURED ELEMENT
            for(let i = 0 ; i < 5 ; i++){
                if(e.path[i].classList.contains(`takenBy${oppositeTurn}`) && e.path[i].classList.contains(`box`)){
                    e.path[i].childNodes[1].remove()
                    e.path[i].classList.add(`takenBy${dropColorChecker}`)
                    e.path[i].classList.remove(`takenBy${oppositeTurn}`)
                }
            }

            //UPDATING THE TURN
            updateTurn()
            
        }

        //RESETS POSSIBLE MOVE CLASS ON DROP
        document.querySelectorAll(".box").forEach(function (item) {
            item.classList.remove("possibleMove")
        })

        //RESETS POSSIBLE MOVE ARRAY ON DROP
        while(possibleMoves.length > 0) {
            possibleMoves.pop();
        }

        //RESETS EATEN PIECE

        eatenPiece = ""
    })
}

// UPDATING THE TURN AND DISABLING MOVE FOR OTHER PLAYER
function updateTurn(){
    if(turn === "white"){
        turn = "black"
        dropColorChecker = "black"
        oppositeTurn = "white"
        disableWhite()
    } else if(turn === "black"){
        turn = "white"
        dropColorChecker = "white"
        oppositeTurn = "black"
        disableBlack()
    }
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

disableBlack()

function possibleMovesGenerator() {
    possibleMoves.forEach(function (item){
        document.getElementById(item).classList.add("possibleMove")
    })
}

function takenBoxClassGenerator() {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(function (item){
        if (item.lastChild.classList.contains("whitepiece")){
            item.classList.add("takenBywhite")
            item.classList.remove("empty")
        } else if (item.lastChild.classList.contains("blackpiece")){
            item.classList.add("takenByblack")
            item.classList.remove("empty")
        }
    })
}


// SETTING MOVEMENT FOR ROOK

const badung = function rookMovement(e) {

}


//BISHOP
//ROOK
//KING
//QUEEN
//HORSE
//PAWN LEFT FOR EATING MECHANICS