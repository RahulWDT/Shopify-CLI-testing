/* video code start */
let isYouTubePlaying = false;
document.addEventListener('click', function (e) {
  var playicon = e.target.closest('.playicon_video'); 
  var video = document.querySelector('.my_video');
  var coverImage = document.querySelector('.cover_image');
  var pauseIconEl = document.querySelector('.pauseicon_video');

 

  if (playicon && video) {
    video.play(); 
    playicon.classList.add('hide-important');
    if (coverImage) {
      coverImage.classList.add('hide-important');
    }
  }

  
 var play_video = e.target.closest('.play_video');
  if(play_video){
     var container = e.target.closest('.ratio');
     var video = container ? container.querySelector('video') : null;

    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
  
   
  var cover = e.target.closest('.pauseicon_video, .playicon_video');

  if (!cover) return;
  var container = cover.closest('[id^="video-container-"]');
  if (!container) return;   
  var youtubeIframe = container.querySelector('iframe.js-youtube'); 
  var vimeoIframe = container.querySelector('iframe.js-vimeo'); 
  
  var playIcon = container.querySelector('.playicon_video'); 
   var cover_image = container.querySelector('.cover_image'); 
  if(vimeoIframe){
     let src = vimeoIframe.getAttribute('src');
    cover_image.classList.add('hide-important');
   if(playIcon)
   {  
    src = src.replace('autoplay=0', 'autoplay=1');
    playIcon.classList.add('hide-important');
     
   }
 
  vimeoIframe.setAttribute('src', src);
 
    
  }
  
 if (youtubeIframe) {  
  let src = youtubeIframe.getAttribute('src');
   cover_image.classList.add('hide-important');
   if(playIcon)
   {  
    src = src.replace('autoplay=0', 'autoplay=1');
    playIcon.classList.add('hide-important');
   }
 else if (pauseIcon) { 
    src = src.replace('autoplay=1', 'autoplay=0');
    playIcon.classList.add('hide-important');
   }  
  youtubeIframe.setAttribute('src', src);
}
});

/* video code ends */

let openOffcanvasCount = 0;
if (!customElements.get('wdt-slideshow')) {
  customElements.define('wdt-slideshow', class WDT_slideShow  extends HTMLElement {
    constructor() {
        super();
        this.slider = this.querySelector("[data-swiper-slider]");
    }

    connectedCallback() {
        this.init();
    }

    init() {
        if (!this.slider) {            
          console.warn("Slider element not found");
            return;
        }

        const slideItems = this.slider.querySelectorAll(".slide-item");
        if (slideItems.length <= 1) {
            console.warn("Insufficient slides to initialize Swiper");
           // return;
        }

        const sliderOptions = this.slider.getAttribute("data-slider-options");

        if (!sliderOptions) {
            console.warn("Slider options not found or invalid");
            return;
        }

        try {
            const options = JSON.parse(sliderOptions);

            Object.keys(options).forEach(key => {
                if (typeof options[key] === "string" && /^\d+$/.test(options[key])) {
                    options[key] = parseInt(options[key], 10);
                }
            });

            

            const autoplay = options.auto_play > 0 ? options.auto_play * 1000 : false;
            const loop = options.loop === "true" || options.loop === true;           
            const fade = options.fade === "true" || options.fade === true;
            const centeredSlides = options.mode === "true" || options.mode === true;
            const slidePerview = options.slidePerview > 0 ? options.slidePerview : 1;

            const swiperOptions = {
               
                loop: loop,
                autoplay: autoplay ? { delay: autoplay, disableOnInteraction: false,  pauseOnMouseEnter: true } : false,
                effect: fade ? 'fade' : 'slide',
                centeredSlides: centeredSlides,
                speed: 2000,
                 spaceBetween: 0,
                  pagination: {
                  el: this.querySelector(".swiper-pagination"),
                 clickable: true
            },
                navigation: {
                    nextEl: this.querySelector(".swiper-button-next"),
                    prevEl: this.querySelector(".swiper-button-prev")
                },
                lazy: {
                    loadOnTransitionStart: true,
                    loadPrevNext: true
                },
                breakpoints: {
                575: {
                slidesPerView: slidePerview || 1
                }
              },
                ...options.options
            };

             console.log("Initializing Swiper with options:", swiperOptions);
            this.swiperInstance = new Swiper(this.slider, swiperOptions);

        } catch (error) {
            console.error("Error parsing slider options:", error);
        }
    }
});
}

if (!customElements.get('text-with-icons-slider')) {
  customElements.define('text-with-icons-slider', class textWidthIcons_Slider  extends HTMLElement {

    constructor() {
        super();      
        this.sliderConfigElement = this.querySelector("[data-slider-options]");        
        if(this.sliderConfigElement)this.initializeSlider();
    }

    initializeSlider() {        
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");
        if (sliderOptionsData === null || sliderOptionsData === "") return null;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetweenSlides: 0,            
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
        
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

        let autoplaySettings = false;
        if (sliderOptions.auto_play > 0) {
            autoplaySettings = { delay: 1000 * sliderOptions.auto_play };
        }
        let loopEnabled = false;
        if (sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1) {
            loopEnabled = true;
        }

        let centeredSlides = false;
        if (sliderOptions.mode === "true" || sliderOptions.mode === true ) {
            centeredSlides = true;
        }

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazyLoading: true,
            focusableElements: 'input, select, option, textarea, video, label',
           speed: 2000,
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile,               
                    slidesPerColumn: 1
                },
                768: {
                    slidesPerView: sliderOptions.tablet,
                    slidesPerColumn: 1,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop,
                    slidesPerColumn: 1,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1400: {
                    slidesPerView: sliderOptions.desktop,
                    slidesPerColumn: 1
                }
            }
        }, sliderOptions.additionalOptions);

        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);

        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}


if (!customElements.get('wdt-collection-slider')) {
  customElements.define('wdt-collection-slider', class WDT_Collection extends HTMLElement {
    constructor() {
      super();
      this.slider = this.querySelector("[data-swiper-slider]");
      if (!this.slider) {
        console.error('Swiper slider element not found.');
        return;
      }
      this.init();
    }

    init() {
      const sliderOptionsData = this.slider.parentElement?.getAttribute("data-slider-options");
      if (!sliderOptionsData) {
        console.error('Slider options not found.');
        return;
      }

      let options;
      try {
        options = JSON.parse(sliderOptionsData);
      } catch (error) {
        console.error('Error parsing slider options:', error);
        return;
      }

      // Convert numeric string values to integers
      Object.keys(options).forEach(key => {
        if (typeof options[key] === "string" && /^\d+$/.test(options[key])) {
          options[key] = parseInt(options[key], 10);
        }
      });

      const autoplay = options.auto_play > 0 ? { delay: options.auto_play * 1000 } : false;
      const loop = options.loop === "true" || options.loop === true;
      const centeredSlides = options.mode === "true" || options.mode === true;

      const swiperOptions = {
        loop: loop,
        autoplay: autoplay,
        centeredSlides: centeredSlides,
        speed: 1000,
        pagination: {
          el: this.slider.parentElement?.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: this.slider.parentElement?.querySelector(".swiper-button-next"),
          prevEl: this.slider.parentElement?.querySelector(".swiper-button-prev"),
        },
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNext: true,
        },
        slidesPerView: options.desktop || 4,
        spaceBetween: options.space || 0,
        breakpoints: {
          320: {
            slidesPerView: options.mobile || 1,
            spaceBetween: (options.space || 0) * 0.7,
          },
          576: {
            slidesPerView: options.tablet || 2,
            spaceBetween: (options.space || 0) * 0.7,
          },
          992: {
            slidesPerView: options.laptop || 3,
            spaceBetween: (options.space || 0) * 0.7,
          },
          1400: {
            slidesPerView: options.desktop || 4,
          },
        },
      };

      this.swiperInstance = new Swiper(this.slider, swiperOptions);
    }
  });
}


if (!customElements.get('wdt-swiper-slider')) {
  customElements.define('wdt-swiper-slider', class WDT_Swiper extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");         
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.5
                },
                576: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1200: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}


if (!customElements.get('colletion-list')) {
  customElements.define('colletion-list', class WDT_Swiper extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");         
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.5
                },
                576: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1200: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}










if (!customElements.get('wdt-collection-banner-slider')) {
  customElements.define('wdt-collection-banner-slider', class WDT_Swiper extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");         
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.5
                },
                576: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1400: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}


if (!customElements.get('brand-logo-slider')) {
  customElements.define('brand-logo-slider', class WDT_Swiper extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");         
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            simulateTouch: false,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
          keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.5,
                   simulateTouch: true
                },                
                768: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1441: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}

if (!customElements.get('wdt-shoppable-video')) {
customElements.define('wdt-shoppable-video',class  WDT_Shoppablevideo extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");    
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {
       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                },
                768: {
                    slidesPerView: sliderOptions.tablet || 2,
                },
                1200: {
                    slidesPerView: sliderOptions.laptop || 3,
                },
                1400: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}

if (!customElements.get('wdt-gallery-slider')) {
customElements.define('wdt-gallery-slider',class  WDT_Gallery extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");    
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {
       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1;     
        const centeredSlides = sliderOptions.mode === "false" || sliderOptions.mode === false;
        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,         
             speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
               320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.6
                },
                768: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.8
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 4,
                    spaceBetween: sliderOptions.space * 0.7
                },
                1400: {
                    slidesPerView: sliderOptions.desktop || 6,
                    spaceBetween: sliderOptions.space
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}  

if (!customElements.get('wdt-testimonial-slider')) {
customElements.define('wdt-testimonial-slider',class  WDT_Testimonial extends HTMLElement {
    constructor() {
        super();      
        this.sliderConfigElement = this.querySelector("[data-slider-options]");        
        if(this.sliderConfigElement)this.initializeSlider();
    }

    initializeSlider() {        
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");
        if (sliderOptionsData === null || sliderOptionsData === "") return null;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetweenSlides: 0,            
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
        
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

        let autoplaySettings = false;
        if (sliderOptions.auto_play > 0) {
            autoplaySettings = { delay: 1000 * sliderOptions.auto_play };
        }
        let loopEnabled = false;
        if (sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1) {
            loopEnabled = true;
        }

        let centeredSlides = false;
        if (sliderOptions.mode === "true" || sliderOptions.mode === true ) {
            centeredSlides = true;
        }

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
           speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
                prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazyLoading: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: 10
                },
                577: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.5
                },
                768: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.5
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.7
                },
                1440: {
                    slidesPerView: sliderOptions.desktop || 4
                }
             }
        }, sliderOptions.additionalOptions);

        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);

        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}


function cardSwatch() {
  document.body.addEventListener("mouseover", function (event) {
    const swatch = event.target.closest(".item-swatch span");
 
    if (!swatch) return;

    const cardMain = swatch.closest(".resource-card");
      
    if (cardMain) {
      const featuredMedia = cardMain.querySelector(".card__inner_wrapper .featured-media");      
      if (featuredMedia) {
        featuredMedia.setAttribute("srcset", swatch.dataset.image);
      }

      const cardSwatch = swatch.closest(".card-swatch");
      if (cardSwatch && cardSwatch.classList.contains("color")) {
        const variant = swatch.dataset.id;
        const variantInput = cardMain.querySelector(".product-variant-id");
        if (variantInput) {
          variantInput.value = variant;
        }            
      }
    }
  });  
}

function cardVariantSwatch() {
 document.querySelectorAll('.color-values-plus .plus-count').forEach(element => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    const closestUl = this.closest('ul');    
    closestUl.querySelectorAll('.show-on-click').forEach(hiddenElement => {
      hiddenElement.style.display = 'flex'; 
    });
    this.closest('.color-values-plus').style.display = 'none'; 
  });
});
}


if (!customElements.get('vertical-bar')) {
  customElements.define('vertical-bar', class VerticalBar extends HTMLElement {
    constructor() {
      super();
      this.container = this.querySelector(".vertical-marquee-selector");
      if (!this.container) {      
        return;
      }

       let timer = parseInt(this.container.getAttribute('data-timer'), 10) * 1000;
      if (isNaN(timer) || timer <= 0) {
        timer = 3;
      }


      // Initialize Swiper
      const swiper = new Swiper(this.container, {
        loop: true,
        // autoHeight: true,   
        effect:'fade',    
        autoplay: {
          delay: timer,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }
      });
    }
  });
}


