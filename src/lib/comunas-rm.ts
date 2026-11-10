/**
 * Las 35 comunas urbanas del Gran Santiago con cobertura oficial de bicimensajería (Pantera Courier).
 */
export const COMUNAS_RM = [
  "Cerrillos",
  "Cerro Navia",
  "Conchalí",
  "El Bosque",
  "Estación Central",
  "Huechuraba",
  "Independencia",
  "La Cisterna",
  "La Florida",
  "La Granja",
  "La Pintana",
  "La Reina",
  "Las Condes",
  "Lo Barnechea",
  "Lo Espejo",
  "Lo Prado",
  "Macul",
  "Maipú",
  "Ñuñoa",
  "Padre Hurtado",
  "Pedro Aguirre Cerda",
  "Peñalolén",
  "Providencia",
  "Pudahuel",
  "Puente Alto",
  "Quilicura",
  "Quinta Normal",
  "Recoleta",
  "Renca",
  "San Bernardo",
  "San Joaquín",
  "San Miguel",
  "San Ramón",
  "Santiago",
  "Vitacura",
] as const;

/**
 * Strips accents/diacritics (including ñ -> n), punctuation, and lowercases for fuzzy/canonical lookup.
 */
function toLookupKey(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const CANONICAL_COMUNA_MAP: Record<string, string> = {};
for (const comuna of COMUNAS_RM) {
  CANONICAL_COMUNA_MAP[toLookupKey(comuna)] = comuna;
}

// Common aliases and keyboard typos in Santiago urban zone
const COMUNA_ALIASES: Record<string, string> = {
  "santiago centro": "Santiago",
  "stgo": "Santiago",
  "stgo centro": "Santiago",
  "nunoa": "Ñuñoa",
  "nunos": "Ñuñoa",
  "nuñoa": "Ñuñoa",
  "penalolen": "Peñalolén",
  "estacion central": "Estación Central",
  "maipu": "Maipú",
  "conchali": "Conchalí",
  "san joaquin": "San Joaquín",
  "san ramon": "San Ramón",
  "san miguel": "San Miguel",
  "san bernardo": "San Bernardo",
  "puente alto": "Puente Alto",
  "las condes": "Las Condes",
  "la reina": "La Reina",
  "la florida": "La Florida",
  "la cisterna": "La Cisterna",
  "la granja": "La Granja",
  "la pintana": "La Pintana",
  "lo barnechea": "Lo Barnechea",
  "lo prado": "Lo Prado",
  "lo espejo": "Lo Espejo",
  "quinta normal": "Quinta Normal",
  "cerro navia": "Cerro Navia",
  "padre hurtado": "Padre Hurtado",
  "pac": "Pedro Aguirre Cerda",
  "pedro aguirre cerda": "Pedro Aguirre Cerda",
};

/**
 * Detects whether the query/input matches common rural/excluded communes outside Pantera's bike network.
 */
export function isKnownRuralRM(raw: string | undefined | null): boolean {
  if (!raw) return false;
  const key = toLookupKey(raw);
  return (
    key.includes("pirque") ||
    key.includes("maipo") ||
    key.includes("colina") ||
    key.includes("lampa") ||
    key.includes("buin") ||
    key.includes("paine") ||
    key.includes("melipilla") ||
    key.includes("talagante") ||
    key.includes("penaflor") ||
    key.includes("curacavi") ||
    key.includes("tiltil") ||
    key.includes("alhue") ||
    key.includes("calera de tango")
  );
}

/**
 * Resolves any user variation ("nunoa", "stgo", "las condes")
 * to its single canonical comuna name ("Ñuñoa", "Santiago"), or null if outside urban coverage.
 */
export function normalizeComunaRM(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const key = toLookupKey(raw);
  if (!key) return null;
  return CANONICAL_COMUNA_MAP[key] || COMUNA_ALIASES[key] || null;
}

/**
 * Filters the 35 urban Santiago comunas accent-insensitively and alias-aware.
 */
export function filterComunasRM(query: string): string[] {
  const key = toLookupKey(query);
  if (!key) return [...COMUNAS_RM];

  const aliasTarget = COMUNA_ALIASES[key];
  return COMUNAS_RM.filter((comuna) => {
    if (aliasTarget && comuna === aliasTarget) return true;
    return toLookupKey(comuna).includes(key);
  });
}

/**
 * Normalizes street addresses to consistent Title Case and clean punctuation.
 */
export function normalizeStreetAddress(raw: string | undefined | null): string {
  if (!raw) return "";
  const cleaned = raw
    .replace(/[\u0000-\u001F\u007F<>]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .trim()
    .slice(0, 180);

  const lowercaseWords = new Set(["de", "del", "la", "las", "el", "los", "y", "con"]);

  return cleaned
    .split(" ")
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (idx > 0 && lowercaseWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}
