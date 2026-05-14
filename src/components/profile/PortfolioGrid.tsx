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
      <h2 className="text-md font-semibold tracking-tight text-primary mb-3">Portfolio</h2>
      <div className="grid grid-cols-2 gap-3">
        {portfolio.map((item) => (
          <button
            key={item.id}
            onClick={() => item.type === "image" && setSelected(item)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/70 bg-primary-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 active:scale-95"
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
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
            className="absolute top-4 right-4 flex min-h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg active:scale-95"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={selected.url}
            alt={selected.title}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white text-sm font-medium">{selected.title}</p>
        </div>
      )}
    </section>
  );
}
