import "./Board.css";
import Tile from "./Tile";

const config = [["R", "*", "G", "*", "."], ["*", "G", "*", "G", "*"], [".", "*", ".", "*", "."]];

export default function Board() {

    let board = [];
    const row = config.length;
    const col = config[0].length;

    for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < config[i].length; j++) {
            board.push(<Tile name={config[i][j]}></Tile>)
        }
    }
 
    return <div style={{gridTemplateColumns: `repeat(${col}, 75px)`, gridTemplateRows: `repeat(${row}, 75px)`}} id="board">{board}</div>
}