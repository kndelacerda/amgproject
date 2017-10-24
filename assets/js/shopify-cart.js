var client = null;
var cart;
var cartLineItemCount;

$(document).ready(function() {

    $('.cart .scrollbar-inner').scrollbar();

    $(this).on("click", "#cart-bug a", function(event) {

        $('.cart').addClass('js-active');
        event.stopPropagation();

    });
    $(this).on("click", ".cart", function(event) {

        event.stopPropagation();

    });

    /* Build new ShopifyBuy client
   ============================================================ */
    client = ShopifyBuy.buildClient({
        accessToken: '573cf065467d0b23e270a8d67a8d8148',
        domain: 'sentai.myshopify.com',
        appId: 6
    });

    if (localStorage.getItem('lastCartId')) {
        client.fetchCart(localStorage.getItem('lastCartId')).then(function(remoteCart) {
            cart = remoteCart;
            cartLineItemCount = cart.lineItems.length;
            renderCartItems();
            if (cartLineItemCount > 0) {
                $("#cart-bug .badge").text(cart.lineItemCount);
                $("#cart-bug").show();
                $("#shopSection").show();
            }
        });
    } else {
        client.createCart().then(function(newCart) {
            cart = newCart;
            localStorage.setItem('lastCartId', cart.id);
            cartLineItemCount = 0;
        });
    }

    bindEventListeners();
    $('#goToStore').click(function() {
        window.open(cart.checkoutUrl, '_blank');
    });
});

/* Render the line items currently in the cart
============================================================ */
function renderCartItems() {
    var $cartItemContainer = $('.cart-item-container');
    $cartItemContainer.empty();
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $cartLineItems = cart.lineItems.map(function(lineItem, index) {
        return renderCartItem(lineItem);
    });
    $cartItemContainer.append($cartLineItems);

    setTimeout(function() {
        $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
    }, 0)
    updateTotalCartPricing();
}

/* Return required markup for single item rendering
            ============================================================ */
function renderCartItem(lineItem) {
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $lineItemTemplate = $(lineItemEmptyTemplate);
    var itemImage = lineItem.image.src;
    $lineItemTemplate.attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.addClass('js-hidden');
    $lineItemTemplate.find('.cart-img').attr('src', itemImage);
    $lineItemTemplate.find('.cart-item__title').text(lineItem.title);
    $lineItemTemplate.find('.cart-item__variant-title').text(lineItem.variant_title);
    $lineItemTemplate.find('.cart-item__price').text(formatAsMoney(lineItem.line_price));
    $lineItemTemplate.find('.cart-item__quantity').attr('value', lineItem.quantity);
    $lineItemTemplate.find('.quantity-decrement').attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.find('.quantity-increment').attr('data-variant-id', lineItem.variant_id);

    return $lineItemTemplate;
}


/* Update Total Cart Pricing
============================================================ */
function updateTotalCartPricing() {
    $('.cart .pricing').text(formatAsMoney(cart.subtotal));
    $("#cart-bug .badge").text(cart.lineItemCount);
}

/* Format amount as currency
============================================================ */
function formatAsMoney(amount, currency, thousandSeparator, decimalSeparator, localeDecimalSeparator) {
    currency = currency || '$';
    thousandSeparator = thousandSeparator || ',';
    decimalSeparator = decimalSeparator || '.';
    localeDecimalSeparator = localeDecimalSeparator || '.';
    var regex = new RegExp('(\\d)(?=(\\d{3})+\\.)', 'g');

    return currency + parseFloat(amount, 10).toFixed(2)
        .replace(localeDecimalSeparator, decimalSeparator)
        .replace(regex, '$1' + thousandSeparator)
        .toString();
}

/* Find Cart Line Item By Variant Id
   ============================================================ */
function findCartItemByVariantId(variantId) {
    return cart.lineItems.filter(function(item) {
        return (item.variant_id === variantId);
    })[0];
}

/* Determine action for variant adding/updating/removing
    ============================================================ */
function addOrUpdateVariant(variant, quantity) {
    openCart();
    var cartLineItem = findCartItemByVariantId(variant.id);

    if (cartLineItem) {
        updateVariantInCart(cartLineItem, quantity);
    } else {
        addVariantToCart(variant, quantity);
    }

    updateCartTabButton();
    $('.cart-item__quantity').attr('id', variant.id);
}

/* Set previously focused item for escape handler
        ============================================================ */
function setPreviousFocusItem(item) {
    previousFocusItem = item;
}
/* Add 'quantity' amount of product 'variant' to cart
   ============================================================ */
function addVariantToCart(variant, quantity) {
    openCart();

    cart.createLineItemsFromVariants({ variant: variant, quantity: quantity }).then(function() {
        var cartItem = cart.lineItems.filter(function(item) {
            return (item.variant_id === variant.id);
        })[0];
        var $cartItem = renderCartItem(cartItem);
        var $cartItemContainer = $('.cart-item-container');
        $cartItemContainer.append($cartItem);
        setTimeout(function() {
            $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
        }, 0)

    }).catch(function(errors) {
        console.log('Fail');
        console.error(errors);
        console.log(cart);
    });

    updateTotalCartPricing();
    updateCartTabButton();
    $("#cart-bug").show();
}

