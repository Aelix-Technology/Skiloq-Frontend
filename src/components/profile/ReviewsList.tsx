// src/components/profile/ReviewsList.tsx
"use client";

import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import type { Review } from "@/types/worker";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-semibold tracking-tight text-primary">Reviews</h2>
          <span className="flex items-center gap-1 text-sm text-primary-300">
            <Star className="w-4 h-4 text-warning fill-warning" />
            {averageRating}
          </span>
          <span className="text-sm text-primary-200">({reviews.length})</span>
        </div>
      </div>

      <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-3">
        {displayed.map((review) => (
          <MotionDiv key={review.id} variants={listItem} className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-primary">{review.reviewer_name}</p>
                <p className="text-xs text-primary-300">
                  {new Date(review.submitted_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= review.rating
                        ? "text-warning fill-warning"
                        : "text-primary-100"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-primary-300 leading-relaxed">{review.comment}</p>
          </MotionDiv>
        ))}
      </MotionDiv>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-accent transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
        >
          {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
    </section>
  );
}
