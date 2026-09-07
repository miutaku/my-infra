# 汎用ロードバランサー

`lb-01` / `lb-02` のHAProxyとKeepalivedを管理する。VMはKubernetes専用ではなく、
VIPとバックエンドは`group_vars/all`で定義する。

```bash
cd ansible/load-balancer
pipenv sync
BWS_ACCESS_TOKEN=... pipenv run ansible-playbook -i hosts/prd site.yml --check
BWS_ACCESS_TOKEN=... pipenv run ansible-playbook -i hosts/prd site.yml
```
