import React from "react";
import { Box3, Group } from "three";
import useGameStore from "../stores/game";
import { useFrame } from "@react-three/fiber";
import { state as player } from "../stores/player";

export default function useHitDetection(
    vehicle: React.RefObject<Group | null>,
    rowIndex: number,
) {
    const endGame = useGameStore((state) => state.endGame);

    useFrame(() => {
        if (!vehicle.current) return;
        if (!player.ref) return;
        
        if (
            rowIndex === player.currentRow ||
            rowIndex === player.currentRow + 1 ||
            rowIndex === player.currentRow + 1
        ) {
            const vehicleBoundingBox = new Box3();
            vehicleBoundingBox.setFromObject(vehicle.current);

            const playerBoundingBox = new Box3();
            playerBoundingBox.setFromObject(player.ref);
        
            if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
                endGame();
            }
        }
    })  

}