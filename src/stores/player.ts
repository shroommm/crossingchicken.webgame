import { MoveDirection } from "../types";

export const state: {
    currentRow: number;
    currentTile: number;
    movesQueue: MoveDirection[];
} = {
    currentRow: 0,
    currentTile: 0,
    movesQueue: [],
}

export function queueMove(direction: MoveDirection) {
    state.movesQueue.push(direction);
}

export function stepCompleted() {
    const direction = state.movesQueue.shift();

    if (direction == "forward") state.currentRow++;
    if (direction == "backward") state.currentRow--;
    if (direction == "left") state.currentTile--;
    if (direction == "right") state.currentTile++;
}