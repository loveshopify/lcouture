/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
// Announcement Bar
var backButton = '<span class="slick-prev">&#8592;</span>';
var nextButton = '<span class="slick-next">&#8594;</span>';
var delay_time = parseInt($("[data-announcement-slider]").data("delay"));
$("[data-announcement-slider]").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: delay_time,
  prevArrow: backButton,
  nextArrow: nextButton
})

$(document).ready(function(){
  $(".announcementbar_item").show();
  if($("#section-header").offset().top > 38) {
    $("#section-header").addClass("scroll");
  }
  $(".image_overlay .Slideshow__Carousel video").fadeIn(200);
  var key = 38, direction = 100;
  $(window).scroll(function(){
    if(direction < $("#section-header").offset().top && $("#section-header").offset().top < 39) {
      $("#section-header").removeClass("scroll");
    }else if($("#section-header").offset().top > key) {
      if($("#section-header").attr("class").indexOf("scroll") == -1) {
        $("#section-header").addClass("scroll");
        key = 0;
      }
    }else {
      $("#section-header").removeClass("scroll");
    }
    if($("#section-header").offset().top > 38) key = 38;
    direction = $("#section-header").offset().top;
  })
  $('[data-collection-leaset-slider]').slick("next");
})

if(template == 'collection') {
  $(document).on("click", '.Popover__ValueList .Popover__Value', function(){
    $(".CollectionToolbar__Item span").text($(this).text());
  })
  $(document).on("click", ".collection-draw-header .filter-title", function(){
    $("#collection-filter-drawer").attr("aria-hidden", false);
    $(".PageOverlay").toggleClass("is-visible");
  })
  $(document).on("click", ".PageOverlay", function(){
    $(this).removeClass("is-visible");
    $("#collection-filter-drawer").attr("aria-hidden", true);
    $("#collection-sort-popover").attr("aria-hidden", true);
  })
  $(document).on("click", ".CollectionToolbar__Drawer--sort", function(){
    $("#collection-sort-popover").attr("aria-hidden", false);
    $(".PageOverlay").toggleClass("is-visible");
  })
}

