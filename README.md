# OTB Simple App

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run, simply run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You will notice a `server.js` file, I've ran into some CORS issues with CloudFlare enabled trying to access the json so I've used Puppeteer to mock a headless browser to rip out the data manually, this should be conditioned in the data fetch incase you have the same issue (I presume you won't), if so, cd to `src/data` and run `node server.js` on top of the front-end.