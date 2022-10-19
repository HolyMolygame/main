# -*- coding: utf-8 -*- #
# Copyright 2022 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Command to update an existing Cloud Asset Inventory saved query."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.asset import client_util
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.asset import flags
from googlecloudsdk.command_lib.asset import utils as asset_utils
from googlecloudsdk.command_lib.util.args import labels_util


class Update(base.Command):
  """Update an existing Cloud Asset Inventory saved query."""

  detailed_help = {
      'DESCRIPTION':
          """\
      Update an existing Cloud Asset Inventory saved query.
      """,
      'EXAMPLES':
          """\
        To update the content of an existing saved query, run:

          $ {command} query-id-1 --project=p1
          --query-file-path=./query-content.json
          --description="updating a query with query id query-id-1"
          --update-labels="key1=val1"
      """
  }

  @staticmethod
  def Args(parser):
    flags.AddParentArgs(parser, 'Project of the saved query.',
                        'Organization of the saved query.',
                        'Folder of the saved query.')
    saved_query_id_helper_text = (
        'Saved query identifier being updated. It must be unique under the'
        ' specified parent resource project/folder/organization.')

    flags.AddSavedQueriesQueryId(parser, saved_query_id_helper_text)
    labels_util.AddUpdateLabelsFlags(parser)
    flags.AddSavedQueriesQueryFilePath(parser, False)
    flags.AddSavedQueriesQueryDescription(parser)

  def Run(self, args):
    parent = asset_utils.GetParentNameForExport(args.organization, args.project,
                                                args.folder)
    client = client_util.AssetSavedQueriesClient(parent)
    return client.Update(args)
