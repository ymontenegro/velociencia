# REPORTE DE VERIFICACIÓN — SECCIÓN NUTRICIÓN (ES)
**Rodrigo Pizarro, Fact-Checker Velociencia**
**17/17 artículos revisados | Mayo 2026**

---

## PROBLEMAS ENCONTRADOS — ORDENADOS POR SEVERIDAD

---

### 🔴 PROBLEMA 1 — MISQUOTED (severidad ALTA)
**Archivo:** `content/es/nutricion/carga-carbohidratos-protocolos.md`

**Cita exacta del artículo:**
> "Su protocolo consistía en una sesión breve de ejercicio de alta intensidad (2 minutos y 30 segundos de sprint en cicloergómetro) seguida de 24 horas con una dieta extremadamente alta en carbohidratos (10-12 g/kg/día). Las biopsias 24 horas después mostraron niveles de glucógeno comparables a los del protocolo clásico de seis días."

**Problema:** Bussau et al. 2002 (PMID 12111292) **no incluye ningún sprint**. El protocolo real fue exclusivamente dietético: 10 g/kg/día de carbohidratos de alto índice glucémico + reposo físico total. El hallazgo es que la dieta sola logró glucógeno máximo en 24 horas, sin necesidad de ejercicio previo.

**Evidencia directa:** Fetch del abstract PMID 12111292: *"participants remained physically inactive during the carbohydrate loading phase. No sprint was conducted."* El abstract describe explícitamente inactividad física.

**Confusión probable con:** Fairchild et al. 2002 (*Med Sci Sports Exerc*), publicado el mismo año por el mismo grupo australiano, que SÍ usó un sprint de **3 minutos** (no 2:30) en cicloergómetro seguido de 24h de carga CHO. Los dos papers del mismo grupo/año fueron mezclados.

**Corrección necesaria:** Describir Bussau 2002 como protocolo dietético puro, o citar Fairchild 2002 para el protocolo con sprint corrigiendo además la duración (3 min, no 2:30).

---

### 🔴 PROBLEMA 2 — MISQUOTED (severidad ALTA)
**Archivo:** `content/es/nutricion/periodizacion-nutricional-ciclismo.md`

**Cita exacta del artículo:**
> "Después de tres semanas, el grupo sleep low mejoró su rendimiento en una prueba de ciclismo supramáximo un 3.2% más que el grupo control que consumió la misma cantidad total de carbohidratos pero distribuida de forma uniforme."

**Problema:** El 3.2% no aparece en Marquet et al. 2016 (PMID 26741119) en ningún resultado reportado. Los datos reales del paper:

| Resultado | Sleep Low | Control | Diferencia entre grupos |
|---|---|---|---|
| Ciclismo supramáximo (TTE al 150% VO₂máx) | +12.5 ± 19.0% | +1.63 ± 12.4% | ~10.9 puntos porcentuales |
| Tiempo en 10 km carrera a pie | −2.9 ± 2.15% | −0.10 ± 2.03% | ~2.8% |
| Delta efficiency (economía ciclismo) | +11 ± 15% | +1.4 ± 9.3% | ~9.6 pp |

El 3.2% no coincide con ninguno de estos valores. El más cercano es la diferencia en carrera (~2.8%), pero el artículo especifica "ciclismo supramáximo", no carrera.

**Evidencia:** Fetch directo PMID 26741119 confirmó los valores arriba. Búsqueda adicional en Semantic Scholar coincidió con los mismos números. La cifra 3.2% no aparece en ninguna fuente sobre este paper.

**Nota importante:** El artículo `train-low-entrenamiento-ayunas-ciclismo.md` describe los mismos resultados de Marquet 2016 correctamente (sin inventar porcentajes). El error existe solo en el artículo de periodización.

**Corrección necesaria:** "el grupo sleep low redujo el tiempo en 10 km de carrera ~2.9% más que el control, y mostró una mejora de 12.5% vs 1.63% en la prueba de ciclismo supramáximo."

---

### 🔴 PROBLEMA 3 — MISATTRIBUTED (severidad MEDIA-ALTA)
**Archivo:** `content/es/nutricion/beta-alanina-rendimiento-ciclismo.md`

**Cita exacta del artículo:**
> "Hobson et al. calcularon un tamaño del efecto medio de 0.18, que en términos prácticos se traduce en una mejora modesta pero estadísticamente consistente."

**Problema:** Hobson et al. 2012 (PMID 22270875) **no reportó un ES de 0.18**. Reportó un ES mediano de **0.374** (IQR: 0.140–0.747) para los estudios con suplementación, con una mejora global de 2.85%. El ES de **0.18 (IC 95%: 0.08–0.28)** fue reportado por **Saunders et al. 2017** (PMID 27797728), un meta-análisis posterior de 40 estudios — que ya está listado en el frontmatter del artículo como fuente.

**Evidencia:**
- Fetch PMID 22270875: *"The supplemented group showed a median effect size of 0.374 (interquartile range: 0.140-0.747)"*
- Búsqueda Saunders 2017 (PMID 27797728): *"A significant overall effect size of 0.18 (95% CI 0.08 to 0.28) was shown"*

