(function ($) {
  $(document).ready(function () {
    // Clear elementor elements
    $(
      ".page-section__hero, .page-section__contact, .page-section__team, .page-section__news, .page-section__parallax, .page-section__small-cases, .page-section__cases",
    ).each(function () {
      if ($("body").hasClass("elementor-editor-active")) {
        return;
      }

      while (!$(this).children().hasClass("dd-containe")) {
        const innerChild = $(this).children().children();
        $(this).html(innerChild);
      }
    });

    // Case pages
    if ($(".main-content").hasClass("case-page-content")) {
      const headers = $("h2");
      let menu = "";

      headers.each(function (index) {
        const parent = $(this).closest("section");
        const title = $(this).text();
        $(this).attr("id", `fm-${index}`);

        const inners = parent.find("h3");
        let innerMenu = "";
        inners.each(function (iindex) {
          const innerTitle = $(this).text();
          $(this).attr("id", `fm-inner-${index}-${iindex}`);
          innerMenu += `
          <li class="floating-sidebar__menu-inner-item">
            <a class="floating-sidebar__menu-inner-item-link" href="#fm-inner-${index}-${iindex}">
              ${innerTitle}
            </a>
          </li>
          `;
        });

        if ($(".floating-sidebar").length) {
          menu += `
            <li class="floating-sidebar__menu-item">
              <a class="floating-sidebar__menu-item-link" href="#fm-${index}">
                ${title}
              </a>
              <ul class="floating-sidebar__menu-inner">
                ${innerMenu}
              </ul>
            </li>
          `;
        }
      });
      $(".floating-sidebar__menu").append(menu);

      $("section").each(function () {
        if ($(this).hasClass("top-content")) {
          let section = $(this);
          let parent = $(this).parent().parent().parent();

          let newParent = parent.clone().html("");
          $(section).detach().appendTo(newParent);
          newParent.appendTo(".top-content__container");
        }

        if ($(this).hasClass("bottom-content")) {
          let section = $(this);
          let parent = $(this).parent().parent().parent();

          let newParent = parent.clone().html("");
          $(section).detach().appendTo(newParent);
          newParent.appendTo(".bottom-content__container");
        }
      });
    }

    $(document).on("click", ".floating-sidebar__menu a", function (e) {
      e.preventDefault();
      const id = $(this).attr("href");
      const target = $(`section ${id}`);
      let y = target.offset().top - 120;
      $("html, body").animate({ scrollTop: y }, 800);
    });

    $(".page-section__hero-content").attr("data-aos", "fade-right");
    $(".case-card__content").attr("data-aos", "fade-right");
    $(".case-card__content").attr("data-aos-duration", "1000");
    $(".small-case-card").attr("data-aos", "fade-up");
    $(".small-case-card").attr("data-aos-duration", "1000");
    $(".page-section__parallax-title").attr("data-aos", "fade-up");
    $(".page-section__parallax-title").attr("data-aos-duration", "1000");
    $(".page-section__parallax-content").attr("data-aos", "fade-up");
    $(".page-section__parallax-content").attr("data-aos-duration", "1000");
    $(".page-section__parallax-button").attr("data-aos", "fade-up");
    $(".page-section__parallax-button").attr("data-aos-duration", "1000");
    $(".news-card").attr("data-aos", "fade-up");
    $(".news-card").attr("data-aos-duration", "1000");
    $(".page-section__news-header").attr("data-aos", "fade-up");
    $(".page-section__news-header").attr("data-aos-duration", "1000");
    $(".page-section__team-text").attr("data-aos", "fade-up");
    $(".page-section__team-text").attr("data-aos-duration", "1000");
    $(".page-section__team-title").attr("data-aos", "fade-up");
    $(".page-section__team-title").attr("data-aos-duration", "1000");
    $(".page-section__cases-title").attr("data-aos", "fade-up");
    $(".page-section__cases-title").attr("data-aos-duration", "1000");

    // Init AOS (animate on scroll)
    AOS.init({
      once: true,
    });

    /* Parallax rotating card */
    // mouse moves over element
    $(".case-card").on("mousemove", function (e) {
      // e = Mouse click event.
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left; //x position within the element.
      const y = e.clientY - rect.top; //y position within the element.
      const w = $(this).outerWidth();
      const h = $(this).outerHeight();

      if (w <= 690) {
        return;
      }

      const xPercent = Math.floor((x / w) * 100) + 1; // add + 1 to read of 0 and get to 100
      const yPercent = Math.floor((y / h) * 100) + 1; // add + 1 to read of 0 and get to 100

      // Centric ratio
      const xRatio = xPercent <= 50 ? xPercent / 100 : (100 - xPercent) / 100;
      const yRatio = yPercent <= 50 ? yPercent / 100 : (100 - yPercent) / 100;

      const xValue =
        xPercent <= 50 ? ((1 - xRatio) / 5) * -1 : (1 - xRatio) / 5;
      const yValue =
        yPercent >= 50 ? ((1 - yRatio) / 5) * -1 : (1 - yRatio) / 5;

      // Transform rotate rotates axes not in a way you may think at first so xValue goes to Y and vice versa
      $(this).css(
        "transform",
        "rotateY(" + xValue + "deg) rotateX(" + yValue + "deg)",
      );
    });
    // mouse leaves element
    $(".case-card").on("mouseleave", function () {
      $(this).css("transform", "");
    });

    // Popups
    $(".dd-popup__close-btn").on("click", function () {
      closePopup();
    });
    // Close on overlay click
    $(".dd-popup-wrap").on("click", function () {
      closePopup();
    });
    // Prevent overlay close on overlay content click
    $(".dd-popup").on("click", function (e) {
      e.stopPropagation();
    });
    $(".dd-popup__footer").on("click", function (e) {
      e.stopPropagation();
    });

    function closePopup() {
      $("body").removeClass("overflow-hidden");
      // $(".dd-popup-wrap").addClass("d-none");
      $(".dd-popup-wrap").fadeOut(300);
      $(".youtube-video-place").html("");
    }

    // Contact popup
    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      closePopup();

      $("body").addClass("overflow-hidden");
      // $("#contactPopup").removeClass("d-none");
      $("#contactPopup").fadeIn(300);
    });

    // Video popup
    $(".open-video-popup").on("click", function (e) {
      e.preventDefault();
      closePopup();

      const videoUrl = $(this).attr("href");

      if (!videoUrl || videoUrl === "#") {
        return;
      }

      $("body").addClass("overflow-hidden");
      // $("#videoPopup").removeClass("d-none");
      $("#videoPopup").fadeIn(300);

      $(".youtube-video-place").html(
        '<iframe allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="embed-responsive-item" src="' +
          videoUrl +
          '" ></iframe>',
      );
    });

    // Contact form submit
    $(".contact-form").on("submit", function (e) {
      e.preventDefault();
      const url = $(this).attr("action");
      const method = $(this).attr("method");
      const serialized = $(this).serialize();

      let redirectUrl = $(this).data("redirect");

      if ($("body").hasClass("translatepress-en_US")) {
        let redirectUrlObj = new URL(redirectUrl);
        if (redirectUrlObj.hostname === window.location.hostname) {
          redirectUrl = redirectUrlObj.origin + "/en" + redirectUrlObj.pathname;
        }
      }

      const self = $(this);
      $.ajax({
        url,
        type: method,
        data: {
          action: "contactForm",
          serialized,
        },
        success: function (data) {
          self.find('input[type="text"] , input[type="tel"]').val("");
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        },
        error: function (data) {
          alert("Ошибка, повторите позднее");
          console.error(data);
        },
      });
    });

    // Simple phone input mask
    // $(".phone-input-mask").on("keypress paste", function (evt) {
    //   // ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
    //   var theEvent = evt || window.event;

    //   var key = null;
    //   // Handle paste
    //   if (theEvent.type === "paste") {
    //     key = event.clipboardData.getData("text/plain");
    //   } else {
    //     // Handle key press
    //     key = theEvent.keyCode || theEvent.which;
    //     key = String.fromCharCode(key);
    //   }
    //   var regex = /([0-9()+-])/;
    //   if (!regex.test(key)) {
    //     theEvent.returnValue = false;
    //     if (theEvent.preventDefault) theEvent.preventDefault();
    //   }
    // });

    $(".phone-input-mask").each(function () {
      $(this).mask("+7 (999) 999-9999");
    });

    var smallCasesSwiper = new Swiper(".small-cases-swiper", {
      // allowTouchMove: false,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: -20,
        },
        // when window width is >= 640px
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    let outerInView = [];
    let innerLastInView = null;
    $(document).on("scroll", function () {
      if ($(".main-header").length) {
        floatingHeaderUpdate();
      }

      if ($(".page-section__parallax").length) {
        if ($(".page-section__parallax").isInViewport(true)) {
          parallaxUpdate();
        }
      }

      $(".parallax-object").each(function () {
        if ($(this).isInViewport()) {
          parallaxObjectUpdate($(this));
        }
      });

      $(".section-title__floating-bg-wrap").each(function (index) {
        if ($(this).isInViewport()) {
          floatingBgUpdate($(this), index);
        }
      });

      $("h2.section-title").each(function () {
        const parentSection = $(this).closest("section");

        if (parentSection.isInViewport()) {
          outerInView.push($(this).attr("id"));

          checkSidebar($(this));
        } else {
          outerInView = outerInView.filter(
            (item) => item === $(this).attr("id"),
          );
        }

        const innerLinks = parentSection.find("h3");

        innerLinks.each(function () {
          if ($(this).isInViewport()) {
            // const checkIfExist = innerLinksInView.find(
            //   (inner) => inner.attr("id") === $(this).attr("id"),
            // );
            // if (!checkIfExist) {
            innerLastInView = $(this).attr("id");
            // }
          }
          // else {
          //   innerLinksInView = innerLinksInView.filter(
          //     (inner) => inner.attr("id") !== $(this).attr("id"),
          //   );
          // }
          checkSidebarInners();
        });
      });
    });

    function checkSidebar(item) {
      const id = outerInView[0] || null;

      const links = $(".floating-sidebar__menu-item-link");
      links.each(function () {
        if ($(this).attr("href") === `#${id}`) {
          $(this)
            .parent()
            .find(".floating-sidebar__menu-inner")
            .addClass("active");
        } else {
          $(this)
            .parent()
            .find(".floating-sidebar__menu-inner")
            .removeClass("active");
        }
      });
    }
    function checkSidebarInners() {
      const links = $(".floating-sidebar__menu-inner-item-link");
      links.each(function () {
        if ($(this).attr("href") === `#${innerLastInView}`) {
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });
    }

    $(".section-title__floating-bg-wrap").each(function (index) {
      if ($(this).isInViewport()) {
        floatingBgUpdate($(this), index);
      }
    });
    function floatingBgUpdate(item, index) {
      let elementTop = $(item).offset().top;
      let viewportBottom = viewportTop + $(window).height();

      const elementBottom = elementTop + $(item).outerHeight();
      const viewportTop = $(window).scrollTop();

      const percent = Math.floor((viewportTop / elementBottom) * 100) + 1; // add + 1 to read of 0 and get to 100

      $(item).css("transform", `translateX(${-percent}%)`);
    }

    floatingHeaderUpdate();
    function floatingHeaderUpdate() {
      let viewportTop = $(window).scrollTop();

      if (viewportTop > 600) {
        $(".main-header").addClass("floating-header active");
      } else {
        $(".main-header").removeClass("floating-header active");
      }
    }

    // Parallax section on home page function
    parallaxUpdate();
    function parallaxUpdate() {
      let position = $(document).scrollTop();
      let base = 5;
      let offset = Math.floor(100 - (base + position / 18 - 100));
      $(".parallax-element").css("transform", `translateY(${offset}%)`);
    }

    // Single parallax object function
    $(".parallax-object").each(function () {
      if ($(this).isInViewport()) {
        parallaxObjectUpdate($(this));
      }
    });
    function parallaxObjectUpdate($el) {
      let eposition = $el.offset().top;
      let sposition = $(document).scrollTop();
      let wheight = $(window).height();

      let slowMultiplier = 4;
      let offset = 5;
      let p =
        Math.floor(((eposition - sposition) / wheight) * 100) / slowMultiplier -
        offset;
      $el.css("transform", `translateY(${p}%)`);
    }
  });

  $.fn.isInViewport = function (sFix = false) {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    // don't remember what was the problem, but this one fixed it, sFix implemented only for this reason
    if (elementTop === 0 && sFix) {
      return false;
    }

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
})(jQuery);
