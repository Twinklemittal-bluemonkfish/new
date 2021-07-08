"use strict";
var _eventMore = false;

/* Functions base */
function after_load_ajax_list($, destroy_masonry) {
    var _destroy_masonry = typeof destroy_masonry !== 'undefined' ? destroy_masonry : false;
    
    /**
     * Trigger after load ajax - first event
     */
    $('body').trigger('nasa_after_load_ajax_first', [_destroy_masonry]);
    
    /**
     * Init Top Categories
     */
    init_top_categories_filter($);
    
    /**
     * Init widgets
     */
    init_widgets($);
    
    /*
     * Parallax Breadcrumb
     */
    if (!_eventMore) {
        $('body').trigger('nasa_parallax_breadcrum');
    }
    
    /**
     * init wishlist icons
     */
    init_wishlist_icons($);
    
    /**
     * init Compare icons
     */
    init_compare_icons($);
    
    _eventMore = false;
    
    $('body').trigger('nasa_after_load_ajax');
}

/**
 * Tabs slide
 * 
 * @param {type} $
 * @param {type} _this
 * @param {type} exttime
 * @returns {undefined}
 */
function nasa_tab_slide_style($, _this, exttime) {
    exttime = !exttime ? 500 : exttime;
    
    if ($(_this).find('.nasa-slide-tab').length <= 0) {
        $(_this).append('<li class="nasa-slide-tab"></li>');
    }
    
    var _tab = $(_this).find('.nasa-slide-tab');
    var _act = $(_this).find('.nasa-tab.active');
    
    if ($(_this).find('.nasa-tab-icon').length) {
        $(_this).find('.nasa-tab > a').css({'padding': '15px 30px'});
    }
    
    var _width_border = parseInt($(_this).css("border-top-width"));
    _width_border = !_width_border ? 0 : _width_border;
    
    var _pos = $(_act).position();
    $(_tab).show().animate({
        'height': $(_act).height() + (2*_width_border),
        'width': $(_act).width() + (2*_width_border),
        'top': _pos.top - _width_border,
        'left': _pos.left - _width_border
    }, exttime);
}

/**
 * Load Compare
 * 
 * @param {type} $
 * @returns {undefined}
 */
var _compare_init = false;
function load_compare($) {
    if ($('#nasa-compare-sidebar-content').length && !_compare_init) {
        _compare_init = true;
        
        if (
            typeof nasa_ajax_params !== 'undefined' &&
            typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
        ) {
            var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_load_compare');

            var _compare_table = $('.nasa-wrap-table-compare').length ? true : false;
            $.ajax({
                url: _urlAjax,
                type: 'post',
                dataType: 'json',
                cache: false,
                data: {
                    compare_table: _compare_table
                },
                beforeSend: function () {
                    
                },
                success: function (res) {
                    if (typeof res.success !== 'undefined' && res.success === '1') {
                        $('#nasa-compare-sidebar-content').replaceWith(res.content);
                    }

                    $('.nasa-compare-list-bottom').find('.nasa-loader').remove();
                },
                error: function () {

                }
            });
        }
    }
}

/**
 * Add Compare
 * 
 * @param {type} _id
 * @param {type} $
 * @returns {undefined}
 */
function add_compare_product(_id, $) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_add_compare_product');
        
        var _compare_table = $('.nasa-wrap-table-compare').length ? true : false;

        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
                pid: _id,
                compare_table: _compare_table
            },
            beforeSend: function () {
                show_compare($);
                
                if ($('.nasa-compare-list-bottom').find('.nasa-loader').length <= 0) {
                    $('.nasa-compare-list-bottom').append('<div class="nasa-loader"></div>');
                }
            },
            success: function (res) {
                if (typeof res.result_compare !== 'undefined' && res.result_compare === 'success') {
                    if ($('#nasa-compare-sidebar-content').length) {
                        if (res.mini_compare === 'no-change') {
                            load_compare($);
                        } else {
                            $('#nasa-compare-sidebar-content').replaceWith(res.mini_compare);
                        }
                    } else {
                        if (res.mini_compare !== 'no-change' && $('.nasa-compare-list').length) {
                            $('.nasa-compare-list').replaceWith(res.mini_compare);
                        }
                    }
                    
                    if (res.mini_compare !== 'no-change') {
                        if ($('.nasa-mini-number.compare-number').length) {
                            
                            $('.nasa-mini-number.compare-number').html(convert_count_items($, res.count_compare));
                            if (res.count_compare === 0) {
                                if (!$('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                                    $('.nasa-mini-number.compare-number').addClass('nasa-product-empty');
                                }
                            } else {
                                if ($('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                                    $('.nasa-mini-number.compare-number').removeClass('nasa-product-empty');
                                }
                            }
                        }

                        $('.nasa-compare-success').html(res.mess_compare);
                        $('.nasa-compare-success').fadeIn(200);

                        if (_compare_table) {
                            $('.nasa-wrap-table-compare').replaceWith(res.result_table);
                        }
                        
                    } else {
                        $('.nasa-compare-exists').html(res.mess_compare);
                        $('.nasa-compare-exists').fadeIn(200);
                    }

                    if (!$('.nasa-compare[data-prod="' + _id + '"]').hasClass('added')) {
                        $('.nasa-compare[data-prod="' + _id + '"]').addClass('added');
                    }

                    if (!$('.nasa-compare[data-prod="' + _id + '"]').hasClass('nasa-added')) {
                        $('.nasa-compare[data-prod="' + _id + '"]').addClass('nasa-added');
                    }

                    setTimeout(function () {
                        $('.nasa-compare-success').fadeOut(200);
                        $('.nasa-compare-exists').fadeOut(200);
                    }, 2000);
                }

                $('.nasa-compare-list-bottom').find('.nasa-loader').remove();
            },
            error: function () {

            }
        });
    }
}

/**
 * Remove Compare
 * 
 * @param {type} _id
 * @param {type} $
 * @returns {undefined}
 */
