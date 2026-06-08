const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix the double-class padding/margins on the contact list container
page = page.replace(
  'className="w-[320px] pl-[32px] pt-[64px] flex flex-col gap-[20px] shrink-0 w-full xl:w-auto px-0 xl:px-[32px] pt-[40px] xl:pt-[64px] h-auto xl:h-full gap-[30px] xl:gap-0"',
  'className="flex flex-col w-full px-0 pt-[40px] gap-[30px] h-auto shrink-0 xl:w-[320px] xl:pl-[32px] xl:px-[32px] xl:pt-[64px] xl:h-full xl:gap-0"'
);

// 2. Hide the desktop hardcoded inline copyright on mobile
page = page.replace(
  'className="relative bottom-auto left-auto mt-[40px] pt-[20px] border-t border-[#e9ecef] font-sans text-[13px] text-brand-purple2 opacity-60 xl:static xl:mt-[24px] xl:pt-0 xl:border-none"',
  'className="hidden xl:block xl:static xl:mt-[24px] font-sans text-[13px] text-brand-purple2 opacity-60"'
);

// 3. Import the Footer component
if (!page.includes('import { Footer }')) {
  page = page.replace(
    'import { Button } from \'@/components/ui/button\';',
    'import { Button } from \'@/components/ui/button\';\nimport { Footer } from "@/components/Footer";'
  );
}

// 4. At the end of the sections, right before </main>, inject a mobile-only Footer
page = page.replace(
  '          </section>\n        </div>\n      </main>\n    </>\n  );\n}',
  '          </section>\n          <div className="w-full xl:hidden"><Footer /></div>\n        </div>\n      </main>\n    </>\n  );\n}'
);

fs.writeFileSync('src/app/page.tsx', page);
