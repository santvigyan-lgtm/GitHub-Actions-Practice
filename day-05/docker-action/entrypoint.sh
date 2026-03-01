#!/bin/bash
# =============================================================
# Day 5 — Docker Action Entrypoint
# =============================================================
# This script runs inside the Docker container
# $1 = first argument (who-to-greet input from action.yml)
# =============================================================

WHO_TO_GREET="$1"
GREETING_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "=========================================="
echo "🐳 DOCKER ACTION"
echo "=========================================="
echo "${GREETING_PREFIX:-Hello}, ${WHO_TO_GREET}!"
echo "Time: ${GREETING_TIME}"
echo "Container OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
echo "=========================================="

# Set output using the GITHUB_OUTPUT file
echo "greeting-time=${GREETING_TIME}" >> "$GITHUB_OUTPUT"

echo "✅ Docker action completed!"
