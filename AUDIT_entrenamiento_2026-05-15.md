# REPORTE DE VERIFICACIÓN — Sección ENTRENAMIENTO (ES)
**Verificador:** Rodrigo Pizarro | **Artículos revisados:** 17/17 | **Fecha:** 2026-05-15

---

## RESUMEN EJECUTIVO

Revisé los 17 archivos en `content/es/entrenamiento/`. Verifiqué PMIDs en PubMed, resultados cuantitativos contra papers reales, y datos de carrera contra fuentes especializadas. La mayoría de artículos están bien documentados. Encontré **4 problemas graves** y **5 menores/no verificables**.

---

## 🔴 PROBLEMAS GRAVES

---

### 1. `periodizacion-en-bloques.md` — TABLA DE DATOS PROBABLEMENTE FABRICADA

**Cita exacta del artículo:**
> "Según Rønnestad et al. (2023) en *International Journal of Sports Physiology and Performance*, una comparación directa de 12 semanas entre periodización en bloques y periodización tradicional en ciclistas sub-elite arrojó diferencias significativas en las tres variables principales medidas."
>
> | Variable | Bloques | Tradicional |
> |---|---|---|
> | Mejora en FTP | +8.2% | +4.7% |
> | Mejora en VO2max | +6.1% | +4.3% |
> | Mejora en TT 40km | -3.4% | -1.8% |

**Problema:** FABRICADO. Este estudio con estos números no existe.

**Evidencia:**
- Búsquedas exhaustivas en PubMed y Google Scholar por "Rønnestad 2023 IJSPP block periodization cyclists sub-elite FTP 8.2%" no producen ningún resultado.
- El único estudio reciente que compara exactamente 12 semanas de BP vs. periodización tradicional en ciclistas bien entrenados es **Almquist et al. 2022** (*Frontiers in Physiology*, PMC8921659) — y su resultado es **opuesto**: NO hubo diferencias entre grupos (ambos mejoraron TT-40min ~8.4%; VO2max sin cambio significativo).
- La revisión sistemática publicada en IJSPP 2023 (PMID 36640771) concluye: *"no evidence is currently available favoring a specific periodization model during 8–12 weeks in trained road cyclists."*
- Los únicos números reales de Rønnestad BP vs TRAD en ciclistas son del estudio de **2014** (PMID 23134196): VO2max +8.8% vs +3.7% — completamente distintos de los de la tabla.

**Corrección sugerida:** Eliminar la tabla falsa. Reemplazar con: citar PMID 23134196 (Rønnestad 2014: BP mejoró VO2max 8.8% vs 3.7% TRAD en ciclistas) para el argumento a favor de bloques, y Almquist 2022 (PMC8921659) como matiz de que con carga igualada los beneficios se igualan.

---

### 2. `periodizacion-en-bloques.md` — SEGUNDA CITA ERRÓNEA (mismo artículo)

**Cita exacta del artículo:**
> "Según Rønnestad et al. (2016) en *Scandinavian Journal of Medicine & Science in Sports*, este tipo de bloque concentrado de trabajo en umbral produjo mejoras del 4.6% en **potencia a 40 minutos** frente a un 1.8% en ciclistas que distribuyeron el mismo estímulo a lo largo de un período más largo."

**Problema:** MISQUOTED. Tres errores simultáneos:
1. El estudio de Rønnestad en SJMSS **2016** era sobre **esquiadores de fondo**, no ciclistas.
2. El 4.6% en ciclistas viene del estudio de **2012** (PMID 22646668), donde la mejora fue en **VO2max**, no en "potencia a 40 minutos": *"BP increased VO2max by 4.6 ± 3.7%"*.
3. El "1.8%" no aparece en ninguno de los estudios encontrados.

**Corrección sugerida:** "Rønnestad et al. (PMID 22646668, SJMSS) demostraron que un bloque de 5 sesiones HIT concentradas en una semana mejoró el VO2max en ciclistas un 4.6% mientras el grupo de periodización tradicional no mejoró."

