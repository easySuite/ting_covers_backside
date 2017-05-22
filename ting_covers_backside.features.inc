<?php
/**
 * @file
 * ting_covers_backside.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function ting_covers_backside_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
