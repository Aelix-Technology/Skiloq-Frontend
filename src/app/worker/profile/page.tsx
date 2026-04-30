// src/app/worker/profile/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SkillDisplay } from "@/components/profile/SkillDisplay";
import { PortfolioGrid } from "@/components/profile/PortfolioGrid";
import { ReviewsList } from "@/components/profile/ReviewsList";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useWorkerProfile, useUpdateProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { data: profile, isLoading, error, refetch } = useWorkerProfile();
  const updateProfile = useUpdateProfile();
  const [showEditModal, setShowEditModal] = useState(false);

  if (isLoading) {
    return (
      <WorkerLayout>
        <ProfileSkeleton />
      </WorkerLayout>
    );
  }

  if (error || !profile) {
    return (
      <WorkerLayout>
        <ErrorState onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  const handleSave = (updated: Partial<typeof profile>) => {
    updateProfile.mutate(updated, {
      onSuccess: () => {
        setShowEditModal(false);
      },
    });
  };

  return (
    <WorkerLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          onEdit={() => setShowEditModal(true)}
        />

        {/* Bio */}
        {profile.bio && (
          <section>
            <h2 className="text-md font-semibold text-primary mb-2">About</h2>
            <p className="text-sm text-primary-300 leading-relaxed">{profile.bio}</p>
          </section>
        )}

        {/* Skills */}
        <SkillDisplay skills={profile.skills} />

        {/* Portfolio */}
        {profile.portfolio.length > 0 && (
          <PortfolioGrid portfolio={profile.portfolio} />
        )}

        {/* Reviews */}
        {profile.reviews.length > 0 && (
          <ReviewsList reviews={profile.reviews} />
        )}

        {/* Edit Modal */}
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={handleSave}
        />
      </div>
    </WorkerLayout>
  );
}