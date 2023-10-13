const axios = require('axios')
const puppeteer = require('puppeteer')

const init = async () => {
  // 建立ws与已经开启的chrome浏览器连接
  const wsKey = await axios.get('http://localhost:9000/json/version');
  let browser=await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
    defaultViewport:null
  });

  const page = await browser.newPage() 

  const origin = 'devtest'
  const url = `https://${origin}.kdweibo.cn/yzj-layout/home/`
  const iframeUrl = '/appbu/#/resource'
  await page.goto(url)

  let frame

  setTimeout(async () => {
    await page.hover('#home-user_avatar')
    await page.hover('.nav_auto_item')
    await page.click('#appbu-business')
    const frame = await page.frames()[1]
    frame.content().then(res => {
      console.log('iframramramr', res)
    })
    await frame.waitForSelector('.hover-active-item')
      .then(res => {
        frame.click('span')
      })
    // const frame = await page.frames().find(frame => frame.includes(iframeUrl))
    // const imgList = await frame.waitForSelector('img')
    // console.log('iiiiiii', imgList)
    // await page.evaluate(async () => {
    //   const attendanceIcon = Array.from(imgDomList).find(item => item.src.includes('attendance'))
    // })
  }, 2000)
}

init()