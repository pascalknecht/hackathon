#!/bin/bash

# load all env variables
set -o allexport; source .env; set +o allexport

# login to docker registry to push images
docker login --username $CI_REGISTRY_USERNAME --password $CI_REGISTRY_PASSWORD $CI_SKAFFOLD_DEFAULT_DOCKER_REGISTRY

skaffold run --default-repo $CI_SKAFFOLD_DEFAULT_DOCKER_REGISTRY/nino -p $CI_ENVIRONMENT_PREFIX;