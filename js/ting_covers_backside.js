(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_backside_extract_data = function(e) {
    return {
      id : $(e).data('ting-cover-object-id')
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
      $('.ting-cover:not(.ting-backover-processed)', context).each(function (index, element) {
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
              var $current = $('#work-cover-' + id).parent();
              $current.html('');
              $(data.data).appendTo($current);
              $current.parent().closest('.ting-object').removeClass('no-cover');
            });
          }
        });

        // Load PDF file on modal open.
        $(document, context).on('reveal:open', '.reveal-modal', function () {
          var wrapper;
          var hash = $(this).data('hash');
          var uri = $(this).children().children().data('uri');

          if (hash) {
            var options = {
              height: "100%",
              width: "590px",
              pdfOpenParams: {view: "FitV", page: '1'}
            };

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            if (isFirefox || isIE) {
              options.forcePDFJS = true;
              options.PDFJS_URL = Drupal.settings.basePath + 'profiles/ding2/libraries/pdfjs/web/viewer.html';
            }

            wrapper = $('#reveal-cover-back-' + hash + ' .reveal-cover-back-image');
            PDFObject.embed(uri, wrapper, options);
          }
          else {
            var cover_hash = $(this).data('cover-hash');
            var cover_uri = $(this).parent().find('a.ting-cover').data('uri');
            var image = '<img src="' + cover_uri + '">';

            wrapper = $('#reveal-cover-large-' + cover_hash + ' .reveal-cover-large-image');
            $(wrapper).once().append(image);
          }
        });
      }
    }
  };
}(jQuery));
