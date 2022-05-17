const config = require('config');
const password = config.get('password');

const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('chromedriver.exe');
const driver = new Builder().forBrowser('chrome').setChromeService(service).build();

const args = process.argv.slice(2);

const argument = args.length >= 1 ? args[0] : "on";
console.log("Turning the wifi: " + argument);
init(argument);

async function init(mode = "on") {
	await driver.manage().setTimeouts({implicit: 20000});

	console.log("Loading admin panel...");
	await driver.get("http://192.168.0.1/")

	console.log("Logging in...");
    await driver.findElement(By.id("Password")).click()
    await driver.findElement(By.id("Password")).sendKeys(password)
    await driver.findElement(By.css(".submitBtn")).click()

	if(mode == "on") {
		await turnon();
	} else {
		await turnoff();
	}

	console.log("Logging out...");
    await driver.findElement(By.linkText("Log out")).click()
    await driver.close()

	console.log("Complete!");
}

async function turnon() {
	console.log("Loading wireless settings...");
	await driver.get("http://192.168.0.1/?wifi_radio&mid=WirelessSignal")

	console.log("Enabling wifi...");
    await driver.findElement(By.id("fmRbtn-Enable24")).click()
    await driver.findElement(By.id("fmRbtn-Enable50")).click()

	console.log("Applying settings...");
    await driver.findElement(By.id("commonApply")).click()
    {
      const element = await driver.findElement(By.id("commonApply"))
      await driver.actions({ bridge: true }).move(element).perform()
    }

	return true;
}

async function turnoff() {
	console.log("Loading wireless settings...");
	await driver.get("http://192.168.0.1/?wifi_radio&mid=WirelessSignal")

	console.log("Disabling wifi...");
    await driver.findElement(By.id("fmRbtn-Disable24")).click()
    await driver.findElement(By.id("fmRbtn-Disable50")).click()

	console.log("Applying settings...");
    await driver.findElement(By.id("commonApply")).click()
    {
      const element = await driver.findElement(By.id("commonApply"))
      await driver.actions({ bridge: true }).move(element).perform()
    }

	return true;
}
