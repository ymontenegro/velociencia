#!/bin/sh
# Container entrypoint: ensure the SQLite schema exists, then start the server.
# The schema step is idempotent (CREATE ... IF NOT EXISTS) so the persistent
# /app/data volume self-heals on every boot, including on a fresh volume.
set -e

echo "[entrypoint] asegurando esquema de la base de datos…"
if ! node scripts/init-db.cjs; then
  echo "[entrypoint] ADVERTENCIA: la init de esquema falló; el servidor arrancará igual."
fi

echo "[entrypoint] iniciando servidor Next…"
exec node server.js
