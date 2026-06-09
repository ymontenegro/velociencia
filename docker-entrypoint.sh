#!/bin/sh
# Container entrypoint: ensure the SQLite schema exists, then start the server.
# The schema step is idempotent (CREATE ... IF NOT EXISTS) so the persistent
# /app/data volume self-heals on every boot, including on a fresh volume.
set -e

# Sin estas variables, el admin queda con credenciales por defecto (bypass
# trivial). Mejor no arrancar: configúralas en Coolify.
if [ -z "$ADMIN_PASSWORD" ] || [ -z "$ADMIN_SECRET" ]; then
  echo "[entrypoint] ERROR: faltan ADMIN_PASSWORD y/o ADMIN_SECRET." >&2
  echo "[entrypoint] Genera un secret con: openssl rand -hex 32" >&2
  exit 1
fi

echo "[entrypoint] asegurando esquema de la base de datos…"
if ! node scripts/init-db.cjs; then
  echo "[entrypoint] ADVERTENCIA: la init de esquema falló; el servidor arrancará igual."
fi

echo "[entrypoint] iniciando servidor Next…"
exec node server.js
