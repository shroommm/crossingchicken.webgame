import { useFrame } from "@react-three/fiber";
import { Clock, Group, MathUtils } from "three";
import { state, stepCompleted } from "../stores/player";
import { tileSize } from "../constants";

export default function usePlayerAnimation(ref: React.RefObject<Group | null>) {
    const moveClock = new Clock(false)

    useFrame(() => {
        if (!ref.current) return
        if (!state.movesQueue.length) return

        const player = ref.current

        if (!moveClock.running) {
            moveClock.start()
        }

        const stepTime = 0.2
        const progress = Math.min(1, moveClock.getElapsedTime() / stepTime)

        setPosition(player, progress)
        setRotation(player, progress)

        if (progress >= 1) {
            stepCompleted();
            moveClock.stop()
        }
    })
}

function setPosition(player: Group, progress: number) {
    const startX = state.currentTile * tileSize
    const startY = state.currentRow * tileSize
    let endX = startX
    let endY = startY

    const move = state.movesQueue[0]
    if (move == "left") endX -= tileSize
    if (move == "right") endX += tileSize
    if (move == "forward") endY += tileSize
    if (move == "backward") endY -= tileSize

    player.position.x = MathUtils.lerp(startX, endX, progress)
    player.position.y = MathUtils.lerp(startY, endY, progress)
    player.children[0].position.z = Math.sin(progress * Math.PI) * 8
}

function setRotation(player: Group, progress: number) {
    let endRotation = 0
    const move = state.movesQueue[0]
    if (move == "forward") endRotation = 0
    if (move == "left") endRotation = Math.PI / 2
    if (move == "right") endRotation = -Math.PI / 2
    if (move == "backward") endRotation = Math.PI

    player.children[0].rotation.z = MathUtils.lerp(
        player.children[0].rotation.z,
        endRotation,
        progress
    )
}