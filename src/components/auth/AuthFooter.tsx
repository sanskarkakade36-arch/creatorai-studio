import Link from "next/link";

interface Props {
  question: string;
  linkText: string;
  href: string;
}


export function AuthFooter({
  question,
  linkText,
  href,
}: Props) {
  return (
    <div className="text-center mt-6 text-sm">

      <span className="text-muted-foreground">
        {question}
      </span>

      <Link
        href={href}
        className="ml-2 font-semibold text-primary hover:underline"
      >
        {linkText}
      </Link>

    </div>
  );
}