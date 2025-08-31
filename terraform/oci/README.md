# About
OCIで動くインフラの攻勢を管理する。

# CLI
OCIのCLI環境を設定する。
```shell
mkdir ~/oci-cli
cd ~/oci-cli
wget https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh
chmod u+x ~/oci-cli/install.sh
bash -c '~/oci-cli/install.sh --accept-all-defaults'
```

# k8s
```shell
mkdir -p $HOME/.kube
oci ce cluster create-kubeconfig --cluster-id ocid1.cluster.oc1.ap-tokyo-1.RANDOM_STRINGS --file $HOME/.kube/config --region ap-tokyo-1 --token-version 2.0.0  --kube-endpoint PRIVATE_ENDPOINT
export KUBECONFIG=$HOME/.kube/config
sudo snap install kubectl --classic 
```

# Notice
applyの際、 `terraform apply -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)"` のようにして公開鍵を渡してやらないといけない。
