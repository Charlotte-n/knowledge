import { hyRequest } from '@/services'
import axios from 'axios'

enum AnalyzeApi {
  getOptions = '/get-options',
  search_autocomplete = '/search_autocomplete'
}

function getOptionsApi() {
  return hyRequest.get({
    url: AnalyzeApi.getOptions
  })
}

function searchAutocompleteApi(queryString: string) {
  return hyRequest.post({
    url: AnalyzeApi.search_autocomplete,
    params: {
      queryString,
      size: 10
    }
  })
}

export { getOptionsApi, searchAutocompleteApi }
