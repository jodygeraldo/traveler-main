import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

test.describe('auth flow', () => {
  test.describe.configure({ mode: 'serial' })

  const EMAIL = 'test@test.com'
  const PASSWORD = 'test1234'

  test.beforeEach(async ({ page }) => {
    await page.goto('.')
  })

  // cleanup user
  test.beforeAll(
    async () =>
      await prisma.user
        .delete({
          where: { email: EMAIL },
        })
        .catch(() => {})
  )

  // cleanup user
  test.afterAll(
    async () =>
      await prisma.user
        .delete({
          where: { email: EMAIL },
        })
        .catch(() => {})
  )

  test('landing page should have a correct title', async ({ page }) => {
    await expect(
      page.locator('text=Companion For Genshin Impact Nerds')
    ).toBeVisible()
  })

  test('can go to sign up page and create an account', async ({
    page,
  }, testInfo) => {
    // click sign up button to go to /join
    await page.locator('#signup').click()
    await expect(page).toHaveURL('/join')
    await expect(page.locator('text=Sign up new account')).toBeVisible()

    // filling input
    await page.locator('#email').fill(EMAIL)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#confirm-password').fill(PASSWORD)
    await page.locator('#signup').click()
    await expect(page).toHaveURL('/character')

    // logout
    await page.locator('#avatar-dropdown').click()
    await page.locator('#signout').click()
    await expect(page).toHaveURL('.')
  })

  test('can go to login page and sign in', async ({ page }) => {
    // click sign in button to go to /login
    await page.locator('#signin').click()
    await expect(page).toHaveURL('/login')
    await expect(page.locator('text=Sign in to your account')).toBeVisible()

    // filling input
    await page.locator('#email').fill(EMAIL)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#signin').click()
    await expect(page).toHaveURL('/character')

    // logout
    await page.locator('#avatar-dropdown').click()
    await page.locator('#signout').click()
    await expect(page).toHaveURL('.')
  })
})
