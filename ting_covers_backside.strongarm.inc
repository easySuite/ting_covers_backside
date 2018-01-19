<?php
/**
 * @file
 * ting_covers_backside.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function ting_covers_backside_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'ting_backside_covers_modes';
  $strongarm->value = array(
    'collection_list:ting_cover_small' => 'collection_list:ting_cover_small',
    'collection_primary:ting_cover_medium' => 'collection_primary:ting_cover_medium',
    'full:ting_cover_medium' => 'full:ting_cover_medium',
    'search_result:ting_cover_small' => 'search_result:ting_cover_small',
    'teaser:ting_cover_medium' => 'teaser:ting_cover_medium',
    'reference_teaser:ting_cover_medium' => 0,
    'ting_reference_preview:ting_cover_medium' => 0,
    'user_list:ting_cover_small' => 0,
  );
  $export['ting_backside_covers_modes'] = $strongarm;

  return $export;
}
