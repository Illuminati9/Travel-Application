import React from 'react';

const Loading = ({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className: string;
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <circle
          className="spinLoader2"
          cx="400"
          cy="400"
          fill="none"
          r="109"
          strokeWidth="35"
          stroke="#000000"
          strokeDasharray="685 1400"
          strokeLinecap="round"
        />
      </svg>
      <span className={className}>Loading...</span>
    </div>
  );
};

export default Loading;
