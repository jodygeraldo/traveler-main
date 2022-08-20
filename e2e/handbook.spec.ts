import {
  upsertCharacter,
  upsertCharacterTrack,
} from '~/models/character.server'
import { cleanup, expect, test, users } from './fixtures'

async function setupCharacterProgression(accountId: string) {
  await upsertCharacter({
    name: 'Bennett',
    progression: {
      level: 80,
      ascension: 6,
      normalAttack: 8,
      elementalSkill: 9,
    },
    accountId,
  })
  await upsertCharacterTrack({
    name: 'Bennett',
    elementalBurst: 10,
    accountId,
  })
}

test('Handbook page flow', async ({ page }, testInfo) => {
  const accountId = users[testInfo.workerIndex].accountId
  await cleanup(accountId)

  // * Should display clean first handbook page
  await page.goto('/handbook')
  await expect(page).toHaveURL('/handbook')
  await expect(page.locator('[data-testid=stat-0]')).toHaveText('0')
  await expect(page.locator('[data-testid=stat-1]')).toHaveText('0')
  await expect(page.locator('[data-testid=stat-2]')).toHaveText('0')
  await expect(page.locator('text=No tracked character')).toBeVisible()
  await expect(page.locator('text=Track a character')).toBeVisible()
  await expect(page.locator('text=Combined track materials')).toBeHidden()

  // * Should able to change server
  await page.locator('[data-testid="server-select"]').click()
  await page.locator('[data-testid="server-option-ASIA"]').click()
  await expect(page.locator('text=ASIA reset in')).toBeVisible()

  // Setup character progression to test handbook page
  await setupCharacterProgression(accountId)
  // refresh page
  await page.goto('/handbook')

  // * Stats should updated after character edited
  await expect(page.locator('[data-testid=stat-0]')).toHaveText('1')
  await expect(page.locator('[data-testid=stat-1]')).toHaveText('0')
  await expect(page.locator('[data-testid=stat-2]')).toHaveText('2')

  // * Should display top priority track characters
  await expect(page.locator('text=Bennett')).toBeVisible()
  await expect(page.locator('text=Elemental Burst')).toBeVisible()
  await expect(page.locator('text=Elemental Skill')).toBeHidden()

  // * Materials should be displayed if there is any
  await expect(page.locator('text=Combined track materials')).toBeVisible()
})