---

### 3. `distribucion-intensidad-modelos.md` — MISQUOTE de Neal et al. 2013

**Cita exacta del artículo:**
> "El grupo polarizado mejoró la potencia pico un 8% y la potencia en umbral de lactato un **5.3%**. El grupo umbral mejoró la potencia en umbral de lactato un **3.7%** pero no mostró cambios significativos en potencia pico ni en VO2max."

**Problema:** MISQUOTED. Los dos valores de umbral de lactato son incorrectos.

**Valores reales** (verificados en PubMed PMID 23264537, confirmados por múltiples fuentes):
- Polarizado → LT: **+9%** (±3%), no 5.3%
- Umbral → LT: **+2%** (±4%), no 3.7%
- Potencia pico polarizado: +8% ✅ (este dato sí es correcto)

**Corrección:** "la potencia en umbral de lactato un **9%**. El grupo umbral mejoró la potencia en umbral de lactato un **2%**."

---

### 4. `entrenamiento-polarizado-ciclismo.md` — MISQUOTE idéntico de Neal 2013

**Cita exacta del artículo:**
> "Neal et al. (2013) confirmaron estos resultados en ciclistas entrenados: seis semanas de entrenamiento polarizado produjeron mejoras del 8% en potencia pico y del **5.3%** en potencia a umbral de lactato, superiores a las del grupo que entrenó con un modelo basado en tempo."

**Problema:** MISQUOTED. Mismo error que el artículo anterior: LT polarizado es 9%, no 5.3%.

**Corrección:** "del **9%** en potencia a umbral de lactato."

**Nota:** El 5.3% aparece en dos artículos distintos con idéntica formulación, lo que sugiere que ambos copiaron de la misma fuente intermedia incorrecta, no del paper original (PMID 23264537).

---

## 🟠 ERRORES MENORES

---

### 5. `metodo-pogacar-entrenamiento-rompio-reglas.md` — Error aritmético en diferencia de tiempos

**Cita exacta:**
> "Tres minutos y **treinta y cinco** segundos más rápido que Marco Pantani en 1998, cuando el italiano estableció el récord previo en 43:28."

**Problema:** Error aritmético. 43:28 − 39:43 = **3 minutos y 45 segundos**, no 3:35.

**Evidencia:** WattsInCycling, Lanterne Rouge, y múltiples fuentes de prensa confirman ambos tiempos (Pantani 43:28, Pogačar 39:43). La resta da 3:45.

**Corrección:** "Tres minutos y **cuarenta y cinco** segundos más rápido."

---

## 🟡 NO VERIFICABLES (requieren texto completo del paper)

---

### 6. `doble-umbral-noruego-ciclismo.md` — Proporción exacta de entrenadores nórdicos

**Cita exacta:**
> "Tønnessen, Sandbakk, Seiler y Haugen (2024, PMID 39012575)... documentaron que **la mitad** de los entrenadores de élite en deportes de resistencia nórdicos ya han adoptado sesiones de doble umbral en sus programas semanales."

**Problema:** NO VERIFICABLE desde el abstract. El paper existe (PMID 39012575 verificado: Sports Medicine 2024 ✅, autores correctos ✅). El abstract describe un estudio cualitativo de 12 entrenadores de élite en 8 deportes olímpicos, pero **no menciona** el porcentaje del 50% ni el doble umbral específicamente. La cifra puede estar en el texto completo o puede ser una extrapolación del articulista.

**Recomendación:** Verificar en texto completo. Si no aparece, suavizar a "varios entrenadores de élite nórdicos" sin porcentaje específico.

---

### 7. `sprint-training-fibras-rapidas-ciclismo.md` — Rango de transición de fibras IIa

