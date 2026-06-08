const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(
  /body\.landing-page \{[\s\S]*?\}/,
  `body.landing-page {
  display: block;
  overflow: auto;
  height: auto;
  background-color: var(--color-white);
  color: var(--color-purple-dark);
  font-family: var(--font-sans);
}

@media (min-width: 1280px) {
  body.landing-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
}`
);

fs.writeFileSync('src/app/globals.css', css);
