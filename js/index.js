(function ($) {
  window.onload = function () {
    $(document).ready(function () {
      showSearch();
      menuMb();
      roadmap();
      stickyMenu();
      hoverChart();
      hideSuccessForm();
      changeActive();
      $(".menu-mb").css("display", "block");
    });
  };
})(jQuery);

AOS.init();
new WOW().init();
function showSearch() {
  $(".search-icon").click(function () {
    $(".search-form").addClass("show");
    $(".overlay").addClass("overlay-active");
  });
  $(".overlay").click(function () {
    $(".search-form").removeClass("show");
    $(".overlay").removeClass("overlay-active");
  });
}

function menuMb() {
  $(".header__bar").click(function () {
    $(".menu-mb").addClass("show");
    $(".overlay").addClass("overlay-active");
  });

  $(".overlay").click(function () {
    $(".menu-mb").removeClass("show");
    $(".overlay").removeClass("overlay-active");
  });

  $(".menu-mb ul li a").click(function () {
    $(".overlay").trigger("click");
  });
}

$(function () {
  var $meters = $(".bar-process");
  var $section = $(".bar-token");
  var $queue = $({});

  function loadDaBars() {
    $meters.each(function () {
      var $el = $(this);
      var origWidth = $el.width();
      $el.width(0);
      $queue.queue(function (next) {
        $el.animate({ width: origWidth }, 2000, next);
      });
    });
  }

  $(document).bind("scroll", function (ev) {
    var scrollOffset = $(document).scrollTop();
    var containerOffset = $section.offset().top - window.innerHeight;
    if (scrollOffset > containerOffset) {
      loadDaBars();
      // unbind event not to load scrolsl again
      $(document).unbind("scroll");
    }
  });
});

$(function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

function roadmap() {
  $(".home-roadmap__item").mouseenter(function () {
    $(this).parent().prevAll().addClass("active");
    $(this).parent().addClass("current-active").addClass("active");
  });
  $(".home-roadmap__item").mouseleave(function () {
    $(".home-roadmap__timeline .carousel-cell")
      .removeClass("active")
      .removeClass("current-active");
  });

  // Resize FLickity

  var h = 0;
  var k = 0;
  $(".home-roadmap .carousel-cell:nth-child(odd) .home-roadmap__item-top").each(
    function () {
      if ($(this).outerHeight() > h) {
        h = $(this).outerHeight();
      }
    }
  );
  $(
    ".home-roadmap .carousel-cell:nth-child(even) .home-roadmap__item-top"
  ).each(function () {
    if ($(this).outerHeight() > k) {
      k = $(this).outerHeight();
    }
  });

  if ($(window).width() > 768) {
    var roadmapTopName = setHeight("rm", ".home-roadmap__item");
  }
  if ($(".home-roadmap__item").height() > 350 && $(window).width() >= 1024) {
    $(".home-roadmap-inner").addClass("123");
    if (k > h) {
      $(".home-roadmap-inner").css("margin-top", h - k);
    } else {
      $(".home-roadmap-inner").css("margin-top", k - h);
    }
  }
}

var setHeight = function setSameHeight(h, cl) {
  var h = 0;
  jQuery(cl)
    .each(function () {
      if (jQuery(this).outerHeight() > h) {
        h = jQuery(this).outerHeight();
      }
    })
    .css({
      height: h,
    });
};

var sameHeight = setHeight("av", ".list-leader .staff-name");
function stickyMenu() {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 0) {
      $(".header__wrapper").addClass("sticky");
    } else {
      $(".header__wrapper").removeClass("sticky");
    }
  });
}

function hoverChart() {
  $(".chart-img-center").mouseover(function () {
    $(".chart-img").addClass("moving");
  });
  $(".chart-img-center").mouseout(function () {
    $(".chart-img").removeClass("moving");
  });
}

function SubForm() {
  $.ajax({
    url: "https://api.apispreadsheets.com/data/20379/",
    type: "post",
    data: $("#form-email").serializeArray(),
    success: function () {
      $(".box-success").addClass("show");
      $(".overlay").addClass("overlay-active");
      $("body").addClass("hidden");
    },
    error: function () {
      alert("There was an error :(");
    },
  });
}

function hideSuccessForm() {
  $(".close-success").click(function () {
    $(".box-success").removeClass("show");
    $(".overlay").removeClass("overlay-active");
    $("body").removeClass("hidden");
  });
  $(".overlay").click(function () {
    $(".box-success").removeClass("show");
    $(".overlay").removeClass("overlay-active");
    $("body").removeClass("hidden");
  });
}

function changeActive() {
  $(".header__wrapper .header-right__nav ul li a").click(function () {
    $(".header__wrapper .header-right__nav ul li a").removeClass("active");
    $(this).addClass("active");
  });
}
