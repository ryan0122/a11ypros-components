# Accessible Design System + AI Audit Assistant

An opinionated, accessibility-first design system built with React, TypeScript, and Next.js, featuring an AI-powered accessibility audit assistant powered by Anthropic's Claude API.

## Features

- **WCAG 2.1/2.2 Compliant Components**: All components follow accessibility best practices
- **Design Token System**: Consistent spacing, colors, typography, and motion tokens
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Proper focus trapping and return focus patterns
- **ARIA Support**: Semantic HTML with ARIA enhancements where needed
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **High Contrast**: Supports `prefers-contrast` for better visibility
- **AI Audit Assistant**: Paste JSX code and get WCAG compliance reviews with code suggestions

## Project Structure

```
├── packages/
│   └── design-system/     # Component library
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── tokens/     # Design tokens
│       │   ├── hooks/      # Custom hooks
│       │   ├── utils/      # Utility functions
│       │   └── styles/     # Global styles
│       └── package.json
├── apps/
│   └── web/               # Next.js app
│       ├── app/
│       │   ├── (docs)/    # Documentation pages
│       │   └── api/       # API routes
│       └── package.json
├── .storybook/            # Storybook configuration
└── package.json           # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in `apps/web/`:
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### Development

1. Start the Next.js development server:
```bash
npm run dev
```

2. Start Storybook (in a separate terminal):
```bash
npm run storybook
```

The Next.js app will be available at `http://localhost:3000` and Storybook at `http://localhost:6006`.

## Component Library

### Available Components

- **Button**: Accessible button with variants, sizes, and loading states
- **Link**: Semantic link component with external link detection
- **Modal**: Focus-trapped modal dialog with ARIA support
- **DataTable**: Accessible table with keyboard navigation and sorting
- **Toast**: Notification system with ARIA live regions
- **Tabs**: Tab component with arrow key navigation
- **Form Components**: Input, Textarea, Select, Checkbox, Radio, Fieldset, Label

### Usage Example

```tsx
import { Button, Input, Modal } from '@a11ypros/a11y-ui-components'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <Input label="Email" type="email" required />
      </Modal>
    </>
  )
}
```

## WCAG Compliance

Each component documents its WCAG 2.1/2.2 compliance:

- **1.3.1** Info and Relationships (semantic HTML)
- **1.4.3** Contrast (Minimum) - via design tokens
- **2.1.1** Keyboard (all interactive elements)
- **2.4.7** Focus Visible
- **2.5.3** Label in Name
- **4.1.2** Name, Role, Value (ARIA)
- **4.1.3** Status Messages (for Toast)

## AI Audit Assistant

The AI Audit Assistant analyzes JSX code snippets for accessibility issues:

1. Navigate to `/audit` in the Next.js app
2. Paste your JSX code
3. Click "Run Accessibility Audit"
4. Review issues grouped by WCAG Success Criteria
5. See code suggestions for each issue

### API Setup

The audit assistant requires an Anthropic API key:

1. Get your API key from [Anthropic](https://console.anthropic.com/)
2. Add it to `apps/web/.env.local`:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```

## Design Tokens

The design system uses CSS custom properties for theming:

```css
/* Colors */
--color-primary-500: #0ea5e9;
--color-text-primary: #171717;

/* Spacing */
--spacing-4: 1rem;

/* Typography */
--font-size-base: 1rem;
--font-weight-semibold: 600;

/* Motion */
--motion-duration-normal: 200ms;
```

## Storybook

View all components and their documentation in Storybook:

```bash
npm run storybook
```

Each component story includes:
- Usage examples
- Accessibility notes
- Keyboard interaction tables
- WCAG compliance information

## Building

Build the Next.js app:
```bash
npm run build
```

Build Storybook:
```bash
npm run build-storybook
```

## Testing Accessibility

### Automated Testing

Storybook includes the `@storybook/addon-a11y` addon for automated accessibility checks.

### Manual Testing

1. **Keyboard Navigation**: Test all components with keyboard only (Tab, Arrow keys, Enter/Space)
2. **Screen Reader**: Test with NVDA (Windows), VoiceOver (macOS), or JAWS
3. **Focus Indicators**: Ensure all interactive elements have visible focus styles
4. **Color Contrast**: Verify text meets WCAG AA contrast ratios (4.5:1)

## Contributing

When adding new components:

1. Follow the existing component structure
2. Include proper ARIA attributes
3. Add keyboard navigation support
4. Include focus management
5. Add Storybook stories with accessibility documentation
6. Test with keyboard and screen readers

## License

MIT

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