if(template == 'product') {
 
// Product Size Chart JS
  $(document).on("click", ".open_sizeChart", function(event) {
    event.preventDefault();
    $(".chart-wrapper").attr("aria-hidden", false);
    $(".PageOverlay").toggleClass("is-visible");
  })
  $(document).on("click", ".sizeChart-header", function(){
      $(".sizeChart__title_group").slideToggle();
  })
  $(document).on("click", ".item__image .image", function(){
    var index = $(".product__media .item__image .image").index($(this)) + 1;
    var length = $(".product__media .item__image .image").length;
    $(".main__image").html("");
    $(".main__image").html("<div class='image'>" + $(".product__media .item__image").children(".image").eq(index-1).html() + '</div>');
    if(index == length) $(".main__image").append("<div class='image'>" + $(".product__media .item__image").children(".image").eq(0).html() + '</div>');
    else $(".main__image").append("<div class='image'>" + $(".product__media .item__image").children(".image").eq(index).html() + '</div>');
  })
  $(document).on("click", ".text-group h6", function(){
    if($(window).width() <= 640) {
      $(this).toggleClass("active");
      if($(this).attr("class").indexOf("active") == -1) {
        if($(this).closest('.text-group').find("h5").length > 1) {
          $(this).closest('.text-group').find("h5").slideUp();
          $(this).closest('.text-group').find("div").slideUp();
        } else {
          $(this).nextAll().slideUp();
        }
       
      } else {
        if($(this).closest('.text-group').find("h5").length > 1) {
          $(this).closest('.text-group').find("h5").slideDown();
          $(this).closest('.text-group').find("h5").removeClass("active");
        } else {
          $(this).nextAll().slideDown();
        }
      }
    }
  })
  $(document).on("click", ".text-group h5", function(){
    if($(window).width() <= 640) {
      $(this).toggleClass("active");
      if($(this).attr("class").indexOf("active") == -1) $(this).next('div').slideUp();
      else {
        $(this).next('div').slideDown();
        $(this).next("div").children("div").slideDown();
      }
    }
  })
  $(document).on("click", ".sizeChart__title_group li", function(){
    var _select_value = $.trim($(this).find("p").text());
    var index = $(".sizeChart__title_group li").index($(this)) + 1;
    var _class = ".size__value li.size-item" + index;
    $(".size__value li").removeClass("active");
    $(_class).addClass("active");
    $(this).closest(".sizeChart-header").find(".sizeChart__title").text(_select_value);
  })
  $(document).on("click", ".PageOverlay", function(){
    $(this).removeClass("is-visible");
    $(".chart-wrapper").attr("aria-hidden", true);
  })

  $(document).on("click", ".chart_close", function(){
    $(this).closest(".chart-wrapper").attr("aria-hidden", true);
    $(".PageOverlay").removeClass("is-visible");
  })

  $(document).on("click", ".ColorSwatchList .HorizontalList__Item:not(.active)", function(event){
    _this = $(this);
    $(this).closest(".HorizontalList").find(".HorizontalList__Item").removeClass("active");
    $(this).addClass("active");
    $.ajax($(this).attr("href"), {
      success: function(data) {
        var productHandle = _this.attr("href").replace('/products/', '');
        _this.closest(".Product__Wrapper").find(".Product__Gallery").html($(data).find(".Product__Gallery").html());
        _this.closest(".Product.Product--small").find(".Product__OffScreen").html($(data).find(".Product__OffScreen").html());
        _this.closest(".Product__InfoWrapper").html($(data).find(".Product__InfoWrapper").html());
        $("#judgeme_product_reviews").html($(data).find("#judgeme_product_reviews").html());
        if($.trim($(data).find("#judgeme_product_reviews").html()) == "") {
          $("#judgeme_product_reviews").html('<div class="jdgm-rev-widg jdgm--js" data-number-of-reviews="0" data-average-rating="0.00"><div class="jdgm-rev-widg__header"><h2 class="jdgm-rev-widg__title">WHAT PEPOLE SAYS ABOUT PRODUCT</h2><div class="jdgm-rev-widg__summary"><div class="jdgm-rev-widg__summary-stars"><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a></div><div class="jdgm-rev-widg__summary-text">No reviews yet</div></div><div class="jdgm-widget-actions-wrapper"> <a href="#" class="jdgm-write-rev-link">Write a review</a></div><div class="jdgm-rev__br"></div><div class="jdgm-form-wrapper" style="display: none;"><form class="jdgm-form" novalidate="novalidate"><div class="jdgm-form__name-fieldset"> <label for="jdgm_review_reviewer_name_5syzbea3">Name</label> <span class="jdgm-form__reviewer-name-format-container"> (<label for="jdgm_review_reviewer_name_format_5syzbea3" class="jdgm-form__inline-label jdgm-always-visible">displayed publicly like</label> <span class="jdgm-form__reviewer-name-format-dropdown-wrapper"> <select id="jdgm_review_reviewer_name_format_5syzbea3" name="reviewer_name_format" class="jdgm-form__reviewer-name-format-dropdown"><option value="" selected="">John Smith</option><option value="last_initial">John S.</option><option value="all_initials">J.S.</option><option value="anonymous">Anonymous</option> </select> <span class="jdgm-form__reviewer-name-format-dropdown-arrow"></span> </span> ) </span><input id="jdgm_review_reviewer_name_5syzbea3" name="reviewer_name" type="text" placeholder="Enter your name (public)" aria-label="Name"></div><div class="jdgm-form__email-fieldset"> <label for="jdgm_review_reviewer_email_5syzbea3">Email</label> <input id="jdgm_review_reviewer_email_5syzbea3" name="reviewer_email" type="email" required="" placeholder="Enter your email (private)" aria-label="Email" aria-required="true"></div><div class="jdgm-form__rating-fieldset" aria-label="Rating"> <label>Rating</label> <span class="jdgm-form__rating" style="cursor: pointer;"><a data-alt="1" class="jdgm-star jdgm--on" title="1 star" aria-label="1 star"></a><a data-alt="2" class="jdgm-star jdgm--on" title="2 stars" aria-label="2 stars"></a><a data-alt="3" class="jdgm-star jdgm--on" title="3 stars" aria-label="3 stars"></a><a data-alt="4" class="jdgm-star jdgm--on" title="4 stars" aria-label="4 stars"></a><a data-alt="5" class="jdgm-star jdgm--on" title="5 stars" tabindex="0" aria-label="5 stars"></a><input name="score" type="hidden" value="5"></span></div><div class="jdgm-form__title-fieldset"> <label for="jdgm_review_title_5syzbea3">Review Title</label><span class="jdgm-countdown"></span> <input id="jdgm_review_title_5syzbea3" name="review_title" type="text" placeholder="Give your review a title" aria-label="Review Title"></div><div class="jdgm-form__body-fieldset"> <label for="jdgm_review_body_5syzbea3">Review</label><span class="jdgm-countdown"></span><textarea id="jdgm_review_body_5syzbea3" rows="5" name="review_body" placeholder="Write your comments here" aria-label="Review"></textarea></div><div class="jdgm-custom-forms"></div><input type="submit" class="jdgm-submit-rev btn btn_c button " value="Submit Review"></form></div><div class="jdgm-form-dynamic-wrapper"><div class="jdgm-mask"></div><form class="jdgm-form-dynamic" novalidate="novalidate"><div class="jdgm-form-dynamic__close jdgm-close-ico"></div><div class="jdgm-form-dynamic__picture-upload-field jdgm-form-dynamic__row" data-pos="-1"><label class="jdgm-picture-dynamic-fieldset-title">Picture (optional)</label><div class="jdgm-form-dynamic__buttons-row"><div class="jdgm-form-dynamic__back btn btn_c button" tabindex="0">Back</div><div class="jdgm-form-dynamic__next btn btn_c button" tabindex="0">Next</div></div></div><div class="jdgm-form-dynamic__rating-fieldset jdgm-form-dynamic__row" data-pos="0"> <label>Rating</label> <span class="jdgm-form-dynamic__rating" style="cursor: pointer;"><a data-alt="1" class="jdgm-star jdgm--on" title="1 star"></a><a data-alt="2" class="jdgm-star jdgm--on" title="2 stars"></a><a data-alt="3" class="jdgm-star jdgm--on" title="3 stars"></a><a data-alt="4" class="jdgm-star jdgm--on" title="4 stars"></a><a data-alt="5" class="jdgm-star jdgm--on" title="5 stars"></a><input name="score" type="hidden" value="5"></span><div class="jdgm-form-dynamic__buttons-row"><div class="jdgm-form-dynamic__back btn btn_c button" tabindex="0">Back</div><div class="jdgm-form-dynamic__next btn btn_c button" tabindex="0">Next</div></div></div><div class="jdgm-form-dynamic__row" data-pos="1"><div class="jdgm-form-dynamic__name-fieldset"> <label for="jdgm_reviewer_name">Name</label> <input id="jdgm_reviewer_name" name="reviewer_name" type="text" placeholder="Enter your name (public)"></div><div class="jdgm-form-dynamic__email-fieldset"> <label for="jdgm_reviewer_email">Email</label> <input id="jdgm_reviewer_email" name="reviewer_email" type="email" placeholder="Enter your email (private)"></div><div class="jdgm-form-dynamic__buttons-row"><div class="jdgm-form-dynamic__back btn btn_c button" tabindex="0">Back</div><div class="jdgm-form-dynamic__next btn btn_c button" tabindex="0">Next</div></div></div><div class="jdgm-form-dynamic__row jdgm-form-dynamic__submit-slide" data-pos="2"><div class="jdgm-form-dynamic__title-fieldset"> <label for="jdgm_review_title">Review Title</label><span class="jdgm-countdown"></span> <input id="jdgm_review_title" name="review_title" type="text" placeholder="Give your review a title"></div><div class="jdgm-form-dynamic__body-fieldset"> <label for="jdgm_review_body">Review</label><span class="jdgm-countdown"></span><textarea id="jdgm_review_body" rows="5" name="review_body" placeholder="Write your comments here"></textarea></div><div class="jdgm-form-dynamic__buttons-row"><div class="jdgm-form-dynamic__back btn btn_c button" tabindex="0">Back</div><div class="jdgm-form-dynamic__next btn btn_c button" tabindex="0">Next</div></div></div><div class="jdgm-custom-forms-dynamic jdgm-custom-forms"></div><input type="submit" class="jdgm-form-dynamic__submit-rev btn btn_c button " value="Submit Review"></form></div></div></div>');
        }
        
        history.pushState('data to be passed', 'Title of the page', _this.attr('href'));
        if($.trim($(data).find(".Product__Info").find(".jdgm-widget.jdgm-preview-badge").html()) == "") {
         $(".Product__Info").find(".jdgm-widget.jdgm-preview-badge").html('<div class="jdgm-prev-badge jdgm--js" data-average-rating="0.00" data-number-of-reviews="0"><span class="jdgm-prev-badge__stars" data-score="0.00"><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a><a class="jdgm-star jdgm--off"></a></span><span class="jdgm-prev-badge__text"> No reviews</span></div>');
        }

        $("#judgeme_product_reviews").attr("data-id", $(data).find("#judgeme_product_reviews").data("id"));
        $("#judgeme_product_reviews").attr("data-product-title", $(data).find("#judgeme_product_reviews").data("product-title"));
        $(".Product.Product--small").find(".Product__OffScreen").attr("class",$(data).find(".Product__OffScreen").attr("class"));
        
      }
    })
  })
  $(document).on("click", ".size-swatch", function(event){
    event.preventDefault();
    $(this).next(".size-list").slideToggle();
    $(this).toggleClass("open");
  })
  $(document).on("click", ".size-list .size-item", function(){
    var _button = $(this).parent(".size-list").prev("button.size-swatch");
    var value = "[data-value='" + $(this).find("label").text() + "']";
    _button.find(".ProductForm__OptionName").find(".ProductForm__SelectedValue").text($(this).find("label").text());
    _button.removeClass("open");
    $(this).parent(".size-list").find(".size-item").removeClass("is-selected");
    $(this).addClass("is-selected");
    $(this).parent(".size-list").hide();
    $(".Popover__ValueList").find(value).click();
    $(".swathOverlay").hide();
  })
  $(document).on("click", ".swathOverlay", function(){
    $(".size-list").slideToggle();
    $(".size-swatch").toggleClass("open");
    $(this).hide();
  })
}