function remove_compare_product(_id, $) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_remove_compare_product');
        
        var _compare_table = $('.nasa-wrap-table-compare').length ? true : false;

        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
                pid: _id,
                compare_table: _compare_table
            },
            beforeSend: function () {
                if ($('.nasa-compare-list-bottom').find('.nasa-loader').length <= 0) {
                    $('.nasa-compare-list-bottom').append('<div class="nasa-loader"></div>');
                }
                
                if ($('table.nasa-table-compare tr.remove-item td.nasa-compare-view-product_' + _id).length) {
                    $('table.nasa-table-compare').css('opacity', '0.3').prepend('<div class="nasa-loader"></div>');
                }
            },
            success: function (res) {
                if (typeof res.result_compare !== 'undefined' && res.result_compare === 'success') {
                    if (res.mini_compare !== 'no-change' && $('#nasa-compare-sidebar-content').length) {
                        $('#nasa-compare-sidebar-content').replaceWith(res.mini_compare);
                    } else {
                        if (res.mini_compare !== 'no-change' && $('.nasa-compare-list').length) {
                            $('.nasa-compare-list').replaceWith(res.mini_compare);
                        }
                    }
                    
                    if (res.mini_compare !== 'no-change' && $('.nasa-compare-list').length) {
                        $('.nasa-compare[data-prod="' + _id + '"]').removeClass('added');
                        $('.nasa-compare[data-prod="' + _id + '"]').removeClass('nasa-added');
                        if ($('.nasa-mini-number.compare-number').length) {
                            
                            $('.nasa-mini-number.compare-number').html(convert_count_items($, res.count_compare));
                            if (res.count_compare === 0) {
                                if (!$('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                                    $('.nasa-mini-number.compare-number').addClass('nasa-product-empty');
                                }
                            } else {
                                if ($('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                                    $('.nasa-mini-number.compare-number').removeClass('nasa-product-empty');
                                }
                            }
                        }

                        $('.nasa-compare-success').html(res.mess_compare);
                        $('.nasa-compare-success').fadeIn(200);

                        if (_compare_table) {
                            $('.nasa-wrap-table-compare').replaceWith(res.result_table);
                        }
                    } else {
                        $('.nasa-compare-exists').html(res.mess_compare);
                        $('.nasa-compare-exists').fadeIn(200);
                    }

                    setTimeout(function () {
                        $('.nasa-compare-success').fadeOut(200);
                        $('.nasa-compare-exists').fadeOut(200);
                        if (res.count_compare === 0) {
                            $('.nasa-close-mini-compare').trigger('click');
                        }
                    }, 2000);
                }

                $('table.nasa-table-compare').find('.nasa-loader').remove();
                $('.nasa-compare-list-bottom').find('.nasa-loader').remove();
            },
            error: function() {

            }
        });
    }
}

/**
 * Remove All Compare
 * 
 * @param {type} $
 * @returns {undefined}
 */
function remove_all_compare_product($) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_remove_all_compare');
        
        var _compare_table = $('.nasa-wrap-table-compare').length ? true : false;
        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
                compare_table: _compare_table
            },
            beforeSend: function () {
                if ($('.nasa-compare-list-bottom').find('.nasa-loader').length <= 0) {
                    $('.nasa-compare-list-bottom').append('<div class="nasa-loader"></div>');
                }
            },
            success: function (res) {
                if (res.result_compare === 'success') {
                    if (res.mini_compare !== 'no-change' && $('.nasa-compare-list').length) {
                        $('.nasa-compare-list').replaceWith(res.mini_compare);
                        
                        $('.nasa-compare').removeClass('added');
                        $('.nasa-compare').removeClass('nasa-added');
                        
                        if ($('.nasa-mini-number.compare-number').length) {
                            $('.nasa-mini-number.compare-number').html('0');
                            if (!$('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                                $('.nasa-mini-number.compare-number').addClass('nasa-product-empty');
                            }
                        }

                        $('.nasa-compare-success').html(res.mess_compare);
                        $('.nasa-compare-success').fadeIn(200);

                        if (_compare_table) {
                            $('.nasa-wrap-table-compare').replaceWith(res.result_table);
                        }
                    } else {
                        $('.nasa-compare-exists').html(res.mess_compare);
                        $('.nasa-compare-exists').fadeIn(200);
                    }

                    setTimeout(function () {
                        $('.nasa-compare-success').fadeOut(200);
                        $('.nasa-compare-exists').fadeOut(200);
                        $('.nasa-close-mini-compare').trigger('click');
                    }, 1000);
                }

                $('.nasa-compare-list-bottom').find('.nasa-loader').remove();
            },
            error: function() {

            }
        });
    }
}

/**
 * Show compare
 * 
 * @param {type} $
 * @returns {undefined}
 */
function show_compare($) {
    /**
     * Append stylesheet Off Canvas
     */
    $('body').trigger('nasa_append_style_off_canvas');
    
    if ($('.nasa-compare-list-bottom').length) {
        $('.transparent-window').show();
        
        if ($('.nasa-show-compare').length && !$('.nasa-show-compare').hasClass('nasa-showed')) {
            $('.nasa-show-compare').addClass('nasa-showed');
        }
        
        if (!$('.nasa-compare-list-bottom').hasClass('nasa-active')) {
            $('.nasa-compare-list-bottom').addClass('nasa-active');
        }
    }
}

/**
 * Hide compare
 * 
 * @param {type} $
 * @returns {undefined}
 */
function hide_compare($) {
    if ($('.nasa-compare-list-bottom').length) {
        $('.transparent-window').fadeOut(550);
        
        if ($('.nasa-show-compare').length && $('.nasa-show-compare').hasClass('nasa-showed')) {
            $('.nasa-show-compare').removeClass('nasa-showed');
        }
        
        $('.nasa-compare-list-bottom').removeClass('nasa-active');
    }
}

/**
 * Single add to cart
 * 
 * @param {type} $
 * @param {type} _this
 * @param {type} _id
 * @param {type} _quantity
 * @param {type} _type
 * @param {type} _variation_id
 * @param {type} _variation
 * @param {type} _data_wishlist
 * @returns {undefined|Boolean}
 */
