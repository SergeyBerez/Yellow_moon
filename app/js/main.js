var butnUp = document.querySelector('.butnUp-js');
var menu = document.querySelector('.header');
document.addEventListener('scroll', function(e) {
  if (window.pageYOffset > 200) {
    butnUp.style.opacity = '1';
  } else if (window.pageYOffset < 200) {
    butnUp.style.opacity = '0';
  }
});
// добавляю желтую рамку при наведении на элемент и наборот если забрать наведение на элемент рамку получае home

var ArrLi = document.querySelectorAll('li');
for (var i = 0; i < ArrLi.length; i++) {
  ArrLi[i].addEventListener('mouseover', function(e) {
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

  var attr = $(this).attr('href');
  var h = $(attr).offset().top;

  $('html,body').animate({ scrollTop: h }, 1000);
});

$('.butnUp-js').on('click', function() {
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

// отправка формы

var form = document.querySelector('.form');
var overlay = document.querySelector('.overlay');
var modal = document.querySelector('.features_title3');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var obj = {
    Name: document.querySelector('[name="name"]').value,
    subject: document.querySelector('[ name="subject]').value,
    email: document.querySelector('[name="email"]').value,
  };

  axios
    .post('https://my-json-server.typicode.com/SergeyBerez/server/myPost', {
      obj,
    })
    .then(function(response) {
      var { data } = response;
      console.log(data);
      overlay.classList.add('show');
      modal.classList.add('show');
      modal.textContent = `${data.obj.name} ваша заявка принята`;
      return data;
    })
    .then(data => {
      //inputs[3].textContent = `${data.obj.name} ваша заявка принята`;
    })
    .catch(error => {
      console.log(`ошибка ${error}`);
    });
});

document.addEventListener('click', function(e) {
  console.log(e.target);
  if (e.target.className == 'overlay show') {
    overlay.classList.remove('show');
    modal.classList.remove('show');
  }
});
