const { createApp, ref, computed } = Vue
const modalState = ref(false)
const affiliateList = [
  {
    "name": "옥션",
    "src": "assets/images/affiliate/logo-0.svg",
    "status": "normal"
  },
  {
    "name": "지마켓",
    "src": "assets/images/affiliate/logo-1.svg",
    "status": "normal"
  },
  {
    "name": "스마트스토어",
    "src": "assets/images/affiliate/logo-2.svg",
    "status": "normal"
  },
  {
    "name": "11번가",
    "src": "assets/images/affiliate/logo-3.svg",
    "status": "normal"
  },
  {
    "name": "쿠팡",
    "src": "assets/images/affiliate/logo-4.svg",
    "status": "normal"
  },
  {
    "name": "롯데온",
    "src": "assets/images/affiliate/logo-5.svg",
    "status": "normal"
  },
  {
    "name": "위메프",
    "src": "assets/images/affiliate/logo-6.svg",
    "status": "normal"
  },
  {
    "name": "CJ온스타일",
    "src": "assets/images/affiliate/logo-7.svg",
    "status": "normal"
  },
  {
    "name": "GS홈쇼핑",
    "src": "assets/images/affiliate/logo-8.svg",
    "status": "normal"
  },
  {
    "name": "현대홈쇼핑",
    "src": "assets/images/affiliate/logo-9.svg",
    "status": "normal"
  },
  {
    "name": "신세계닷컴",
    "src": "assets/images/affiliate/logo-10.svg",
    "status": "normal"
  },
  {
    "name": "롯데아이몰",
    "src": "assets/images/affiliate/logo-11.svg",
    "status": "normal"
  },
  {
    "name": "신세계 백화점",
    "src": "assets/images/affiliate/logo-12.svg",
    "status": "normal"
  },
  {
    "name": "현대백화점",
    "src": "assets/images/affiliate/logo-13.svg",
    "status": "normal"
  },
  {
    "name": "카카오톡 쇼핑",
    "src": "assets/images/affiliate/logo-14.svg",
    "status": "normal"
  },
  {
    "name": "카카오톡 선물하기",
    "src": "assets/images/affiliate/logo-15.svg",
    "status": "normal"
  },
  {
    "name": "무신사",
    "src": "assets/images/affiliate/logo-16.svg",
    "status": "normal"
  },
  {
    "name": "에이블리",
    "src": "assets/images/affiliate/logo-17.svg",
    "status": "normal"
  },
  {
    "name": "보리보리",
    "src": "assets/images/affiliate/logo-18.svg",
    "status": "normal"
  },
  {
    "name": "하프클럽",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "이마트",
    "src": "assets/images/affiliate/logo-20.svg",
    "status": "normal"
  },
  {
    "name": "더현대",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "고도몰5",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "메이크샵",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "카페24",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "샵바이",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "오늘의집",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "SSF샵",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "텐바이텐",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "이랜드몰",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "지그재그",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "W컨셉",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "한섬EQL",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "normal"
  },
  {
    "name": "하고몰",
    "src": "assets/images/affiliate/logo-19.svg",
    "status": "preparing"
  },
]

const affiliateContent = {
  setup() {
    const keyword = ref('')
    const isShowLoading = ref(false)

    const filteredList = computed(() => {
      if (!keyword.value.trim()) return affiliateList.slice(0,21);
      const keywordLower = keyword.value.toLowerCase();
      return affiliateList.filter(affiliate =>
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

    const showAffiliateModal = () => {
      modalState.value = true
    }

    return {
      isShowLoading,
      keyword,
      filteredList,
      searchKeyword,
      showAffiliateModal
    }
  },
  template:
    ` <div class="affiliate-search-box">
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
        <div v-if="!isShowLoading && filteredList.length >= 20">
          <button class="affiliate-button" @click="showAffiliateModal">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z" fill="#1CD0BA"></path>
            </svg>
            View more integrations
          </button>
        </div>`,
}

const affiliateModal = {
  setup () {
    const hideAffiliateModal = () => {
      modalState.value = false;
    }

    return {
      modalState,
      affiliateList,
      hideAffiliateModal
    }
  },
  template:
    `<transition name="fade"> 
       <div v-if="modalState" class="affiliate-list-modal-area">
        <article class="affiliate-list-modal">
          <button class="affiliate-list-modal-close" @click="hideAffiliateModal">
            <img src="assets/images/common/delete.svg" alt="">
          </button>
          <h1 class="common__title">지원 가능한 판매채널 리스트</h1>
          <p class="common__description">
            궁금하신 점이 있으시면 언제든 문의해주세요.
          </p>
          <ul class="affiliate-list">
            <li class="affiliate-list-item" v-for="(item, idx) in affiliateList" :key="idx" :class="{'preparing' : item.status === 'preparing' }">
              <div class="affiliate-list-item__logo">
                <img :src="item.src" alt="">
              </div>
              <strong class="affiliate-list-item__name">{{ item.name }}</strong>
            </li>
          </ul>
        </article>
      </div>
    </transition>`,
}
createApp(affiliateContent).mount('#affiliateSearch')
createApp(affiliateModal).mount('#affiliateModal')
