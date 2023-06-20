import "./Tile.css";

interface Prop {
    name: string,
    rowIndex: number,
    colIndex: number,
}

export default function Tile(prop: Prop) {
    if (prop.name === "R") {
        return <div id="tile"><img  className="frog" src="assets/images/red_frog.png" alt="red frog" data-row={`${prop.rowIndex}`} data-col={`${prop.colIndex}`}></img></div>
    } 
    else if (prop.name === "G") {
        return <div id="tile"><img className="frog" src="assets/images/green_frog.png" alt="green frog" data-row={`${prop.rowIndex}`} data-col={`${prop.colIndex}`}></img></div>
    }
    else if (prop.name === ".") {
        return <div id="tile"><img src="assets/images/lily_pad.png" alt="lily pad" data-row={`${prop.rowIndex}`} data-col={`${prop.colIndex}`}></img></div>
    }
    else {
        return <div id="tile"><img src="assets/images/water.png" alt="water" data-row={`${prop.rowIndex}`} data-col={`${prop.colIndex}`}></img></div>
    }
}