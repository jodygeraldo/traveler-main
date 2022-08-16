import { expect, test as baseTest } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
export { expect }

export const users = [
  {
    email: 'playwright@jodygeraldo.com',
    accountId: 'cl6c5vo4p2153n4ve7m76q3fd',
  },
  {
    email: 'playwright1@jodygeraldo.com',
    accountId: 'cl6c6wyqy2254n4veqz2bcxcf',
  },
  {
    email: 'playwright2@jodygeraldo.com',
    accountId: 'cl6c6xbdk2279n4veykbfb3v4',
  },
  {
    email: 'playwright3@jodygeraldo.com',
    accountId: 'cl6c6xmn62304n4ve8gne1xvo',
  },
  {
    email: 'playwright4@jodygeraldo.com',
    accountId: 'cl6c6xzno2329n4vepct8on7a',
  },
  {
    email: 'playwright5@jodygeraldo.com',
    accountId: 'cl6dhjaug20491eshruzyv5vsg',
  },
  {
    email: 'playwright6@jodygeraldo.com',
    accountId: 'cl6dhjlka20518eshr2g3sihw2',
  },
  {
    email: 'playwright7@jodygeraldo.com',
    accountId: 'cl6dhju7y20545eshr8sc8t5rz',
  },
  {
    email: 'playwright8@jodygeraldo.com',
    accountId: 'cl6dhk3r020572eshr6guki3d1',
  },
  {
    email: 'playwright9@jodygeraldo.com',
    accountId: 'cl6dhkdx020601eshrhh2z8fee',
  },
  {
    email: 'playwright10@jodygeraldo.com',
    accountId: 'cl6dhkxty20632eshrnb3pm2o3',
  },
  {
    email: 'playwright11@jodygeraldo.com',
    accountId: 'cl6dhl6aa20659eshr62qpejku',
  },
]

const password = 'playwright1234'

export const test = baseTest.extend({
  storageState: async ({ browser }, use, testInfo) => {
    // Override storage state, use worker index to look up logged-in info and generate it lazily.
    const fileName = path.join(
      testInfo.project.outputDir,
      'storage-' + testInfo.workerIndex + '.json'
    )
    if (!fs.existsSync(fileName)) {
      // Make sure we are not using any other storage state.
      const page = await browser.newPage({ storageState: undefined })
      await page.goto('http://localhost:3000/login')
      // Create a unique username for each worker.
      await page
        .locator('[placeholder="Email address"]')
        .fill(users[testInfo.workerIndex].email)
      await page.locator('[placeholder="Password"]').fill(password)
      await Promise.all([
        page.waitForResponse((response) => response.status() === 200),
        page.locator('button:has-text("Sign in")').click(),
      ])
      await expect(page).toHaveURL('http://localhost:3000/handbook')
      await page.context().storageState({ path: fileName })
      await page.close()
    }
    await use(fileName)
  },
})
