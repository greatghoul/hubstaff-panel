// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

import $ from 'jquery'

function setTotal () {
  $('#duration').text(window.localStorage['weekly_total'])
}

function extractTotal (html) {
  const doc = $($.parseHTML(html))
  const total = doc.find('.weekly-reports-table:first .tfoot .duration:last').text()
  window.localStorage['weekly_total'] = total
  setTotal()
}

function fetchTotal () {
  window.fetch('https://app.hubstaff.com/reports/my/weekly?', { credentials: 'include' })
    .then(resp => resp.text())
    .then(html => extractTotal(html))
}

fetchTotal()

$(document).ready(() => setTotal())
