import { GRID_SIZE, OBSTACLES } from "@/constants/grid";

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getRandomPosition = () => {
  let randomX = Math.floor(Math.random() * GRID_SIZE)
  let randomY = Math.floor(Math.random() * GRID_SIZE)

  while (OBSTACLES.some(obstacle => obstacle.x === randomX && obstacle.y === randomY)) {
    randomX = Math.floor(Math.random() * GRID_SIZE);
    randomY = Math.floor(Math.random() * GRID_SIZE);
  }

  return { x: randomX, y: randomY }; 
}