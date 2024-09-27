import { memo } from "react";

interface ITileProps {
  isBlueTile: boolean;
  isYellowTile: boolean;
  isObstacle: boolean;
  numIndex?: number;
}

const Tile = ({
  isBlueTile,
  isYellowTile,
  isObstacle,
  numIndex
}: ITileProps) => {
  return (
    <div
      className={`w-16 h-16 border ${isBlueTile ? 'bg-blue-500' : isYellowTile ? 'bg-yellow-500' : isObstacle ? 'bg-game-theme' : 'bg-white'
        }`}
    >{numIndex}</div>
  );
};

export default memo(Tile);
