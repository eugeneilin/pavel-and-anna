// 'active' class switching
$(document).ready(function () {

  const scrollLink = $('.scroll');

  $(window).scroll(function () {
    let scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function () {

      let sectionOffset = $(this.hash).offset().top - 40;

      if (sectionOffset <= scrollbarLocation) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      }
    });

  });

  $(window).scroll(function () {

    if ($(this).scrollTop() < 300) {
      $('.navigation-link').removeClass('active');
    }
  });
});
