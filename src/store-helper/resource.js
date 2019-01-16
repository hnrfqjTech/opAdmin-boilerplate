export default function ($http, url, filters = []) {
  if (typeof url === 'string' || url instanceof String) {
    if (url[0] !== '/') {
      url = '/' + url
    }
  }
  var getUrl = function (id, args) {
    if (typeof url === 'function') {
      return url(id, args)
    } else {
      if (id) {
        return url + '/' + id
      } else {
        return url
      }
    }
  }
  var processFilters = function (res) {
    filters.forEach((filter) => {
      res = filter(res)
    })
    return res
  }
  var processResFilters = function (promise) {
    if (filters && filters.length > 0) {
      return new Promise((resolve, reject) => {
        promise.then((response) => {
          response.data = processFilters(response.data)
          resolve(response)
        }).catch(reject)
      })
    }
    return promise
  }
  var processArrayFilters = function (promise) {
    if (filters && filters.length > 0) {
      return new Promise((resolve, reject) => {
        promise.then((response) => {
          let array = response.data.data
          response.data.data = array.map((res) => {
            return processFilters(res)
          })
          resolve(response)
        }).catch(reject)
      })
    }
    return promise
  }
  return {
    // axios#get(url[, config])
    get({ path, args, query = {}, headers = {}, configs = {}}) {
      let promise = $http.get(getUrl(path, args), {
        params: query,
        headers,
        ...configs
      });
      return processArrayFilters(promise);
    },
    // axios#post(url[, data[, config]])
    post({ path, args, query = {}, data = {}, headers = {}, configs = {}}) {
      let promise = $http.post(getUrl(path, args), data, {
        params: query,
        headers,
        ...configs
      });
      return processResFilters(promise);
    },

    // create ({res, query, headers, args, configs = {}}) {
    //   let promise = $http.post(getUrl(undefined, args), res, {
    //     params: query,
    //     headers: headers,
    //     configs: configs
    //   })
    //   return processResFilters(promise)
    // },
    // update ({res, id, query, headers, args, configs = {}}) {
    //   return $http.put(getUrl(id || res.id, args), res, {
    //     params: query,
    //     headers: headers,
    //     configs: configs
    //   })
    // },
    // delete ({res, query, headers, args, configs = {}}) {
    //   return $http.delete(getUrl(res.id, args), res, {
    //     params: query,
    //     headers: headers,
    //     configs: configs
    //   })
    // }
  }
}
