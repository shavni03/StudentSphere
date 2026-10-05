/**
 * StudentSphere Configurable Credit Economy Rules
 * 
 * Central source of truth for community points and rewards.
 * Downloads are strictly 0 Credits (100% Free).
 */

export const CREDIT_CONFIG = {
  // Earning rules from approved submissions
  NOTE_APPROVED: 10,
  PYQ_APPROVED: 15,
  INTERVIEW_APPROVED: 20,
  WELCOME_BONUS: 100,

  // Universal download cost: ALWAYS ZERO
  DOWNLOAD_COST: 0,

  // Redeemable rewards store costs
  REWARDS: {
    RESUME_REVIEW: 300,
    MOCK_INTERVIEW: 500,
    GOLDEN_BADGE: 200
  }
};