/* Update cart tab button
    ============================================================ */
function updateCartTabButton() {
    if (cart.lineItems.length > 0) {
        $('.btn--cart-tab .btn__counter').html(cart.lineItemCount);
        $('.btn--cart-tab').addClass('js-active');
    } else {
        $('.btn--cart-tab').removeClass('js-active');
        $('.cart').removeClass('js-active');
    }
}

/* Update details for item already in cart. Remove if necessary
    ============================================================ */
function updateVariantInCart(cartLineItem, quantity) {
    var variantId = cartLineItem.variant_id;
    var cartLength = cart.lineItems.length;
    cart.updateLineItem(cartLineItem.id, quantity).then(function(updatedCart) {
        var $cartItem = $('.cart').find('.cart-item[data-variant-id="' + variantId + '"]');

        if (updatedCart.lineItems.length >= cartLength) {
            $cartItem.find('.cart-item__quantity').val(cartLineItem.quantity);
            $cartItem.find('.cart-item__price').text(formatAsMoney(cartLineItem.line_price));
        } else {
            $cartItem.find('.cart-item__quantity').val(0);
            $cartItem.slideUp("fast", function() {

                $cartItem.remove();
                updateCartTabButton();

                if (updatedCart.lineItems.length < 1) {
                    closeCart();
                    $("#cart-bug").hide();
                }
            });
        }

        updateTotalCartPricing();

    }).catch(function(errors) {
        console.log('Fail');
        console.error(errors);
    });
}



function closeCart() {
    $('.cart').removeClass('js-active');
}

function openCart() {
    $('.cart').addClass('js-active');
}
/* Debounce taken from _.js
            ============================================================ */
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}
/* Update product variant quantity in cart through input field
     ============================================================ */
function fieldQuantityHandler(evt) {
    var variantId = parseInt($(this).closest('.cart-item').attr('data-variant-id'), 10);
    var variant = product.variants.filter(function(variant) {
        return (variant.id === variantId);
    })[0];
    var cartLineItem = findCartItemByVariantId(variant.id);
    var quantity = evt.target.value;
    if (cartLineItem) {
        updateVariantInCart(cartLineItem, quantity);
    }
}

/* Update product variant quantity in cart
       ============================================================ */
function updateQuantity(fn, variantId) {
    //return;
    /*var variant = product.variants.filter(function (variant) {
        return (variant.id === variantId);
    })[0];*/
    var quantity;
    var cartLineItem = findCartItemByVariantId(variantId);
    if (cartLineItem) {
        quantity = fn(cartLineItem.quantity);
        updateVariantInCart(cartLineItem, quantity);
    }

}

/* Decrease quantity amount by 1
      ============================================================ */
function decrementQuantity(variantId) {
    updateQuantity(function(quantity) {
        return quantity - 1;
    }, variantId);
}

/* Increase quantity amount by 1
============================================================ */
function incrementQuantity(variantId) {
    updateQuantity(function(quantity) {
        return quantity + 1;
    }, variantId);
}

/* increment quantity click listener */
$('.cart').on('click', '.quantity-increment', function() {

    var variantId = $(this).data('variant-id');
    incrementQuantity(variantId);
});

/* decrement quantity click listener */
$('.cart').on('click', '.quantity-decrement', function() {

    var variantId = $(this).data('variant-id');
    decrementQuantity(variantId);
});
/* Bind Event Listeners
   ============================================================ */
function bindEventListeners() {
    /* cart close button listener */
    $('.cart .btn--close').on('click', closeCart);

    /* click away listener to close cart */
    $(document).on('click', function(evt) {
        if ((!$(evt.target).closest('.cart').length) && (!$(evt.target).closest('.js-prevent-cart-listener').length)) {
            closeCart();
        }
    });

    /* escape key handler */
    var ESCAPE_KEYCODE = 27;
    $(document).on('keydown', function(evt) {
        if (evt.which === ESCAPE_KEYCODE) {
            if (previousFocusItem) {
                $(previousFocusItem).focus();
                previousFocusItem = ''
            }
            closeCart();
        }
    });

    function checkoutNow() {

        $('#cartModal').modal("show");
    }

    /* checkout button click listener */
    $('.btn--cart-checkout').on('click', function() {
        console.log("Click")
        checkoutNow();
    });

    /* cart tab click listener */
    $('.btn--cart-tab').click(function() {
        setPreviousFocusItem(this);
        openCart();
    });

    $('#clearAll').click(function() {
        cart.clearLineItems().then(cart => {
            renderCartItems();
            closeCart();
        });
    });
}