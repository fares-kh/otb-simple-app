// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks()

beforeEach(() => {
  // Reset all mocks before each test to avoid interference between tests
  fetchMock.resetMocks()
  
  // Set a default mock response for any fetch
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        resort: {
          id: "7dd27e42-2b5c-4237-86ac-97c26f72eb5b",
          name: "Holiday Resort 1", // Generic holiday resort name
          regionName: "Costa Adeje",
          countryName: "Tenerife",
          starRating: 5,
          overview: "Overview of Holiday Resort 1.",
          image: {
            url: "https://static.onthebeach.co.uk/fe-code-test/hotel-image-1.jpg",
            description: "Image of Holiday Resort 1"
          }
        },
        flightDetails: {
          departureAirport: "East Midlands",
          departureDate: "2030-07-03T00:00:00.000Z"
        },
        bookingDetails: {
          party: {
            adults: 2,
            children: 2,
            infants: 1
          },
          lengthOfStay: 7,
          price: {
            amount: 1136.5,
            currency: "GBP"
          }
        }
      }
    ])
  )
})