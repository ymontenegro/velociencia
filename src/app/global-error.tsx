"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isEnglish = typeof window !== "undefined" && window.location.hostname.includes("pedalsci");

  return (
    <html lang={isEnglish ? "en" : "es"}>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>{isEnglish ? "Something went wrong" : "Algo salió mal"}</h2>
          <button onClick={() => reset()} style={{ marginTop: "1rem" }}>
            {isEnglish ? "Try again" : "Intentar de nuevo"}
          </button>
        </div>
      </body>
    </html>
  );
}
