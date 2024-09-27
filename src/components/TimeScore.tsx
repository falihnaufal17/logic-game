import { memo } from "react";

interface ITimeScoreProps {
  timer: string;
  score: number;
}

const TimeScore = ({
  score,
  timer
}: ITimeScoreProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-white">{timer}</p>
      <p className="text-white">Total: {score}</p>
    </div>
  )
}

export default memo(TimeScore);