interface AuthorAvatarProps {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function AuthorAvatar({ name, color, size = "sm" }: AuthorAvatarProps) {
  const parts = name.trim().split(/\s+/);
  const initials = (
    (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
  ).toUpperCase();

  const sizeClasses: Record<NonNullable<AuthorAvatarProps["size"]>, string> = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-16 w-16 text-xl",
    xl: "h-24 w-24 text-3xl",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}
