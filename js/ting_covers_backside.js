(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_backside_extract_data = function(e) {
    return {
      id : $(e).attr('data-ting-cover-object-id')
    };
  };

  Drupal.behaviors.ting_covers_backside = {
    attach: function(context) {
      // Don't show ting search overlay when covers opens in popup.
      $('body', context).on('click', 'a.reveal-cover', function () {
        var reveal_id = $(this).attr('data-reveal-id');
        $('#' + reveal_id).reveal();
        return false;
      });

      // Assemble information regarding covers.
      var cover_data = [];
      // Extract cover information from the dom.
      $('.ting-cover', context).each(function (index, element) {
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
            $.each(coverData, function (id, data) {
              $('div.ting-object').find('[data-ting-cover-object-id="' + id + '"]').next('.backside-covers-wrapper').replaceWith(data);
            });

            // As we have problems with positioning of modal on non ting_object
            // pages, we will move div with cover content before the body
            // closing tag so it is show normally.
            var reveal_content = $('.reveal-modal');
            if (reveal_content.length !== 0) {
              reveal_content.appendTo('body');
            }

            // Don't display covers icons on carousels.
            var ding_carousel_items = $('.ding-carousel-item').once();
            if (ding_carousel_items.length !== 0) {
              $.map(ding_carousel_items, function(item) {
                var link = $(item).find('a')[0];
                if ($(link).children().hasClass('work-cover-selector')) {
                  $('.ding-carousel .work-cover-selector').remove();
                }
              });
            }
          }
        });

        // Load PDF file on modal open.
        $(document, context).on('reveal:open', '.reveal-modal', function () {
          var $wrapper;
          var hash = $(this).data('hash');
          var uri = $(this).children().children().data('uri');

          if (hash) {
            var options = {
              height: "100%",
              width: "590px",
              pdfOpenParams: {view: "FitV", page: '1'}
            };

            options.forcePDFJS = true;
            options.PDFJS_URL = Drupal.settings.basePath + 'profiles/ding2/libraries/pdfjs/web/viewer.html';

            $wrapper = $('#reveal-cover-back-' + hash + ' .reveal-cover-back-image');
            PDFObject.embed(uri, $wrapper, options);
          }
        });
      }
    }
  };
}(jQuery));
