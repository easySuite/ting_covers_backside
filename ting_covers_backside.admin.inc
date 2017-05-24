<?php
/**
 * @file
 * Define admin page functionality.
 */

function ting_covers_backside_admin_settings_form() {
  $form = array();

  $styles = array();
  $instance_info = field_info_instance('ting_object', 'ting_cover', 'ting_object');
  foreach ($instance_info['display'] as $mode_name => $mode) {
    $style = !empty($mode['settings']['image_style']) ? $mode['settings']['image_style'] : FALSE;
    if ($style) {
      $styles[$style] = $mode_name;
    }
  }

  $form['ting_backside_covers_modes'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Select on which ting object view modes to display backside covers'),
    '#options' => $styles,
    '#default_value' => array_values(array_filter(variable_get('ting_backside_covers_modes', array()))),
  );

  return system_settings_form($form);
}
