#!/usr/bin/env ruby
# Check home workload placement, including embedded Helm values, without a cluster.
require 'yaml'

ROOT = File.expand_path('..', __dir__)
# These jobs can fit in RPi requests but require stronger per-core performance.
HEAVY_RUNNERS = [
  'k8s/pve/argocd-apps/arc-runner-reventer.yaml',
  'k8s/pve/argocd-apps/arc-runner-architecture-automation.yaml'
].freeze
HOST_KEYS = ['kubernetes.io/hostname', 'topology.miutaku/proxmox-node', 'node.miutaku/platform'].freeze

def check_placement(value, file, errors, trail = [])
  case value
  when Hash
    value.each do |key, child|
      at = (trail + [key]).join('.')
      if key == 'nodeSelector' && child.is_a?(Hash)
        child.each do |label, selected|
          heavy_worker = label == 'node.miutaku/platform' && selected == 'pve' &&
                         child['node.miutaku/role'] == 'agent' && HEAVY_RUNNERS.include?(file)
          bad = (HOST_KEYS.include?(label) && !heavy_worker) ||
                label == 'kubernetes.io/arch' ||
                (label == 'node-role.kubernetes.io/control-plane' && file != 'k8s/pve/home-service-monitor/vip.yaml')
          errors << "#{file}: #{at}: unnecessary #{label}=#{selected}" if bad
        end
      elsif key == 'nodeName' && child.is_a?(String)
        errors << "#{file}: #{at}: direct node binding"
      elsif key == 'topologyKey' && child == 'topology.miutaku/proxmox-node'
        errors << "#{file}: #{at}: use physical failure-domain topology instead"
      elsif key == 'key' && trail.include?('nodeAffinity') &&
            (HOST_KEYS.include?(child) || child == 'node-role.kubernetes.io/control-plane' || child == 'kubernetes.io/arch')
        errors << "#{file}: #{at}: unnecessary node affinity #{child}"
      end
      if key == 'values' && child.is_a?(String)
        check_placement(YAML.safe_load(child, aliases: true), file, errors, trail + [key])
      else
        check_placement(child, file, errors, trail + [key])
      end
    end
  when Array
    value.each_with_index { |child, index| check_placement(child, file, errors, trail + [index.to_s]) }
  end
end

if $PROGRAM_NAME == __FILE__
  errors = []
  files = Dir.glob(File.join(ROOT, 'k8s/pve/**/*.{yaml,yml}')).reject do |file|
    # These Applications deploy to OCI clusters, not home-k8s.
    file.include?('/k8s/pve/reventer-gitops/')
  end
  files.each do |file|
    relative = file.delete_prefix(ROOT + '/')
    YAML.load_stream(File.read(file)).each { |document| check_placement(document, relative, errors) }
  end
  abort errors.join("\n") unless errors.empty?
  puts "Home placement policy passed: #{files.length} YAML files, embedded Helm values"
end