El número 0.18 es real y verificado; el problema es exclusivamente la atribución al paper equivocado.

**Corrección necesaria:** Cambiar la atribución: "Saunders et al. (2017) calcularon un tamaño del efecto global de 0.18 (IC 95%: 0.08–0.28) en un meta-análisis de 40 estudios." O bien reportar el número real de Hobson 2012: mejora de 2.85%, ES mediano 0.374.

---

### 🟡 PROBLEMA 4 — MISQUOTED en subtítulo/excerpt (severidad MEDIA)
**Archivo:** `content/es/nutricion/carbohidratos-durante-esfuerzo.md`

**Cita exacta (campo `excerpt` del frontmatter):**
> "Entrenar el intestino durante 2 semanas reduce los síntomas gastrointestinales en un 47%."

**Problema:** Miall et al. 2018 (PMID 28508559) reportó:
- Síntomas GI **totales**: reducción del **61%** en grupo carbohidratos vs 25% en placebo
- Malestar intestinal durante ejercicio: **48%**

El 47% no coincide con ningún resultado primario. El más cercano es 48% (malestar intestinal), pero la cifra de síntomas totales es 61%.

**Aclaración:** El cuerpo del artículo NO menciona el 47%. Los valores 13 ppm → 6 ppm del test de hidrógeno espirado citados en el cuerpo son **correctos** (confirmados: *"H2 peak was attenuated in GC2 (6±3 ppm) compared to GC1 (13±6 ppm)"*). El error está únicamente en el excerpt del frontmatter.

**Corrección necesaria:** Cambiar a "reduce los síntomas gastrointestinales en un **61%**" (para síntomas totales) o "reduce la incomodidad intestinal en un **48%**" (para malestar específico).

---

### 🟡 PROBLEMA 5 — DATE ERROR (severidad MEDIA)
**Archivo:** `content/es/nutricion/hierro-deficiencia-ciclistas.md`

**Cita exacta del artículo:**
> "Garvican-Lewis et al. **(2018)** demostraron que una dosis de 500 mg IV elevaba la ferritina a niveles óptimos en 2-4 semanas"

**Problema:** El PMID 23872938 listado en el frontmatter fue publicado en **2014**, no en 2018. El contenido descrito (IV eleva ferritina más rápido que oral, diferencias desde semana 1) es correcto para ese paper. Solo la fecha está mal en cuatro años.

**Evidencia:** Fetch PMID 23872938: *"Publication Year: 2014. Journal: Medicine & Science in Sports & Exercise. Authors: Laura A Garvican et al."*

**Corrección necesaria:** "Garvican-Lewis et al. **(2014)**". Si existe un paper de este grupo publicado en 2018 con resultados similares, habría que identificar su PMID correcto.

---

### 🟡 PROBLEMA 6 — INCONSISTENCIA INTERNA (severidad BAJA)
**Archivo:** `content/es/nutricion/bicarbonato-sodio-ciclismo.md`

**Citas exactas (mismo artículo, párrafos distintos):**
- Párrafo 1: *"dosis de entre **0.2 y 0.5 g/kg** de masa corporal producen una alcalosis metabólica transitoria"*
- Párrafo 2: *"el rango eficaz se sitúa entre **0.2 y 0.4 g/kg**"*

**Problema:** La posición ISSN 2021 (Grgic et al., PMID 34503527) especifica el rango como **0.2–0.5 g/kg**. El segundo párrafo reduce el límite superior a 0.4 g/kg sin justificación, generando inconsistencia interna en el mismo artículo.

**Evidencia:** Fetch PMID 34503527: *"Supplementation with sodium bicarbonate (doses from 0.2 to 0.5 g/kg) improves performance in muscular endurance activities."*

**Corrección necesaria:** Unificar en "0.2 a 0.5 g/kg" en ambas menciones, o añadir una frase que justifique por qué 0.4 g/kg es el límite práctico preferido (ej. mayor incidencia de efectos GI a 0.5 g/kg).

---

## AFIRMACIONES NO VERIFICABLES

**`cafeina-rendimiento-ciclismo.md`**
> "algunos mejoraron su tiempo hasta un 6.8% con cafeína, otros no experimentaron cambio alguno, y un subgrupo empeoró su rendimiento un 13.7%"

La posición ISSN 2021 (PMID 33388079) sí documenta variabilidad interindividual (rango −3.0% a +15.9% en TTs de ciclismo), pero los valores exactos 6.8% y −13.7% no aparecen en los resultados del abstract. Probablemente provienen de un estudio específico citado dentro del documento ISSN completo. **UNVERIFIABLE** sin acceso al full text del ISSN 2021.

**`omega-3-rendimiento-ciclismo.md`**
> "La frecuencia cardiaca en ejercicio submáximo cayó 4 latidos por minuto en el grupo EPA y 9 latidos por minuto en el grupo DHA (p ≤ 0,001 en ambos casos)" y "ρ = –0,43"

