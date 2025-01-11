#!/bin/bash

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
PARAMS=$(aws ssm get-parameter --name "/myapp/env" --with-decryption --query "Parameter.Value" --output text)
echo $PARAMS | jq -r 'to_entries | .[] | "export \(.key)=\(.value)"' >> /etc/profile

# Load environment variables
source /etc/profile

# Pull the latest Docker image
docker pull my-docker-image:latest

# Run Docker container
docker run -d --env-file /etc/profile --name myapp -p 5111:5111 my-docker-image:latest