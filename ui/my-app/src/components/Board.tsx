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

const currModel = new HopperModel(config);

export default function Board() {

    const [currBoard, setCurrBoard] = useState(currModel.getBoard());

    let grabbedFrog: HTMLElement | null = null;

    function grabFrog(e: React.MouseEvent) {
        const element = e.target as HTMLElement;

        console.log(element)

        if (element.className.includes("frog")) {
            const row = parseInt(element.getAttribute("data-row") as string);
            const col = parseInt(element.getAttribute("data-col") as string);

            console.log(row, col);

            const x = e.clientX - (75/2);
            const y = e.clientY - (60/2);

            element.style.position = "absolute";
            element.style.left = `${x}px`
            element.style.top = `${y}px`

            grabbedFrog = element;

            currModel.select(row, col);
            currModel.setSelected(true);
        }
    }

    function moveFrog(e: React.MouseEvent) {
        if (grabbedFrog) {
            const x = e.clientX - (75/2);
            const y = e.clientY - (60/2);

            grabbedFrog.style.position = "absolute";
            grabbedFrog.style.left = `${x}px`;
            grabbedFrog.style.top = `${y}px`;  
        }

    }

    function dropFrog(e: React.MouseEvent) {
        try {
            if (grabbedFrog) {
                grabbedFrog = null;
    
                const x = e.clientX;
                const y = e.clientY;
    
                const tile = document.elementsFromPoint(x, y);
    
                const row = parseInt(tile[1].getAttribute("data-row") as string);
                const col = parseInt(tile[1].getAttribute("data-col") as string);
    
                console.log(row, col)
                currModel.select(row, col);
                currModel.setSelected(false);      
            }
            setCurrBoard(currModel.getBoard())
            console.log(currModel.getBoard())   
        } catch (error) {
            setCurrBoard(currModel.getBoard());   
        }
    }
 
    return (
        <div 
            onMouseDown={e => grabFrog(e)} 
            onMouseMove={e => moveFrog(e)}
            onMouseUp={e => dropFrog(e)}
            id="board">
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