function nasa_single_add_to_cart($, _this, _id, _quantity, _type, _variation_id, _variation, _data_wishlist) {
    var _form = $(_this).parents('form.cart');
    
    if (_type === 'grouped') {
        if ($(_form).length) {
            if ($(_form).find('.nasa-custom-fields input[name="nasa_cart_sidebar"]').length) {
                $(_form).find('.nasa-custom-fields input[name="nasa_cart_sidebar"]').val('1');
            } else {
                $(_form).find('.nasa-custom-fields').append('<input type="hidden" name="nasa_cart_sidebar" value="1" />');
            }
            
            $(_form).submit();
        }
        
        return;
    }
    
    /**
     * Ajax add to cart
     */
    else {
        if (
            typeof nasa_ajax_params !== 'undefined' &&
            typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
        ) {
            var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_single_add_to_cart');
            
            var _data = {
                product_id: _id,
                quantity: _quantity,
                product_type: _type,
                variation_id: _variation_id,
                variation: _variation,
                data_wislist: _data_wishlist
            };
            
            if ($(_form).length) {
                if (_type === 'simple') {
                    $(_form).find('.nasa-custom-fields').append('<input type="hidden" name="add-to-cart" value="' + _id + '" />');
                }
                
                _data = $(_form).serializeArray();
                $(_form).find('.nasa-custom-fields [name="add-to-cart"]').remove();
            }
            
            $.ajax({
                url: _urlAjax,
                type: 'post',
                dataType: 'json',
                cache: false,
                data: _data,
                beforeSend: function () {
                    $(_this).removeClass('added');
                    $(_this).removeClass('nasa-added');
                    $(_this).addClass('loading');
                },
                success: function (res) {
                    if (res.error) {
                        if ($(_this).hasClass('add-to-cart-grid')) {
                            var _href = $(_this).attr('href');
                            window.location.href = _href;
                        } else {
                            set_nasa_notice($, res.message);
                            $(_this).removeClass('loading');
                        }
                    } else {
                        if (typeof res.redirect !== 'undefined' && res.redirect) {
                            window.location.href = res.redirect;
                        } else {
                            var fragments = res.fragments;
                            if (fragments) {
                                $.each(fragments, function (key, value) {
                                    $(key).addClass('updating');
                                    $(key).replaceWith(value);
                                });

                                if (!$(_this).hasClass('added')) {
                                    $(_this).addClass('added');
                                }

                                if (!$(_this).hasClass('nasa-added')) {
                                    $(_this).addClass('nasa-added');
                                }
                            }

                            if ($('.wishlist_sidebar').length) {
                                if (typeof res.wishlist !== 'undefined') {
                                    $('.wishlist_sidebar').replaceWith(res.wishlist);

                                    setTimeout(function() {
                                        init_wishlist_icons($, true);
                                    }, 350);

                                    if ($('.nasa-mini-number.wishlist-number').length) {
                                        var sl_wislist = parseInt(res.wishlistcount);
                                        $('.nasa-mini-number.wishlist-number').html(convert_count_items($, sl_wislist));
                                        if (sl_wislist > 0) {
                                            $('.nasa-mini-number.wishlist-number').removeClass('nasa-product-empty');
                                        }
                                        else if (sl_wislist === 0 && !$('.wishlist-number').hasClass('nasa-product-empty')) {
                                            $('.nasa-mini-number.wishlist-number').addClass('nasa-product-empty');
                                        }
                                    }

                                    if ($('.add-to-wishlist-' + _id).length) {
                                        $('.add-to-wishlist-' + _id).find('.yith-wcwl-add-button').show();
                                        $('.add-to-wishlist-' + _id).find('.yith-wcwl-wishlistaddedbrowse').hide();
                                        $('.add-to-wishlist-' + _id).find('.yith-wcwl-wishlistexistsbrowse').hide();
                                    }
                                }
                            }

                            if ($('.page-shopping-cart').length === 1) {
                                $.ajax({
                                    url: window.location.href,
                                    type: 'get',
                                    dataType: 'html',
                                    cache: false,
                                    data: {},
                                    success: function (res) {
                                        var $html = $.parseHTML(res);

                                        if ($('.nasa-shopping-cart-form').length === 1) {
                                            var $new_form   = $('.nasa-shopping-cart-form', $html);
                                            var $new_totals = $('.cart_totals', $html);
                                            var $notices    = $('.woocommerce-error, .woocommerce-message, .woocommerce-info', $html);
                                            $('.nasa-shopping-cart-form').replaceWith($new_form);

                                            if ($notices.length) {
                                                $('.nasa-shopping-cart-form').before($notices);
                                            }
                                            $('.cart_totals').replaceWith($new_totals);

                                        } else {
                                            var $new_content = $('.page-shopping-cart', $html);
                                            $('.page-shopping-cart').replaceWith($new_content);
                                        }

                                        $(document.body).trigger('updated_cart_totals');
                                        $(document.body).trigger('updated_wc_div');
                                        $('.nasa-shopping-cart-form').find('input[name="update_cart"]').prop('disabled', true);
                                    }
                                });
                            }

                            $(document.body).trigger('added_to_cart', [res.fragments, res.cart_hash, _this]);
                        }
                    }
                }
            });
        }
    }
    
    return false;
}

/**
 * Bundle Yith popup
 * 
 * @param {type} $
 * @param {type} _this
 * @returns {undefined}
 */
function load_combo_popup($, _this) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_combo_products');
        
        var item = $(_this).parents('.product-item');
        if (!$(_this).hasClass('nasaing')) {
            $('.btn-combo-link').addClass('nasaing');
            var pid = $(_this).attr('data-prod');
            if (pid) {
                $.ajax({
                    url: _urlAjax,
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data: {
                        id: pid,
                        'title_columns': 2
                    },
                    beforeSend: function () {
                        $(item).append('<div class="nasa-loader" style="top:50%"></div>');
                        $(item).find('.product-inner').css('opacity', '0.3');
                    },
                    success: function (res) {
                        $.magnificPopup.open({
                            mainClass: 'my-mfp-slide-bottom nasa-combo-popup-wrap',
                            closeMarkup: '<a class="nasa-mfp-close nasa-stclose" href="javascript:void(0);" title="' + $('input[name="nasa-close-string"]').val() + '"></a>',
                            items: {
                                src: '<div class="row nasa-combo-popup nasa-combo-row comboed-row zoom-anim-dialog" data-prod="' + pid + '">' + res.content + '</div>',
                                type: 'inline'
                            },
                            removalDelay: 300,
                            callbacks: {
                                afterClose: function() {

                                }
                            }
                        });

                        $('body').trigger('nasa_load_slick_slider');

                        setTimeout(function () {
                            $('.btn-combo-link').removeClass('nasaing');
                            $(item).find('.nasa-loader').remove();
                            $(item).find('.product-inner').css('opacity', '1');
                            if (!wow_enable) {
                                $('.nasa-combo-popup').find('.product-item').css({'visibility': 'visible'});
                            } else {
                                var _data_animate, _delay;
                                $('.nasa-combo-popup').find('.product-item').each(function() {
                                    var _this = $(this);
                                    _data_animate = $(_this).attr('data-wow');
                                    _delay = parseInt($(_this).attr('data-wow-delay'));
                                    $(_this).css({
                                        'visibility': 'visible',
                                        'animation-delay': _delay + 'ms',
                                        'animation-name': _data_animate
                                    }).addClass('animated');
                                });
                            }
                        }, 500);
                    },
                    error: function () {
                        $('.btn-combo-link').removeClass('nasaing');
                    }
                });
            }
        }
    }
}

/**
 * Main menu Reponsive
 * 
 * @param {type} $
 * @returns {undefined}
 */
function load_responsive_main_menu($) {
    var _mobileView = $('.nasa-check-reponsive.nasa-switch-check').length && $('.nasa-check-reponsive.nasa-switch-check').width() === 1 ? true : false;
    var _inMobile = $('body').hasClass('nasa-in-mobile') ? true : false;
    
    if (!_mobileView && !_inMobile && $('.nasa-menus-wrapper-reponsive').length) {
        var _wwin = $(window).width();
        
        $('.nasa-menus-wrapper-reponsive').each(function() {
            
            var _this = $(this);
            
            var _tl = _wwin/1200;
            if (_tl < 1) {
                var _x = $(_this).attr('data-padding_x');
                var _params = {'font-size': (100*_tl).toString() + '%'};
                
                if (!$('body').hasClass('nasa-rtl')) {
                    _params['margin-right'] = (_tl*_x).toString() + 'px';
                    _params['margin-left'] = '0';
                } else {
                    _params['margin-left'] = (_tl*_x).toString() + 'px';
                    _params['margin-right'] = '0';
                }

                $(_this).find('.header-nav > li > a').css(_params);
                
                if ($(_this).find('.nasa-title-vertical-menu').length) {
                    $(_this).find('.nasa-title-vertical-menu').css({
                        'font-size': (100*_tl).toString() + '%'
                    });
                }
            } else {
                $(_this).find('.header-nav > li > a').removeAttr('style');
                if ($(_this).find('.nasa-title-vertical-menu').length) {
                    $(_this).find('.nasa-title-vertical-menu').removeAttr('style');
                }
            }
            
            $(_this).removeClass('nasa-loading');
        });
    }
}

