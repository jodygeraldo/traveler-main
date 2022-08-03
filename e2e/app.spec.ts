import prisma from '~/db.server'
import { expect, test, users } from './fixtures'

const OK_STATUS_TEXT = 'SUCCESS'
const BASE_PATH = '/character'

async function cleanupUser({
  email,
  accoundId,
}: {
  email: string
  accoundId: string
}) {
  await prisma.user
    .update({
      where: { email },
      data: {
        accounts: {
          update: {
            where: { id: accoundId },
            data: {
              inventory: { deleteMany: {} },
              characters: { deleteMany: {} },
            },
          },
        },
      },
    })
    .catch((e) => console.error(e))
}

test.describe('apps', () => {
  test.beforeEach(async ({ page: _ }, testInfo) => {
    const currentUser = users[testInfo.workerIndex]
    await cleanupUser(currentUser)
  })
  test.afterEach(async ({ page: _ }, testInfo) => {
    const currentUser = users[testInfo.workerIndex]
    await cleanupUser(currentUser)
  })

  test('Characters page flow', async ({ page }) => {
    // * all characters should be displayed
    await page.goto(BASE_PATH)
    const characterLen = await prisma.character.count()
    await expect(page.locator('#grid-view > li')).toHaveCount(characterLen)

    // * can switch character view
    await page.locator('#switch-list-view').click()
    await expect(page.locator('#list-view')).toBeVisible()
    await expect(page.locator('#Albedo-character-page-link')).toBeVisible()

    // * can search for characters
    await page.locator('#switch-grid-view').click()
    await expect(page.locator('#grid-view')).toBeVisible()
    await expect(page.locator('#Albedo-character-page-link')).toBeVisible()

    await page.locator('#search').fill('Amber')
    await expect(page.locator('#Amber-character-page-link')).toBeVisible()
    await expect(page.locator('#Albedo-character-page-link')).toBeHidden()

    // TODO: QUICK UPDATE PAGE
    // * can go to quick update page and update Albedo and Amber
    // await Promise.all([page.waitForNavigation(), page.click('#quick-update')])
    // await expect(page).toHaveURL('/character/quick-update')

    // const ALBEDO = {
    //   LEVEL: '90',
    //   ASCENSION: '6',
    // }

    // await page.locator('#Albedo-level', ALBEDO.LEVEL)
    // await page.locator('#Albedo-ascension', ALBEDO.ASCENSION)

    // await Promise.all([
    //   page.waitForResponse(
    //     async (response) => response.statusText() === OK_STATUS_TEXT
    //   ),
    //   page.click(`#Albedo-save`),
    // ])

    // await expect(page.locator('#Albedo-level')).toHaveValue(ALBEDO.LEVEL)
    // await expect(page.locator('#Albedo-ascension')).toHaveValue(
    //   ALBEDO.ASCENSION
    // )

    // const AMBER = {
    //   LEVEL: '60',
    //   ASCENSION: '3',
    //   NORMAL_ATTACK: '2',
    //   ELEMENTAL_SKILL: '2',
    //   ELEMENTAL_BUSRT: '2',
    // }

    // await page.locator('#Amber-level', AMBER.LEVEL)
    // await page.locator('#Amber-ascension', AMBER.ASCENSION)
    // await page.locator('#Amber-normal-attack', AMBER.NORMAL_ATTACK)
    // await page.locator('#Amber-elemental-skill', AMBER.ELEMENTAL_SKILL)
    // await page.locator('#Amber-elemental-burst', AMBER.ELEMENTAL_BUSRT)

    // await Promise.all([
    //   page.waitForResponse(
    //     async (response) => response.statusText() === OK_STATUS_TEXT
    //   ),
    //   page.click(`#Amber-save`),
    // ])

    // await expect(page.locator('#Amber-normal-attack')).toHaveValue(
    //   AMBER.NORMAL_ATTACK
    // )
    // await expect(page.locator('#Amber-elemental-skill')).toHaveValue(
    //   AMBER.ELEMENTAL_SKILL
    // )
    // await expect(page.locator('#Amber-elemental-burst')).toHaveValue(
    //   AMBER.ELEMENTAL_BUSRT
    // )
  })

  test('Inventory & Alchemy page flow', async ({ page }) => {
    // * inventory page flow
    const ITEM = [
      ['#teachings_of_freedom-quantity', '100'],
      ['#tail_of_boreas-quantity', '10'],
      ['#dream_solvent-quantity', '17'],
    ] as const

    // * can go to inventory page
    await page.goto(BASE_PATH)
    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/inventory/all',
      }),
      page.locator('#Inventory-link-desktop').click(),
    ])
    await expect(page.locator('h1:has-text("Inventory")')).toBeVisible()

    // * can update quantity of items
    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator(ITEM[0][0]).fill(ITEM[0][1]),
    ])

    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator(ITEM[1][0]).fill(ITEM[1][1]),
    ])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/inventory/talent-book',
      }),
      page.locator('#talent_book-link').click(),
    ])

    await expect(page.locator(ITEM[0][0])).toHaveValue(ITEM[0][1])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/inventory/all',
      }),
      page.locator('#all-link').click(),
    ])

    // * can search for items and update quantity
    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator(ITEM[2][0]).fill(ITEM[2][1]),
    ])

    await page.locator('#search').fill('dream sol')
    await expect(page.locator(ITEM[2][0])).toHaveValue(ITEM[2][1])
    await expect(page.locator(ITEM[0][0])).toBeHidden()

    // * alchemy page flow
    const CRAFT = {
      SELECTOR: ['#guide_to_freedom-link', '#guide_to_freedom-quantity'],
      TO_CRAFT: ['18', '1'],
      BONUS: ['2', '1'],
      BONUS_TYPE: ['Bonus', 'Refund'],
      EXPECT: {
        CRAFT: ['20', '21'],
        CRAFTER: ['46', '44'],
      },
    } as const

    const CONVERT = {
      SELECTOR: ['#ring_of_boreas-link', '#ring_of_boreas-quantity'],
      TO_CRAFT: '2',
      TO_USE: '1',
      EXPECT: {
        CRAFT: '2',
        CRAFTER: ['8', '15'],
      },
    } as const

    // * can go to alchemy crafting page
    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/crafting/all',
      }),
      page.locator('#Alchemy-link-desktop').click(),
    ])

    await expect(page.locator('h1:has-text("Alchemy Crafting")')).toBeVisible()

    // * can craft items
    await Promise.all([
      page.waitForNavigation({
        url: (url) =>
          url.pathname ===
          '/alchemy/crafting/all/craft-talent/Guide-to-Freedom',
      }),
      page.locator(CRAFT.SELECTOR[0]).click(),
    ])

    await page.locator('input[name="quantity"]').fill(CRAFT.TO_CRAFT[0])
    await page.locator('input[name="bonusQuantity"]').fill(CRAFT.BONUS[0])
    await page
      .locator('select[name="bonusType"]')
      .selectOption(CRAFT.BONUS_TYPE[0])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/crafting/all',
      }),
      page.locator('#craft').click(),
    ])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/crafting/talent',
      }),
      page.locator('#crafting-talent-link').click(),
    ])

    await expect(page.locator(CRAFT.SELECTOR[1])).toHaveText(
      CRAFT.EXPECT.CRAFT[0]
    )
    await expect(page.locator(ITEM[0][0])).toHaveText(CRAFT.EXPECT.CRAFTER[0])

    await Promise.all([
      page.waitForNavigation({
        url: (url) =>
          url.pathname ===
          '/alchemy/crafting/talent/craft-talent/Guide-to-Freedom',
      }),
      page.locator(CRAFT.SELECTOR[0]).click(),
    ])
    await page.locator('input[name="quantity"]').fill(CRAFT.TO_CRAFT[1])
    await page.locator('input[name="bonusQuantity"]').fill(CRAFT.BONUS[1])
    await page
      .locator('select[name="bonusType"]')
      .selectOption(CRAFT.BONUS_TYPE[1])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/crafting/talent',
      }),
      page.locator('#craft').click(),
    ])
    await Promise.all([page.waitForNavigation(), page.reload()])

    await expect(page.locator(CRAFT.SELECTOR[1])).toHaveText(
      CRAFT.EXPECT.CRAFT[1]
    )
    await expect(page.locator(ITEM[0][0])).toHaveText(CRAFT.EXPECT.CRAFTER[1])

    // * can convert items
    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/converting/all',
      }),
      page.locator('#converting-all-link').click(),
    ])

    await Promise.all([
      page.waitForNavigation({
        url: (url) =>
          url.pathname ===
          '/alchemy/converting/all/convert-boss/Ring-of-Boreas',
      }),
      page.locator(CONVERT.SELECTOR[0]).click(),
    ])
    await page.locator('input[name="quantity"]').fill(CONVERT.TO_CRAFT)

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/converting/all',
      }),
      page.locator('#convert').click(),
    ])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/alchemy/converting/talent-boss',
      }),
      page.locator('#converting-talent_boss-link').click(),
    ])

    await expect(page.locator(CONVERT.SELECTOR[1])).toHaveText(
      CONVERT.EXPECT.CRAFT
    )
    await expect(page.locator(ITEM[1][0])).toHaveText(CONVERT.EXPECT.CRAFTER[0])
    await expect(page.locator(ITEM[2][0])).toHaveText(CONVERT.EXPECT.CRAFTER[1])
  })

  test.skip('Character page flow', async ({ page }) => {
    // * should display character required items table
    await page.goto(BASE_PATH)
    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/character/Ganyu/required-items',
      }),
      page.locator('#Ganyu-character-page-link').click(),
    ])

    await expect(page.locator('h1:has-text("Ganyu")')).toBeVisible()
    await expect(page.locator('h2:has-text("Ascension")')).toBeVisible()
    await expect(page.locator('h2:has-text("Talent")')).toBeVisible()

    const ITEM = [
      ['#whopperflower_nectar-quantity', '4'],
      ['#shivada_jade_sliver-quantity', '6'],
      ['#qingxin-quantity', '5'],
    ] as const

    // * should able to level up with inventory items
    await page.goto('/inventory/all')
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.request().postData() ===
          'name=Whopperflower+Nectar&quantity=4'
      ),
      page.locator(ITEM[0][0]).fill(ITEM[0][1]),
    ])
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.request().postData() ===
          'name=Shivada+Jade+Sliver&quantity=6'
      ),
      page.locator(ITEM[1][0]).fill(ITEM[1][1]),
    ])
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.request().postData() === 'name=Qingxin&quantity=5'
      ),
      page.locator(ITEM[2][0]).fill(ITEM[2][1]),
    ])

    await page.goto('/character/Ganyu/inventory-levelup')

    await expect(page.locator('text=Required character to 20.')).toBeVisible()
    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator('#jump-level').click(),
    ])

    await page.locator('#character-level').fill('30')
    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator('button:has-text("Ascend")').click(),
    ])

    await expect(page.locator('text=Required character to 40.')).toBeVisible()
    await expect(
      page.locator('#test-whopperflower_nectar-quantity')
    ).toHaveText('1')
    await expect(
      page.locator('#test-shivada_jade_sliver-quantity')
    ).toBeHidden()
    await expect(page.locator('#test-qingxin-quantity')).toHaveText('2')

    // * should able to level up manually
    await page.goto('/character/Albedo/manual-levelup')

    await page.locator('#level').fill('90')
    await page.locator('#ascension').fill('6')
    await page.locator('#normal-attack').fill('10')
    await page.locator('#elemental-skill').fill('10')
    await page.locator('#elemental-burst').fill('10')

    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator('button[type="submit"]').click(),
    ])

    await Promise.all([page.waitForNavigation(), page.reload()])

    await expect(page.locator('#level')).toHaveValue('90')
    await expect(page.locator('#ascension')).toHaveValue('6')
    await expect(page.locator('#normal-attack')).toHaveValue('10')
    await expect(page.locator('#elemental-skill')).toHaveValue('10')
    await expect(page.locator('#elemental-burst')).toHaveValue('10')
  })

  test.skip('Track page flow', async ({ page }) => {
    await page.goto('/character')
    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track',
      }),
      page.locator('#Track-link-desktop').click(),
    ])

    await expect(page.locator('h1:has-text("Tracks")')).toBeVisible()

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track/add',
      }),
      page.locator('a:has-text("Track a character")').click(),
    ])

    await page.locator('input[role="combobox"]').click()
    await page.locator('input[role="combobox"]').fill('diluc')
    await page.locator('ul[role="listbox"] div:has-text("Diluc")').click()
    await page.locator('text=Update progression').click()
    await expect(
      page.locator('text=Last updated progression for Diluc')
    ).toBeVisible()

    await page.locator('input[name="level"]').click()
    await page.locator('input[name="level"]').fill('40')

    await page.locator('input[name="ascension"]').click()
    await page.locator('input[name="ascension"]').fill('2')

    await page.locator('input[name="normalAttack"]').click()
    await page.locator('input[name="normalAttack"]').fill('6')

    await page.locator('input[name="normalAttack"]').press('Tab')
    await page.locator('input[name="elementalSkill"]').fill('6')

    await page.locator('input[name="elementalSkill"]').press('Tab')
    await page.locator('input[name="elementalBurst"]').fill('6')

    await Promise.all([
      page.waitForResponse((response) => response.status() === 400),
      page.locator('#track').click(),
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

    await page.locator('input[name="normalAttack"]').click()
    await page.locator('input[name="normalAttack"]').fill('2')

    await page.locator('input[name="normalAttack"]').click()
    await page.locator('input[name="elementalSkill"]').fill('2')

    await page.locator('input[name="elementalSkill"]').click()
    await page.locator('input[name="elementalBurst"]').fill('2')

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track',
      }),
      page.locator('#track').click(),
    ])

    await expect(page.locator('text=Diluc')).toBeVisible()
    await expect(page.locator('text=Level 1')).toBeVisible()
    await expect(page.locator('text=Ascension 0')).toBeVisible()
    await expect(page.locator('text=Normal Attack 1')).toBeVisible()
    await expect(page.locator('text=Elemental Skill 1')).toBeVisible()
    await expect(page.locator('text=Elemental Burst 1')).toBeVisible()

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track/Diluc',
      }),
      page.locator('a[href="/track/Diluc"]').click(),
    ])

    await expect(page.locator('h4:has-text("Ascension")')).toBeVisible()
    await page.locator('text=Increase level').click()
    await page.locator('text=Decrease level').click()
    await page.locator('text=Increase level').click()
    await page.locator('text=Increase level').click()
    await expect(page.locator('text=Increase level')).toHaveCount(3)

    await page.locator('text=Increase level').first().click()
    await expect(page.locator('h4:has-text("Normal Attack")')).toBeHidden()

    await page.locator('text=Increase level').nth(1).click()

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track',
      }),
      page.locator('a:has-text("Track")').click(),
    ])

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track/update/Diluc',
      }),
      page.locator('a[href="/track/update/Diluc"]').click(),
    ])

    await page.locator('input[name="ascension"]').click()
    await page.locator('input[name="ascension"]').fill('3')

    await Promise.all([
      page.waitForNavigation({
        url: (url) => url.pathname === '/track',
      }),
      page.locator('button:has-text("Update")').click(),
    ])

    await expect(page.locator('text=Ascension 2')).toBeVisible()
    await expect(page.locator('text=Elemental Skill 1')).toBeVisible()

    await Promise.all([
      page.waitForResponse(
        async (response) => response.statusText() === OK_STATUS_TEXT
      ),
      page.locator('text=delete').click(),
    ])
    await expect(page.locator('a[href="/track/Diluc"]')).toBeHidden()
  })
})
