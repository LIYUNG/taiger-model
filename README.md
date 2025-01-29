npm publish

# Stage, commit, and push changes
git add .
git commit -m "fix: updated constants and improved utility functions"
git push origin main

# Bump version
npm version patch    # or minor/major

# Push tags
git push origin main --tags

# Publish to npm
npm publish