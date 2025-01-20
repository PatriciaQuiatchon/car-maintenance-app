import React from 'react';
import './style.css';

interface Point {
  id: number;
  x: number; 
  y: number; 
  description: string;
}

interface ImageWithTooltipsProps {
  imageSrc: string;
  points: Point[];
}

const ImageWithTooltips: React.FC<ImageWithTooltipsProps> = ({ imageSrc, points }) => {
  return (
    <div className="image-container">
      <img src={imageSrc} alt="Interactive" className="interactive-image" />
      {points.map((point) => (
        <div
          key={point.id}
          className="point"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <span className="tooltip">{point.description}</span>
        </div>
      ))}
    </div>
  );
};

export default ImageWithTooltips;
