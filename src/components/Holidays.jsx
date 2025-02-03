import * as React from "react"

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
                // console.log(data)
                setHolidayData(data)
            } catch (error) {
                console.error('Error fetching holiday data')
            }
        }
        fetchData()
    }, [])

    return (<div>
        {holidayData.map((holiday) => (
            <>
            <p>{holiday.resort.name}</p>
            <p>{holiday.resort.regionName}</p>     
            <p>{holiday.resort.countryName}</p>
            <p>{holiday.resort.starRating}</p>
            <p>{holiday.resort.overview}</p>
            </>
        ))}
    </div>
    )
}

export default HolidayList