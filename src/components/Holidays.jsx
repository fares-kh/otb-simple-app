import * as React from "react"
import './Holidays.css'

const HolidayList = () => {
    const [holidayData, setHolidayData] = React.useState([])
    
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                response = await fetch('https://static.onthebeach.co.uk/fe-code-test/data.json')
                if (!response.ok) {
                    response = await fetch('http://localhost:5001/api/holidays')
                }

                const data = await response.json()
                setHolidayData(data)
            } catch (error) {
                console.error('Error fetching holiday data')
            }
        }
        fetchData()
    }, [])

    const sortAlphabetically = () => {
        // copy here is made since the state won't know if its mutated if it modifies the original array
        const sortedData = [...holidayData].sort((a, b) => {
            if(a.resort.name < b.resort.name) { return -1 }
            if(a.resort.name > b.resort.name) { return 1 }
            return 0
        })
        setHolidayData(sortedData)
    }

    const sortPrice = () => {
        const sortedData = [...holidayData].sort((a, b) => a.bookingDetails.price.amount-b.bookingDetails.price.amount)
        setHolidayData(sortedData)
    }

    const sortRating = () => {
        const sortedData = [...holidayData].sort((a, b) => b.resort.starRating-a.resort.starRating)
        setHolidayData(sortedData)
    }

    return (<div className="holiday-container">
        <div>
            <button onClick={sortAlphabetically}>sort alphabetically</button>
            <button onClick={sortPrice}>sort by price</button>
            <button onClick={sortRating}>sort by rating</button>
        </div>
        <div>
        {holidayData.length === 0 ? (
          <p>Loading</p>
        ) : (
        holidayData.map((holiday) => (
            <>
            <p>{holiday.resort.name}</p>
            <p>{holiday.resort.regionName}</p>     
            <p>{holiday.resort.countryName}</p>
            <p>{holiday.resort.starRating}</p>
            <p>{holiday.resort.overview}</p>
            <p>{holiday.bookingDetails.price.amount}</p>
            </>
        )))}
        </div>
    </div>
    )
}

export default HolidayList