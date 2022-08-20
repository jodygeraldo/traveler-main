import { expect, test } from '@playwright/test'
import prisma from '~/db.server'

test.skip('resource flow', async ({ page }) => {
  const email = 'playwright-resource@jodygeraldo.com'
  const password = 'test1234'
  const title = 'RESOURCE_TITLE_TEST'
  await Promise.all([
    prisma.user.delete({ where: { email } }),
    prisma.resource.delete({ where: { title } }),
  ]).catch((e) => console.log(e))

  // * create a user with role USER
  await page.goto('/join')
  await page.locator('[placeholder="Email address"]').fill(email)
  await page.locator('[placeholder="Password"]').fill(password)
  await page.locator('[placeholder="Confirm password"]').fill(password)
  await Promise.all([
    page.waitForNavigation(),
    page.locator('button:has-text("Sign up")').click(),
  ])
  await expect(page).toHaveURL('/handbook')

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

  // TODO: admin should able to approve resource
  // TODO: admin should able to delete resource
  // TODO: admin should able to edit resource
})
