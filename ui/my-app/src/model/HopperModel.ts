import { Configuration } from "./Configuration";
import { ConfigJson } from "./ConfigJson";
export class HopperModel {

    private currConfig: Configuration;
    private currBoard: string[][];
    private isSelected: boolean;
    private selectedRow: number;
    private selectedCol: number;

    public constructor(fileContent: ConfigJson) {
        this.currConfig = new Configuration(fileContent);
        this.currBoard = this.currConfig.getBoard();
        this.isSelected = false;
        this.selectedRow = -1;
        this.selectedCol = -1;

    }


    public getCurrConfig(): Configuration {
        return this.currConfig;
    }

    public select(row: number, col: number): void {
        if (!this.isSelected) {
            if (this.currBoard[row][col] === "G" || this.currBoard[row][col] === "R") {
                this.selectedRow = row;
                this.selectedCol = col;
            } else {
                throw new Error("invalid selection");
            }
        } else {
            if (this.currConfig.isValidMove(this.selectedRow, this.selectedCol, row, col)) {
                for (let nbr of this.currConfig.getNeighbors()) {
                    if (nbr.getBoard()[this.selectedRow][this.selectedCol] === ".") {
                        if (nbr.getBoard()[row][col] === "G" || nbr.getBoard()[row][col] === "R") {
                            this.currConfig = nbr;
                            this.currBoard = nbr.getBoard();
                        }
                    }
                }
            }
            else {
                throw new Error("invalid jump");
            }
        }
    }

    public getSelected(): boolean {
        return this.isSelected;
    }

    public setSelected(isSelected: boolean): void {
        this.isSelected = isSelected;
    }

    public getBoard(): string[][] {
        return this.currBoard;
    }
}