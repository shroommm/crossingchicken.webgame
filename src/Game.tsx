import Controls from "./components/Controls";
import Map from "./components/Maps";
import Player from "./components/Player";
import Scene from "./components/Scene";
import { Score } from "./components/Score";
import "./Game.css";

export default function Game() {
  return (
    <div className="game">
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Score />
      <Controls />
    </div>
  );
}
