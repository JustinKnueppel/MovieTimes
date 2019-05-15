node tempupdate.js
tsc --project tsconfig_temp.json
git add .
git commit -m "Update data for `date +%Y-%m-%d`"
git push