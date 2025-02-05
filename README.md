# OTB Simple App

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run, `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You will notice a `server.js` file, I've ran into some CORS issues with CloudFlare enabled trying to access the json so I've used Puppeteer to mock a headless browser to rip out the data manually, this should be conditioned in the data fetch incase you have the same issue (I presume you won't), if so, cd to `src/data` and run `node server.js` on top of the front-end.

To run tests,  `npm test`

Preview:
<img width="1373" alt="image" src="https://github.com/user-attachments/assets/ca9e2f31-4336-4d0a-8126-12218400802c" />

Notable Libraries:
- CORS (for server)
- Puppeteer (for server)
- react-icons (icons)
- @testing-library/jest-dom (provides custom Jest matchers (e.g., .toBeInTheDocument())
- @testing-library/user-events (simulates user interactions (clicks, typing, etc.))
- jest-fetch-mock (mock JSON data for testing)

## Overview

Overall goal of the task is to build a seamless front-end solution based on the `design.png` while consuming provided JSON data asynchronously. The solution displays a list of holiday resorts with sorting options (alphabetical, price, ratings) and the ability to toggle an overview section.

The solution was built via **React** and usage of **JSX** components, **JavaScript**, and **CSS** for styling.

## Breakdown

For data fetching, the JSON was fetched asynchronously using `fetch()`, then parsed and displayed accordingly. However, as mentioned earlier and despite not needing to create a back-end, it was necessary that one was created as I was CORS and CloudFlare blocked. Once fetched, the data is stored via a state management approach `[holidayData, setHolidayData]`.

Overall, each sorting function has made use of the JS function `sort()`. Here, a copy of `holidayData` is made using a spread `...` operator to ensure that any changes made to the state will trigger a re-render. Any direct mutations to the original `holidayData` will not do so. The parameters in the `sort()` function ensure that each holiday is compared against one another, for example, if resort A has a higher price than resort B due to the result returning a positive value `(a.bookingDetails.price.amount-b.bookingDetails.price.amount)` then resort A will be placed after resort B.

Each holiday has a toggleable overview button, which expands and collapses the description. Here, state management is used to track which `resort.id` is 'active' or not. Similarly, the sorting functions work the same way in which it highlights the active sorting that is on the page.

For responsiveness, it was ensured that the component was visible in multiple screen sizes using media queries.

AI was used for minor assistance in the development of this solution, however it was not relied on. Most, if not, all work done here are applicable skills from previous projects in the past. Mainly, the CORS server issues when fetching the JSON was my main cause of query to AI, and it proved to be useful in this case!

## Testing

Testing Library was used to verify that the holiday cards are displayed appropriately, and the sorting and toggle functionality behaves as expected. These consist of 6 tests in `Holidays.test.js`.

The API call was mocked with a sample JSON structure similar to the actual data to test the frontend component without having to rely on the actual API.

## Assumptions

Various assumptions were made from minor to somewhat more significant in a wider aspect such as pluralising adults, children, and infants depending if there was 1 or more. It was also assumed that there has to be at least one adult in each holiday.

It was assumed that price was sorted from lowest to highest, alphabetically from A to Z, and rating from highest to lowest. It can be said that the functions that were made enables it to be scaled to allow for sorting in the opposite manner.

## Challenges Faced

Most notably, handling the asynchronous data was the biggest gripe, not only with facing difficulties locally, but ensuring that it is handled and stored appropriately. I believe when it comes to larger datasets this may prove even more difficult. 

## Scalability

The code has a lot of functionality and handles alot of data from the JSON. It can be said that this can be moved into smaller reusable components e.g. `<HolidayCard>` or `<SortingButtons>`. If using TS, props can be used to send state data and allow for easier maintainability.

State management here has proven to be a great tool, however in scaling it, React's Context API can be used to handle multiple parameters at once and can be centralised for this particular component. This would potentially allow for further adding of sorting functions or even facet data e.g. filter by country.

