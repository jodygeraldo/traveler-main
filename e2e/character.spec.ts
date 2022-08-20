import { cleanup, expect, test, users } from './fixtures'

test('Character page flow', async ({ page }, testInfo) => {
  const currentUser = users[testInfo.workerIndex]
  await cleanup(currentUser.accountId)

  // * should display character profile
  await page.goto('/character')
  await page.locator('[data-testid="Bennett-character-page-link"]').click()
  await expect(page).toHaveURL('/character/Bennett/profile')
  await expect(page.locator('text=Bennett')).toBeVisible()
  await expect(page.locator('img[alt="SWORD"]')).toBeVisible()
  await expect(page.locator('img[alt="PYRO"]')).toBeVisible()
  await expect(page.locator('span:has-text("4-STARS")')).toBeVisible()
  await expect(page.locator('span:has-text("MONDSTADT")')).toBeVisible()
  await expect(
    page.locator(
      "text=A good-natured adventurer from Mondstadt who's unfortunately extremely unlucky."
    )
  ).toBeVisible()

  // * should display character required items table
  await page.locator('a:has-text("Material")').click()
  await expect(page).toHaveURL('/character/Bennett/material')

  await expect(page.locator('h1:has-text("Bennett")')).toBeVisible()
  await expect(page.locator('h2:has-text("Ascension")')).toBeVisible()
  await expect(page.locator('h2:has-text("Talent")')).toBeVisible()
  await expect(page.locator('img[alt="Mora"]')).toHaveCount(15)
})
