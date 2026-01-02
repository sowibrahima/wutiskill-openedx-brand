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
