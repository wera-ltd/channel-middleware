document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
  let mm = gsap.matchMedia()
  // .header 요소 선택
  const checkHeaderPosition = () => {
    const header = document.querySelector('.js-header')

// ScrollTrigger를 사용한 스크롤 감지
    ScrollTrigger.create({
      start: 'top top',           // 페이지 상단에서 시작
      end: 'bottom bottom',       // 페이지 하단까지 감지
      onUpdate: (self) => {
        const scrollY = window.scrollY || window.pageYOffset // 현재 스크롤 위치
        if (scrollY > 0) {
          header.classList.add('is--scrolled') // scrollY > 0일 때 클래스 추가
        } else {
          header.classList.remove('is--scrolled') // scrollY = 0일 때 클래스 제거
        }
      }
    })
  }

  const section2Motion = () => {
    const section3 = document.querySelector('.js-section3');
    const section2Content = document.querySelector('.js-section2-content')

    // 사라지면서 아래로 내려오는 섹션 모션작업
    gsap.to(section2Content, {
      opacity: 0,              // opacity를 1에서 0으로
      yPercent: 120,           // translateY를 0에서 120%로
      // ease: 'power2.out',      // 부드러운 easing
      ease: 'none',
      scrollTrigger: {
        trigger: section3, // 트리거 요소
        start: 'top 70%',      // .section3 상단이 뷰포트 70%에 닿을 때 시작
        end: 'bottom 160%',        // .section3 하단이 뷰포트 160%에 닿을 때 종료
        scrub: true,              // 스크롤에 따라 부드럽게 반응 (1초 지연)
        markers: false         // 디버깅용 마커 (필요 시 true로 변경)
      }
    })
  }

  //section3 의 모션
  const section3Motion = () => {
    const section3Overview = document.querySelector('.js-section3-overview');
    const section3OverviewBg = document.querySelector('.js-section3-overview-bg');

    //배경 padding값에 관한 모션
    // 초기값 설정
    mm.add("(min-width: 1341px)", () => {
      gsap.set(section3OverviewBg, { padding: 25 });
      // 첫 번째 조건: 살짝 보이면 padding 0
      gsap.to(section3OverviewBg, {
        padding: 0,
        duration: 1.3,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section3Overview,
          start: 'top 40%',
          end: 'top 100%',
          toggleActions: 'play none none reverse'
        }
      });

      // 두 번째 조건: 아래쪽에서 padding 25
      gsap.to(section3OverviewBg, {
        padding: 25,
        duration: 1.3,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section3Overview,
          start: '90% top',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          onLeaveBack: () => gsap.to(section3OverviewBg, { padding: 0, duration: 1.3 }) // 강제 복원
        }
      });
    })
    mm.add("(max-width: 1340px)", () => {
      gsap.set(section3OverviewBg, { padding: 8 });

      // 첫 번째 조건: 살짝 보이면 padding 0
      gsap.to(section3OverviewBg, {
        padding: 0,
        duration: 1.3,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section3Overview,
          start: 'top 40%',
          end: 'top 100%',
          toggleActions: 'play none none reverse'
        }
      });

      // 두 번째 조건: 아래쪽에서 padding 25
      gsap.to(section3OverviewBg, {
        padding: 8,
        duration: 1.3,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section3Overview,
          start: '90% top',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          onLeaveBack: () => gsap.to(section3OverviewBg, { padding: 0, duration: 1.3 }) // 강제 복원
        }
      });
    })





    //배경 padding값에 관한 모션

    // card에 관한 모션
    // section3의 텍스트 내부 버튼 클릭시 scrollTo 이동
    document.querySelectorAll('.js-section3-text-button').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        gsap.to(window, {duration: 1, scrollTo: {y: '#section3Content' + (index), offsetY: 180}})
      })
    })

    // section3-overview-tab 클릭시 scrollTo 이동
    document.querySelectorAll('.js-overview-tab-button').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // btn.classList.remove('is-active')
        btn.classList.add('is--active')
        gsap.to(window, {duration: 1, scrollTo: {y: '#section3Content' + (index), offsetY: 180}})
      })
    })

    // 모든 .overview-content-inner 요소를 대상으로 애니메이션 설정
    mm.add("(min-width: 1341px)", () => {
      console.log('min-width:1340')
      // this setup code only runs when viewport is at least 800px wide
      document.querySelectorAll('.overview-content-inner').forEach((section, index) => {
        const cards = section.querySelectorAll('.overview-content-card')
        const header = section.querySelector('.overview-content-header')
        const tabButtons = document.querySelectorAll('.js-overview-tab-button')
        const allSections = document.querySelectorAll('.overview-content-inner')
        const allVideos = document.querySelectorAll('.js-overview-video')
        const cardInners = section.querySelectorAll('.overview-content-card-inner') // card-inner 선택

        // 초기 상태 설정
        gsap.set(header, { opacity: 0, y: 24 })
        gsap.set(cards, { opacity: 0, y: 24 })

        // 비디오 재생 관리
        const playSectionVideo = (currentSection) => {
          const currentSectionVideos = Array.from(currentSection.querySelectorAll('.js-overview-video'))
          let currentVideoIndex = 0
          let isMouseOver = false // 마우스 오버 상태 플래그
          let isTransitioning = false // 상태 전환 중 플래그

          // 모든 비디오 멈춤
          const pauseAllVideos = () => {
            allVideos.forEach(video => {
              if (!video.paused) {
                video.pause()
                video.currentTime = 0
              }
              const cardInner = video.closest('.overview-content-card-inner')
              if (cardInner) {
                cardInner.classList.remove('is--active')
              }
            })
            isTransitioning = false
          }

          // 비디오 재생 함수
          const playVideo = (video) => {
            if (!video.paused || isTransitioning) return // 재생 중이거나 전환 중이면 중단
            isTransitioning = true
            video.play()
              .then(() => {
                const activeCardInner = video.closest('.overview-content-card-inner')
                if (activeCardInner) {
                  activeCardInner.classList.add('is--active')
                }
                // console.log('Playing video:', video)
                isTransitioning = false
              })
              .catch(err => {
                // console.error('Play error:', err)
                isTransitioning = false
              })
          }

          // 다음 비디오 재생
          const playNextVideo = () => {
            if (isMouseOver || isTransitioning) return // 마우스 오버 또는 전환 중이면 중단

            if (currentVideoIndex >= currentSectionVideos.length) {
              currentVideoIndex = 0 // 반복
            }

            const video = currentSectionVideos[currentVideoIndex]
            pauseAllVideos()
            setTimeout(() => playVideo(video), 50) // 약간의 지연 추가

            video.onended = () => {
              const cardInner = video.closest('.overview-content-card-inner')
              if (cardInner) {
                cardInner.classList.remove('is--active')
              }
              currentVideoIndex++
              playNextVideo()
            }
          }

          // 초기 재생
          if (currentSectionVideos.length > 0) {
            pauseAllVideos()
            playNextVideo()
          } else {
            // console.log('No videos found in section:', currentSection)
          }

          // 마우스 이벤트 (.overview-content-card-inner에 적용)
          cardInners.forEach((cardInner, idx) => {
            const video = cardInner.querySelector('.js-overview-video') // card-inner 내의 비디오
            if (video) {
              cardInner.addEventListener('mouseenter', () => {
                if (isTransitioning) return // 전환 중이면 이벤트 무시
                // console.log('mouseenter on card-inner:', cardInner)
                isMouseOver = true
                pauseAllVideos()
                setTimeout(() => playVideo(video), 50) // 지연 추가
                currentVideoIndex = idx // 인덱스 업데이트
              })

              cardInner.addEventListener('mouseleave', () => {
                if (isTransitioning) return // 전환 중이면 이벤트 무시
                // console.log('mouseleave on card-inner:', cardInner)
                if (!video.paused) {
                  video.pause()
                  cardInner.classList.remove('is--active')
                }
                isMouseOver = false
                playNextVideo() // 순차 재생 재개
              })
            }
          })
        }


        // 기본 모션
        ScrollTrigger.create({
          trigger: section,
          start: '80% bottom',
          end: '100% bottom',
          markers: true,

          onEnter: (self) => {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
            playSectionVideo(self.trigger)
          },
          onToggle: (self) => {
            const currentIndex = index
            const currentElement = self.trigger
            const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null
            const prevHeader = prevSection ? prevSection.querySelector('.overview-content-header') : null
            const prevCards = prevSection ? prevSection.querySelectorAll('.overview-content-card') : null

            if (self.isActive) {
              if (prevSection) {
                gsap.to(prevHeader, {
                  opacity: 0,
                  y: 24,
                  duration: 0.8,
                  ease: 'power2.out'
                })
                gsap.to(prevCards, {
                  opacity: 0,
                  y: 24,
                  duration: 1.2,
                  stagger: 0.3,
                  ease: 'power2.out'
                })
              }
            }
          },
          onLeaveBack: () => {
            gsap.to(header, {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 0,
              y: 24,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
          }
        })

        // 실행 후 위로 올라가는 모션
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 20%',
          onEnterBack: () => {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
            playSectionVideo(section) // onEnterBack에서도 비디오 재생
          }
        })

        // 탭 버튼 상태 업데이트
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          onUpdate: (self) => {
            const progress = self.progress
            if (progress > 0 && progress < 1) {
              updateTab(index)
            }
          },
          markers: false
        })

        // 탭 버튼 업데이트 함수
        function updateTab(activeIndex) {
          tabButtons.forEach((button, btnIndex) => {
            if (btnIndex === activeIndex) {
              button.classList.add('is--active')
            } else {
              button.classList.remove('is--active')
            }
          })
        }
      })


      return () => { // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });
    // 1340이하
    mm.add("(max-width: 1340px)", () => {

      console.log('max-width:1340')
      // this setup code only runs when viewport is at least 800px wide
      document.querySelectorAll('.overview-content-inner').forEach((section, index) => {
        const cards = section.querySelectorAll('.overview-content-card')
        const header = section.querySelector('.overview-content-header')
        const tabButtons = document.querySelectorAll('.js-overview-tab-button')
        const allSections = document.querySelectorAll('.overview-content-inner')
        const allVideos = document.querySelectorAll('.js-overview-video')
        const cardInners = section.querySelectorAll('.overview-content-card-inner') // card-inner 선택

        // 초기 상태 설정
        gsap.set(header, { opacity: 0, y: 24 })
        gsap.set(cards, { opacity: 0, y: 24 })

        // 비디오 재생 관리
        const playSectionVideo = (currentSection) => {
          const currentSectionVideos = Array.from(currentSection.querySelectorAll('.js-overview-video'))
          let currentVideoIndex = 0
          let isMouseOver = false // 마우스 오버 상태 플래그
          let isTransitioning = false // 상태 전환 중 플래그

          // 모든 비디오 멈춤
          const pauseAllVideos = () => {
            allVideos.forEach(video => {
              if (!video.paused) {
                video.pause()
                video.currentTime = 0
              }
              const cardInner = video.closest('.overview-content-card-inner')
              if (cardInner) {
                cardInner.classList.remove('is--active')
              }
            })
            isTransitioning = false
          }

          // 비디오 재생 함수
          const playVideo = (video) => {
            if (!video.paused || isTransitioning) return // 재생 중이거나 전환 중이면 중단
            isTransitioning = true
            video.play()
              .then(() => {
                const activeCardInner = video.closest('.overview-content-card-inner')
                if (activeCardInner) {
                  activeCardInner.classList.add('is--active')
                }
                // console.log('Playing video:', video)
                isTransitioning = false
              })
              .catch(err => {
                // console.error('Play error:', err)
                isTransitioning = false
              })
          }

          // 다음 비디오 재생
          const playNextVideo = () => {
            if (isMouseOver || isTransitioning) return // 마우스 오버 또는 전환 중이면 중단

            if (currentVideoIndex >= currentSectionVideos.length) {
              currentVideoIndex = 0 // 반복
            }

            const video = currentSectionVideos[currentVideoIndex]
            pauseAllVideos()
            setTimeout(() => playVideo(video), 50) // 약간의 지연 추가

            video.onended = () => {
              const cardInner = video.closest('.overview-content-card-inner')
              if (cardInner) {
                cardInner.classList.remove('is--active')
              }
              currentVideoIndex++
              playNextVideo()
            }
          }

          // 초기 재생
          if (currentSectionVideos.length > 0) {
            pauseAllVideos()
            playNextVideo()
          } else {
            // console.log('No videos found in section:', currentSection)
          }

          // 마우스 이벤트 (.overview-content-card-inner에 적용)
          cardInners.forEach((cardInner, idx) => {
            const video = cardInner.querySelector('.js-overview-video') // card-inner 내의 비디오
            if (video) {
              cardInner.addEventListener('mouseenter', () => {
                if (isTransitioning) return // 전환 중이면 이벤트 무시
                // console.log('mouseenter on card-inner:', cardInner)
                isMouseOver = true
                pauseAllVideos()
                setTimeout(() => playVideo(video), 50) // 지연 추가
                currentVideoIndex = idx // 인덱스 업데이트
              })

              cardInner.addEventListener('mouseleave', () => {
                if (isTransitioning) return // 전환 중이면 이벤트 무시
                // console.log('mouseleave on card-inner:', cardInner)
                if (!video.paused) {
                  video.pause()
                  cardInner.classList.remove('is--active')
                }
                isMouseOver = false
                playNextVideo() // 순차 재생 재개
              })
            }
          })
        }


        // 기본 모션
        ScrollTrigger.create({
          trigger: section,
          start: '40% bottom',
          end: '100% bottom',
          markers: true,

          onEnter: (self) => {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
            playSectionVideo(self.trigger)
          },
          onToggle: (self) => {
            const currentIndex = index
            const currentElement = self.trigger
            const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null
            const prevHeader = prevSection ? prevSection.querySelector('.overview-content-header') : null
            const prevCards = prevSection ? prevSection.querySelectorAll('.overview-content-card') : null

            if (self.isActive) {
              if (prevSection) {
                gsap.to(prevHeader, {
                  opacity: 0,
                  y: 24,
                  duration: 0.8,
                  ease: 'power2.out'
                })
                gsap.to(prevCards, {
                  opacity: 0,
                  y: 24,
                  duration: 1.2,
                  stagger: 0.3,
                  ease: 'power2.out'
                })
              }
            }
          },
          onLeaveBack: () => {
            gsap.to(header, {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 0,
              y: 24,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
          }
        })

        // 실행 후 위로 올라가는 모션
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 20%',
          onEnterBack: () => {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            })
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power2.out'
            })
            playSectionVideo(section) // onEnterBack에서도 비디오 재생
          }
        })

        // 탭 버튼 상태 업데이트
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          onUpdate: (self) => {
            const progress = self.progress
            if (progress > 0 && progress < 1) {
              updateTab(index)
            }
          },
          markers: false
        })

        // 탭 버튼 업데이트 함수
        function updateTab(activeIndex) {
          tabButtons.forEach((button, btnIndex) => {
            if (btnIndex === activeIndex) {
              button.classList.add('is--active')
            } else {
              button.classList.remove('is--active')
            }
          })
        }
      })


      return () => { // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });
  }

  // section4 브랜드 리스트 회전
  const section4BrandMotion = () => {
    // section4 브랜드 카드 효과 모션
    const section4BehindContent = document.querySelector('.js-brand-behind-content')
    const section4 = document.querySelector('.js-section4')
    gsap.set(section4BehindContent, { opacity: 0, y: -251 });

    gsap.to(section4BehindContent, {
      opacity: 1,              // opacity를 1에서 0으로
      y: 0,           // translateY를 0에서 120%로
      ease: 'power2.out',      // 부드러운 easing
      scrollTrigger: {
        trigger: section4, // 트리거 요소
        start: 'top 90%',      // .section4 상단이 뷰포트 70%에 닿을 때 시작
        end: 'bottom 160%',        // .section4 하단이 뷰포트 160%에 닿을 때 종료
        scrub: true,              // 스크롤에 따라 부드럽게 반응 (1초 지연)
        markers: true         // 디버깅용 마커 (필요 시 true로 변경)
      }
    })

    // 브랜드 로고 흐르는 모션
    const flowingInner = document.querySelector('.js-flowing-inner');
    const flowingItems = flowingInner.querySelectorAll('.js-flowing-item');

// 원본 아이템을 충분히 복사 (최소 6세트)
    const originalItems = Array.from(flowingItems);
    for (let i = 0; i < 5; i++) { // 원본 1세트 + 추가 5세트 = 총 6세트
      originalItems.forEach(item => {
        const clone = item.cloneNode(true); // 깊은 복사로 요소 복제
        flowingInner.appendChild(clone);
      });
    }

// 브랜드 리스트 무한 스와이프
    let currentScroll = 0;
    let isScrollingDown = true;

    let tween = gsap.to('.js-flowing-inner', { // .js-flowing-item 대신 .js-flowing-inner 전체 이동
      xPercent: -300, // 컨테이너 절반 이동으로 조정
      repeat: -1,
      duration: 50, // 더 긴 주기로 자연스럽게
      ease: 'linear'
    }).totalProgress(0.5);

    gsap.set('.js-flowing-inner', { xPercent: -25 }); // 초기 위치 조정 (컨테이너의 25% 이동)

    window.addEventListener('scroll', function() {
      if ((window.scrollY || window.pageYOffset) > currentScroll) {
        isScrollingDown = true;
      } else {
        isScrollingDown = false;
      }

      gsap.to(tween, {
        timeScale: isScrollingDown ? 1 : -1
      });

      currentScroll = window.scrollY || window.pageYOffset;
    });
  }

  checkHeaderPosition()
  section2Motion()
  section3Motion()
  section4BrandMotion()

});