if (!customElements.get('compare-banner')) {
  customElements.define('compare-banner', class CompareBanner extends HTMLElement {
    constructor() {
      super();
      this.resizeObserver = null;
      this.slider = null;
      this.container = null;
    }

    connectedCallback() {
      this.initSlider();
      this.setupResizeObserver();
    }

    disconnectedCallback() {
      this.cleanup();
    }

    initSlider() {
      this.container = this.querySelector('.compare-container');
      this.slider = this.querySelector('.drag-slider');
      
      if (this.container && this.slider) {
        this.updateSliderMax();
        
        // Set initial position to center
        this.centerSlider();
        
        this.slider.addEventListener('input', (e) => {
          this.container.style.setProperty('--position', `${e.target.value}px`);
        });
      } else {
        console.error('Container or slider not found');
      }
    }

    centerSlider() {
      if (this.container && this.slider) {
        const centerPosition = this.container.clientWidth / 2;
        this.slider.value = centerPosition;
        this.container.style.setProperty('--position', `${centerPosition}px`);
      }
    }

    updateSliderMax() {
      if (this.container && this.slider) {
        this.slider.max = this.container.clientWidth;
        // Maintain current position relative to new width
        const currentValue = parseInt(this.slider.value) || this.container.clientWidth / 2;
        const percentage = currentValue / (parseInt(this.slider.max) || 1);
        this.slider.value = this.container.clientWidth * percentage;
        this.container.style.setProperty('--position', `${this.slider.value}px`);
      }
    }

    setupResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }

      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === this.container || entry.target === this) {
            this.updateSliderMax();
          }
        }
      });

      if (this.container) {
        this.resizeObserver.observe(this);
        this.resizeObserver.observe(this.container);
      }
    }

    cleanup() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.slider) {
        this.slider.removeEventListener('input', this.handleSliderInput);
      }
    }
  });
}
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const compareBanners = event.target.querySelectorAll('compare-banner');
    compareBanners.forEach(banner => {
      if (banner.connectedCallback) {
        // Force re-center when section reloads in editor
        const slider = banner.querySelector('.drag-slider');
        if (slider) {
          slider.value = slider.max / 2;
        }
        banner.connectedCallback();
      }
    });
  });
}

if (!customElements.get('gallery-component')) {
  customElements.define('gallery-component', class GalleryComponent extends HTMLElement {
    constructor() {
      super();
      this.imageBlocks = [];
      this.contentBlocks = [];
    }
    connectedCallback() {
      this.imageBlocks = this.querySelectorAll(".media-gallery .media-image");
      this.contentBlocks = this.querySelectorAll(".gallery-content .content-item");
      this.initialize();
    }
    initialize() {
      if (this.imageBlocks.length > 0 && this.contentBlocks.length > 0) {
        // Set the first block as active initially
        this.setActiveBlock(0);
      }
      this.contentBlocks.forEach((contentBlock, index) => {
        contentBlock.addEventListener("mouseover", () => {
          this.setActiveBlock(index);
        });
      });
    }
    setActiveBlock(index) {
      // Remove 'highlight' class from all blocks
      this.imageBlocks.forEach((block) => block.classList.remove("highlight"));
      this.contentBlocks.forEach((block) => block.classList.remove("highlight"));
      // Add 'highlight' class to the active block
      if (this.imageBlocks[index] && this.contentBlocks[index]) {
        this.imageBlocks[index].classList.add("highlight");
        this.contentBlocks[index].classList.add("highlight");
      }
    }
  });
}

if (!customElements.get('dropdown-tabs')) {
  customElements.define('dropdown-tabs', class DropdownTabs extends HTMLElement {
    constructor() {
      super();
      // Bind methods
      this.handleDropdownClick = this.handleDropdownClick.bind(this);
      this.handleTabClick = this.handleTabClick.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    connectedCallback() {
      // Get elements scoped to this component
      this.dropdownToggle = this.querySelector(".dropdown-toggle");
      this.dropdownMenu = this.querySelector(".dropdown-menu");
      this.tabItems = this.querySelectorAll(".item-trigger");
      this.tabPanels = this.querySelectorAll(".tab-pane");
      this.tabButtons = this.querySelectorAll('[role="tab"]');

      // Initialize active state
      this.initActiveState();

      // Add event listeners
      this.addEventListeners();
    }

    initActiveState() {
      // Set first tab as active if none exists
      const hasActive = Array.from(this.tabItems).some(item => item.classList.contains('active'));
      if (!hasActive && this.tabItems.length > 0) {
        this.tabItems[0].classList.add('active');
        this.tabPanels[0].classList.add('show', 'active');
        if (this.dropdownToggle) {
          this.dropdownToggle.textContent = this.tabItems[0].textContent.trim();
        }
      }

      // Initialize dropdown text
      const activeItem = this.querySelector(".item-trigger.active");
      if (activeItem && this.dropdownToggle) {
        this.dropdownToggle.textContent = activeItem.textContent.trim();
      }
    }

    addEventListeners() {
      // Dropdown item clicks
      this.tabItems.forEach(item => {
        item.addEventListener('click', this.handleDropdownClick);
      });

      // Tab button clicks and keyboard events
      this.tabButtons.forEach((button, index) => {
        button.addEventListener('click', this.handleTabClick);
        button.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target) && this.dropdownMenu) {
          this.dropdownMenu.classList.remove('show');
        }
      });
    }

    handleDropdownClick(e) {
      e.preventDefault();
      const clickedItem = e.currentTarget;
      const targetId = clickedItem.getAttribute('href').substring(1);

      // Update active state
      this.updateActiveState(clickedItem, targetId);

      // Close dropdown
      if (this.dropdownMenu) {
        this.dropdownMenu.classList.remove('show');
      }
    }

    handleTabClick(e) {
      const clickedTab = e.currentTarget;
      const targetId = clickedTab.getAttribute('aria-controls');
      const correspondingItem = this.querySelector(`.item-trigger[href="#${targetId}"]`);

      if (correspondingItem) {
        this.updateActiveState(correspondingItem, targetId);
      }
    }

    handleKeyDown(e, index) {
      const key = e.key;
      let newIndex;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        newIndex = (index + 1) % this.tabButtons.length;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        newIndex = (index - 1 + this.tabButtons.length) % this.tabButtons.length;
      } else if (key === 'Home') {
        newIndex = 0;
      } else if (key === 'End') {
        newIndex = this.tabButtons.length - 1;
      } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        this.tabButtons[index].click();
        return;
      }

      if (newIndex !== undefined) {
        e.preventDefault();
        this.tabButtons[newIndex].focus();
        // Use the state update method instead of directly clicking
        const targetId = this.tabButtons[newIndex].getAttribute('aria-controls');
        const correspondingItem = this.querySelector(`.item-trigger[href="#${targetId}"]`);
        if (correspondingItem) {
          this.updateActiveState(correspondingItem, targetId);
        }
      }
    }

    updateActiveState(activeItem, targetId) {
      // Update dropdown items
      this.tabItems.forEach(item => {
        item.classList.toggle('active', item === activeItem);
      });

      // Update tab panels
      this.tabPanels.forEach(panel => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('show', isActive);
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });

      // Update tab buttons
      this.tabButtons.forEach(button => {
        const isActive = button.getAttribute('aria-controls') === targetId;
        button.setAttribute('aria-selected', isActive);
        button.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Update dropdown text
      if (this.dropdownToggle) {
        this.dropdownToggle.textContent = activeItem.textContent.trim();
      }
    }
  });
}

if (window.Shopify.designMode) {console.log("editor");}
else {
if(window.routes.cart_type == 'page'){
if (!customElements.get('add-to-cart-form')) {
  customElements.define('add-to-cart-form',
    class AddToCartForm extends HTMLElement {
       constructor() {
          super();
          this.form = this.querySelector('form');         
          const selectElement = this.form.querySelector('[name=id]');
          this.submitButton = this.querySelector('[type="button"]');
          const variantSelect = this.form.querySelector('select[name="id"]');
          const variantId = selectElement ? selectElement.value : variantSelect;                 
           this.submitButton.addEventListener('click', () => {
           this.form.submit();
           });

        }
    }
  );
}
}
}

class ProductGallery {
  constructor(container = document) {
    this.container = container;
    this.thumbnailContainers = container.querySelectorAll(".product-thumbnails");
    this.mainGalleryContainers = container.querySelectorAll(".product-media-gallery");    
    this.currentIsDesktop = window.innerWidth >= 992;
    this.thumbSwipers = [];
    this.gallerySwipers = [];
    this.observeDynamicChanges();

    this.initAll();
     //window.addEventListener("resize", this.handleResize.bind(this));
    // window.addEventListener("load", this.handleResize.bind(this));
    
    if (this.thumbnailContainers.length > 0) {
    const thumbnailContainerFirst = this.thumbnailContainers[0];
    const directionAttributeFirst = thumbnailContainerFirst?.dataset.direction?.trim();

    if (directionAttributeFirst === 'stacked') {
      window.addEventListener("resize", this.handleResizeStacked.bind(this));
    }
  }
    
    
  }

  // Initialize all galleries and thumbnails
  initAll() {
    this.mainGalleryContainers.forEach((gallery, index) => {
      const thumbnailContainer = this.thumbnailContainers[index];
      const directionAttribute = thumbnailContainer?.dataset.direction?.trim();
      const thumbDirection =
        directionAttribute === "vertical" || directionAttribute === "vertical_right"
          ? "vertical"
          : directionAttribute === "stacked"
          ? "stacked"
          : "horizontal";

      if (thumbDirection === "stacked") {
        this.initGalleryStacked(gallery);
      } else if (thumbDirection === "vertical") {
        const thumbSwiper = this.initThumbVerticalSwiper(thumbnailContainer, index);
        this.thumbSwipers[index] = thumbSwiper;
        this.gallerySwipers[index] = this.initGallerySwiper(gallery, thumbSwiper, index);
        
      } else {
        const thumbSwiper = this.initThumbHorizontalSwiper(thumbnailContainer, index);
        this.thumbSwipers[index] = thumbSwiper;
        this.gallerySwipers[index] = this.initGallerySwiper(gallery, thumbSwiper, index);
      }
    });
    this.syncThumbnailClicks();
    this.toggleActiveMediaPreview();
  }

  // Initialize a vertical thumbnail swiper
  initThumbVerticalSwiper(container, index) {
    if (!container) return null;

    return new Swiper(container, {
      // spaceBetween: 20,
      slidesPerView: 4,
      direction: "vertical",
      navigation: {
        nextEl: `.thumb-next`,
        prevEl: `.thumb-prev`,
      },
      breakpoints: {
        320: { spaceBetween: 5 },
        576: { spaceBetween: 12 },
        1540: { spaceBetween: 20 }
      },     
    });
  }

