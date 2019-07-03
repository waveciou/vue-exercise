;(function (axios, Vue, $) {
    const app = new Vue({
        el: '#aqidatalist',
        data: {
            api: 'https://json2jsonp.com/?url=https://pm25.lass-net.org/data/last-all-epa.json&callback=cbfunc',
            selectList: [],
            selectValue: '全部',
            dataList: [],
            ajaxStatus: ''
        },
        methods: {
            setLevelClass: (item)=> {
                let value = item.AQI;
                let number = Math.floor(Number(value) / 50);
                let className = '';

                if (number <= 0) {
                    number = 0;
                } else if (number >= 4 && number < 6) {
                    number = 4;
                } else if (number >= 6) {
                    number = 5;
                }

                switch (number) {
                    case 0:
                        className = 'aqi-status-1';
                        break;
                    case 1:
                        className = 'aqi-status-2';
                        break;
                    case 2:
                        className = 'aqi-status-3';
                        break;
                    case 3:
                        className = 'aqi-status-4';
                        break;
                    case 4:
                        className = 'aqi-status-5';
                        break;
                    case 5:
                        className = 'aqi-status-6';
                        break;
                }
                return className;
            },
            getAQIdata() {
                // let dataInterceptor = axios.interceptors.request.use((config) => {
                //     this.ajaxStatus = 'is-loading';
                //     return config;
                // });

                $.ajax({
                    url: this.api,
                    type: 'get',
                    dataType: 'jsonp',
                    beforeSend: ()=>{
                        this.ajaxStatus = 'is-loading';
                    },
                    success: (response)=> {
                        this.dataList = response.feeds;
                        this.dataList.length ? this.ajaxStatus = 'is-success' : this.ajaxStatus = 'is-nothing';
                        // axios.interceptors.request.eject(dataInterceptor);
                    },
                    error: (xhr, ajaxOptions, thrownError)=> {
                        this.ajaxStatus = 'is-error';
                    }
                });
            },
            getTownData() {
                let gettown = axios.get('data/town.json').then((data) => {
                    this.selectList = data.data;
                });
            }
        },
        computed: {
            filterDataList: function () {
                let value = this.selectValue;
                let newDataList = [];

                if (value == '全部' || value == '') {
                    this.dataList.forEach(function (item) {
                        if (!item.AQI === false) {
                            newDataList.push(item);
                        }
                    });
                } else {
                    this.dataList.forEach(function (item) {
                        if (item.County === value) {
                            if (!item.AQI === false) {
                                newDataList.push(item);
                            }
                        }
                    });
                }

                newDataList.length ? app.ajaxStatus = 'is-success' : app.ajaxStatus = 'is-nothing';

                //依照AQI指數排列
                newDataList.sort(function (a, b) {
                    return b.AQI - a.AQI;
                });

                return newDataList
            }
        },
        mounted() {
            this.getTownData();
            this.getAQIdata();
            setInterval(()=> {
                this.getAQIdata();
            }, 30000);
        }
    });
})(axios, Vue, $)