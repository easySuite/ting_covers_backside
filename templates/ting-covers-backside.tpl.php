<?php
/**
 * @file
 * Template for backside cover.
 */

/**
 * @var $front_cover
 * @var $back_cover_large_link
 * @var $backside_cover
 */
?>
<?php if ($front_cover || $back_cover_large_link): ?>
  <div class="work-cover-selector clearfix" style="display: none;">
    <?php if ($front_cover): ?>
      <a href="<?php print $front_cover; ?>" class="cover-front"></a>
    <?php endif; ?>
    <?php if ($backside_cover): ?>
      <a href="<?php print $backside_cover; ?>" class="cover-back"></a>
    <?php endif; ?>
  </div>
<?php endif; ?>
<?php if ($front_cover): ?>
  <a href="<?php print $front_cover ?>" class="cover-front" style="display: none;"></a>
<?php endif; ?>
<?php if ($backside_cover): ?>
  <a href="<?php print $backside_cover ?>" class="cover-back" style="display: none;"></a>
<?php endif; ?>
