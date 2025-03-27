const { createApp, reactive, ref, computed, watchEffect, onMounted } = Vue;
const vuetify = Vuetify.createVuetify();

createApp({
  setup() {
    const selected = ref('BASIC')
    const enterpriseCount = ref({
      min: 0,
      max: 30000,
      inputValue: 3000,
      step: 1000,
    })
    const otherCount = ref({
      min: 0,
      max: 2000,
      inputValue: 300,
    })
    const schedule = ref({
      min: 0,
      max: 50,
      inputValue: 0,
      step: 10,
    })

    watchEffect(() => {
      if (enterpriseCount.value.inputValue < 3000) {
        enterpriseCount.value.inputValue = 3000;
      }
      if (Number(schedule.value.inputValue) === 0) {
        schedule.value.inputValue = 4;
      }
    });

    const handleSelectOrder = (selectedValue) => {
      selected.value = selectedValue;
      switch (selected.value) {
        case 'BASIC': otherCount.value.inputValue = 300; break;
        case 'PRO': otherCount.value.inputValue = 600; break;
        case 'PREMIUM': otherCount.value.inputValue = 1200; break;
        case 'PLATINUM': otherCount.value.inputValue = 2000; break;
      }
    };


    const enterpriseCountDisplayValue = computed(() => {
      return Number(enterpriseCount.value.inputValue).toLocaleString('ko-KR');
    });

    const enterpriseCountPrice = computed(() => {
      if (enterpriseCount.value.inputValue === 3000) return 360000;
      if (enterpriseCount.value.inputValue === 4000) return 480000;
      if (enterpriseCount.value.inputValue === 5000) return 540000;
      return enterpriseCount.value.inputValue * 100;
    });

    const otherCountDisplayValue = computed(() => {
      return Number(otherCount.value.inputValue).toLocaleString('ko-KR');
    });

    const otherCountPrice = computed(() => {
      if (otherCount.value.inputValue === 300) return 50000;
      if (otherCount.value.inputValue === 600) return 120000;
      if (otherCount.value.inputValue === 1200) return 180000;
      if (otherCount.value.inputValue === 2000) return 280000;
      return 50000;
    });

    const schedulePrice = computed(() => {
      return schedule.value.inputValue === 4 ? 0 : schedule.value.inputValue * 5000;
    });

    const scheduleDisplayValue = computed(() => {
      if (schedule.value.inputValue == 0) {
        return 4
      }
      return schedule.value.inputValue
    });

    const sumPrice = computed(() => {
      return ((selected.value === 'ENTERPRISE' ? enterpriseCountPrice.value : otherCountPrice.value) + schedulePrice.value).toLocaleString('ko-KR');
    });

    return {
      selected,
      enterpriseCount,
      otherCount,
      schedule,
      handleSelectOrder,
      otherCountDisplayValue,
      enterpriseCountDisplayValue,
      scheduleDisplayValue,
      sumPrice,
    };
  }
}).use(vuetify).mount('#calculatePriceArticle');