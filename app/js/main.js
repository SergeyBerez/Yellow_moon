var butnUp = document.querySelector('.butnUp-js');
var menu = document.querySelector('.header');
document.addEventListener('scroll', function(e) {
  if (window.pageYOffset > 200) {
    console.log(menu);
    butnUp.style.opacity = '1';
  } else if (window.pageYOffset < 200) {
    butnUp.style.opacity = '0';
  }
});
// добавляю желтую рамку при наведении на элемент и наборот если забрать наведение на элемент рамку получае home

var ArrLi = document.querySelectorAll('li');
for (var i = 0; i < ArrLi.length; i++) {
  ArrLi[i].addEventListener('mouseover', function(e) {
    console.log(e.target);
    for (var i = 0; i < ArrLi.length; i++) {
      ArrLi[i].classList.remove('active-menu');
      ArrLi[i].addEventListener('mouseout', function(e) {
        ArrLi[0].classList.add('active-menu');
      });
    }
    
  });
}



var boxTitle = document.querySelector('.box-title-js');
var boxs = document.querySelectorAll('.portfolio-boxs');
var innerDiv = document.querySelector('.innner-div-js');

document.addEventListener('mousemove', function(e) {
  if (e.target.classList.contains('portfolio-boxs')) {
    e.target.insertAdjacentElement('afterbegin', innerDiv);
    innerDiv.style.display = 'block';
    document.querySelector('.del-active-js ').style.display = 'none';
    if (document.querySelector('.portfolio-boxs--active') != null) {
      document
        .querySelector('.portfolio-boxs--active')
        .classList.remove('portfolio-boxs--active');
    }
  } else if (e.target.classList.contains('d-flex-js')) {
    innerDiv.style.display = '';
  }
});
var i = 0;
document.addEventListener('click', function(e) {
  
  if (e.target.classList.contains('box-title-js')) {
    if (document.querySelector('.portfolio-boxs--active')) {
      document.querySelector('.del-active-js ').style.display = 'none';
      innerDiv.style.display = '';
      document
        .querySelector('.portfolio-boxs--active')
        .classList.remove('portfolio-boxs--active');
    } else {
      boxs[i].insertAdjacentElement('afterbegin', innerDiv);
      innerDiv.style.display = 'block';
      boxs[i].classList.add('portfolio-boxs--active');
    }
    i++;
    if (i >= boxs.length) {
      i = 0;
    }
  }
});

$('a').on('click', function(e) {
  e.preventDefault();
  // console.log($(this));
  var attr = $(this).attr('href');
  var h = $(attr).offset().top;
  console.log(h);
  $('html,body').animate({ scrollTop: h }, 1000);
});

$('.butnUp-js').on('click', function () {
  console.log(1111);
  $('html,body').animate({ scrollTop: 0 }, 1000);
});


$(function() {
  $('#slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  });
});