/**
 * Mobile Menu
 * 
 * @type init_menu_mobile.mini_acc|init_menu_mobile.head_menu|StringMain menu
 * @param {type} $
 * @returns {undefined}
 */
function init_menu_mobile($) {
    $('body').trigger('nasa_before_init_menu_mobile');
    
    if ($('#nasa-menu-sidebar-content .nasa-menu-for-mobile').length <= 0) {
        var _mobileDetect = $('body').hasClass('nasa-in-mobile') ? true : false;
        
        var _mobile_menu = '';

        if ($('.nasa-to-menu-mobile').length) {
            $('.nasa-to-menu-mobile').each(function() {
                var _this = $(this);
                _mobile_menu += $(_this).html();
                if (_mobileDetect) {
                    $(_this).remove();
                }
            });
        }

        else if ($('.header-type-builder .header-nav').length) {
            $('.header-type-builder .header-nav').each(function() {
                _mobile_menu += $(this).html();
            });
        }

        /**
         * Vertical menu in header
         */
        if ($('.nasa-vertical-header .vertical-menu-wrapper').length){
            var ver_menu = $('.nasa-vertical-header .vertical-menu-wrapper').html();
            var ver_menu_title = $('.nasa-vertical-header .nasa-title-vertical-menu').html();
            var ver_menu_warp = '<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-parent-item default-menu root-item nasa-menu-none-event li_accordion"><a href="javascript:void(0);">' + ver_menu_title + '</a><div class="nav-dropdown-mobile"><ul class="sub-menu">' + ver_menu + '</ul></div></li>';
            
            if ($('.nasa-vertical-header').hasClass('nasa-focus-menu')) {
                _mobile_menu = ver_menu_warp + _mobile_menu;
            } else {
                _mobile_menu += ver_menu_warp;
            }
            
            if (_mobileDetect) {
                $('.nasa-vertical-header').remove();
            }
        }

        /**
         * Heading
         */
        if ($('#heading-menu-mobile').length === 1) {
            _mobile_menu = '<li class="menu-item root-item menu-item-heading">' + $('#heading-menu-mobile').html() + '</li>' + _mobile_menu;
            
            if (_mobileDetect) {
                $('#heading-menu-mobile').remove();
            }
        }

        /**
         * Vertical Menu in content page
         */
        if ($('.nasa-shortcode-menu.vertical-menu').length) {
            $('.nasa-shortcode-menu.vertical-menu').each(function() {
                var _this = $(this);
                var ver_menu_sc = $(_this).find('.vertical-menu-wrapper').html();
                var ver_menu_title_sc = $(_this).find('.section-title').html();
                
                if (!$('#nasa-menu-sidebar-content').hasClass('nasa-light-new')) {
                    ver_menu_title_sc = '<h5 class="menu-item-heading margin-top-35 margin-bottom-10">' + ver_menu_title_sc + '</h5>';
                } else {
                    ver_menu_title_sc = '<a href="javascript:void(0);">' + ver_menu_title_sc + '</a>';
                }
                
                var ver_menu_warp_sc = '<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-parent-item default-menu root-item nasa-menu-none-event li_accordion">' + ver_menu_title_sc + '<div class="nav-dropdown-mobile"><ul class="sub-menu">' + ver_menu_sc + '</ul></div></li>';
                
                _mobile_menu += ver_menu_warp_sc;
                
                if (_mobileDetect) {
                    $(_this).remove();
                }
            });
        }
        
        /**
         * Topbar menu
         */
        if ($('.nasa-topbar-menu').length) {
            _mobile_menu += $('.nasa-topbar-menu').html();
            
            if (_mobileDetect) {
                $('.nasa-topbar-menu').remove();
            }
        }

        /**
         * Mobile account
         */
        if ($('#mobile-account').length === 1) {
            if ($('#nasa-menu-sidebar-content').hasClass('nasa-light-new') && $('#mobile-account').find('.nasa-menu-item-account').length) {
                _mobile_menu += '<li class="menu-item root-item menu-item-account menu-item-has-children root-item">' + $('#mobile-account').find('.nasa-menu-item-account').html() + '</li>';
            } else {
                _mobile_menu += '<li class="menu-item root-item menu-item-account">' + $('#mobile-account').html() + '</li>';
            }
            
            if (_mobileDetect) {
                $('#mobile-account').remove();
            }
        }

        /**
         * Switch language
         */
        var switch_lang = '';
        if ($('.header-switch-languages').length === 1) {
            switch_lang = $('.header-switch-languages').html();
            if (_mobileDetect) {
                $('.header-switch-languages').remove();
            }
        }

        if ($('.header-multi-languages').length) {
            switch_lang = $('.header-multi-languages').html();
            if (_mobileDetect) {
                $('.header-multi-languages').remove();
            }
        }

        if ($('#nasa-menu-sidebar-content').hasClass('nasa-light-new')) {
            _mobile_menu = '<ul id="mobile-navigation" class="header-nav nasa-menu-accordion nasa-menu-for-mobile">' + _mobile_menu + switch_lang + '</ul>';
        } else {
            _mobile_menu = '<ul id="mobile-navigation" class="header-nav nasa-menu-accordion nasa-menu-for-mobile">' + switch_lang + _mobile_menu + '</ul>';
        }

        if ($('#nasa-menu-sidebar-content #mobile-navigation').length) {
            $('#nasa-menu-sidebar-content #mobile-navigation').replaceWith(_mobile_menu);
        } else {
            $('#nasa-menu-sidebar-content .nasa-mobile-nav-wrap').append(_mobile_menu);
        }
        
        var _nav = $('#nasa-menu-sidebar-content #mobile-navigation');
        
        if ($(_nav).find('.nasa-select-currencies').length) {
            var _currency = $(_nav).find('.nasa-select-currencies');
            var _class = $(_currency).find('.wcml_currency_switcher').attr('class');
            _class += ' menu-item-has-children root-item li_accordion';
            var _currencyObj = $(_currency).find('.wcml-cs-active-currency').clone();
            $(_currencyObj).addClass(_class);
            $(_currencyObj).find('.wcml-cs-submenu').addClass('sub-menu');
            
            $(_nav).find('.nasa-select-currencies').replaceWith(_currencyObj);
        }

        $(_nav).find('.root-item > a').removeAttr('style');
        $(_nav).find('.nav-dropdown').attr('class', 'nav-dropdown-mobile').removeAttr('style');
        $(_nav).find('.nav-column-links').addClass('nav-dropdown-mobile');

        /**
         * Fix for nasa-core not active.
         */
        $(_nav).find('.sub-menu').each(function() {
            if (!$(this).parent('.nav-dropdown-mobile').length) {
                $(this).wrap('<div class="nav-dropdown-mobile"></div>');
            }
        });

        $(_nav).find('.nav-dropdown-mobile').find('.sub-menu').removeAttr('style');
        $(_nav).find('hr.hr-nasa-megamenu').remove();
        $(_nav).find('li').each(function(){
            if ($(this).hasClass('menu-item-has-children')){
                $(this).addClass('li_accordion');
                if ($(this).hasClass('current-menu-ancestor') || $(this).hasClass('current-menu-parent')){
                    $(this).addClass('active');
                    $(this).prepend('<a href="javascript:void(0);" class="accordion"></a>');
                } else {
                    $(this).prepend('<a href="javascript:void(0);" class="accordion"></a>').find('>.nav-dropdown-mobile').hide();
                }
            }
        });
        
        $(_nav).find('a').removeAttr('style');
        
        $('body').trigger('nasa_after_load_mobile_menu');
    }
}

