export const EDITORIAL_GUIDELINES = `## Directrices Editoriales - Velociencia

### Identidad Editorial
Velociencia es una revista digital de ciclismo con estándares de publicaciones como Cyclist, Wired o Bicycling. Cada artículo debe leerse como una pieza de periodismo deportivo de calidad, no como contenido generado por IA.

### Estándares de Calidad

#### 1. Precisión Factual
- Todas las afirmaciones deben estar respaldadas por fuentes verificables
- Los datos numéricos (estadísticas, porcentajes, rangos) deben incluir su fuente
- Distinguir claramente entre evidencia sólida (meta-análisis, ensayos clínicos randomizados) y evidencia preliminar (estudios piloto, estudios observacionales)
- Los estudios deben ser citados con autores y año
- Evitar generalizaciones absolutas sin evidencia suficiente
- ALERTA: Cifras demasiado redondas o convenientes (exactamente 50%, exactamente 3x) son sospechosas de ser inventadas

#### 2. Requisitos de Fact-Checking
- Verificar que los estudios citados existan y digan lo que se afirma
- Comprobar que las dosificaciones de suplementos sean seguras y basadas en evidencia
- Verificar que las recomendaciones de entrenamiento sean seguras y apropiadas
- Confirmar que los datos fisiológicos citados estén dentro de rangos aceptados
- Detectar afirmaciones potencialmente peligrosas para la salud
- Si un nombre de autor + año + publicación no parece verificable, marcarlo como sospechoso

#### 3. Guía de Estilo — ESCRITURA EN PÁRRAFOS

**REGLA FUNDAMENTAL: Todo el contenido debe estar en párrafos de prosa continua.**

- **Formato obligatorio**: Párrafos de 3-5 oraciones. NUNCA listas con viñetas ni bullet points en el cuerpo del artículo
- **Única excepción**: Tablas Markdown para datos comparativos (dosis, programas, comparaciones)
- **Primer oración**: Cada párrafo debe abrir con un dato, cifra o hallazgo concreto (hook informativo)
- **Subtítulos**: Deben ser específicos e informativos, no genéricos ("El impacto de la cafeína en esfuerzos de 30s" vs "Beneficios")
- **Idioma**: Español neutro, accesible internacionalmente
- **Tono**: Periodístico directo — profesional, informativo, nunca condescendiente ni sensacionalista
- **Extensión**: 1000-2500 palabras por artículo
- **Conclusiones**: En párrafos con recomendaciones prácticas, NUNCA en formato lista
- **Sin clickbait**: Títulos descriptivos y honestos
- **Sin marcas**: Evitar mencionar productos o marcas específicas a menos que sea esencial

#### 4. Detección de Lenguaje IA/ChatGPT

**RECHAZAR o PENALIZAR artículos que contengan:**
- Frases de relleno: "es importante destacar", "cabe mencionar", "sin duda alguna", "es fundamental", "vale la pena señalar", "en este sentido", "como hemos visto", "no podemos olvidar", "es crucial tener en cuenta", "en definitiva"
- Adjetivos vacíos: "increíble", "fascinante", "sorprendente", "revolucionario", "impresionante", "excepcional"
- Transiciones genéricas: "por otro lado", "en relación a lo anterior", "continuando con el tema"
- Párrafos que empiezan con "Es importante..." o "Cabe destacar..."
- Tono de asistente: "te recomendamos", "esperamos que este artículo te haya sido útil"

**Regla**: Si se detectan más de 2 instancias de lenguaje ChatGPT, la puntuación de calidad de escritura NO puede superar 6/10.

#### 5. Rúbrica de Puntuación

**Precisión (0-10, peso 40%)**
- 9-10: Todas las afirmaciones citadas con autor, año y publicación; evidencia de alta calidad
- 7-8: Mayoría de afirmaciones citadas; sin errores factuales; fuentes identificables
- 5-6: Algunas afirmaciones sin citar; fuentes vagas; errores menores
- 3-4: Múltiples afirmaciones sin respaldo; datos sospechosos
- 0-2: Información incorrecta, inventada o engañosa

**Calidad de Escritura (0-10, peso 30%)**
- 9-10: Prosa editorial de revista; párrafos bien construidos; cero listas; sin lenguaje IA; subtítulos específicos
- 7-8: Buena prosa; estructura en párrafos; mínimo lenguaje genérico; flujo lógico
- 5-6: Aceptable pero con listas ocasionales, lenguaje ChatGPT detectado, o párrafos demasiado largos/cortos
- 3-4: Uso extensivo de listas; lenguaje de IA prevalente; estructura confusa
- 0-2: Claramente output de chatbot; listas dominan; sin voz editorial

**Engagement (0-10, peso 20%)**
- 9-10: El lector no puede parar; datos que sorprenden; conclusiones aplicables inmediatamente
- 7-8: Interesante; buenos datos; aplicaciones prácticas claras
- 5-6: Correcto pero plano; le falta gancho; datos genéricos
- 3-4: Aburrido; sin datos que sorprendan; falta conexión con el lector
- 0-2: No atractivo; sin valor práctico; genérico

**SEO (0-10, peso 10%)**
- 9-10: Título, meta descripción y encabezados perfectamente optimizados
- 7-8: Buena optimización; palabras clave bien integradas
- 5-6: Optimización básica; podría mejorar
- 3-4: Poca consideración SEO
- 0-2: Sin optimización SEO

#### 6. Verificación de Fuentes

**Cada fuente citada en el artículo debe ser verificada:**
- Verificar que el nombre del autor, año y publicación correspondan a un estudio real
- Las URLs de fuentes deben ser accesibles y corresponder al contenido referenciado
- Marcar como "suspicious" cualquier fuente que parezca inventada o cuya combinación autor+año+publicación no sea verificable
- Marcar como "broken_url" cualquier URL que no funcione o que apunte a contenido diferente
- Si más del 30% de las fuentes son sospechosas o no verificables, el artículo debe ser RECHAZADO

#### 7. Derechos de Autor y Originalidad

**El contenido debe ser original:**
- El artículo debe estar escrito con palabras propias, usando las fuentes como referencia
- PROHIBIDO copiar párrafos textuales de las fuentes (plagiar)
- Parafrasear está permitido siempre que se cite la fuente y el lenguaje sea suficientemente diferente
- Si se detecta un párrafo que parece copiado textualmente, marcarlo como problema crítico de copyright
- Las citas directas (entre comillas) están permitidas cuando son breves y se atribuyen correctamente

#### 8. Sugerencias de Imágenes

**Todo artículo aprobado debe incluir sugerencias de imágenes:**
- Sugerir al menos 2-3 imágenes de bancos gratuitos (Unsplash, Pexels, Pixabay)
- Una imagen de portada (hero) que capture la esencia del artículo
- 1-2 imágenes inline para secciones internas
- Incluir queries de búsqueda específicas que funcionen en estos bancos
- Las imágenes deben ser de alta calidad y relevantes al contenido
- Priorizar imágenes de ciclismo real (no ilustraciones genéricas)

### Reglas de Decisión
- **Puntuación >= 8**: APROBAR para publicación
- **Puntuación 6-7.9**: Solicitar REVISIÓN con correcciones específicas
- **Puntuación < 6**: RECHAZAR con explicación detallada
- **Excepción FACT-CHECK**: Si hay problemas de fact-checking con severidad "critical", RECHAZAR independientemente de la puntuación
- **Excepción FORMATO**: Si el artículo usa listas con viñetas extensivamente en lugar de párrafos, solicitar REVISIÓN como mínimo
- **Excepción LENGUAJE IA**: Si se detectan más de 3 frases estilo ChatGPT, RECHAZAR o solicitar REVISIÓN`;
