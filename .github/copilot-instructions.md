# GitHub Copilot Instructions - MES Dashboard 2.0

## Project Overview
Manufacturing Execution System (MES) Dashboard - Next.js 16, TypeScript, Tailwind CSS 4, Azure AD auth.

## Architecture Rules

### File Structure
- **Max 500 lines per file** - Split into smaller modules if exceeded
- **Barrel exports** - Use `index.ts` for clean imports
- **Co-location** - Keep related files together (components + hooks + types)

### Styling System
- **Always use theme tokens** from `lib/theme/` - never hardcode colors
- **Import pattern**: `import { themeColors } from '@/lib/theme'`
- **Design system**: Use `lib/design-system/` for variants, depth, transitions
- **Utility helper**: Use `cn()` from `lib/utils` for conditional classes
- **Glass morphism**: Prefer `backdrop-blur-xl` with subtle shadows
- **Theme-aware components**: Use `useThemeColors()` hook for dynamic theme adaptation
- **Typography**: Always use `typography.styles` from design system for consistent text styling
- **Inputs/Selects**: 
  - Use standard `<Input>` component without custom height overrides
  - Default height is `h-11` (already in component)
  - For search inputs with icons: use `pl-9` for left padding
  - Icon positioning: `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`
  - Never add custom `theme.input` classes - component handles this
- **Buttons**: 
  - Use standard `<Button>` component variants: `default`, `outline`, `ghost`, `destructive`
  - Use standard sizes: `default`, `sm`, `lg`, `icon`
  - Never override with `theme.accentPrimary` or `theme.accentHover` - let component handle styling
  - Icon buttons: use `size="icon"` variant
  - Button with text + icon: add `className="gap-2"`
- **Hover states**: Component variants handle hover states - never override
- **Subtle hovers**: Hover effects are intentionally light and subtle (10% opacity or less) for a refined UX
- **Light mode compatibility**: NEVER use hardcoded dark backgrounds like `bg-gray-800/50` - always use `theme.surface`
- **Backdrop/Overlay patterns**: For modals, drawers, or overlays with backdrop blur:
  - Use `fixed inset-0` for backdrop positioning
  - Add explicit `w-screen h-screen` classes
  - Set very high z-index (e.g., `z-[9998]` for backdrop, `z-[9999]` for content)
  - For side panels/drawers, use `top-0 bottom-0` instead of `h-screen` to prevent gaps
  - Add inline `style={{ margin: 0, padding: 0 }}` to prevent spacing issues
  - Example: `className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm w-screen h-screen"`

### Example Styling
```typescript
import { themeColors } from '@/lib/theme';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';

// In component
const theme = useThemeColors();

<div className={cn(
  theme.surface,
  theme.border,
  cardVariants.elevated,
  transitions.default
)} />

// Titles with typography
<h2 className={typography.styles.sectionTitle}>Section Title</h2>
<p className={typography.styles.sectionSubtitle}>Description text</p>

// Form inputs
<Input className={cn(
  'h-11 border text-gray-900 dark:text-white',
  theme.input,
  'focus:ring-2',
  transitions.default
)} />

// Theme-aware buttons
<Button className={cn(
  theme.accentPrimary,
  theme.accentHover,
  transitions.default
)}>
  Action Button
</Button>

// Hover effects - ALWAYS use theme.accentHover
<button className={cn(
  theme.surface,
  theme.accentHover,  // NOT hover:bg-gray-700/50
  transitions.default
)} />
```

### API Calls
- **Use singleton**: `import { apiClient } from '@/lib/api/client'`
- **Type-safe**: Always specify response type `apiClient.get<YourType>(...)`
- **Error handling**: Wrap in try-catch, handle `ApiError` type
- **Endpoints**: Define in `lib/api/endpoints.ts`, import from config

### Example API Call
```typescript
import { apiClient, type ApiResponse } from '@/lib/api';

try {
  const response: ApiResponse<Router[]> = await apiClient.get('/routers');
  setData(response.data);
} catch (error: any) {
  console.error('Error:', error.message);
}
```

### Component Structure
- **Client components**: Use `'use client'` directive when needed
- **Exports**: Named exports preferred over default
- **Props interface**: Always define typed props
- **Hooks at top**: All hooks before any conditions/loops

### State Management
- **Local state**: `useState` for component-level state
- **Custom hooks**: Extract reusable logic to `hooks/`
- **No Redux/Zustand**: Keep it simple unless explicitly needed
- **Context sparingly**: Only for theme and auth

### Configuration
- **Single source**: All config in `lib/config/app.config.ts`
- **No magic values**: Use `appConfig.feature.value` pattern
- **Environment vars**: Always provide fallbacks
- **Feature flags**: Check with `isFeatureEnabled('feature')`

