/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ornaments } from "@/constants";
import { useMemo } from "react";

interface WordSvgItemProps {
  index: number;
  wordData: { svg: string; metrics: any } | undefined;
  width: number;
  height: number;
  padding: number;
}

export default function WordSvgItem({
  index,
  wordData,
  width,
  height,
  padding,
}: WordSvgItemProps) {
  const ornamentPath = useMemo(() => {
    const ornament = Math.floor(Math.random() * ornaments.length);
    return ornaments[ornament];
  }, []);

  return (
    <>
      {wordData && (
        <g
          dangerouslySetInnerHTML={{ __html: wordData.svg }}
          transform={`translate(0,${height * index})`}
        />
      )}

      <path
        transform={`translate(0,${padding + 5 + height * index}) scale(${
          width * 0.01
        })`}
        fill="black"
        d={ornamentPath}
      />
      <path
        transform={`translate(${width},${
          height - padding - 5 + height * index
        }) scale(${width * 0.01}) rotate(180)`}
        fill="black"
        d={ornamentPath}
      />

      <rect
        x={`${width - width * 0.05}`}
        y={`${height * index}`}
        width={width * 0.05}
        height={height}
        fill={`white`}
      />
      <rect
        x={`0`}
        y={`${height * index}`}
        width={width * 0.05}
        height={height}
        fill={`white`}
      />
      {wordData && (
        <>
          <circle
            cx={wordData.metrics?.x / 2}
            cy={height / 2 + height * index}
            r="1"
            stroke="blue"
            fill="blue"
          />
          <circle
            cx={width - wordData.metrics?.x / 2}
            cy={height / 2 + height * index}
            r="1"
            stroke="blue"
            fill="blue"
          />
        </>
      )}
      <rect
        x={`0`}
        y={`${height * index}`}
        width={width}
        height={height}
        fill={`none`}
        stroke="red"
      />
    </>
  );
}
