import { tileSize } from "../constants";

type Props = {
  tileIndex: number;
  height: number;
};

export default function Tree({ tileIndex, height }: Props) {
  return (
    <group position-x={tileIndex * tileSize}>
      <mesh castShadow receiveShadow position-z={height / 2 + 20}>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color={0x7aa21d} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position-z={10}>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0x4d2926} flatShading />
      </mesh>
    </group>
  );
}
