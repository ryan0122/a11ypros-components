import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An accessible accordion component built with native HTML5 details/summary elements. Supports keyboard navigation and screen readers with proper ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default accordion with multiple items. Only one item can be open at a time.
 */
export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="item-1" title="What is accessibility?">
        <p>
          Accessibility (often abbreviated to a11y) is the practice of making your websites
          usable by as many people as possible. This includes people with disabilities,
          people using mobile devices, and people with slow network connections.
        </p>
      </AccordionItem>
      <AccordionItem id="item-2" title="Why is accessibility important?">
        <p>
          Web accessibility is essential for developers and organizations that want to create
          high-quality websites and web tools, and not exclude people from using their products
          and services. It's also legally required in many jurisdictions.
        </p>
      </AccordionItem>
      <AccordionItem id="item-3" title="How do I make my site accessible?">
        <p>
          Follow the WCAG (Web Content Accessibility Guidelines) standards. Use semantic HTML,
          provide proper ARIA labels, ensure keyboard navigation works, maintain sufficient
          color contrast, and test with screen readers.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion with one item initially open.
 */
export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="item-1" title="Getting Started" defaultOpen>
        <p>
          This section is open by default. Click the header to collapse it.
        </p>
      </AccordionItem>
      <AccordionItem id="item-2" title="Installation">
        <p>
          Install the package using npm, yarn, or pnpm.
        </p>
      </AccordionItem>
      <AccordionItem id="item-3" title="Configuration">
        <p>
          Configure the component according to your needs.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion that allows multiple items to be open simultaneously.
 */
export const AllowMultiple: Story = {
  render: () => (
    <Accordion allowMultiple>
      <AccordionItem id="item-1" title="Features">
        <ul>
          <li>Fully accessible with keyboard navigation</li>
          <li>Screen reader friendly with semantic HTML</li>
          <li>Smooth animations with reduced motion support</li>
          <li>Dark mode support</li>
        </ul>
      </AccordionItem>
      <AccordionItem id="item-2" title="Benefits">
        <ul>
          <li>Easy to use and integrate</li>
          <li>WCAG 2.1/2.2 Level AA compliant</li>
          <li>Built with native HTML5 elements</li>
          <li>No JavaScript required for basic functionality</li>
        </ul>
      </AccordionItem>
      <AccordionItem id="item-3" title="Use Cases">
        <ul>
          <li>FAQ sections</li>
          <li>Documentation</li>
          <li>Product features</li>
          <li>Settings panels</li>
        </ul>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion with rich content including images and formatted text.
 */
export const RichContent: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="item-1" title="Introduction to WCAG">
        <p>
          <strong>Web Content Accessibility Guidelines (WCAG)</strong> is developed through the
          W3C process in cooperation with individuals and organizations around the world.
        </p>
        <p>
          The goal of WCAG is to provide a single shared standard for web content accessibility
          that meets the needs of individuals, organizations, and governments internationally.
        </p>
      </AccordionItem>
      <AccordionItem id="item-2" title="WCAG Principles">
        <h4>The Four Principles (POUR)</h4>
        <ol>
          <li><strong>Perceivable</strong> - Information and user interface components must be presentable to users in ways they can perceive.</li>
          <li><strong>Operable</strong> - User interface components and navigation must be operable.</li>
          <li><strong>Understandable</strong> - Information and the operation of user interface must be understandable.</li>
          <li><strong>Robust</strong> - Content must be robust enough that it can be interpreted reliably by a wide variety of user agents.</li>
        </ol>
      </AccordionItem>
      <AccordionItem id="item-3" title="Conformance Levels">
        <ul>
          <li><strong>Level A</strong> - Minimum level of conformance</li>
          <li><strong>Level AA</strong> - Recommended level (most common target)</li>
          <li><strong>Level AAA</strong> - Highest level of conformance</li>
        </ul>
        <p>
          Most organizations aim for Level AA compliance as it provides a good balance between
          accessibility and practical implementation.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Single accordion item demonstration.
 */
export const SingleItem: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="single" title="Click to expand">
        <p>
          This is a single accordion item. The Accordion component can contain one or multiple
          AccordionItem components.
        </p>
      </AccordionItem>
    </Accordion>
  ),
};
