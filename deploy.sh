#!/bin/bash
# 🚀 Auto-Deploy Script
# Pushes all changes to GitHub automatically

set -e

echo "🔍 Checking for changes..."
git status

echo "📦 Staging all changes..."
git add -A

echo "💬 Enter commit message (or press Enter for auto):"
read -r commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "💾 Committing..."
git commit -m "$commit_msg"

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Deploy complete!"
echo "🔗 View at: https://github.com/openclawruby/game-project"
