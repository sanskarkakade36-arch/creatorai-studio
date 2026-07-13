"use client";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const labels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ];

  return (
    <div className="space-y-2">

      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

        <div
          className="h-full bg-violet-600 transition-all duration-300"
          style={{
            width: `${score * 20}%`,
          }}
        />

      </div>

      <p className="text-sm text-muted-foreground">
        Password Strength:
        <span className="font-medium ml-2">
          {labels[score]}
        </span>
      </p>

    </div>
  );
}