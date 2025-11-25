# MES Dashboard 2.0

Modern, modular **Manufacturing Execution System** dashboard built with Next.js 16, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Ultra-modern UI** - Glass morphism, depth, smooth animations
- 🌓 **Dark/Light Mode** - Classy toggle with smooth transitions
- 🎯 **Modular Architecture** - Max 500 lines per file, reusable everything
- 🔒 **Type-safe** - Full TypeScript support
- ⚡ **Fast** - Next.js 16 + Turbopack
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

**Demo Login:**
- Username: `admin`
- Password: `admin`

## 🎨 Design System

All styling centralized in `lib/theme/` and `lib/design-system/`:

```typescript
import { themeColors } from '@/lib/theme';
import { cardStyles, interactive } from '@/lib/design-system';

// Use theme tokens everywhere
<div className={themeColors.pageBackground} />
<Card className={cardStyles.elevated} />
```

### Theme System
- **Colors** (`lib/theme/colors.ts`) - All color tokens
- **Dark Mode** (`lib/theme/dark-mode.ts`) - Dark theme colors
- **Typography** (`lib/theme/typography.ts`) - Font styles
- **Spacing** (`lib/theme/spacing.ts`) - Layout spacing
- **Depth** (`lib/design-system/depth.ts`) - Shadows, glass effects

## 📁 Project Structure

```
app/                    # Next.js pages
├── dashboard/          # Dashboard pages
├── layout.tsx          # Root layout
└── page.tsx            # Login page

components/             # React components
├── auth/               # Auth components
├── dashboard/          # Dashboard widgets
├── layout/             # Layout components
├── providers/          # Context providers
└── ui/                 # Reusable UI components

lib/                    # Utilities
├── theme/              # Theme system (centralized)
├── design-system/      # Design tokens
└── auth/               # Auth utilities

hooks/                  # Custom React hooks
types/                  # TypeScript types
```

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Component library |
| **Phosphor Icons** | Modern icons (9000+) |
| **Inter Font** | Typography |
| **next-themes** | Dark mode |

## 📐 Architecture Rules

1. ✅ **No file > 500 lines** - Keep everything modular
2. ✅ **Centralized theme** - All styling in `lib/theme/`
3. ✅ **Reusable components** - Extract common patterns
4. ✅ **Type everything** - Full TypeScript coverage
5. ✅ **Modern icons** - Use Phosphor with proper weights

## 🎯 Key Components

- **MESLogo** - Animated gear logo with gradient hover
- **ThemeToggle** - Dark/light mode switch
- **StatCard** - Metric cards with depth & hover effects
- **DashboardLayout** - Glass morphism sidebar & topbar

## 📝 Development Guidelines

```typescript
// ❌ DON'T - Hardcode values
<div className="bg-blue-600 text-gray-900" />

// ✅ DO - Use theme system
import { themeColors } from '@/lib/theme';
<div className={`${themeColors.surface} ${themeColors.textPrimary}`} />
```

## 🚀 Deployment

Deploy to Vercel, AWS, or any Node.js hosting:

```bash
npm run build
npm start
```

## 📄 License

MIT

---

**Built with ❤️ for modern manufacturing**
