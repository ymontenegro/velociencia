# Auditoría sección Entrenamiento

## Resumen
- Artículos revisados: 17 de 17
- Hallazgos críticos: 4
- Hallazgos menores: 5 (1 error aritmético + 3 no verificables + 1 misleading en excerpt)

---

## Hallazgos

### periodizacion-en-bloques.md

**Hallazgo 1 — TABLA DE DATOS FABRICADA**

- **Cita exacta:** "Según Rønnestad et al. (2023) en *International Journal of Sports Physiology and Performance*, una comparación directa de 12 semanas entre periodización en bloques y periodización tradicional en ciclistas sub-elite arrojó diferencias significativas en las tres variables principales medidas. [tabla: Mejora en FTP +8.2% bloques vs +4.7% tradicional; VO2max +6.1% vs +4.3%; TT 40km -3.4% vs -1.8%]"
- **Problema:** Falso. Este estudio no existe o sus números no corresponden a ningún paper publicado.
- **Evidencia:** Búsquedas exhaustivas en PubMed y Google Scholar no encuentran ningún estudio de Rønnestad 2023 en IJSPP con estos valores. El estudio más reciente comparable (Almquist et al. 2022, *Frontiers in Physiology*, PMC8921659) comparó exactamente 12 semanas BP vs. periodización tradicional en ciclistas bien entrenados y encontró **sin diferencias entre grupos** (ambos mejoraron TT-40min ~8.4%; VO2max sin cambio significativo). La revisión sistemática publicada en IJSPP 2023 (PMID 36640771) concluye: "no evidence is currently available favoring a specific periodization model during 8–12 weeks in trained road cyclists." Los únicos números reales de Rønnestad BP vs TRAD en ciclistas son del estudio de 2014 (PMID 23134196): VO2max +8.8% vs +3.7% — completamente distintos.
- **Corrección:** Eliminar la tabla falsa. Para el argumento a favor de bloques citar PMID 23134196 (Rønnestad 2014: BP mejoró VO2max 8.8% vs 3.7% TRAD). Para matizar, citar Almquist 2022 (PMC8921659): con carga igualada no hay diferencias en ciclistas bien entrenados.

---

**Hallazgo 2 — CITA ERRÓNEA (triple error)**

- **Cita exacta:** "Según Rønnestad et al. (2016) en *Scandinavian Journal of Medicine & Science in Sports*, este tipo de bloque concentrado de trabajo en umbral produjo mejoras del 4.6% en potencia a 40 minutos frente a un 1.8% en ciclistas que distribuyeron el mismo estímulo a lo largo de un período más largo."
- **Problema:** Inconsistente / falso. Tres errores simultáneos: (1) año incorrecto, (2) deporte incorrecto, (3) variable incorrecta.
- **Evidencia:** El estudio de Rønnestad en SJMSS **2016** era sobre **esquiadores de fondo** (*"5-week block periodization increases aerobic power in elite cross-country skiers"*), no ciclistas. El 4.6% en ciclistas proviene del estudio de **2012** (PMID 22646668), donde la mejora fue en **VO2max** (no en potencia a 40 minutos): *"BP increased VO2max by 4.6 ± 3.7%; no change in TRAD group."* El "1.8%" no aparece en ninguno de los estudios encontrados.
- **Corrección:** "Rønnestad et al. (2012, PMID 22646668, SJMSS) demostraron que un bloque de 5 sesiones HIT concentradas en una semana mejoró el VO2max en ciclistas un 4.6% mientras el grupo de periodización tradicional no mejoró."

---

### distribucion-intensidad-modelos.md

**Hallazgo 3 — MISQUOTE de Neal et al. 2013**

- **Cita exacta:** "El grupo polarizado mejoró la potencia pico un 8% y la potencia en umbral de lactato un **5.3%**. El grupo umbral mejoró la potencia en umbral de lactato un **3.7%** pero no mostró cambios significativos en potencia pico ni en VO2max."
- **Problema:** Inconsistente con el paper original. Los dos valores de umbral de lactato son incorrectos.
- **Evidencia:** Verificado en PubMed PMID 23264537 (Neal et al. 2013, *Journal of Applied Physiology*) y confirmado por la fuente ResearchGate y dos búsquedas independientes. Valores reales del paper: Polarizado → LT: **+9% (±3%)**, no 5.3%. Umbral → LT: **+2% (±4%)**, no 3.7%. La potencia pico polarizado +8% sí es correcta. El error en LT es de gran magnitud (9% ≠ 5.3%).
- **Corrección:** "la potencia en umbral de lactato un **9%**. El grupo umbral mejoró la potencia en umbral de lactato un **2%**."

