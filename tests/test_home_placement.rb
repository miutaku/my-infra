require 'minitest/autorun'
require_relative '../scripts/check-home-placement'

class HomePlacementTest < Minitest::Test
  def violations(spec, file = 'k8s/pve/example/deployment.yaml')
    errors = []
    check_placement(spec, file, errors)
    errors
  end

  def test_worker_role_and_physical_ha_are_allowed
    assert_empty violations({'nodeSelector' => {'node.miutaku/role' => 'agent'},
      'affinity' => {'podAntiAffinity' => {'topologyKey' => 'topology.miutaku/failure-domain'}}})
  end

  def test_real_network_and_device_constraints_are_allowed
    assert_empty violations({'nodeSelector' => {'network.miutaku/l2' => 'vlan20', 'hardware.miutaku/pt3' => 'true'}})
  end

  def test_direct_host_and_platform_binding_are_rejected
    assert_equal 2, violations({'nodeName' => 'worker-01', 'nodeSelector' => {'node.miutaku/platform' => 'pve'}}).length
  end

  def test_soft_pve_preference_is_also_rejected
    refute_empty violations({'affinity' => {'nodeAffinity' => {'preferredDuringSchedulingIgnoredDuringExecution' => [
      {'weight' => 100, 'preference' => {'matchExpressions' => [{'key' => 'topology.miutaku/proxmox-node', 'operator' => 'In', 'values' => ['pve-x570']}]}}
    ]}}})
  end

  def test_embedded_helm_values_are_checked
    refute_empty violations({'helm' => {'values' => "template:\n  spec:\n    nodeSelector:\n      kubernetes.io/arch: amd64\n"}})
  end

  def test_runner_cpu_binding_is_rejected_too
    file = 'k8s/pve/argocd-apps/arc-runner-my-infra.yaml'
    refute_empty violations({'nodeSelector' => {'kubernetes.io/arch' => 'amd64'}}, file)
  end

  def test_heavy_runner_can_use_either_pve_worker_but_not_a_specific_host
    HEAVY_RUNNERS.each do |file|
      assert_empty violations({'nodeSelector' => {'node.miutaku/platform' => 'pve', 'node.miutaku/role' => 'agent'}}, file)
      refute_empty violations({'nodeSelector' => {'node.miutaku/platform' => 'pve'}}, file)
      refute_empty violations({'nodeSelector' => {'kubernetes.io/hostname' => 'worker-01'}}, file)
    end
    refute_empty violations({'nodeSelector' => {'node.miutaku/platform' => 'pve', 'node.miutaku/role' => 'agent'}})
  end
end
