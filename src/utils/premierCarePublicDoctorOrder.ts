/** Client-approved display order for www.premiercare.lk (match ERP full names loosely). */
export const PREMIER_CARE_PUBLIC_DOCTOR_ORDER = [
  "hafeeza",
  "nimeera",
  "riyana",
  "haseena",
  "qassim",
  "ashan",
  "harshana",
  "yoshitha",
  "nilukshi",
  "natalie",
  "manishka",
  "vidhya",
  "suranga",
  "jaladini",
  "sharnelle",
  "yusuf",
  "pabasara",
] as const;

const UNLISTED_SORT_BASE = 1000;

function normalizeForMatch(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lower index = earlier on the public doctors page. Unlisted names sort after, A–Z. */
export function premierCarePublicDoctorSortIndex(doctorName: string): number {
  const normalized = normalizeForMatch(doctorName);
  if (!normalized) return UNLISTED_SORT_BASE;

  for (let i = 0; i < PREMIER_CARE_PUBLIC_DOCTOR_ORDER.length; i++) {
    const token = PREMIER_CARE_PUBLIC_DOCTOR_ORDER[i];
    if (normalized.includes(token)) return i;
  }
  return UNLISTED_SORT_BASE + normalized.charCodeAt(0);
}

export function sortPublicDirectoryDoctorsForPremierCare<
  T extends { doctorName: string },
>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    const da = premierCarePublicDoctorSortIndex(a.doctorName);
    const db = premierCarePublicDoctorSortIndex(b.doctorName);
    if (da !== db) return da - db;
    return a.doctorName.localeCompare(b.doctorName, undefined, {
      sensitivity: "base",
    });
  });
}
