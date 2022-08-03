import { test as baseTest } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
export { expect } from '@playwright/test'

export const users = [
  {
    email: 'playwright1@jodygeraldo.com',
    password: 'playwright1234',
    accoundId: 'cl6c6wyqy2254n4veqz2bcxcf',
  },
  {
    email: 'playwright2@jodygeraldo.com',
    password: 'playwright1234',
    accoundId: 'cl6c6xbdk2279n4veykbfb3v4',
  },
  {
    email: 'playwright3@jodygeraldo.com',
    password: 'playwright1234',
    accoundId: 'cl6c6xmn62304n4ve8gne1xvo',
  },
  {
    email: 'playwright4@jodygeraldo.com',
    password: 'playwright1234',
    accoundId: 'cl6c6xzno2329n4vepct8on7a',
  },
  {
    email: 'playwright@jodygeraldo.com',
    password: 'playwright1234',
    accoundId: 'cl6c5vo4p2153n4ve7m76q3fd',
  },
]

export const test = baseTest.extend({
  storageState: async ({ browser }, use, testInfo) => {
    console.log('workerIndex: ' + testInfo.workerIndex)
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
      await page.locator('#password').fill(users[testInfo.workerIndex].password)
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
