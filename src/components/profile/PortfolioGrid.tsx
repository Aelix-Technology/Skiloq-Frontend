// src/components/profile/PortfolioGrid.tsx
"use client";

import { useState } from "react";
import { X, Link, Maximize2 } from "lucide-react";
import type { PortfolioItem } from "@/types/worker";

interface PortfolioGridProps {
  portfolio: PortfolioItem[];
}

export function PortfolioGrid({ portfolio }: PortfolioGridProps) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  if (portfolio.length === 0) return null;

  return (
    <section>
      <h2 className="text-md font-semibold text-primary mb-3">Portfolio</h2>
      <div className="grid grid-cols-2 gap-2">
        {portfolio.map((item) => (
          <button
            key={item.id}
            onClick={() => item.type === "image" && setSelected(item)}
            className="relative group aspect-[4/3] bg-primary-50 rounded-card border border-primary-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Link className="w-6 h-6 text-primary-300" />
                <span className="text-xs text-primary-300 px-2 text-center truncate w-full">
                  {item.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={selected.url}
            alt={selected.title}
            className="max-w-full max-h-[80vh] rounded-card object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white text-sm font-medium">{selected.title}</p>
        </div>
      )}
    </section>
  );
}