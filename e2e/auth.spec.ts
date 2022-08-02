import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

async function cleanupUser(email: string) {
  await prisma.user
    .delete({
      where: { email },
    })
    .catch(() => {})
}

test.describe('auth flow', () => {
  test.describe.configure({ mode: 'serial' })
  const EMAIL = 'test@test.com'
  const PASSWORD = 'test1234'

  test.beforeEach(async ({ page }) => {
    await page.goto('.')
  })

  test.beforeAll(async () => await cleanupUser(EMAIL))
  test.afterAll(async () => await cleanupUser(EMAIL))

  test('landing page should have a correct title', async ({ page }) => {
    await expect(
      page.locator('text=Companion For Genshin Impact Nerds')
    ).toBeVisible()
  })

  test('can go to sign up page and create an account', async ({ page }) => {
    // click sign up button to go to /join
    await page.click('#signup')
    await expect(page).toHaveURL('/join')
    await expect(page.locator('text=Sign up new account')).toBeVisible()

    // filling input
    await page.fill('#email', EMAIL)
    await page.fill('#password', PASSWORD)
    await page.fill('#confirm-password', PASSWORD)
    await Promise.all([page.waitForNavigation(), page.click('#signup')])
    await expect(page).toHaveURL('/character')

    // logout
    await page.click('#avatar-dropdown')
    await page.click('#signout')
    await expect(page).toHaveURL('.')
  })

  test('can go to login page and sign in', async ({ page }) => {
    // click sign in button to go to /login
    await page.click('#signin')
    await expect(page).toHaveURL('/login')
    await expect(page.locator('text=Sign in to your account')).toBeVisible()

    // filling input
    await page.fill('#email', EMAIL)
    await page.fill('#password', PASSWORD)
    await Promise.all([page.waitForNavigation(), page.click('#signin')])
    await expect(page).toHaveURL('/character')

    // logout
    await page.click('#avatar-dropdown')
    await Promise.all([page.waitForNavigation(), page.click('#signout')])
    await expect(page).toHaveURL('.')
  })
})
