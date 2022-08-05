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
              characters: { deleteMany: {} },
            },
          },
        },
      },
    })
    .catch((e) => console.error(e))
}

test.describe.skip('apps', () => {
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

    // await page.fill('#Albedo-level', ALBEDO.LEVEL)
    // await page.fill('#Albedo-ascension', ALBEDO.ASCENSION)

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

    // await page.fill('#Amber-level', AMBER.LEVEL)
    // await page.fill('#Amber-ascension', AMBER.ASCENSION)
    // await page.fill('#Amber-normal-attack', AMBER.NORMAL_ATTACK)
    // await page.fill('#Amber-elemental-skill', AMBER.ELEMENTAL_SKILL)
    // await page.fill('#Amber-elemental-burst', AMBER.ELEMENTAL_BUSRT)

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

  test('Character page flow', async ({ page }) => {
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

    // * should able to level up manually
    await page.goto('/character/Albedo/manual-levelup')

    await page.fill('#level', '90')
    await page.fill('#ascension', '6')
    await page.fill('#normal-attack', '10')
    await page.fill('#elemental-skill', '10')
    await page.fill('#elemental-burst', '10')

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

  test('Track page flow', async ({ page }) => {
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
      page.locator('button:has-text("Track")').click(),
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
