import $ from "jquery";
import Vue from "vue";
import vuejsDatepicker from "vuejs-datepicker";
import VueSlider from "vue-slider-component";
import {ru} from "vuejs-datepicker/dist/locale/index.js";

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

/**
 * Калькулятор
 * 
 * ! Нужно обратиться к Данилу пержжде чем 
 * ! менято что-либо
 * 
 */
/*****/

/**
	data-list="[{'id':0,'name':'Микрозайм «Фермер»','otsrok':{'min':0,'max':5,'default':0},'srok':{'min':3,'max':24,'default':24,'step':1},'summa':{'min':100000,'max':3000000,'default':500000,'step':5000},'persent':10}]", 
*/

const getNormalDate = date => (new Date(date).getDate().toString().length == 1 ? "0"+new Date(date).getDate() : new Date(date).getDate())+"."
	+((new Date(date).getMonth()+1).toString().length == 1 ? "0"+(new Date(date).getMonth()+1) : (new Date(date).getMonth()+1))+"."
	+new Date(date).getFullYear();

Vue.component("calc", {
	components: {
		VueSlider,
		vuejsDatepicker
	},
	props: {
		id: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ""
		},
		type: {
			type: Array,
			default: [{
				id: 0,
				min: 10000,
				max: 5000000,
				default: 500000,
				step: 5000,
				percent: 10,
				srok: {
					min: 1,
					max: 18,
					default: 12,
					step: 1
				}
			}]
		},
	},
	data: () => ({
		curDate: new Date(new Date(new Date(new Date().setMinutes(0)).setHours(0)).setSeconds(0)),
		nextDate: "",
		curSrok: 4,
		summ: 0,
		pereplata: 0,
		itog: 0,
		curOtsrok: 0,
		vsego: 0,
		tableArr: [],
		maxOtsrok: 0,
		curName: "",
		selected: 1,
		persent: 10,
        payInLastMonths: 0,
        ru: ru,
		otsrok: {
			min: 0,
			max: 6,
			default: 0
		},

		timetables: [
			{
				id: 0,
				name: "Аннуитетный"
			},
			{
				id: 1,
				name: "Дифференцированный"
			}
		],
		curTimetableID: 1
	}),
	beforeMount(){

		this.selected = this.type[0].id

		this.curSrok = this.curType.srok.default
		this.summ = parseInt(this.curType.default)
	},
	mounted(){
        this.init()
        
        // console.log(this.curDate);

		$(".open-calc").click(function(){
			$("#calc").slideDown(300)

			setTimeout(function(){
				$("html, body").animate({
					scrollTop: $("#calc").offset().top - 80 
				}, 300)
			}, 50)

			return false
		})
	},
	watch: {
		curSrok(val, oldVal){
			if (isNaN(val)){
				this.curSrok = oldVal
				return
			}

			this.setNextDate()
			this.calc()
		},
		summ(val, oldVal){
			if (isNaN(val)){
				this.summ = oldVal
				return
			}

			// this.setNextDate()
			this.calc()
		},

		selected(val, oldVal){
			this.curSrok = this.curType.srok.default
			this.summ = parseInt(this.curType.default)

			this.curOtsrok = this.curType.otsrok.default
			this.maxOtsrok = this.curType.otsrok.max

			this.percent = this.curType.percent

			this.setNextDate()
			this.calc()
		},
		curDate(val, oldVal){
			this.setNextDate()
			this.calc()
		},
		curOtsrok(val, oldVal){
			this.setNextDate()
			this.calc()
		},

		curTimetableID(val, oldVal){
			this.curOtsrok = this.curType.otsrok.default
			this.maxOtsrok = this.curType.otsrok.max
			this.calc()
		}
	},
	methods: {
		init(){
			this.percent = this.curType.percent

			this.curOtsrok = this.curType.otsrok.default
			this.maxOtsrok = this.curType.otsrok.max

			this.updateOtsrok()
			
			this.setNextDate()

			this.calc()
		},
		partitionNumber: number => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
		setNextDate(){
			let tmpDate = this.curDate.format("dd.mm.yyyy").split(".");

			tmpDate = new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])

			tmpDate.setMonth(tmpDate.getMonth() + this.curSrok)

			this.nextDate = getNormalDate(tmpDate)
		},

		updateOtsrok(){
			if (!!this.curType.payInLastMonths){
				this.curOtsrok = this.curSrok - this.curType.payInLastMonths
				this.maxOtsrok = this.curSrok - this.curType.payInLastMonths
			}
		},

		calc(){
			this.updateOtsrok()

			switch (this.curTimetableID){
				case 0:
					this.makeTable()
				break;

				case 1:
					this.makeSecondTable()
				break;
			}
			this.pereplata = 0;

			for (let i in this.tableArr){
				let row = this.tableArr[i];

				this.pereplata += parseInt(row.forPersents)
			}

			this.pereplata = +this.pereplata.toFixed(2);

			this.itog = this.summ;

			this.vsego = this.pereplata + this.itog + " руб.";
			this.vsego = this.pereplata + this.itog + " руб.";

			this.vsego = this.partitionNumber(this.vsego);

			this.itog = this.itog + " руб.";

			this.itog = this.partitionNumber(this.itog);

			this.pereplata = this.pereplata + " руб."

			this.pereplata = this.partitionNumber(this.pereplata);
        },
        /** Аннуитетный */
		makeTable(){
            
			let mes = 12 - this.curOtsrok;
			// let mes = this.curSrok - this.curOtsrok;

			this.tableArr = [];

			const getDate = date => {
				const tmpDate = date.split(".");

				return new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])
			};

			let i = 0;

			while (true){

                let tmpDate = getDate(this.curDate.format("dd.mm.yyyy"));
                
                

				this.tableArr[i] = {};

				const table = this.tableArr[i];

                tmpDate.setMonth(tmpDate.getMonth() + i+1);
                
                console.log(tmpDate);

				table.date = getNormalDate(tmpDate)

				if (i == 0){
					table.forPersents = this.summ * this.persent * (Math.floor(getDate(table.date) -  getDate(this.curDate.format("dd.mm.yyyy"))) / 1000 / 60 / 60 / 24) / 
						((new Date(tmpDate.getFullYear()+1, 1, 0) - new Date(tmpDate.getFullYear(), 1, 0)) / 1000 / 60 / 60 / 24) / 100;

					table.itog = this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.curType.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)))
					// if (this.summ * this.persent / 100 / (this.curSrok - this.curOtsrok) / (1 - Math.pow((1 + this.persent / 100 / (this.curSrok - this.curOtsrok)), -(this.curSrok - this.curOtsrok))) < this.)
					// table.itog = this.summ 
				}else{
					table.forPersents = this.tableArr[i-1].ostatok * this.persent * (Math.floor(getDate(table.date) -  getDate(this.tableArr[i-1].date)) / 1000 / 60 / 60 / 24) / 
						((new Date(tmpDate.getFullYear() + 1, 1, 0) - new Date(tmpDate.getFullYear(), 1, 0)) / 1000 / 60 / 60 / 24) / 100;


					if (this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.curType.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok))) < +this.tableArr[i-1].ostatok){
						table.itog = this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.curType.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)))
					}else{
						table.itog = +this.tableArr[i-1].ostatok + table.forPersents;
					}
				}

				if (i+1 <= this.curOtsrok){
					table.forDolg = 0;
					table.itog = 0;
				}
				else
					table.forDolg = table.itog - table.forPersents;

				if (i == 0){
					table.ostatok = this.summ - table.forDolg;
				}else{
					table.ostatok = this.tableArr[i-1].ostatok - table.forDolg;
				}

				table.itog = table.itog.toFixed(2);
				table.ostatok = table.ostatok.toFixed(2);
				table.forPersents = table.forPersents.toFixed(2);
				table.forDolg = table.forDolg.toFixed(2);
				i++

				if (parseFloat(table.ostatok) == 0)
					break
			}
		},
		makeSecondTable(){
			let mes = 12 - this.curOtsrok;

			this.tableArr = [];

			const getDate = date => {
				const tmpDate = date.split(".");

				return new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])
			};

			let i = 0;

			while (true){

                let tmpDate = getDate(this.curDate.format("dd.mm.yyyy"));

				this.tableArr[i] = {};

				const table = this.tableArr[i];

				tmpDate.setMonth(tmpDate.getMonth() + i+1);

				table.date = getNormalDate(tmpDate)

				if (i == 0){
					table.forPersents = this.summ * this.persent / 12 / 100

					table.forDolg = Math.ceil(this.summ / (!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok))

				}else{
					table.forPersents = this.tableArr[i-1].ostatok * this.persent / 12 / 100

					if (this.summ / this.curSrok < this.tableArr[i-1].ostatok)
						table.forDolg = Math.ceil(this.summ / (!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok))
					else
						table.forDolg = Math.ceil(this.tableArr[i-1].ostatok)
				}

				if (i+1 <= this.curOtsrok){
					table.forDolg = 0;
					table.itog = 0;
				}
				else
					// table.forDolg = table.itog - table.forPersents;
					table.itog = table.forDolg + table.forPersents

				if (i == 0){
					table.ostatok = this.summ - table.forDolg;
				}else{
					table.ostatok = this.tableArr[i-1].ostatok - table.forDolg;
				}

				table.itog = parseFloat(table.itog).toFixed(2);
				table.ostatok = parseFloat(table.ostatok).toFixed(2);
				table.forPersents = parseFloat(table.forPersents).toFixed(2);
				table.forDolg = parseFloat(table.forDolg).toFixed(2);

				i++

				if (parseFloat(table.ostatok) <= 0){
					table.ostatok = 0
					break
				}
			}
		},
		print(){
			$("body").addClass("page-calc__body");
			window.print()
		}
	},
	computed: {
		curType(){
			return this.type.filter(item => item.id == this.selected)[0]
		}
	}
});


let calc;

$(function(){
	if ($("#calc").length)
		calc = new Vue({
			el: "#calc",
			mounted(){
				$("body").addClass("page-calc__body");
				console.log("calc mounted");
            }
		});
});