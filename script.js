$(document).ready(function() {
	$('#loading').hide();
})

var portName = '1 /dev/cu.usbmodem1421';
var serial; // variable to hold an instance of the serialport library
var in_data = -1;
var ppl = init_population();
 
function setup() {
	/*
	serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.on('list', printList); // set a callback function for the serialport list event

	serial.on('connected', serverConnected); // callback for connecting to the server
	*/
}

function draw() {
	$('#pop').html(current_formatted(ppl));
}

// get the list of ports:
function printList(portList) {
	// portList is an array of serial port names
	for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
		console.log(i + " " + portList[i]);
	}
}

function serverConnected() {
	console.log('connected to server.');
	serial.on('open', portOpen);        // callback for the port opening
	serial.on('data', serialEvent);     // callback for when new data arrives
	serial.on('error', serialError);    // callback for errors
	serial.on('close', portClose);      // callback for the port closing
	
	serial.list();                      // list the serial ports
	serial.open(portName); 
}
 
function portOpen() {
	console.log('the serial port opened.')
}
 
function serialEvent() {
	in_data = Number(serial.read())
}
 
function serialError(err) {
	console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
	console.log('The serial port closed.');
}
