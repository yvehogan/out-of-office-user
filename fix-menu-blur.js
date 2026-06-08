const fs = require('fs');
let header = fs.readFileSync('src/components/Header.tsx', 'utf8');

// 1. Fix the overly dark/blurred background
header = header.replace(
  'bg-black/30 backdrop-blur-xl',
  'bg-black/10 backdrop-blur-md'
);

// 2. Fix the Close "X" Button to have the blurred purplish effect
header = header.replace(
  'bg-brand-purple2 flex items-center justify-center text-white hover:bg-brand-purple transition-colors shadow-lg',
  'bg-[#8B5CF6]/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#8B5CF6]/50 transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.1)]'
);

// Enhance X icon stroke to make it legible
header = header.replace(
  'strokeWidth="2"',
  'strokeWidth="2.5"'
);

fs.writeFileSync('src/components/Header.tsx', header);
