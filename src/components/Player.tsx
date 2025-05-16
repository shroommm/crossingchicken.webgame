import { Bounds } from "@react-three/drei";
import { DirectionalLight as ThreeDirectionalLight, Group } from "three";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import DirectionalLight from "./DirectionalLight";
import { setRef } from "../stores/player";

export default function Player() {
  const player = useRef<Group>(null);
  const lightRef = useRef<ThreeDirectionalLight>(null);
  const camera = useThree((state) => state.camera);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current) return;
    if (!lightRef.current) return;

    player.current.add(camera);
    lightRef.current.target = player.current;

    // Set the player ref in the store
    setRef(player.current);
  });

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={player}>
        <group>
          <mesh castShadow receiveShadow position={[0, 0, 10]}>
            <boxGeometry args={[15, 15, 20]} />
            <meshStandardMaterial color={0xffffff} flatShading />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0, 21]}>
            <boxGeometry args={[2, 4, 2]} />
            <meshStandardMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={lightRef}/>
      </group>
    </Bounds>
  );
}
