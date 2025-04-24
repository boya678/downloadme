helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade prometheus-stack prometheus-community/kube-prometheus-stack --install --namespace monitoring --create-namespace --values promvalues.yaml --version 70.4.2
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm upgrade keda kedacore/keda --install --namespace keda --create-namespace
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
helm upgrade istio-base istio/base -n istio-system --set defaultRevision=default --create-namespace --install
helm upgrade istiod istio/istiod -n istio-system --install --values istiovalues.yaml
kubectl create namespace apps
kubectl label namespace apps istio-injection=enabled
kubectl patch service traefik -n kube-system --type=json -p="[{\"op\":\"add\",\"path\":\"/spec/ports/-\",\"value\":{\"name\":\"metrics\",\"port\":9100,\"targetPort\":9100}}]"
