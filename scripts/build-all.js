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

  // Source images from root paragon/images
  const rootImagesDir = path.join(repoRoot, 'paragon', 'images');
  const outImagesDir = path.join(outDir, 'images');

  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n=== Building tokens for ${brand} ===`);
  run(
    `paragon build-tokens --source ${tokensSrc} --build-dir ${cssBuildDir}`
  );

  console.log(`\n=== Building scss for ${brand} ===`);
  run(
    `paragon build-scss --corePath ${corePath} --themesPath ${themesPath} --outDir ${outDir} --defaultThemeVariants light`
  );

  // Copy images from paragon/images to dist/brand/images
  if (fs.existsSync(rootImagesDir)) {
    console.log(`\n=== Copying images for ${brand} ===`);
    fs.mkdirSync(outImagesDir, { recursive: true });
    fs.cpSync(rootImagesDir, outImagesDir, { recursive: true });
    console.log(`Copied images to ${outImagesDir}`);
  }

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
