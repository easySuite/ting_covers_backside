<?php

/**
 * @file
 * AdditionalInformationBacksideService class.
 */

module_load_include('php', 'ting_covers_addi', 'lib/addi-client/AdditionalInformationService');

class AdditionalInformationBacksideService extends AdditionalInformationService {

  protected $wsdlUrl;
  protected $username;
  protected $group;
  protected $password;

  /**
   * Extract the data we need from the server response.
   */
  protected function extractAdditionalInformation($id_name, $response) {
    $additional_informations = array();

    foreach ($response->identifierInformation as $info) {
      $cover_image = isset($info->coverImage) ? $info->coverImage : FALSE;
      $back_page = isset($info->backPage->_) ? $info->backPage->_ : FALSE;

      if (isset($info->identifierKnown) && $info->identifierKnown && $cover_image && $back_page) {
        $additional_info = new AdditionalInformationBackside($back_page);
        $additional_informations[$info->identifier->$id_name] = $additional_info;
      }
    }

    return $additional_informations;
  }

}
