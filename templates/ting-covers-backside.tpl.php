<?php
/**
 * @file
 * Template for backside cover.
 */
?>
<?php if ($front_cover || $back_cover_large_link): ?>
    <div class="work-cover-selector clearfix">
      <?php if ($front_cover): ?>
          <a href="/"
             data-uri="<?php print $front_cover; ?>"
             aria-label="See large cover image"
             class="cover-front reveal-cover"
             data-reveal-id="reveal-cover-large-<?php print $hash; ?>"></a>
      <?php endif; ?>
      <?php if ($backside_cover): ?>
          <a href="/"
             data-uri="<?php print $backside_cover; ?>"
             aria-label="See large back cover image"
             title="See large back cover image"
             class="cover-back reveal-cover"
             data-reveal-id="reveal-cover-back-<?php print $hash; ?>"></a>
      <?php endif; ?>
    </div>
<?php endif; ?>
<?php if ($front_cover): ?>
    <div id="reveal-cover-large-<?php print $hash; ?>"
         class="reveal-modal reveal-cover-large"
         data-cover-hash="<?php print $hash; ?>" data-reveal>
        <div class="reveal-cover-large-image"><img
                    src="<?php print $front_cover; ?>" alt="Front cover image"/>
        </div>
        <a class="reveal-cover close-reveal-modal">&#215;</a>
    </div>
<?php endif; ?>
<?php if ($backside_cover): ?>
    <div id="reveal-cover-back-<?php print $hash; ?>"
         class="reveal-modal reveal-cover-back"
         data-hash="<?php print $hash; ?>" data-reveal>
        <div class="reveal-cover-back-image">
            <div data-uri="<?php print  $backside_cover; ?>"></div>
        </div>
        <a class="reveal-cover close-reveal-modal">&#215;</a>
    </div>
<?php endif; ?>
