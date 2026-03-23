interface AuthorAvatarProps {
  name: string;
  color: string;
  size?: "sm" | "md";
}

export function AuthorAvatar({ name, color, size = "sm" }: AuthorAvatarProps) {
  const parts = name.trim().split(/\s+/);
  const initials = (
    (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
  ).toUpperCase();

  const sizeClasses = size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizeClasses}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}
