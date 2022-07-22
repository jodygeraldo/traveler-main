import { expect, test } from '@playwright/test'
import prisma from '~/db.server'
import { createUser } from '~/models/user.server'

test.describe('apps', () => {
  test.describe.configure({ mode: 'serial' })

  const EMAIL = 'test2@test.com'
  const PASSWORD = 'test1234'

  test.beforeAll(async () => {
    // cleanup user
    await prisma.user
      .delete({
        where: { email: EMAIL },
      })
      .catch(() => {})

    // create new user
    await createUser(EMAIL, PASSWORD)
  })

  // login
  test.beforeEach(async ({ page }) => {
    await page.goto('.')
    await page.locator('#signin').click()
    await expect(page).toHaveURL('/login')
    await expect(page.locator('text=Sign in to your account')).toBeVisible()

    await page.locator('#email').fill(EMAIL)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#signin').click()
    await expect(page).toHaveURL('/character')
  })

  test.describe('character page', () => {
    test('all characters should be displayed', async ({ page }) => {
      const characterLen = await prisma.character.count()
      const selector = '#grid-view > li'
      await page.waitForSelector(selector)
      expect(await page.locator(selector).count()).toBe(characterLen)
    })

    test('can switch character view', async ({ page }) => {
      await page.locator('#switch-list-view').click()
      await expect(page.locator('#list-view')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeVisible()

      await page.locator('#switch-grid-view').click()
      await expect(page.locator('#grid-view')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeVisible()
    })

    test('can search for characters', async ({ page }) => {
      await page.locator('#search').fill('Amber')
      await expect(page.locator('#Amber-character-page-link')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeHidden()
    })

    test('can go to bulk update page and update Albedo and Amber', async ({
      page,
    }) => {
      await page.locator('#bulk-update').click()
      await expect(page).toHaveURL('/character/bulk-update')

      const ALBEDO = {
        LEVEL: '90',
        ASCENSION: '6',
      }

      const AMBER = {
        LEVEL: '60',
        ASCENSION: '3',
        NORMAL_ATTACK: '2',
        ELEMENTAL_SKILL: '2',
        ELEMENTAL_BUSRT: '2',
      }

      await page.locator('#Albedo-level').fill(ALBEDO.LEVEL)
      await page.locator('#Albedo-ascension').fill(ALBEDO.ASCENSION)

      await page.locator('#Amber-level').fill(AMBER.LEVEL)
      await page.locator('#Amber-ascension').fill(AMBER.ASCENSION)
      await page.locator('#Amber-normal-attack').fill(AMBER.NORMAL_ATTACK)
      await page.locator('#Amber-elemental-skill').fill(AMBER.ELEMENTAL_SKILL)
      await page.locator('#Amber-elemental-burst').fill(AMBER.ELEMENTAL_BUSRT)

      await page.locator('button[type="submit"]').first().click()
      await expect(page).toHaveURL('/character')

      await page.locator('#bulk-update').click()
      await expect(page).toHaveURL('/character/bulk-update')

      await expect(page.locator('#Albedo-level')).toHaveValue(ALBEDO.LEVEL)
      await expect(page.locator('#Albedo-ascension')).toHaveValue(
        ALBEDO.ASCENSION
      )

      await expect(page.locator('#Amber-normal-attack')).toHaveValue(
        AMBER.NORMAL_ATTACK
      )
      await expect(page.locator('#Amber-elemental-skill')).toHaveValue(
        AMBER.ELEMENTAL_SKILL
      )
      await expect(page.locator('#Amber-elemental-burst')).toHaveValue(
        AMBER.ELEMENTAL_BUSRT
      )
    })
  })

  test.describe('inventory page', () => {
    test('can go to inventory page', async ({ page }) => {
      await page.locator('#Inventory-link-desktop').click()
      await expect(page).toHaveURL('/inventory/all')
      await expect(page.locator('h1:has-text("Inventory")')).toBeVisible()
    })

    const ITEM = [
      {
        SELECTOR: '#quantity-teachings_of_freedom',
        QUANTITY: '100',
      },
      {
        SELECTOR: '#quantity-tail_of_boreas',
        QUANTITY: '10',
      },
      {
        SELECTOR: '#quantity-dream_solvent',
        QUANTITY: '17',
      },
      {
        SELECTOR: '#quantity-whopperflower_nectar',
        QUANTITY: '4',
      },
      {
        SELECTOR: '#quantity-shivada_jade_sliver',
        QUANTITY: '6',
      },
      {
        SELECTOR: '#quantity-qingxin',
        QUANTITY: '5',
      },
    ] as const

    test('can update quantity of items', async ({ page }) => {
      await page.locator('#Inventory-link-desktop').click()
      await expect(page).toHaveURL('/inventory/all')

      await page.locator(ITEM[0].SELECTOR).fill(ITEM[0].QUANTITY)
      await page.waitForTimeout(500)
      await page.locator('#talent_book-link').click()
      await expect(page).toHaveURL('/inventory/talent-book')
      await expect(page.locator(ITEM[0].SELECTOR)).toHaveValue(ITEM[0].QUANTITY)

      await page.locator('#all-link').click()
      await expect(page).toHaveURL('/inventory/all')

      await page.locator(ITEM[3].SELECTOR).fill(ITEM[3].QUANTITY)
      await page.locator(ITEM[4].SELECTOR).fill(ITEM[4].QUANTITY)
      await page.locator(ITEM[5].SELECTOR).fill(ITEM[5].QUANTITY)

      await page.locator(ITEM[1].SELECTOR).fill(ITEM[1].QUANTITY)
      await page.waitForTimeout(500)
      await page.locator('#talent_boss-link').click()
      await expect(page).toHaveURL('/inventory/talent-boss')
      await expect(page.locator(ITEM[1].SELECTOR)).toHaveValue(ITEM[1].QUANTITY)
    })

    test('can search for items', async ({ page }) => {
      await page.locator('#Inventory-link-desktop').click()
      await expect(page).toHaveURL('/inventory/all')

      await page.locator(ITEM[2].SELECTOR).fill(ITEM[2].QUANTITY)
      await page.waitForTimeout(500)

      await page.locator('#search').fill('crown of')
      await expect(page.locator(ITEM[2].SELECTOR)).toHaveValue(ITEM[2].QUANTITY)
      await expect(page.locator(`#quantity-slime_condensate`)).toBeHidden()
    })
  })

  test.describe.skip('alchemy page', () => {
    test('can go to alchemy crafting page', async ({ page }) => {
      await page.locator('#Alchemy-link-desktop').click()
      await expect(page).toHaveURL('/alchemy/crafting/all')
      await expect(
        page.locator('h1:has-text("Alchemy Crafting")')
      ).toBeVisible()
    })

    test('can craft item', async ({ page }) => {
      await page.locator('#Alchemy-link-desktop').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL('/alchemy/crafting/all')

      await page.locator('#guide_to_freedom-link').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL(
        '/alchemy/crafting/all/craft-talent/Guide%20to%20Freedom'
      )
      await page.locator('input[name="quantity"]').fill('18')
      await page.locator('input[name="bonusQuantity"]').fill('2')
      await page.locator('select[name="bonusType"]').selectOption('Bonus')

      await page.locator('#craft').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL('/alchemy/crafting/all')

      await page.goto('/alchemy/crafting/talent')
      // quantity + bonusQuantity(2)
      await expect(page.locator('#guide_to_freedom-quantity')).toHaveText('20')
      // (ITEM[0]) -> 100 - quantity * 3
      await expect(page.locator('#teachings_of_freedom-quantity')).toHaveText(
        '46'
      )

      await page.locator('#guide_to_freedom-link').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL(
        '/alchemy/crafting/talent/craft-talent/Guide%20to%20Freedom'
      )
      await page.locator('input[name="quantity"]').fill('1')
      await page.locator('input[name="bonusQuantity"]').fill('1')
      await page.locator('select[name="bonusType"]').selectOption('Refund')

      await page.locator('#craft').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL('/alchemy/crafting/talent')

      // 20 + quantity
      await expect(page.locator('#guide_to_freedom-quantity')).toHaveText('21')
      // (ITEM[0]) -> 46 - (quantity(1) * 3) + bonusQuantity(1) refund
      await expect(page.locator('#teachings_of_freedom-quantity')).toHaveText(
        '44'
      )
    })

    test('can convert item', async ({ page }) => {
      await page.goto('/alchemy/converting/all')

      await page.locator('#ring_of_boreas-link').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL(
        '/alchemy/converting/all/convert-boss/Ring%20of%20Boreas'
      )
      await page.locator('input[name="quantity"]').fill('2')

      await page.locator('#convert').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL('/alchemy/converting/all')

      await page.goto('/alchemy/converting/talent-boss')
      // quantity(2)
      await expect(page.locator('#ring_of_boreas-quantity')).toHaveText('2')
      // ITEM[3] -> 17 - quantity(2)
      await expect(page.locator('#dream_solvent-quantity')).toHaveText('15')
      // ITEM[2] -> 10 - quantity(2)
      await expect(page.locator('#tail_of_boreas-quantity')).toHaveText('8')

      await page.locator('#tail_of_boreas-link').click()
      await page.waitForTimeout(500)
      await expect(page).toHaveURL(
        '/alchemy/converting/talent-boss/convert-boss/Tail%20of%20Boreas'
      )
      await page.locator('input[name="quantity"]').fill('1')

      await page.locator('#convert').click()
      await page.waitForTimeout(500)
      await page.goto('/alchemy/converting/talent-boss')
      // 2 - quantity(1)
      await expect(page.locator('#ring_of_boreas-quantity')).toHaveText('1')
      // ITEM[3] -> 15 - quantity(1)
      await expect(page.locator('#dream_solvent-quantity')).toHaveText('14')
      // ITEM[2] -> 8 + quantity(1)
      await expect(page.locator('#tail_of_boreas-quantity')).toHaveText('9')
    })
  })

  test.describe('character level up pages', () => {
    test('should display character required items table', async ({ page }) => {
      await page.locator('#Ganyu-character-page-link').click()
      await page.waitForTimeout(500)
      expect(page).toHaveURL('/character/Ganyu/required-items')
      await expect(page.locator('h1:has-text("Ganyu")')).toBeVisible()
      await expect(page.locator('h2:has-text("Ascension")')).toBeVisible()
      await expect(page.locator('h2:has-text("Talent")')).toBeVisible()
    })

    test('should able to level up manually', async ({ page }) => {
      await page.locator('#Ganyu-character-page-link').click()
      await page.waitForTimeout(500)
      await page.locator('#manual_level_up-link').click()
      await page.waitForTimeout(500)
      expect(page).toHaveURL('/character/Ganyu/manual-levelup')

      await page.locator('#level').fill('90')
      await page.locator('#ascension').fill('6')
      await page.locator('#normal-attack').fill('10')
      await page.locator('#elemental-skill').fill('10')
      await page.locator('#elemental-burst').fill('10')
      await page.locator('button[type="submit"]').click()
      await page.waitForTimeout(500)

      await page.reload()
      await page.waitForTimeout(500)

      await expect(page.locator('#level')).toHaveValue('90')
      await expect(page.locator('#ascension')).toHaveValue('6')
      await expect(page.locator('#normal-attack')).toHaveValue('10')
      await expect(page.locator('#elemental-skill')).toHaveValue('10')
      await expect(page.locator('#elemental-burst')).toHaveValue('10')

      // reset
      await page.locator('#level').fill('1')
      await page.locator('#ascension').fill('0')
      await page.locator('#normal-attack').fill('1')
      await page.locator('#elemental-skill').fill('1')
      await page.locator('#elemental-burst').fill('1')
      await page.locator('button[type="submit"]').click()
    })

    test('should able to level up with inventory items', async ({ page }) => {
      await page.locator('#Ganyu-character-page-link').click()
      await page.waitForTimeout(500)
      await page.locator('#inventory_level_up-link').click()
      await page.waitForTimeout(500)
      expect(page).toHaveURL('/character/Ganyu/inventory-levelup')

      await expect(page.locator('text=Required character to 20.')).toBeVisible()
      await page.locator('#jump-level').click()
      await page.waitForTimeout(500)
      await page.locator('#character-level').fill('30')
      await page.locator('button:has-text("Ascend")').click()
      await page.waitForTimeout(500)
      
      await expect(page.locator('text=Required character to 40.')).toBeVisible()
      await expect(
        page.locator('#test-whopperflower_nectar-quantity')
      ).toHaveText('1')
      await expect(
        page.locator('#test-shivada_jade_sliver-quantity')
      ).toBeHidden()
      await expect(page.locator('#test-qingxin-quantity')).toHaveText('2')
    })
  })
})
