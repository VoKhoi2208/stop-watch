document.addEventListener("DOMContentLoaded", function() {
  var timerInterval;
  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var isRunning = false;
  var lapCount = 0;
  var lapsContainer = document.getElementById("laps-container");
  var lapsTable = document.getElementById("laps-table");

  var startButton = document.getElementById("start-button");
  var stopButton = document.getElementById("stop-button");
  var resetButton = document.getElementById("reset-button");
  var lapButton = document.getElementById("lap-button");
  var exportButton = document.getElementById("export-button");
  var timerDisplay = document.getElementById("timer-display");
  var clearButton = document.getElementById("clearButton");

  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  lapButton.addEventListener("click", recordLap);
  exportButton.addEventListener("click", exportToExcel);
  clearButton.addEventListener("click", clearTable);

  function startTimer() {
    if (!isRunning) {
      timerInterval = setInterval(updateTimer, 1000);
      isRunning = true;
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      updateTitle();
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 0;
    updateTimerDisplay();
    updateTitle();
    clearLaps();
  }

  function recordLap() {
    if (isRunning) {
      lapCount++;
      var lapTime = getFormattedTime();
      var currentTime = getCurrentDateTime();
      var row = lapsTable.insertRow();
      row.insertCell(0).textContent = lapCount;
      row.insertCell(1).textContent = lapTime;
      row.insertCell(2).textContent = currentTime;
    }
  }

  function updateTimer() {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
        if (hours === 24) {
          hours = 0;
          days++;
        }
      }
    }
    updateTimerDisplay();
    updateTitle();
  }

  function updateTimerDisplay() {
    timerDisplay.textContent = getFormattedTime();
  }

  function updateTitle() {
    var formattedTime = getFormattedTime();
    document.title = formattedTime + " - Stopwatch";
  }

  function getFormattedTime() {
    var formattedDays = formatTime(days) + " ngày";
    var formattedHours = formatTime(hours) + " giờ";
    var formattedMinutes = formatTime(minutes) + " phút";
    var formattedSeconds = formatTime(seconds) + " giây";
    return formattedDays + " " + formattedHours + " " + formattedMinutes + " " + formattedSeconds;
  }

  function getCurrentDateTime() {
    var date = new Date();
    var dateString = formatDate(date) + ", " + formatTime(date);
    return dateString;
  }

  function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return formatTime(day) + "/" + formatTime(month) + "/" + year;
  }

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  function clearLaps() {
    while (lapsTable.rows.length > 1) {
      lapsTable.deleteRow(1);
    }
  }

  function exportToExcel() {
    // Tạo một workbook mới
    var workbook = XLSX.utils.book_new();
  
    // Tạo một worksheet mới và thêm dữ liệu từ bảng vào
    var worksheet = XLSX.utils.table_to_sheet(lapsTable);
  
    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laps");
  
    // Xuất workbook thành file Excel
    var ip = window.location.hostname;
    var fileName = "countdown-" + ip + ".xls";
    XLSX.writeFile(workbook, fileName);
  }

  function clearTable() {
  var table = document.getElementById("laps-table");
  var rowCount = table.rows.length;

  // Bắt đầu từ i = 1 để bỏ qua hàng tiêu đề
  for (var i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
}
});
