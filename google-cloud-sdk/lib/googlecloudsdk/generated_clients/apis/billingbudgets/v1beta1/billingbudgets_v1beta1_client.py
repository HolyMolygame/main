"""Generated client library for billingbudgets version v1beta1."""
# NOTE: This file is autogenerated and should not be edited by hand.

from __future__ import absolute_import

from apitools.base.py import base_api
from googlecloudsdk.generated_clients.apis.billingbudgets.v1beta1 import billingbudgets_v1beta1_messages as messages


class BillingbudgetsV1beta1(base_api.BaseApiClient):
  """Generated client library for service billingbudgets version v1beta1."""

  MESSAGES_MODULE = messages
  BASE_URL = 'https://billingbudgets.googleapis.com/'
  MTLS_BASE_URL = 'https://billingbudgets.mtls.googleapis.com/'

  _PACKAGE = 'billingbudgets'
  _SCOPES = ['https://www.googleapis.com/auth/cloud-billing', 'https://www.googleapis.com/auth/cloud-platform']
  _VERSION = 'v1beta1'
  _CLIENT_ID = 'CLIENT_ID'
  _CLIENT_SECRET = 'CLIENT_SECRET'
  _USER_AGENT = 'google-cloud-sdk'
  _CLIENT_CLASS_NAME = 'BillingbudgetsV1beta1'
  _URL_VERSION = 'v1beta1'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None, response_encoding=None):
    """Create a new billingbudgets handle."""
    url = url or self.BASE_URL
    super(BillingbudgetsV1beta1, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers,
        response_encoding=response_encoding)
    self.billingAccounts_budgets = self.BillingAccountsBudgetsService(self)
    self.billingAccounts = self.BillingAccountsService(self)

  class BillingAccountsBudgetsService(base_api.BaseApiService):
    """Service class for the billingAccounts_budgets resource."""

    _NAME = 'billingAccounts_budgets'

    def __init__(self, client):
      super(BillingbudgetsV1beta1.BillingAccountsBudgetsService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      r"""Creates a new budget. See [Quotas and limits](https://cloud.google.com/billing/quotas) for more information on the limits of the number of budgets you can create.

      Args:
        request: (BillingbudgetsBillingAccountsBudgetsCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (GoogleCloudBillingBudgetsV1beta1Budget) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path='v1beta1/billingAccounts/{billingAccountsId}/budgets',
        http_method='POST',
        method_id='billingbudgets.billingAccounts.budgets.create',
        ordered_params=['parent'],
        path_params=['parent'],
        query_params=[],
        relative_path='v1beta1/{+parent}/budgets',
        request_field='googleCloudBillingBudgetsV1beta1CreateBudgetRequest',
        request_type_name='BillingbudgetsBillingAccountsBudgetsCreateRequest',
        response_type_name='GoogleCloudBillingBudgetsV1beta1Budget',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      r"""Deletes a budget. Returns successfully if already deleted.

      Args:
        request: (BillingbudgetsBillingAccountsBudgetsDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (GoogleProtobufEmpty) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path='v1beta1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}',
        http_method='DELETE',
        method_id='billingbudgets.billingAccounts.budgets.delete',
        ordered_params=['name'],
        path_params=['name'],
        query_params=[],
        relative_path='v1beta1/{+name}',
        request_field='',
        request_type_name='BillingbudgetsBillingAccountsBudgetsDeleteRequest',
        response_type_name='GoogleProtobufEmpty',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      r"""Returns a budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console.

      Args:
        request: (BillingbudgetsBillingAccountsBudgetsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (GoogleCloudBillingBudgetsV1beta1Budget) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path='v1beta1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}',
        http_method='GET',
        method_id='billingbudgets.billingAccounts.budgets.get',
        ordered_params=['name'],
        path_params=['name'],
        query_params=[],
        relative_path='v1beta1/{+name}',
        request_field='',
        request_type_name='BillingbudgetsBillingAccountsBudgetsGetRequest',
        response_type_name='GoogleCloudBillingBudgetsV1beta1Budget',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      r"""Returns a list of budgets for a billing account. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console.

      Args:
        request: (BillingbudgetsBillingAccountsBudgetsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (GoogleCloudBillingBudgetsV1beta1ListBudgetsResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path='v1beta1/billingAccounts/{billingAccountsId}/budgets',
        http_method='GET',
        method_id='billingbudgets.billingAccounts.budgets.list',
        ordered_params=['parent'],
        path_params=['parent'],
        query_params=['pageSize', 'pageToken'],
        relative_path='v1beta1/{+parent}/budgets',
        request_field='',
        request_type_name='BillingbudgetsBillingAccountsBudgetsListRequest',
        response_type_name='GoogleCloudBillingBudgetsV1beta1ListBudgetsResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      r"""Updates a budget and returns the updated budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. Budget fields that are not exposed in this API will not be changed by this method.

      Args:
        request: (BillingbudgetsBillingAccountsBudgetsPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (GoogleCloudBillingBudgetsV1beta1Budget) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        flat_path='v1beta1/billingAccounts/{billingAccountsId}/budgets/{budgetsId}',
        http_method='PATCH',
        method_id='billingbudgets.billingAccounts.budgets.patch',
        ordered_params=['name'],
        path_params=['name'],
        query_params=[],
        relative_path='v1beta1/{+name}',
        request_field='googleCloudBillingBudgetsV1beta1UpdateBudgetRequest',
        request_type_name='BillingbudgetsBillingAccountsBudgetsPatchRequest',
        response_type_name='GoogleCloudBillingBudgetsV1beta1Budget',
        supports_download=False,
    )

  class BillingAccountsService(base_api.BaseApiService):
    """Service class for the billingAccounts resource."""

    _NAME = 'billingAccounts'

    def __init__(self, client):
      super(BillingbudgetsV1beta1.BillingAccountsService, self).__init__(client)
      self._upload_configs = {
          }
