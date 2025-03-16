const { createApp, ref, computed, onMounted } = Vue
const modalState = ref(false)
const html = document.querySelector('html')
const section4MoreButton = document.querySelector('.js-section4-more-button')

section4MoreButton.addEventListener('click', () => {
  html.style.overflowY = 'hidden'
  showAffiliateModal()
})

const showAffiliateModal = () => {
  modalState.value = true
}

const affiliateModal = {
  setup () {
    const keyword = ref('')
    const isShowLoading = ref(false)
    const affiliateList = ref([])

    // 지원가능한 판매채널 리스트
    const fetchAffiliateList = () => {
      fetch('/assets/affiliateList.json')
        .then(response => response.json())
        .then(data => {
          affiliateList.value = data
        })
        .catch(error => console.error('Error loading JSON:', error))
    }

    const filteredList = computed(() => {
      if (!keyword.value.trim()) return affiliateList.value;
      const keywordLower = keyword.value.toLowerCase();
      return affiliateList.value.filter(affiliate =>
        affiliate.name.toLowerCase().includes(keywordLower)
      )
    })

    const searchKeyword = (value) => {
      isShowLoading.value = true
      keyword.value = value
      setTimeout(() => {
        isShowLoading.value = false
      }, 1000)
    }

    const hideAffiliateModal = () => {
      modalState.value = false;
      html.style.overflowY = 'auto'
    }

    onMounted(() => {
      fetchAffiliateList()
    })

    return {
      isShowLoading,
      keyword,
      filteredList,
      searchKeyword,
      modalState,
      affiliateList,
      hideAffiliateModal
    }
  },
  template:
    `<transition name="fade"> 
       <div v-if="modalState" class="affiliate-list-modal-area js-affiliate-list-modal-area">
        <article class="affiliate-list-modal">
          <button class="affiliate-list-modal-close" @click="hideAffiliateModal">
            <img src="assets/images/common/delete.svg" alt="">
          </button>
          <h1 class="common__title">지원 가능한 판매채널 리스트</h1>
         <div class="affiliate-search-box">
            <div class="affiliate-search">
              <label for="search" class="blind"></label>
              <div class="affiliate-search-input-box">
                <div class="affiliate-search-input-box-inner">
                  <input type="text" id="search" ref="searchInput" :value="keyword"  @input="searchKeyword($event.target.value)" class="affiliate-search-input-box-input" placeholder="Search by Channel" />
                </div>
              </div>
            </div>
            <div class="affiliate-search-icon">
              <img src="assets/images/main/search.svg" alt="">
            </div>
          </div>
           <span class="loader" v-if="isShowLoading"></span>
            <div class="affiliate-list-box" v-if="!isShowLoading">
              <ul class="affiliate-list">
                <li class="affiliate-list-item" v-for="(item, index) in filteredList" :key="index" :class="{'preparing' : item.status ==! 'normal' }">
                  <div class="affiliate-list-item__logo">
                    <img :src="item.src" alt="">
                  </div>
                  <strong class="affiliate-list-item__name">{{ item.name }}</strong>
                </li>
              </ul>
            </div>
            <div v-if="!isShowLoading && filteredList.length === 0" class="affiliate-no-result-text">검색결과가 없습니다</div>
        </article>
      </div>
    </transition>`,
}
createApp(affiliateModal).mount('#affiliateModal')
