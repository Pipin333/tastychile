/**
 * Official 52 comunas of the Región Metropolitana de Santiago in canonical spelling.
 */
export const COMUNAS_RM = [
  "Alhué",
  "Buin",
  "Calera de Tango",
  "Cerrillos",
  "Cerro Navia",
  "Colina",
  "Conchalí",
  "Curacaví",
  "El Bosque",
  "El Monte",
  "Estación Central",
  "Huechuraba",
  "Independencia",
  "Isla de Maipo",
  "La Cisterna",
  "La Florida",
  "La Granja",
  "La Pintana",
  "La Reina",
  "Lampa",
  "Las Condes",
  "Lo Barnechea",
  "Lo Espejo",
  "Lo Prado",
  "Macul",
  "Maipú",
  "María Pinto",
  "Melipilla",
  "Ñuñoa",
  "Padre Hurtado",
  "Paine",
  "Pedro Aguirre Cerda",
  "Peñaflor",
  "Peñalolén",
  "Pirque",
  "Providencia",
  "Pudahuel",
  "Puente Alto",
  "Quilicura",
  "Quinta Normal",
  "Recoleta",
  "Renca",
  "San Bernardo",
  "San Joaquín",
  "San José de Maipo",
  "San Miguel",
  "San Pedro",
  "San Ramón",
  "Santiago",
  "Talagante",
  "Tiltil",
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

// Common aliases and keyboard typos in Santiago
const COMUNA_ALIASES: Record<string, string> = {
  "santiago centro": "Santiago",
  "stgo": "Santiago",
  "stgo centro": "Santiago",
  "nunoa": "Ñuñoa",
  "nunos": "Ñuñoa",
  "nuñoa": "Ñuñoa",
  "penalolen": "Peñalolén",
  "penaflor": "Peñaflor",
  "estacion central": "Estación Central",
  "maipu": "Maipú",
  "conchali": "Conchalí",
  "curacavi": "Curacaví",
  "alhue": "Alhué",
  "maria pinto": "María Pinto",
  "san joaquin": "San Joaquín",
  "san jose de maipo": "San José de Maipo",
  "san ramon": "San Ramón",
  "til til": "Tiltil",
  "pac": "Pedro Aguirre Cerda",
};

/**
 * Resolves any user variation ("nunoa", "nunos", "ÑUÑOA", "stgo centro")
 * to its single canonical comuna name ("Ñuñoa", "Santiago"), or null if outside RM.
 */
export function normalizeComunaRM(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const key = toLookupKey(raw);
  if (!key) return null;
  return CANONICAL_COMUNA_MAP[key] || COMUNA_ALIASES[key] || null;
}

/**
 * Filters the 52 RM comunas accent-insensitively and alias-aware
 * so searching "nuno", "nunos", "stgo" or "pena" matches "Ñuñoa", "Santiago", "Peñalolén"/"Peñaflor".
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
 * Normalizes street addresses to consistent Title Case and clean punctuation
 * so "AV. PROVIDENCIA   1234,  DEPTO 502" becomes "Av. Providencia 1234, Depto 502".
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
