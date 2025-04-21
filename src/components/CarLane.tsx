import { Row } from "../types";
import Car from "./Car";
import Road from "./Road";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "car" }>;
};

export default function CarLane({ rowIndex, rowData }: Props) {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car 
            key={index}
            rowIndex={rowIndex}
            initialTileIndex={vehicle.initialTileIndex}
            direction={rowData.direction}
            speed={rowData.speed}
            color={vehicle.color}
        />
      ))}
    </Road>
  );
}