  // Initialize a horizontal thumbnail swiper
  initThumbHorizontalSwiper(container, index) {
    if (!container) return null;

    return new Swiper(container, {
      spaceBetween: 15,
      slidesPerView: 4,
      direction: "horizontal",
      navigation: {
        nextEl: `.thumb-next`,
        prevEl: `.thumb-prev`,
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        480: { slidesPerView: 3 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  }
  
initResponsiveGallery(container, thumbSwiper, index) {
  if (!container) return;

  const isDesktop = window.innerWidth >= 992;

  if (isDesktop) {
    this.initGalleryStacked(container);
  } else {
    this.initGallerySwiper(container, thumbSwiper, index);
  }

   if (!isDesktop) {
  const featuredMediaId = container.querySelector('.swiper-slide')?.getAttribute('data-media-id');
  const target = container.querySelector(`[data-media-id="${featuredMediaId}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
  
}

  
  // Initialize a gallery swiper
 initGallerySwiper(container, thumbSwiper, index) {
  if (!container) return null;

  const swiper = new Swiper(container, {
    spaceBetween: 10,
    slidesPerView: 1,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    loop: false,
    effect: "fade",
    autoHeight: true,
    grabCursor: false,
    fadeEffect: { crossFade: true },
    allowTouchMove: false,
    navigation: {
      nextEl: `.main-next`,
      prevEl: `.main-prev`,
    },
    pagination: {
      el: `.swiper-pagination-main`,
      clickable: true,
    },
    thumbs: { swiper: thumbSwiper },
    on: {
      slideChange: () => {
        const mediaElement = document.querySelector('wdt-main-media');
        if (mediaElement) {
          mediaElement.pauseAllMedia();
        }
      },
    },
  });

  // Keydown support for accessibility
  container.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowLeft':
        swiper.slidePrev();
        e.preventDefault();
        break;
      case 'ArrowRight':
        swiper.slideNext();
        e.preventDefault();
        break;
      case 'Home':
        swiper.slideTo(0);
        e.preventDefault();
        break;
      case 'End':
        swiper.slideTo(swiper.slides.length - 1);
        e.preventDefault();
        break;
    }
  });

  return swiper;
}

 // Initialize stacked layout (swiper work only in mobile, no thumb swiper)
initGalleryStacked(container) {
  if (!container) return;

  const isMobile = window.innerWidth <= 992;

  // Add stacked layout classes
  container.classList.add("stacked-gallery");
  const slides = container.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    slide.classList.add("stacked-slide");
  });

  // Only initialize swiper for desktop if needed
  if (isMobile) {
    const swiper = new Swiper(container, {
      spaceBetween: 10,
      slidesPerView: 1,
      loop: false,    
      autoHeight: true,
      allowTouchMove: true,
      navigation: {
        nextEl: `.main-next`,
        prevEl: `.main-prev`,
      },
      pagination: {
        el: `.swiper-pagination-main`,
        clickable: true,
      },
      on: {
        slideChange: () => {
          const mediaElement = document.querySelector("wdt-main-media");
          if (mediaElement) {
            mediaElement.pauseAllMedia();
          }
        },
      },
    });

    // Keyboard accessibility
    container.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowLeft":
          swiper.slidePrev();
          e.preventDefault();
          break;
        case "ArrowRight":
          swiper.slideNext();
          e.preventDefault();
          break;
        case "Home":
          swiper.slideTo(0);
          e.preventDefault();
          break;
        case "End":
          swiper.slideTo(swiper.slides.length - 1);
          e.preventDefault();
          break;
      }
    });

    // Save reference (optional)
    this.gallerySwipers.push(swiper);
  }
  
}



  // Destroy all Swipers
  destroySwipers() {
    this.thumbSwipers.forEach((swiper) => {
      swiper?.destroy(true, true);
    });
    this.thumbSwipers = [];

    this.gallerySwipers.forEach((swiper) => {
      swiper?.destroy(true, true);
    });
    this.gallerySwipers = [];
  }

  // Handle resize event
  handleResizeStacked() {
  const isDesktopNow = window.innerWidth >= 992;
  if (this.currentIsDesktop !== isDesktopNow) {
    this.currentIsDesktop = isDesktopNow;
    this.destroySwipers();
    this.initAll();       
  }   
  }

  // Observe dynamically added elements
  observeDynamicChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.matches && node.matches(".product-media-gallery")) {
            this.mainGalleryContainers = document.querySelectorAll(".product-media-gallery");
            this.thumbnailContainers = document.querySelectorAll(".product-thumbnails");
            this.destroySwipers();
            this.initAll();
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
   syncThumbnailClicks() {
    this.container.addEventListener('click', (event) => {
      const thumbnail = event.target.closest('.thumbnail-slide');
      if (!thumbnail) return;

      const section = thumbnail.closest('[data-main-gallery-id]');
      if (!section) return;

      const mediaId = thumbnail.getAttribute('data-media-id');
      const gallery = section.querySelector('.product-media-gallery');
      if (!gallery) return;

      const gallerySwiper = gallery.swiper;
      if (!gallerySwiper || !gallerySwiper.slides) return;

      gallerySwiper.slides.forEach((slide, index) => {
        if (slide.getAttribute('data-media-id') === mediaId) {
          gallerySwiper.slideTo(index);
        }
      });
    });
  }
  

  // Toggle active media preview
 toggleActiveMediaPreview() {
  const mediaButtons = document.querySelectorAll(".product_media_preview");
  mediaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".product-active-media").classList.toggle("active");      
    });

    // Add keyboard support
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.closest(".product-active-media").classList.toggle("active");
      }
    });
  });

  const mediaContainers = document.querySelectorAll(".product-internal-video");
  mediaContainers.forEach((mediaContainer) => {
    mediaContainer.addEventListener("click", function () {
      const video = mediaContainer.querySelector("video");
      if (video) {
        mediaContainers.forEach((otherMedia) => {
          const otherVideo = otherMedia.querySelector("video");
          if (otherVideo && otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });

        video.paused ? video.play() : video.pause();
      }
    });

    // Add keyboard support
    mediaContainer.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const video = mediaContainer.querySelector("video");
        if (video) {
          mediaContainers.forEach((otherMedia) => {
            const otherVideo = otherMedia.querySelector("video");
            if (otherVideo && otherVideo !== video && !otherVideo.paused) {
              otherVideo.pause();
            }
          });
          video.paused ? video.play() : video.pause();
        }
      }
    });
  });
}

}
document.addEventListener("DOMContentLoaded", () => {
  const productGallery = new ProductGallery();
});



if (!customElements.get('product-model')) {
  customElements.define('product-model', class ProductModelElement extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.addEventListener("click", this.handleModelClick.bind(this));
      this.addEventListener("keydown", this.handleModelKeydown.bind(this));
      this.loadShopifyXR();
    }

    loadShopifyXR() {
      Shopify.loadFeatures([
        {
          name: "shopify-xr",
          version: "1.0",
          onLoad: this.setupShopifyXR.bind(this),
        },
      ]);
    }

    setupShopifyXR(errors) {
      if (errors) {
        console.error("Shopify XR errors:", errors);
        return;
      }

      if (!window.ShopifyXR) {
        document.addEventListener("shopify_xr_initialized", () => {
          this.setupShopifyXR();
        });
        return;
      }

      // Process all model JSON elements
      const modelJSONElements = document.querySelectorAll('[id^="ProductJSON-"]');
      modelJSONElements.forEach((modelJSON) => {
        window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
        modelJSON.remove();
      });

      // Ensure that all models are properly set up
      window.ShopifyXR.setupXRElements();
    }

    handleModelClick() {
     // console.log("Model clicked:", this);

      if (!this.classList.contains("model-loaded")) {
        this.loadContent();
        this.classList.add("model-loaded"); 
      }
    }

      handleModelKeydown(e) {
      // Handle both Enter and Space for accessibility
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
         if (!this.classList.contains("model-loaded")) {
        this.loadContent();
        this.classList.add("model-loaded"); 
      }
      }
    }
    
    // Load the 3D model viewer UI
    loadContent() {
     // console.log("Loading 3D model content for:", this);
      Shopify.loadFeatures([
        {
          name: "model-viewer-ui",
          version: "1.0",
          onLoad: this.setupModelViewerUI.bind(this),
        },
      ]);
    }

    // Setup the 3D model viewer UI
    setupModelViewerUI(errors) {
      if (errors) {
        console.error("Model Viewer UI errors:", errors);
        return;
      }

      const modelViewerElement = this.querySelector("model-viewer");
      if (modelViewerElement) {
       // console.log("Initializing ModelViewerUI for:", modelViewerElement);
        this.modelViewerUI = new Shopify.ModelViewerUI(modelViewerElement);
      }
    }
  });
}


class WdtMainMedia extends HTMLElement {
  constructor() {
    super();
    this.mediaSlides = [];
  }

  connectedCallback() {
    this.mediaSlides = this.querySelectorAll(".media-child");
    this.setupMediaListeners();    
  }
 
  pauseAllMedia(excludeModelViewer = null) {
  this.mediaSlides.forEach((slide) => {
    const video = slide.querySelector("video");
    const iframe = slide.querySelector("iframe");
    const modelViewer = slide.querySelector("model-viewer");

    // Pause HTML5 videos
    if (video && !video.paused) {
      video.pause();
    }

    // Pause external videos (YouTube, Vimeo)
    if (iframe && iframe.src.includes("youtube")) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    }

    if (iframe && iframe.src.includes("vimeo")) {
      iframe.contentWindow.postMessage({ method: "pause" }, "*");
    }

    // Pause <model-viewer>
    if (modelViewer && modelViewer !== excludeModelViewer) {
      if (typeof modelViewer.pause === "function") {
        modelViewer.pause();
      } else {
        console.warn("pause() method not available on model-viewer");
        modelViewer.setAttribute("autoplay", false);
      }
    }
  });
}


  
  setupMediaListeners() {
  this.mediaSlides.forEach((slide) => {  
    slide.addEventListener("click", () => {
      this.handleMediaPlayback(slide);
    });

    slide.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleMediaPlayback(slide);
      }
    });

    const iframe = slide.querySelector("iframe");     
    if (iframe) {
        iframe.addEventListener('click', () => {
          this.handleMediaPlayback(slide);
        });
    }      
    
  });
}

handleMediaPlayback(slide) {  
  const video = slide.querySelector("video");
  const iframe = slide.querySelector("iframe");
  const modelViewer = slide.querySelector("model-viewer");

  // Pause all other media except the current modelViewer
  this.pauseAllMedia(modelViewer);

  // Play the selected media
  if (video) {
    video.play();
  }

  if (iframe && iframe.src.includes("youtube")) {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  }

  if (iframe && iframe.src.includes("vimeo")) {
    iframe.contentWindow.postMessage({ method: "play" }, "*");
  }

  if (modelViewer) {
    modelViewer.play();
  }
}
  
}

// Define the custom element
customElements.define("wdt-main-media", WdtMainMedia);






if (!customElements.get('quantity-editor')) {
  customElements.define('quantity-editor', class QuantityEditor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const quantityInput = this.querySelector('input[name="quantity"]');
    this.incrementBtn = this.querySelector(".increment-btn");
    this.decrementBtn = this.querySelector(".decrement-btn");  
    this.qtyAlert = this.parentElement?.querySelector(".qty-status") || document.querySelector(".qty-status");    

     if (quantityInput) {
    quantityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  }
    
    if (quantityInput && this.incrementBtn && this.decrementBtn) {
      this.incrementBtn.addEventListener("click", () =>
        this.editQuantity(event, quantityInput, true)
      );
      this.decrementBtn.addEventListener("click", () =>
        this.editQuantity(event, quantityInput, false)
      );
    } else {
      console.error("QuantityEditor: Missing required elements (input or buttons).");
    }
  }

  // Method to update the quantity
  editQuantity(event, inputElement, increment) {       
    let currentQuantity = parseInt(inputElement.value);
    if (isNaN(currentQuantity)) currentQuantity = 1;
    currentQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;

    // Get min and max values
    const minValue = inputElement.min || 1;
    const maxValue = inputElement.max || Infinity;
    const min = parseInt(minValue, 10);
    const max = parseInt(maxValue, 10);

    const qtyStatusOnChange = document.querySelector(".qty-status"); 
    if (currentQuantity > max) {
      currentQuantity = max;
      this.incrementBtn.classList.add("disabled");    
       this.qtyAlert.classList.remove("invisible"); 
      if (this.qtyAlert) {
        this.qtyAlert.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>`+window.cartStrings.quantityError.replace("[quantity]", max);         
      }
    } else {
      if (this.qtyAlert) {
        this.qtyAlert.innerHTML = " ";        
      }
      this.incrementBtn.classList.remove("disabled");         
    }

    if (currentQuantity <= min) {
      currentQuantity = min;
      this.decrementBtn.classList.add("disabled");      
    } else {
      this.decrementBtn.classList.remove("disabled");   
      this.qtyAlert.classList.add("invisible"); 
    }
    if(currentQuantity === max) { this.qtyAlert.classList.remove("invisible"); }   
    inputElement.value = currentQuantity;    
    event.preventDefault();
    //event.stopPropagation();
    this.updateTotalPrice(currentQuantity);
  }

  updateTotalPrice(quantity) {
  //  console.log("Updating total price for quantity:", quantity);
    // Logic for updating total price can be added here.
  }
});
}

let isQuickViewOpen = false;

if (!customElements.get('variant-selector')) {
  customElements.define('variant-selector', class VariantSelector extends HTMLElement {
  constructor(modalContent = null) {
    super();
    this.modalContent = modalContent || document; 
    this.init();
  }

  init(modalContent = null) {
    this.modalContent = modalContent || this.modalContent || document;
    
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const currentVariant = urlParams.get("variant");

     this.addToCartButton = this.modalContent.querySelector ("#addToCart");
     this.variantIdField = this.modalContent.querySelector("#variant-id");
    
    this.isDropdown = this.querySelector("select");

    if (this.isDropdown) {
      this.querySelectorAll("select").forEach((selectBox) => {
        selectBox.addEventListener("change", this.onDropdownChange.bind(this));
      });
    } else {
      this.querySelectorAll(".variant-options .variant-option-item").forEach((item) => {
        item.addEventListener("click", this.onSwatchOptionClick.bind(this));
         item.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); 
            this.onSwatchOptionClick(event);
          }
        });
        item.setAttribute("tabindex", "0");
        
      });
    }

    this.callChoosenOptions();
  }

  onSwatchOptionClick(event) {
    const parentUl = event.target.closest(".variant-options");
    parentUl.querySelectorAll(".variant-option-item").forEach((item) => {
      item.classList.remove("selected");
    });
    const optionItem = event.target.closest(".variant-option-item");

    if (optionItem) {
      optionItem.classList.add("selected");
    }

    // Update selected options first, then filter, then update variant
    this.callChoosenOptions();
    this.filterOptionValues();
    // filterOptionValues already calls callChoosenVariants and updateAddToCartButton
  }

  onDropdownChange() {
    // Update selected options first, then filter, then update variant
    this.callChoosenOptions();
    this.filterOptionValues();
    // filterOptionValues already calls callChoosenVariants and updateAddToCartButton
  }

  callChoosenOptions() {
    if (this.isDropdown) {
      this.options = Array.from(this.querySelectorAll("select"), (select) => select.value);
    } else {
      this.options = Array.from(this.querySelectorAll(".variant-options"), (ul) => {
        const selected = ul.querySelector(".selected");
        return selected ? selected.getAttribute("data-value") : null;
      });
    }

    if (this.options.includes(null)) {
      this.currentVariant = null;
      return;
    }
  }

