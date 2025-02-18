import * as React from "react"
import './Holidays.css'
import { TiSortAlphabetically } from "react-icons/ti";
import { HiCurrencyPound } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

const HolidayList = () => {
    const [holidayData, setHolidayData] = React.useState([])
    const [activeSort, setActiveSort] = React.useState()
    const [toggleOverview, setToggleOverview] = React.useState(false)

    const showOverview = (key) => {
        setToggleOverview(toggleOverview === key ? null : key)
    }
    
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                response = await fetch('https://static.onthebeach.co.uk/fe-code-test/data.json')
                if (!response.ok) {
                    response = await fetch('http://localhost:5001/api/holidays')
                }

                const data = await response.json()
                sortPrice(data)
            } catch (error) {
                console.error('Error fetching holiday data')
            }
        }
        fetchData()
    }, [])

    const currencySymbols = {
        "USD": "$",
        "EUR": "€",
        "GBP": "£"
    }

    const convertCurrencyNameToSymbol = (currencyName) => {
        return currencySymbols[currencyName] || currencyName
    }

    const sortAlphabetically = (data) => {
        const sortedData = [...data].sort((a, b) => {
            if(a.resort.name < b.resort.name) { return -1 }
            if(a.resort.name > b.resort.name) { return 1 }
            return 0
        })
        setHolidayData(sortedData)
        setActiveSort("alphabetical")
    }

    const sortPrice = (data) => {
        const sortedData = [...data].sort((a, b) => a.bookingDetails.price.amount-b.bookingDetails.price.amount)
        setHolidayData(sortedData)
        setActiveSort("price")
    }

    const sortRating = (data) => {
        const sortedData = [...data].sort((a, b) => b.resort.starRating-a.resort.starRating)
        setHolidayData(sortedData)
        setActiveSort("rating")
    }

    const formattedDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
    })}

    return (
    <div>
        {holidayData.length === 0 ? (
            <p>Loading...</p>
            ) : (
        <div className="app-container">
            <div className="left-col">
                <div className="button-container">
                    <button 
                        className={`${activeSort === "alphabetical" ? "active" : ""}`} 
                        onClick={() => sortAlphabetically(holidayData)}
                    >
                        sort alphabetically <TiSortAlphabetically className="button-icon"/>
                    </button>
                    <button 
                        className={`${activeSort === "price" ? "active" : ""}`}
                        onClick={() => sortPrice(holidayData)}
                    >
                        sort by price <HiCurrencyPound className="button-icon"/>
                    </button>
                    <button 
                        className={`${activeSort === "rating" ? "active" : ""}`}
                        onClick={() => sortRating(holidayData)}
                    >
                        sort by rating <FaStar className="button-icon"/>
                    </button>
                </div>
            </div>
            <div className="right-col">
            {holidayData.map((holiday) => (
                <div key={holiday.resort.id} className="holiday-container">
                    <div className="holiday-image">
                        <img src={holiday.resort.image.url} alt={holiday.resort.image.description}></img>
                        <button className="read-more" onClick={() => showOverview(holiday.resort.id)}>
                            <span><strong>Read more</strong> about this hotel</span>{toggleOverview === holiday.resort.id ? <FaAngleDown/> : <FaAngleRight/>}
                        </button>
                    </div>
                    <div className="holiday-description">
                        <h2>{holiday.resort.name}</h2>
                        <p className="region">{holiday.resort.regionName}, {holiday.resort.countryName}</p>     
                        <div>
                            {Array.from({length: holiday.resort.starRating}).map(() => (
                                <FaStar className="star-icon"/>
                            ))}
                        </div>
                        <p>
                        <strong>{holiday.bookingDetails.party.adults}</strong> Adult
                        {holiday.bookingDetails.party.adults > 1 ? "s" : ""}
                        {holiday.bookingDetails.party.children && 
                            <span>, <strong>{holiday.bookingDetails.party.children}</strong> child
                            {holiday.bookingDetails.party.children > 1 ? "ren" : ""}
                            </span>
                        }
                        {holiday.bookingDetails.party.infants && 
                            <span>, <strong>{holiday.bookingDetails.party.infants}</strong> infant
                            {holiday.bookingDetails.party.infants > 1 ? "s" : ""}
                            </span>
                        }
                        </p>
                        <p>
                            <span><strong>{formattedDate(holiday.flightDetails.departureDate)}</strong> for <strong>{holiday.bookingDetails.lengthOfStay}</strong> days</span>
                        </p>
                        <p>
                            <span>departing from <strong>{holiday.flightDetails.departureAirport}</strong></span>
                        </p>
                        <button onClick={()=>{}}>
                            <h3>Book now</h3>
                            <h1>{convertCurrencyNameToSymbol(holiday.bookingDetails.price.currency)}{(holiday.bookingDetails.price.amount).toFixed(2)}</h1>
                        </button>
                    </div>
                    {toggleOverview === holiday.resort.id && 
                        <div className="overview">
                            <h4>Overview</h4>
                            <p>{holiday.resort.overview}</p>
                        </div>
                    }
                </div>
            ))}
            </div>
        </div>
            )}
    </div>
    )
}

export default HolidayList