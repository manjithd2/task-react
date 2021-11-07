import axios from 'axios';

const getGraphData = async (pageSize = 30,page = '',fromDate,toDate) => {
    
    let error = false,
        errorMessage='',
        res = null;

    // converting to epoch seconds from milliseconds because the api accepts only epoch seconds 
    fromDate = parseInt(fromDate/1000);
    toDate = parseInt(toDate/1000);

    const URL = `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&fromdate=${fromDate}&todate=${toDate}&order=desc&sort=popular&site=stackoverflow`

    await axios.get(URL)
            .then(
              response => {
                  res = response.data.items
                  console.log(response.data)
                  console.log(res)
            })
            .catch(
                err => {
                    errorMessage = err.message
                    error = true
                }
            )

    return {res, error, errorMessage}

}

export default getGraphData;