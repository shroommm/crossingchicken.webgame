import { useEffect } from "react";
import { queueMove } from "../stores/player";

export default function useEventListeners() {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const key = event.key.toLowerCase();
            if (key === "arrowup") {
                event.preventDefault(); // Prevent default scrolling behavior
                queueMove("forward");
            } else if (key === "arrowdown") {
                event.preventDefault(); // Prevent default scrolling behavior
                queueMove("backward");
            } else if (key === "arrowleft") {
                event.preventDefault(); // Prevent default scrolling behavior
                queueMove("left");
            } else if (key === "arrowright") {
                event.preventDefault(); // Prevent default scrolling behavior
                queueMove("right");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

}