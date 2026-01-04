# WutiSkill MFE Branding

Multi-tenant branding solution for Open edX LMS platform.

## Structure

```
wutiskill-lms-themes/
├── branding/
│   ├── wutiskill/              # WutiSkill tenant theme
│   │   ├── tokens/src/         # Design tokens (colors, etc.)
│   │   └── paragon/            # SCSS and generated CSS
│   │
│   └── tenant1/                # Second tenant theme
│       ├── tokens/src/
│       └── paragon/
│
└── dist/                       # Built CSS output
    ├── wutiskill/
    └── tenant1/
```

## Installation

```bash
npm install
```

## Build

Build all tenants:
```bash
make build
```

Build specific tenant:
```bash
make build-wutiskill
make build-tenant1
```

## Output

After building, each tenant will have in `dist/<tenant>/`:
- `core.css` - Core theme CSS
- `light.css` - Light theme CSS with design tokens

## Deployment

### Design Tokens (MFEs)

Upload `dist/<tenant>/` to your CDN and configure via `MFE_CONFIG`:

```json
{
  "MFE_CONFIG": {
    "PARAGON_THEME_URLS": {
      "core": { "url": "https://cdn.example.com/<tenant>/core.css" },
      "defaults": { "light": "https://cdn.example.com/<tenant>/light.css" }
    }
  }
}
```

## Adding a New Tenant

1. Copy an existing tenant folder
2. Update `tokens/src/themes/light/global/color.json` with new colors
3. Update logos and assets
4. Add build scripts to `package.json`
5. Run `make build`



BANNER_IMAGE_EXTRA_SMALL: http://cdn.jsdelivr.net/gh/sowibrahima/ws-theme@main/ws_theme/templates/ws_theme/lms/static/images/125683.jpg
BANNER_IMAGE_LARGE: https://github.com/sowibrahima/ws-theme/blob/main/ws_theme/templates/ws_theme/lms/static/images/125683_large.jpg
BANNER_IMAGE_MEDIUM: https://github.com/sowibrahima/ws-theme/blob/main/ws_theme/templates/ws_theme/lms/static/images/125683_med.jpg
BANNER_IMAGE_SMALL: https://github.com/sowibrahima/ws-theme/blob/main/ws_theme/templates/ws_theme/lms/static/images/125683.jpg
