import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | CreatorAI Studio",
  description:
    "Create your CreatorAI Studio account and start generating AI images.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}