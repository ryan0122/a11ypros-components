import { describe, it, expect, vi } from 'vitest'
import { render, screen, runAxeTest } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  describe('rendering', () => {
    it('renders input with label', () => {
      render(<Input label="Email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('renders input without label', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders helper text', () => {
      render(<Input label="Username" helperText="Must be unique" />)
      expect(screen.getByText('Must be unique')).toBeInTheDocument()
    })

    it('renders error message', () => {
      render(<Input label="Email" error="Invalid email" />)
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Input label="Name" className="custom-class" />)
      const input = screen.getByLabelText('Name')
      expect(input).toHaveClass('custom-class')
    })
  })

  describe('states', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input label="Name" disabled />)
      expect(screen.getByLabelText('Name')).toBeDisabled()
    })

    it('is required when required prop is true', () => {
      render(<Input label="Email" required />)
      expect(screen.getByLabelText(/Email/)).toBeRequired()
    })

    it('applies error class when error is present', () => {
      render(<Input label="Email" error="Invalid" />)
      expect(screen.getByLabelText('Email')).toHaveClass('form-input--error')
    })
  })

  describe('interactions', () => {
    it('calls onChange when value changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input label="Name" onChange={handleChange} />)

      await user.type(screen.getByLabelText('Name'), 'John')
      expect(handleChange).toHaveBeenCalled()
    })

    it('updates value when controlled', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<Input label="Name" value="John" onChange={vi.fn()} />)
      
      expect(screen.getByLabelText('Name')).toHaveValue('John')

      rerender(<Input label="Name" value="Jane" onChange={vi.fn()} />)
      expect(screen.getByLabelText('Name')).toHaveValue('Jane')
    })
  })

  describe('aria attributes', () => {
    it('associates error with aria-describedby', () => {
      render(<Input label="Email" error="Invalid email" />)
      const input = screen.getByLabelText('Email')
      const describedBy = input.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
    })

    it('associates helper text with aria-describedby', () => {
      render(<Input label="Username" helperText="Must be unique" />)
      const input = screen.getByLabelText('Username')
      const describedBy = input.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
    })

    it('marks invalid when error is present', () => {
      render(<Input label="Email" error="Invalid" />)
      expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input label="Email" type="email" />)
      await runAxeTest(container)
    })

    it('has no violations with error', async () => {
      const { container } = render(<Input label="Email" error="Invalid email" />)
      await runAxeTest(container)
    })

    it('has no violations with helper text', async () => {
      const { container } = render(<Input label="Username" helperText="Helper" />)
      await runAxeTest(container)
    })
  })
})
