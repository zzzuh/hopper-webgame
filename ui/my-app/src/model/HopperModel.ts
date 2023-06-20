import { Configuration } from "./Configuration";
import { ConfigJson } from "./ConfigJson";
export class HopperModel {

    private currConfig: Configuration;
    private currBoard: string[][];
    private isSelected: boolean;
    private selectedRow?: number;
    private selectedCol?: number;

    public constructor(fileContent: ConfigJson) {
        this.currConfig = new Configuration(fileContent);
        this.currBoard = this.currConfig.getBoard();
        this.isSelected = false;
        this.selectedRow = undefined;
        this.selectedCol = undefined;

    }

    public getCurrConfig(): Configuration {
        return this.currConfig;
    }

    public select(row: number, col: number): void {
        if (!this.isSelected) {
            if (this.currConfig.isFrog(row, col)) {
                this.isSelected = true;
                this.selectedRow = row;
                this.selectedCol = col;
            } else {
                console.log("Invalid selection");
            }
        } else {
            if (this.currConfig.isValidMove(this.selectedRow!, this.selectedCol!, row, col)) {
                for (let nbr of this.currConfig.getNeighbors().values()) {
                    if (nbr.getBoard()[this.selectedRow!][this.selectedCol!] === ".") {
                        if (nbr.isFrog(row, col)) {
                            this.currConfig = nbr;
                        }
                    }
                }
                this.currBoard = this.currConfig.getBoard();
                this.isSelected = false;
            }
            else {
                console.log("Invalid jump");
                this.isSelected = false;
            }
        }
    }

    public getSelected(): boolean {
        return this.isSelected;
    }

    public getBoard(): string[][] {
        return this.currBoard;
    }
}