  filterOptionValues() {
    const variantData = this.getVariantJSON();
    if (!variantData || typeof variantData !== 'object') return;
    
    const selectedOption1 = this.options[0];
    const option2List = this.querySelector('[data-option-index="1"]');
    const option3List = this.querySelector('[data-option-index="2"]');
    
    // Helper function to check if any variant matches the pattern
    const hasMatchingVariant = (pattern) => {
      // Normalize pattern for comparison (trim whitespace)
      const normalizedPattern = pattern.trim();
      return Object.keys(variantData).some(key => {
        // Normalize key for comparison
        const normalizedKey = key.trim();
        // Check if key starts with the pattern (for partial matches with 3+ options)
        // For 3-option products: "Size|Material" should match "Size|Material|Color"
        if (normalizedKey.startsWith(normalizedPattern + '|') || normalizedKey === normalizedPattern) {
          return variantData[key] && variantData[key].available;
        }
        return false;
      });
    };
    
    // Option 2 filtering - check variant map for high variant support
    // Need to check if ANY variant exists with option1|option2 (regardless of option3)
    if (option2List && selectedOption1) {
      option2List.querySelectorAll(".variant-option-item").forEach((item) => {
        const option2Value = item.getAttribute("data-value");
        // Check if any variant exists with option1|option2 pattern
        const pattern = `${selectedOption1}|${option2Value}`;
        const isOption2Available = hasMatchingVariant(pattern);

        if (isOption2Available) {
          item.style.display = "block";
          item.classList.remove("variant-unavailable");
        } else {
          item.style.display = "none";
          item.classList.add("variant-unavailable");
        }
      });
    }

    // Option 3 filtering - check variant map for high variant support
    if (option3List) {
      const selectedOption2 = this.options[1];

      if (selectedOption1 && selectedOption2) {
        option3List.querySelectorAll(".variant-option-item").forEach((item) => {
          const option3Value = item.getAttribute("data-value");
          // Check if variant exists with exact option1|option2|option3 combination
          const variantKey = `${selectedOption1}|${selectedOption2}|${option3Value}`;
          const variant = variantData[variantKey];
          const isOption3Available = variant && variant.available;

          if (isOption3Available) {
            item.style.display = "block";
            item.classList.remove("variant-unavailable");
          } else {
            item.style.display = "none";
            item.classList.add("variant-unavailable");
          }
        });
      }
    }

    this.callChoosenVariants();
    
    // If we have a valid variant, update all variant-dependent UI elements
    if (this.currentVariant) {
      this.updateFormID();
      this.updatePrice();
      this.updateProductGallery();
      this.updateErrorMsg();
      
      // Sync with sticky cart if available
      const stickyCartForm = document.querySelector("sticky-cart-form");
      if (stickyCartForm && this.currentVariant) {
        window.dispatchEvent(new Event("stikcyVariant"));
        const syncVariantToStickyBar = window.syncVariantToStickyBar || function(variant) {
          const stickySelect = document.querySelector(".stickySelect"); 
          if (stickySelect) {
            const options = stickySelect.options;
            for (let i = 0; i < options.length; i++) {
              const option = options[i];
              if (option.value == variant.id) {
                stickySelect.selectedIndex = i;
                stickySelect.dispatchEvent(new Event("change"));
                return;
              }
            }
          }
        };
        syncVariantToStickyBar(this.currentVariant);
      }
      
      // Update pickup availability if available
      const pickupAvailabilityCheck = this.modalContent.querySelector("product-availability-check");
      if (pickupAvailabilityCheck && typeof pickupAvailabilityCheck.refreshProduct === "function") {
        pickupAvailabilityCheck.refreshProduct(this.currentVariant);
      }
      
      this.updateAddToCartButton();
      
      // Only update URL if not in quick view
      if (!isQuickViewOpen) {
        this.updateURL();
      }
    } else {
      this.updateAddToCartButton();
    }
  }

  updateAddToCartButton() {
  const formContainer = this.closest('main-product-form'); 
  const qtyStatusDiv = formContainer.querySelector(".qty-status");
  const priceSelector = formContainer.querySelector(".price_block");    
  if (qtyStatusDiv) {
    qtyStatusDiv.innerHTML = "";
  }

  if (this.currentVariant) {
    const qtySelector = formContainer.querySelector(".quantity-input");
    const variantDivs = formContainer.querySelectorAll(".product-variants-selector-select div");
    let matchingVariantDiv = null;

    variantDivs.forEach((variantDiv) => {
      if (variantDiv.getAttribute("value") === this.currentVariant.id.toString()) {
        matchingVariantDiv = variantDiv;
      }
    });

    const addToCartButton = formContainer.querySelector('[type="submit"]'); 

    if (matchingVariantDiv) {
      const inventoryQuantity = parseInt(matchingVariantDiv.getAttribute("data-inventory-quantity"));
      const inventoryManagement = matchingVariantDiv.getAttribute("data-inventory-management");
      const inventoryPolicy = matchingVariantDiv.getAttribute("data-inventory-policy");
      const available = matchingVariantDiv.getAttribute("data-available") === "true";

      if (available) {
        if (inventoryQuantity === 0 && inventoryManagement && inventoryPolicy !== "continue") {
          addToCartButton.disabled = true;
          addToCartButton.textContent = window.variantStrings.soldOut;
        } else {
          addToCartButton.disabled = false;
          addToCartButton.textContent = window.variantStrings.addToCart;

          if (inventoryManagement) {
            qtySelector.setAttribute("max", inventoryQuantity);
          } else {
            qtySelector.removeAttribute("max");
          }
        }
      } else {
        addToCartButton.disabled = true;
        addToCartButton.textContent = window.variantStrings.soldOut;
      }
      priceSelector.style.display = "block";
    } else {
      console.error("Matching variant not found.");
      addToCartButton.disabled = true;
      addToCartButton.textContent = window.variantStrings.unavailable;
      priceSelector.style.display = "none";
      window.history.replaceState({}, "", this.dataset.url);
    }    
  } else {
    const addToCartButton = formContainer.querySelector('[type="submit"]');
    addToCartButton.disabled = true;
    addToCartButton.textContent = window.variantStrings.unavailable;
    priceSelector.style.display = "none";
    window.history.replaceState({}, "", this.dataset.url);
  }
}

  onVariantChange() {
    this.callChoosenOptions();
    this.callChoosenVariants();

    if (this.currentVariant) {
      this.updateURL();
      this.updateFormID();
      this.updatePrice();
      this.updateProductGallery();
      this.updateErrorMsg();

      const pickupAvailabilityCheck = this.modalContent.querySelector("product-availability-check");
      if (pickupAvailabilityCheck && typeof pickupAvailabilityCheck.refreshProduct === "function") {
        pickupAvailabilityCheck.refreshProduct(this.currentVariant);
      }

      const stickyCartForm = document.querySelector("sticky-cart-form");
    
      if (stickyCartForm && this.currentVariant) {
        // Dispatch the custom event
        window.dispatchEvent(new Event("stikcyVariant"));
      
        // Synchronize the variant to the sticky bar
        syncVariantToStickyBar(this.currentVariant);
      }
     

      
      this.updateAddToCartButton();
    } else {
      this.addToCartButton.disabled = true;
      this.addToCartButton.textContent = window.variantStrings.unavailable;
    }
  }

  getVariantJSON() {
    if (!this.variantData) {
      const variantMapScript = this.querySelector('[data-variant-map]');
      if (variantMapScript) {
        this.variantData = JSON.parse(variantMapScript.textContent);
      }
    }
    return this.variantData;
  }

  callChoosenVariants() {
    const variantData = this.getVariantJSON();
    if (!variantData) return;

    // Create a key from selected options for high variant support
    // Normalize options (trim whitespace) to ensure consistent matching
    const normalizedOptions = this.options
      .filter(opt => opt !== null && opt !== undefined)
      .map(opt => String(opt).trim());
    const variantKey = normalizedOptions.join('|');
    
    // Try exact match first
    this.currentVariant = variantData[variantKey] || null;
    
    // If no exact match, try to find a match with normalized keys (handle any whitespace issues)
    if (!this.currentVariant) {
      const matchingKey = Object.keys(variantData).find(key => {
        const normalizedKey = key.trim();
        return normalizedKey === variantKey;
      });
      if (matchingKey) {
        this.currentVariant = variantData[matchingKey];
      }
    }
  }

  updateURL() {
    if (!this.currentVariant || isQuickViewOpen) return;
   // window.history.replaceState({}, "", `${this.dataset.url}?variant=${this.currentVariant.id}`);

    // Check if the variant change happened inside the Quick View modal
    const quickViewModal = document.getElementById("quickViewContent");
    if (quickViewModal && quickViewModal.contains(document.activeElement)) {
       // console.log("Variant change inside Quick View - URL update prevented");
        return;
    }

    // Update URL only if Quick View is NOT open
    if (!isQuickViewOpen) {
        window.history.replaceState({}, "", `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }
 
  }

 updateFormID() { 
  const closestForm = this.closest("main-product-form").querySelector("#product-form");
  if (closestForm) {
    //console.log(this.currentVariant.id);
    const formInput = closestForm.querySelector("input[name='id']");
    if (formInput && this.currentVariant) {
      formInput.value = this.currentVariant.id; 
    }
  }
}   
  
  updatePrice() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;
        const sku = `sku-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, "text/html");
          const newPrice = html.querySelector(`#${id}`);
          const oldPrice = this.modalContent.querySelector(`#${id}`);
        
          const newSku = html.querySelector(`#${sku}`);
          const oldSku = this.modalContent.querySelector(`#${sku}`);        

        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;        
        if (oldSku) {
        if (newSku && newSku.innerHTML.trim() !== "") {
          oldSku.innerHTML = newSku.innerHTML;
          oldSku.style.display = "block";
        } else {
          oldSku.style.display = "none"; 
        }
      }
      });
  }
     updateErrorMsg(){
      const errorMsg = this.closest("main-product-form").querySelector('#error-message');
      if (errorMsg) {
      errorMsg.innerHTML = '';
      errorMsg.classList.remove('alert', 'alert-dangers');
      }
  
    }
   updateProductGallery() {   
  const mediaGalleryDivs = this.modalContent.querySelectorAll('wdt-main-media');
  if (!mediaGalleryDivs.length) return;

  const currentSectionId = this.getAttribute("data-section");
  
  mediaGalleryDivs.forEach((mediaGalleryDiv) => {
    const sectionId = mediaGalleryDiv.getAttribute("data-section");
    if (sectionId !== currentSectionId) return; // Skip sections that don't match the current section

    const swiperSliderInit = mediaGalleryDiv.querySelector('.product-media-gallery');
    // featured_media is stored as ID number in variant map, not an object
    if (!swiperSliderInit || !this.currentVariant?.featured_media) return;

    // featured_media is already the ID in our variant map structure
    const featuredMediaId = this.currentVariant.featured_media;
    const isStackedLayout = mediaGalleryDiv.classList.contains("stacked");
    const isDesktop = window.innerWidth > 992;
    if (isStackedLayout && isDesktop) {  
      const matchingMediaDiv = mediaGalleryDiv.querySelector(`[data-media-id="${featuredMediaId}"]`);  
      if (matchingMediaDiv) {
        matchingMediaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return; 
    }
    
    
    const gallerySwiper = swiperSliderInit.swiper;    
    if (!gallerySwiper) return;

    gallerySwiper.slides.forEach((slide, index) => {
      const mediaId = slide.getAttribute("data-media-id");      
      if (mediaId && mediaId === `${featuredMediaId}`) {
        gallerySwiper.slideTo(index);
      }
    });
  });
}

    
});
}

if (!customElements.get('recipient-form')) {
  customElements.define('recipient-form', class RecipientForm extends HTMLElement {
    constructor() {
      super();
      this.checkBox = this.querySelector(`#Recipient-checkbox-${this.dataset.sectionId}`);

      if (!this.checkBox) {
        return;
      }

      this.checkBox.addEventListener("click", (e) => {
        e.preventDefault();
        this.onChange();
      });

      this.addInputEventListeners();
    }

    addInputEventListeners = () => {
      const inputFields = this.querySelectorAll('input, textarea');
      inputFields.forEach(input => {
        input.addEventListener('keydown', this.clearErrorMessage);
        input.addEventListener('mousedown', this.clearErrorMessage);
      });
    };

    clearErrorMessage = () => {    
      const parentForm = this.closest('gift-card-recipient-form');
      if (parentForm) {      
      const errorMessageDiv = document.querySelector('#error-message');
        if (errorMessageDiv) {
          errorMessageDiv.innerHTML = ''; 
          errorMessageDiv.classList.remove('alert', 'alert-dangers');
        }
      }
    };

    onChange = () => {
      const recipientForm = this.closest(".recipient-form");
      if (!recipientForm) {
        return;
      }

      const formCheckBox = this.querySelector(`#Recipient-checkbox-${this.dataset.sectionId}`);
      const formContaner = recipientForm.querySelector(".gift-card-form");

      if (formCheckBox.hasAttribute("checked")) {
        formCheckBox.removeAttribute("checked");
      } else {
        formCheckBox.setAttribute("checked", true);
      }

      if (recipientForm.classList.contains("active")) {
        setTimeout(() => {
          recipientForm.classList.remove("active");
        }, 200);
      } else {
        recipientForm.classList.add("active");
      }
    };
  });
}

