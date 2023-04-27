const footer = document.getElementById("Date");
const year = new Date().getFullYear();
footer.innerHTML =
  year + '&copy; <a href="https://t.me/soko1enkov">Direct me</a>';

// days counter
const daysBox = document.getElementById("Days");
const hoursBox = document.getElementById("Hours");
const minutesBox = document.getElementById("Minutes");
const secondsBox = document.getElementById("Seconds");
const judgeDay = () => {
  let beginDate = new Date(2021, 0, 1).getTime();
  let nowDate = new Date().getTime();
  let days = Math.floor((nowDate - beginDate) / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    ((nowDate - beginDate) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor(
    ((nowDate - beginDate) % (1000 * 60 * 60)) / (1000 * 60)
  );
  let seconds = Math.floor(((nowDate - beginDate) % (1000 * 60)) / 1000);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  daysBox.innerText = days;
  hoursBox.innerText = hours;
  minutesBox.innerText = minutes;
  secondsBox.innerText = seconds;
};
setInterval(judgeDay, 1000);

$(function () {
  "use strict";

  var width = $(window).width();
  var height = $(window).height();

  /***
   **** Preloader
   ***/
  $(window).on("load", function () {
    $(".preloader .spinner").fadeOut(function () {
      $(".preloader").fadeOut();
      $("body").addClass("ready");
    });
  });

  /***
   **** Portfolio Filter
   ***/
  $(".filter").on("click", "a", function () {
    var filter = $(this).attr("data-filter");

    $(".work-item").hide();
    $(filter).fadeIn();

    return false;
  });

  /***
   **** Initialize collapse button
   ***/
  $(".menu-btn").sideNav();
  if (width < 1141) {
    $(".side-nav").css({ transform: "translateX(-100%)" });
  }

  /***
   **** SideNav Menu Scroll
   ***/
  if ($("#home-section").length) {
    $(window).on("scroll", function () {
      var scrollPos = $(window).scrollTop();
      $(".side-nav li > a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.offset().top - 30 <= scrollPos) {
          $(".side-nav li").removeClass("active");
          currLink.closest("li").addClass("active");
        }
      });
    });
  }

  $(".scrollspy").scrollSpy({
    scrollOffset: 0,
  });

  /***
   **** Validate contact form
   ***/
  $("#cform").validate({
    rules: {
      name: {
        required: true,
      },
      message: {
        required: true,
      },
      subject: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    highlight: function (element) {
      $(element).addClass("invalid");
      $(element).removeClass("valid");
    },
    unhighlight: function (element) {
      $(element).removeClass("invalid");
      $(element).addClass("valid");
    },
    success: "valid",
    submitHandler: function () {
      $.ajax({
        url: "mailer/feedback.php",
        type: "post",
        dataType: "json",
        data:
          "name=" +
          $("#cform").find('input[name="name"]').val() +
          "&email=" +
          $("#cform").find('input[name="email"]').val() +
          "&subject=" +
          $("#cform").find('input[name="subject"]').val() +
          "&message=" +
          $("#cform").find('textarea[name="message"]').val(),
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
          $("#cform").fadeOut();
          $(".alert-success").delay(1000).fadeIn();
        },
      });
    },
  });

  /***
   **** Validate comments form
   ***/
  $("#blog-form").validate({
    rules: {
      name: {
        required: true,
      },
      message: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    highlight: function (element) {
      $(element).addClass("invalid");
      $(element).removeClass("valid");
    },
    unhighlight: function (element) {
      $(element).removeClass("invalid");
      $(element).addClass("valid");
    },
    success: "valid",
    submitHandler: function () {
      $("#blog-form").fadeOut();
      $(".alert-success").delay(1000).fadeIn();
    },
  });

  /***
   **** Portfolio magnific popup
   ***/
  $(".card.work-item .activator").magnificPopup({
    type: "inline",
    overflowY: "auto",
    closeBtnInside: true,
    mainClass: "mfp-fade",
  });

  /***
   **** Gallery
   ***/
  $(".post-lightbox").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });
});

/***
 **** Google Map Options
 ***/
function initMap() {
  var myLatlng = new google.maps.LatLng(40.773328, -73.960088); // <- Your latitude and longitude

  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeControl: false,
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "We are here!",
  });
}
if ($("#map").length) {
  google.maps.event.addDomListener(window, "load", initMap);
}
