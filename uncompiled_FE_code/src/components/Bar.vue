<template>
    <div>
        <el-row class="parent_rel topBarPosition" align="middle">
            <el-col :span="2" class="vertically_centered">
                <el-button :type="userIcon" circle @click="isUserDisplay = true" style="margin-left: 0px;">
                    <i class="el-icon-user-solid"></i>
                </el-button>
            </el-col>

            <el-col :span="22" class="vertically_centered infoPosition">

                <span class="info-right">
                    {{ time.nowDate + ' ' + time.nowWeek + ' ' + time.nowTime }}
        <span class="weather">
            {{temp}}℉
 <el-tooltip class="item" effect="dark" :content="weatherCondition" placement="top-start">
            <img :src="weatherIcon" class="weatherIcon">

</el-tooltip>
        </span>
        </span>
            </el-col>

        </el-row>
        <el-row>
            1232131asdasdasd
        </el-row>
        <el-row>
            <el-autocomplete placeholder="Your origin"
                             v-model="origin"
                             :fetch-suggestions="querySearch"
                             :trigger-on-focus="false"
                             suffix-icon="el-icon-edit">
                <template slot="prepend">From:</template>
            </el-autocomplete>

        </el-row>
        <el-row>
            <el-autocomplete placeholder="Your destination"
                             v-model="destination"
                             :fetch-suggestions="querySearch"
                             :trigger-on-focus="false"
                             suffix-icon="el-icon-edit">
                <template slot="prepend">_To_ :</template>
            </el-autocomplete>


        </el-row>
        <el-row>

            <el-col :span="24">
                <el-button el-button @click="routesDisplay" :type="userIcon" class="go_button"
                           v-loading.fullscreen.lock="loading">GO
                </el-button>
            </el-col>

        </el-row>
        <el-drawer
                title="User Center"
                :visible.sync="isUserDisplay"
                direction="ltr"
                size='300px'
        >
            <UserPage :isUserDisplay="isRouteSelectDisplay" @child1="parent1"></UserPage>
        </el-drawer>
        <el-drawer
                :visible.sync="isRouteSelectDisplay"
                size="40%"
                @close="closeSelect"
                direction="ttb">

            <RouteSelect :steps="stepList"></RouteSelect>
        </el-drawer>


        <GmapMap
                ref="mymap"
                :center="{lat: 53.3441, lng: -6.26749}"
                :zoom="13"
                map-type-id="terrain"
                :style="mapSize"
                @click="mark"
                :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
        }"
        >
        </GmapMap>


    </div>

</template>

