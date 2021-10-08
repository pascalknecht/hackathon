#!/bin/bash
#
# A script to update your /etc/hosts file from minikube ingest records
#
# Installation
# ------------
# chmod +x /usr/local/bin/minikube-update-hosts

set -e

INGRESSES=$(kubectl --context=minikube --all-namespaces=true get ingress -o jsonpath='{.items[*].spec.rules[*].host}')

MINIKUBE_IP=$(minikube ip)

HOSTS_ENTRY="$MINIKUBE_IP $INGRESSES # MINIKUBE"

if grep -Fq "# MINIKUBE" /etc/hostname > /dev/null
then
    sudo sed -i '/# MINIKUBE/c\'"$HOSTS_ENTRY" /etc/hosts 
    echo "Updated hosts entry"
else
    echo "$HOSTS_ENTRY" | sudo tee -a /etc/hosts
    echo "Added hosts entry"
fi