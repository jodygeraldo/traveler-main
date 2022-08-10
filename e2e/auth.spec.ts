import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

test('auth flow', async ({ page }) => {
  const email = 'playwright-auth@jodygeraldo.com'
  const password = 'test1234'
  await prisma.user.delete({ where: { email } }).catch((e) => console.log(e))

  // * landing page should have a correct title
  await page.goto('.')
  await expect(
    page.locator('text=Companion For Genshin Impact Nerds')
  ).toBeVisible()

  // * can go to sign up page and create an account
  await page.locator('text=Create new account').click()
  await expect(page).toHaveURL('/join')
  await expect(page.locator('text=Sign up new account')).toBeVisible()

  await page.locator('[placeholder="Email address"]').fill(email)
  await page.locator('[placeholder="Password"]').fill(password)
  await page.locator('[placeholder="Confirm password"]').fill(password)
  await Promise.all([
    page.waitForNavigation(),
    page.locator('button:has-text("Sign up")').click(),
  ])
  await expect(page).toHaveURL('/character')

  await page.locator('[data-testid="avatar-dropdown"]').click()
  await page.locator('button[role="menuitem"]:has-text("Sign out")').click()
  await expect(page).toHaveURL('.')

  // * can go to login page and sign in
  await page.locator('text=Sign in').click()
  await expect(page).toHaveURL('/login')
  await expect(page.locator('text=Sign in to your account')).toBeVisible()

  await page.locator('[placeholder="Email address"]').fill(email)
  await page.locator('[placeholder="Password"]').fill(password)
  await page.locator('button:has-text("Sign in")').click()
  await expect(page).toHaveURL('/character')

  await page.locator('[data-testid="avatar-dropdown"]').click()
  await page.locator('button[role="menuitem"]:has-text("Sign out")').click()
  await expect(page).toHaveURL('.')
})
