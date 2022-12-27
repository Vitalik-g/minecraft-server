const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const tnsData = require('./conf')
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');


let driver = new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    .build();
let lang = "ru"
var url;
if (lang == "en") {
    url = 'https://www.google.com/search?q=%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4%D1%87%D0%B8%D0%BA&sxsrf=ALiCzsYV7QEJ2yighxJJTjQ2SRKWgoE09Q%3A1662836775719&ei=J-AcY_zOK-mFrwTBmrngDg&oq=ayukj-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4%D1%87%D0%B8%D0%BA&gs_lcp=Cgdnd3Mtd2l6EAEYADIECAAQDTIECAAQDTIECAAQDTIECAAQDTIGCAAQHhANMgYIABAeEA0yBggAEB4QDTIGCAAQHhANMgYIABAeEA0yBggAEB4QDToKCAAQRxDWBBCwAzoHCAAQsAMQQzoSCC4QxwEQ0QMQyAMQsAMQQxgBOgUIABCiBEoECEEYAEoECEYYAFCVCljmFmCcIWgCcAF4AIABkAOIAekJkgEHMi00LjAuMZgBAKABAcgBCsABAdoBBAgBGAg&sclient=gws-wiz'
}else if (lang == "ru"){
    url = 'https://www.google.com/search?q=%D1%80%D1%83%D1%81%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4%D1%87%D0%B8%D0%BA&sxsrf=ALiCzsb4NC8A5nOm2TPDpAZbaSRIAJMGlw%3A1662842094558&ei=7vQcY6PaIYaWrwTelJWQAw&ved=0ahUKEwijifTCiYv6AhUGy4sKHV5KBTIQ4dUDCA4&uact=5&oq=%D1%80%D1%83%D1%81%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4%D1%87%D0%B8%D0%BA&gs_lcp=Cgdnd3Mtd2l6EAMyBwgjELECECcyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyBAgAEAoyCAgAEB4QBxAKMgQIABAKOgcIABAeEKIEOgUIABCiBDoICAAQHhAIEAc6BggAEB4QBzoHCCMQsAIQJzoECAAQDUoECEEYAEoECEYYAFAAWNATYPUWaAFwAXgAgAHSAYgBmwySAQUwLjUuM5gBAKABAcABAQ&sclient=gws-wiz'
}

async function start (){
    driver.get(url)
    let source=  await driver.findElement(By.id('tw-source-text-ta'))
    translate (source)
}start()

async function translate (source){
    console.log(`{`);
    for(let data in tnsData){
        await source.sendKeys(tnsData[data])
        await sleep(1000)
        let text=  await driver.findElement(By.id('tw-target-text')).getText()
        console.log(`"${data}": "${text}",`);
        clear()
        await sleep(1000)
    }
    console.log(`}`);
}

async function clear(){
    await driver.findElement(By.id('tw-cst')).click()
}

async function sleep (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}