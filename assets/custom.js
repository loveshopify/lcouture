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
$("[data-announcement-slider]").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  infinite: true,
  prevArrow: backButton,
  nextArrow: nextButton
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
    var sizeChart = [["GENERIC","XXS","XS","S","M","L","XL","XXL","XXXL"],["US",0,0,"2 ,4","6,8",10,12,14,""],["UK",4,6,8,10,12,14,16,18],["EU/ITALY",36,38,40,42,44,46,48,50],["FRANCE",32,34,36,38,40,42,44,46],["DENMARK",30,32,34,36,38,40,42,44],["RUSSIA",38,40,42,44,46,48,50,52],["GERMANY",30,32,34,36,38,40,42,44],["AUSTRALIA",4,6,8,10,12,14,16,18],["JAPAN",3,5,7,9,11,13,15,17],["JEANS",23,24,26,27,29,31,32,""],["XXS-XXXL","XXS - XS","XS - S","S","M","L","XL","XXL","XXXL"],["CH TOP","155/76A","160/80A","165/84A","170/88A","175/92A","180/96A","180/100A",""],["CH BOTTOM","155/64A","160/66A","165/68A","170/70A","175/72A","180/74A","185/76A",""],["KOREA",44,55,66,77,88,99,"",""],["NUMERICAL",0,1,2,3,4,5,6,""]];
    var product_size_name = sizeChart[0];
    var product_size_value = sizeChart[1];
    $(".main__title").text(product_size_name[0]);
    $(".sizeChart__title").text(product_size_value[0]);
    for(var i = 1; i < sizeChart.length; i++) $(".sizeChart__title_group").append("<li>" + sizeChart[i][0] + "</li>");
    for(var i = 1; i < product_size_name.length; i++) $(".size__name").append("<li>" + product_size_name[i] + "</li>");
    for(var i = 1; i < product_size_value.length; i++) $(".size__value").append("<li>" + product_size_value[i] + "</li>");
  })
  $(document).on("click", ".sizeChart-header", function(){
      $(".sizeChart__title_group").slideToggle();
  })
  $(document).on("click", ".sizeChart__title_group li", function(){
    var _select_value = $.trim($(this).text());
    var sizeChart = [["GENERIC","XXS","XS","S","M","L","XL","XXL","XXXL"],["US",0,0,"2 ,4","6,8",10,12,14,""],["UK",4,6,8,10,12,14,16,18],["EU/ITALY",36,38,40,42,44,46,48,50],["FRANCE",32,34,36,38,40,42,44,46],["DENMARK",30,32,34,36,38,40,42,44],["RUSSIA",38,40,42,44,46,48,50,52],["GERMANY",30,32,34,36,38,40,42,44],["AUSTRALIA",4,6,8,10,12,14,16,18],["JAPAN",3,5,7,9,11,13,15,17],["JEANS",23,24,26,27,29,31,32,""],["XXS-XXXL","XXS - XS","XS - S","S","M","L","XL","XXL","XXXL"],["CH TOP","155/76A","160/80A","165/84A","170/88A","175/92A","180/96A","180/100A",""],["CH BOTTOM","155/64A","160/66A","165/68A","170/70A","175/72A","180/74A","185/76A",""],["KOREA",44,55,66,77,88,99,"",""],["NUMERICAL",0,1,2,3,4,5,6,""]];
    $(this).closest(".sizeChart-header").find(".sizeChart__title").text(_select_value);
    $(this).closest(".container").find(".chart-body").find(".size__value").html("");
    var size_value = "";
    for(i = 0; i < sizeChart.length; i++) {
      if(sizeChart[i][0] == _select_value) {
        for(j = 1; j < sizeChart[i].length; j++) {
          $(this).closest(".container").find(".chart-body").find(".size__value").append("<li>" + sizeChart[i][j] + "</li>");
        }
      }
    }
  })
  $(document).on("click", ".PageOverlay", function(){
    $(this).removeClass("is-visible");
    $(".chart-wrapper").attr("aria-hidden", true);
  })

  $(document).on("click", ".chart_close", function(){
    $(this).closest(".chart-wrapper").attr("aria-hidden", true);
    $(".PageOverlay").removeClass("is-visible");
  })

  $(document).on("click", ".ColorSwatch", function(event){
    if($(window).width() > 640) {
      // event.preventDefault();
      var _class = $(this).data('tooltip');
      _class = "." + _class;
      if($(this).parents(".Product__Wrapper").find(".product__media").find(_class).length != 0) {
          $(this).parents(".Product__Wrapper").find(".product__media").find(".variant-item").hide();
          $(this).parents(".Product__Wrapper").find(".product__media").find(_class).show();
        }
    }
  })
  $(document).on("click", ".size-swatch", function(event){
    event.preventDefault();
    $(this).next(".size-list").slideToggle();
    $(this).toggleClass("open");
    // $(".swathOverlay").show();
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
    // $(".shopify-section--slideshow").find(".flickity-prev-next-button.next").html('<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>');
    // $(".shopify-section--slideshow").find(".flickity-prev-next-button.previous").html('<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M492,236H68.442l70.164-69.824c7.829-7.792,7.859-20.455,0.067-28.284c-7.792-7.83-20.456-7.859-28.285-0.068l-104.504,104c-0.007,0.006-0.012,0.013-0.018,0.019c-7.809,7.792-7.834,20.496-0.002,28.314c0.007,0.006,0.012,0.013,0.018,0.019l104.504,104c7.828,7.79,20.492,7.763,28.285-0.068c7.792-7.829,7.762-20.492-0.067-28.284L68.442,276H492c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>');    
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
              slidesToShow: 2,
              slidesToScroll: 2,
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
  $(this).toggleClass("open");
  $(this).next().slideToggle();
})

