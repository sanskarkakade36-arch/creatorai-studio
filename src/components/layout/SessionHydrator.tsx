"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import type { Profile, Organization, OrgMemberRole } from "@/types/database";

interface SessionHydratorProps {
  profile: Profile | null;
  org: Organization | null;
  role: OrgMemberRole | null;
}

export default function SessionHydrator({ profile, org, role }: SessionHydratorProps) {
  const setProfile = useSessionStore((s) => s.setProfile);
  const setOrg = useSessionStore((s) => s.setOrg);

  useEffect(() => {
    setProfile(profile);
    setOrg(org, role);
  }, [profile, org, role, setProfile, setOrg]);

  return null;
}
