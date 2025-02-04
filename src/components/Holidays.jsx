import * as React from "react"
import './Holidays.css'
import { TiSortAlphabetically } from "react-icons/ti";
import { HiCurrencyPound } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

const HolidayList = () => {
    const [holidayData, setHolidayData] = React.useState([])
    const [activeSort, setActiveSort] = React.useState()
    
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
        setActiveSort("alphabetical")
    }

    const sortPrice = () => {
        const sortedData = [...holidayData].sort((a, b) => a.bookingDetails.price.amount-b.bookingDetails.price.amount)
        setHolidayData(sortedData)
        setActiveSort("price")
    }

    const sortRating = () => {
        const sortedData = [...holidayData].sort((a, b) => b.resort.starRating-a.resort.starRating)
        setHolidayData(sortedData)
        setActiveSort("rating")
    }

    return (
    <div>
        {holidayData.length === 0 ? (
            <p>Loading...</p>
            ) : (
        <div className="holiday-container">
            <div className="left-col">
                <div className="button-container">
                    <button 
                        className={`${activeSort === "alphabetical" ? "active" : ""}`} 
                        onClick={sortAlphabetically}
                    >
                        sort alphabetically <TiSortAlphabetically className="button-icon"/>
                    </button>
                    <button 
                        className={`${activeSort === "price" ? "active" : ""}`}
                        onClick={sortPrice}
                    >
                        sort by price <HiCurrencyPound className="button-icon"/>
                    </button>
                    <button 
                        className={`${activeSort === "rating" ? "active" : ""}`}
                        onClick={sortRating}
                    >
                        sort by rating <FaStar className="button-icon"/>
                    </button>
                </div>
            </div>
            <div>
            {holidayData.map((holiday) => (
                <>
                <p>{holiday.resort.name}</p>
                <p>{holiday.resort.regionName}</p>     
                <p>{holiday.resort.countryName}</p>
                <p>{holiday.resort.starRating}</p>
                <p>{holiday.resort.overview}</p>
                <p>{holiday.bookingDetails.price.amount}</p>
                </>
            ))}
            </div>
        </div>
            )}
    </div>
    )
}

export default HolidayList