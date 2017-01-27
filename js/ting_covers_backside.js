(function($) {
  "use strict";

  Drupal.behaviors.backside = {
    attach: function(context) {

      var backside_popup_data = {};

      // Helper function to get information about a given cover place holder.
      var ting_covers_backside_extract_data = function(e) {
        var classname = $(e).attr('class');
        var imageStyle = classname.match(/ting-cover-style-(\S+)/);
        var id = classname.match(/ting-cover-object-id-(\S+)/);
        return {
          local_id : id[1],
          image_style : imageStyle[1]
        };
      };

      // Load PDF or image file on modal open.
      $(document).on('reveal:open', 'div[id^="reveal-cover-back-"], div[id^="reveal-cover-large-"]', function () {
        $(this).find('object').show();
      });

      // Assemble information regarding covers.
      var cover_data = [];

      // Extract cover information from the dom.
      $('div.ting-cover:not(.ting-backside-processed)').each(function(index, element) {
        cover_data.push(ting_covers_backside_extract_data(element));
      });

      if (cover_data.length === 0) {
        return false;
      }

      $.ajax({
        url: Drupal.settings.basePath + 'ting/covers/backside',
        type: 'POST',
        data: {
          coverData: cover_data
        },
        dataType: 'json',
        success: function (coverData) {
          $.each(coverData, function(id, data) {
            var $current = $('#work-cover-' + id).parent();

            $current.html('');
            $(data.data).appendTo($current);
          });
        }
      });
    }
  };
}(jQuery));
