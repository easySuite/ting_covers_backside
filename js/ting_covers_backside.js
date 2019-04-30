(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_backside_extract_data = function(e) {
    return {
      id : $(e).attr('data-ting-cover-object-id')
    };
  };


  // Select the node that will be observed for mutations
  // var targetNode = document.getElementsByClassName('cover-front');
//   var targetNode = document.getElementsByClassName('cover-front');
//   console.log(targetNode)
//
//   // Options for the observer (which mutations to observe)
//   var config = { attributes: true, childList: true, subtree: true };
//
//   // Callback function to execute when mutations are observed
//   var callback = function(mutationsList, observer) {
//     for(var mutation of mutationsList) {
//       if (mutation.type == 'childList') {
//         console.log('A child node has been added or removed.');
//       }
//       else if (mutation.type == 'attributes') {
//         console.log('The ' + mutation.attributeName + ' attribute was modified.');
//       }
//     }
//   };
//
// // Create an observer instance linked to the callback function
//   var observer = new MutationObserver(callback);
//
// // Start observing the target node for configured mutations
//   observer.observe(targetNode, config);
//   console.log(observer)
//
// // Later, you can stop observing
//   observer.disconnect();

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