### Types
- **Explicit typing**: Avoid `any`, use `unknown` if needed
- **Interface over type**: Use `interface` for object shapes
- **Export all types**: Make types reusable across project
- **Naming**: PascalCase for types/interfaces

### Icons
- **Primary**: Lucide React icons (`lucide-react`)
- **Secondary**: Phosphor icons for advanced use
- **Sizing**: Use design system `iconSizes` constants
- **Color**: Inherit from parent or use theme tokens

### Authentication
- **Azure AD**: Primary auth method via MSAL
- **Basic auth**: Demo credentials (admin/admin) for dev
- **Token storage**: localStorage for tokens
- **Protected routes**: Check auth in layout/page components

### Performance
- **Lazy load**: Use dynamic imports for heavy components
- **Memoization**: `useMemo` for expensive computations
- **Debounce**: User inputs, especially search/filters
- **Image optimization**: Use Next.js `<Image>` component

### Code Style
- **Prettier**: Format on save
- **ESLint**: Fix lint errors before committing
- **Comments**: JSDoc for functions, inline for complex logic
- **Naming**: camelCase for variables, PascalCase for components

### Testing Mindset
- **Console logs**: Remove before commit
- **Error boundaries**: Wrap risky components
- **Loading states**: Always show loading UI
- **Empty states**: Handle no-data scenarios

## Common Patterns

### Creating New Pages
1. Create in `app/[page]/page.tsx`
2. Wrap with `DashboardLayout` if authenticated
3. Import theme colors and design system
4. Define page metadata

### Creating New Components
1. Place in appropriate `components/` subfolder
2. Use theme system for all styling
## Do's ✅
- ✅ Use centralized theme system always
- ✅ Keep files small and focused
- ✅ Type everything with TypeScript
- ✅ Handle loading and error states
- ✅ Follow existing patterns
- ✅ Document complex logic
- ✅ Test in dark mode
- ✅ Mobile-first responsive design
- ✅ Use `useThemeColors()` hook for theme-aware components
- ✅ Use `typography.styles` for all text elements
- ✅ Use `theme.input` for all form fields
- ✅ Use `theme.accentPrimary` for primary action buttons
### Adding New Theme Colors
1. Add to `lib/theme/colors.ts` for light mode
2. Add to `lib/theme/dark-mode.ts` for dark mode
3. Export from `lib/theme/index.ts`
4. Update `themeColors` object

## Don'ts ❌
- ❌ Don't hardcode colors - use theme tokens
- ❌ Don't create files > 500 lines - refactor
- ❌ Don't use inline styles - use Tailwind classes
- ❌ Don't duplicate API logic - use services
- ❌ Don't skip TypeScript types - always type
- ❌ Don't use default exports - prefer named
- ❌ Don't ignore errors - handle gracefully
- ❌ Don't bypass design system - maintain consistency

## Do's ✅
- ✅ Use centralized theme system always
- ✅ Keep files small and focused
- ✅ Type everything with TypeScript
- ✅ Handle loading and error states
- ✅ Follow existing patterns
- ✅ Document complex logic
- ✅ Test in dark mode
- ✅ Mobile-first responsive design

## Quick Reference

### Import Aliases
- `@/components` - React components
- `@/lib` - Utilities, theme, config
- `@/hooks` - Custom hooks
- `@/types` - TypeScript types
- `@/app` - Next.js pages

### Key Files
- `lib/config/app.config.ts` - All configuration
- `lib/theme/index.ts` - Theme system
- `lib/api/client.ts` - API client
- `components/layout/DashboardLayout.tsx` - Main layout
- `app/globals.css` - Global styles

## When Copilot Suggests Code
1. **Check theme usage** - Are theme tokens used?
2. **Verify types** - Is everything typed?
3. **File size** - Is it under 500 lines?
4. **Patterns** - Does it match existing patterns?
5. **Imports** - Are aliases used correctly?

---

**Remember**: Consistency > Cleverness. Follow existing patterns, use the design system, and keep it simple.

## 🏗 Component Architecture

### **File Size Limits (ENFORCED)**
- **Maximum 200 lines per file** - No exceptions
- **Average target: 100-150 lines**
- If approaching 200 lines → Refactor immediately

### **Atomic Design Pattern**

```
Atoms (10-40 lines)
├── Pure UI, no logic
└── Example: Button, Input, Badge

Molecules (40-100 lines)
├── Atoms combined, minimal logic
└── Example: SidebarNavItem, SearchInput, StatCard

Organisms (100-200 lines)
├── Complex components with state
└── Example: Sidebar, RoutersTable, FilterBar

Pages (150-250 lines)
├── Data fetching + composition
└── Example: RoutersPage, DashboardPage
```

### **Container/Presentational Pattern**