/**
 * position Mobile menu
 * 
 * @param {type} $
 * @returns {undefined}
 */
function position_menu_mobile($) {
    if ($('#nasa-menu-sidebar-content').length) {
        if ($('#mobile-navigation').length && $('#mobile-navigation').attr('data-show') !== '1') {
            $('#nasa-menu-sidebar-content').removeClass('nasa-active');
                
            var _h_adminbar = $('#wpadminbar').length ? $('#wpadminbar').height() : 0;

            if (_h_adminbar > 0) {
                $('#nasa-menu-sidebar-content').css({'top': _h_adminbar});
            }
        }
    }
}

/**
 * Resize Menu Vertical
 * 
 * @param {type} $
 * @returns {undefined}
 */
function resize_megamenu_vertical($) {
    if ($('.wide-nav .nasa-vertical-header').length) {
        var _v_width = $('.wide-nav .nasa-vertical-header').width();
        _v_width = _v_width < 280 ? 280: _v_width;
        $('.wide-nav .vertical-menu-container').css({'width': _v_width});
        if ($('.wide-nav .vertical-menu-container.nasa-allways-show').length) {
            $('.wide-nav .vertical-menu-container.nasa-allways-show').addClass('nasa-active');
        }
    }
}

/**
 * Top categories filter
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_top_categories_filter($) {
    if ($('.nasa-top-cat-filter').length) {
        var _act;
        var _obj;

        $('.nasa-top-cat-filter').each(function() {
            var _this_filter = $(this);
            var _root_item = $(_this_filter).find('.root-item');
            _act = false;
            _obj = null;
            if ($(_root_item).length) {

                $(_root_item).each(function() {
                    var _this = $(this);
                    if ($(_this).hasClass('active')) {
                        $(_this).addClass('nasa-current-top');
                        _obj =  $(_this);
                        _act = true;
                    }
                    
                    $(_this).find('.children .nasa-current-note').remove();
                });

                if (!_act) {
                    $(_root_item).each(function() {
                        var _this = $(this);
                        if ($(_this).hasClass('cat-parent') && !_act) {
                            $(_this).addClass('nasa-current-top');
                            _obj =  $(_this);
                            _act = true;
                        }
                    });
                }

                if (_obj !== null) {
                    var init_width = $(_obj).width();
                    if (init_width) {
                        var _pos = $(_obj).position();
                        var _note_act = $(_obj).parents('.nasa-top-cat-filter').find('.nasa-current-note');
                        $(_note_act).css({
                            // visibility: 'visible',
                            width: init_width,
                            left: _pos.left,
                            top: ($(_obj).height() - 1)
                        });
                    }
                }
            }
        });
    }
}

/**
 * hover top categories filter
 * 
 * @param {type} $
 * @returns {undefined}
 */
function hover_top_categories_filter($) {
    $('body').on('mouseover', '.nasa-top-cat-filter .root-item', function() {
        var _obj = $(this),
            _wrap = $(_obj).parents('.nasa-top-cat-filter');
            
        $(_wrap).find('.root-item').removeClass('nasa-current-top');
        $(_obj).addClass('nasa-current-top');

        var _pos = $(_obj).position();
        var _note_act = $(_wrap).find('> .nasa-current-note');
        
        $(_note_act).css({
            // visibility: 'visible',
            width: $(_obj).width(),
            left: _pos.left,
            top: ($(_obj).height() - 1)
        });
        
        return false;
    });
}

/**
 * hover top child categories filter
 * 
 * @param {type} $
 * @returns {undefined}
 */
function hover_chilren_top_catogories_filter($) {
    $('body').on('mouseover', '.nasa-top-cat-filter .children .cat-item', function() {
        var _obj = $(this),
            _wrap = $(_obj).parent('.children');
        var _note_act = $(_wrap).find('>.nasa-current-note');
        
        if ($(_note_act).length <= 0) {
            $(_wrap).prepend('<li class="nasa-current-note"></li>');
            _note_act = $(_wrap).find('>.nasa-current-note');
        }
        
        $(_wrap).find('.cat-item').removeClass('nasa-current-child');
        $(_obj).addClass('nasa-current-child');

        var _pos = $(_obj).position();
        $(_note_act).css({
            // 'visibility': 'visible',
            width: $(_obj).width(),
            left: _pos.left,
            top: ($(_obj).height() - 1)
        });
        
        return false;
    });
}

/**
 * Init Mini Wishlist Icon
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_mini_wishlist($) {
    if ($('input[name="nasa_wishlist_cookie_name"]').length) {
        var _wishlistArr = get_wishlist_ids($);
        if (_wishlistArr.length) {
            if ($('.nasa-mini-number.wishlist-number').length) {
                var sl_wislist = _wishlistArr.length;
                $('.nasa-mini-number.wishlist-number').html(convert_count_items($, sl_wislist));
                
                if (sl_wislist > 0) {
                    $('.nasa-mini-number.wishlist-number').removeClass('nasa-product-empty');
                }
                
                if (sl_wislist === 0 && !$('.wishlist-number').hasClass('nasa-product-empty')) {
                    $('.nasa-mini-number.wishlist-number').addClass('nasa-product-empty');
                }
            }
        }
    }
}

/**
 * init Wishlist icons
 * 
 * @param {type} $
 * @param {type} init
 * @returns {undefined}
 */
