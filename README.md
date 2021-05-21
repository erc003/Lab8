# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  
(1) Within a Github action that runs whenever code is pushed  

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  
No because you can't test how sending and receiving messages interact with each other on an application/feature level.  

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters  
Yes, because it is small scale enough that you can test the feature with varying string lengths.  

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?  
We won't see what the browser is doing/what actions are taking place.  

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?  
```
beforeAll(async () => {
    await page.click('img');
});
```
