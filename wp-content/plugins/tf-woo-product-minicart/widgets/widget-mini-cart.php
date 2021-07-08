<?php
if (!class_exists('TFMiniCart_Widget')) {
	class TFMiniCart_Widget extends \Elementor\Widget_Base {

		public function get_name() {
	        return 'tf-mini-cart';
	    }
	    
	    public function get_title() {
	        return esc_html__( 'TF Woo Mini Cart', 'tf-addon-for-elementer' );
	    }

	    public function get_icon() {
	        return 'eicon-cart';
	    }

	    public function get_style_depends(){
		    return ['all-font-awesome', 'tf-woo-product-minicart'];
	  	}

	    public function get_script_depends(){
		    return ['tf-woo-product-minicart'];
		}
	    
	    public function get_categories() {
	        return [ 'themesflat_addons_wc' ];
	    }

		protected function _register_controls() {
	        // Start General        
				$this->start_controls_section( 
					'section_mini_cart',
		            [
		                'label' => esc_html__('General', 'tf-addon-for-elementer'),
		            ]
		        );	

		        $this->add_control(
					'style',
					[
						'label' => esc_html__( 'Style', 'tf-addon-for-elementer' ),
						'type' => \Elementor\Controls_Manager::SELECT,
						'default' => 'icon-text',
						'options' => [
							'only-icon'  => esc_html__( 'Only Icon', 'tf-addon-for-elementer' ),
							'icon-text' => esc_html__( 'Icon & Text', 'tf-addon-for-elementer' ),
						],
					]
				);

				$this->add_responsive_control(
					'align',
					[
						'label' => esc_html__( 'Alignment', 'tf-addon-for-elementer' ),
						'type' => \Elementor\Controls_Manager::CHOOSE,
						'options' => [
							'left'    => [
								'title' => esc_html__( 'Left', 'tf-addon-for-elementer' ),
								'icon' => 'eicon-text-align-left',
							],
							'center' => [
								'title' => esc_html__( 'Center', 'tf-addon-for-elementer' ),
								'icon' => 'eicon-text-align-center',
							],
							'right' => [
								'title' => esc_html__( 'Right', 'tf-addon-for-elementer' ),
								'icon' => 'eicon-text-align-right',
							],
						],
						'default' => 'right',
						'selectors' => [
							'{{WRAPPER}} .tf-mini-cart' => 'text-align: {{VALUE}};text-align: -webkit-{{VALUE}};',
						],
					]
				);

				$this->add_responsive_control( 
		        	'padding',
					[
						'label' => esc_html__( 'Padding', 'tf-addon-for-elementer' ),
						'type' => \Elementor\Controls_Manager::DIMENSIONS,
						'selectors' => [
							'{{WRAPPER}} .tf-mini-cart' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						],
					]
				);	

				$this->add_responsive_control( 
					'margin',
					[
						'label' => esc_html__( 'Margin', 'tf-addon-for-elementer' ),
						'type' => \Elementor\Controls_Manager::DIMENSIONS,
						'selectors' => [
							'{{WRAPPER}} .tf-mini-cart' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						],
					]
				);  

		        $this->end_controls_section();
	        // /.End General

		    // Start Icon  
			    $this->start_controls_section( 
						'section_style_icon',
			            [
			                'label' => esc_html__('Icon', 'tf-addon-for-elementer'),
			            ]
			        );

			    	$this->add_control(
						'icon',
						[
							'label' => esc_html__( 'Icon', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::ICONS,
							'default' => [
								'value' => 'fas fa-shopping-basket',
								'library' => 'solid',
							],
						]
					);

					$this->add_control(
						'icon_font_size',
						[
							'label' => esc_html__( 'Icon Font Size', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => 0,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 14,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .icon-cart' => 'font-size: {{SIZE}}{{UNIT}};',
							],
						]
					);

					$this->add_control(
						'icon_size',
						[
							'label' => esc_html__( 'Icon Size', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => 0,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 40,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .icon-cart' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
							],
						]
					);				

					$this->add_group_control( 
						\Elementor\Group_Control_Border::get_type(),
						[
							'name' => 'icon_border',
							'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
							'selector' => '{{WRAPPER}} .tf-mini-cart .icon-cart',
						]
					);    

					$this->add_responsive_control( 
						'icon_border_radius',
						[
							'label' => esc_html__( 'Border Radius', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::DIMENSIONS,
							'size_units' => [ 'px' , '%' ],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .icon-cart' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
								'{{WRAPPER}} .tf-mini-cart .mini-cart .icon-cart:before' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							],
						]
					);

					$this->add_group_control( 
						\Elementor\Group_Control_Box_Shadow::get_type(),
						[
							'name' => 'icon_box_shadow',
							'label' => esc_html__( 'Box Shadow', 'tf-addon-for-elementer' ),
							'selector' => '{{WRAPPER}} .tf-mini-cart .icon-cart',
						]
					); 

					$this->start_controls_tabs( 'icon_color_tabs' );				

						$this->start_controls_tab( 
							'icon_color_normal_tab',
							[
								'label' => esc_html__( 'Normal', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'icon_color',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#ffffff',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .icon-cart' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'icon_background_color',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#03b162',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .icon-cart' => 'background-color: {{VALUE}}',
										'{{WRAPPER}} .tf-mini-cart .mini-cart .icon-cart:before' => 'color: {{VALUE}}',
									],
								]
							);
						$this->end_controls_tab();

						$this->start_controls_tab( 
							'icon_color_hover_tab',
							[
								'label' => esc_html__( 'Hover', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'icon_color_hover',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .icon-cart:hover' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'icon_background_color_hover',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .icon-cart:hover' => 'background-color: {{VALUE}}',
										'{{WRAPPER}} .tf-mini-cart .mini-cart .icon-cart:hover:before' => 'color: {{VALUE}}',
									],
								]
							);
						$this->end_controls_tab();

					$this->end_controls_tabs();				

			   	$this->end_controls_section();
	        // /.End Icon

			// Start Count  
			    $this->start_controls_section( 
						'section_style_count',
			            [
			                'label' => esc_html__('Count', 'tf-addon-for-elementer'),
			            ]
			        );

			    	$this->add_group_control(
						\Elementor\Group_Control_Typography::get_type(),
						[
							'name' => 'count_typography',
							'selector' => '{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents',
						]
					);

					$this->add_control(
						'count_size',
						[
							'label' => esc_html__( 'Icon Size', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => 0,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 20,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
							],
						]
					);

					$this->add_control(
						'count_offset_x',
						[
							'label' => esc_html__( 'Offset Horizontal', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => -100,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => -10,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'top: {{SIZE}}{{UNIT}};',
							],
						]
					);

					$this->add_control(
						'count_offset_y',
						[
							'label' => esc_html__( 'Offset Vertical', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => -100,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 0,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'right: {{SIZE}}{{UNIT}};',
							],
						]
					);

					$this->add_control( 
						'count_color',
						[
							'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::COLOR,
							'default' => '#203b48',
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'color: {{VALUE}}',
							],
						]
					);

					$this->add_control( 
						'count_background_color',
						[
							'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::COLOR,
							'default' => '#fbd83f',
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'background-color: {{VALUE}}',
							],
						]
					);

					$this->add_responsive_control( 
						'count_border_radius',
						[
							'label' => esc_html__( 'Border Radius', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::DIMENSIONS,
							'size_units' => [ 'px' , '%' ],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .cart-contents' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							],
						]
					);

			   	$this->end_controls_section();
	        // /.End Count

			// Start Text  
			    $this->start_controls_section( 
						'section_style_text',
			            [
			                'label' => esc_html__('Text', 'tf-addon-for-elementer'),
			                'condition' => [
			                	'style' => 'icon-text'
			                ]
			            ]
			        );

			    	$this->add_control(
						'text_spacing',
						[
							'label' => esc_html__( 'Spacing', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => 0,
									'max' => 100,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 10,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .wrap-cart-count .content-text' => 'padding-left: {{SIZE}}{{UNIT}};',
							],
						]
					);

			    	$this->add_control(
						'h_text',
						[
							'label' => esc_html__( 'Text', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::HEADING,
						]
					);

			    	$this->add_control(
						'text',
						[
							'label' => esc_html__( 'Text', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::TEXT,
							'default' => esc_html__( 'ADD TO CART', 'tf-addon-for-elementer' ),
						]
					);

			    	$this->add_group_control(
						\Elementor\Group_Control_Typography::get_type(),
						[
							'name' => 'text_typography',
							'selector' => '{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h5, {{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h6',
						]
					);

					$this->add_control( 
						'text_color',
						[
							'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::COLOR,
							'default' => '#203b48',
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h5, {{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h6' => 'color: {{VALUE}}',
							],
						]
					);

					$this->add_responsive_control( 
						'text_margin',
						[
							'label' => esc_html__( 'Margin', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::DIMENSIONS,
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h5, {{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content h6' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							],
						]
					);

					$this->add_control(
						'h_text_count',
						[
							'label' => esc_html__( 'Count', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::HEADING,
							'separator' => 'before',
						]
					);

					$this->add_control(
						'text_count',
						[
							'label' => esc_html__( 'Text Count', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::TEXT,
							'default' => esc_html__( 'Item:', 'tf-addon-for-elementer' ),
						]
					);

					$this->add_group_control(
						\Elementor\Group_Control_Typography::get_type(),
						[
							'name' => 'text_count_typography',
							'selector' => '{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content div',
						]
					);

					$this->add_control( 
						'text_count_color',
						[
							'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::COLOR,
							'default' => '#707d84',
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content div' => 'color: {{VALUE}}',
							],
						]
					);

					$this->add_responsive_control( 
						'text_count_margin',
						[
							'label' => esc_html__( 'Margin', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::DIMENSIONS,
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .wrap-cart-count .wrap-count-content div' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							],
						]
					);

			   	$this->end_controls_section();
	        // /.End Text

			// Start Canvas  
			    $this->start_controls_section( 
						'section_style_canvas',
			            [
			                'label' => esc_html__('Canvas', 'tf-addon-for-elementer'),
			            ]
			        );

					$this->add_control(
						'canvas_width',
						[
							'label' => esc_html__( 'Width', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::SLIDER,
							'size_units' => [ 'px' ],
							'range' => [
								'px' => [
									'min' => 0,
									'max' => 1000,
									'step' => 1,
								],
							],
							'default' => [
								'unit' => 'px',
								'size' => 480,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .widget_shopping_cart' => 'width: {{SIZE}}{{UNIT}};',
							],
						]
					);

					$this->add_responsive_control( 
			        	'canvas_padding',
						[
							'label' => esc_html__( 'Padding', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::DIMENSIONS,
							'size_units' => [ 'px', '%', 'em' ],
							'default' => [
								'top' => 30,
								'right' => 40,
								'bottom' => 20,
								'left' => 40,
								'unit' => 'px',
								'isLinked' => true,
							],
							'selectors' => [
								'{{WRAPPER}} .tf-mini-cart .mini-cart .widget_shopping_cart' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							],
						]
					);	

					$this->add_group_control( 
						\Elementor\Group_Control_Border::get_type(),
						[
							'name' => 'canvas_border',
							'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
							'selector' => '{{WRAPPER}} .tf-mini-cart .mini-cart .widget_shopping_cart',
						]
					);

					$this->add_group_control( 
						\Elementor\Group_Control_Box_Shadow::get_type(),
						[
							'name' => 'canvas_box_shadow',
							'label' => esc_html__( 'Box Shadow', 'tf-addon-for-elementer' ),
							'selector' => '{{WRAPPER}} .tf-mini-cart .mini-cart .widget_shopping_cart',
						]
					);

					$this->add_control(
						'h_btn_view_cart',
						[
							'label' => esc_html__( 'Button View Cart', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::HEADING,
							'separator' => 'before',
						]
					);

					$this->start_controls_tabs( 'view_cart_color_tabs' );				

						$this->start_controls_tab( 
							'view_cart_color_normal_tab',
							[
								'label' => esc_html__( 'Normal', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'view_cart_color',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#ffffff',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'view_cart_background_color',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#03b162',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward' => 'background-color: {{VALUE}}',
									],
								]
							);

							$this->add_group_control( 
								\Elementor\Group_Control_Border::get_type(),
								[
									'name' => 'view_cart_border',
									'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
									'selector' => '{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward',
								]
							);
						$this->end_controls_tab();

						$this->start_controls_tab( 
							'view_cart_color_hover_tab',
							[
								'label' => esc_html__( 'Hover', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'view_cart_color_hover',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward:hover' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'view_cart_background_color_hover',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward:hover' => 'background-color: {{VALUE}}',
									],
								]
							);

							$this->add_group_control( 
								\Elementor\Group_Control_Border::get_type(),
								[
									'name' => 'view_cart_border_hover',
									'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
									'selector' => '{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward',
								]
							);
						$this->end_controls_tab();

					$this->end_controls_tabs();

					$this->add_control(
						'h_btn_checkout',
						[
							'label' => esc_html__( 'Button Checkout', 'tf-addon-for-elementer' ),
							'type' => \Elementor\Controls_Manager::HEADING,
							'separator' => 'before',
						]
					);

					$this->start_controls_tabs( 'checkout_color_tabs' );				

						$this->start_controls_tab( 
							'checkout_color_normal_tab',
							[
								'label' => esc_html__( 'Normal', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'checkout_color',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#203b48',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'checkout_background_color',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => 'rgba(255,255,255,0)',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout' => 'background-color: {{VALUE}}',
									],
								]
							);

							$this->add_group_control( 
								\Elementor\Group_Control_Border::get_type(),
								[
									'name' => 'checkout_border',
									'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
									'selector' => '{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout',
								]
							);
						$this->end_controls_tab();

						$this->start_controls_tab( 
							'checkout_color_hover_tab',
							[
								'label' => esc_html__( 'Hover', 'tf-addon-for-elementer' ),						
							]
							);
							$this->add_control( 
								'checkout_color_hover',
								[
									'label' => esc_html__( 'Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#ffffff',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout:hover' => 'color: {{VALUE}}',
									],
								]
							);

							$this->add_control( 
								'checkout_background_color_hover',
								[
									'label' => esc_html__( 'Background Color', 'tf-addon-for-elementer' ),
									'type' => \Elementor\Controls_Manager::COLOR,
									'default' => '#03b162',
									'selectors' => [
										'{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout:hover' => 'background-color: {{VALUE}}',
									],
								]
							);

							$this->add_group_control( 
								\Elementor\Group_Control_Border::get_type(),
								[
									'name' => 'checkout_border_hover',
									'label' => esc_html__( 'Border', 'tf-addon-for-elementer' ),
									'selector' => '{{WRAPPER}} .tf-mini-cart .woocommerce.widget_shopping_cart .buttons a.wc-forward.checkout',
								]
							);
						$this->end_controls_tab();

					$this->end_controls_tabs();

			   	$this->end_controls_section();
	        // /.End Canvas

		}

		protected function render($instance = []) {
			$settings = $this->get_settings_for_display();
			
			$count = TFWoo_Pro_Mini_Addon_Elementor::themesflat_mini_cart_count();		
			?>
			<div class="tf-mini-cart">
				<div class="mini-cart">
	                <div class="cart-count">
	                    <div id="mini-cart-click" class="wrap-cart-count">
	                        <div class="wrap-count-content">
	                            <div class="inner-cart-count">
	                                <a class="icon-cart" href="<?php echo wc_get_cart_url(); ?>" title="<?php esc_html__( 'View your shopping cart', 'tf-addon-for-elementer' ); ?>"><?php \Elementor\Icons_Manager::render_icon( $settings['icon'], [ 'aria-hidden' => 'true' ] ); ?></a>            
	                                <a class="cart-contents" href="<?php echo wc_get_cart_url(); ?>" title="<?php esc_html__( 'View your shopping cart', 'tf-addon-for-elementer' ); ?>">                
	                                    <?php
	                                    if ( $count > 0 ): ?>
	                                        <span class="cart-contents-count"><?php echo esc_attr( $count ); ?></span>
	                                    <?php else: ?>
	                                        <span class="cart-contents-count">0</span>
	                                    <?php endif; ?>
	                                </a>
	                            </div>
	                            <?php if($settings['style'] == 'icon-text'): ?>
	                            <div class="content-text">
	                                <h5><?php echo esc_attr($settings['text']); ?></h5>
	                                <div>
		                                <?php echo sprintf('( %1$s <span class="cart-contents-count">%2$s</span> )',$settings['text_count'], $count ); ?>
		                            </div>
	                            </div>
	                        	<?php endif; ?>
	                        </div>
	                    </div>
	                    <div class="overlay-mini-cart"></div>
	                    <div id="canvas-mini-cart" class="widget woocommerce widget_shopping_cart"> 
	                    	<div class="top-mini-cart">
		                    	<h4 class="cart-title"><?php echo esc_html__('Cart','tf-addon-for-elementer'); ?></h4>
		                    	<span class="cart-close close-icon"><i class="fas fa-times"></i></span>   
	                    	</div>               	
	                        <div class="widget_shopping_cart_content"> 
	                            <?php if ( class_exists( 'woocommerce' ) ) { 
	                            	if ( ! empty( WC()->cart) ) { woocommerce_mini_cart(); }
	                            } ?>
	                        </div>	                    
	                    </div>
	                </div>                               
	            </div>
			</div>
			<?php
		}

		protected function _content_template() {}	

	}
}