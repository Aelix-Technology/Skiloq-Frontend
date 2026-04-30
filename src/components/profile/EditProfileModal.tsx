// src/components/profile/EditProfileModal.tsx
"use client";

import { useState } from "react";
import { X, Camera } from "lucide-react";
import { toast } from "sonner";
import type { Worker } from "@/types/worker";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Worker;
  onSave: (updates: Partial<Worker>) => void;
}

export function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(profile.full_name);
  const [bio, setBio] = useState(profile.bio || "");
  const [rate, setRate] = useState(profile.hourly_rate_ghs?.toString() || "");
  const [district, setDistrict] = useState(profile.location_district || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      onSave({
        full_name: name,
        bio,
        hourly_rate_ghs: parseInt(rate) || 0,
        location_district: district,
      });
      toast.success("Profile updated!");
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-modal sm:rounded-modal w-full sm:max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary">Edit Profile</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-input hover:bg-primary-50">
            <X className="w-4 h-4 text-primary-300" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Photo placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center relative group cursor-pointer">
              <span className="text-2xl font-bold text-accent">
                {name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xs text-accent font-medium">Change photo</span>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-primary-400 mb-1.5 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-primary-400 mb-1.5 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              rows={4}
              maxLength={500}
              className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-primary resize-none focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <p className="text-xs text-primary-300 mt-1 text-right">{bio.length}/500</p>
          </div>

          {/* Rate */}
          <div>
            <label className="text-sm font-medium text-primary-400 mb-1.5 block">Hourly Rate (GHS)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* District */}
          <div>
            <label className="text-sm font-medium text-primary-400 mb-1.5 block">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">Select district</option>
              <option value="Accra Metropolitan">Accra Metropolitan</option>
              <option value="Kumasi Metropolitan">Kumasi Metropolitan</option>
              <option value="Tema Metropolitan">Tema Metropolitan</option>
              <option value="Tamale Metropolitan">Tamale Metropolitan</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-medium text-primary-300 border border-primary-100 rounded-input hover:bg-primary-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-accent text-white py-3 text-sm font-semibold rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}