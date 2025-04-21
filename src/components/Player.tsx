import { Bounds } from "@react-three/drei";

export default function Player() {
  return (
    <Bounds fit clip observe margin={10}>
      <mesh castShadow receiveShadow position={[0, 0, 10]}>
        <boxGeometry args={[15, 15, 20]} />
        <meshStandardMaterial color={0xffffff} flatShading />
      </mesh>
    </Bounds>
  );
}
