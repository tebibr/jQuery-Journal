// --------------------
// VARIABLES
// --------------------

var start=true;

var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
var dayOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var date=new Date();
var week=date.getDay();
var day=date.getDate();
var month=date.getMonth();
var yy=date.getYear();
var year=(yy<1000)?yy+1900:yy;

var startDay=1;
var startMonth=8;
var startYy=116;
var startYear=2016;

var myWeek;
var myDay=date.getDate();
var myMonth=date.getMonth();
var myYy=date.getYear();
var myYear;
var myDate;

var diff;
var startDate;
var currDate;
var max;
var min;
var sliderVal;

var myJournal
var myMood;

var ua=window.navigator.userAgent;
var msie=ua.indexOf('MSIE');
var trident=ua.indexOf('Trident');


$(document).ready(function(){
	currentDate();
	setSlider();
	sliderRange();
	if(msie>0 || trident>0){
		handleSlider('change')
	}else{
		handleSlider('input');
	}
	handleDateBar();

	changeJournal();

	getData();
	toggleMood();
});

// --------------------
// CURRENT DATE
// --------------------

function currentDate(){
	$(".date").append(dayOfWeek[week]+", &nbsp;"+months[month]+"&nbsp;"+day+", &nbsp;"+year);

	myDate=day.toString()+month.toString()+yy.toString();
}

// --------------------
// HANDLE DATE CHANGE
// --------------------

function setSlider(){
	startDate=new Date(startYear,startMonth,startDay);
	currDate=new Date(year,month,day);
	diff=currDate-startDate;
	max=Math.ceil(diff/1000/60/60/24);
	min=0;
}

function sliderRange(){
	$('.slider').attr('min',min);
	$('.slider').attr('max',max); 

	$('.slider').val(max);
}

function handleSlider(event){
	$('.slider').on(event,function(){
		setSlider();

		sliderVal=parseInt($('.slider').val());
		startDate.setDate(startDay+sliderVal);
		myWeek=startDate.getDay();
		myDay=startDate.getDate();
		myMonth=startDate.getMonth();
		myYy=startDate.getYear();
		myYear=(myYy<1000)?myYy+1900:myYy;

		$('.date').empty();
		$(".date").append(dayOfWeek[myWeek]+", &nbsp;"+months[myMonth]+"&nbsp;"+myDay+", &nbsp;"+myYear);
	
		myDate=myDay.toString()+myMonth.toString()+myYy.toString();

		getData();
		toggleMood();
	});
}

function handleDateBar(){
	$('.left-bar').click(function(){
		if(myDay!=startDay || myMonth!=startMonth || myYy!=startYy){
			setSlider();

			sliderVal=parseInt($('.slider').val())-1;
			$('.slider').val(sliderVal);

			startDate.setDate(startDay+sliderVal);
			myWeek=startDate.getDay();
			myDay=startDate.getDate();
			myMonth=startDate.getMonth();
			myYy=startDate.getYear();
			myYear=(myYy<1000)?myYy+1900:myYy;

			$('.date').empty();
			$(".date").append(dayOfWeek[myWeek]+", &nbsp;"+months[myMonth]+"&nbsp;"+myDay+", &nbsp;"+myYear);
		
			myDate=myDay.toString()+myMonth.toString()+myYy.toString();

			getData();
			toggleMood();
		}
	});

	$('.right-bar').click(function(){
		if(day!=myDay || month!=myMonth || yy!=myYy){
			setSlider();

			sliderVal=parseInt($('.slider').val())+1;
			$('.slider').val(sliderVal);

			startDate.setDate(startDay+sliderVal);
			myWeek=startDate.getDay();
			myDay=startDate.getDate();
			myMonth=startDate.getMonth();
			myYy=startDate.getYear();
			myYear=(myYy<1000)?myYy+1900:myYy;

			$('.date').empty();
			$(".date").append(dayOfWeek[myWeek]+", &nbsp;"+months[myMonth]+"&nbsp;"+myDay+", &nbsp;"+myYear);
		
			myDate=myDay.toString()+myMonth.toString()+myYy.toString();

			getData();
			toggleMood();
		}
	});
}

// --------------------
// TOGGLE MOOD
// --------------------

function toggleMood(){
	$('.mood i').click(function(){
		$('.mood i').removeClass('current-mood');
		$(this).toggleClass('current-mood')

		saveMood();
	});
}

// --------------------
// SAVE DATA
// --------------------

function saveJournal(){
	localStorage.setItem('journal'+myDate,$('textarea').val());
}

function saveMood(){
	localStorage.setItem('mood'+myDate,$('.mood').html());
}

function changeJournal(){
	$('textarea').change(function(){
		saveJournal();
	});
}

// --------------------
// GET DATA
// --------------------

function getData(){
	myJournal=localStorage.getItem('journal'+myDate);
	myMood=localStorage.getItem('mood'+myDate);

	$('textarea').val(myJournal);

	$('.mood i').removeClass('current-mood');
	if(myMood!=null){
		$('.mood').html(myMood);
	}
}