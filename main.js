const body = document.body
const rowLabel = [8,7,6,5,4,3,2,1]
rowLabel.toString()
const columnLabel = ['A','B','C','D','E','F','G','H']
let counter = 1;
let dropColorChecker = "white"
let turn = "white"

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
            box.setAttribute("class","box")
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
            piece.setAttribute("class",`${pieceColorClass}piece pawn`)
            piece.setAttribute("id",`pawn${columnLabel[i]}${row1}`)
            piece.setAttribute("draggable", "true")
            piece.addEventListener("dragstart", e=> {
                e.dataTransfer.setData("text/plain", piece.id)
                prevBox = e.path[1].id
                console.log(e)
                if(e.path[0].classList.contains("blackpiece") === true){
                    dropColorChecker = "black"
                }else if(e.path[0].classList.contains("whitepiece") === true) {
                    dropColorChecker = "white"
                }
                
            })
            box.appendChild(piece)
            box.classList.add(`takenBy${pieceColorClass}`)
        }

        // ROOK GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'A' || columnLabel[i] === 'H'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}rook.png`)
                piece.setAttribute("class",`${pieceColorClass}piece rook`)
                box.appendChild(piece)
            }
        }

        // QUEEN GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'D'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}queen.png`)
                piece.setAttribute("class",`${pieceColorClass}piece queen`)
                box.appendChild(piece)
            }
        }

        // KING GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'E'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}king.png`)
                piece.setAttribute("class",`${pieceColorClass}piece king`)
                box.appendChild(piece)
            }
        }

        // BISHOP GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'C' || columnLabel[i] === 'F'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}bishop.png`)
                piece.setAttribute("class",`${pieceColorClass}piece bishop`)
                box.appendChild(piece)
            }
        }

        // HORSE GENERATION
        for(let i = 0; i < 8; i++){
            if( columnLabel[i] === 'B' || columnLabel[i] === 'G'){
                const box = document.querySelector(`#${columnLabel[i]}${row2}`)
                const piece = document.createElement('img')
                piece.setAttribute("src",`chesspiece/${pieceColor}horse.png`)
                piece.setAttribute("class",`${pieceColorClass}piece horse`)
                box.appendChild(piece)
            }
        }
    generatorChecker = "black"
    }
}

generatePieces()



// ASSIGNING DROP LISTENER TO BOARD

for (const dropZone of document.querySelectorAll(".box")) {

    dropZone.addEventListener("dragover", e => {
        e.preventDefault()
        dropZone.classList.add("drophover")
    })



    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("drophover")
    })
    
    // DROP LISTENER FOR PAWNS
    dropZone.addEventListener("drop", e=>{

        if(e.path[0].classList.contains(`${dropColorChecker}piece`) === true || e.path[0].classList.contains(`takenBy${dropColorChecker}`)){
            e.preventDefault()
            dropZone.classList.remove("drophover")
        } else{
            e.preventDefault()
            dropZone.classList.remove("drophover")
            const droppedElementId = e.dataTransfer.getData("text/plain")
            const droppedElement = document.getElementById(droppedElementId)
            dropZone.appendChild(droppedElement)
            document.querySelector(`#${prevBox}`).classList.remove(`takenBy${dropColorChecker}`)
            e.path[0].classList.add(`takenBy${dropColorChecker}`)
            updateTurn()
        }
    })
}

// UPDATING THE TURN AND DISABLING MOVE FOR OTHER PLAYER

function updateTurn(){
    if(turn === "white"){
        turn = "black"
        disableWhite()
    } else if(turn === "black"){
        turn = "white"
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