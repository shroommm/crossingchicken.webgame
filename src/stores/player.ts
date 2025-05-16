import { MoveDirection } from "../types";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import useMapStore from "./map";
import useGameStore from "./game";
import { Object3D } from "three";


export const state: {
    currentRow: number;
    currentTile: number;
    movesQueue: MoveDirection[];
    ref: Object3D | null;
} = {
    currentRow: 0,
    currentTile: 0,
    movesQueue: [],
    ref: null,
}

export function setRef(ref: Object3D) {
    state.ref = ref;
}

export function queueMove(direction: MoveDirection) {
    const isValidMove = endsUpInValidPosition(
        {rowIndex: state.currentRow, tileIndex: state.currentTile},
        [...state.movesQueue, direction],
    )
    const isOver = useGameStore.getState().status === "over";

    if (!isValidMove || isOver) return;

    state.movesQueue.push(direction);
}

export function stepCompleted() {
    const direction = state.movesQueue.shift();

    if (direction == "forward") state.currentRow += 1;
    if (direction == "backward") state.currentRow -= 1;
    if (direction == "left") state.currentTile -= 1;
    if (direction == "right") state.currentTile += 1;

    if (state.currentRow == useMapStore.getState().rows.length - 10) {
        useMapStore.getState().addRows();
    }

    useGameStore.getState().updateScore(state.currentRow)
}

export function reset() {
    state.currentRow = 0;
    state.currentTile = 0;
    state.movesQueue = [];

    if (!state.ref) return;
    state.ref.position.x = 0;
    state.ref.position.y = 0;
    state.ref.children[0].rotation.z = 0
}