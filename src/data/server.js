import express from "express"
import puppeteer from "puppeteer"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/api/holidays", async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" })
        const page = await browser.newPage()

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

        await page.goto("https://static.onthebeach.co.uk/fe-code-test/data.json")

        const body = await page.evaluate(() => document.body.innerText)
        await browser.close()

        res.json(JSON.parse(body))
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message })
    }
});

const PORT = 5001
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`))