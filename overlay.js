/*
TODO: DEBUG $(window)on(scroll), $(window)off(scroll). Currently, the popup is not triggered again after the window is closed.

TODO: CHECK BROWSER COMPATIBILITY FOR DESKTOP/MOBILE (tested in Chrome) 
*/

// store cart data in variables
let imgs = [];
let numberOfItems;
let cartTotal;

// load data from cart
(function loadCartData() {
  $.ajax('/cart', {
    type: 'GET',
    dataType: "html",
    success: function (resp) {
      html = $.parseHTML(resp);
      $(html).find('.item-list .item-image').find('img').each(function () {
        imgs.push($(this).prop('src'));
      });
      cartTotal = $(html).find('.order-total .order-value').html();
      numberOfItems = $(html).find('.total-items').html();
    }
  });
})();

// activate script when user scrolls to bottom 10% of page
$(function () {
  $(window).on('scroll', function () {
    let window_scrolled = ($(document).height() / 100) * 90;
    if ($(window).scrollTop() + $(window).height() >= window_scrolled) {
      appendOverlay();
      buildModal();
      addGreeting();
      addImgWrapper();
      appendImage();
      addCartTotalWrapper();
      addCartTotal();
      addBtnWrapper();
      addCartButton();
      addCloseButton();
      $(window).off('scroll');
    }
  });
});

// append semi-transparent overlay
function appendOverlay() {
  const overlay = $("<div></div>")
    .addClass('overlay')
    .height($(document).height())
    .css({
      'display': 'flex',
      'background': 'rgba(0, 0, 0, 0.8)',
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'height': '100%',
      'width': '100%',
      'z-index': 5000
    });
  return $("body").append(overlay);
}

// build container for popup 
function buildModal() {
  const modal = $(`<div></div>`)
    .addClass('overlay-text')
    .css({
      'display': 'flex',
      'min-height': '300px',
      'min-width': '400px',
      'flex-direction': 'column',
      'position': 'absolute',
      'top': '30%',
      'left': '50%',
      'color': '#000',
      'border-radius': '3px',
      'transform': 'translate(-50%,-50%)',
      '-ms-transform': 'translate(-50%,-50%)',
      'background': 'rgba(255, 255, 255, 1)',
      'padding': '10px',
      'z-index': 6000
    });
  return $(".overlay").append(modal);
}

// display greeting with number of items in cart
function addGreeting() {
  const greetingText = $(`<p>You have ${imgs.length} items in your cart.</p>`)
    .addClass('greeting-text')
    .css({
      'margin': 'auto',
      'padding': '10px',
      'font-family': 'ars_maquette_probold, sans-serif',
      'font-size': '18px',
      'font-weight': 'bold',
      'color': '#000',
    });
  $('.overlay-text').append(greetingText);
}

// wrapper for buttons
function addBtnWrapper() {
  const btnWrapper = $(`<div></div>`)
    .addClass('btn-wrapper')
    .css({
      'display': 'flex',
      'margin': 'auto',
      'width': '400px',
      'justify-content': 'space-evenly',
    });
  $('.overlay-text').append(btnWrapper);
}

// button to close overlay. uses marmot stylesheet .primary-button css
function addCloseButton() {
  const buttonClose = $(`<button>Close</button>`)
    .addClass('primary-button')
    .click(() => closeOverlay())
    .css({
      'width': '140px',
    });
  return $('.btn-wrapper').append(buttonClose);
}
// function triggered when user clicks close button
function closeOverlay() {
  $('.overlay').fadeOut(300);
}
// button to cart. uses marmot stylesheet .primary-button css.
function addCartButton() {
  const buttonCart = $(`<button>View Cart</button>`)
    .addClass('primary-button')
    .click(() => window.location = 'https://www.marmot.com/cart')
    .css({
      'width': '140px',
    });
  return $('.btn-wrapper').append(buttonCart);
}

// wrapper for images
function addImgWrapper() {
  const imgWrapper = $(`<div></div>`)
    .addClass('img-wrapper')
    .css({
      'display': 'flex',
      'justify-content': 'space-evenly'
    });
  $('.overlay-text').append(imgWrapper);
}

// render thumbnail images from cart dynamically. 
// TODO 1: SET DEFAULT IMAGE IF BROKEN LINK OR IMG MISSING. 
// TODO 2: ADD MEDIA QUERY FOR CARTS WITH > 3 ITEMS. flex-direction: column? CSS GRID?
function appendImage() {
  $.map(imgs, (img) => {
    $('.img-wrapper').append(`<img src="${img}">`);
  });
}

// wrapper for cart total
function addCartTotalWrapper() {
  const cartTotalWrapper = $(`<div></div>`)
    .addClass('cart-total')
    .css({
      'display': 'flex',
      'margin': 'auto',
      'font-family': 'ars_maquette_probold, sans-serif',
      'font-size': '15px'
    });
  $('.overlay-text').append(cartTotalWrapper);
}

// cart total
function addCartTotal() {
  let total = $(`<p><strong>Total: ${cartTotal}</strong></p>`);
  return $(".cart-total").append(total);
}