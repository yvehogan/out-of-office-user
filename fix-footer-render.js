const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!page.includes('<Footer />')) {
  page = page.replace(
    '          </section>\n\n        </div>\n      </main>',
    '          </section>\n          <div className="w-full xl:hidden"><Footer /></div>\n        </div>\n      </main>'
  );
  fs.writeFileSync('src/app/page.tsx', page);
}

