import useEventListener from "../hooks/useEventListeners";
import { queueMove } from "../stores/player";
import "./Controls.css"

export default function Controls() {
  useEventListener();

  return (
    <div id="controls">
      <div>
        <button onClick={() => queueMove("forward")}>▲</button>
        <button onClick={() => queueMove("left")}>◀</button>
        <button onClick={() => queueMove("backward")}>▼</button>
        <button onClick={() => queueMove("right")}>▶</button>
      </div>
    </div>
  );
}
