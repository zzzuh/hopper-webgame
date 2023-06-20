import "./Tile.css";

interface Prop {
    name: string
}

export default function Tile(prop: Prop) {
    if (prop.name === "R") {
        return <span id="tile"><img src="assets/red_frog.png" alt="red frog"></img></span>
    } 
    else if (prop.name === "G") {
        return <span id="tile"><img src="assets/green_frog.png" alt="green frog"></img></span>
    }
    else if (prop.name === ".") {
        return <span id="tile"><img src="assets/lily_pad.png" alt="lily pad"></img></span>
    }
    else {
        return <span id="tile"><img src="assets/water.png" alt="water"></img></span>
    }
}