function init_wishlist_icons($, init) {
    var _init = typeof init === 'undefined' ? false : init;
    
    /**
     * NasaTheme Wishlist
     */
    if ($('input[name="nasa_wishlist_cookie_name"]').length) {
        var _wishlistArr = get_wishlist_ids($);
        if (_wishlistArr.length) {
            $('.btn-wishlist').each(function() {
                var _this = $(this);
                var _prod = $(_this).attr('data-prod');

                if (_wishlistArr.indexOf(_prod) !== -1) {
                    if (!$(_this).hasClass('nasa-added')) {
                        $(_this).addClass('nasa-added');
                    }

                    if (!$(_this).find('.wishlist-icon').hasClass('added')) {
                        $(_this).find('.wishlist-icon').addClass('added');
                    }
                }

                else if (_init) {
                    if ($(_this).hasClass('nasa-added')) {
                        $(_this).removeClass('nasa-added');
                    }

                    if ($(_this).find('.wishlist-icon').hasClass('added')) {
                        $(_this).find('.wishlist-icon').removeClass('added');
                    }
                }
            });
        }
    }
    
    /**
     * support Yith WooCommerce Wishlist
     */
    else {
    
        if (
            $('.wishlist_sidebar .wishlist_table').length ||
            $('.wishlist_sidebar .nasa_yith_wishlist_premium-wrap .wishlist_table').length
        ) {
            var _wishlistArr = [];
            if ($('.wishlist_sidebar .wishlist_table .nasa-tr-wishlist-item').length) {
                $('.wishlist_sidebar .wishlist_table .nasa-tr-wishlist-item').each(function() {
                    _wishlistArr.push($(this).attr('data-row-id'));
                });
            }

            if ($('.wishlist_sidebar .nasa_yith_wishlist_premium-wrap .wishlist_table tbody tr').length) {
                $('.wishlist_sidebar .nasa_yith_wishlist_premium-wrap .wishlist_table tbody tr').each(function() {
                    _wishlistArr.push($(this).attr('data-row-id'));
                });
            }

            $('.btn-wishlist').each(function() {
                var _this = $(this);
                var _prod = $(_this).attr('data-prod');

                if (_wishlistArr.indexOf(_prod) !== -1) {
                    if (!$(_this).hasClass('nasa-added')) {
                        $(_this).addClass('nasa-added');
                    }

                    if (!$(_this).find('.wishlist-icon').hasClass('added')) {
                        $(_this).find('.wishlist-icon').addClass('added');
                    }
                }

                else if (_init) {
                    if ($(_this).hasClass('nasa-added')) {
                        $(_this).removeClass('nasa-added');
                    }

                    if ($(_this).find('.wishlist-icon').hasClass('added')) {
                        $(_this).find('.wishlist-icon').removeClass('added');
                    }
                }
            });
        }
    }
}

/**
 * init Compare icons
 * 
 * @param {type} $
 * @param {type} _init
 * @returns {undefined}
 */
function init_compare_icons($, _init) {
    var init = typeof _init !== 'undefined' ? _init : false;
    var _comparetArr = get_compare_ids($);
    
    if (init && $('.nasa-mini-number.compare-number').length) {
        var _slCompare = _comparetArr.length;
        $('.nasa-mini-number.compare-number').html(convert_count_items($, _slCompare));
        
        if (_slCompare <= 0) {
            if (!$('.nasa-mini-number.compare-number').hasClass('nasa-product-empty')) {
                $('.nasa-mini-number.compare-number').addClass('nasa-product-empty');
            }
        } else {
            $('.nasa-mini-number.compare-number').removeClass('nasa-product-empty');
        }
    }

    if (_comparetArr.length && $('.btn-compare').length) {
        $('.btn-compare').each(function() {
            var _this = $(this);
            var _prod = $(_this).attr('data-prod');

            if (_comparetArr.indexOf(_prod) !== -1) {
                if (!$(_this).hasClass('added')) {
                    $(_this).addClass('added');
                }
                if (!$(_this).hasClass('nasa-added')) {
                    $(_this).addClass('nasa-added');
                }
            } else {
                $(_this).removeClass('added');
                $(_this).removeClass('nasa-added');
            }
        });
    }
}

/**
 * Auto fill text to input
 * 
 * @param {type} $
 * @param {type} _input
 * @param {type} index
 * @returns {undefined}
 */
function auto_fill_input_placeholder($, _input, index) {
    var _index = typeof index !== 'undefined' ? index : 0;
    if (_index === 0) {
        $(_input).trigger('focus');
    }
    
    if (!$(_input).hasClass('nasa-placeholder')) {
        $(_input).addClass('nasa-placeholder');
        var _place = $(_input).attr('placeholder');
        $(_input).attr('data-placeholder', _place);
    }
    
    var str = $(_input).attr('data-suggestions');
    
    if (str && _index <= str.length) {
        if (!$(_input).hasClass('nasa-filling')) {
            $(_input).addClass('nasa-filling');
        }
        
        $(_input).attr('placeholder', str.substr(0, _index++));
        
        setTimeout(function() {
            auto_fill_input_placeholder($, _input, _index);
        }, 90);
    } else {
        if (!$(_input).hasClass('nasa-done')) {
            $(_input).addClass('nasa-done');
        }
        
        $(_input).removeClass('nasa-filling');
        
        setTimeout(function() {
            reverse_fill_input_placeholder($, _input);
        }, 400);
    }
}

/**
 * Reverse fill text to input
 * 
 * @param {type} $
 * @param {type} _input
 * @param {type} index
 * @returns {undefined}
 */
function reverse_fill_input_placeholder($, _input, index) {
    var _str = $(_input).attr('data-suggestions');
    var _index = typeof index !== 'undefined' ? index : (_str ? _str.length : 0);
    if (_index > 0) {
        $(_input).attr('placeholder', _str.substr(0, _index--));
        
        setTimeout(function() {
            reverse_fill_input_placeholder($, _input, _index);
        }, 20);
    } else {
        var _place = $(_input).attr('data-placeholder');
        $(_input).attr('placeholder', _place);
    }
}

/**
 * LOCK HOVER Add to cart
 * 
 * @param {type} $
 * @param {type} reset
 * @returns {undefined}
 */
function init_content_product_addtocart($, reset) {
    var _reset = typeof reset === 'undefined' ? false : reset;
    
    if (_reset) {
        $('.nasa-product-more-hover').removeClass('nasa-inited');
    }
    
    if ($('.nasa-product-more-hover .add-to-cart-grid, .nasa-product-more-hover .quick-view').length) {
        var toggleWidth = $('input[name="nasa-toggle-width-add-to-cart"]').length ? parseInt($('input[name="nasa-toggle-width-add-to-cart"]').val()) : 100;
        if (!toggleWidth) {
            toggleWidth = 100;
        }
        
        $('.nasa-product-more-hover .add-to-cart-grid, .nasa-product-more-hover .quick-view').each(function() {
            var _this = $(this);
            var _wrap = $(_this).parents('.nasa-product-more-hover');
            if (!$(_wrap).hasClass('nasa-inited')) {
                if ($(_this).width() < toggleWidth) {
                    $(_wrap).find('.quick-view .nasa-icon').removeClass('hidden-tag');
                    $(_wrap).find('.quick-view .nasa-text').addClass('hidden-tag');
                    
                    $(_wrap).find('.add-to-cart-grid .nasa-icon').show();
                    $(_wrap).find('.add-to-cart-grid .nasa-text').hide();
                } else {
                    $(_wrap).find('.quick-view .nasa-icon').addClass('hidden-tag');
                    $(_wrap).find('.quick-view .nasa-text').removeClass('hidden-tag');
                    
                    $(_wrap).find('.add-to-cart-grid .nasa-icon').hide();
                    $(_wrap).find('.add-to-cart-grid .nasa-text').show();
                }
                
                $(_wrap).addClass('nasa-inited');
            }
        });
    }
}

/**
 * Event after added to cart
 * Popup Your Order
 * 
 * @param {type} $
 * @returns {undefined}
 */
