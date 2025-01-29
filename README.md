npm publish package commands:

# Cleanup
npm run clean

# Stage, commit, and push changes
git add .
git commit -m "fix: your_commit"
git push origin main

# Run build
npm run build

# Bump version
npm version patch    # or minor/major

# Push tags
git push origin main --tags

# Publish to npm
npm publish