import { test as baseTest } from '@playwright/test'
import prisma from '~/db.server'
import { cleanup, expect, test, users } from './fixtures'

test('resource user flow', async ({ page }, testInfo) => {
  const currentUser = users[testInfo.workerIndex]
  const id = Math.floor(Math.random() * 1000000)
  const title = `RESOURCE_USER_TITLE_${id}`
  await Promise.all([
    cleanup(currentUser.accountId),
    prisma.resource.deleteMany({
      where: {
        title: {
          contains: 'RESOURCE_USER_TITLE_',
        },
      },
    }),
  ]).catch((e) => console.log(e))

  // * popup should be visible after link click
  await page.goto('/resource')
  await Promise.all([
    page.waitForEvent('popup'),
    page.locator('text=Genshin Impact Official Wiki').click(),
  ])

  // * can submit a resource request
  await page.locator('text=Submit resource').click()
  await expect(page).toHaveURL('/resource/request')

  await page.locator('input[name="title"]').fill(title)
  await page.locator('textarea[name="description"]').fill('test')
  await page.locator('input[name="url"]').fill('localhost:3000')

  await page.locator('text=Submit request').click()
  await expect(page).toHaveURL('/resource')
})

baseTest('resource admin flow', async ({ page }) => {
  const email = 'playwright-admin@playwright.test'
  const password = 'test1234'
  const id = Math.floor(Math.random() * 1000000)
  const title = `RESOURCE_ADMIN_TITLE_${id}`
  const edittedTitle = `RESOURCE_ADMIN_TITLE_EDIT_${id}`
  await prisma.resource
    .deleteMany({
      where: {
        title: {
          contains: 'RESOURCE_ADMIN_TITLE_',
        },
      },
    })
    .catch((e) => console.log(e))

  await page.goto('/login')
  await page.locator('[placeholder="Email address"]').fill(email)
  await page.locator('[placeholder="Password"]').fill(password)
  await page.locator('button:has-text("Sign in")').click()
  await expect(page).toHaveURL('/handbook')

  // * can filter resources by status
  await page.goto('/resource')
  await page.locator('[data-testid="status-select"]').click()
  await page.locator('[data-testid="status-option-DRAFT"]').click()
  await expect(page).toHaveURL('/resource?status=DRAFT')
  await expect(page.locator('text=Genshin Impact Official Wiki')).toBeHidden()

  // * can submit a resource request
  await page.locator('text=Submit resource').click()
  await expect(page).toHaveURL('/resource/request?status=DRAFT')

  await page.locator('input[name="title"]').fill(title)
  await page.locator('select[name="status"]').selectOption('DRAFT')
  await page.locator('textarea[name="description"]').fill('test')
  await page.locator('input[name="url"]').fill('localhost:3000')

  await page.locator('text=Submit request').click()
  await expect(page).toHaveURL('/resource?status=DRAFT')
  await expect(page.locator(`text=${title}`)).toBeVisible()

  // * admin should able to approve resource
  await page.locator('text=Set to published').click()
  await expect(page.locator(`text=${title}`)).toBeHidden()
  await page.goto('/resource?status=PUBLISHED')
  await expect(page.locator(`text=${title}`)).toBeVisible()

  // * admin should able to edit resource
  await page.locator(`[data-testid="edit-resource-${title}"]`).click()
  await expect(page).toHaveURL(/.*edit/)
  await page.locator('input[name="title"]').fill(edittedTitle)
  await page.locator('text=Submit request').click()
  await expect(page).toHaveURL('/resource?status=PUBLISHED')
  await expect(page.locator(`text=${edittedTitle}`)).toBeVisible()

  // * admin should able to delete resource
  await page.locator(`[data-testid="delete-resource-${edittedTitle}"]`).click()
  await expect(page.locator(`text=${edittedTitle}`)).toBeHidden()
})