**Container (Smart) - Pages:**
```typescript
// app/routers/page.tsx (~150 lines)
- useCustomHook() for data
- Compose organisms
- Handle callbacks
- NO detailed UI logic
```

**Presentational (Dumb) - Components:**
```typescript
// components/routers/RoutersTable.tsx (~130 lines)
- Receive props
- Render UI
- Emit events via callbacks
- NO API calls or complex logic
```

### **File Organization**

```
components/
├── ui/               # Atoms (shadcn)
├── shared/           # Reusable molecules
├── [feature]/        # Feature-specific organisms
│   ├── Component.tsx
│   ├── SubComponent.tsx
│   └── index.ts      # Barrel export
└── layout/
    ├── DashboardLayout.tsx
    └── Sidebar/      # Modular sidebar

hooks/
├── useFeature.ts     # Data fetching (50-100 lines)
└── useFilters.ts     # Business logic

app/
└── [route]/
    └── page.tsx      # Container (~150 lines)
```

### **Refactoring Rules**

1. **Extract Logic to Hooks**
   - 3+ useState → custom hook
   - API calls → ALWAYS in hook/service
   - Complex calculations → custom hook

2. **Extract UI to Components**
   - Repeated JSX (3+ times) → molecule
   - 50+ lines of JSX → organism
   - Self-contained sections → organism

3. **Props Over State**
   - Data flows DOWN only
   - Events bubble UP via callbacks
   - State lives in ONE place (container)

### **Example: Properly Refactored Feature**

```
app/routers/
└── page.tsx (121 lines) ✅
    ↓ uses
hooks/
└── useRouters.ts (81 lines) ✅
    ↓ provides data to
components/routers/
├── RouterFilters.tsx (165 lines) ✅
├── RoutersTable.tsx (130 lines) ✅
├── RouterRow.tsx (135 lines) ✅
├── RouterTableHeader.tsx (73 lines) ✅
├── RouterActions.tsx (66 lines) ✅
└── index.ts (barrel export)
```

**Total:** 771 lines across 7 files (avg 110 lines each)  
**vs Monolithic:** 818 lines in 1 file ❌

### **Before Creating New Components**

Ask yourself:
1. Is this file > 150 lines? → **Split it**
2. Is this logic repeated? → **Extract to hook**
3. Is this UI repeated? → **Extract to component**
4. Can this be more reusable? → **Make it generic**

### **Page Layout Rules**

- **No page titles or descriptions** - Content should use full available space
- Remove redundant headers like "Routers", "Dashboard Overview", etc.
- Let sidebar navigation provide context
- Maximize screen real estate for actual data/content
- **Center align all card titles** - Card headers, section titles should be centered

### **Sidebar Styling Rules**

- **Unified list appearance** - All sidebar items should flow as one seamless list
- **No dividers** - Remove all `h-px` border elements between sections
- **No extra gaps** - Remove `pt-6`, `pb-2`, or similar spacing between sections
- **Consistent spacing** - Use only the parent nav's `space-y-1` for gaps
- **Section labels** - Remove redundant labels like "Admin Controls"
- **Theme-aware icons** - ALL icons must use `themeColors.textTertiary` and `group-hover:text-blue-600 dark:group-hover:text-blue-400`
- **Never hardcode icon colors** - Import `useThemeColors()` hook and use theme tokens
- **Consistent sizing** - All expanded section icons: `w-[18px] h-[18px]`, collapsed: `w-5 h-5`
- **Consistent padding** - All buttons: `px-2.5 py-2` for expanded state
- **Expandable section alignment** - All expandable sections must use:
  - Wrapper: `<div className="space-y-1">` for consistent vertical spacing
  - Children container: `<div className="ml-6 pl-3 border-l border-gray-200/60 dark:border-gray-700/60 space-y-1">` for proper indentation and visual hierarchy

### **Full-Height Page Pattern**

For pages that need to fill the entire viewport height (chat interfaces, dashboards, etc.):

```typescript
// app/(dashboard)/feature/page.tsx
export default function FeaturePage() {
  const theme = useThemeColors();
  
  return (
    // Cancel layout padding and use full screen height
    <div className="-m-8 h-screen">
      <div className="h-full p-6"> {/* Add back selective padding */}
        {/* Your content here */}
      </div>
    </div>
  );
}
```

**Why this pattern:**
- Layout wrapper adds `p-8` to all pages (`app/(dashboard)/layout.tsx`)
- Use `-m-8` to cancel parent padding
- Use `h-screen` for full viewport height
- Add back padding selectively where needed (`p-6`, `p-8`, etc.)
- Inner containers use `h-full` to fill available space

**Examples:**
- AI Chat: Full-height chat interface with no gaps
- AI Charts: Full-height split layout (chart + sidebar)
- Future dashboards with real-time data displays

---