if (!customElements.get('product-recommendations')) {
  customElements.define('product-recommendations', class ProductRecommendations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.loadRecommendations(this.dataset.productId);
  }

  loadRecommendations(productId) {
    fetch(`${this.dataset.url}&product_id=${productId}&section_id=${this.dataset.sectionId}`)
      .then(response => response.text())
      .then(text => {
        const html = document.createElement("div");
        html.innerHTML = text;

        const recommendations = html.querySelector("product-recommendations");

        if (recommendations?.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;
        }

        const recommendationItems = html.querySelector(".recommendation-items");

        if (recommendationItems) {
          $(".related-products").closest(".shopify-section").removeClass("d-none");
        }
   
         if (recommendationItems) {
          this.classList.add("product-recommendations--loaded");
          this.initSlider();
        }

        if (html.querySelector(".complementary-items")) {
          this.classList.add("product-complementary--loaded");
          this.complementarySlider();
        }

        cardVariantSwatch();
        this.initQuickViewButtons();
      })
      .catch(e => console.error("Error loading recommendations:", e));
  }

  initSlider() {
    const slider = this.querySelector("[data-swiper-slider]");
    const sliderList = this.querySelectorAll(".recommendation-items");
    if (!slider || sliderList.length === 0) return;

    const sliderOptions = slider.parentElement.getAttribute("data-slider-options");
    if (!sliderOptions) {
      console.warn("Slider options not found.");
      return;
    }

    const options = JSON.parse(sliderOptions);
    const parsedOptions = this.parseSliderOptions(options);

    new Swiper(slider, {
      loop: parsedOptions.loop,
      autoplay: parsedOptions.autoplay ? { delay: parsedOptions.autoplay, disableOnInteraction: false } : false,
      centeredSlides: parsedOptions.centeredSlides,
      navigation: {
        nextEl: slider.parentElement.querySelector(".swiper-button-next"),
        prevEl: slider.parentElement.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: slider.parentElement.querySelector(".swiper-pagination"),
        clickable: true,
        // renderBullet: (index, className) => `<span class="${className} page-link rounded-circle m-1 p-1"></span>`,
      },     
      lazy: { loadOnTransitionStart: true },
      slidesPerView: parsedOptions.slidesToShow,
      spaceBetween: parsedOptions.spaceBetween,
      speed: 2000,
       breakpoints: {
                320: {
                    slidesPerView: options.mobile || 1,
                    spaceBetween: options.space * 0.5
                },
                480: {
                    slidesPerView: options.medium_down || 2,
                    spaceBetween: options.space * 0.7
                },
                768: {
                    slidesPerView: options.tablet || 2,
                    spaceBetween: options.space * 0.7
                },
                992: {
                    slidesPerView: options.laptop || 3,
                    spaceBetween: options.space * 0.8
                },
                1400: {
                    slidesPerView: options.desktop || 4
                }
            }              
    });
  }

  parseSliderOptions(options) {
    Object.keys(options).forEach(key => {
      if (typeof options[key] === "string" && /^\d+$/.test(options[key])) {
        options[key] = parseInt(options[key], 10);
      }
    });

    return {
      autoplay: options.auto_play > 0 ? options.auto_play * 1000 : false,
      loop: options.loop === "true" || options.loop === true,
      centeredSlides: options.mode === "true" || options.mode === true,
      pagination: options.dots === "true" || options.dots === true,
      slidesToShow: options.desktop,
      spaceBetween: options.space,
    };
  }

  complementarySlider() {
    const complementaryContainer = document.getElementById("complementary-slideshow");
    if (!complementaryContainer) return;

    new Swiper(complementaryContainer, {
      loop: true,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
      },
      spaceBetween: 10,
      speed: 2000,
       breakpoints: {
      992: {
      slidesPerView:1,
      },
      1400: {
      slidesPerView: 1
      }
      },
      navigation: {
        nextEl: complementaryContainer.parentElement.querySelector('.swiper-button-next'),
        prevEl: complementaryContainer.parentElement.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: complementaryContainer.parentElement.querySelector(".swiper-pagination"),
        clickable: true,       
      },     
    });
  }

  //QuickBTNS
  initQuickViewButtons() {
  const quickViewButtons = this.querySelectorAll('.quick-view-btn');  
   quickViewButtons.forEach(button => {
  button.addEventListener('click', () => {

    const offcanvasElement = document.getElementById('quickViewOffcanvas');
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

  // Check if the offcanvas is open and the click is outside of the offcanvas
  if (offcanvasInstance && offcanvasInstance._isShown && !offcanvasElement.contains(event.target)) {
    offcanvasInstance.hide(); // Hide the offcanvas
  }
    
    const productUrl = button.getAttribute('data-product-url');
    const quickViewContent = document.getElementById('quickViewContent'); // Offcanvas body content
    quickViewContent.innerHTML = 'Loading...';
    isQuickViewOpen = true;
    // Fetch product data
    fetch(productUrl)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const productInfoElement = doc.querySelector('product-template');

        if (productInfoElement) {
          updateDOM(productInfoElement);
          quickViewContent.innerHTML = productInfoElement.innerHTML;
  
          // Initialize Bootstrap Offcanvas
          var offcanvasElement = document.getElementById('quickViewOffcanvas')
          if(!offcanvasElement) return;       
          const quickViewOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
          quickViewOffcanvas.show();          
          // Re-enable scrolling when the offcanvas is hidden            
          quickViewOffcanvas.show();
          this.initializeModalContent(quickViewContent); // `this` correctly refers to the class instance
          
        } else {
          quickViewContent.innerHTML = 'Product information not found.';
        }
      })
      .catch(error => {
        quickViewContent.innerHTML = 'Sorry, an error occurred while loading the product.';
        console.error('Error fetching product data:', error);
      });
  });
});
    
}

initializeModalContent(modalContent) {
  if (modalContent) {    
    new ProductGallery(modalContent);
    const variantSelectors = modalContent.querySelectorAll('variant-selector');    
    variantSelectors.forEach((variantSelectorEl) => {
      if (typeof variantSelectorEl.init === 'function') {
        variantSelectorEl.init(modalContent);
        //console.log("A"+modalContent.innerHTML);
      } else {
        const variantSelector = new VariantSelector(modalContent);
        if (typeof variantSelector.init === 'function') {
          variantSelector.init(modalContent);
        } else {
          console.warn("VariantSelector instance does not have an init method.");
        }      
      }
    });
  } else {
    console.error("Modal content not found for ProductGallery initialization.");
  }
}
 
   
});
}

if (!customElements.get("gift-card-recipient-form")) {
  customElements.define(
    "gift-card-recipient-form",
    class GiftCardRecipientForm extends HTMLElement {
      constructor() {
        super();
        this.formLoaded = false;
        this.checkbox = null;
        this.label = null;
        this.animationDuration = 300;
      }

      connectedCallback() {
        this.renderInitialState();
        this.style.overflow = 'hidden'; 
      }

      renderInitialState() {
        // Create checkbox and label
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.checkbox.id = `gift-checkbox-${this.dataset.sectionId}`;
        this.checkbox.classList.add('me-2');
        this.checkbox.addEventListener('change', this.onCheckboxChange.bind(this));

        this.label = document.createElement('label');
        this.label.htmlFor = this.checkbox.id;
        this.label.textContent = wdtTheme.strings.recipient_check || 'I want to send gift';
        this.label.classList.add('m-0', 'cursor-pointer');

        // Create container
        const container = document.createElement('div');
        container.classList.add('fetch-gift-form', 'receipient__form', 'd-flex', 'align-items-center', 'gap-2', 'mb-3');       
     
        container.appendChild(this.checkbox);
        container.appendChild(this.label);
        
        this.innerHTML = '';
        this.appendChild(container);
      }

      onCheckboxChange(event) {
        if (event.target.checked) {
          this.fetchForm(this.dataset.variantId);
        } else {
          this.slideUpForm();
        }
      }

      fetchForm(variantId) {
        if (this.formLoaded) return;

        let rootUrl = this.dataset.rootUrl;
        if (!rootUrl.endsWith("/")) {
          rootUrl += "/";
        }

        const formSectionUrl = `${rootUrl}?sections=${this.dataset.sectionId}`;
   
        fetch(formSectionUrl)
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
          })
          .then((data) => {
            const htmlString = data["gift-card-recipient-form"];   
            const sectionInnerHTML = new DOMParser()
              .parseFromString(htmlString, "text/html")
              .querySelector(".recipient-form");

            if (sectionInnerHTML) {             
              this.slideDownForm(sectionInnerHTML);
            } else {
              console.error("Error: .recipient-form class not found in the parsed HTML.");
              this.renderError();
            }
          })
          .catch((error) => {
            console.error("Error fetching the gift card form:", error);
            this.renderError();
          });
      }

      slideDownForm(sectionInnerHTML) {
        if (!sectionInnerHTML || this.formLoaded) return;

        const formContainer = document.createElement('div');
        formContainer.classList.add('recipient-form-container');
        formContainer.style.maxHeight = '0';
        formContainer.style.overflow = 'hidden';
        formContainer.style.transition = `max-height ${this.animationDuration}ms ease-out`;
        formContainer.innerHTML = sectionInnerHTML.outerHTML;

        this.appendChild(formContainer);

        // Force reflow to enable transition
        requestAnimationFrame(() => {
          // Calculate approximate height (you may need to adjust this)
          const formHeight = formContainer.scrollHeight + 'px';
          formContainer.style.maxHeight = formHeight;
          
          setTimeout(() => {
            formContainer.style.overflow = 'visible';
            this.formLoaded = true;    
          }, this.animationDuration);
        });
      }

      slideUpForm() {
        const errorContainer = document.querySelector('#error-message');
        if(errorContainer) errorContainer.innerHTML = " ";        
        const formContainer = this.querySelector('.recipient-form-container');
        if (!formContainer || !this.formLoaded) return;
        formContainer.style.maxHeight = '0';
        formContainer.style.overflow = 'hidden';
        
        setTimeout(() => {
          formContainer.remove();
          this.formLoaded = false;
          this.checkbox.checked = false;
        }, this.animationDuration);
      }

      renderError() {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-message', 'mt-2');
        errorMsg.style.maxHeight = '0';
        errorMsg.style.overflow = 'hidden';
        errorMsg.style.transition = `max-height ${this.animationDuration}ms ease-out`;
        errorMsg.textContent = 'There was an error loading the gift card form. Please try again.';
        
        this.appendChild(errorMsg);        
        requestAnimationFrame(() => {
          errorMsg.style.maxHeight = '100px';
        });
      }
    }
  );
}

if (!customElements.get('shop-look-section')) {
  customElements.define('shop-look-section', class ShopLookSection extends HTMLElement {
    constructor() {
      super();
      this.swipers = [];
    }

    connectedCallback() {
      this.initializeShopLook();
      this.setupHotspotAccessibility();      
    }

    initializeShopLook() {
      this.initSwipers();
      this.attachHotspotClickEvents();     
      this.setupBuyAllTogetherButton();
    }

    initSwipers() {
      const swiperContainers = this.querySelectorAll("[data-shop-look-slider]");
      swiperContainers.forEach((slider) => {
        const sliderOptionsData = slider.getAttribute("data-shop-look-options");
        if (!sliderOptionsData) return;
        const defaultOptions = {
          effect: "slide",
          direction: "horizontal",
          autoplay: true,
          autoplaySpeed: 5,
          spaceBetweenSlides: 0,
          additionalOptions: {},
        };
        const sliderOptions = Object.assign({}, defaultOptions, JSON.parse(sliderOptionsData));

        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {
          if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
            sliderOptions[key] = parseInt(sliderOptions[key], 10);
          }
        });

        let autoplaySettings = false;
        if (sliderOptions.auto_play > 0) {
          autoplaySettings = { delay: 1000 * sliderOptions.auto_play };
        }

        let loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1;
        let centeredSlides = sliderOptions.centeredMode === "true" || sliderOptions.centeredMode === true;

        const swiperOptions = Object.assign({
          init: false,
          spaceBetween: sliderOptions.space,
          loop: loopEnabled,       
          autoplay: autoplaySettings,
          centeredSlides: centeredSlides,
          speed: 2000,
          simulateTouch: true,
          navigation: {
            nextEl: this.querySelector(".swiper-button-next"),
            prevEl: this.querySelector(".swiper-button-prev"),
          },
          pagination: {
            el: this.querySelector('.swiper-pagination'),
            clickable: true,
          },
          lazyLoading: true,
          focusableElements: "input, select, option, textarea, video, label",
          breakpoints: {
            320: { slidesPerView: sliderOptions.mobile, slidesPerColumn: 1 },
            576: { slidesPerView: sliderOptions.tablet, slidesPerColumn: 1 },
            992: { slidesPerView: sliderOptions.laptop, slidesPerColumn: 1 },
            1200: { slidesPerView: sliderOptions.desktop, slidesPerColumn: 1 },
          },
        }, sliderOptions.additionalOptions);

        const swiperInstance = new Swiper(slider, swiperOptions);
        swiperInstance.on("init", () => swiperInstance.update());
        swiperInstance.init();        
         swiperInstance.on("slideChange", () => {
        const activeIndex = swiperInstance.realIndex; // Get current active slide index
        this.updateActiveHotspot(slider, activeIndex);
      });
        this.swipers.push(swiperInstance);       
      });
    }

    attachHotspotClickEvents() {
      const hotspots = this.querySelectorAll(".section-shop-the-look .spots");
      hotspots.forEach((spot) => {
        spot.addEventListener("click", (e) => {
          const swiperId = e.target.getAttribute("data-id");
          if (swiperId) {
            const swiperContainer = e.target.closest(".shop-the-look").querySelector("[data-shop-look-slider]");
            const swiperInstance = this.swipers.find((swiper) => swiper.el === swiperContainer);

            if (swiperInstance) {
              const slides = Array.from(swiperContainer.querySelectorAll(".swiper-slide"));
              const targetSlide = slides.find((slide) => slide.getAttribute("data-id") === swiperId);

              if (targetSlide) {
                slides.forEach((slide) => slide.classList.remove("spot-clicked"));
                targetSlide.classList.add("spot-clicked");
                const slideIndex = slides.indexOf(targetSlide);
                swiperInstance.slideTo(slideIndex);               
              }
            }
          }
        });
      });
    }
updateActiveHotspot(slider, activeIndex) {
  const swiperContainer = slider.closest(".shop-the-look");
  if (!swiperContainer) return;

  const hotspots = swiperContainer.querySelectorAll(".spots");
  const slides = swiperContainer.querySelectorAll(".swiper-slide");

  if (hotspots.length === 0 || slides.length === 0) return;

  // Get the active slide based on index
  const activeSlide = slides[activeIndex];

  if (!activeSlide) return;

  // Get the data-id of the active slide
  const activeSlideId = activeSlide.getAttribute("data-id");

  // Loop through hotspots to find the matching one
  hotspots.forEach((hotspot) => {
    if (hotspot.getAttribute("data-id") === activeSlideId) {
      hotspot.classList.add("active");
    } else {
      hotspot.classList.remove("active");
    }
  });
}
    setupBuyAllTogetherButton() {
  const buyAllTogetherButton = this.querySelector("#buyAllTogether");
  if (buyAllTogetherButton) {
    buyAllTogetherButton.addEventListener("click", () => {
      // Select only available products
      const bundleItems = Array.from(this.querySelectorAll(".variant-select")).flatMap((select) => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption && selectedOption.dataset.available === "true") {
          return [{
            id: selectedOption.value,
            quantity: 1,
          }];
        }
        return []; 
      });

      if (bundleItems.length === 0) {
        alert("No available products to add to the cart.");
        return;
      }

     fetch(`${window.routes.cart_add_url}.js`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: bundleItems }),
    })
      .then((response) => response.json())
      .then(() => {
        showCartDrawer();
        fetchCart();
      })
      .catch((error) => console.error("Error adding bundle to cart:", error));

    });
  }
}

    setupHotspotAccessibility() {
      const hotspots = this.querySelectorAll(".spots");
      if (hotspots.length > 0) {
        const firstActive = this.querySelector(".spots.active");
        if (!firstActive) {
          hotspots[0].classList.add("active");
        }
      }

      hotspots.forEach((hotspot) => {
        hotspot.addEventListener("click", function () {
          hotspots.forEach((spot) => spot.classList.remove("active"));
          this.classList.add("active");
        });

        hotspot.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.click();
          }
        });
      });
    }
  });
}

