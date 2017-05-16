<?php
/**
 * @file
 * Template for backside cover.
 */
?>

<div id="work-cover-<?php print $entity_id; ?>" class="work-cover">
  <div class="work-cover-image">
    <?php print $image; ?>
  </div>
  <div class="work-cover-selector clearfix">
    <?php print $front_cover_large_link; ?>
    <?php print $back_cover_large_link; ?>
  </div>

  <div id="reveal-cover-large-<?php print $entity_id; ?>" class="reveal-modal reveal-cover-large" data-cover-hash="<?php print $entity_id; ?>" data-reveal="">
    <div class="reveal-cover-large-image"><?php print $front_cover_large_image; ?></div>
      <?php print $close_button; ?>
  </div>

  <div id="reveal-cover-back-<?php print $entity_id; ?>" class="reveal-modal reveal-cover-back" data-hash="<?php print $entity_id; ?>" data-reveal="">
    <div class="reveal-cover-back-image"><?php print $back_cover_large_pdf; ?></div>
      <?php print $close_button; ?>
  </div>
</div>
