<template>
  <div class="weather">
    <div class="weather-field">
      <a-select
        show-search
        :value="value"
        placeholder="Поиск по городу"
        style="width: 200px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option
            v-for="item in citiesList"
            :key="item.name"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </div>
    <ul class="weather-list">
      <li v-for="item of byDays" class="weather-item" :key="item.cod">
        <div>
          <div class="weather-item__title"></div>
          <div v-for="inner of item" :key="inner.dt">{{inner.dt_txt}}</div>
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

  value = "";
  dataList = [];

  handleSearch(val: string) {
    if (val.length > 3) {
      this.GetCities(val);
    }
  }
  handleChange(val: string) {
    this.value = val;
    this.GetData(val);
  }
}
</script>

<style lang="less" scoped>
.weather {
  display: flex;
  padding-top: 50px;
  &-field {
    display: inline-flex;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 8px;
    padding: 20px;
    margin-left: 50px;
    margin-right: 50px;
    align-self: flex-start;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    font-size: 16px;
    border-radius: 8px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    margin-bottom: 16px;
    margin-right: 16px;
    flex-shrink: 0;
  }
}
</style>