// if (Shopify.designMode) {
// document.addEventListener("shopify:section:load", function (event) {
//   const shopLookSection = event.target.querySelector("shop-look-section");  
//   if (shopLookSection) {
//     shopLookSection.connectedCallback();
//   }
// });
// }



if (!customElements.get('wdt-collection-gallery')) {
  customElements.define('wdt-collection-gallery', class WDT_collectionGallery extends HTMLElement {
  constructor() {
    super();
    this.sliderConfigElement = this.querySelector("[data-slider-options]");
    this.bottomTextElements = this.querySelectorAll(".bottom-text");
    if (this.sliderConfigElement) this.initializeSlider();
  }

  initializeSlider() {
    const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");
    if (!sliderOptionsData) return;

    const sliderOptions = $.extend(
      true,
      {
        additionalOptions: {},
      },
      JSON.parse(sliderOptionsData)
    );

    const numericPattern = /^\d+$/;
    Object.keys(sliderOptions).forEach((key) => {
      if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
        sliderOptions[key] = parseInt(sliderOptions[key], 10);
      }
    });

    const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;
    const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true || sliderOptions.loop === 1;
    const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

    // Default Swiper options
    const swiperOptions = $.extend(true, {
      init: false,
      speed: 2300,
      spaceBetween: sliderOptions.space,
      loop: loopEnabled,
      preventClicks: true,
      preventClicksPropagation: true,
      autoplay: autoplaySettings,
      centeredSlides: centeredSlides,
      slideToClickedSlide: true,
      effect: "creative",
      grabCursor: true,
      slidesPerView: 3, // Default number of slides shown
      creativeEffect: {
        perspective: true,
        prev: {
          shadow: true,
          translate: ["-82%", -50, 5],
         rotate: [0, 0, 8],
          zIndex: 999,
          scale: 0.7,
        },
        next: {
          shadow: true,
          translate: ["82%", -50, 5],
         rotate: [0, 0, -8],
          zIndex: 999,
          scale: 0.7,
        },
        active: {
          translate: [0, 0, -300],
          rotate: [0, 0, -2],
          zIndex: -1,
          scale: 1.2,
        },
      },
      navigation: {
        nextEl: this.sliderConfigElement.querySelector(".swiper-button-next"),
        prevEl: this.sliderConfigElement.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: this.sliderConfigElement.querySelector(".swiper-pagination"),
        clickable: true,
      },
      lazyLoading: true,
      focusableElements: "input, select, option, textarea, video, label",

      // Responsive breakpoints
      breakpoints: {
     1199: {
          slidesPerView: 3,
          spaceBetween: 0,
          creativeEffect: {            
             prev: {
                shadow: true,
                translate: ["-82%", 0, -1],
            },
            next: {
                translate: ["82%", 0, 0],
            },
            active: {
              translate: [0, 0, -300],
              rotate: [0, 0, -2],
              zIndex: -1,
              scale: 1.2,
            },
          },
        },
        786: {
          slidesPerView: 3,
          spaceBetween: 10,
          creativeEffect: {          
            prev: {
                shadow: true,
                translate: ["-85%", 0, -1],
            },
            next: {
                translate: ["85%", 0, 0],
            },
            active: {
              translate: [0, 0, -300],
              rotate: [0, 0, -2],
              zIndex: -1,
              scale: 1.2,
            },
          },
        },
        576: {
          slidesPerView:2,
          spaceBetween: 10,          
          creativeEffect: {           
            prev: {
                shadow: true,
                translate: ["-78%", 0, -1],
            },
            next: {
                translate: ["79%", 0, 0],
            },
            active: {
              translate: [0, 0, -300],
              rotate: [0, 0, -2],
              zIndex: -1,
              scale: 1.2,
            },
          },
        },
       320: {
          slidesPerView: 1,
          spaceBetween: 10, 
          creativeEffect: {           
            prev: {
                shadow: true,
                translate: ["-78%", 0, -1],
            },
            next: {
                translate: ["79%", 0, 0],
            },
            active: {
              translate: [0, 0, -300],
              rotate: [0, 0, -2],
              zIndex: -1,
              scale: 1.2,
            },
          },
        },
       
     
      },
    }, sliderOptions.additionalOptions);

    // Initialize Swiper instance
    const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
    this.swiperInstance = new Swiper(swiperContainer, swiperOptions);

    // Listen for breakpoint changes to adjust `creativeEffect`
    this.swiperInstance.on("resize", () => {
      this.adjustTransformForCurrentBreakpoint();
    });

    this.swiperInstance.on("slideChange", () => {
      this.handleSlideChange(this.swiperInstance);
    });

    this.swiperInstance.on("init", () => {
      this.swiperInstance.update();
    });

    this.swiperInstance.init();
  }

  handleSlideChange(swiperInstance) {
    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    const matchingId = activeSlide.getAttribute("data-gallery-matching-id");

    if (matchingId) {
      this.bottomTextElements.forEach((element) => {
        if (element.getAttribute("data-gallery-matching-id") === matchingId) {
          element.classList.add("show");
          element.classList.remove("hidden");
        } else {
          element.classList.remove("show");
          element.classList.add("hidden");
        }
      });
    }
  }

  // Method to adjust active slide transforms based on breakpoints
  adjustTransformForCurrentBreakpoint() {
    const swiper = this.swiperInstance;
    if (!swiper) return;

    // Get the current breakpoint (based on the window width)
    const windowWidth = window.innerWidth;

    // Determine which breakpoint has been triggered and apply corresponding transform values
    if (windowWidth <= 320) {
      swiper.params.creativeEffect.active = {
        translate: [0, 0, -200],
        rotate: [0, 0, -2],
        scale: 1.5,
      };
    } else if (windowWidth <= 576) {
      swiper.params.creativeEffect.active = {
        translate: [0, 0, -200],
        rotate: [0, 0, -2],
        scale: 1.2,
      };
    } else if (windowWidth <= 990) {
      swiper.params.creativeEffect.active = {
        translate: [0, 0, -300],
        rotate: [0, 0, -2],
        scale: 1.2,
      };
    } else {
      swiper.params.creativeEffect.active = {
        translate: [0, 0, -300],
        rotate: [0, 0, -2],
        scale: 1.2,
      };
    }

    // Update Swiper with new settings without re-initializing
    swiper.update();
  }
});
}

function initQuickModal() {
  const quickViewButtons = document.querySelectorAll('.quick-view-btn'); 
  quickViewButtons.forEach(button => {   
    button.removeEventListener('click', handleQuickViewClick);
    button.addEventListener('click', handleQuickViewClick);
  });
}


function handleQuickViewClick(event) {
  event.preventDefault(); 

  if (this.classList.contains('loading')) return;
  this.classList.add('loading');

  const button = this;
  const productUrl = button.getAttribute('data-product-url');
  const quickViewContent = document.getElementById('quickViewContent'); 
  quickViewContent.innerHTML = 'Loading...';

 
  fetch(productUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const productInfo = doc.querySelector('product-template');

      if (productInfo) {
        updateDOM(productInfo);
        quickViewContent.innerHTML = productInfo.innerHTML;

        var offcanvasElement = document.getElementById('quickViewOffcanvas');
        if (!offcanvasElement) return;

        if (!button.dataset.offcanvasInitialized) {
          button.dataset.offcanvasInitialized = true;
          const quickViewOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
          quickViewOffcanvas.show();
          offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {            
            button.classList.remove('loading'); 
            delete button.dataset.offcanvasInitialized; 
          });

          initializeProductGalleryInModal(quickViewContent);
        }
      } else {
        quickViewContent.innerHTML = 'Product information not found.';
      }
    })
    .catch(error => {
      quickViewContent.innerHTML = 'Sorry, an error occurred while loading the product.';
      console.error('Error fetching product data:', error);
      button.classList.remove('loading');
    });
}



function updateDOM(htmlDoc) {    
  const productColorScheme = htmlDoc.querySelector('.section-spacing');
if (productColorScheme) { 
    productColorScheme.classList.forEach(className => {
        if (className.startsWith('color-scheme-')) {
            productColorScheme.classList.remove(className);
        }
    });
}

  const productRecommendations = htmlDoc.querySelector('product-recommendations');
  if (productRecommendations) productRecommendations.remove();
  const productPickup = htmlDoc.querySelector('product-availability-check');
  if (productPickup) productPickup.remove();
  const modelText = htmlDoc.querySelector('.block-popup');
  if (modelText) modelText.remove();
  const shortText = htmlDoc.querySelector('.product-text');
  if (shortText) shortText.remove();
  const canvasText = htmlDoc.querySelectorAll('.canvas_block');
  if (canvasText.length > 0) {
    canvasText.forEach(element => element.remove());
  }
  // const shareBtn = htmlDoc.querySelector('.share_button');
  // if (shareBtn) shareBtn.remove();
  //  const accordionText = htmlDoc.querySelectorAll('.accordion');
  // if (accordionText.length > 0) {
  //   accordionText.forEach(accordionElement => accordionElement.remove());
  // }
}

function initializeProductGalleryInModal() {  
  const thumbnailContainer = document.querySelector(".product-thumbnails");
  const mainGalleryContainer = document.querySelector(".product-media-gallery");

  if (!thumbnailContainer || !mainGalleryContainer) {
    console.warn("Product Gallery: Required containers not found in modal.");
    return;
  }
  const productGallery = new ProductGallery();
  document.querySelector("#quickModalCloseButton").addEventListener("click", () => {
    productGallery.destroySwipers(); 
  });
}


function initializeProductGalleryInModal(modalContent) {
   if (modalContent) {    
    new ProductGallery(modalContent);


  var quickMediaElement = modalContent.querySelector("wdt-main-media");
  
    if (quickMediaElement) {       
        var selectedVariantId = quickMediaElement.getAttribute("data-selected-variant-id");
        const matchingMediaDiv = quickMediaElement.querySelector(`[data-media-id="${selectedVariantId}"]`);
       // console.log("selectedVariantId: " + selectedVariantId);
        const isStackedLayout = quickMediaElement.classList.contains("stacked");      
        if (matchingMediaDiv && isStackedLayout) {
            matchingMediaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (quickMediaElement) {
            const swiperSliderInit = quickMediaElement.querySelector(".product-media-gallery");
            const gallerySwiper = swiperSliderInit.swiper;
            if (gallerySwiper) {
                gallerySwiper.slides.forEach((slide, index) => {
                    const mediaId = slide.getAttribute("data-media-id");
                    if (mediaId && mediaId === `${selectedVariantId}`) {
                        gallerySwiper.slideTo(index);
                    }
                });
            }
        }
    } 

     
    const variantSelectors = modalContent.querySelectorAll('variant-selector');        
    variantSelectors.forEach((variantSelectorEl) => {
      if (typeof variantSelectorEl.init === 'function') {
        variantSelectorEl.init(modalContent);
        //console.log("A"+modalContent.innerHTML);
      } else {
        const variantSelector = new VariantSelector(modalContent);
        if (typeof variantSelector.init === 'function') {
          variantSelector.init(modalContent);
        } else {
          console.warn("VariantSelector instance does not have an init method.");
        }
       // console.log("B");
      }
    });
  } else {
    console.error("Modal content not found for ProductGallery initialization.");
  }
}


function syncVariantToStickyBar(currentVariant) {
  const stickySelect = document.querySelector(".stickySelect"); 
  if (stickySelect) {
    const options = stickySelect.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.value == currentVariant.id) {
        stickySelect.selectedIndex = i;
        stickySelect.dispatchEvent(new Event("change"));
       // console.log(`Sticky bar updated to variant ID: ${currentVariant.id}`);
        return;
      }
    }
    //console.warn(`No matching variant found for ID: ${currentVariant.id}`);
  } else {
   // console.error("Sticky select element not found in the DOM.");
  }  
}

