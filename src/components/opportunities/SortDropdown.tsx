// src/components/opportunities/SortDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "date", label: "Newest First" },
  { value: "rate", label: "Lowest Rate" },
  { value: "jobs_completed", label: "Most Applications" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = sortOptions.find((o) => o.value === value) || sortOptions[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-11 items-center gap-1.5 rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold text-primary-300 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-accent/30 hover:text-accent hover:shadow-lg active:scale-95"
      >
        {selected.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-xl backdrop-blur-xl">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`min-h-11 w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent-50 ${
                value === option.value
                  ? "text-accent font-medium bg-accent-50"
                  : "text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
