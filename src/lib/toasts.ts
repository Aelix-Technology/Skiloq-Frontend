// src/lib/toasts.ts
import { toast } from "sonner";

// Centralized toast messages — one place to update copy
export const toasts = {
  // Auth
  otpSent: () => toast.success("OTP sent to your phone"),
  otpVerified: () => toast.success("Phone verified!"),
  invalidOTP: () => toast.error("Invalid OTP. Please try again."),
  invalidPIN: () => toast.error("Invalid PIN. Please try again."),
  pinSet: () => toast.success("PIN set successfully!"),
  loggedOut: () => toast.success("Logged out"),
  welcomeBack: () => toast.success("Welcome back!"),
  accountLocked: () => toast.error("Account locked. Try again in 15 minutes."),

  // Onboarding
  onboardingComplete: () => toast.success("Onboarding complete! Welcome to Aelix."),

  // Jobs
  applicationSubmitted: () => toast.success("Application submitted!"),
  applicationError: () => toast.error("Failed to submit application."),

  // Wallet
  withdrawSuccess: (amount: number) =>
    toast.success(`GHS ${amount} sent. Arriving in 0-2 minutes.`),
  withdrawError: () => toast.error("Withdrawal failed. Try again."),
  minWithdrawal: () => toast.error("Minimum withdrawal is GHS 10"),
  insufficientBalance: () => toast.error("Insufficient available balance"),
  dailyLimit: () => toast.error("Daily limit is GHS 10,000"),
  invalidWithdrawPIN: () => toast.error("Invalid security PIN"),

  // Profile
  profileUpdated: () => toast.success("Profile updated!"),
  profileError: () => toast.error("Failed to update profile."),

  // Income Certificate
  certificateDownloaded: () => toast.success("Income Certificate downloaded"),
};