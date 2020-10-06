import axios from 'axios'

const baseUrl = 'https://api.tvmaze.com/search/shows';
const baseId = 'https://api.tvmaze.com/shows'


export const apiCall = (url, method) => axios({
    method,
    url: baseUrl + url,
})

export const apiCallById = (url, method) => axios({
    method,
    url: baseId + url,
})