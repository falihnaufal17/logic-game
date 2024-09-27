import { Direction } from "@/types/control";
import { memo } from "react";

interface IButtonControlProps {
  moveTile: (direction: Direction) => void;
}

const ButtonControl = ({ moveTile }: IButtonControlProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <button onClick={() => moveTile('up')} className="px-4 py-2 bg-gray-300 rounded">
        Atas
      </button>
      <div className="flex space-x-2">
        <button onClick={() => moveTile('left')} className="px-4 py-2 bg-gray-300 rounded">
          Kiri
        </button>
        <button onClick={() => moveTile('right')} className="px-4 py-2 bg-gray-300 rounded">
          Kanan
        </button>
      </div>
      <button onClick={() => moveTile('down')} className="px-4 py-2 bg-gray-300 rounded">
        Bawah
      </button>
    </div>
  );
};

export default memo(ButtonControl);
