import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  score: number;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, score }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl">Time's Up!</h2>
        <p className="mt-2">Your Score: {score}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
