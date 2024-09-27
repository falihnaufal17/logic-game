import { GRID, GRID_SIZE, OBSTACLES } from '@/constants/grid';
import Tile from './Tile';
import { memo } from 'react';

interface IGridProps {
  playerPosition: {
    x: number;
    y: number;
  }
  opponentPosition: {
    x: number;
    y: number
  }
}

const Grid = ({ playerPosition, opponentPosition }: IGridProps) => {
  return (
    <div className="grid grid-cols-6 gap-1">
      {GRID.map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);
        const isBlueTile = x === playerPosition.x && y === playerPosition.y;
        const isYellowTile = x === opponentPosition.x && y === opponentPosition.y;
        const isObstacle = OBSTACLES.some(obstacle => obstacle.x === x && obstacle.y === y);

        return <Tile
          isYellowTile={isYellowTile}
          key={index}
          isBlueTile={isBlueTile}
          isObstacle={isObstacle} />;
      })}
    </div>
  );
};

export default memo(Grid);
