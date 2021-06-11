//Creates the variables to control the canvas, and the context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var ourArray;
var pending = 0;

/**
 * quickSort calls partitioner function, and calls itself, then receives the pivot index until it's required
 * @param {Array} myArray
 * @param {Integer} low
 * @param {Integer} high
 */
async function quickSort(myArray, low, high) {
  pending++;
  if (low < high) {
    pi = await partitioner(myArray, low, high);

    await Promise.all([
      quickSort(myArray, low, pi - 1),
      quickSort(myArray, pi + 1, high),
    ]);
  } else {
    draw(myArray);
  }
  pending--;
  console.log("-");
  return;
}

/**
 * partitioner sorts the divided area of the array, according to the pivot, un return the pivot index.
 * @param {Array} myArray
 * @param {Integer} low
 * @param {Integer} high
 * @returns pivot index
 */
async function partitioner(myArray, low, high) {
  var pivot = myArray[high];

  var i = low;

  for (let index = low; index < high; index++) {
    if (myArray[index] < pivot) {
      await timeOff(50);
      var control = myArray[index];
      myArray[index] = myArray[i];
      myArray[i] = control;
      i++;
      draw(myArray);
    }
  }
  var control = myArray[high];
  myArray[high] = myArray[i];
  myArray[i] = control;
  return i;
}

/**
 * timeOff turns off the execution of the script for certain time
 * @param {Integer} ms
 * @returns promise
 */
function timeOff(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * main makes the canvas to fit fullscreen, and draws the array
 */
function main(theArray) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw(theArray);
}

/**
 * draw draws the data from the array.
 * @param {Array} this_array
 */
function draw(this_array) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#000000";
  widthVar = window.innerWidth / this_array.length;
  var highest = Math.max.apply(null, this_array);
  for (let index = 0; index < this_array.length; index++) {
    context.fillRect(
      index * widthVar,
      window.innerHeight,
      widthVar - 1,
      -(this_array[index] * (window.innerHeight - 100)) / highest
    );
  }
}

/**
 * execute control which value should have the array to order.
 * @param {Integer} value
 */
function execute(value) {
  if (value == 1 && pending == 0) {
    ourArray = [
      53, 13, 45, 71, 18, 33, 86, 98, 24, 126, 74, 132, 63, 200, 23, 64, 23, 13,
      77, 10, 52, 71, 184, 35, 74, 25, 230, 231, 42, 163, 50, 35, 163, 52, 156,
      123, 51, 123, 213, 202, 123, 71, 49, 126, 35, 174, 116, 97, 130, 53, 13,
      45, 71, 18, 33, 86, 98, 24, 126, 74, 132, 63, 200, 23, 64, 23, 13, 77, 10,
      52, 71, 184, 35, 74, 25, 230, 231, 42, 163, 50, 35, 163, 52, 156, 123, 51,
      123, 213, 202, 123, 71, 49, 126, 35, 174, 116, 97, 130,
    ];
    console.log(1);
  } else if (value == 2 && pending == 0) {
    ourArray = [
      5, 1, 4, 8, 2, 9, 44, 3, 76, 23, 6, 1, 73, 1, 5, 8, 4, 34, 8, 13, 7, 4,
      14, 8, 9, 3, 51, 2, 5, 23, 56, 8, 2, 83, 54, 2, 5, 25, 7, 47, 24, 5, 15,
      67, 1, 2, 52, 44, 22, 44, 66, 13, 15, 62, 8,
    ];
    console.log(2);
  } else if (value == 3 && pending == 0) {
    ourArray = [
      14, 73, 56, 26, 78, 51, 74, 97, 65, 24, 68, 96, 78, 26, 15, 47, 85, 23,
      65, 14, 20, 95, 98, 97, 94, 52, 15, 65, 32, 58, 78, 54, 12, 56,
    ];
    console.log(3);
  }
  if (pending == 0) {
    main(ourArray);
    quickSort(ourArray, 0, ourArray.length - 1);
    //EventListener  to resize window, so that the script can update the canvas size to fit to the new screen size.
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(ourArray);
    });
  }
}

function customized(ourArray) {
  ourArray = ourArray.replace(/\s+/g, "");
  ourArray = ourArray.split(",");
  main(ourArray);
  quickSort(ourArray, 0, ourArray.length - 1);
  //EventListener  to resize window, so that the script can update the canvas size to fit to the new screen size.
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(ourArray);
  });
}