function after_added_to_cart($) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_after_add_to_cart');
        
        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
                'nasa_action': 'nasa_after_add_to_cart'
            },
            beforeSend: function () {
                /**
                 * Append stylesheet Off Canvas
                 */
                $('body').trigger('nasa_append_style_off_canvas');
            },
            success: function (response) {
                if (response.success === '1') {
                    if ($('.nasa-after-add-to-cart-popup').length) {
                        $('.nasa-after-add-to-cart-popup .nasa-after-add-to-cart-wrap').html(response.content);
                        if ($('.nasa-after-add-to-cart-popup .nasa-slick-slider').length) {
                            after_load_ajax_list($, false);
                        }
                    }
                    else {
                        $.magnificPopup.open({
                            items: {
                                src: '<div class="nasa-after-add-to-cart-popup nasa-bot-to-top"><div class="nasa-after-add-to-cart-wrap">' + response.content + '</div></div>',
                                type: 'inline'
                            },
                            // tClose: $('input[name="nasa-close-string"]').val(),
                            closeMarkup: '<a class="nasa-mfp-close nasa-stclose" href="javascript:void(0);" title="' + $('input[name="nasa-close-string"]').val() + '"></a>',
                            callbacks: {
                                open: function() {
                                    if ($('.nasa-after-add-to-cart-popup .nasa-slick-slider').length) {
                                        after_load_ajax_list($, false);
                                    }
                                },
                                beforeClose: function() {
                                    this.st.removalDelay = 350;
                                }
                            }
                        });
                    }

                    setTimeout(function() {
                        $('.after-add-to-cart-shop_table').addClass('shop_table');
                        $('.nasa-table-wrap').addClass('nasa-active');
                    }, 100);
                    
                    $('.black-window').trigger('click');
                } else {
                    $.magnificPopup.close();
                }
                
                $('.nasa-after-add-to-cart-wrap').removeAttr('style');
                $('.nasa-after-add-to-cart-wrap').removeClass('processing');
                
                setTimeout(function() {
                    init_shipping_free_notification($);
                }, 300);
            },
            error: function () {
                $.magnificPopup.close();
            }
        });
    }
}

/**
 * Reload MiniCart
 * 
 * @param {type} $
 * @returns {undefined}
 */
function reload_mini_cart($) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_reload_fragments');
        
        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
                time: new Date().getTime()
            },
            success: function (data) {
                if (data && data.fragments) {

                    $.each(data.fragments, function(key, value) {
                        if ($(key).length) {
                            $(key).replaceWith(value);
                        }
                    });

                    if (typeof $supports_html5_storage !== 'undefined' && $supports_html5_storage) {
                        sessionStorage.setItem(
                            wc_cart_fragments_params.fragment_name,
                            JSON.stringify(data.fragments)
                        );
                        set_cart_hash(data.cart_hash);

                        if (data.cart_hash) {
                            set_cart_creation_timestamp();
                        }
                    }

                    $(document.body).trigger('wc_fragments_refreshed');
                    
                    /**
                     * notification free shipping
                     */
                    init_shipping_free_notification($);
                }

                $('#cart-sidebar').find('.nasa-loader').remove();
            },
            error: function () {
                $(document.body).trigger('wc_fragments_ajax_error');
                $('#cart-sidebar').find('.nasa-loader').remove();
            }
        });
    }
}

/**
 * Init Shipping free notification
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_shipping_free_notification($) {
    if ($('.nasa-total-condition').length) {
        $('.nasa-total-condition').each(function() {
            if (!$(this).hasClass('nasa-active')) {
                $(this).addClass('nasa-active');
                var _per = $(this).attr('data-per');
                $(this).find('.nasa-total-condition-hint, .nasa-subtotal-condition').css({'width': _per + '%'});
            }
        });
    }
}

/**
 * Init Widgets Toggle
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_widgets($) {
    if ($('.widget').length && !$('body').hasClass('nasa-disable-toggle-widgets')) {
        $('.widget').each(function() {
            var _this = $(this);
            if (!$(_this).hasClass('nasa-inited')) {

                var _key = $(_this).attr('id');

                var _title = '';

                if ($(_this).find('.widget-title').length) {
                    _title = $(_this).find('.widget-title').clone();
                    $(_this).find('.widget-title').remove();
                }

                if (_key && _title !== '') {
                    var _cookie = $.cookie(_key);
                    var _a_toggle = '<a href="javascript:void(0);" class="nasa-toggle-widget"></a>';
                    var _wrap = '<div class="nasa-open-toggle"></div>';
                    if (_cookie === 'hide') {
                        _a_toggle = '<a href="javascript:void(0);" class="nasa-toggle-widget nasa-hide"></a>';
                        _wrap = '<div class="nasa-open-toggle widget-hidden"></div>';
                    }
                    
                    $(_this).wrapInner(_wrap);
                    
                    $(_this).prepend(_a_toggle);
                    $(_this).prepend(_title);
                }

                $(_this).addClass('nasa-inited');
            }
        });
    }
}

/**
 * init Notices
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_nasa_notices($) {
    if ($('.woocommerce-notices-wrapper').length) {
        $('.woocommerce-notices-wrapper').each(function() {
            if ($(this).find('*').length && $(this).find('.nasa-close-notice').length <= 0) {
                $(this).append('<a class="nasa-close-notice" href="javascript:void(0);"></a>');
            }
        });
    }
}

/**
 * set Notice
 * 
 * @param {type} $
 * @param {type} content
 * @returns {undefined}
 */
function set_nasa_notice($, content) {
    if ($('.woocommerce-notices-wrapper').length <= 0) {
        $('body').append('<div class="woocommerce-notices-wrapper"></div>');
    }

    $('.woocommerce-notices-wrapper').html(content);
    init_nasa_notices($);
}

/**
 * 
 * @param {type} $
 * @returns {undefined}get Compare ids
 */
function get_compare_ids($) {
    if ($('input[name="nasa_woocompare_cookie_name"]').length) {
        var _cookie_compare = $('input[name="nasa_woocompare_cookie_name"]').val();
        var _pids = $.cookie(_cookie_compare);
        if (_pids) {
            _pids = _pids.replace('[','').replace(']','').split(",").map(String);
            
            if (_pids.length === 1 && !_pids[0]) {
                return [];
            }
        }
        
        return typeof _pids !== 'undefined' && _pids.length ? _pids : [];
    } else {
        return [];
    }
}

/**
 * 
 * @param {type} $
 * @returns {undefined}get Compare ids
 */
function get_wishlist_ids($) {
    if ($('input[name="nasa_wishlist_cookie_name"]').length) {
        var _cookie_wishlist = $('input[name="nasa_wishlist_cookie_name"]').val();
        var _pids = $.cookie(_cookie_wishlist);
        if (_pids) {
            _pids = _pids.replace('[', '').replace(']', '').split(",").map(String);
            
            if (_pids.length === 1 && !_pids[0]) {
                return [];
            }
        }
        
        return typeof _pids !== 'undefined' && _pids.length ? _pids : [];
    } else {
        return [];
    }
}

/**
 * Load Wishlist
 */