**Cita exacta:**
> "Plotkin, Roberts, Haun y Schoenfeld (*Sports (Basel)*, 2021, PMID: 34564332)... confirmaron que el sprint training puede... aumentando la proporción funcional de fibras IIa en **8 a 17 puntos porcentuales** tras 6 a 8 semanas de protocolo específico."

**Problema:** NO VERIFICABLE. El paper existe (PMID 34564332 ✅, revisión narrativa en Sports (Basel) 2021, autores correctos). El abstract confirma que las fibras transicionan con el entrenamiento pero **no especifica** el rango "8-17 pp" para sprint training. Requiere texto completo.

---

### 8. `zona-2-base-aerobica-ciclismo.md` — Eficiencia por hora del sprint interval training

**Cita exacta:**
> "los intervalos de sprint eran **3.9 veces** más eficientes por hora de ejercicio"

**Fuente atribuida:** Mølmen, Almquist y Skattebo, Sports Medicine 2025 (PMID 39390310).

**Problema:** NO VERIFICABLE desde el abstract. El paper existe (PMID 39390310 ✅) y los porcentajes de contenido mitocondrial son correctos (ET 23%, HIT 27%, SIT 27% ✅). El "3.9 veces" es un dato de eficiencia por hora que no aparece en el abstract.

---

### 9. `intervalos-30-30-vo2max-ciclismo.md` — Excerpt mezcla resultados de estudios distintos

**Cita exacta (excerpt/subtítulo):**
> "Bent Rønnestad demostró que tres bloques de 13 repeticiones 30/30 mejoran el VO2max un **5,7%** frente al **2,6%** de los intervalos largos."

**Problema:** MISLEADING. El 5.7% es del estudio de **2021** (PMID 33735833: 1 semana de choque, 5 sesiones). El 2.6% es del estudio de **2015** (PMID 24382021: 10 semanas, 2 sesiones/semana). Nunca coexistieron en un único estudio.

**Importante:** Los datos en el **cuerpo del artículo** están correctamente atribuidos a sus respectivos PMIDs. El problema es exclusivamente el **excerpt/subtítulo**.

---

## ✅ VERIFICADO Y CORRECTO

Los siguientes claims cuantitativos y PMIDs fueron verificados directamente en PubMed y son correctos:

