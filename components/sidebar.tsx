"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useSvg } from "@/contexts/svg-context";

const MM = 3.779528;

export default function Sidebar() {
  const { state, dispatch } = useSvg();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Get the SVG element
      const svgElement = document.querySelector("svg");
      if (!svgElement) {
        throw new Error("SVG element not found");
      }

      // Create a serialized version of the SVG
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);

      // Add XML declaration and ensure proper namespace
      const svgBlob = new Blob(
        ['<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n', svgString],
        { type: "image/svg+xml" }
      );

      // Create a download link
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sign.svg`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Download completed successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to download SVG",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 bg-muted/20 p-6 border-r min-h-screen">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure your options
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Text
            </label>
            <Input
              id="text"
              value={state.text}
              onChange={(e) =>
                dispatch({
                  type: "SET_TEXT",
                  payload: e.target.value.toUpperCase(),
                })
              }
              placeholder="Enter text"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="width" className="text-sm font-medium">
              Width (mm)
            </label>
            <Input
              id="width"
              type="number"
              value={state.width / MM}
              onChange={(e) =>
                dispatch({
                  type: "SET_WIDTH",
                  payload: parseFloat(e.target.value) * MM,
                })
              }
              placeholder="Width in mm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="height" className="text-sm font-medium">
              Height (mm)
            </label>
            <Input
              id="height"
              type="number"
              value={state.height / MM}
              onChange={(e) =>
                dispatch({
                  type: "SET_HEIGHT",
                  payload: parseFloat(e.target.value) * MM,
                })
              }
              placeholder="Height in mm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fontSize" className="text-sm font-medium">
              Font Size (mm)
            </label>
            <Input
              id="fontSize"
              type="number"
              value={state.fontSize / MM}
              onChange={(e) =>
                dispatch({
                  type: "SET_FONT_SIZE",
                  payload: parseFloat(e.target.value) * MM,
                })
              }
              placeholder="Font size in mm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="padding" className="text-sm font-medium">
              Padding (mm)
            </label>
            <Input
              id="padding"
              type="number"
              value={state.padding / MM}
              onChange={(e) =>
                dispatch({
                  type: "SET_PADDING",
                  payload: parseFloat(e.target.value) * MM,
                })
              }
              placeholder="Padding in mm"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ornament" className="text-sm font-medium">
              Ornament
            </label>
            <Input
              id="ornament"
              type="number"
              value={state.ornament}
              onChange={(e) =>
                dispatch({
                  type: "SET_ORNAMENT",
                  payload: parseInt(e.target.value),
                })
              }
              placeholder="Ornament index"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleDownload}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Download"}
          </Button>
        </div>
      </div>
    </div>
  );
}
