const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

// https://fettblog.eu/typescript-hasownproperty/
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function getImageSrc(str: string): string {
  return str.toLowerCase().replace(/[-\s]/g, '_')
}

export function toSnakeCase(str: string): string {
  return str
    .match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    )!
    .map((x) => x.toLowerCase())
    .join('_')
}

export function toCapitalized(str: string): string {
  return str
    .toLowerCase()
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (x) => x.toUpperCase())
}

export function toConstCase(str: string): string {
  return str.replace(/[-\s]/g, '_').toUpperCase()
}

export function splitPerCapitalCase(str: string): string {
  return str
    .replace(/[_-\s]/g, '')
    .split(/(?=[A-Z])/g)
    .join(' ')
}

if (process.env.NODE_ENV === 'test' && import.meta.vitest) {
  const { test } = import.meta.vitest

  test('validateEmail returns false for non-emails', () => {
    expect(validateEmail(undefined)).toBe(false)
    expect(validateEmail(null)).toBe(false)
    expect(validateEmail('')).toBe(false)
    expect(validateEmail('not-an-email')).toBe(false)
    expect(validateEmail('n@')).toBe(false)
  })

  test('validateEmail returns true for emails', () => {
    expect(validateEmail('jody@jodygeraldo.com')).toBe(true)
  })

  test('getImageSrc returns lowercase snake case', () => {
    expect(getImageSrc('ImaGe')).toBe('image')
    expect(getImageSrc('Image Image')).toBe('image_image')
    expect(getImageSrc('Image-Image')).toBe('image_image')
    expect(getImageSrc('Image Image')).toBe('image_image')
  })

  test('toSnakeCase returns lowercase snake case', () => {
    expect(toSnakeCase('SnakeCase')).toBe('snake_case')
    expect(toSnakeCase('Snake Case')).toBe('snake_case')
    expect(toSnakeCase('snake case')).toBe('snake_case')
    expect(toSnakeCase('snake-case')).toBe('snake_case')
  })

  test('toCapitalized returns capitalize case', () => {
    expect(toCapitalized('capitalized')).toBe('Capitalized')
    expect(toCapitalized('tWo words')).toBe('Two Words')
    expect(toCapitalized('tWo-words')).toBe('Two Words')
    expect(toCapitalized('tWo_words')).toBe('Two Words')
  })

  test('toConstCase returns capitalize case', () => {
    expect(toConstCase('constcase')).toBe('CONSTCASE')
    expect(toConstCase('const case')).toBe('CONST_CASE')
    expect(toConstCase('CONST-case')).toBe('CONST_CASE')
    expect(toConstCase('const_case')).toBe('CONST_CASE')
    expect(toConstCase('const_case')).toBe('CONST_CASE')
  })

  test('splitPerCapitalCase return splitted capital character', () => {
    expect(splitPerCapitalCase('sPlIttEd')).toBe('s Pl Itt Ed')
    expect(splitPerCapitalCase('s Pl IttEd')).toBe('s Pl Itt Ed')
    expect(splitPerCapitalCase('s-Pl_IttEd')).toBe('s Pl Itt Ed')
  })

  test('hasOwnProperty return true if object has own property else false', () => {
    const obj = {
      foo: 'bar',
    }

    expect(hasOwnProperty(obj, 'foo')).toBe(true)
    expect(hasOwnProperty(obj, 'bar')).toBe(false)
  })
}
