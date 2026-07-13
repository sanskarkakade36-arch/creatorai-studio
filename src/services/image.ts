import { supabase } from "@/lib/supabase";

export interface GenerateImageRequest {
  prompt: string;
  style: string;
  aspectRatio: string;
  quality: string;
}

class ImageService {
  /**
   * Generate AI Image
   */
  async generateImage(data: GenerateImageRequest) {
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Failed to generate image."
      );
    }

    return response.json();
  }

  /**
   * Save Image Metadata
   */
  async saveImage(data: {
    prompt: string;
    imageUrl: string;
    style: string;
    aspectRatio: string;
    quality: string;
  }) {
    const {
      data: sessionData,
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError || !sessionData.user) {
      throw new Error("User not authenticated.");
    }

    const { error } = await supabase
      .from("generated_images")
      .insert({
        user_id: sessionData.user.id,
        prompt: data.prompt,
        image_url: data.imageUrl,
        style: data.style,
        aspect_ratio: data.aspectRatio,
        quality: data.quality,
      });

    if (error) {
      throw error;
    }

    return true;
  }

  /**
   * Fetch User Images
   */
  async getUserImages() {
    const {
      data: sessionData,
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError || !sessionData.user) {
      throw new Error("User not authenticated.");
    }

    const { data, error } = await supabase
      .from("generated_images")
      .select("*")
      .eq("user_id", sessionData.user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Delete Image
   */
  async deleteImage(id: string) {
    const { error } = await supabase
      .from("generated_images")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  }
}

export const imageService = new ImageService();