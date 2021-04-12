// Elements
const containerDiv = $(".container");

// Objects
var schedule = {
  date: "",
  time: "",
  task: "",
};

var workDaySchedule = [];

// Variables
var today = dayjs();

//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  workDaySchedule = JSON.parse(localStorage.getItem("WorkDaySchedule"));
}

// Save schedule to localStorage
function SaveScheduleToLocalStorage_Old() {
  //
  schedule = {
    date: "2021-04-12",
    time: "15",
    task: "Event 1",
  };
  workDaySchedule.push(schedule);
  //
  schedule = {
    date: "2021-04-12",
    time: "16",
    task: "Event 2",
  };
  workDaySchedule.push(schedule);
  //
  schedule = {
    date: "2021-04-12",
    time: "17",
    task: "Event 3",
  };
  workDaySchedule.push(schedule);
  //
  localStorage.setItem("WorkDaySchedule", JSON.stringify(workDaySchedule));
}

// Set reserved time blocks
function SetReservedTimeBlocks() {
  //
  if (workDaySchedule != null) {
    //
    workDaySchedule.forEach(function (item) {
      //
      var row = "#" + item.time; // Row id = #[hour]
      $(row).children(".form-floatting").children(".textarea").text(item.task);
      //
    });
    //
  }
}

// Build time blocks
function BuildTimeBlocks() {
  //
  var time = today.hour(15);
  var timeVal, timeText;
  var currentTime = Number(today.format("H"));
  var rowEl, colEl, textAreaEl, saveBtn;

  // 9 AM to 5 PM
  for (var i = 0; i < 9; i++) {
    //
    timeVal = Number(time.format("H"));
    timeText = time.format("hA"); // h[AM | PM]
    // Create a row
    rowEl = $("<div>");
    rowEl.attr("id", timeVal);
    rowEl.addClass("row time-block");

    // Hour
    colEl = $("<div>");
    // colEl.addClass("col-1 align-self-center");
    colEl.addClass("col-1 hour");
    colEl.text(timeText);
    rowEl.append(colEl);

    // Text area
    colEl = $("<div>");
    colEl.addClass("col-10 form-floatting");

    textAreaEl = $("<textarea>");
    textAreaEl.addClass("form-control textarea");
    textAreaEl.text("");
    colEl.append(textAreaEl);

    rowEl.append(colEl);

    // Save button
    colEl = $("<div>");
    colEl.addClass("col-1 saveBtn");
    colEl.text("");

    saveBtn = $("<button>");
    saveBtn.addClass("far fa-save align-self-center");
    colEl.append(saveBtn);

    rowEl.append(colEl);

    containerDiv.append(rowEl);

    // Block this row if it is for a past time or noon
    if (timeVal < currentTime || timeVal == 12) {
      rowEl.addClass("past");
      $(".form-control").attr("disabled", true);
    } else if (timeVal == currentTime) {
      rowEl.addClass("present");
      //   $(".form-control").attr("disabled", false);
    } else {
      rowEl.addClass("future");
    }

    // Increment time block by 1 hour
    time = time.add(1, "h");
  }
}

// Save schedule to localStorage
function SaveScheduleToLocalStorage() {
  //
  var date = today.format("YYYY-MM-DD");
  var time = $(this).parents(".row").children(".hour").text().trim();
  var task = $(this).parents(".row").children(".form-floatting").text().trim();
  //
  console.log($(this).parents(".row").children(".form-floatting"));
  console.log("time=" + time + ", task=" + task);

  //   if (task != null) {
  //   }
}

// Initialization
function InitializeComponents() {
  //
  //   SaveScheduleToLocalStorage_Old();
  LoadScheduleFromLocalStorage();
  BuildTimeBlocks();
  SetReservedTimeBlocks();
}

containerDiv.on("click", "button", SaveScheduleToLocalStorage);

InitializeComponents();
