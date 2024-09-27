'use client'
import { useState, useEffect } from 'react';
import Grid from './Grid';
import ButtonControl from './ButtonControl';
import { Direction } from '@/types/control';
import { GRID_SIZE, OBSTACLES } from '@/constants/grid';
import TimeScore from './TimeScore';
import { formatTime, getRandomPosition } from '@/libs/helper';
import Modal from './Modal';

const initialPlayerPosition = { x: 0, y: 5 };
const initialOpponentPosition = { x: 0, y: 3 };

const Game: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
  const [opponentPosition, setOpponentPosition] = useState(initialOpponentPosition);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(60);

  const moveTile = (direction: Direction) => {
    setPlayerPosition((prevPosition) => {
      let { x, y } = prevPosition;

      const isObstacle = (x: number, y: number) => {
        return OBSTACLES.some(obstacle => obstacle.x === x && obstacle.y === y);
      };

      switch (direction) {
        case 'up':
          if (y > 0) {
            const newY = y - 1;
            if (!isObstacle(x, newY)) {
              y = newY;
            }
          }
          break;
        case 'down':
          if (y < GRID_SIZE - 1) {
            const newY = y + 1;
            if (!isObstacle(x, newY)) {
              y = newY;
            }
          }
          break;
        case 'left':
          if (x > 0) {
            const newX = x - 1;
            if (!isObstacle(newX, y)) {
              x = newX;
            }
          }
          break;
        case 'right':
          if (x < GRID_SIZE - 1) {
            const newX = x + 1;
            if (!isObstacle(newX, y)) {
              x = newX;
            }
          }
          break;
        default:
          break;
      }

      return { x, y };
    });
  };

  const handleTimeout = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setScore(0)
    setPlayerPosition(initialPlayerPosition)
    setOpponentPosition(initialOpponentPosition)
    setTime(60)
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalVisible) return
      if (e.key === 'ArrowUp') moveTile('up');
      if (e.key === 'ArrowDown') moveTile('down');
      if (e.key === 'ArrowLeft') moveTile('left');
      if (e.key === 'ArrowRight') moveTile('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playerPosition.x === opponentPosition.x && playerPosition.y === opponentPosition.y) {
      setOpponentPosition(() => (getRandomPosition()))
      setScore(prev => prev + 100)
    }
  }, [playerPosition.x, playerPosition.y, opponentPosition.x, opponentPosition.y])

  return (
    <div className="flex flex-col items-center space-y-4">
      <Grid opponentPosition={opponentPosition} playerPosition={playerPosition} />
      <TimeScore score={score} timer={formatTime(time)} />
      <ButtonControl moveTile={moveTile} />
      <Modal isVisible={isModalVisible} onClose={closeModal} score={score} />
    </div>
  );
};

export default Game;
