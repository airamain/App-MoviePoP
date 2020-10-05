import axios from 'axios'

const baseUrl = 'http://api.tvmaze.com/search/shows';
const baseId = 'http://api.tvmaze.com/shows'


export const apiCall = (url, data, method) => axios({
    method,
    url: baseUrl + url,
    data
})

export const apiCallById = (url, data, method) => axios({
    method,
    url: baseId + url,
    data
})