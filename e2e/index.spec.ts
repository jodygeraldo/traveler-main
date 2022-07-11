import { expect, test } from '@playwright/test'

let baseURL = process.env.URL || 'http://localhost:3000'

test.describe('index', () => {
  test('can navigate to the sign up page', async ({ page }) => {
    await page.goto(baseURL)

    await page.locator("a[href='/join']").click()

    await expect(page.locator('text=Sign up new account')).toBeVisible()
  })

  test('can navigate to the log in page', async ({ page }) => {
    await page.goto(baseURL)

    await page.locator("a[href='/login']").click()

    await expect(page.locator('text=Sign in to your account')).toBeVisible()
  })
})
