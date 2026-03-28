export async function GET() {
  const content = "google.com, pub-3852673931467935, DIRECT, f08c47fec0942fa0\n";
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
