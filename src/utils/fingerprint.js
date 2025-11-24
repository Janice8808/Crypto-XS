import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cachedFp = null;

export async function getBrowserFingerprint() {
  if (cachedFp) return cachedFp;

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  cachedFp = result.visitorId; // 永久不会变
  return cachedFp;
}
