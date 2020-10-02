import axios from 'axios'

const baseUrl = 'http://api.tvmaze.com/search/shows';
const baseId = 'http://api.tvmaze.com/shows'


export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseUrl + url,
    data, headers
})

export const apiCallById = (url, data, headers, method) => axios({
    method,
    url: baseId + url,
    data, headers
})