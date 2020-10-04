<template>
  <div class="weather">
    <div class="weather-field">
      <a-select
        show-search
        :value="value"
        placeholder="Узнай погоду в своём городе"
        style="width: 260px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option v-for="item in citiesList" :key="item.name">
          {{ item.name }}
        </a-select-option>
      </a-select>
      <div class="weather-now" v-if="byDays.length">
        <img
          width="100"
          height="100"
          :src="
            `http://openweathermap.org/img/wn/${byDays[0] &&
              byDays[0][0] &&
              byDays[0][0].weather[0].icon}@2x.png`
          "
          alt="icon"
        />
        {{
          byDays[0] &&
            byDays[0][0] &&
            byDays[0][0].main &&
            byDays[0][0].main.temp
        }}°C
      </div>
    </div>
    <ul class="weather-list">
      <li v-for="item of byDays" class="weather-item" :key="item.cod">
        <div>
          <div class="weather-item__title">
            {{ moment(item[0].dt_txt).format("LL (dddd)") }}
          </div>
          <div class="weather-item-inner">
            <div
              class="weather-item-inner-col"
              v-for="inner of item"
              :key="inner.dt"
            >
              {{ moment(inner.dt_txt).format("h:mm") }}
              <img
                width="50"
                height="50"
                :src="
                  `http://openweathermap.org/img/wn/${inner.weather[0].icon}@2x.png`
                "
                alt="icon"
              />
              {{ inner.main.temp }}°
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const weatherState = namespace("weather");

@Component({
  name: "WeatherPage",
  components: {}
})
export default class WeatherPage extends Vue {
  @weatherState.Action GetData!: (val: string) => Promise<void>;
  @weatherState.Action GetCities!: (val: string) => Promise<void>;
  @weatherState.State data!: Array<any>;
  @weatherState.State citiesList!: Array<any>;
  @weatherState.Getter byDays!: Array<any>;

  value: string | undefined = null;
  dataList = [];

  mounted() {
    this.value = this.$route.params.name;
    if (this.value) {
      this.handleChange(this.value);
    }
  }
  handleSearch(val: string) {
    if (val.length > 2) {
      this.GetCities(val).catch(() => {
        this.$message.error("Ошибка получения данных");
      });
    }
  }
  handleChange(val: string) {
    this.value = val;
    this.GetData(val)
      .then(() => {
        if (this.$route.params.name !== val) {
          this.$router.push(val);
        }
      })
      .catch(() => {
        this.$message.error("Ошибка получения данных");
      });
  }
}
</script>

<style lang="less" scoped>
.weather {
  display: flex;
  padding: 50px 50px 50px 50px;
  &-now {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 60px;
    font-weight: lighter;
    padding-top: 20px;
  }
  &-field {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 20px;
    margin: 0 50px 50px 0;
    align-self: flex-start;
  }
  &-list {
    display: flex;
    padding: 0;
    flex-direction: column;
  }
  &-item {
    font-size: 16px;
    border-radius: 8px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    margin-bottom: 16px;
    flex-shrink: 0;
    &__title {
      font-size: 21px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 8px;
    }
  }
  &-item-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &-col {
      border: 1px solid rgba(255, 255, 255, 0.9);
      padding: 8px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
