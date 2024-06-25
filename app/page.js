"use client";
import { useState, useEffect, useRef } from "react";
import textToSvg from "text-to-svg";
import { ornaments } from "./ornaments";

const MM = 3.779528;

export default function Home() {
  //States
  const [padding, setPadding] = useState(3 * MM);
  const [width, setWidth] = useState(256 * MM);
  const [height, setHeight] = useState(50 * MM);
  const [fontSize, setFontSize] = useState(32 * MM);
  const [text, setText] = useState("ФАМИЛИЯ".toUpperCase());
  const [svg, setSvg] = useState(null);
  const [svgMetrics, setSvgMetrics] = useState(null);
  const [ornament, setOrnament] = useState(1);

  //Refs
  const svgFile = useRef(null);

  const attributes = { fill: "black", id: "svgText" };

  const options = {
    x: width / 2,
    y: height / 2 + 2.5,
    fontSize: fontSize,
    anchor: "center middle",
    attributes: attributes,
  };

  useEffect(() => {
    textToSvg.load("./font.ttf", function (err, font) {
      const svg = font.getPath(text, options);
      setSvg(svg);
      setSvgMetrics(font.getMetrics(text, options));
    });
  }, [text, width, height, fontSize]);

  const handleDownload = () => {
    const blob = new Blob([svgFile.current.outerHTML], { type: svg });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "sign.svg";
    link.href = fileUrl;
    link.click();
  };

  if (!svg) {
    return;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={svgFile}
        viewBox={`0 0 ${width} ${height}`}
        width={`${width / MM}mm`}
        height={`${height / MM}mm`}
      >
        <g dangerouslySetInnerHTML={{ __html: svg }}></g>

        <path
          transform={`translate(0,${padding + 5}) scale(${width * 0.01})`}
          fill="black"
          d={ornaments[ornament]}
        />
        <path
          transform={`translate(${width},${height - padding - 5}) scale(${
            width * 0.01
          }) rotate(180)`}
          fill="black"
          d={ornaments[ornament]}
        />

        <rect
          x={`${width - width * 0.05}`}
          y={`0`}
          width={width * 0.05}
          height={height}
          fill={`white`}
        />
        <rect
          x={`0`}
          y={`0`}
          width={width * 0.05}
          height={height}
          fill={`white`}
        />
        <circle
          cx={svgMetrics.x / 2}
          cy={height / 2}
          r="1"
          stroke="blue"
          fill="blue"
        />
        <circle
          cx={width - svgMetrics.x / 2}
          cy={height / 2}
          r="1"
          stroke="blue"
          fill="blue"
        />
        <rect
          x={`0`}
          y={`0`}
          width={width}
          height={height}
          fill={`none`}
          stroke="red"
        />
      </svg>
      <table className="table-auto">
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={width / MM}
                onChange={(e) => {
                  setWidth(e.target.value * MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setWidth((prevState) => prevState + MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setWidth((prevState) => prevState - MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                -
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="number"
                value={height / MM}
                onChange={(e) => {
                  setHeight(e.target.value * MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setHeight((prevState) => prevState + MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setHeight((prevState) => prevState - MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                -
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="number"
                value={parseInt(fontSize / MM)}
                onChange={(e) => {
                  setFontSize(e.target.value * MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setFontSize((prevState) => prevState + MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setFontSize((prevState) => prevState - MM);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                -
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value.toUpperCase());
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="number"
                value={ornament}
                onChange={(e) => {
                  setOrnament(e.target.value);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setOrnament((prevState) => prevState + 1);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setOrnament((prevState) => prevState - 1);
                }}
                className="block text-center text-[1rem] rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleDownload}>Download</button>
    </main>
  );
}
