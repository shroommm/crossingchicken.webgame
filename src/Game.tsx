import Controls from "./components/Controls";
import Map from "./components/Maps";
import Player from "./components/Player";
import Scene from "./components/Scene";
import "./Game.css"

export default function Game() {
  return (
    <div className="game">
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Controls />
    </div>
  );
}