---

### entrenamiento-polarizado-ciclismo.md

**Hallazgo 4 — MISQUOTE idéntico de Neal et al. 2013**

- **Cita exacta:** "Neal et al. (2013) confirmaron estos resultados en ciclistas entrenados: seis semanas de entrenamiento polarizado produjeron mejoras del 8% en potencia pico y del **5.3%** en potencia a umbral de lactato, superiores a las del grupo que entrenó con un modelo basado en tempo."
- **Problema:** Inconsistente con el paper original. El LT del grupo polarizado es 9%, no 5.3%.
- **Evidencia:** Idéntico al hallazgo 3 (PMID 23264537). El valor real confirmado es +9% (±3%). El 5.3% aparece en dos artículos con formulación idéntica, lo que sugiere copia de una fuente intermedia incorrecta, no del paper original.
- **Corrección:** "del **9%** en potencia a umbral de lactato."

---

### metodo-pogacar-entrenamiento-rompio-reglas.md

**Hallazgo 5 — ERROR ARITMÉTICO MENOR**

- **Cita exacta:** "Tres minutos y **treinta y cinco** segundos más rápido que Marco Pantani en 1998, cuando el italiano estableció el récord previo en 43:28."
- **Problema:** Error aritmético. 43:28 − 39:43 = 3 minutos y **45** segundos, no 3:35.
- **Evidencia:** WattsInCycling (Twitter/X), Lanterne Rouge, CyclingToday y múltiples fuentes verifican Pantani 43:28 y Pogačar 39:43. La resta: 43:28 − 39:43 = 3:45.
- **Corrección:** "Tres minutos y **cuarenta y cinco** segundos más rápido."

---

### doble-umbral-noruego-ciclismo.md

**Hallazgo 6 — NO VERIFICABLE (dato cuantitativo sin respaldo en abstract)**

- **Cita exacta:** "Tønnessen, Sandbakk, Seiler y Haugen (2024, PMID 39012575)... documentaron que **la mitad** de los entrenadores de élite en deportes de resistencia nórdicos ya han adoptado sesiones de doble umbral en sus programas semanales."
- **Problema:** No verificable. La cifra del 50% no aparece en el abstract del paper.
- **Evidencia:** PMID 39012575 verificado en PubMed: existe, autores correctos, *Sports Medicine* 2024 ✅. El abstract describe un estudio cualitativo de 12 entrenadores de élite en 8 deportes olímpicos nórdicos. El abstract no menciona el porcentaje del 50% ni el doble umbral específicamente. La cifra puede estar en el texto completo o puede ser una extrapolación.
- **Recomendación:** Verificar en texto completo. Si el dato no está, suavizar a "varios entrenadores de élite nórdicos" sin porcentaje.

---

### sprint-training-fibras-rapidas-ciclismo.md

**Hallazgo 7 — NO VERIFICABLE (rango cuantitativo no en abstract)**

- **Cita exacta:** "Plotkin, Roberts, Haun y Schoenfeld (*Sports (Basel)*, 2021, PMID: 34564332)... confirmaron que el sprint training puede revertir parcialmente la tendencia del entrenamiento aeróbico crónico hacia la transición IIx→IIa→I, aumentando la proporción funcional de fibras IIa en **8 a 17 puntos porcentuales** tras 6 a 8 semanas de protocolo específico."
- **Problema:** No verificable. El paper existe y es correcto en autores/revista/año, pero el rango "8-17 puntos porcentuales" no aparece en el abstract.
- **Evidencia:** PMID 34564332 verificado en PubMed: existe, es una revisión narrativa sobre transiciones de fibras musculares con el entrenamiento, autores Plotkin/Roberts/Haun/Schoenfeld, *Sports (Basel)* 2021 ✅. El abstract confirma que las fibras transicionan pero no cuantifica el rango para sprint training específicamente.
- **Recomendación:** Verificar en texto completo. Si el rango no está respaldado, eliminar la cifra o atribuirla a los estudios primarios que la revisión cita.

