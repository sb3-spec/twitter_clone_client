import Cookies from 'js-cookie';

const hostname = 'https://twitter-clone-drf.herokuapp.com'

export function lookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `${hostname}/api${endpoint}`
  const csrftoken = Cookies.get('csrftoken')
  xhr.responseType = "json"
  xhr.open(method, url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (csrftoken) {
    // xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
    xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest')
    xhr.setRequestHeader("X-CSRFToken", csrftoken)  
  } 

  xhr.onload = function() {
    // if (xhr.status === 403) {
    //   const loginLocationIndex = window.location.href.indexOf("login")
    //    if (loginLocationIndex === -1) {
    //     window.location.href = "/login?showLoginRequired=true"
    //    }
    // }
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = () => {
    
    callback({"message": "The request was an error"}, 400)
  }  
  xhr.send(jsonData)
}

