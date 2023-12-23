/*
 * @Descripttion:
 * @version:
 * @Author: tzy1997
 * @Date: 2023-03-22 21:06:13
 * @LastEditors: AdingApkgg AdingApkgg@outlook.com
 * @LastEditTime: 2023-12-23 17:33:30
 */
var card_swiper;
var home_swiper;

var _tzy = {
  /* 友情链接页面 头像找不到时 替换图片 */
  flinkOnError: () => {
    if (location.href.indexOf("link") == -1) {
      return;
    }
    var imgObj = document.getElementsByTagName("img");
    for (i = 0; i < imgObj.length; i++) {
      imgObj[i].onerror = function () {
        this.src = "https://bu.dusays.com/2021/03/27/0106da541a922.gif";
      };
    }
  },
  // 播放||暂定||换一个 视频
  link_to: () => {
    var videoDom = document.getElementById("tzy-video");
    var u_ = "https://wch666.com/api/get_girl.php";
    if (videoDom) {
      $(".girl_btn_fuck").on("click", function () {
        if (videoDom.paused) {
          videoDom.play();
          $(this)[0].innerText = "暂停";
        } else {
          videoDom.pause();
          $(this)[0].innerText = "播放";
        }
      });
      $(".girl_btn_next").on("click", function () {
        videoDom.src = u_;
        videoDom.play();
      });
      videoDom.addEventListener("ended", function (event) {
        videoDom.src = u_;
        videoDom.play();
      });
    }
  },
  // 标签页面
  tagPageActive: () => {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    // 验证是否是分类链接
    var pattern = /\/tags\/.*?\//;
    var patbool = pattern.test(urlinfo);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      var valuegroup = urlinfo.split("/");
      if (document.querySelector("#tag-page-tags")) {
        $("a").removeClass("select");
        console.log(document.getElementById(nowCategorie));
        if (document.getElementById(nowCategorie)) {
          document.getElementById(nowCategorie).classList.add("select");
        } else {
          document
            .getElementById(nowCategorie.replace("-", " "))
            .classList.add("select");
        }
      }
    }
  },
  debounce: (fn, delay) => {
    var timer;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  },
  cardSwiper: () => {
    card_swiper = new Swiper(".card-swiper", {
      autoplay: true,
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  },
  homeSwiper: () => {
    home_swiper = new Swiper(".hone-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      mousewheel: true,
      autoplay: {
        disableOnInteraction: true,
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          //当屏幕宽度大于等于320
          direction: "horizontal",
        },
        600: {
          //当屏幕宽度大于等于600
          direction: "vertical",
        },
      },
    });
  },
  linkQuick: (e) => {
    var t = document.querySelector(".el-textarea__inner");
    ((t.value = "name：\nlink：\navatar：\ndescr：\nscreenshot："),
    t.setSelectionRange(5, 5)),
      t.focus();
  },
  // 检测 google Ads
  checkAdBlocker: () => {
    // v2 20231018
    if ($("body").width() < 768) {
      const phoneFlag =
        location.href == "https://fe32.top/" ||
        location.href.includes("/articles/");
      if (phoneFlag) {
        if ($(".ads-wrap > .adsbygoogle >div").length > 0) {
          console.log("no ad blockers");
          $(".modal-connection").hide();
        } else {
          console.log("Please disable ad blockers");
          $(".modal-connection").show();
        }
      } else {
        $(".modal-connection").hide();
      }
    } else {
      const whiteList = [
        "/about/",
        "/adsTips/",
        "/frdcenter/",
        "/demandWall/",
        "/tags/",
        "/categories/",
      ];
      const pcFlag = whiteList.find((v) => location.href.includes(v));
      if (!pcFlag) {
        if ($(".ads-wrap > .adsbygoogle >div").length > 0) {
          console.log("no ad blockers");
          $(".modal-connection").hide();
        } else {
          console.log("Please disable ad blockers");
          $(".modal-connection").show();
        }
      }
    }

    /* v1 20231011 此版本存在问题 先不删除 后续完善
    fetch('https://pagead2.googlesyndication.com/pagead/show_ads.js', {
        mode: 'no-cors'
    }).then(()=>{
        console.log('no ad blockers');
        $(".modal-connection").hide()
    })
    .catch(() => {
        console.log('Please disable ad blockers');
        whiteList.map(v=>{
            if(!location.href.includes(v)){
                $(".modal-connection").show()
            }
        })
    }) */
  },
  // 每 3s 检测 google Ads
  checkAdsTimes: () => {
    var timer = null;
    timer = setInterval(() => {
      _tzy.checkAdBlocker();
      //   console.log($(".ads-wrap > .adsbygoogle >div").length);
      if ($(".ads-wrap > .adsbygoogle >div").length > 0 && timer) {
        clearInterval(timer);
      }
    }, 3000);
  },
  // pjax加载完成（切换页面）后需要执行的函数和代码
  initAgain: () => {
    if (location.href == "https://fe32.top/") {
      _tzy.cardSwiper();
      _tzy.homeSwiper();
      _tzy.checkAdsTimes();
    }
  },
};

_tzy.flinkOnError();
_tzy.link_to();
_tzy.tagPageActive();
_tzy.cardSwiper();
_tzy.homeSwiper();
_tzy.checkAdsTimes();

document.addEventListener("pjax:complete", _tzy.initAgain);

/* window.addEventListener('resize', () => {
    _tzy.debounce(() => {
        console.log(111111);
        home_swiper.destroy(true, true);
        _tzy.homeSwiper()
        // home_swiper.update()
    }, 500)
}) */

// Aplayer默认关闭歌词
function removelrc() {
  // 检测是否存在歌词按钮
  const lrcIcon = document.querySelector(".aplayer-icon-lrc");
  if (!lrcIcon) {
    return;
  }

  // 触发以后立刻移除监听
  observer.disconnect();

  // 稍作延时保证触发函数时存在按钮
  setTimeout(() => {
    // 以触发按钮的方式隐藏歌词，防止在点击显示歌词按钮时需要点击两次才能出现的问题
    lrcIcon.click();
  }, 1);

  console.log("success");
}

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      removelrc();
    }
  }
});

const observerConfig = {
  childList: true, // 观察子节点的变化
  subtree: true, // 观察所有后代节点的变化
};

observer.observe(document, observerConfig); // 开始观察document节点的变化
