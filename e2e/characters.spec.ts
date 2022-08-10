import prisma from '~/db.server'
import { expect, test, users } from './fixtures'

test('Characters page flow', async ({ page }, testInfo) => {
  const currentUser = users[testInfo.workerIndex]
  await prisma.user
    .update({
      where: { email: currentUser.email },
      data: {
        accounts: {
          update: {
            where: { id: currentUser.accountId },
            data: {
              characters: { deleteMany: {} },
            },
          },
        },
      },
    })
    .catch((e) => console.error(e))

  // * all characters should be displayed
  await page.goto('/character')
  const characterLen = await prisma.character.count()
  await expect(page.locator('[data-testid="grid-view"] > li')).toHaveCount(
    characterLen
  )

  // * can filter characters
  await page.locator('[aria-label="Pyro"]').click()
  await page.locator('[aria-label="4 stars"]').click()
  await expect(page.locator('[aria-label="Pyro"]')).toHaveAttribute(
    'aria-checked',
    'true'
  )
  await expect(page.locator('#Albedo-character-page-link')).toBeHidden()
  await expect(page.locator('#Diluc-character-page-link')).toBeHidden()
  await expect(page.locator('#Amber-character-page-link')).toBeVisible()

  // * can search for characters
  await page.locator('#search').fill('Bennett')
  await expect(page.locator('[data-testid="grid-view"] > li')).toHaveCount(1)
  await expect(page.locator('#Amber-character-page-link')).toBeHidden()
  await expect(page.locator('#Bennett-character-page-link')).toBeVisible()

  // * can do quick level update
  await page.locator('text=Edit level').click()

  await page.locator('input[name="level"]').fill('40')
  await page.locator('input[name="ascension"]').fill('2')
  await page.locator('input[name="normalAttack"]').fill('6')
  await page.locator('input[name="elementalSkill"]').fill('6')
  await page.locator('input[name="elementalBurst"]').fill('6')

  await page.locator('button:has-text("Save changes")').click()

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
    page.locator('button:has-text("Save changes")').click(),
  ])

  await page.locator('[aria-label="Close"]').click()
  await expect(page.locator('text=Lv. 40')).toBeVisible()
  await expect(page.locator('text=Ascension 2')).toBeVisible()
  await expect(
    page.locator('[data-testid="normal_attack_bennett"]')
  ).toHaveText('2')
  await expect(
    page.locator('[data-testid="elemental_skill_bennett"]')
  ).toHaveText('2')
  await expect(
    page.locator('[data-testid="elemental_burst_bennett"]')
  ).toHaveText('2')
})
