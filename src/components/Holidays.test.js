import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HolidayList from './Holidays';
import '@testing-library/jest-dom';

test('display "loading..." while fetching holiday data', () => {
    render(<HolidayList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
})
  
test('display generic holiday data (name, price) after fetch', async () => {
  render(<HolidayList />)

  await waitFor(() => screen.getByText('Holiday Resort 1'))

  expect(screen.getByText('Costa Adeje, Tenerife')).toBeInTheDocument()
  expect(screen.getByText('£1136.50')).toBeInTheDocument()
})

test('sort holidays alphabetically', async () => {
    render(<HolidayList />)

    await waitFor(() => screen.getByText('Holiday Resort 1'))

    const sortButton = screen.getByText('sort alphabetically')
    fireEvent.click(sortButton)

    expect(screen.getByText('Holiday Resort 1')).toBeInTheDocument()
})

test('sort holidays by price', async () => {
    render(<HolidayList />)

    await waitFor(() => screen.getByText('Holiday Resort 1'))

    const sortButton = screen.getByText('sort by price')
    fireEvent.click(sortButton)

    expect(screen.getByText('£1136.50')).toBeInTheDocument()
})

test('sort holidays by rating', async () => {
    render(<HolidayList />)

    await waitFor(() => screen.getByText('Holiday Resort 1'))

    const sortButton = screen.getByText('sort by rating')
    fireEvent.click(sortButton)

    expect(screen.getByText('Holiday Resort 1')).toBeInTheDocument()
})

test('display overview when "Read more" button is clicked', async () => {
    render(<HolidayList />)

    await waitFor(() => screen.getByText('Holiday Resort 1'))

    const readMoreButton = screen.getByText('Read more')
    fireEvent.click(readMoreButton)

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Overview of Holiday Resort 1.')).toBeInTheDocument()

    fireEvent.click(readMoreButton)

    expect(screen.queryByText('Overview')).not.toBeInTheDocument()
  })