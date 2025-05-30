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

# Concat command for powershell (please modify the commit message)
git add .; git commit -m "fix: add application_year"; git push origin main; npm run build; npm version patch; git push origin main --tags; npm publish