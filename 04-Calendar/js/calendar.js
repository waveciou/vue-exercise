;
(function (Vue, moment) {
  const app = new Vue({
    el: '#app',
    data: {
      current: {
        year: 0,
        month: 0,
        date: 0
      },
      today: {
        year: 0,
        month: 0,
        date: 0
      },
      heading: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    },
    methods: {
      changeMonth(isNext) {
        let month = this.current.month;
        isNext === true ? month = month + 1 : month = month - 1;
        if (month <= 0) {
          month = 12;
          this.current.year = this.current.year - 1;
        }
        if (month > 12) {
          month = 1;
          this.current.year = this.current.year + 1;
        }
        this.current.month = month;
        this.current.date = 1;
      },
      getDateData(data) {
        if (data.none === true) {
          return false;
        } else {
          if (data.years === this.current.year && data.month === this.current.month && data.date === this.current.date) {
            return false
          } else {
            this.current.year = data.years;
            this.current.month = data.month;
            this.current.date = data.date;
          }
        }
      },
      backToToday() {
        this.current.year = this.today.year;
        this.current.month = this.today.month;
        this.current.date = this.today.date;
      },
      getToday() {
        this.today.year = moment().year();
        this.today.month = moment().month() + 1;
        this.today.date = moment().date();
      }
    },
    computed: {
      buildCalendar() {
        let myYears = this.current.year;
        let myMonth = this.current.month;
        let myDate = this.current.date;

        let monthText = '';
        myMonth < 10 ? monthText = `0${myMonth}` : monthText = myMonth.toString();

        let dateArray = [];
        let patchNum = 0;
        let totalDate = moment(`${myYears}-${monthText}`).daysInMonth();
        let week = moment(`${myYears}-${monthText}`).format('d');

        for (let i = 0; i < totalDate; i++) {
          let dateNum = i + 1;
          let isToday = false;
          let isCurrent = false;
          let dateText = '';

          if (myYears === this.today.year && myMonth === this.today.month && dateNum === this.today.date) {
            isToday = true;
          }

          if (dateNum === myDate) {
            isCurrent = true;
          }

          dateNum < 10 ? dateText = `0${dateNum}` : dateText = dateNum.toString();

          let obj = {
            years: myYears,
            month: myMonth,
            date: dateNum,
            number: dateText,
            today: isToday,
            current: isCurrent
          }
          dateArray.push(obj);
        }

        // 補上前面的
        for (let i = 0; i < week; i++) {
          let obj = {
            number: '',
            none: true
          }
          dateArray.splice(i, 0, obj)
        }

        // 補上後面的
        dateArray.length % 7 === 0 ? patchNum = 0 : patchNum = 7 - (dateArray.length % 7);

        for (let i = 0; i < patchNum; i++) {
          let obj = {
            number: '',
            none: true
          }
          dateArray.splice(dateArray.length, 0, obj);
        }
        return dateArray;
      },
      convertTwoDigits() {
        let text = '';
        this.current.month < 10 ? text = `0${this.current.month}` : text = this.current.month;
        return text
      }
    },
    created() {
      this.getToday();
      this.backToToday();
    },
    mounted() { }
  })
})(Vue, moment)