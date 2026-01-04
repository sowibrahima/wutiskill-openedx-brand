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
  const cssBuildDir = path.join(brandPath, 'paragon', 'css');
  const corePath = path.join(brandPath, 'paragon', 'core.scss');
  const themesPath = path.join(cssBuildDir, 'themes');
  const outDir = path.join(repoRoot, 'dist', brand);
  const rootParagonDir = path.join(repoRoot, 'paragon');

  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n=== Building tokens for ${brand} ===`);
  run(
    `paragon build-tokens --source ${tokensSrc} --build-dir ${cssBuildDir}`
  );

  console.log(`\n=== Building scss for ${brand} ===`);
  run(
    `paragon build-scss --corePath ${corePath} --themesPath ${themesPath} --outDir ${outDir} --defaultThemeVariants light`
  );

  // Expose the brand's paragon folder at the repo root (for package consumers expecting /paragon/*)
  // We publish the primary brand (wutiskill) to the root paragon directory.
  if (brand === 'wutiskill') {
    fs.rmSync(rootParagonDir, { recursive: true, force: true });
    fs.cpSync(path.join(brandPath, 'paragon'), rootParagonDir, { recursive: true });
  }
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
