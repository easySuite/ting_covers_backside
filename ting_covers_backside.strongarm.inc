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
    'ting_cover_small' => 'ting_cover_small',
    'ding_primary_large' => 'ding_primary_large',
    'ting_cover_medium' => 'ting_cover_medium',
    'ding_list_medium' => 'ding_list_medium',
    'medium' => 0,
  );
  $export['ting_backside_covers_modes'] = $strongarm;

  return $export;
}
