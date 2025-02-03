# OTB Simple App

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run, simply run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You will notice a `server.js` file, this is because I've ran into some CORS issues with CloudFlare enabled trying to access the json, this should be taken into account in the data fetch incase you have the same issue (I presume you won't), if so, cd to `src/data` and run `node server.js`