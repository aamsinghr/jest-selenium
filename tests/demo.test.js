const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('chromedriver')


const script = require('jest');

 
const url = 'https://www.selenium.dev/'
 
const getElementXpath = async (driver, xpath, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};
 
 
const getElementName = async (driver, name, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};
 
const getElementId = async (driver, id, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

let driver;
 
// declaring the test group  This is our test case scenario that we will execute from our first test script. 
beforeAll( async () => {
    
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(url);
    await driver.manage().window().maximize();

  }, 30000);
 
afterAll( async () => {
    await driver.quit();
  }, 15000);
  
test('it performs a validation of title on the home page', async () => {
    //await driver.get(url)
    const title = await driver.findElement(By.tagName('h1')).getText()
    expect(title).toContain("Selenium automates browsers. That's it!")
})

test('it performs a validation of the search box on the page', async () => {
    const foundAndLoadedCheck = async () => {
        await until.elementLocated(By.id('docsearch'))
        const value = await driver.findElement(By.id('docsearch')).getText()
        return value !== '~'
    }

    await driver.wait(foundAndLoadedCheck, 3000)
    const search = await driver.findElement(By.id('docsearch')).getText()
    expect(search).toContain('Search')
})

// declaring the test group

test('snap a picture by taking the screenshot', async () => {
    // files saved in ./reports/screenshots by default
    //await driver.get(url)
    await driver.takeScreenshot()
})