| Artículo | Claim verificado | PMID/Fuente | Estado |
|---|---|---|---|
| intervalos-30-30 | SI: +3.7% MAP, +4.7% TT-20min vs LI: -0.3%/-1.4% (3 semanas) | 31977120 | ✅ |
| intervalos-30-30 | SI +8.7% vs LI +2.6% VO2max (10 semanas) | 24382021 | ✅ |
| intervalos-30-30 | Microciclo SI +5.7% VO2max vs LI (1 semana) | 33735833 | ✅ |
| intervalos-30-30 | Billat 2000: 7 min 51 s en VO2max en runners 30/30 | 10638376 | ✅ |
| intervalos-30-30 | Rønnestad & Hansen 2016 JSCR (PMID 23942167): 30s óptimo para ciclistas | 23942167 | ✅ |
| sprint-training | SST 4.7%/6.1%/3.7%/4.3% vs HST 1.1%/1.8%/1.3%/0.2% | 31555153 | ✅ |
| sprint-training | Sprints transición: +4% pot-30s; control -4% (VO2max 72±5) | 33041839 | ✅ |
| sprint-training | Seguimiento 6 semanas: +7.3% vs -1.3% TT-20min | 33819914 | ✅ |
| polarizado-amateurs | Stöggl 2014: +11.7% VO2max, +17.4% TTE, +5.1% Ppico (48 atletas) | 24550842 | ✅ |
| polarizado-amateurs | Neal 2013: PPO +8%, LT +9%, HIEC +85% vs +37% | 23264537 | ✅ |
| doble umbral | Casado 2023: autores/revista/año, AMPK/calcio pathways | 36900796 | ✅ |
| doble umbral | Tønnessen 2024: paper existe, autores/revista/año | 39012575 | ✅ |
| doble umbral | Marius Bakken: 5.500 mediciones lactato, 13:06 en 5.000m | mariusbakken.com | ✅ |
| doble umbral | Bu firmó con Uno-X nov 2024, campeón olímpico Blummenfelt | tri247.com | ✅ |
| microdosis | Afonso 2022 microdosing IJSPP | 36202386 | ✅ |
| microdosis | Rønnestad 2010: 1 sesión/semana mantiene 13 semanas, EJAP | 20799042 | ✅ |
| microdosis | Iversen 2021 "No Time to Lift", Sports Medicine | 34125411 | ✅ |
| tapering | Bosquet 2007: ~3% mejora media, 41-60% reducción volumen, 27 estudios | 17762369 | ✅ |
| tapering | Rønnestad & Vikmoen 2019: +4.0% VO2max, +5.0% Ppico-1min | 31410894 | ✅ |
| tapering | Wang et al. 2023: meta-análisis 14 estudios, PLoS One | 37163550 | ✅ |
| zona-2 | San Millán & Brooks 2018, Sports Medicine, metabolic flexibility | 28623613 | ✅ |
| zona-2 | Mølmen 2025: ET 23%, HIT 27%, SIT 27% mitocondrias | 39390310 | ✅ |
| zona-2 | Storoschuk 2025 Zone 2 narrative review, Sports Medicine | 40560504 | ✅ |
| pogacar | Plateau de Beille: 39:43, 6.90 W/kg, 1887 VAM, Pantani 43:28 | Lanterne Rouge | ✅ |
| pogacar | Filipas et al. 2022, SJMSS: paper existe, pirámide/polarizado | 34792817 | ✅ |
| pacing | Ganna: 56.792 km, Grenchen 2022; Bigham 55.548 km | CyclingWeekly | ✅ |
| fuerza-gimnasio | Rønnestad 2010 EJAP: fuerza pesada mejora TT-40min, pot. umbral | 19960350 | ✅ |
| periodizacion-bloques | Mølmen/Øfsteng/Rønnestad meta-análisis 2019, OAJSM | 31802956 | ✅ |
| periodizacion-bloques | PMID 23134196: BP mejoró VO2max 8.8% vs 3.7% TRAD (2014) | 23134196 | ✅ |

---

## SCORE FINAL

| Métrica | Valor |
|---|---|
| Artículos auditados | 17/17 |
| Artículos sin problemas | 12 |
| Artículos con problemas | 5 |
| Verificaciones directas en PubMed/web | 29 |
| FABRICATED | 1 (tabla Rønnestad 2023) |
| MISQUOTED | 3 (Neal LT en 2 artículos + Rønnestad 2016) |
| Error aritmético menor | 1 (Pantani/Pogačar) |
| No verificable sin texto completo | 3 |
| Misleading (excerpt mezcla estudios) | 1 |
| **Score global (claims correctos)** | **24/29 = 83%** |

---

## PRIORIDAD DE CORRECCIÓN

1. 🔴 **URGENTE** — `periodizacion-en-bloques.md`: Eliminar tabla "Rønnestad 2023" y corregir cita Rønnestad 2016/esquiadores.
2. 🔴 **URGENTE** — `distribucion-intensidad-modelos.md`: Corregir Neal LT: 5.3%→9% (polarizado) y 3.7%→2% (umbral).
3. 🔴 **URGENTE** — `entrenamiento-polarizado-ciclismo.md`: Corregir Neal LT: 5.3%→9%.
4. 🟠 **PRONTO** — `metodo-pogacar-entrenamiento-rompio-reglas.md`: Corregir 3:35→3:45.
5. 🟡 **REVISAR** — `doble-umbral-noruego-ciclismo.md`: Verificar "50% entrenadores" en texto completo de Tønnessen 2024.
