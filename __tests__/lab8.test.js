describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url().includes('/#entry1')).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    // await page.click('journal-entry');
    const heading = await page.$eval('h1', (h) => {
      return h.innerText;
    });
    expect(heading).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const obj = { 
                  title: 'You like jazz?',
                  date: '4/25/2021',
                  content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
                  image: {
                    src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
                    alt: 'bee with sunglasses'
                  }
                };
    const entry = await page.$('entry-page');
    const data = await entry.getProperty('entry');
    const plainValue = await data.jsonValue();
    expect(plainValue).toMatchObject(obj);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.$eval('body', (b) => {
      return b.className;
    });
    expect(body).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img');
    expect(page.url().includes('/#settings')).toBe(true);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const heading = await page.$eval('h1', (h) => {
      return h.innerText;
    });
    expect(heading).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.$eval('body', (b) => {
      return b.className;
    });
    expect(body).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url().includes('/#entry1')).toBe(true);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should have nothing at the end', async() => {
    await page.goBack();
    expect(page.url().endsWith('index.html') || page.url().endsWith('/')).toBe(true);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it("Test12: When the user if on the homepage, the header title should be 'Journal Entries'", async() => {
    const heading = await page.$eval('h1', (h) => {
      return h.innerText;
    });
    expect(heading).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const body = await page.$eval('body', (b) => {
      return b.className;
    });
    expect(body.length).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(500);
    expect(page.url().includes('/#entry2')).toBe(true);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const heading = await page.$eval('h1', (h) => {
      return h.innerText;
    });
    expect(heading).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const obj = {
                  date:"4/26/2021",
                  title:"Run, Forrest! Run!",
                  content:"Mama always said life was like a box of chocolates. You never know what you're gonna get.",
                  image: {
                    src:"https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
                    alt:"forrest running"
                  }
                };
    const entry = await page.$('entry-page');
    const data = await entry.getProperty('entry');
    const plainValue = await data.jsonValue();
    expect(plainValue).toMatchObject(obj);
  }, 10000);

  // create your own test 17
  it('Test17: Verify the entry page contents is correct when clicking on the last entry - it has audio this time', async () => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[9].click();
    await page.waitForTimeout(500);
    const obj = {
                  date:"5/4/2021",
                  title:"No, I am your father",
                  content:"A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
                  image: {
                    src:"https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg",
                    alt:"may the fourth be with you"
                  },
                  audio:"https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT"
                };
    const entry = await page.$('entry-page');
    const data = await entry.getProperty('entry');
    const plainValue = await data.jsonValue();
    expect(plainValue).toMatchObject(obj);
  }, 10000);

  // create your own test 18
  it('Test18: Verify that clicking the back button and then the forward button lands me on the same page', async () => {
    await page.goBack();
    await page.goForward();
    expect(page.url().includes('/#entry10')).toBe(true);
  });

  // create your own test 19
  it('Test19: Gymnastics page surfing', async () => {
    await page.click('img');
    await page.click('h1');
    await page.click('journal-entry');
    await page.goBack();
    await page.goBack();
    await page.goBack();
    expect(page.url().includes('/#entry10')).toBe(true);
  }, 50000);

  // create your own test 20
  it('Test20: Verify the page is the home page if we click the heading', async () => {
    await page.click('h1');
    expect(page.url().endsWith('index.html') || page.url().endsWith('/')).toBe(true);
  });
});