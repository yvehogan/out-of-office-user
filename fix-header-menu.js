const fs = require('fs');
let header = fs.readFileSync('src/components/Header.tsx', 'utf8');

// 1. Change the `<header>` background depending on if the menu is open, or just leave it transparent?
// Look at what we want to do:
// On `nav` (the overlay container):
header = header.replace(
  'className={`fixed top-[90px] w-full h-[calc(100vh-90px)] p-[40px_24px] bg-white shadow-[-10px_0_30px_rgba(33,1,95,0.05)] transition-[right] duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] z-[999] flex flex-col xl:top-[84px] xl:w-[400px] xl:h-[calc(100vh-84px)] xl:p-[60px_50px] xl:border-l border-[#e9ecef] min-[1440px]:top-[103px] min-[1440px]:h-[calc(100vh-103px)] ${isMenuOpen ? \'right-0\' : \'-right-full\'}`}',
  'className={`fixed inset-0 w-full h-[100dvh] bg-white/70 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1050] flex flex-col items-center justify-center xl:items-end xl:pr-[20vw] ${isMenuOpen ? \'opacity-100 visible pointer-events-auto\' : \'opacity-0 invisible pointer-events-none\'}`}'
);

// We need an X button in the overlay top right:
if (!header.includes('w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center')) {
    header = header.replace(
      '<ul className',
      '<button onClick={closeMenu} className="absolute top-6 right-6 xl:top-8 xl:right-[60px] w-12 h-12 rounded-full bg-brand-purple2 flex items-center justify-center text-white hover:bg-brand-purple transition-colors shadow-lg active:scale-95 z-[1060]" aria-label="Close menu">\n          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>\n        </button>\n        <ul className'
    );
}

// Ensure the `ul` items are centered vs slightly right.
header = header.replace(
  'className="list-none flex flex-col gap-[30px] xl:gap-10"',
  'className="list-none w-full xl:w-auto flex flex-col items-center xl:items-start gap-8 xl:gap-[40px] relative z-[1060]"'
);

// For each li > Link, we replace the class to huge serif font with red square hover
let oldLinkClass = 'className="font-serif text-[28px] xl:text-4xl font-bold text-brand-purple2 no-underline transition-all duration-300 flex items-center gap-4 hover:text-brand-purple hover:pl-2.5"';
let newLinkClass = 'className="relative group font-serif text-[48px] xl:text-[80px] font-bold text-white tracking-wide transition-all duration-300 drop-shadow-md hover:text-gray-200 flex items-center"';

for (let i = 0; i < 4; i++) {
   header = header.replace(oldLinkClass, newLinkClass);
}

// Add the red rotated square to the text strings. What are the links?
header = header.replace('>Books</Link>', '>\n            <span className="absolute -left-12 xl:-left-16 w-6 h-6 xl:w-8 xl:h-8 bg-red-600 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />\n            Books\n          </Link>');
header = header.replace('>Insights</Link>', '>\n            <span className="absolute -left-12 xl:-left-16 w-6 h-6 xl:w-8 xl:h-8 bg-red-600 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />\n            Insights\n          </Link>');
header = header.replace('>Shop</Link>', '>\n            <span className="absolute -left-12 xl:-left-16 w-6 h-6 xl:w-8 xl:h-8 bg-red-600 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />\n            Shop\n          </Link>');
header = header.replace('>Events</Link>', '>\n            <span className="absolute -left-12 xl:-left-16 w-6 h-6 xl:w-8 xl:h-8 bg-red-600 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />\n            Events\n          </Link>');

// We also need to fix bg dark/white tint of overlay.
header = header.replace('bg-white/70 backdrop-blur-xl', 'bg-black/30 backdrop-blur-xl');


fs.writeFileSync('src/components/Header.tsx', header);

