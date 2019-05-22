#!/usr/bin/bash
source /usr/share/nvm/init-nvm.sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && pwd )"
cd $DIR
node Backend/app/updateDB.js
node tempupdate.js
tsc --project tsconfig_temp.json
git add .
git commit -m "Update data for `date +%Y-%m-%d`"
git push
