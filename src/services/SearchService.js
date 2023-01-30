const url = 'http://node-env.eba-u2thtivw.eu-west-2.elasticbeanstalk.com/search/';

class SearchService {

  // Get Lessons after searching
  static getSearchResults(inputData) {
    return fetch(url,{
      method:  'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputData
      })
    })
  }
}

export default SearchService;