if (!customElements.get('quiz-section')) {
  customElements.define('quiz-section', class QuizSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initQuiz();
  }

  initQuiz() {
    const totalQuestions = this.querySelectorAll('.quiz-question').length;
    const progressBar = this.querySelector('#quiz-progress-bar');
    const resultsButton = this.querySelector('#view-results-button');
    const resetButton = this.querySelector('#reset-quiz-button');
    const resultsContainer = this.querySelector('#results-container');
    const quizClose = this.querySelector('#quizClose');

    if (!resultsButton) {
      console.error('Results button not found in the quiz section.');
      return;
    }

    resultsButton.disabled = true;

    // Initialize Swiper
    const swiper = new Swiper(this.querySelector('.quizSlider'), {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 50,
      // autoHeight: true,
      draggable: false,
      allowTouchMove: false,
      effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
       //speed: 2000,
      navigation: {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev'),
      },
    });

    // Attach Swiper events
    swiper.on('init', () => this.updateNumericPagination(swiper));
    swiper.on('slideChange', () => this.updateNumericPagination(swiper));
    
    // Trigger initialization event
    swiper.init();

    // Disable Next button until an answer is selected
    this.querySelectorAll('.quiz-question').forEach((questionEl) => {
      const nextButton = this.querySelector('.swiper-button-next');
      const radioButtons = questionEl.querySelectorAll('.form-check-input');
      nextButton.disabled = true;
      radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
          if (radioButton.checked) {
            nextButton.disabled = false;
            nextButton.classList.remove('invisible');
            this.checkAllQuestionsAnswered(totalQuestions, resultsButton);
          }
        });
      });
    });

    resultsButton.addEventListener('click', () => {
      const selectedAnswers = [];
      this.querySelectorAll('.quiz-question').forEach((question) => {
        const questionId = question.dataset.questionIndex;
        const selectedOption = this.querySelector(`input[name="question_${questionId}"]:checked`);
        if (selectedOption) {
          selectedAnswers.push(selectedOption.value);
        }
      });

      if (selectedAnswers.length !== totalQuestions) {
        alert(wdtTheme.strings.quizAnswerAll);
        return;
      }

      this.fetchProductsBasedOnTags(selectedAnswers, resultsContainer);
    });

    resetButton.addEventListener('click', () => {
      this.resetQuiz(swiper, resultsButton);
    });

    quizClose.addEventListener('click', () => {
      this.resetQuiz(swiper, resultsButton);
    });
  }

  updateNumericPagination(swiperInstance) {
    const swiperContainer = this.querySelector('.quizSlider');
    if (!swiperContainer) return;
    const currentIndex = swiperInstance.realIndex + 1;
    const totalSlides = swiperInstance.slides.length;

    swiperContainer.querySelector('.swiper-counter').innerHTML = 
      `<span class="count h1">0${currentIndex}</span>/<span class="total h2">0${totalSlides}</span>`;
  }

  checkAllQuestionsAnswered(totalQuestions, resultsButton) {
    const answeredQuestions = this.querySelectorAll('.quiz-question input[type="radio"]:checked').length;
    resultsButton.disabled = answeredQuestions !== totalQuestions;
  }

  fetchProductsBasedOnTags(tags, resultsContainer) {
    const query = tags.join(' ');
    const encodedQuery = encodeURIComponent(query);
    const url = `${window.routes.search_url}/?view=quiz&type=product&q=${encodedQuery}`;

    fetch(url)
      .then((response) => response.json())
      .then((products) => this.displayProducts(products, resultsContainer))
      .catch((error) => {
        resultsContainer.innerHTML = `<p>Error loading products: ${error.message}</p>`;
      });
  }

  displayProducts(products, resultsContainer) {
    if (products.length === 0) {
      resultsContainer.innerHTML = '<p class="h5">' + wdtTheme.strings.quizNoResult + '</p>';
      return;
    }

    let resultsHTML = '<div class="row row-gap-4">';
products.forEach((product) => {
  let productImage = product.image && product.image !== "undefined" 
    ? `<img src="${product.image}" class="cart-item__image" alt="${product.title}" loading="lazy" width="150" height="150">`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5" style="height: 120px;width: 120px;"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"></path><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"></path><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"></path><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"></path></svg>`;

  resultsHTML += `
    <div class="col-md-12">
      <div class="card flex-row gap-3 flex-sm-nowrap align-items-center">
        <div class="card-img cart-item__image-container border d-flex align-items-center justify-content-center rounded-3">
          ${productImage}
        </div>
        <div class="card-body px-0">
          <h5 class="card-title"><a href="${product.url}">${product.title}</a></h5>
          <p class="price fw-bold">${product.price}</p>
          <a href="${product.url}" class="btn btn-link">${wdtTheme.strings.viewDetail}</a>
        </div>
      </div>
    </div>`;
});
resultsHTML += '</div>';
resultsContainer.innerHTML = resultsHTML;

  }

  resetQuiz(swiper, resultsButton) {
    this.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
      radio.checked = false;
    });
    swiper.slideTo(0);
    resultsButton.disabled = true;
    const nextButton = this.querySelector('.swiper-button-next');
    nextButton.classList.add('invisible');
  }
});
}


if (!customElements.get('content-showcase')) {
  customElements.define('content-showcase', class ContentShowcase extends HTMLElement {
  constructor() {
    super();
    this.processTitleBlock = this.processTitleBlock.bind(this);
  }

  connectedCallback() {
    this.processTitleBlock();
  }

  processTitleBlock() {
    const titleBlock = this.querySelector(".title_block");
    if (!titleBlock) return;

    const spans = Array.from(titleBlock.querySelectorAll("span.text-word"));
    const images = Array.from(titleBlock.querySelectorAll("img"));
    let combinedText = "";
    let newSpan = null;

    spans.forEach((span, index) => {
      const nextSibling = span.nextElementSibling;

      // Start a new span if `newSpan` is null
      if (!newSpan) {
        newSpan = document.createElement("span");
        newSpan.className = "text-word align-middle";
        titleBlock.insertBefore(newSpan, span);
      }
      combinedText += span.textContent + " ";
      span.remove();
      if (!nextSibling || !nextSibling.classList.contains("text-word")) {
        newSpan.textContent = combinedText.trim();
        combinedText = "";
        newSpan = null; 
      }
    });

    
    images.forEach((img, index) => {
      const altText = spans[index]?.textContent || `Image ${index + 1}`;
      img.setAttribute("alt", altText.trim());
    });
  }
});
}

document.addEventListener('DOMContentLoaded', () => { 
  const options = document.querySelectorAll('.form-check-label');
  options.forEach(option => {    
    option.setAttribute('tabindex', '0');
    option.addEventListener('keydown', (event) => {
      const inputElement = option.previousElementSibling; 
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); 
        inputElement.checked = true; 
        inputElement.dispatchEvent(new Event('change'));
      }
    });
    option.addEventListener('focus', () => {
      option.classList.add('focused');
    });
    option.addEventListener('blur', () => {
      option.classList.remove('focused');
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  cardSwatch();
  cardVariantSwatch();
  firstLoadMedias();
  initQuickModal();
  if (document.querySelector(".tab-style-default")) {
    initializeTabs();
  }
    
});
function firstLoadMedias() {    
    var mainMediaElements = document.querySelectorAll("wdt-main-media");
    mainMediaElements.forEach(mainMediaElement => {
        if (mainMediaElement) {
            var selectedVariantId = mainMediaElement.getAttribute("data-selected-variant-id");
            //console.log("selectedVariantId: " + selectedVariantId);
            const matchingMediaDiv = mainMediaElement.querySelector(`[data-media-id="${selectedVariantId}"]`);
            const isStackedLayout = mainMediaElement.classList.contains("stacked");

            if (matchingMediaDiv && isStackedLayout) {
                matchingMediaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            const swiperSliderInit = mainMediaElement.querySelector(".product-media-gallery");
            if (swiperSliderInit) {
                const gallerySwiper = swiperSliderInit.swiper;
                if (gallerySwiper) {
                    gallerySwiper.slides.forEach((slide, index) => {
                        const mediaId = slide.getAttribute("data-media-id");
                        if (mediaId && mediaId === `${selectedVariantId}`) {
                            gallerySwiper.slideTo(index);
                        }
                    });
                }
            }
        }
    });
}

  AOS.init({
    startEvent: 'DOMContentLoaded',
    once: true,
    offset: 50, 
    delay: 0, 
    duration: 1000    
  });

  window.addEventListener('load', function() {
    AOS.refresh();  
    if (document.querySelector(".tab-style-default")) {
    initializeTabs();
  }
  });

function makeTimer() {
    $('.product-deal-count').each(function() {
        var endTime = new Date($(this).attr('data-end-time'));		
        endTime = (Date.parse(endTime) / 1000);
        var now = new Date();
        now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        
        if(timeLeft > 0) {         
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }

            $(this).find(".days").html(days < 10 ? "0" + days : days).append('D');
            $(this).find(".hours").html(hours).append('H');
            $(this).find(".minutes").html(minutes).append('M');
            $(this).find(".seconds").html(seconds).append('S');

        } else {
            $(this).find(".days").html("00");
            $(this).find(".hours").html("00");
            $(this).find(".minutes").html("00");
            $(this).find(".seconds").html("00");

            $(this).find(".deal-label").hide();  
            $(this).find(".deal-clock").hide();        
        }
    });
}

$(document).ready(function() {
    makeTimer();
    setInterval(function() { makeTimer(); }, 1000);
});


function initializeTabs() {
  const box = document.querySelector(".tab-style-default");
  if (!box) return; 

  const scrItems = document.querySelectorAll(".tab__item");
  if (scrItems.length === 0) return;

  let scrIWidth = 0;
 
  scrItems.forEach((item) => {
    scrIWidth += item.offsetWidth; 
  });

  
  const productTabMenu = document.querySelector(".tab_menu");
  if (!productTabMenu) return;
  productTabMenu.style.width = `${scrIWidth}px`;

 
  scrItems.forEach((item) => {
    item.addEventListener("click", () => {
      scrItems.forEach((i) => i.classList.remove("on")); // Remove "on" class from all items
      item.classList.add("on"); 
      muCenter(item); 
    });
  });

  function muCenter(target) {
    const boxItems = box.querySelectorAll(".tab__item");
    const boxHalf = box.offsetWidth / 2; // Half of the box width
    let listWidth = 0;
    let targetLeft = 0;

 
    boxItems.forEach((item) => {
      listWidth += item.offsetWidth;
    });
  
    for (let i = 0; i < [...boxItems].indexOf(target); i++) {
      targetLeft += boxItems[i].offsetWidth;
    }

    const selectTargetPos = targetLeft + target.offsetWidth / 2;

    let pos;
    if (selectTargetPos <= boxHalf) {    
      pos = 0;
    } else if (listWidth - selectTargetPos <= boxHalf) {   
      pos = listWidth - box.offsetWidth;
    } else {     
      pos = selectTargetPos - boxHalf;
    }
    setTimeout(() => {
      box.scrollTo({
        left: pos,
        behavior: "smooth",
      });
    }, 200);
  }
}

// Variant accessibility 
document.querySelectorAll('.variant-options .variant-option-item').forEach((item) => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });

  item.addEventListener('click', () => {
    const options = item.parentNode.querySelectorAll('.variant-option-item');
    options.forEach((opt) => opt.setAttribute('aria-selected', 'false'));
    item.setAttribute('aria-selected', 'true');
  });
});



function initTabs(context = document) {
  const infoTabs = context.querySelectorAll('.info-tabs');
  const infoDetails = context.querySelectorAll('.info-details');

  function removeActiveClass() {
    infoTabs.forEach((tab) => tab.classList.remove('active'));
    infoDetails.forEach((detail) => detail.classList.remove('active'));
  }

  function addActiveClass(index) {
    infoTabs[index].classList.add('active');
    infoDetails[index].classList.add('active');
  }

  if (infoTabs.length > 0 && infoDetails.length > 0) {
    infoTabs[0].classList.add('active');
    infoDetails[0].classList.add('active');
  }

 
  infoTabs.forEach((tab, index) => {
  tab.addEventListener('mouseenter', function () {
  if (window.matchMedia('(min-width: 992px)').matches) {
    removeActiveClass();
    addActiveClass(index);
      }
  });

  tab.addEventListener('click', function () {
    removeActiveClass();
    addActiveClass(index);
  });
});
  

  const tabs = context.querySelectorAll('[role="tab"]');
  const tabPanels = context.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowRight':
          activateTab(tabs[(index + 1) % tabs.length]);
          break;
        case 'ArrowLeft':
          activateTab(tabs[(index - 1 + tabs.length) % tabs.length]);
          break;
        case 'Home':
          activateTab(tabs[0]);
          break;
        case 'End':
          activateTab(tabs[tabs.length - 1]);
          break;
      }
    });
  });

  function activateTab(tab) {
    tabs.forEach((t) => {
      t.setAttribute('aria-selected', 'false');
      t.tabIndex = -1;
    });
    tabPanels.forEach((panel) => panel.classList.remove('active'));

    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    const panelId = tab.getAttribute('aria-controls');
    context.getElementById(panelId)?.classList.add('active');
    tab.focus();
  }
}

