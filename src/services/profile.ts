import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}

class ProfileService {
  /**
   * Get the currently logged-in user's profile.
   */
  async getProfile(): Promise<UserProfile | null> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    return data as UserProfile;
  }

  /**
   * Create a profile after registration if it doesn't exist.
   */
  async createProfile(profile: UserProfile) {
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Update profile information.
   */
  async updateProfile(
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    return data as UserProfile;
  }

  /**
   * Upload avatar image.
   */
  async uploadAvatar(file: File) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated.");
    }

    const extension = file.name.split(".").pop();

    const fileName = `${user.id}-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    await this.updateProfile({
      avatar_url: publicUrl,
    });

    return publicUrl;
  }

  /**
   * Remove avatar from profile.
   */
  async removeAvatar() {
    await this.updateProfile({
      avatar_url: null,
    });
  }
}

export const profileService = new ProfileService();