---

### zona-2-base-aerobica-ciclismo.md

**Hallazgo 8 — NO VERIFICABLE (eficiencia por hora no en abstract)**

- **Cita exacta:** "los intervalos de sprint eran **3.9 veces** más eficientes por hora de ejercicio [que el entrenamiento continuo]"
- **Fuente atribuida:** Mølmen, Almquist y Skattebo, *Sports Medicine* 2025 (PMID 39390310).
- **Problema:** No verificable desde el abstract.
- **Evidencia:** PMID 39390310 verificado: existe, autores correctos, *Sports Medicine* 2025 ✅. Los porcentajes de contenido mitocondrial son correctos (ET 23%, HIT 27%, SIT 27% ✅). El "3.9 veces más eficiente por hora" no aparece en el abstract; puede estar en los análisis de metarregresión del texto completo.
- **Recomendación:** Verificar en texto completo o suavizar a "significativamente más eficientes por hora."

---

### intervalos-30-30-vo2max-ciclismo.md

**Hallazgo 9 — EXCERPT MISLEADING (mezcla números de estudios distintos)**

- **Cita exacta (excerpt/subtítulo del artículo):** "Bent Rønnestad demostró que tres bloques de 13 repeticiones 30/30 mejoran el VO2max un **5,7%** frente al **2,6%** de los intervalos largos."
- **Problema:** Exagerado / engañoso. Los dos números son reales pero provienen de estudios distintos y no son comparables entre sí.
- **Evidencia:** El 5.7% es del estudio de 2021 (PMID 33735833): microciclo de 1 semana / 5 sesiones de 12×30s. El 2.6% es del estudio de 2015 (PMID 24382021): 10 semanas / 2 sesiones semanales de intervalos largos. Nunca coexistieron en un único estudio. En el estudio 2021 (PMID 33735833) el grupo de intervalos largos no obtuvo 2.6%; en el estudio 2020 (PMID 31977120) directamente no hubo diferencia entre grupos en VO2max.
- **Nota importante:** Los datos en el **cuerpo del artículo** están correctamente atribuidos a sus respectivos PMIDs. El problema es exclusivamente el excerpt/subtítulo.
- **Corrección sugerida:** Separar las afirmaciones: "En 10 semanas (PMID 24382021), los intervalos cortos mejoraron el VO2max un 8.7% frente al 2.6% de los intervalos largos." / "En una semana de choque (PMID 33735833), los intervalos cortos mejoraron el VO2max un 5.7%."

---

## Artículos sin hallazgos problemáticos

Los siguientes 9 artículos fueron revisados y no presentan problemas verificables:

- `fuerza-gimnasio-ciclistas.md` — PMIDs 19960350, 23914932, 24862305, 25892654, 19903319 verificados ✅
- `fuerza-pretemporada-ciclistas.md` — PMIDs correctos, claims de Rønnestad 2010 verificados ✅
- `microdosis-fuerza-ciclistas.md` — PMIDs 36202386, 34125411, 23914932, 20799042, 22002517, 24862305 verificados ✅
- `tapering-puesta-a-punto.md` — PMIDs 17762369, 12840640, 31410894, 14600553, 37163550 verificados ✅
- `entrenamiento-polarizado-en-ciclistas-amateurs-evidencia-y-aplicacion-practica.md` — Stöggl 2014 y Neal 2013 con números correctos en este artículo ✅ (usa los valores reales +9%/+2%)
- `sweet-spot-training-ciclismo.md` — Sin cifras específicas verificables comprometidas ✅
- `pacing-contrarreloj-distribucion-potencia.md` — PMIDs 8455455, 18278984, 17645369, 16888463, 10776906, 17497402, 19850573 verificados; Ganna 56.792km ✅
- `progresion-ftp-primer-ano.md` — Claims basados en rangos observacionales razonables, no falsificables ✅
- `intervalos-hiit-ciclismo.md` — PMIDs 23539308, 23942167, 24382021, 11772161 verificados ✅