class MarqueeSwiper extends HTMLElement {
  constructor() {
    super();
    this.swiperInstance = null;
  }

  connectedCallback() {
    this.initSwiper();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.destroySwiper();
  }

  initSwiper() {
    const isMobile = window.innerWidth <= 1199;
    if (isMobile && !this.swiperInstance) {
      this.swiperInstance = new Swiper(this, {
        direction: 'vertical',
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        navigation: {
            nextEl: this.querySelector(".swiper-button-next"),
            prevEl: this.querySelector(".swiper-button-prev"),
          },
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 4000,
          reverseDirection: true,
          disableOnInteraction: false,
        },
        on: {
          slideChange: this.handleSlideChange.bind(this),
        },
      });
    } else if (!isMobile && this.swiperInstance) {
      this.destroySwiper();
    }
  }

  handleSlideChange() {
    if (this.swiperInstance) {
      const currentSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
      const matchingId = currentSlide?.dataset.indexValidate;

      if (matchingId) {
        this.activateMatchingBlock(matchingId);
      }
    }
  }

  activateMatchingBlock(matchingId) {
    const allTabs = document.querySelectorAll('.info-tabs');
    const allDetails = document.querySelectorAll('.info-details');
    allTabs.forEach((tab) => tab.classList.remove('active'));
    allDetails.forEach((details) => details.classList.remove('active'));

    const matchingTab = Array.from(allTabs).find(
      (tab) => tab.dataset.indexValidate === matchingId
    );
    if (matchingTab) matchingTab.classList.add('active');

    const matchingDetails = Array.from(allDetails).find(
      (detail) => detail.dataset.indexValidate === matchingId
    );
    if (matchingDetails) matchingDetails.classList.add('active');
  }

  handleResize() {
    this.initSwiper();
  }

  destroySwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
    }
  }
}

customElements.define('marquee-swiper', MarqueeSwiper);

function initializeInfoPanels(context = document) {
  initTabs(context);

  if (context === document) {
    const swipers = document.querySelectorAll('marquee-swiper');
    swipers.forEach((swiper) => swiper.initSwiper());
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeInfoPanels();
});
 


// Shopify Theme Editor Events
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {    
    const section = event.target;
      if (section.classList.contains("product-info-tabs")) {
     initializeInfoPanels(section);
      }
    AOS.refresh();
  });

  document.addEventListener('shopify:section:unload', (event) => {
    const section = event.target;
     if (section.classList.contains("product-info-tabs")) {
    const swipers = section.querySelectorAll('marquee-swiper');
    swipers.forEach((swiper) => swiper.destroySwiper());
     }
   AOS.refresh();
  });
}


document.addEventListener('show.bs.offcanvas', function (event) {
  const visibleOffcanvases = document.querySelectorAll('.offcanvas.show');
  visibleOffcanvases.forEach((offcanvas) => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
      // Wait for the offcanvas to fully hide before showing the new one
      offcanvas.addEventListener('hidden.bs.offcanvas', function () {
        const newOffcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(event.target);
        newOffcanvasInstance.show();
      }, { once: true });
    }
  });
});


class Wavemarquee extends HTMLElement {
  constructor() {
    super();
    this.init();    
    window.addEventListener('resize', this.updateHeight.bind(this));
    window.addEventListener('load', this.updateHeight.bind(this));  
  }

  init() {
    const marq_prevEle = this.closest('.shopify-section')?.previousSibling;
    const prevEle_shaper = marq_prevEle?.querySelector('.shaper-bottom');

    if (prevEle_shaper) {      
      const marq_wraperContianer = this.querySelector('.wave_container');
      const marq_wraper = this.querySelector('.wrapper--full');
      marq_wraperContianer.classList.add('wave-marquee-top-container');
      marq_wraper.classList.add('wave-marquee-top');

      this.updateHeight(); // Set height on initialization
    }
  }

  updateHeight() {
    const marq_wraper = this.querySelector('.wrapper--full');
    if (!marq_wraper) return;

    let marQ_height = parseInt(marq_wraper.clientHeight); // Default height   
    // Reduce height by 20px if screen width is <= 576px
    if (window.matchMedia('(max-width: 576px)').matches) {
    //  marQ_height -= 20; // Reduce by 20px
    }

    this.querySelector('.wave_container').style.height = `${marQ_height}px`;
  }
}

customElements.define('wave-marquee', Wavemarquee);


document.addEventListener("DOMContentLoaded", function () {
   //general canvas overflow handling
  const offcanvasElements = document.querySelectorAll(".offcanvas");
  offcanvasElements.forEach((offcanvas) => {
    offcanvas.addEventListener("shown.bs.offcanvas", function () {
      document.body.style.overflow = "hidden"; 
      // document.body.style.padding = "0"; 
    });

    offcanvas.addEventListener("hidden.bs.offcanvas", function () {
      document.body.style.overflow = "";
    });
  });
  
//number-counter
    const counters = document.querySelectorAll('.number-counter-value');
    const updateCounter = (counter) => {
      const target = +counter.getAttribute('data-value');
      counter.innerText = '0';
      const increment = target / 200;

      const countUp = () => {
        const current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(countUp, 5);
        } else {
          counter.innerText = target;
        }
      };

      countUp();
    };
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  //customer-who-purchased

   if ($.cookie('dT_suggested-cookie') == 'closed') {
    $('.customer-who-purchased').remove();
  }

  $('.dT_close').bind('click',function(){
    $('.customer-who-purchased').remove();
    $.cookie('dT_suggested-cookie', 'closed', {expires:1, path:'/'});
  });      

  var elements = $('.customer-who-purchased li');
  var init_element = 0;
  var i = 0;
 
  elements.removeClass('active');
  function fadeInRandomElement() { 
    if ( i % 2 == 0) {
      var currentItem = elements.eq(init_element);      
      currentItem.addClass('active');
      setTimeout(function(){ 
        currentItem.removeClass('active')
      }, 8000);

      init_element++;
      if(elements.length == init_element) {
        init_element = 0;
      }

    }
    i++;
  }
  setInterval(function(){ 
    fadeInRandomElement();
  }, 8000);   
//Next function
  });

class ProductTabsCarousel extends HTMLElement {
  constructor() {
    super();
    this.tabButtons = this.querySelectorAll('[data-tab]');
    this.tabContents = this.querySelectorAll('[data-tab-content]');
    this.swipers = [];
    this.setupTabs();
    this.initSwipers();
    this.setupResizeObserver();
  }

  setupTabs() {
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
       // console.log("Clicked tabId:", tabId);
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        const activeContent = this.querySelector(`[data-tab-content="${tabId}"]`);
        if (activeContent) activeContent.classList.add('active');

        const activeTabIndex = Array.from(this.tabButtons).indexOf(button);
        if (this.swipers[activeTabIndex]) {
          this.swipers[activeTabIndex].update();
        }
      });
    });

    if (this.tabButtons.length > 0) {
      this.tabButtons[0].click();
    }
  }

  initSwipers() {
    this.tabContents.forEach((content, index) => {
      const swiperEl = content.querySelector('.swiper');
      const prevEl = content.querySelector('.swiper-button-prev');
      const nextEl = content.querySelector('.swiper-button-next');
      const paginationEl = content.querySelector('.swiper-pagination');
      const sliderConfigElement = content.querySelector('[data-swiper-slider]');
      const sliderOptionsData = sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });
      
      
      if (swiperEl) {
        const swiper = new Swiper(swiperEl, {
          slidesPerView: 2,
          spaceBetween: 16,
          navigation: {
            nextEl,
            prevEl,
          },
          pagination: {
            el: paginationEl,
            clickable: true,
          },
          breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: 10
                },
                577: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.5
                },
                768: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.5
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.7
                },
                1440: {
                    slidesPerView: sliderOptions.desktop || 4
                }
             }
        });
        this.swipers.push(swiper);
      }
    });
  }

  setupResizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      this.swipers.forEach(swiper => {
        if (swiper) swiper.update();
      });
    });

    resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.swipers.forEach(swiper => swiper?.destroy());
  }
}

customElements.define('product-tabs-carousel', ProductTabsCarousel);

// Home product tab dropdown for mobile

if (window.innerWidth < 768) {
  document.querySelectorAll('.product-tab-button').forEach(function(button) {
    button.addEventListener('click', function() {
      const header = document.querySelector('.product-tabs-header');
      if (header) {
        header.classList.toggle('open');
      }
    });
  });
}

//swatch color image change in card product 

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".option-item").forEach(swatch => {
    swatch.addEventListener("click", function () {
      const imageUrl = swatch.getAttribute("data-image"); 
      if (!imageUrl) return;
      const card = swatch.closest(".resource-card, .card-main"); 
      if (!card) return;
      const featuredImage = card.querySelector(".featured-media");
      if (!featuredImage) return;
      featuredImage.src = imageUrl;      
      if (featuredImage.hasAttribute("srcset")) {
        featuredImage.srcset = imageUrl;
      }
      const swatches = card.querySelectorAll(".option-item");
      swatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
    });
  });
});

// Attach event delegation to the document
document.addEventListener('click', function(e) {
    const optionItem = e.target.closest('.variant-option-item');
    if (!optionItem) return;

    const input = optionItem.querySelector('input');
    if (!input) return;

    const value = input.value;

    let selectedDiv = optionItem.closest('.variant-options-wrapper')?.querySelector('.selected-variant');
    if (!selectedDiv) {
        selectedDiv = optionItem.closest('div')?.querySelector('.selected-variant');
    }
    if (!selectedDiv) return;
    selectedDiv.innerHTML = value;
});

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener('click', this.hide.bind(this, false));
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);
class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

document.querySelectorAll('.variant-swatch').forEach(item => {
  item.addEventListener('mouseover', () => {
    item.classList.add('active');
  });

  item.addEventListener('mouseout', () => {
    item.classList.remove('active');
  });
});


if (!customElements.get('wdt-collection-sidebar')) {
  customElements.define('wdt-collection-sidebar', class WDT_Swiper extends HTMLElement{
    constructor() {
        super();     
        this.sliderConfigElement = this.querySelector("[data-slider-options]");         
        if (this.sliderConfigElement) this.initializeSlider();
    }

    initializeSlider() {       
        const sliderOptionsData = this.sliderConfigElement.getAttribute("data-slider-options");      
        if (!sliderOptionsData) return;
        const sliderOptions = $.extend(true, {
            effect: "slide",
            direction: "horizontal",
            autoplay: true,
            autoplaySpeed: 5,
            spaceBetween: 0, 
            additionalOptions: {}
        }, JSON.parse(sliderOptionsData));
       
        const numericPattern = /^\d+$/;
        Object.keys(sliderOptions).forEach((key) => {        
            if (typeof sliderOptions[key] === "string" && numericPattern.test(sliderOptions[key])) {
                sliderOptions[key] = parseInt(sliderOptions[key], 10);
            }
        });

       
        const autoplaySettings = sliderOptions.auto_play > 0 ? { delay: 1000 * sliderOptions.auto_play } : false;     
        const loopEnabled = sliderOptions.loop === "true" || sliderOptions.loop === true;     
        const centeredSlides = sliderOptions.mode === "true" || sliderOptions.mode === true;

        const swiperOptions = $.extend(true, {
            init: false,
            spaceBetween: sliderOptions.space,
            loop: loopEnabled,
            preventClicks: true,
            preventClicksPropagation: true,
            autoplay: autoplaySettings,
            centeredSlides: centeredSlides,
            speed: 2000, 
            navigation: {
                nextEl: this.sliderConfigElement.querySelector("#swiper-sidebar-next"),
                prevEl: this.sliderConfigElement.querySelector("#swiper-sidebar-prev")
            },
            pagination: {
                el: this.sliderConfigElement.querySelector(".swiper-pagination"),
                clickable: true
            },
            lazy: true,
            focusableElements: 'input, select, option, textarea, video, label',
            breakpoints: {
                320: {
                    slidesPerView: sliderOptions.mobile || 1,
                    spaceBetween: sliderOptions.space * 0.5
                },
                576: {
                    slidesPerView: sliderOptions.tablet || 2,
                    spaceBetween: sliderOptions.space * 0.7
                },
                992: {
                    slidesPerView: sliderOptions.laptop || 3,
                    spaceBetween: sliderOptions.space * 0.8
                },
                1200: {
                    slidesPerView: sliderOptions.desktop || 4
                }
            }
        }, sliderOptions.additionalOptions);


        const swiperContainer = this.sliderConfigElement.querySelector("[data-swiper-slider]");
        const swiperInstance = new Swiper(swiperContainer, swiperOptions);
        swiperInstance.on("init", () => {
            swiperInstance.update();
        });

        swiperInstance.init();
    }
});
}

 
function email__button() {
  const btn = document.querySelector(".email__button");
  if (!btn) return;

  const email_btn_width = btn.offsetWidth;
  document.documentElement.style.setProperty("--email-btn-width", email_btn_width + "px");
}

email__button();


 


// this function empty div space Reduce

// document.querySelectorAll('div').forEach(function(div){
//   if (div.textContent.trim() === '') {
//     div.remove();  // remove empty div
//   }
// });