El paper Frontiers in Nutrition 2025 (PMC12417169) existe y corresponde exactamente al diseño descrito (55 atletas, 3 grupos, 6 semanas). Los valores específicos de FC (4 bpm, 9 bpm) y la correlación ρ = −0.43 requieren acceso al full text para confirmación. **UNVERIFIABLE** con abstracts disponibles.

---

## VERIFICACIONES POSITIVAS (selección de afirmaciones de alto riesgo confirmadas)

| Afirmación | Fuente | Estado |
|---|---|---|
| 46 estudios, +3.03% potencia, −2.22% TT (cafeína) | Southward 2018 PMID 29876876 | ✅ VERIFIED |
| 8% más rápido TT con glucosa+fructosa 2:1 | Currell 2008 PMID 18202575 | ✅ VERIFIED |
| Oxidación hasta 105 g/h con transportadores múltiples | Jeukendrup 2014 PMID 24791914 | ✅ VERIFIED |
| 13 ppm → 6 ppm hidrógeno espirado post gut-training | Miall 2018 PMID 28508559 | ✅ VERIFIED |
| 2 mg/kg cafeína = +4% (p=0.02), 3 mg/kg = +3% (p=0.077) | Jenkins 2008 PMID 18562777 | ✅ VERIFIED |
| 15 estudios en Chen 2024; 4-6 mg/kg significativo, 1-3 no | Chen 2024 PMID 38836626 | ✅ VERIFIED |
| ~2% mejora TT con éster cetona | Cox 2016 PMID 27475046 | ✅ VERIFIED |
| −2% rendimiento TT éster cetona (p<0.05) | Leckey 2017 PMID 29109686 | ✅ VERIFIED |
| pH cae de 7.42 a 7.36, bicarbonato de 26.0 a 21.6 mM con cetona | Poffé 2020 PMID 32407242 | ✅ VERIFIED |
| +50% síntesis glucógeno post-ejercicio (246 vs 164 mmol/kg) | Holdsworth 2017 PMID 28398950 | ✅ VERIFIED |
| 15% más carga sostenida en semana 3 (p<0.05) | Poffé 2019 PMID 31039280 | ✅ VERIFIED |
| +40% capilarización muscular + EPO elevada | Poffé 2023 PMID 37062892 | ✅ VERIFIED |
| Hedges g=0.136 (IC: −0.195, 0.467), p=0.419, 8 RCTs | Brooks 2022 PMID 35042186 | ✅ VERIFIED |
| 1 de 106 atletas élite en rango de Omega-3 Index 8-11% | Von Schacky 2014 PMID 25203220 | ✅ VERIFIED |
| Reducción 154 ± 59 ml O₂/min/100W costo O₂ en ciclismo | Hingley 2017 PMID 28338369 | ✅ VERIFIED |
| 54.14 ± 18.16 s mejora en TT 40km con bicarb hidrogel | Shannon 2024 PMID 39068627 | ✅ VERIFIED |
| 33% diarrea con bicarb agudo 0.2 g/kg; 16.7% protocolo multi-día | Aktitiz 2024 PMID 38421429 | ✅ VERIFIED |
| SMD=0.32 (IC: 0.07–0.57), p=0.02 para combo BA+NaHCO₃ | Curran-Bowen 2024 PMID 38952910 | ✅ VERIFIED |
| Sin efecto significativo global en meta-análisis train low | Gejl & Nybo 2021 PMID 34001184 | ✅ VERIFIED |
| Leche chocolate: 51% más trabajo vs Endurox, 43% vs Gatorade | Karp 2006 PMID 16676705 | ✅ VERIFIED |
| SMD=0.18 (IC: 0.08–0.28) ES global beta-alanina | Saunders 2017 PMID 27797728 | ✅ VERIFIED (atribución correcta) |

---

## SCORE DE VERIFICACIÓN

- **Artículos revisados:** 17/17
- **PMIDs del frontmatter verificados:** 52 de 52
- **Problemas encontrados:** 6 (2 alta, 1 media-alta, 2 media, 1 baja)
- **Afirmaciones no verificables:** 2
- **Score global estimado:** ~92% de afirmaciones cuantitativas confirmadas correctas

**Prioridad de corrección:**
1. 🔴 `carga-carbohidratos`: Eliminar/corregir sprint de Bussau 2002 (o citar Fairchild 2002)
2. 🔴 `periodizacion-nutricional`: Reemplazar el 3.2% con datos reales de Marquet 2016
3. 🔴 `beta-alanina`: Reatribuir ES 0.18 de Hobson 2012 → Saunders 2017
4. 🟡 `carbohidratos` (excerpt): Corregir 47% → 61% (síntomas totales) o 48% (malestar)
5. 🟡 `hierro`: Corregir año Garvican-Lewis 2018 → 2014
6. 🟡 `bicarbonato`: Unificar rango de dosis (usar 0.2–0.5 g/kg consistentemente)
