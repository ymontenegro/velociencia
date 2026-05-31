/**
 * MDX v3 trata `<` como el inicio de un tag JSX. Cuando el texto de un artículo
 * contiene un `<` pegado a una letra o dígito (p. ej. `Z1 (<55% FTP)` o `(<Z2)`),
 * el parser intenta abrir un tag con nombre inválido y la compilación falla con
 * `Unexpected character ... before name`, devolviendo un 500 para toda la página.
 *
 * Esta función escapa esos `<` sueltos a `&lt;` ANTES de compilar, pero solo en el
 * texto markdown. Preserva intacto lo que está dentro de:
 *   - bloques de código vallados (``` ... ```), donde `<` es literal;
 *   - bloques de componentes JSX (`<ChartBar ... />`, etc.), donde `data`/`props`
 *     son JavaScript y un `&lt;` se renderizaría literal en el gráfico.
 *
 * Un `<` seguido de espacio NO se toca: en MDX es texto literal seguro y aparece
 * de forma legítima en notación científica (`p < 0.05`, `< 20 °C`).
 *
 * Es idempotente: un `&lt;` ya existente no contiene `<`, así que no se re-escapa.
 */

/** Una línea que (tras la sangría) abre un componente JSX: `<ChartBar`, `<ProductCard`… */
const JSX_BLOCK_START = /^\s*<[A-Z][A-Za-z]*\b/;
/** Cierre de un bloque JSX en la misma línea: self-closing `/>` o tag de cierre `</…`. */
const JSX_BLOCK_END = /\/>\s*$|<\/[A-Za-z]/;
/** `<` pegado a letra o dígito: el patrón que MDX malinterpreta como apertura de tag. */
const STRAY_LT = /<(?=[A-Za-z0-9])/g;

export function escapeStrayAngleBrackets(source: string): string {
  const lines = source.split("\n");
  let inCodeFence = false;
  let inJsxBlock = false;

  return lines
    .map((line) => {
      const trimmed = line.trimStart();

      // Cercas de código: alternar estado y dejar el contenido sin tocar.
      if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
        inCodeFence = !inCodeFence;
        return line;
      }
      if (inCodeFence) return line;

      // Dentro de un bloque JSX multilínea: preservar (data/props son JS).
      if (inJsxBlock) {
        if (JSX_BLOCK_END.test(line)) inJsxBlock = false;
        return line;
      }

      // ¿Esta línea abre un bloque JSX? Si no se cierra en la misma línea, entrar en modo bloque.
      if (JSX_BLOCK_START.test(line)) {
        if (!JSX_BLOCK_END.test(line)) inJsxBlock = true;
        return line;
      }

      // Texto markdown normal (párrafos, tablas): escapar los `<` sueltos.
      return line.replace(STRAY_LT, "&lt;");
    })
    .join("\n");
}
