#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Update package list and install necessary packages
sudo yum update -y
sudo yum install -y docker jq

# Start Docker service
sudo service docker start

# Add ec2-user to the docker group
sudo usermod -a -G docker ec2-user

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Fetch environment variables from AWS Parameter Store
PARAMS=$(aws ssm get-parameters-by-path --path "/myapp/env" --with-decryption --query "Parameters[*].{Name:Name,Value:Value}" --output json)
echo $PARAMS | jq -r '.[] | "export \(.Name | split("/")[-1])=\(.Value)"' >> /etc/profile

# Load environment variables
source /etc/profile

# Build the Docker image
docker build -t school-management-api .

# Run Docker container
docker run -d --env-file /etc/profile --name myapp -p 5111:5111 school-management-api