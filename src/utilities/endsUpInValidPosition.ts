import { maxTileIndex, minTileIndex } from "../constants";
import { rows } from "../metadata";
import { MoveDirection } from "../types";
import { calculateFinalPosition } from "./calculateFinalPosition";
import useMapStore from "../stores/map";

export function endsUpInValidPosition(
    currentPosition: { rowIndex: number; tileIndex: number },
    moves: MoveDirection[],
) {
    // Calculate where the player ends up after the moves
    const finalPosition = calculateFinalPosition(currentPosition, moves);

    // Check if the final position is out of bounds
    if (finalPosition.rowIndex === -1 ||
        finalPosition.tileIndex === minTileIndex - 1 ||
        finalPosition.tileIndex === maxTileIndex + 1
    ) {
        return false;
    }

    const finalRow = useMapStore.getState().rows[finalPosition.rowIndex - 1];
    if (
        finalRow &&
        finalRow.type === "forest" &&
        finalRow.trees.some(
            (tree) => tree.tileIndex === finalPosition.tileIndex
        )
    ) {
        return false;
    }

    return true;
}