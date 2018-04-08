// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

import $ from 'jquery'

function extractTotal (html) {
  const doc = $($.parseHTML(html))
  const total = doc.find('.weekly-reports-table:first .tfoot .duration:last').text()
  $('#duration').text(total)
}

function fetchTotal () {
  window.fetch('https://app.hubstaff.com/reports/my/weekly?', { credentials: 'include' })
    .then(resp => resp.text())
    .then(html => extractTotal(html))
}

fetchTotal()
