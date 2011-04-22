(function(jQuery) {
	jQuery.fn.checkboxTree = function(settings) {

		settings = jQuery.extend({
			collapsedarrow: "img-arrow-collapsed.gif",
			expandedarrow: "img-arrow-expanded.gif",
			blankarrow: "img-arrow-blank.gif",
			activeClass: "checkboxtreeactive",
			hoverClass: "over",
			checkchildren: false,
			checkparents: true,
			collapsed: true,
			hidecbwithjs:false,
			checkedClass: "checked"
		}, settings);

		var 
		$group = this, 
		$labels = jQuery(":checkbox + label",$group), 
		$checkboxes = jQuery(":checkbox",$group);

		//set up the tree
		jQuery("li",$group).each(function(){

			var 
			$this = jQuery(this),
			$childul = $this.find("ul"),
			$collapseImage;

			if(settings.checkparents){
				var 
				checkedchildren = jQuery("ul li input:checked",$this).length,
				$firstcheckbox = $this.children("input:checkbox:first");
				
				if((!$firstcheckbox.is(":checked")) && (checkedchildren>0)){
					$firstcheckbox.attr("checked","checked")
				}
			}

			if($childul.length){
				if(settings.collapsed){
					$childul.hide();
					$collapseImage = jQuery('<img class="checkboxtreeimage" src="' + settings.collapsedarrow + '" / >').data("collapsedstate",0);
				}else{
					$collapseImage = jQuery('<img class="checkboxtreeimage" src="' + settings.expandedarrow + '" / >').data("collapsedstate",1);
				}
			}else{
				$collapseImage = jQuery('<img src="' + settings.blankarrow + '" / >');
			}
			$this.prepend($collapseImage);
			
		})

		//add class signifying the tree has been setup
		$group.addClass(settings.activeClass);
		
		$group.delegate(":checkbox + label","click.checkboxtree",function(e,a){
			
			var
			$clicked = jQuery(this), 
			$currrow = $clicked.parents("li:first"),
			$clickedcheck = $clicked.prev();

			$clickedcheck.attr({checked: !$clickedcheck.attr("checked")});
			$clicked.toggleClass(settings.checkedClass);

			//check parents if that option is set
			if(settings.checkparents){
			
				var 
				checkedchildren = jQuery("input:checked",$currrow).length,
				$clickedparent = $currrow.parents("li:first").find(":checkbox:first"),
				$clickedparentlabel = $clickedparent.next("label");
				
				if((!$clickedparent.is(":checked")) && (checkedchildren>0)){
					$clickedparentlabel.trigger("click.checkboxtree",["checkparents"])
				}

			}
			//check child checkboxes if settings say so
			if(settings.checkchildren&&a!=="checkparents"){
				$currrow.find(":checkbox + label")
				.addClass($clicked.hasClass(settings.checkedClass)?settings.checkedClass:"")
				.removeClass($clicked.hasClass(settings.checkedClass)?"":settings.checkedClass)
				.prev().attr({checked: $clickedcheck.attr("checked")?"checked":""});
			}
		});

		$group.delegate("img.checkboxtreeimage","click.checkboxtree",function(e,a){

			var
			$clicked = jQuery(this), 
			$currrow = $clicked.parents("li:first"),
			clickstate=$clicked.data("collapsedstate");

			if(clickstate===0){
				$currrow.children("ul").show().end().children("img").attr("src",settings.expandedarrow);
				$clicked.data("collapsedstate",1)
			}else if(clickstate===1){
				$currrow.children("ul").hide().end().children("img").attr("src",settings.collapsedarrow);
				$clicked.data("collapsedstate",0)
			}

		});
				
		//set the class correctly for the labels that contain checked checkboxes
		jQuery("input:checked + label",$group).addClass(settings.checkedClass)

		//add hover class for labels if is ie 6
		if(jQuery.browser.msie&&jQuery.browser.version<7){
			$labels.hover( 
				function(){jQuery(this).addClass(settings.hoverClass)},
				function(){jQuery(this).removeClass(settings.hoverClass); }
			)
		}		

		//hide the checkboxes with js if set option set to true
		if(settings.hidecbwithjs){
			$checkboxes.hide();
		}

		
		return $group;
	};
})(jQuery);