<script>
  import UserPage from "./Userpage.vue"
  import RouteSelect from "./RouteSelect.vue"
  import {stopDic} from "../assets/stops.js"
  import {gmapApi} from 'vue2-google-maps'

  export default {
    name: "Bar",
    data() {
      return {
        stepList: [],
        day_of_week: 0,
        stopList: [],
        origin: '',
        destination: '',
        userIcon: "primary",
        weatherCondition: "",
        loading: false,
        mapSize: "width: 100%;height:520px",
        weatherAPI: "http://api.openweathermap.org/data/2.5/weather?q=dublin,IE&units=Imperial&appid=1653b02f26bcff3846a70971438a5d71",
        afterLogin: false,
        mapInit: false,
        map: null,
        DirectionsRequest: {
          origin: '',
          destination: '',
          travelMode: 'TRANSIT',
          transitOptions: {modes: ['BUS']},
//          provideRouteAlternatives: false,
        },

        isRouteSelectDisplay: false,
        isUserDisplay: false,
        time: {
          nowDate: "",
          nowTime: "",
          nowWeek: "loading..."
        },
        weatherIcon: '',
        temp: 'loading...',
        stops: [],
        directionsService: null,
        directionsRenderer: null
      }
    },
    components: {
      UserPage,
      RouteSelect
    },
    methods: {
      parent1: function (data) {
//        console.log(data,111)
        var _this = this
        if (data) {
          _this.userIcon = "success";
        } else {
          _this.userIcon = "primary";
        }
        this.afterLogin = data;
        this.mapSize = "mapSize:width: 100%;height:600px";

        this.$emit("child2", this.afterLogin)
      },
      routesDisplay: function () {
        this.stepList = []
        this.stopList = []
        var _this = this;
        _this.loading = true;

        var o = false;
        var d = false;


        o = stopDic.some(function (item) {
          return item.value == _this.origin
        });
        d = stopDic.some(function (item) {
          return item.value == _this.destination
        });
        if (o && d) {
          this.queryRoutes();


        } else {
          this.$notify({
            title: 'Waring',
            message: 'Please enter the accurate stop names',
            type: 'warning'
          });
          _this.loading = false
        }


      },
      querySearch(queryString, cb) {
        var stops = this.stops;
        var results = queryString ? stops.filter(this.createFilter(queryString)) : stops;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (stops) => {
          return (stops.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      loadAll() {
        return stopDic
      },
      getTime: function () {
        var _this = this;
        const axios = require('axios').default;
        let timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Dublin'
        axios.get(timeUrl)
          .then(function (response) {
            // handle success
            var regex_time = /T(.+?)\./g
            var regex_date = /(.+?)T/g
            _this.time.nowTime = regex_time.exec(response.data.datetime)[1]
            _this.time.nowDate = regex_date.exec(response.data.datetime)[1]
            _this.day_of_week = response.data.day_of_week
            switch (response.data.day_of_week) {
              case 1:
                _this.time.nowWeek = "Monday";
                break;
              case 2:
                _this.time.nowWeek = "Tuesday";
                break;
              case 3:
                _this.time.nowWeek = "Wednesday";
                break;
              case 4:
                _this.time.nowWeek = "Thursday";
                break;
              case 5:
                _this.time.nowWeek = "Friday";
                break;
              case 6:
                _this.time.nowWeek = "Saturday";
                break;
              default:
                _this.time.nowWeek = "Sunday";
            }
//            console.log(_this.time.nowTime,response)
          })
      },
//      matchCord:function(stop):
      queryRoutes: function () {

        if (!this.mapInit) {
          this.directionsService = new this.google.maps.DirectionsService;
          this.directionsRenderer = new this.google.maps.DirectionsRenderer;
          this.directionsRenderer.setMap(this.$refs.mymap.$mapObject);
          this.mapInit = true;
        }
        var _this = this;
        _this.loading = true;
        //换成坐标
        for (var j = 0; j < stopDic.length; j++) {
          if (_this.origin == stopDic[j].value) {
            _this.DirectionsRequest.origin = stopDic[j].cord;
            break
          }
        }
        for (var i = 0; i < stopDic.length; i++) {
          if (_this.destination == stopDic[i].value) {
            _this.DirectionsRequest.destination = stopDic[i].cord
            break
          }
        }

        _this.directionsService.route(_this.DirectionsRequest, function (response, status) {
          if (status === 'OK') {

            _this.directionsRenderer.setDirections(response);
            console.log(response);


            _this.prepRoute(response)


          } else {
            window.alert('Directions request failed due to ' + status);

          }
        })
//        _this.loading = false;

      },
      prepRoute: function (response) {
        var steps = response.routes[0].legs[0].steps
        var patt = /stop/
        var notFound = false
        var unchekableReason = []

        for (var i = 0; i < steps.length; i++) {
          if (steps[i]['travel_mode'] == "TRANSIT") {
//            stepList.push(steps[i]['instructions'])
            var step = {'way': '', 'time': '', 'instrucion': ''}

            var stopNameA = steps[i]['transit']['arrival_stop']['name']
            var stopNameD = steps[i]['transit']['departure_stop']['name']
            var stopIdA = '';
            var stopIdD = '';
            if (patt.test(stopNameA) && patt.test(stopNameD)) {

              for (var j = 0; j < stopDic.length; j++) {
                if (stopNameA == stopDic[j].value) {
                  stopIdA = stopDic[j].stop_Id
                  break
                }
              }
              for (var q = 0; q < stopDic.length; q++) {
                if (stopNameD == stopDic[q].value) {
                  stopIdD = stopDic[q].stop_Id
                  break
                }
              }
              this.stopList.push({
                "route_id": steps[i].transit.line.short_name,
                "ori_id": stopIdD, "des_id": stopIdA, "dayofweek": this.day_of_week, "time": this.time.nowTime,
              });

              step = {
                'way': steps[i].transit.line.short_name,
                'time': steps[i]['duration']['text'] + '( provided by google)',
                'instruction': steps[i]['instructions']
              }
              console.log(step)
              this.stepList.push(step)
              continue
            } else {
              if (!patt.test(stopNameA)) {
                unchekableReason.push(stopNameA)
              }
              if (!patt.test(stopNameD)) {
                unchekableReason.push(stopNameD)
              }
              notFound = true

            }

          } else {
            step = {
              'way': 'Walking',
              'time': steps[i]['duration']['text'] + '( provided by google)',
              'instruction': steps[i]['instructions']
            }
            this.stepList.push(step)

            if (steps.length == 1) {
              this.isRouteSelectDisplay = true
              notFound = true
            }
          }
        }
        if (!notFound) {
          console.log(this.stepList, "checkable");


          this.postStops()

        } else {
          console.log(unchekableReason, 111, this.stepList)
          var info = 'The following stops in the route you are querying cannot be identified because there is no stop id： '
          for (var s = 0; s < unchekableReason.length; s++) {
            info += unchekableReason[s] + "; "
          }

          this.$notify({
            title: 'Sorry',
            message: info,
            type: 'warning'
          });

        }
        this.loading = false;
      },
      postStops: function () {
        console.log("caluculate by model")
        const axios = require('axios').default;
//        var _this = this;
        axios.post('/predict', this.stopList).then((response) => {

//          [{
//            route_id: "44b",
//            ori_id: "2829",
//            des_id: "6006",
//            dayofweek: 5,
//            time: "23:00:00"
//          }]
          console.log("calculateApi", response)

          var _this = this;
          console.log(_this)
          var data = response.data
          for (var i = 0; i < _this.stepList.length; i++) {
            for (var key in data) {
              if (key.toLowerCase() == _this.stepList[i].way) {
                if (data[key] != -1) {
                  _this.stepList[i].time = data[key].toFixed(2) + " seconds, calculated from model"
                }
              }
            }
          }
          console.log(_this.stepList)
          this.isRouteSelectDisplay = true
        })
      },
      getWeather: function () {
        const axios = require('axios').default;
        var _this = this
        axios.get(_this.weatherAPI)
          .then(function (response) {
            console.log(response)
            var data = response.data;
            var icon = data['weather'][0]['icon'];
            _this.weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            _this.temp = data.main.temp;
            _this.weatherCondition = data['weather'][0]['description']
          });
      },
      closeSelect: function () {
        this.stepList = []
        this.stopList = []
        console.log('clear data')
      },
      currentTime: function () {
        this.getTime()
        setInterval(this.getTime, 500);
      },
      aaa: function () {
        console.log(111)
      },
      mark(event) {
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
      }

    }, mounted() {
      this.stops = this.loadAll();
//      this.currentTime();
//      this.getWeather()

      this.$refs.mymap.$on('click', this.aaa)


    },
    computed: {google: gmapApi},

  }

</script>
<style scoped>
    @import "../assets/style.css";
</style>
