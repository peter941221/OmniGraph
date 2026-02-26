"use client";

import type { ReactNode } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface ZoomableCanvasProps {
  children: ReactNode;
}

export function ZoomableCanvas({ children }: ZoomableCanvasProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
      <TransformWrapper minScale={0.4} maxScale={3} initialScale={1}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div>
            <div className="mb-2 flex gap-2">
              <button
                type="button"
                onClick={() => zoomIn()}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => zoomOut()}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => resetTransform()}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Reset
              </button>
            </div>
            <TransformComponent
              wrapperClass="!w-full !h-[60vh] rounded-lg border border-slate-200 dark:border-slate-800"
              contentClass="!w-full !h-full flex items-center justify-center p-6"
            >
              {children}
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
