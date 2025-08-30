# About
OCIで動くインフラの攻勢を管理する。

# Notice
applyの際、 `terraform apply -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)"` のようにして公開鍵を渡してやらないといけない。
