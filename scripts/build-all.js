const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const brandingDir = path.join(repoRoot, 'branding');

function getBrandDirs() {
  return fs
    .readdirSync(brandingDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function run(command) {
  execSync(command, { cwd: repoRoot, stdio: 'inherit' });
}

function buildBrand(brand) {
  const brandPath = path.join(brandingDir, brand);
  const tokensSrc = path.join(brandPath, 'tokens', 'src');
  const cssBuildDir = path.join(brandPath, 'paragon', 'build');
  const corePath = path.join(brandPath, 'paragon', 'core.scss');
  const themesPath = path.join(cssBuildDir, 'themes');
  const outDir = path.join(repoRoot, 'dist', brand);

  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n=== Building tokens for ${brand} ===`);
  run(
    `paragon build-tokens --source ${tokensSrc} --build-dir ${cssBuildDir} --source-tokens-only`
  );

  console.log(`\n=== Building scss for ${brand} ===`);
  run(
    `paragon build-scss --corePath ${corePath} --themesPath ${themesPath} --outDir ${outDir} --defaultThemeVariants light`
  );
}

function main() {
  const brands = getBrandDirs();
  if (!brands.length) {
    console.log('No brand directories found under branding/. Nothing to build.');
    return;
  }

  brands.forEach(buildBrand);
}

main();
