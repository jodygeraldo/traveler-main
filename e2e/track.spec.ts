import { cleanup, expect, test, users } from './fixtures'

test('Track page flow', async ({ page }, testInfo) => {
  const currentUser = users[testInfo.workerIndex]
  await cleanup(currentUser.accountId)

  // * Should display empty state
  await page.goto('/track')
  await expect(page).toHaveURL('/track')
  await expect(page.locator('[data-testid="empty-state"]')).toBeVisible()

  // * Should able to add new track
  await page.locator('text=Track a character').click()
  await expect(page).toHaveURL('/track/add')
  await page.locator('input[role="combobox"]').fill('bennett')
  await page.locator('ul[role="listbox"] div:has-text("Bennett")').click()
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes('api/get-character-progression') &&
        response.request().method() === 'GET'
    ),
    page.locator('button:has-text("Track")').click(),
  ])

  await page.locator('input[name="level"]').fill('40')
  await page.locator('input[name="ascension"]').fill('2')
  await page.locator('input[name="normalAttack"]').fill('10')
  await page.locator('input[name="elementalSkill"]').fill('10')
  await page.locator('input[name="elementalBurst"]').fill('10')

  await Promise.all([
    page.waitForResponse((response) => response.status() === 400),
    page.locator('button:has-text("Track")').click(),
  ])

  await expect(
    page.locator('text=Maximum normal attack on ascension 2 is 2')
  ).toBeVisible()
  await expect(
    page.locator('text=Maximum elemental skill on ascension 2 is 2')
  ).toBeVisible()
  await expect(
    page.locator('text=Maximum elemental burst on ascension 2 is 2')
  ).toBeVisible()

  await page.locator('input[name="normalAttack"]').fill('2')
  await page.locator('input[name="elementalSkill"]').fill('2')
  await page.locator('input[name="elementalBurst"]').fill('2')
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes('_data') &&
        response.request().method() === 'GET'
    ),
    page.locator('button:has-text("Track")').click(),
  ])
  await expect(page).toHaveURL('/track')

  await page.locator('text=Bennett').click()
  await expect(page).toHaveURL('/track/Bennett')
  await expect(page.locator('text=Bennett')).toBeVisible()
  await expect(page.locator('h4:has-text("Ascension")')).toBeVisible()

  await page.locator('text=Increase level').click()
  await page.locator('text=Decrease level').click()
  await page.locator('text=Increase level').click()
  await page.locator('text=Increase level').click()
  await expect(page.locator('text=Increase level')).toHaveCount(3)

  await page.locator('text=Increase level').first().click()
  await expect(page.locator('h4:has-text("Normal Attack")')).toBeHidden()

  await page.locator('text=Edit level').click()
  await page.locator('input[name="editElementalBurst"]').fill('2')
  await page.locator('text=Save changes').click()
  await page.locator('[aria-label="Close"]').click()

  await page.locator('[data-testid="breadcrumb-back-button"]').click()
  await expect(page).toHaveURL('/track')

  await page.locator('a:has-text("Edit")').click()
  await expect(page).toHaveURL('/track/update/Bennett')

  await page.locator('input[name="level"]').fill('50')
  await page.locator('button:has-text("Update")').click()
  await expect(page).toHaveURL('/track')

  await page.locator('text=delete').click()
  await expect(page).toHaveURL('/track')
  await expect(page.locator('text=Bennett')).toBeHidden()
})
