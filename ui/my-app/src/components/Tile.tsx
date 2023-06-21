import "./Tile.css";

interface Prop {
    name: string,
    rowIndex: number,
    colIndex: number,
}

export default function Tile(prop: Prop) {
    const tile = prop.name;
  
    if (tile === "*") {
      return (
        <div
          style={{ backgroundImage: "url(assets/images/water.png)" }}
          data-row={prop.rowIndex}
          data-col={prop.colIndex}
          className="tile"
        ></div>
      );
    } else {
      if (prop.name === "G") {
        return (
          <div style={{ backgroundImage: "url(assets/images/lily_pad.png)" }} className="tile">
            <div style={{ backgroundImage: "url(assets/images/green_frog.png)" }} className="frog" data-row={prop.rowIndex}
          data-col={prop.colIndex}></div>
          </div>
        );
      } else if (prop.name === "R") {
        return (
          <div style={{ backgroundImage: "url(assets/images/lily_pad.png)" }} className="tile">
            <div style={{ backgroundImage: "url(assets/images/red_frog.png)" }} className="frog" data-row={prop.rowIndex}
          data-col={prop.colIndex}></div>
          </div>
        );
      } else {
        return (
          <div style={{ backgroundImage: "url(assets/images/lily_pad.png)" }} className="tile" data-row={prop.rowIndex}
          data-col={prop.colIndex}></div>
        );
      }
    }
  }
  