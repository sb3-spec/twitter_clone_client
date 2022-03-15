import { lookup } from "../../tweet_lookup"

export const apiGetSearchResults = (callback, searchTerm) => {
    let endpoint = '/search/'
    lookup('POST', endpoint, callback, {'search_term': searchTerm})
}