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
"""Command to create an Anthos cluster on VMware."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.container.vmware import clusters as apis
from googlecloudsdk.api_lib.container.vmware import operations
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.container.vmware import constants
from googlecloudsdk.command_lib.container.vmware import flags
from googlecloudsdk.core import log

_EXAMPLES = """
To create a cluster named ``my-cluster'' managed in location ``us-west1'', run:

$ {command} my-cluster --location=us-west1
"""


@base.Hidden
@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
class Create(base.CreateCommand):
  """Create an Anthos cluster on VMware."""

  detailed_help = {'EXAMPLES': _EXAMPLES}

  @staticmethod
  def Args(parser):
    """Gathers command line arguments for the create command.

    Args:
      parser: The argparse parser to add the flag to.
    """
    parser.display_info.AddFormat(constants.VMWARE_CLUSTERS_FORMAT)
    flags.AddClusterResourceArg(parser, 'to create', True)
    flags.AddAdminClusterMembershipResourceArg(parser, False)
    base.ASYNC_FLAG.AddToParser(parser)
    flags.AddValidationOnly(parser)
    flags.AddVersion(parser)
    flags.AddServiceAddressCidrBlocks(parser)
    flags.AddPodAddressCidrBlocks(parser)
    flags.AddLoadBalancerConfig(parser)

  def Run(self, args):
    """Runs the create command.

    Args:
      args: The arguments received from command line.

    Returns:
      The return value depends on the command arguments. If `--async` is
      specified, it returns an operation; otherwise, it returns the created
      resource. If `--validate-only` is specified, it returns None or any
      possible error.
    """
    cluster_ref = args.CONCEPTS.cluster.Parse()
    admin_cluster_membership_ref = args.CONCEPTS.admin_cluster_membership.Parse(
    )
    cluster_client = apis.ClustersClient()
    operation = cluster_client.Create(args, cluster_ref,
                                      admin_cluster_membership_ref)

    if args.async_ and not args.IsSpecified('format'):
      args.format = constants.VMWARE_OPERATIONS_FORMAT

    if args.validate_only:
      return

    if args.async_:
      log.CreatedResource(cluster_ref, 'Anthos Cluster on VMware', args.async_)
      return operation
    else:
      operation_client = operations.OperationsClient()
      operation_response = operation_client.Wait(operation)
      log.CreatedResource(cluster_ref, 'Anthos Cluster on VMware', args.async_)

      return operation_response
