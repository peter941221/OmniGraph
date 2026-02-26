"use client";

import type { ReactNode } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface ZoomableCanvasProps {
  children: ReactNode;
}

export function ZoomableCanvas({ children }: ZoomableCanvasProps) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
      <TransformWrapper
        minScale={0.3}
        maxScale={3}
        initialScale={1}
        centerOnInit
        limitToBounds={false}
        centerZoomedOut={false}
        alignmentAnimation={{ disabled: true }}
        smooth
        wheel={{ step: 0.12 }}
        panning={{
          disabled: false,
          velocityDisabled: true,
          allowLeftClickPan: true,
          allowMiddleClickPan: true,
          allowRightClickPan: false,
        }}
      >
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
              <span className="inline-flex items-center text-[11px] text-slate-500 dark:text-slate-400">
                Scroll to zoom · Drag to pan
              </span>
            </div>
            <TransformComponent
              wrapperClass="!w-full !h-[52vh] sm:!h-[60vh] rounded-lg border border-slate-200 dark:border-slate-800"
              contentClass="!w-max !h-max p-6"
            >
              {children}
            </TransformComponent>
            <div className="pointer-events-none absolute bottom-4 right-4">
              <button
                type="button"
                onClick={() => resetTransform()}
                className="pointer-events-auto rounded-md border border-slate-300 bg-white/95 px-2 py-1 text-xs shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/95 dark:hover:bg-slate-800"
              >
                恢复 100%
              </button>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
