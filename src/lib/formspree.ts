const FORMSPREE_URL = "https://formspree.io/f/xljdevyk";

export async function sendToFormspree(data: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