var _wishlist_init = false;
function load_wishlist($) {
    if ($('#nasa-wishlist-sidebar-content').length && !_wishlist_init) {
        _wishlist_init = true;
        
        if (
            typeof nasa_ajax_params !== 'undefined' &&
            typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
        ) {
            var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_load_wishlist');
            $.ajax({
                url: _urlAjax,
                type: 'post',
                dataType: 'json',
                cache: false,
                data: {},
                beforeSend: function () {
                    
                },
                success: function (res) {
                    if (typeof res.success !== 'undefined' && res.success === '1') {
                        $('#nasa-wishlist-sidebar-content').replaceWith(res.content);
                        
                        if ($('.nasa-tr-wishlist-item.item-invisible').length) {
                            var _remove = [];
                            $('.nasa-tr-wishlist-item.item-invisible').each(function() {
                                var product_id = $(this).attr('data-row-id');
                                if (product_id) {
                                    _remove.push(product_id);
                                }
                                
                                $(this).remove();
                            });
                            
                            var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', 'nasa_remove_wishlist_hidden');
                            
                            $.ajax({
                                url: _urlAjax,
                                type: 'post',
                                dataType: 'json',
                                cache: false,
                                data: {
                                    product_ids: _remove
                                },
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    if (typeof response.success !== 'undefined' && response.success === '1') {
                                        var sl_wislist = parseInt(response.count);
                                        $('.nasa-mini-number.wishlist-number').html(convert_count_items($, sl_wislist));
                                        if (sl_wislist > 0) {
                                            $('.nasa-mini-number.wishlist-number').removeClass('nasa-product-empty');
                                        }
                                        else if (sl_wislist === 0 && !$('.nasa-mini-number.wishlist-number').hasClass('nasa-product-empty')) {
                                            $('.nasa-mini-number.wishlist-number').addClass('nasa-product-empty');
                                        }
                                    }
                                },
                                error: function () {

                                }
                            });
                        }
                    }
                },
                error: function () {

                }
            });
        }
    }
}

/**
 * Add wishlist item NasaTheme Wishlist
 * @param {type} $
 * @param {type} _pid
 * @returns {undefined}
 */
var _nasa_clear_notice_wishlist;
function nasa_process_wishlist($, _pid, _action) {
    if (
        typeof nasa_ajax_params !== 'undefined' &&
        typeof nasa_ajax_params.wc_ajax_url !== 'undefined'
    ) {
        var _urlAjax = nasa_ajax_params.wc_ajax_url.toString().replace('%%endpoint%%', _action);
        
        var _data = {
            product_id: _pid
        };
        
        if ($('.widget_shopping_wishlist_content').length) {
            _data['show_content'] = '1';
        }
        $.ajax({
            url: _urlAjax,
            type: 'post',
            dataType: 'json',
            cache: false,
            data: _data,
            beforeSend: function () {
                if ($('.nasa-close-notice').length) {
                    $('.nasa-close-notice').trigger('click');
                }
                
                if (typeof _nasa_clear_notice_wishlist !== 'undefined') {
                    clearTimeout(_nasa_clear_notice_wishlist);
                }
            },
            success: function (res) {
                if (typeof res.success !== 'undefined' && res.success === '1') {
                    var sl_wislist = parseInt(res.count);
                    $('.nasa-mini-number.wishlist-number').html(convert_count_items($, sl_wislist));
                    if (sl_wislist > 0) {
                        $('.nasa-mini-number.wishlist-number').removeClass('nasa-product-empty');
                    }
                    else if (sl_wislist === 0 && !$('.nasa-mini-number.wishlist-number').hasClass('nasa-product-empty')) {
                        $('.nasa-mini-number.wishlist-number').addClass('nasa-product-empty');
                    }
                    
                    if (_action === 'nasa_add_to_wishlist') {
                        $('.btn-wishlist[data-prod="' + _pid + '"]').each(function() {
                            if (!$(this).hasClass('nasa-added')) {
                                $(this).addClass('nasa-added');
                            }
                        });
                    }
                    
                    if (_action === 'nasa_remove_from_wishlist') {
                        $('.btn-wishlist[data-prod="' + _pid + '"]').removeClass('nasa-added');
                    }
                    
                    if ($('.widget_shopping_wishlist_content').length && typeof res.content !== 'undefined' && res.content) {
                        $('.widget_shopping_wishlist_content').replaceWith(res.content);
                    }

                    if (typeof res.mess !== 'undefined' && res.mess) {
                        set_nasa_notice($, res.mess);
                    }

                    _nasa_clear_notice_wishlist = setTimeout(function() {
                        if ($('.nasa-close-notice').length) {
                            $('.nasa-close-notice').trigger('click');
                        }
                    }, 5000);
                    
                    $('body').trigger('nasa_processed_wishlish', [_pid, _action]);
                }
                
                $('.btn-wishlist').removeClass('nasa-disabled');
            },
            error: function () {
                $('.btn-wishlist').removeClass('nasa-disabled');
            }
        });
    }
}

/**
 * Convert Count Items
 * 
 * @param {type} number
 * @returns {String}
 */
function convert_count_items($, number) {
    var _number = parseInt(number);
    if ($('input[name="nasa_less_total_items"]').length && $('input[name="nasa_less_total_items"]').val() === '1') {
        return _number > 9 ? '9+' : _number.toString();
    } else {
        return _number.toString();
    }
}

/**
 * Animate Scroll to Top
 * 
 * @param {type} $
 * @param {type} _dom
 * @param {type} _ms
 * @returns {undefined}
 */
function animate_scroll_to_top($, _dom, _ms) {
    var ms = typeof _ms === 'undefined' ? 500 : _ms;
    var _pos_top = 0;
    if (typeof _dom !== 'undefined' && _dom && $(_dom).length) {
        _pos_top = $(_dom).offset().top;
    }

    if (_pos_top) {
        if ($('body').find('.nasa-header-sticky').length && $('.sticky-wrapper').length) {
            _pos_top = _pos_top - 100;
        }

        if ($('#wpadminbar').length) {
            _pos_top = _pos_top - $('#wpadminbar').height();
        }
        
        _pos_top = _pos_top - 10;
    }

    $('html, body').animate({scrollTop: _pos_top}, ms);
}

/**
 * init accordion
 */
function init_accordion($) {
    if ($('.nasa-accordions-content .nasa-accordion-title a').length) {
        $('.nasa-accordions-content').each(function() {
            if (!$(this).hasClass('nasa-inited')) {
                $(this).addClass('nasa-inited');
                
                if ($(this).hasClass('nasa-accodion-first-hide')) {
                    $(this).find('.nasa-accordion.first').removeClass('active');
                    $(this).find('.nasa-panel.first').removeClass('active');
                    $(this).removeClass('nasa-accodion-first-hide');
                } else {
                    $(this).find('.nasa-panel.first.active').slideDown(200);
                }
            }
        });
    }
}

/**
 * init Header Responsive
 * 
 * @param {type} $
 * @returns {undefined}
 */
function init_header_responsive($) {
    if ($('#tmpl-nasa-responsive-header').length && ($('.nasa-menu-off').length || ($('.nasa-mobile-check').length && $('.nasa-mobile-check').width()))) {
        if ($('#masthead').length && $('#masthead').find('.header-responsive').length <= 0) {
            var _header = $('#tmpl-nasa-responsive-header').html();
            if (_header !== '') {
                $('#masthead').prepend(_header);
            }
        }
    }
}
