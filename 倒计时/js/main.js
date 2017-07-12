var s = document.getElementsByClassName('digit');
var oneDay = 24 * 60 * 60 * 1000;
var firstDate = new Date("april 15, 2017 00:36:00");
var secondDate = new Date();
var returnTime = firstDate.getTime() - secondDate.getTime();
var days = (firstDate.getTime() - secondDate.getTime()) / (oneDay);
var hrs = (days - Math.floor(days)) * 24;
var min = (hrs - Math.floor(hrs)) * 60;
var sec = (min - Math.floor(min)) * 60;
days = Math.floor(days);
hrs = Math.floor(hrs);
min = Math.floor(min);
sec = Math.floor(sec);
if(days < 10){	days = "0" + days;}
if(hrs < 10){	hrs = "0" + hrs;}
if(min < 10){	min = "0" + min;}
if(sec < 10){	sec = "0" + sec;}
s[0].innerHTML = days;
s[1].innerHTML = hrs;
s[2].innerHTML = min;
s[3].innerHTML = sec;
if(returnTime < 0){
	s[0].innerHTML = "00";
	s[1].innerHTML = "00";
	s[2].innerHTML = "00";
	s[3].innerHTML = "00";
}
var i = setInterval(function() {n()}, 1000);
function f(d, x) {
	s[d].innerHTML = x;
	if(Number(s[d-1].innerHTML) <= 10 && Number(s[d-1].innerHTML) > 0){
		s[d-1].innerHTML = "0" + (Number(s[d-1].innerHTML) - 1);
	} else {
		s[d-1].innerHTML = Number(s[d-1].innerHTML) - 1;
	}
}
function n() {
	if(Number(s[3].innerHTML) <= 10 && Number(s[3].innerHTML) > 0){
		s[3].innerHTML = "0" + (Number(s[3].innerHTML) - 1);
	} else {
		s[3].innerHTML = Number(s[3].innerHTML) - 1;
	}
	if (s[3].innerHTML == -1) {
		f(3, 59);
		if (s[2].innerHTML == -1) {
			f(2, 59);
			if (s[1].innerHTML == -1) {
				f(1, 23);
			}
		}
	}
	if(s[0].innerHTML <= -1) {
		clearInterval(i);
		s[0].innerHTML = "00";
		s[1].innerHTML = "00";
		s[2].innerHTML = "00";
		s[3].innerHTML = "00";
	}
}