import { ConfigJson } from "./ConfigJson";

export class Configuration {
    private static GREEN_FROG: string = "G";
    private static RED_FROG: string = "R";
    private static VALID_SPOT: string = ".";
    private static INVALID_SPOT: string = "*";

    private static row: number;
    private static col: number;

    private board!: string[][];
    private neighbors = new Set<Configuration>();
    private frogCount = 0;

    public constructor(fileContent?: ConfigJson, board?: string[][], startRow?: number, startCol?: number, endRow?: number, endCol?: number) {
        if (typeof fileContent !== 'undefined') {
            Configuration.row = fileContent.row;
            Configuration.col = fileContent.col;

            this.board = new Array<string[]>(this.getRow());

            for (let i = 0; i < this.getRow(); i++) {
                this.board[i] = [...fileContent.matrix[i]];
            }
            this.countFrogs();
        } else {
            this.board = new Array<string[]>(this.getRow());
            for (let i = 0; i < this.getRow(); i++) {
                this.board[i] = [...board![i]];

            }

            let rowDiff: number = endRow! - startRow!;
            let colDiff: number = endCol! - startCol!;

            let frog: string = this.board[startRow!][startCol!];
            this.board[(startRow! + endRow!) / 2][(startCol! + endCol!) / 2] = Configuration.VALID_SPOT;
            this.board[startRow!][startCol!] = Configuration.VALID_SPOT;
            this.board[startRow! + rowDiff][startCol! + colDiff] = frog;
            this.countFrogs();
        }
    }

    private countFrogs(): void {
        for (let row = 0; row < this.getRow(); row++) {
            for (let col = 0; col < this.getCol(); col++) {
                if (this.board[row][col] === Configuration.GREEN_FROG) {
                    this.frogCount++;
                }
            }
        }
    }

    private createNeighbors(): void {
        for (let row = 0; row < this.getRow(); row++) {
            for (let col = 0; col < this.getCol(); col++) {
                if (this.board[row][col] === Configuration.GREEN_FROG || this.board[row][col] === Configuration.RED_FROG) {
                    if ((this.getRow() - 1) - row >= 4 && this.board[row + 4][col] === Configuration.VALID_SPOT 
                    && this.board[(row + row + 4) / 2][(col + col) / 2] === Configuration.GREEN_FROG) { // move down 4 place
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row + 4, col));
                    }
                    if ((this.getCol() - 1) - col >= 4 && this.board[row][col + 4] === Configuration.VALID_SPOT 
                    && this.board[(row + row) / 2][(col + col + 4) / 2] === Configuration.GREEN_FROG) { // move left 4 places
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row, col + 4));
                    }
                    if (col >= 4 && this.board[row][col - 4] === Configuration.VALID_SPOT 
                    && this.board[(row + row) / 2][(col + (col - 4)) / 2] === Configuration.GREEN_FROG) { // move right 4 places
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row, col - 4));
                    }
                    if (row >= 4 && this.board[row - 4][col] === Configuration.VALID_SPOT 
                    && this.board[(row + (row - 4)) / 2][(col + col) / 2] === Configuration.GREEN_FROG) { // move up 4 places
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row - 4, col));
                    }
                    if (row >= 2 && (this.getCol() - 1) - col >= 2 && this.board[row - 2][col + 2] === Configuration.VALID_SPOT
                    && this.board[(row + row - 2) / 2][(col + col + 2) / 2] === Configuration.GREEN_FROG ) { // top right
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row - 2, col + 2));
                    }
                    if (row >= 2 && col >= 2 && this.board[row - 2][col - 2] === Configuration.VALID_SPOT
                    && this.board[(row + row - 2) / 2][(col + col - 2) / 2] === Configuration.GREEN_FROG ) { // top left
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row - 2, col - 2));
                    }
                    if ((this.getRow() - 1) - row >= 2 && (this.getCol() - 1) - col >= 2 && this.board[row + 2][col + 2] === Configuration.VALID_SPOT
                    && this.board[(row + row + 2) / 2][(col + col + 2) / 2] === Configuration.GREEN_FROG ) { // bottom left
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row + 2, col + 2));
                    }
                    if ((this.getRow() - 1) - row >= 2 && col >= 2 && this.board[row + 2][col - 2] === Configuration.VALID_SPOT
                    && this.board[(row + row + 2) / 2][(col + col - 2) / 2] === Configuration.GREEN_FROG ) { // bottom right
                        this.neighbors.add(new Configuration(undefined, this.board, row, col, row + 2, col - 2));
                    }
                }
            }
        }
    }

    public isSolution(): boolean {
        if (this.frogCount === 0) {
            return true;
        } else {
            return false;
        }
    }

    public isValidMove(startRow: number, startCol: number, endRow: number, endCol: number): boolean {
        if (this.board[startRow][startCol] === Configuration.RED_FROG || this.board[startRow][startCol] === Configuration.GREEN_FROG) {
          if (endRow - startRow === 4 && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves down 4 places
            return true;
          }
          if (endCol - startCol === -4 && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves left 4 places
            return true;
          }
          if (endCol - startCol === 4 && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves right 4 places
            return true;
          }
          if (endRow - startRow === -4 && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // move up 4 places
            return true;
          }
          if (endRow - startRow === -2 && endCol - startCol === 2
              && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves top right
            return true;
          }
          if (endRow - startRow === -2 && endCol - startCol === -2 && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves top left
            return true;
          }
          if (endRow - startRow === 2 && endCol - startCol === -2
              && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves bottom left
            return true;
          }
          if (endRow - startRow === 2 && endCol - startCol === 2
              && this.board[endRow][endCol] === Configuration.VALID_SPOT
              && this.board[(endRow + startRow) / 2][(endCol + startCol) / 2] === Configuration.GREEN_FROG) { // moves bottom right
            return true;
          }
        }
        return false;
      }

    public isFrog(row: number, col: number): boolean {
        return this.board[row][col] === Configuration.GREEN_FROG || this.board[row][col] === Configuration.RED_FROG;
    }

    public getNeighbors(): Set<Configuration> {
        this.createNeighbors();
        return this.neighbors;
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

    public printConfig(): void {
        console.log(this.getBoard());
    }
}