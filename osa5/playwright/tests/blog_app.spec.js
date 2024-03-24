const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })

        await page.goto('http://localhost:5174')
    })



test('front page can be opened', async ({ page }) => {
  //await page.goto('http://localhost:5174')

  const locator = await page.getByText('Log in to application')
  await expect(locator).toBeVisible()
  //await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
})
})