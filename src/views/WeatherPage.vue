<template>
  <div>
    <h1>weather page</h1>
    <p>{{ data.city.name }}</p>
    <a-select
      show-search
      :value="value"
      placeholder="input search text"
      style="width: 200px"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
      @change="handleChange"
    >
      <a-select-option v-for="item in dataList" :key="item.value">
        {{ d.text }}
      </a-select-option>
    </a-select>
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
  @weatherState.Action GetData!: () => Promise<void>;
  @weatherState.State data!: Array<any>;

  value = undefined;
  dataList: any[] = [
    { value: "123", text: "1" },
    { value: "124", text: "2" },
    { value: "125", text: "3" },
    { value: "126", text: "4" }
  ];

  mounted() {
    this.GetData();
  }
  handleSearch(value: any) {
    console.log(value);
    // fetch(value, data => (this.data = data));
  }
  handleChange(value: any) {
    console.log(value);
    this.value = value;
    // fetch(value, data => (this.data = data));
  }
}
</script>

<style lang="less" scoped></style>
