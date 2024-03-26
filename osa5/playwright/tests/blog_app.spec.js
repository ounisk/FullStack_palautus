const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')


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


describe('Login', () => {
    test('succeeds with correct credetials', async ({ page }) => {
        //await page.goto('http://localhost:5174')
        //await page.getByTestId('username').fill('mluukkai')
        //await page.getByTestId('password').fill('salainen')
        await loginWith(page, 'mluukkai', 'salainen')
    
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })


    test('fails with wrong credentials', async ({ page }) => {
        //await page.getByTestId('username').fill('mluukkai')
        //await page.getByTestId('password').fill('salkku')
        await loginWith(page, 'mluukkai', 'salkku')
    
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = await page.locator('.wronginfo')
        await expect(errorDiv).toContainText('wrong username or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      })

    })
})