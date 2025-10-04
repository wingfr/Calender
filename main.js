(() => {
  const $doc = document;
  const calender = $doc.querySelector('#Calender');
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  const mainus = $doc.getElementById('mainus');
  const plus = $doc.getElementById('plus');
  const createYearMonth = $doc.getElementById('year');

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  function calenderReload() {
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = firstDate.getDay();
    let lastDate = new Date(year, month, 0);
    let lastDayCount = lastDate.getDate();

    let dayCount = 1;
    let createHtml = '';

    createYearMonth.innerHTML = '<h1>' + year + '年' + month + '月' + '</h1>';

    createHtml += '<table  class="weeks">' + '<tr>';

    const weeks = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i = 0; i < weeks.length; i++) {
      createHtml += '<td>' + weeks[i] + '</td>';
    }
    createHtml += '</tr>' + '</table>';
    createHtml += '<table class="number">';

    for (let n = 0; n < 6; n++) {
      createHtml += '<tr>';
      for (let d = 0; d < 7; d++) {
        if (n == 0 && d < firstDay) {
          createHtml += '<td></td>';
        } else if (dayCount > lastDayCount) {
          createHtml += '<td></td>';
        } else {
          if (
            year === todayYear &&
            month === todayMonth &&
            dayCount === todayDate
          ) {
            createHtml += `<td class="today" data-day="${dayCount}">${dayCount}</td>`;
          } else {
            createHtml += `<td data-day="${dayCount}">${dayCount}</td>`;
          }
          dayCount++;
        }
      }

      createHtml += '</tr>';
    }
    createHtml += '</table>';
    calender.innerHTML = createHtml;

    addEventToCells();
  }

  mainus.addEventListener('click', () => {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    calenderReload();
  });
  plus.addEventListener('click', () => {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    calenderReload();
  });
  function addEventToCells() {
    const cells = document.querySelectorAll('.number td[data-day]');
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        const day = cell.dataset.day; // クリックした日
        const plan = prompt(
          `${year}年${month}月${day}日の予定を入力してください:`
        );
        if (plan) {
          // 予定をセルに追加
          const div = document.createElement('div');
          div.className = 'plan';
          div.textContent = plan;
          cell.appendChild(div);
        }
      });
    });
  }
  calenderReload();
  console.log(month);
})();