if(template == "index") {
   $(".shopify-section--slideshow").find(".flickity-prev-next-button.next").html('&#8594');
    $(".shopify-section--slideshow").find(".flickity-prev-next-button.previous").html('&#8592');
    $(".ProductList--carousel").find(".flickity-prev-next-button.next").html('&#8594');
    $(".ProductList--carousel").find(".flickity-prev-next-button.previous").html('&#8592');

    $('[data-collection-leaset-slider]').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        prevArrow: backButton,
        nextArrow: nextButton,
        // centerMode: true,
        responsive:[{
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true
            }
          }]
    })
    
    $('[data-article--list]').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
        dots: false,
        infinite: false,
        prevArrow: backButton,
        nextArrow: nextButton,
        responsive:[{
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
    })
    $('[data-article--list-date]').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive:[{
            breakpoint: 640,
            settings: {
              arrows: true,
              infinite: false,
              prevArrow: backButton,
              nextArrow: nextButton,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true
            }
          }]
    })
    
    $(".ProductListWrapper .ProductItem__Price" ).each(function( index ) {
        let _this = $(this);
        setTimeout(function(){
            _this.text(_this.find("span").data("currency-aed"));
        }, 1500);
    });   
}
$(document).on("click", ".Footer__Title", function(){
  if($(window).width() <= 640) {
    $(this).toggleClass("open");
    $(this).next().slideToggle();
  }
})

