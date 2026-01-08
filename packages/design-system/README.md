# @a11ypros/a11y-ui-components

An accessibility-first React UI component library built with WCAG 2.1/2.2 Level AA compliance. Every component has been carefully crafted by a certified WAS (Web Accessibility Specialist) to ensure your applications are usable by everyone, regardless of their abilities or the assistive technologies they use.

## Features

- ✅ **WCAG 2.1/2.2 Level AA Compliant** - Built with accessibility as a core requirement
- ✅ **TypeScript** - Full TypeScript support with type definitions included
- ✅ **Tree-shakeable** - ES modules with side-effect-free exports for optimal bundle sizes
- ✅ **Keyboard Navigation** - Full keyboard support for all interactive components
- ✅ **Screen Reader Friendly** - Proper ARIA labels and semantic HTML
- ✅ **Focus Management** - Built-in focus trap and focus return utilities
- ✅ **Modern React** - Built for React 18+ with hooks and modern patterns

## Installation

```bash
npm install @a11ypros/a11y-ui-components
```

or

```bash
yarn add @a11ypros/a11y-ui-components
```

## Peer Dependencies

This package requires React 18+ and React DOM 18+:

```bash
npm install react react-dom
```

## Quick Start

### 1. Import CSS

Import the global styles in your application entry point:

```tsx
// In your main CSS file or entry point
import '@a11ypros/a11y-ui-components/styles';
```

Or import component-specific styles:

```tsx
import '@a11ypros/a11y-ui-components/styles/components';
```

### 2. Import and Use Components

```tsx
import { Button, Input, Modal } from '@a11ypros/a11y-ui-components';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input label="Email" type="email" />
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```

## Available Components

### Form Components
- **Input** - Accessible text input with label and error handling
- **Textarea** - Multi-line text input
- **Select** - Dropdown select with keyboard navigation
- **Checkbox** - Accessible checkbox with proper labeling
- **Radio** - Radio button group with fieldset support
- **Label** - Accessible form label component
- **Fieldset** - Form fieldset for grouping related inputs

### UI Components
- **Button** - Accessible button with multiple variants
- **Link** - Accessible link component
- **Modal** - Accessible modal dialog with focus trap
- **Tabs** - Keyboard-navigable tab component
- **DataTable** - Accessible data table with sorting
- **Toast** - Accessible toast notification system
- **ToastProvider** - Context provider for toast notifications

### Hooks
- **useFocusTrap** - Trap focus within a container
- **useFocusReturn** - Return focus to previous element
- **useAriaLive** - Manage ARIA live regions for announcements

### Utilities
- **aria** - ARIA attribute utilities
- **keyboard** - Keyboard event utilities
- **focus** - Focus management utilities

### Design Tokens
- **colors** - Color palette and theme tokens
- **typography** - Typography scale and font tokens
- **spacing** - Spacing scale tokens
- **breakpoints** - Responsive breakpoint tokens
- **motion** - Animation and transition tokens

## Documentation

📚 **[View Full Documentation & Storybook](https://ui.a11ypros.com/storybook)**

Browse all components, see live examples, and explore accessibility features in our interactive Storybook documentation.

## Usage Examples

### Form with Validation

```tsx
import { Input, Button, Label } from '@a11ypros/a11y-ui-components';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <form>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        required
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from '@a11ypros/a11y-ui-components';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
        <Button onClick={() => setIsOpen(false)}>Confirm</Button>
      </Modal>
    </>
  );
}
```

### Toast Notifications

```tsx
import { ToastProvider, useToast, Button } from '@a11ypros/a11y-ui-components';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() =>
        addToast({
          message: 'Action completed successfully!',
          type: 'success',
        })
      }
    >
      Show Toast
    </Button>
  );
}
```

## Important Note on Accessibility

> **Note**: While these components are built with accessibility in mind and meet WCAG 2.1/2.2 Level AA standards, **simply using these components does not guarantee an accessible application**. These components are foundational building blocks that must be used properly within the larger consuming application with accessibility in mind.

To ensure your application is truly accessible, consider:

- **Proper Implementation**: Use components according to their documented patterns and accessibility guidelines
- **Application-Level Considerations**: Ensure proper page structure, heading hierarchy, and landmark regions
- **Content Accessibility**: Write clear, descriptive text and provide alternative text for images
- **Testing**: Regularly test your application with keyboard navigation and screen readers
- **User Experience**: Consider the full user journey and how components work together

## Internationalization (i18n)

Currently, all screen reader text and ARIA labels are provided in English. Full i18n support is a high-priority feature coming soon to ensure global accessibility.

## Tree Shaking

This package is fully tree-shakeable. Import only what you need:

```tsx
// ✅ Good - tree-shakeable
import { Button } from '@a11ypros/a11y-ui-components';

// ✅ Also good - import specific utilities
import { useFocusTrap } from '@a11ypros/a11y-ui-components';
```

## TypeScript Support

Full TypeScript definitions are included. No need to install `@types` packages.

```tsx
import { Button, ButtonProps } from '@a11ypros/a11y-ui-components';

const props: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  children: 'Click me',
};
```

## Contributing

Contributions are welcome! Please see our [GitHub repository](https://github.com/ryan0122/a11ypros-components) for contribution guidelines.

## License

MIT © [A11y Pros](https://a11ypros.com)

## Links

- 📦 [npm package](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
- 📚 [Documentation & Storybook](https://ui.a11ypros.com/storybook)
- 🐛 [Issue Tracker](https://github.com/ryan0122/a11ypros-components/issues)
- 💻 [Source Code](https://github.com/ryan0122/a11ypros-components)

