import * as fs from "fs";

export class Configuration {
    private static const GREEN_FROG: string = "G";
    private static const RED_FROG: string = "R";
    private static const VALID_SPOT: string = ".";
    private static const INVALID_SPOT: string = "*";

    private static row: number;
    private static col: number;

    private board: string[][];
    private neighbors = new Set();

    public constructor(filename?: string, board?: string[][], startRow?: number, startCol?: number, endRow?: number, endCol?: number) {
        if (filename) {
            let lines = fs.readFileSync(filename);
            let fields: string[] = (<string><unknown>lines).split("\n");

            Configuration.row = parseInt(fields.at(0)!);
            Configuration.col = parseInt(fields.at(1)!);

            let currentRow: number = 0;
            for (let i = 2; i < fields.length; i++) {
                let data: string[] = (<string><unknown>fields.at(i)).split(" ");
                for (let j = 0; j < data.length; j++) {
                    this.board[currentRow][j] = data.at(j) as string;
                }
                currentRow++;
            }
        } else {
            this.board = board!; // exclamation to ensure that board will never be null

            let rowDiff: number = endRow! - startRow!;
            let colDiff: number = endCol! - startCol!;

            let frog: string = this.board[startRow!][startCol!];
            this.board[(startRow! + endRow!) / 2][(startCol! + endCol!) / 2] = Configuration.VALID_SPOT;
            this.board[startRow!][startCol!] = Configuration.VALID_SPOT;
            this.board[startRow! + rowDiff][startCol! + colDiff] = frog;
        }
    }
    
    public getRow(): number {
        return Configuration.row;
    }

    public getCol(): number {
        return Configuration.col;
    }

    public getBoard(): string[][] {
        return this.board;
    }

    
}