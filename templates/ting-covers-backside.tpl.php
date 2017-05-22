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
  <?php if($front_cover_large_link || $back_cover_large_link): ?>
    <div class="work-cover-selector clearfix">
      <?php print ($front_cover_large_link) ? $front_cover_large_link : ''; ?>
      <?php print ($back_cover_large_link) ? $back_cover_large_link : ''; ?>
    </div>
  <?php endif; ?>

  <?php if($front_cover_large_image): ?>
      <div id="reveal-cover-large-<?php print $entity_id; ?>" class="reveal-modal reveal-cover-large" data-cover-hash="<?php print $entity_id; ?>" data-reveal="">
          <div class="reveal-cover-large-image"><?php print $front_cover_large_image; ?></div>
        <?php print $close_button; ?>
      </div>
  <?php endif; ?>
  <?php if ($back_cover_large_pdf): ?>
      <div id="reveal-cover-back-<?php print $entity_id; ?>" class="reveal-modal reveal-cover-back" data-hash="<?php print $entity_id; ?>" data-reveal="">
          <div class="reveal-cover-back-image"><?php print $back_cover_large_pdf; ?></div>
        <?php print $close_button; ?>
      </div>
  <?php endif; ?>
</div>
