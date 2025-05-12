import { ColorRepresentation, MathUtils } from "three";
import { Row, RowType } from "../types";
import { maxTileIndex, minTileIndex } from "../constants";

export function generateRows(amount: number): Row[] {
    const rows: Row[] = [];

    for (let i = 0; i < amount; i++) {
        rows.push(generateRow());
    }

    return rows;
}

export function generateRow(): Row {
    const type: RowType = randomElement(["car", "truck", "forest"]);

    if (type === "car") return generateCarLaneMetadata()
    if (type === "truck") return generateTruckLaneMetadata()

    return generateForestMetadata()
}

function randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateForestMetadata(): Row {
    const occupiedTiles = new Set<number>();
    const trees = Array.from({ length: 4 }, () => {
        let tileIndex;
        do {
            tileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(tileIndex));

        occupiedTiles.add(tileIndex);

        const height = randomElement([20, 45, 60]);

        return { tileIndex, height };
    })

    return { type: "forest", trees }
}

function generateCarLaneMetadata(): Row {
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 156, 188]);
    const occupiedTiles = new Set<number>();
    const vehicles = Array.from({ length: 3 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);
        const color: ColorRepresentation = randomElement([
            0xa52523, 0xbdb638, 0x78b14b,
        ]);

        return { initialTileIndex, color }
    })

    return { type: "car", direction, speed, vehicles }
}

function generateTruckLaneMetadata(): Row {
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 156, 188]);

    const occupiedTiles = new Set<number>();
    
    const vehicles = Array.from({ length: 2 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 2);
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);
        occupiedTiles.add(initialTileIndex + 2);

        const color: ColorRepresentation = randomElement([
            0xa52523, 0xbdb638, 0x78b14b,
        ]);

        return { initialTileIndex, color }
    })

    return { type: "truck", direction, speed, vehicles }
}