import { Bounds } from "@react-three/drei";
import { Group } from "three";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { useRef } from "react";

export default function Player() {
  const player = useRef<Group>(null);
  usePlayerAnimation(player);

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={player}>
        <mesh castShadow receiveShadow position={[0, 0, 10]}>
          <boxGeometry args={[15, 15, 20]} />
          <meshStandardMaterial color={0xffffff} flatShading />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, 21]}>
          <boxGeometry args={[2, 4, 2]} />
          <meshStandardMaterial color={0xf0619a} flatShading />
        </mesh>
      </group>
    </Bounds>
  );
}
