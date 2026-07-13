"use client";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function TermsCheckbox({
  checked,
  onChange,
}: Props) {
  return (
    <label className="flex items-start gap-3 text-sm">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="mt-1"
      />

      <span>
        I agree to the
        <a
          href="/terms"
          className="text-violet-600 ml-1 hover:underline"
        >
          Terms
        </a>
        {" "}and{" "}
        <a
          href="/privacy"
          className="text-violet-600 hover:underline"
        >
          Privacy Policy
        </a>
      </span>

    </label>
  );
}