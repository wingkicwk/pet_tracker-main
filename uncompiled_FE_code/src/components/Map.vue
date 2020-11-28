<template>
    <div>
        <el-drawer
                title="User Center"
                :visible.sync="isUserDisplay"
                direction="ltr"
                size='300px'
        >
            <UserPage @userStatus="changeStatus"></UserPage>
        </el-drawer>

        <el-row class="parent_rel topBarPosition" align="middle">
            <el-col :span="2" class="vertically_centered">
                <el-button :type="userIcon" circle @click="isUserDisplay = true" style="margin-left: 0px;">
                    <i class="el-icon-user-solid"></i>
                </el-button>
            </el-col>




            <el-button @click="test" type="text" style="float:right; margin-left: 10px;margin-right: 10px">test</el-button>
            <el-button :disabled="!isLogin" type="primary" @click="locatePet" style="float:right">Locate Pet</el-button>

            <!--<el-col :span="22" class="vertically_centered infoPosition">-->

            <!--<span class="info-right">-->
            <!--{{ time.nowDate + ' ' + time.nowWeek + ' ' + time.nowTime }}-->
            <!--<span class="weather">-->
            <!--{{temp}}℉-->
            <!--<el-tooltip class="item" effect="dark" :content="weatherCondition" placement="top-start">-->
            <!--<img :src="weatherIcon" class="weatherIcon">-->

            <!--</el-tooltip>-->
            <!--</span>-->
            <!--</span>-->
            <!--</el-col>-->

        </el-row>


        <el-row style="margin-bottom: 8px">
            <el-button @click="setFirst=true;" :disabled="!isLogin">Set Point1</el-button>
            - {{marker[0]["lat"]}}
            <el-button @click="reset(marker[0])" :disabled="!isLogin">Reset</el-button>
        </el-row>

        <el-row style="margin-bottom: 8px">
            <el-button @click="setSecond=true;" :disabled="!isLogin">Set Point2</el-button>
            - {{marker[1]["lat"]}}
            <el-button @click="reset(marker[1])" :disabled="!isLogin">Reset</el-button>
        </el-row>
        <!--<el-button @click="setSafeArea">generate safe area</el-button>-->
        <el-row style="margin-bottom: 8px">
            <el-tooltip class="item" effect="dark" content="Join us to start" placement="top-start" style="margin-bottom: 8px">
            <span>
                <el-button :disabled="!isLogin" type="primary" @click="setSafeArea">Generate Safe Area</el-button>
            </span>

            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Join us to start" placement="top-start">
            </el-tooltip>
        </el-row>

            <span>

            </span>



        <!--//弹出走丢弹框，调动手机振动接口-->
        <el-dialog
                title="WARNING"
                :visible.sync="missingAlert"
                width="30%"
        >
            <span style="font-size: 18px;font-weight: bold">your dog is out of the safe area</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Locate your pet</el-button>
    <el-button type="primary" @click="dialogVisible = false">Got it</el-button>
  </span>
        </el-dialog>


        <GmapMap
                ref="mymap"
                :center=mapCenter
                :zoom=zoom
                map-type-id="terrain"
                :style="mapSize"
                @click="setMarker"
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
            <GmapMarker
                    :key="key"
                    v-for="(item, key) in marker"
                    :position="getPosition(item)"
                    :clickable="true"
                    @click="toggleInfo(item, key)"
                    :draggable="true"
                    @dragend="updateCoordinates($event.latLng,key)"
            />
            <GmapMarker

                    :icon="dogIcon"
                    :position="dogPosition"
                    :clickable="true"
                    @click="clickDog"

            />
            <!--<GmapMarker-->
            <!--:icon="userMarker"-->
            <!--:position="userPosition"-->
            <!--:clickable="true"-->
            <!--@click="clickDog"-->

            <!--/>-->
        </GmapMap>
    </div>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'
  import axios from 'axios'
  import UserPage from "./Userpage.vue"


  export default {
    data() {
      return {
        zoom: 13,
        mapCenter: {lat: 53.3441, lng: -6.26749},
        isLogin: false,
        userIcon: "primary",
        username: "",
        isUserDisplay: false,
        missingAlert: false,
        dogPosition: {lat: 53.3441, lng: -6.26749},
        userPosition: {lat: 53.3441, lng: -6.26749},
        dogIcon: "https://img.icons8.com/clouds/100/000000/dog.png",
        userMarker: "https://img.icons8.com/clouds/100/000000/user-male.png",
        currentLocation: {},
        areaObject: null,
        safeArea: [],
        setFirst: false,
        setSecond: false,
        mapSize: "width: 100%;height:520px",
        setPosition: false,
        count: 0,
        toGetPosition: false,
        prefixUrl: "http://127.0.0.1:8000",
        marker: {
          0: {
            full_name: 0,
            lat: 0,
            lng: 0
          },
          1: {
            full_name: 1,
            lat: 0,
            lng: 0
          },
        },

        infoPosition: null,
        infoContent: null,
        infoOpened: false,
        infoCurrentKey: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    }, methods: {
      changeStatus: function (value) {
        var _this = this
        console.log(value)
        if (value != "null") {
          _this.userIcon = "success";
          _this.isLogin = true
          _this.username = value
          this.getPreSet()
          this.toGetPosition = true
        } else {
          _this.userIcon = "primary";
          _this.isLogin = false
          _this.username = "null"
          _this.toGetPosition = false
        }
      },
      updateCoordinates: function (evnt, key) {
        this.marker[key] = {
          full_name: key,
          lat: evnt.lat(),
          lng: evnt.lng(),
        };
        this.areaObject.setMap(null)
        this.setSafeArea();
      },
      reset: function (marker) {
        marker.lat = 0
        marker.lng = 0
        this.areaObject.setMap(null)
      },
      toggleInfo: function (marker, key) {
        console.log("tanchu")
        this.infoPosition = this.getPosition(marker)
        this.infoContent = marker.full_name
        if (this.infoCurrentKey == key) {
          this.infoOpened = !this.infoOpened
        } else {
          this.infoOpened = true;
          this.infoCurrentKey = key
        }
      },
      getPosition(marker) {
        return {
          lat: parseFloat(marker.lat),
          lng: parseFloat(marker.lng)
        }
      },
      setMarker: function (event) {
        if (this.setFirst) {
          console.log(event.latLng.lat());
          console.log(event.latLng.lng());
          this.marker[0] = {full_name: this.count, lat: event.latLng.lat(), lng: event.latLng.lng()};
          this.setFirst = false;
          return
        }
        if (this.setSecond) {
          console.log(event.latLng.lat());
          console.log(event.latLng.lng());
          this.marker[1] = {full_name: this.count, lat: event.latLng.lat(), lng: event.latLng.lng()};
          this.setSecond = false;
          return
        }

        console.log("尚未尝试获取坐标")


      },
      setSafeArea: function () {
        axios({
          method: 'post', url: this.prefixUrl + '/setupfence', data: {
            username: this.username,
            q1_lat: this.marker[0]['lat'],
            q1_long: this.marker[0]['lng'],
            q2_lat: this.marker[1]['lat'],
            q2_long: this.marker[1]['lng'],
          }, transformRequest: [
            function (data) {
              let ret = ''
              for (let it in data) {
                // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'))
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          console.log(response)
        })
        if (this.areaObject != null) {
          this.areaObject.setMap(null)
        }
        if (this.marker[0]['lat'] == 0 || this.marker[1]['lat'] == 0) {
          this.$notify({
            title: 'Waring',
            message: 'Please finish the setting',
            type: 'warning'
          });
          return
        }
        this.safeArea = [{lat: this.marker[0]['lat'], lng: this.marker[0]['lng']},
          {lat: this.marker[0]['lat'], lng: this.marker[1]['lng']},
          {lat: this.marker[1]['lat'], lng: this.marker[1]['lng']},
          {lat: this.marker[1]['lat'], lng: this.marker[0]['lng']},]
        this.areaObject = new this.google.maps.Polygon({
          paths: this.safeArea,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#67C23A",
          fillOpacity: 0.25,
        });
        this.areaObject.setMap(this.$refs.mymap.$mapObject);
      },
      test: function () {
        if (this.marker[0].lat > this.marker[1].lat) {
          this.dogPosition.lat = Math.random() * (this.marker[0].lat - this.marker[1].lat) + this.marker[1].lat + 0.003
        } else {
          this.dogPosition.lat = Math.random() * (this.marker[1].lat - this.marker[0].lat) + this.marker[0].lat + 0.003
        }
        if (this.marker[0].lng > this.marker[1].lng) {
          this.dogPosition.lng = Math.random() * (this.marker[0].lng - this.marker[1].lng) + this.marker[1].lng
        } else {
          this.dogPosition.lng = Math.random() * (this.marker[1].lng - this.marker[0].lng) + this.marker[0].lng
        }

      },
      clickDog: function () {
        this.$alert('How are you!', 'Your dog：', {
          confirmButtonText: 'I am fine',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      onSuccess: function (position) {
        alert('纬度: ' + position.coords.latitude + '\n' +
          '经度: ' + position.coords.longitude + '\n' +
          '海拔: ' + position.coords.altitude + '\n' +
          '水平精度: ' + position.coords.accuracy + '\n' +
          '垂直精度: ' + position.coords.altitudeAccura)
      },
      onError: function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("您拒绝对获取地理位置的请求");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("位置信息是不可用的");
            break;
          case error.TIMEOUT:
            alert("请求您的地理位置超时");
            break;
          case error.UNKNOWN_ERROR:
            alert("未知错误");
            break;
        }
      },
      getPreSet: function () {
        var _this = this
        axios({
          method: 'post', url: this.prefixUrl + '/getfence', data: {
            username: this.username
          }, transformRequest: [
            function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'))
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          console.log(response)
          if (response.data['Point1'][0] != 0) {
            _this.marker[0]['lat'] = response.data['Point1'][0]
            _this.marker[0]['lng'] = response.data['Point1'][1]
            _this.marker[1]['lat'] = response.data['Point2'][0]
            _this.marker[1]['lng'] = response.data['Point2'][1]
            _this.setSafeArea()
          }
        })
      },
      lostWaring: function () {
        this.$confirm('Your pet is out of safe area NOW! ', 'Waring', {
          confirmButtonText: 'LOCATE IT!',
          cancelButtonText: 'GOT IT',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Successful locating!'

          });
          this.locatePet()
        })
      },
      locatePet: function () {
//        this.$refs.mymap
        this.$refs.mymap.center = this.dogPosition
        this.zoom = 18

      },
      getPetLocation() {
        var _this = this
        if (!_this.toGetPosition) {
          return
        }
        axios({
          method: 'post', url: this.prefixUrl + '/petposition', data: {
            username: _this.username
          }, transformRequest: [
            function (data) {
              let ret = ''
              for (let it in data) {
                // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'))
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          console.log(response)
          if (response.data.IsSuccess) {
            _this.dogPosition['lat'] = response.data.Point[0]
            _this.dogPosition['lng'] = response.data.Point[1]
          } else {
            this.$message({
              message: 'Fail to get your pet position...try again....',
              type: 'warning'
            });
          }
        })
      }

    },
    watch: {
      "dogPosition.lat": function () {
//        console.log(this.dogPosition)
        if (this.dogPosition.lat > this.marker[0]['lat'] && this.dogPosition.lat > this.marker[1]['lat']) {
          console.log('warring1')
          this.lostWaring()
          return
        }
        if (this.dogPosition.lat < this.marker[0]['lat'] && this.dogPosition.lat < this.marker[1]['lat']) {
          console.log('warring2')
          this.lostWaring()
          return
        }
        if (this.dogPosition.lng > this.marker[0]['lng'] && this.dogPosition.lng > this.marker[1]['lng']) {
          console.log('warring3')
          return
        }
        if (this.dogPosition.lng < this.marker[0]['lng'] && this.dogPosition.lng < this.marker[1]['lng']) {
          console.log('warring4')
          return
        }

      }, deep: true,
    },
    mounted() {
//      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log(pos)
            this.userPosition = pos
          })
      }
      setInterval(this.getPetLocation, 5000)
    },
    computed: {
      google: gmapApi,

    },
    components: {UserPage,}
    ,
  }
</script>