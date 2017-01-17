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
   * Get information by local ID and library code.
   *
   * @param mixed $local_id
   *   Expects either a single object with localIdentifier and libraryCode
   *   attributes, or an array of such objects.
   *
   * @return array
   *   Array of the images that were found.
   */
  public function getByLocalIdentifier($local_id) {
    $identifiers = $this->collectIdentifiers('localIdentifier', $local_id);
    $response = $this->sendRequest($identifiers);
    return $this->extractAdditionalInformation('localIdentifier', $response);
  }

  /**
   * Extract the data we need from the server response.
   */
  protected function extractAdditionalInformation($id_name, $response) {
    $additional_informations = array();

    foreach ($response->identifierInformation as $info) {
      $cover_image = isset($info->coverImage) ? $info->coverImage : FALSE;
      $back_page = isset($info->backPage->_) ? $info->backPage->_ : FALSE;

      if (isset($info->identifierKnown) && $info->identifierKnown && $cover_image && $back_page) {
//        dump($back_page);
//        exit;
        $additional_info = new AdditionalInformationBackside($back_page);
        $additional_informations[$info->identifier->{$id_name}] = $additional_info;
      }
    }

    return $additional_informations;
  }

}
