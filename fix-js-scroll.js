const fs = require('fs');
let tsx = fs.readFileSync('src/app/page.tsx', 'utf8');

tsx = tsx.replace(
  'window.innerWidth >= 1024',
  'window.innerWidth >= 1280'
);

fs.writeFileSync('src/app/page.tsx', tsx);
