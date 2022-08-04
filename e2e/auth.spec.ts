import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

async function cleanupUser(email: string) {
  await prisma.user
    .delete({
      where: { email },
    })
    .catch(() => {})
}

test.describe.skip(() => {
  const EMAIL = 'test@test.com'
  const PASSWORD = 'test1234'

  test.beforeAll(async () => await cleanupUser(EMAIL))
  test.afterAll(async () => await cleanupUser(EMAIL))

  test('auth flow', async ({ page }) => {
    // * landing page should have a correct title
    await page.goto('.')
    await expect(
      page.locator('text=Companion For Genshin Impact Nerds')
    ).toBeVisible()

    // * can go to sign up page and create an account
    await page.click('#signup')
    await expect(page).toHaveURL('/join')
    await expect(page.locator('text=Sign up new account')).toBeVisible()

    await page.fill('#email', EMAIL)
    await page.fill('#password', PASSWORD)
    await page.fill('#confirm-password', PASSWORD)
    await Promise.all([page.waitForNavigation(), page.click('#signup')])
    await expect(page).toHaveURL('/character')

    await page.click('#avatar-dropdown')
    await page.click('#signout')
    await expect(page).toHaveURL('.')

    // * can go to login page and sign in
    await page.click('#signin')
    await expect(page).toHaveURL('/login')
    await expect(page.locator('text=Sign in to your account')).toBeVisible()

    await page.fill('#email', EMAIL)
    await page.fill('#password', PASSWORD)
    await Promise.all([page.waitForNavigation(), page.click('#signin')])
    await expect(page).toHaveURL('/character')

    await page.click('#avatar-dropdown')
    await Promise.all([page.waitForNavigation(), page.click('#signout')])
    await expect(page).toHaveURL('.')
  })
})
