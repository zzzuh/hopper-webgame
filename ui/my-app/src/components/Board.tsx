import { HopperModel } from "../model/HopperModel";
import { ConfigJson } from "../model/ConfigJson";
import "./Board.css";
import Tile from "./Tile";
import { useState } from "react";


const config: ConfigJson = {
    row: 3,
    col: 5,
    matrix: [["R", "*", "G", "*", "."], ["*", "G", "*", "G", "*"], [".", "*", ".", "*", "."]]
} // testing purposes

export default function Board() {

    const currModel = new HopperModel(config);
    const [currBoard, setCurrBoard] = useState(currModel.getCurrConfig().getBoard());

    function selectPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const row = parseInt(element.getAttribute("data-row") as string);
        const col = parseInt(element.getAttribute("data-col") as string);
        console.log(row, col);
        currModel.select(row, col);
    }

    function dropPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const row = parseInt(element.getAttribute("data-row") as string);
        const col = parseInt(element.getAttribute("data-col") as string);
        console.log(row, col);
        currModel.select(row, col);
        setCurrBoard(currModel.getBoard());
    }

    function handleMouseDown(e: React.MouseEvent) {
        console.log(currBoard);
        if (!currModel.getSelected()) {
            selectPiece(e);
        } else {
            dropPiece(e);
        }
    }
 
    return (
        <div onMouseDown={e => handleMouseDown(e)} style={{gridTemplateColumns: `repeat(${currModel.getCurrConfig().getCol()}, 75px)`, gridTemplateRows: `repeat(${currModel.getCurrConfig().getRow()}, 75px)`}} id="board">
            {currBoard.map((row, rowIndex) => (
                <div className="row">
                    {row.map((element, colIndex) => (
                        <Tile name={element} rowIndex={rowIndex} colIndex={colIndex}></Tile>
                    ))}
                </div>
            ))}
        </div>
    )
}