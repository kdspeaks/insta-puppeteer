const puppeteer = require('puppeteer')
const fs = require('fs/promises')

const script = async() => {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/p/CTaD6wXsHSn/?__a=1', {waitUntil: "networkidle2"})
    await page.waitFor(5000)
    await page.content()

    const res = await page.evaluate(() => {
        return JSON.parse(document.querySelector('body').innerText)
    })

    let image = res.graphql.shortcode_media.display_url
    await fs.writeFile("image.txt", image)

    await browser.close()

}

script()