# -*- coding: utf-8 -*- #
# Copyright 2021 Google LLC. All Rights Reserved.
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
"""Command for updating network firewall policy rules."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.compute import base_classes
from googlecloudsdk.api_lib.compute import firewall_policy_rule_utils as rule_utils
from googlecloudsdk.api_lib.compute.network_firewall_policies import client
from googlecloudsdk.api_lib.compute.network_firewall_policies import region_client
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.compute.network_firewall_policies import flags
from googlecloudsdk.command_lib.compute.network_firewall_policies import secure_tags_utils


@base.ReleaseTracks(base.ReleaseTrack.GA)
class Update(base.UpdateCommand):
  r"""Updates a Compute Engine network firewall policy rule.

  *{command}* is used to update network firewall policy rules.
  """

  NETWORK_FIREWALL_POLICY_ARG = None
  _support_address_group = False
  _support_fqdn = False
  _support_geo = False
  _support_nti = False
  _support_ips = False

  @classmethod
  def Args(cls, parser):
    cls.NETWORK_FIREWALL_POLICY_ARG = flags.NetworkFirewallPolicyRuleArgument(
        required=True, operation='update')
    cls.NETWORK_FIREWALL_POLICY_ARG.AddArgument(parser)
    flags.AddAction(parser, required=False, support_ips=cls._support_ips)
    flags.AddRulePriority(parser, operation='updated')
    flags.AddSrcIpRanges(parser)
    flags.AddDestIpRanges(parser)
    flags.AddLayer4Configs(parser)
    flags.AddDirection(parser)
    flags.AddEnableLogging(parser)
    flags.AddDisabled(parser)
    flags.AddTargetServiceAccounts(parser)
    flags.AddDescription(parser)
    flags.AddNewPriority(parser, operation='update')
    flags.AddSrcSecureTags(parser)
    flags.AddTargetSecureTags(parser)
    if cls._support_address_group:
      flags.AddDestAddressGroups(parser)
      flags.AddSrcAddressGroups(parser)
    if cls._support_fqdn:
      flags.AddSrcFqdns(parser)
      flags.AddDestFqdns(parser)
    if cls._support_geo:
      flags.AddSrcRegionCodes(parser)
      flags.AddDestRegionCodes(parser)
    if cls._support_nti:
      flags.AddSrcThreatIntelligence(parser)
      flags.AddDestThreatIntelligence(parser)
    if cls._support_ips:
      flags.AddSecurityProfileGroup(parser)

  def Run(self, args):
    holder = base_classes.ComputeApiHolder(self.ReleaseTrack())
    ref = self.NETWORK_FIREWALL_POLICY_ARG.ResolveAsResource(
        args, holder.resources)
    network_firewall_policy_rule_client = client.NetworkFirewallPolicyRule(
        ref=ref, compute_client=holder.client)
    if hasattr(ref, 'region'):
      network_firewall_policy_rule_client = (
          region_client.RegionNetworkFirewallPolicyRule(
              ref, compute_client=holder.client))

    priority = rule_utils.ConvertPriorityToInt(args.priority)
    src_ip_ranges = []
    dest_ip_ranges = []
    layer4_config_list = []
    target_service_accounts = []
    security_profile_group = None
    enable_logging = False
    disabled = False
    should_setup_match = False
    traffic_direct = None
    src_secure_tags = []
    target_secure_tags = []
    if args.IsSpecified('src_ip_ranges'):
      src_ip_ranges = args.src_ip_ranges
      should_setup_match = True
    if args.IsSpecified('dest_ip_ranges'):
      dest_ip_ranges = args.dest_ip_ranges
      should_setup_match = True
    if args.IsSpecified('layer4_configs'):
      should_setup_match = True
      layer4_config_list = rule_utils.ParseLayer4Configs(
          args.layer4_configs, holder.client.messages)
    if args.IsSpecified('target_service_accounts'):
      target_service_accounts = args.target_service_accounts
    if args.IsSpecified('enable_logging'):
      enable_logging = args.enable_logging
    if args.IsSpecified('disabled'):
      disabled = args.disabled
    if args.IsSpecified('new_priority'):
      new_priority = rule_utils.ConvertPriorityToInt(args.new_priority)
    else:
      new_priority = priority
    if args.IsSpecified('src_secure_tags'):
      src_secure_tags = secure_tags_utils.TranslateSecureTagsForFirewallPolicy(
          holder.client, args.src_secure_tags)
    if args.IsSpecified('target_secure_tags'):
      target_secure_tags = secure_tags_utils.TranslateSecureTagsForFirewallPolicy(
          holder.client, args.target_secure_tags)
    matcher = holder.client.messages.FirewallPolicyRuleMatcher(
        srcIpRanges=src_ip_ranges,
        destIpRanges=dest_ip_ranges,
        layer4Configs=layer4_config_list,
        srcSecureTags=src_secure_tags)
    if self._support_address_group and args.IsSpecified('src_address_groups'):
      matcher.srcAddressGroups = args.src_address_groups
      should_setup_match = True
    if self._support_address_group and args.IsSpecified('dest_address_groups'):
      matcher.destAddressGroups = args.dest_address_groups
      should_setup_match = True
    if self._support_fqdn and args.IsSpecified('src_fqdns'):
      matcher.srcFqdns = args.src_fqdns
      should_setup_match = True
    if self._support_fqdn and args.IsSpecified('dest_fqdns'):
      matcher.destFqdns = args.dest_fqdns
      should_setup_match = True
    if self._support_geo and args.IsSpecified('src_region_codes'):
      matcher.srcRegionCodes = args.src_region_codes
      should_setup_match = True
    if self._support_geo and args.IsSpecified('dest_region_codes'):
      matcher.destRegionCodes = args.dest_region_codes
      should_setup_match = True
    if self._support_nti and args.IsSpecified('src_threat_intelligence'):
      matcher.srcThreatIntelligences = args.src_threat_intelligence
      should_setup_match = True
    if self._support_nti and args.IsSpecified('dest_threat_intelligence'):
      matcher.destThreatIntelligences = args.dest_threat_intelligence
      should_setup_match = True
    if self._support_ips and args.IsSpecified('security_profile_group'):
      security_profile_group = args.security_profile_group
    # If not need to construct a new matcher.
    if not should_setup_match:
      matcher = None

    if args.IsSpecified('direction'):
      if args.direction == 'INGRESS':
        traffic_direct = (
            holder.client.messages.FirewallPolicyRule.DirectionValueValuesEnum
            .INGRESS)
      else:
        traffic_direct = (
            holder.client.messages.FirewallPolicyRule.DirectionValueValuesEnum
            .EGRESS)

    if self._support_ips:
      firewall_policy_rule = holder.client.messages.FirewallPolicyRule(
          priority=new_priority,
          action=args.action,
          match=matcher,
          direction=traffic_direct,
          targetServiceAccounts=target_service_accounts,
          description=args.description,
          enableLogging=enable_logging,
          disabled=disabled,
          targetSecureTags=target_secure_tags,
          securityProfileGroup=security_profile_group)
    else:
      firewall_policy_rule = holder.client.messages.FirewallPolicyRule(
          priority=new_priority,
          action=args.action,
          match=matcher,
          direction=traffic_direct,
          targetServiceAccounts=target_service_accounts,
          description=args.description,
          enableLogging=enable_logging,
          disabled=disabled,
          targetSecureTags=target_secure_tags)

    return network_firewall_policy_rule_client.Update(
        priority=priority,
        firewall_policy=args.firewall_policy,
        firewall_policy_rule=firewall_policy_rule,
        only_generate_request=False)


@base.ReleaseTracks(base.ReleaseTrack.BETA)
class UpdateBeta(Update):
  r"""Updates a Compute Engine network firewall policy rule.

  *{command}* is used to update network firewall policy rules.
  """
  _support_geo = True
  _support_nti = True


@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
class UpdateAlpha(Update):
  r"""Updates a Compute Engine network firewall policy rule.

  *{command}* is used to update network firewall policy rules.
  """
  _support_address_group = True
  _support_fqdn = True
  _support_geo = True
  _support_nti = True
  _support_ips = True


Update.detailed_help = {
    'EXAMPLES':
        """\
    To update a rule with priority ``10'' in a global network firewall policy
    with name ``my-policy'' to change the action to ``allow'' and description to
    ``new example rule'', run:

      $ {command} 10 --firewall-policy=my-policy --action=allow --description="new example rule"
    """,
}
