const fs = require('fs');

let header = fs.readFileSync('src/components/Header.tsx', 'utf8');

// 1. Reduce blur and background darkness
header = header.replace(
  'bg-black/10 backdrop-blur-md transition-all',
  'bg-black/5 backdrop-blur-sm transition-all'
);

// 2. Replace the Close button with the exact SVG provided and remove the circular styling
const oldButtonRegex = /<button onClick=\{closeMenu\} className="absolute top-6 right-6 xl:top-8 xl:right-\[60px\] w-12 h-12 rounded-[^>]+>[\s\S]*?<\/button>/;

const newButton = `<button onClick={closeMenu} className="absolute top-6 right-6 xl:top-8 xl:right-[60px] bg-transparent border-none cursor-pointer p-2 flex items-center justify-center text-white hover:opacity-80 transition-opacity active:scale-95 z-[1060] drop-shadow-[0_0_15px_rgba(87,0,255,1)]" aria-label="Close menu">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12.4185" y="4.92761" width="47" height="10" rx="5" transform="rotate(45 12.4185 4.92761)" fill="white"/>
            <rect x="5.34766" y="38.6616" width="47" height="10" rx="5" transform="rotate(-45 5.34766 38.6616)" fill="white"/>
          </svg>
        </button>`;

header = header.replace(oldButtonRegex, newButton);

fs.writeFileSync('src/components/Header.tsx', header);
