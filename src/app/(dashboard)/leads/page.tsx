import LeadsView from "@/components/leads/LeadsView";
import { createClient } from "@/lib/supabase/server";
import { getUserOrgs } from "@/lib/supabase/organizations";
import { getLeads } from "@/lib/supabase/leads";

async function getPageData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!supabaseUrl.startsWith("http")) {
    return { orgId: null, userId: null, leads: [] };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { orgId: null, userId: null, leads: [] };
  }

  const orgs = await getUserOrgs(supabase, user.id);
  const org = orgs[0];
  if (!org) {
    return { orgId: null, userId: user.id, leads: [] };
  }

  const leads = await getLeads(supabase, org.id);
  return { orgId: org.id, userId: user.id, leads };
}

export default async function LeadsPage() {
  const { orgId, userId, leads } = await getPageData();

  return <LeadsView orgId={orgId} userId={userId} initialLeads={leads} />;
}
