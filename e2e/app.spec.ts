import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

test.describe('apps', () => {
  const PASSWORD = 'test1234'

  // login
  test.beforeEach(async ({ page }, testInfo) => {
    const EMAIL = `test${testInfo.line}@test.com`

    await prisma.user
      .delete({
        where: { email: EMAIL },
      })
      .catch(() => {})

    await page.goto('.')
    await page.click('#signup')
    await page.fill('#email', EMAIL)
    await page.fill('#password', PASSWORD)
    await page.fill('#confirm-password', PASSWORD)
    await Promise.all([page.waitForNavigation(), page.click('#signup')])
    await expect(page).toHaveURL('/character')
  })

  // cleanup user
  test.afterEach(async ({ page: _ }, testInfo) => {
    await prisma.user
      .delete({
        where: { email: `test${testInfo.line}@test.com` },
      })
      .catch(() => {})
  })

  test.describe('character page', () => {
    test('all characters should be displayed', async ({ page }) => {
      const characterLen = await prisma.character.count()
      await expect(page.locator('#grid-view > li')).toHaveCount(characterLen)
    })

    test('can switch character view', async ({ page }) => {
      await page.click('#switch-list-view')
      await expect(page.locator('#list-view')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeVisible()

      await page.click('#switch-grid-view')
      await expect(page.locator('#grid-view')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeVisible()
    })

    test('can search for characters', async ({ page }) => {
      await page.fill('#search', 'Amber')
      await expect(page.locator('#Amber-character-page-link')).toBeVisible()
      await expect(page.locator('#Albedo-character-page-link')).toBeHidden()
    })

    test('can go to quick update page and update Albedo and Amber', async ({
      page,
    }) => {
      await page.click('#quick-update')
      await expect(page).toHaveURL('/character/quick-update')

      const ALBEDO = {
        LEVEL: '90',
        ASCENSION: '6',
      }

      await page.fill('#Albedo-level', ALBEDO.LEVEL)
      await page.fill('#Albedo-ascension', ALBEDO.ASCENSION)

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click(`#Albedo-save`),
      ])

      await expect(page.locator('#Albedo-level')).toHaveValue(ALBEDO.LEVEL)
      await expect(page.locator('#Albedo-ascension')).toHaveValue(
        ALBEDO.ASCENSION
      )

      const AMBER = {
        LEVEL: '60',
        ASCENSION: '3',
        NORMAL_ATTACK: '2',
        ELEMENTAL_SKILL: '2',
        ELEMENTAL_BUSRT: '2',
      }

      await page.fill('#Amber-level', AMBER.LEVEL)
      await page.fill('#Amber-ascension', AMBER.ASCENSION)
      await page.fill('#Amber-normal-attack', AMBER.NORMAL_ATTACK)
      await page.fill('#Amber-elemental-skill', AMBER.ELEMENTAL_SKILL)
      await page.fill('#Amber-elemental-burst', AMBER.ELEMENTAL_BUSRT)

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click(`#Amber-save`),
      ])

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

  const ITEM = [
    {
      SELECTOR: '#teachings_of_freedom-quantity',
      QUANTITY: '100',
    },
    {
      SELECTOR: '#tail_of_boreas-quantity',
      QUANTITY: '10',
    },
    {
      SELECTOR: '#dream_solvent-quantity',
      QUANTITY: '17',
    },
  ] as const

  test.describe('inventory page', () => {
    test('can go to inventory page', async ({ page }) => {
      await page.locator('#Inventory-link-desktop').click()
      await expect(page).toHaveURL('/inventory/all')
      await expect(page.locator('h1:has-text("Inventory")')).toBeVisible()
    })

    test('can update quantity of items', async ({ page }) => {
      await page.goto('/inventory/all')

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.fill(ITEM[0].SELECTOR, ITEM[0].QUANTITY),
      ])

      await page.click('#talent_book-link')
      await expect(page).toHaveURL('/inventory/talent-book')
      await expect(page.locator(ITEM[0].SELECTOR)).toHaveValue(ITEM[0].QUANTITY)

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.fill(ITEM[0].SELECTOR, '120'),
      ])

      await page.click('#all-link')
      await expect(page).toHaveURL('/inventory/all')
      await page.locator(ITEM[0].SELECTOR).fill('120')
    })

    test('can search for items', async ({ page }) => {
      await page.goto('/inventory/all')

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        await page.locator(ITEM[2].SELECTOR).fill(ITEM[2].QUANTITY),
      ])

      await page.fill('#search', 'dream sol')
      await expect(page.locator(ITEM[2].SELECTOR)).toHaveValue(ITEM[2].QUANTITY)
      await expect(page.locator(ITEM[0].SELECTOR)).toBeHidden()
    })
  })

  test.describe('alchemy page', () => {
    test('can go to alchemy crafting page', async ({ page }) => {
      await page.click('#Alchemy-link-desktop')
      await expect(page).toHaveURL('/alchemy/crafting/all')
      await expect(
        page.locator('h1:has-text("Alchemy Crafting")')
      ).toBeVisible()
    })

    test('can craft item', async ({ page }) => {
      await page.goto('/inventory/all')

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.fill(ITEM[0].SELECTOR, ITEM[0].QUANTITY),
      ])

      const ITEM_TO_CRAFT = {
        LINK_SELECTOR: '#guide_to_freedom-link',
        QUANTITY_SELECTOR: '#guide_to_freedom-quantity',
        TO_CRAFT: ['18', '1'],
        BONUS: ['2', '1'],
        BONUS_TYPE: ['Bonus', 'Refund'],
      } as const

      await page.goto('/alchemy/crafting/all')

      await page.click(ITEM_TO_CRAFT.LINK_SELECTOR)
      await page.waitForURL(
        '/alchemy/crafting/all/craft-talent/Guide-to-Freedom'
      )
      await page.fill('input[name="quantity"]', ITEM_TO_CRAFT.TO_CRAFT[0])
      await page.fill('input[name="bonusQuantity"]', ITEM_TO_CRAFT.BONUS[0])
      await page.selectOption(
        'select[name="bonusType"]',
        ITEM_TO_CRAFT.BONUS_TYPE[0]
      )

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('#craft'),
      ])

      await expect(page).toHaveURL('/alchemy/crafting/all')

      await page.goto('/alchemy/crafting/talent')

      const FIRST_CRAFT_QUANTITY =
        parseInt(ITEM_TO_CRAFT.TO_CRAFT[0]) + parseInt(ITEM_TO_CRAFT.BONUS[0])
      const FIRST_CRAFTER_QUANTITY =
        parseInt(ITEM[0].QUANTITY) - parseInt(ITEM_TO_CRAFT.TO_CRAFT[0]) * 3

      await expect(page.locator(ITEM_TO_CRAFT.QUANTITY_SELECTOR)).toHaveText(
        FIRST_CRAFT_QUANTITY.toString()
      )
      await expect(page.locator(ITEM[0].SELECTOR)).toHaveText(
        FIRST_CRAFTER_QUANTITY.toString()
      )

      await page.click(ITEM_TO_CRAFT.LINK_SELECTOR)
      await page.waitForURL(
        '/alchemy/crafting/talent/craft-talent/Guide-to-Freedom'
      )
      await page.fill('input[name="quantity"]', ITEM_TO_CRAFT.TO_CRAFT[1])
      await page.fill('input[name="bonusQuantity"]', ITEM_TO_CRAFT.BONUS[1])
      await page.selectOption(
        'select[name="bonusType"]',
        ITEM_TO_CRAFT.BONUS_TYPE[1]
      )

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('#craft'),
      ])
      await expect(page).toHaveURL('/alchemy/crafting/talent')

      const SECOND_CRAFT_QUANTITY = (
        FIRST_CRAFT_QUANTITY + parseInt(ITEM_TO_CRAFT.TO_CRAFT[1])
      ).toString()
      const SECOND_CRAFTER_QUANTITY = (
        FIRST_CRAFTER_QUANTITY +
        parseInt(ITEM_TO_CRAFT.BONUS[1]) -
        parseInt(ITEM_TO_CRAFT.TO_CRAFT[1]) * 3
      ).toString()

      await expect(page.locator(ITEM_TO_CRAFT.QUANTITY_SELECTOR)).toHaveText(
        SECOND_CRAFT_QUANTITY
      )
      await expect(page.locator(ITEM[0].SELECTOR)).toHaveText(
        SECOND_CRAFTER_QUANTITY
      )
    })

    test('can convert item', async ({ page }) => {
      await page.goto('/inventory/all')

      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().postData() === 'name=Tail+of+Boreas&quantity=10'
        ),
        page.fill(ITEM[1].SELECTOR, ITEM[1].QUANTITY),
      ])

      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().postData() === 'name=Dream+Solvent&quantity=17'
        ),
        page.fill(ITEM[2].SELECTOR, ITEM[2].QUANTITY),
      ])

      const ITEM_TO_CRAFT = {
        LINK_SELECTOR: '#ring_of_boreas-link',
        QUANTITY_SELECTOR: '#ring_of_boreas-quantity',
        TO_CRAFT: '2',
        TO_USE: '1',
      } as const

      await page.goto('/alchemy/converting/all')

      await page.click(ITEM_TO_CRAFT.LINK_SELECTOR)
      await page.waitForURL(
        '/alchemy/converting/all/convert-boss/Ring-of-Boreas'
      )
      await page.fill('input[name="quantity"]', ITEM_TO_CRAFT.TO_CRAFT)

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('#convert'),
      ])
      await expect(page).toHaveURL('/alchemy/converting/all')

      await page.goto('/alchemy/converting/talent-boss')

      const FIRST_CRAFT_QUANTITY = parseInt(ITEM_TO_CRAFT.TO_CRAFT[0])
      const FIRST_CRAFTER_QUANTITY = {
        BOSS: parseInt(ITEM[1].QUANTITY) - parseInt(ITEM_TO_CRAFT.TO_CRAFT[0]),
        DREAM_SOLVENT:
          parseInt(ITEM[2].QUANTITY) - parseInt(ITEM_TO_CRAFT.TO_CRAFT[0]),
      }

      await expect(page.locator(ITEM_TO_CRAFT.QUANTITY_SELECTOR)).toHaveText(
        FIRST_CRAFT_QUANTITY.toString()
      )
      await expect(page.locator(ITEM[1].SELECTOR)).toHaveText(
        FIRST_CRAFTER_QUANTITY.BOSS.toString()
      )
      await expect(page.locator(ITEM[2].SELECTOR)).toHaveText(
        FIRST_CRAFTER_QUANTITY.DREAM_SOLVENT.toString()
      )

      await page.click(ITEM[1].SELECTOR)
      await page.waitForURL(
        '/alchemy/converting/talent-boss/convert-boss/Tail-of-Boreas'
      )
      await page.fill('input[name="quantity"]', ITEM_TO_CRAFT.TO_USE)

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('#convert'),
      ])

      await page.goto('/alchemy/converting/talent-boss')

      const SECOND_CRAFT_QUANTITY = (
        FIRST_CRAFT_QUANTITY - parseInt(ITEM_TO_CRAFT.TO_USE)
      ).toString()
      const SECOND_CRAFTER_QUANTITY = {
        BOSS: (
          FIRST_CRAFTER_QUANTITY.BOSS + parseInt(ITEM_TO_CRAFT.TO_USE[0])
        ).toString(),
        DREAM_SOLVENT: (
          FIRST_CRAFTER_QUANTITY.DREAM_SOLVENT -
          parseInt(ITEM_TO_CRAFT.TO_USE[0])
        ).toString(),
      }

      await expect(page.locator(ITEM_TO_CRAFT.QUANTITY_SELECTOR)).toHaveText(
        SECOND_CRAFT_QUANTITY
      )
      await expect(page.locator(ITEM[1].SELECTOR)).toHaveText(
        SECOND_CRAFTER_QUANTITY.BOSS
      )
      await expect(page.locator(ITEM[2].SELECTOR)).toHaveText(
        SECOND_CRAFTER_QUANTITY.DREAM_SOLVENT
      )
    })
  })

  test.describe('character level up page', () => {
    test('should display character required items table', async ({ page }) => {
      await page.click('#Ganyu-character-page-link')
      await page.waitForURL('/character/Ganyu/required-items')
      await expect(page.locator('h1:has-text("Ganyu")')).toBeVisible()
      await expect(page.locator('h2:has-text("Ascension")')).toBeVisible()
      await expect(page.locator('h2:has-text("Talent")')).toBeVisible()
    })

    test('should able to level up manually', async ({ page }) => {
      await page.click('#Albedo-character-page-link')
      await page.waitForURL('/character/Albedo/required-items')
      await page.click('#manual_level_up-link')
      await page.waitForURL('/character/Albedo/manual-levelup')

      await page.fill('#level', '90')
      await page.fill('#ascension', '6')
      await page.fill('#normal-attack', '10')
      await page.fill('#elemental-skill', '10')
      await page.fill('#elemental-burst', '10')

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('button[type="submit"]'),
      ])

      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.reload(),
      ])

      await expect(page.locator('#level')).toHaveValue('90')
      await expect(page.locator('#ascension')).toHaveValue('6')
      await expect(page.locator('#normal-attack')).toHaveValue('10')
      await expect(page.locator('#elemental-skill')).toHaveValue('10')
      await expect(page.locator('#elemental-burst')).toHaveValue('10')
    })

    test('should able to level up with inventory items', async ({ page }) => {
      await page.goto('/inventory/all')

      const GANYU_ITEM = [
        {
          SELECTOR: '#whopperflower_nectar-quantity',
          QUANTITY: '4',
        },
        {
          SELECTOR: '#shivada_jade_sliver-quantity',
          QUANTITY: '6',
        },
        {
          SELECTOR: '#qingxin-quantity',
          QUANTITY: '5',
        },
      ] as const

      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().postData() ===
            'name=Whopperflower+Nectar&quantity=4'
        ),
        page.fill(GANYU_ITEM[0].SELECTOR, GANYU_ITEM[0].QUANTITY),
      ])
      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().postData() ===
            'name=Shivada+Jade+Sliver&quantity=6'
        ),
        page.fill(GANYU_ITEM[1].SELECTOR, GANYU_ITEM[1].QUANTITY),
      ])
      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().postData() === 'name=Qingxin&quantity=5'
        ),
        page.fill(GANYU_ITEM[2].SELECTOR, GANYU_ITEM[2].QUANTITY),
      ])

      await page.goto('/character/Ganyu/inventory-levelup')

      await expect(page.locator('text=Required character to 20.')).toBeVisible()
      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('#jump-level'),
      ])

      await page.locator('#character-level').fill('30')
      await Promise.all([
        page.waitForResponse((response) => response.ok()),
        page.click('button:has-text("Ascend")'),
      ])

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

  test.describe('track page', () => {
    test('Should display empty state when no track', async ({ page }) => {
      await page.locator('#Track-link-desktop').click()
      await page.waitForURL('/track')
      await expect(page.locator('h1:has-text("Tracks")')).toBeVisible()
      await expect(
        page.locator('a:has-text("Track a character")')
      ).toBeVisible()
    })

    test('Should able to add track', async ({ page }) => {
      await page.goto('/track')
      await Promise.all([
        page.waitForNavigation(),
        page.click('a:has-text("Track a character")'),
      ])

      expect(page.url()).toMatch('/track/add')
    })
  })
})
