export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type OrgPlan = "free" | "starter" | "growth" | "agency";
export type OrgMemberRole = "owner" | "admin" | "manager" | "sales" | "marketing" | "viewer";

// ─── Original CreatorAI Studio Tables ────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          credits: number;
          plan: "free" | "apprentice" | "artisan" | "maestro";
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      generations: {
        Row: {
          id: string;
          user_id: string;
          type: "image" | "video" | "upscale" | "texture";
          prompt: string;
          model: string;
          status: "pending" | "processing" | "completed" | "failed";
          output_urls: string[];
          settings: Json;
          credits_used: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["generations"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["generations"]["Insert"]>;
        Relationships: [];
      };
      trained_models: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          trigger_word: string;
          replicate_model_id: string | null;
          status: "training" | "ready" | "failed";
          thumbnail_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["trained_models"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["trained_models"]["Insert"]>;
        Relationships: [];
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: "earned" | "spent" | "purchased" | "refunded";
          description: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["credit_transactions"]["Row"], "id" | "created_at">;
        Update: never;
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          industry: string | null;
          industry_niche: string | null;
          website: string | null;
          logo_url: string | null;
          description: string | null;
          owner_id: string;
          plan_tier: OrgPlan;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["organizations"]["Row"], "id" | "created_at" | "updated_at" | "plan_tier" | "onboarding_completed"> & {
          plan_tier?: OrgPlan;
          onboarding_completed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
        Relationships: [];
      };
      org_members: {
        Row: {
          id: string;
          org_id: string;
          user_id: string;
          role: OrgMemberRole;
          invited_by: string | null;
          joined_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["org_members"]["Row"], "id" | "joined_at" | "role"> & {
          role?: OrgMemberRole;
        };
        Update: Partial<Database["public"]["Tables"]["org_members"]["Insert"]>;
        Relationships: [];
      };
      brand_profiles: {
        Row: {
          id: string;
          org_id: string;
          business_type: string | null;
          target_audience: TargetAudience;
          tone_of_voice: ToneOfVoice;
          brand_personality: string[];
          offerings: BrandOffering[];
          competitors: BrandCompetitor[];
          unique_selling_points: string[];
          pain_points_solved: string[];
          monthly_budget_range: BudgetRange | null;
          marketing_experience: MarketingExperience;
          current_platforms: string[];
          past_campaigns: Json[];
          brand_colors: string[];
          brand_fonts: string[];
          approved_keywords: string[];
          banned_words: string[];
          ai_brand_summary: string | null;
          ai_strategy: Json;
          ai_last_analyzed_at: string | null;
          primary_goal: PrimaryGoal;
          monthly_targets: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["brand_profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["brand_profiles"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          org_id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          location: string | null;
          company: string | null;
          source: LeadSource;
          source_post_id: string | null;
          source_campaign_id: string | null;
          source_url: string | null;
          utm_data: Json;
          status: LeadStatus;
          pipeline_stage_entered_at: Json;
          ai_score: number;
          ai_score_reason: string | null;
          ai_insights: Json;
          ai_last_analyzed_at: string | null;
          assigned_to: string | null;
          assigned_at: string | null;
          tags: string[];
          priority: LeadPriority;
          preferred_channel: string | null;
          do_not_contact: boolean;
          best_contact_time: string | null;
          estimated_value: number;
          converted_value: number | null;
          converted_at: string | null;
          lost_reason: string | null;
          custom_fields: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          org_id: string;
          content: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["lead_notes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["lead_notes"]["Insert"]>;
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          org_id: string | null;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          data: Json;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "created_at" | "is_read"> & {
          is_read?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
        Relationships: [];
      };
      ai_reports: {
        Row: {
          id: string;
          org_id: string;
          report_type: "weekly" | "monthly" | "campaign" | "on_demand";
          period_start: string | null;
          period_end: string | null;
          insights: Json[];
          recommendations: Json[];
          red_flags: Json[];
          opportunities: Json[];
          generated_by: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ai_reports"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["ai_reports"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_organization_with_owner: {
        Args: { p_name: string };
        Returns: Database["public"]["Tables"]["organizations"]["Row"];
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Generation = Database["public"]["Tables"]["generations"]["Row"];
export type TrainedModel = Database["public"]["Tables"]["trained_models"]["Row"];
export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type OrgMember = Database["public"]["Tables"]["org_members"]["Row"];
export type BrandProfile = Database["public"]["Tables"]["brand_profiles"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadNote = Database["public"]["Tables"]["lead_notes"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type AIReport = Database["public"]["Tables"]["ai_reports"]["Row"];

// ─── Growth OS Types ──────────────────────────────────────────────────────────

// ─── Brand Intelligence ───────────────────────────────────────────────────────

export type ToneOfVoice = "professional" | "casual" | "fun" | "luxury" | "bold" | "friendly" | "authoritative";
export type MarketingExperience = "none" | "beginner" | "intermediate" | "advanced";
export type PrimaryGoal = "leads" | "sales" | "awareness" | "followers" | "traffic" | "retention";
export type BudgetRange = "<10k" | "10k-50k" | "50k-2L" | "2L-5L" | "5L+";

export interface BrandOffering {
  name: string;
  description: string;
  price?: string;
  usp?: string;
}

export interface BrandCompetitor {
  name: string;
  website?: string;
  strengths?: string;
  weaknesses?: string;
}

export interface TargetAudience {
  age_range?: string;
  gender?: string;
  location?: string;
  interests?: string[];
  income_range?: string;
  language?: string;
}

// ─── Social Accounts ──────────────────────────────────────────────────────────

export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "twitter" | "youtube" | "tiktok";

export interface SocialAccount {
  id: string;
  org_id: string;
  platform: SocialPlatform;
  account_id: string;
  account_name: string | null;
  account_username: string | null;
  account_avatar: string | null;
  account_type: string;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  scopes: string[];
  is_active: boolean;
  last_synced_at: string | null;
  follower_count: number;
  following_count: number;
  post_count: number;
  created_at: string;
}

// ─── Content / Publishing ─────────────────────────────────────────────────────

export type PostStatus = "draft" | "pending_approval" | "approved" | "scheduled" | "publishing" | "published" | "failed";
export type MediaType = "image" | "video" | "carousel" | "reel" | "story";
export type PostType = "organic" | "ad" | "story" | "reel" | "carousel" | "campaign";

export interface ContentPost {
  id: string;
  org_id: string;
  title: string | null;
  caption: string | null;
  hashtags: string[];
  keywords: string[];
  call_to_action: string | null;
  media_type: MediaType;
  media_urls: string[];
  thumbnail_url: string | null;
  platforms: SocialPlatform[];
  platform_versions: Json;
  post_type: PostType;
  campaign_id: string | null;
  ai_generated: boolean;
  original_prompt: string | null;
  ai_model_used: string | null;
  ai_score: number;
  status: PostStatus;
  approved_by: string | null;
  approved_at: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  platform_post_ids: Json;
  performance: Json;
  performance_last_synced: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Leads / CRM ─────────────────────────────────────────────────────────────

export type LeadStatus = "new" | "contacted" | "qualified" | "interested" | "warm" | "hot" | "negotiation" | "converted" | "lost";
export type LeadSource = "instagram_comment" | "instagram_dm" | "facebook" | "whatsapp" | "website" | "manual" | "csv" | "qr" | "linkedin" | "referral";
export type LeadPriority = "low" | "medium" | "high" | "urgent";

export interface LeadActivity {
  id: string;
  lead_id: string;
  org_id: string;
  type: string;
  direction: "inbound" | "outbound";
  content: string | null;
  media_url: string | null;
  ai_generated: boolean;
  sentiment: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  org_id: string;
  lead_id: string | null;
  title: string;
  description: string | null;
  type: string;
  status: "pending" | "in_progress" | "done" | "cancelled";
  priority: LeadPriority;
  assigned_to: string | null;
  due_at: string | null;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
}

// ─── Community Manager ────────────────────────────────────────────────────────

export type ConversationStatus = "open" | "bot_handling" | "needs_human" | "closed";
export type ConversationIntent = "inquiry" | "complaint" | "purchase" | "support" | "spam" | "general";

export interface Conversation {
  id: string;
  org_id: string;
  lead_id: string | null;
  social_account_id: string | null;
  platform: SocialPlatform | "whatsapp" | "email" | "website";
  external_id: string | null;
  external_user_id: string | null;
  external_username: string | null;
  external_avatar: string | null;
  status: ConversationStatus;
  handled_by: "bot" | "human";
  assigned_to: string | null;
  post_id: string | null;
  sentiment: string | null;
  intent: ConversationIntent | null;
  ai_context: Json;
  ai_last_replied_at: string | null;
  escalation_reason: string | null;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  org_id: string;
  sender_type: "lead" | "bot" | "human_agent";
  sender_id: string | null;
  content: string | null;
  media_urls: string[];
  media_type: string;
  ai_generated: boolean;
  ai_confidence: number | null;
  sentiment: string | null;
  intent_detected: string | null;
  external_message_id: string | null;
  is_read: boolean;
  delivered_at: string | null;
  read_at: string | null;
  created_at: string;
}

// ─── Automation ───────────────────────────────────────────────────────────────

export interface Automation {
  id: string;
  org_id: string;
  name: string;
  description: string | null;
  trigger_type: string;
  trigger_config: Json;
  conditions: Json[];
  actions: Json[];
  is_active: boolean;
  run_count: number;
  last_run_at: string | null;
  created_by: string | null;
  created_at: string;
}

// ─── Campaigns ────────────────────────────────────────────────────────────────

export type CampaignType = "content" | "ads" | "email" | "whatsapp" | "mixed";
export type CampaignGoal = "awareness" | "leads" | "sales" | "engagement" | "traffic";
export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Campaign {
  id: string;
  org_id: string;
  name: string;
  type: CampaignType;
  goal: CampaignGoal;
  status: CampaignStatus;
  platforms: string[];
  budget: number;
  budget_spent: number;
  target_audience: Json;
  ai_strategy: string | null;
  start_date: string | null;
  end_date: string | null;
  performance: Json;
  created_by: string | null;
  created_at: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsSnapshot {
  id: string;
  org_id: string;
  snapshot_date: string;
  platform: string;
  posts_published: number;
  total_reach: number;
  total_impressions: number;
  total_engagement: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_saves: number;
  new_followers: number;
  leads_generated: number;
  leads_converted: number;
  conversations_started: number;
  revenue_attributed: number;
  cost_per_lead: number | null;
  conversion_rate: number | null;
  raw_data: Json;
  created_at: string;
}

