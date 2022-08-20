import { cleanup, expect, test, users } from './fixtures'

test.skip('Handbook page flow', async ({ page }, testInfo) => {
  const currentUser = users[testInfo.workerIndex]
  await cleanup(currentUser.accountId)

  // * Should display clean first handbook page
  await page.goto('/handbook')
  await expect(page).toHaveURL('/handbook')
  await expect(page.locator('.text-8xl').first()).toHaveText('0')
  await expect(page.locator('text=Track a character')).toBeVisible()

  // TODO: Should able to change server
  // TODO: Stats should updated after character edited
  // TODO: Should display top priority track characters
  // TODO: Materials should be displayed if there is any
})
