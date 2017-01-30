(function($) {
  "use strict";

  Drupal.behaviors.backside = {
    attach: function(context) {

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
      $(document).on('reveal:open', 'div[id^="reveal-cover-back-"], div[id^="reveal-cover-large-"]', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if ($(this).find('div span').length === 0) {
          return false;
        }

        var $modal = $(this).find('div[class^="reveal-cover-"]');

        var $obj_type = $(this).find('span').attr('object_type');
        var $obj_id = $(this).find('span').attr('object_id');

        var backend_uri = ($obj_type == 'front_cover')
          ? Drupal.settings.basePath + 'ting/covers/backside/' + $obj_id + '/' + $obj_type + '/' + $('.ting-cover-object-id-' + $obj_id).attr('class').match(/ting-cover-style-(\S+)/)[1]
          : Drupal.settings.basePath + 'ting/covers/backside/' + $obj_id + '/' + $obj_type;

        $.ajax({
          url: backend_uri,
          type: 'GET',
          dataType: 'json',
          success: function (data) {
            $(data).appendTo($modal);
            $($modal).find('span').remove();
          }
        });
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
