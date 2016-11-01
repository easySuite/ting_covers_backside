(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_backside_extract_data = function(e) {
    return {
      id : $(e).data('ting-cover-object-id')
    };
  };

  $(document).ready(function () {
    // Assemble information regarding covers.
    var cover_data = [];

    // Extract cover information from the dom.
    $('.ting-cover:not(.ting-backover-processed)').each(function(index, element) {
      cover_data.push(ting_covers_backside_extract_data(element));
    });

    if (cover_data.length > 0) {
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

    // Load PDF file on modal open.
    $(document).on('reveal:open', '.reveal-modal', function () {
      $(this).find('object').show();
    });
  });
}(jQuery));
