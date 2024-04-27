const puppeteer = require("puppeteer");
require("dotenv").config();
const timeout = delay => new Promise(resolve => setTimeout(resolve, delay));  

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      //"--headless=new",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://smart.storage");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    //await page.waitForTimeout(5000);
    await page.screenshot({path: "home.png"});


    // Type into search box
    //await page.type(".search-box__input", "automate");

    // Wait and click on first result
    const searchResultSelector = "div > h2 > a";
    await page.waitForSelector(searchResultSelector);
    await timeout(10000);
    await page.click(searchResultSelector);
    

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "article > div.mb-7.mt-7.flex.justify-center"
    );
    await timeout(10000);
    await page.screenshot({path: "blog.png"});
    const fullTitle = await page.title();//await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
