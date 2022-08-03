import { test as baseTest } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
export { expect } from '@playwright/test'

export const users = [
  {
    email: 'playwright@jodygeraldo.com',
    accoundId: 'cl6c5vo4p2153n4ve7m76q3fd',
  },
  {
    email: 'playwright1@jodygeraldo.com',
    accoundId: 'cl6c6wyqy2254n4veqz2bcxcf',
  },
  {
    email: 'playwright2@jodygeraldo.com',
    accoundId: 'cl6c6xbdk2279n4veykbfb3v4',
  },
  {
    email: 'playwright3@jodygeraldo.com',
    accoundId: 'cl6c6xmn62304n4ve8gne1xvo',
  },
  {
    email: 'playwright4@jodygeraldo.com',
    accoundId: 'cl6c6xzno2329n4vepct8on7a',
  },
  {
    email: 'playwright5@jodygeraldo.com',
    accoundId: 'cl6dhjaug20491eshruzyv5vsg',
  },
  {
    email: 'playwright6@jodygeraldo.com',
    accoundId: 'cl6dhjlka20518eshr2g3sihw2',
  },
  {
    email: 'playwright7@jodygeraldo.com',
    accoundId: 'cl6dhju7y20545eshr8sc8t5rz',
  },
  {
    email: 'playwright8@jodygeraldo.com',
    accoundId: 'cl6dhk3r020572eshr6guki3d1',
  },
  {
    email: 'playwright9@jodygeraldo.com',
    accoundId: 'cl6dhkdx020601eshrhh2z8fee',
  },
  {
    email: 'playwright10@jodygeraldo.com',
    accoundId: 'cl6dhkxty20632eshrnb3pm2o3',
  },
  {
    email: 'playwright11@jodygeraldo.com',
    accoundId: 'cl6dhl6aa20659eshr62qpejku',
  },
]

const password = 'playwright1234'

export const test = baseTest.extend({
  storageState: async ({ browser }, use, testInfo) => {
    // Override storage state, use worker index to look up logged-in info and generate it lazily.
    const fileName = path.join(
      testInfo.project.outputDir,
      'storage-' + testInfo.workerIndex
    )
    if (!fs.existsSync(fileName)) {
      // Make sure we are not using any other storage state.
      const page = await browser.newPage({ storageState: undefined })
      await page.goto('http://localhost:3000/login')
      // Create a unique username for each worker.
      await page.locator('#email').fill(users[testInfo.workerIndex].email)
      await page.locator('#password').fill(password)
      await Promise.all([
        page.waitForNavigation({
          url: (url) => url.pathname === '/character',
        }),
        page.click('#signin'),
      ])
      await page.context().storageState({ path: fileName })
      await page.close()
    }
    await use(fileName)
  },
})
