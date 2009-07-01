(function(jQuery) {
	jQuery.fn.checkboxTree = function(settings) {
		settings = jQuery.extend({
			collapsedarrow: "img-arrow-collapsed.gif",
			expandedarrow: "img-arrow-expanded.gif",
			blankarrow: "img-arrow-blank.gif",
			checkchildren: false
		}, settings);
		var $group = this;
		jQuery(":checkbox + label",$group).click(function(){
			jQuery(this).prev().attr({checked: !jQuery(this).prev().attr("checked")}).end().toggleClass("checked");
		}).each( function(){
			if (jQuery(this).prev()[0].checked )
				jQuery(this).addClass("checked");
		}).hover( 
			function() { jQuery(this).addClass("over"); },
			function() { jQuery(this).removeClass("over"); }
		).prev().hide();
		if(settings.checkchildren==true){
			jQuery(":checkbox + label",$group).click(function(){
				var $currclick = jQuery(this);
				var $currrow = jQuery(this).parents("li:first")
				$currrow.find(":checkbox + label").prev().attr({checked: $currclick.prev().attr("checked")?"checked":""})
				.next().addClass($currclick.hasClass("checked")?"checked":"").removeClass($currclick.hasClass("checked")?"":"checked")
			})
		}
		jQuery("li",$group).each(function(){
			var $currentLi = jQuery(this);
			if($currentLi.is(":has(ul)")){
				//check the parent boxes if a child is selected
				if((!$currentLi.children("input:checkbox:first").is(":checked")) && (jQuery("ul li input:checked",$currentLi).length>0)){
					$currentLi.find("label:first").trigger("click");
				}
				$currentLi.children("ul").hide();
				var $collapseImage = jQuery('<img src="' + settings.collapsedarrow + '" / >')
				$collapseImage.toggle(function(){
					$currentLi.children("ul").show();
					$currentLi.children("img").attr("src",settings.expandedarrow);
				},function(){
					$currentLi.children("ul").hide();
					$currentLi.children("img").attr("src",settings.collapsedarrow);
				})
				jQuery("ul li input:checkbox",$currentLi).next().click(function(){
					if((!$currentLi.children("input:checkbox:first").is(":checked")) && (jQuery("ul li input:checked",$currentLi).length>0)){
						$currentLi.find("label:first").addClass("checked").prev().attr("checked","checked")
					}
				});
				jQuery("input:checkbox",$currentLi).next().click(function(){
					if(jQuery("ul li input:checked",jQuery(this).parent("li")).length>0){
						jQuery(this).addClass("checked").prev().attr("checked","checked");
					}
				});
				$currentLi.prepend($collapseImage);
			}else{
				var $collapseImage = jQuery('<img src="' + settings.blankarrow + '" / >')
				$currentLi.prepend($collapseImage);
			}
		})
		
		return $group;
	};
})(jQuery);

