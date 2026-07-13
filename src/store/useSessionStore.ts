import { create } from "zustand";
import type { Profile, Organization, OrgMemberRole } from "@/types/database";

interface SessionState {
  profile: Profile | null;
  org: Organization | null;
  role: OrgMemberRole | null;
  setProfile: (profile: Profile | null) => void;
  setOrg: (org: Organization | null, 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    role: OrgMemberRole | null) => void;
  adjustCredits: (delta: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  profile: null,
  org: null,
  role: null,
  setProfile: (profile) => set({ profile }),
  setOrg: (org, role) => set({ org, role }),
  adjustCredits: (delta) =>
    set((state) =>
      state.profile ? { profile: { ...state.profile, credits: state.profile.credits + delta } } : state,
    ),
}));
