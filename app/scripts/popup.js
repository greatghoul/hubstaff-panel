// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

import $ from 'jquery'

function setTotal () {
  let total = window.localStorage['weekly_total']
  if (!total) {
    total = '00:00:00'
  }

  $('#duration').text(total)
}

function extractTotal (html) {
  const doc = $($.parseHTML(html))
  const total = $.trim(doc.find('.weekly-reports-table:first .tfoot .duration:last').text())
  window.localStorage['weekly_total'] = total
  setTotal()
}

function showLogin (error) {
  console.log(error)
  $('#duration').hide()
  $('#login').show()
}

function handleErrors (response) {
  if (response.ok) {
    return response.text()
  } else {
    throw Error(response.statusText)
  }
}

function fetchTotal () {
  window.fetch('https://app.hubstaff.com/reports/my/weekly?', { credentials: 'include' })
    .then(handleErrors)
    .then(extractTotal)
    .catch(showLogin)
}

fetchTotal()

$(document).ready(() => setTotal())
