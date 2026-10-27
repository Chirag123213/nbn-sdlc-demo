import { zodResolver } from '@hookform/resolvers/zod'
import { describe, expect, it } from 'vitest'
import { loginSchema, signupSchema } from '@/lib/validations/auth'

const options = {
  fields: {},
  shouldUseNativeValidation: false,
}

describe('Authentication form validation', () => {
  it('returns field errors for invalid sign-in input', async () => {
    const result = await zodResolver(loginSchema)(
      { email: 'invalid-email', password: '' },
      undefined,
      options
    )

    expect(result.values).toEqual({})
    expect(result.errors.email?.message).toBe('Please enter a valid email address')
    expect(result.errors.password?.message).toBe('Password is required')
  })

  it('returns valid sign-in values to the form', async () => {
    const values = { email: 'developer@example.com', password: 'ExamplePassword1' }
    const result = await zodResolver(loginSchema)(values, undefined, options)

    expect(result.errors).toEqual({})
    expect(result.values).toEqual(values)
  })

  it('attaches a password mismatch to the confirmation field', async () => {
    const result = await zodResolver(signupSchema)(
      {
        displayName: 'Developer',
        email: 'developer@example.com',
        password: 'ExamplePassword1',
        confirmPassword: 'DifferentPassword2',
      },
      undefined,
      options
    )

    expect(result.values).toEqual({})
    expect(result.errors.confirmPassword?.message).toBe('Passwords do not match')
  })
})
