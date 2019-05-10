(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_backside_extract_data = function(e) {
    return {
      id : $(e).attr('data-ting-cover-object-id')
    };
  };

  Drupal.behaviors.ting_covers_backside = {
    attach: function(context, settings) {
      var cover_loaded = $(document, context).find('.cover-front');

      if ($(cover_loaded).hasClass('cboxElement')) {
        $('.work-cover-selector').show();
      }

      $('.cover-front').colorbox();

      $('.cover-back').colorbox({
        iframe: true,
        height: '90%',
        width: '590px',
      });

      // Assemble information regarding covers.
      var cover_data = [];
      // Extract cover information from the dom.
      $('.ting-cover', context).each(function (index, element) {
        cover_data.push(ting_covers_backside_extract_data(element));
      });
      if (cover_data.length > 0) {
        $.ajax({
          url: settings.basePath + settings.pathPrefix + 'ting/covers/backside',
          type: 'POST',
          data: {
            coverData: cover_data
          },
          dataType: 'json',
          success: function (coverData) {
            $.each(coverData, function (id, data) {
              $('div.ting-object').find('[data-ting-cover-object-id="' + id + '"]').next('.backside-covers-wrapper').replaceWith(data);
            });
          }
        });
      }
    }
  };
}(jQuery));
