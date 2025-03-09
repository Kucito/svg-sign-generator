"use client";
import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import { useSvg } from "@/contexts/svg-context";
import WordSvgItem from "@/components/word-svg-item";

const MM = 3.779528;

export default function Home() {
  const { state, generateSvg } = useSvg();
  const { padding, width, height, fontSize, text, svg, wordSvgs } = state;

  const texts = text.split(" ");

  useEffect(() => {
    generateSvg();
  }, [text, width, height, fontSize, generateSvg]);

  if (!svg) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width} ${height * texts.length}`}
          width={`${width / MM}mm`}
          height={`${(height / MM) * texts.length}mm`}
        >
          {texts.map((word, index) => {
            const wordData = wordSvgs[word];
            return (
              <WordSvgItem
                key={`${word}-${index}`}
                index={index}
                wordData={wordData}
                width={width}
                height={height}
                padding={padding}
              />
            );
          })}
        </svg>
      </main>
    </div>
  );
}
