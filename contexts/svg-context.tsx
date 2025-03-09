/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
//@ts-expect-error
import textToSvg from "text-to-svg";

const MM = 3.779528;

// Define the state type
type SvgState = {
  padding: number;
  width: number;
  height: number;
  fontSize: number;
  text: string;
  svg: string | null;
  svgMetrics: any;
  ornament: number;
  wordSvgs: Record<string, { svg: string; metrics: any }>;
};

// Define the initial state
const initialState: SvgState = {
  padding: 2.7 * MM,
  width: 256 * MM,
  height: 50 * MM,
  fontSize: 32 * MM,
  text: "ФАМИЛИЯ".toUpperCase(),
  svg: null,
  svgMetrics: null,
  ornament: 1,
  wordSvgs: {},
};

// Define action types
type SvgAction =
  | { type: "SET_PADDING"; payload: number }
  | { type: "SET_WIDTH"; payload: number }
  | { type: "SET_HEIGHT"; payload: number }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_SVG"; payload: string | null }
  | { type: "SET_SVG_METRICS"; payload: any }
  | { type: "SET_ORNAMENT"; payload: number }
  | { type: "UPDATE_SVG"; payload: { svg: string; metrics: any } }
  | {
      type: "UPDATE_WORD_SVG";
      payload: { word: string; svg: string; metrics: any };
    };

// Create the reducer function
const svgReducer = (state: SvgState, action: SvgAction): SvgState => {
  switch (action.type) {
    case "SET_PADDING":
      return { ...state, padding: action.payload };
    case "SET_WIDTH":
      return { ...state, width: action.payload };
    case "SET_HEIGHT":
      return { ...state, height: action.payload };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.payload };
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_SVG":
      return { ...state, svg: action.payload };
    case "SET_SVG_METRICS":
      return { ...state, svgMetrics: action.payload };
    case "SET_ORNAMENT":
      return { ...state, ornament: action.payload };
    case "UPDATE_SVG":
      return {
        ...state,
        svg: action.payload.svg,
        svgMetrics: action.payload.metrics,
      };
    case "UPDATE_WORD_SVG":
      return {
        ...state,
        wordSvgs: {
          ...state.wordSvgs,
          [action.payload.word]: {
            svg: action.payload.svg,
            metrics: action.payload.metrics,
          },
        },
      };
    default:
      return state;
  }
};

// Create the context
type SvgContextType = {
  state: SvgState;
  dispatch: React.Dispatch<SvgAction>;
  generateSvg: () => void;
  generateSvgForWord: (word: string) => void;
};

const SvgContext = createContext<SvgContextType | undefined>(undefined);

// Create the provider component
export const SvgProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(svgReducer, initialState);

  const generateSvg = () => {
    const options = {
      x: state.width / 2,
      y: state.height / 2 + 2.5,
      fontSize: state.fontSize,
      anchor: "center middle",
      attributes: { fill: "black", id: "svgText" },
    };

    textToSvg.load("./font.ttf", function (err: any, font: any) {
      if (err || !font) return;

      const svg = font.getPath(state.text, options);
      const metrics = font.getMetrics(state.text, options);

      dispatch({
        type: "UPDATE_SVG",
        payload: { svg, metrics },
      });

      // Also generate SVGs for each word
      const words = state.text.split(" ");
      words.forEach((word) => {
        generateSvgForWordInternal(word, font, options);
      });
    });
  };

  const generateSvgForWordInternal = (
    word: string,
    font: any,
    options: any
  ) => {
    if (!font) return;

    const svg = font.getPath(word, options);
    const metrics = font.getMetrics(word, options);

    dispatch({
      type: "UPDATE_WORD_SVG",
      payload: { word, svg, metrics },
    });
  };

  const generateSvgForWord = (word: string) => {
    const options = {
      x: state.width / 2,
      y: state.height / 2 + 2.5,
      fontSize: state.fontSize,
      anchor: "center middle",
      attributes: { fill: "black", id: "svgText" },
    };

    textToSvg.load("./font.ttf", function (err: any, font: any) {
      if (err || !font) return;
      generateSvgForWordInternal(word, font, options);
    });
  };

  return (
    <SvgContext.Provider
      value={{ state, dispatch, generateSvg, generateSvgForWord }}
    >
      {children}
    </SvgContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSvg = () => {
  const context = useContext(SvgContext);
  if (context === undefined) {
    throw new Error("useSvg must be used within a SvgProvider");
  }
  return context;
};
