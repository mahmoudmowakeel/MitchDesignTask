// export default function SortByComponent() {}

"use client";
import { useState, useRef } from "react";

interface Props {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function SortByComponent({ open, onClose, children }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [translate, setTranslate] = useState(0);
  const [overlayColor, setOverlayColor] = useState("rgba(0,0,0,0.6)");

  function handleTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY;
  }

  function handleTouchMove(e: React.TouchEvent) {
    currentY.current = e.touches[0].clientY;

    const delta = currentY.current - startY.current;

    if (delta > 0) {
      setTranslate(delta);

      const progress = Math.min(delta / 300, 1);

      if (progress < 0.5) {
        const v = progress * 2; // 0 → 1
        setOverlayColor(`rgba(${255 * v}, ${255 * v}, ${255 * v}, 0.6)`);
      } else {
        const opacity = 0.6 * (1 - (progress - 0.5) * 2);
        setOverlayColor(`rgba(255,255,255,${opacity})`);
      }
    }
  }

  function handleTouchEnd() {
    if (translate > 120) {
        // onClose();
    }
    setTranslate(0);
    setOverlayColor("rgba(0,0,0,0.6)");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 transition-colors"
          style={{ backgroundColor: overlayColor }}
          onClick={onClose}
        />
      )}

      <div
        ref={sheetRef}
        className={`fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl p-4 z-40 transition-transform`}
        style={{
          transform: open ? `translateY(${translate}px)` : "translateY(100%)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {children}
      </div>
    </>
  );
}
