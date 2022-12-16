FROM node
LABEL authors="Duynn"
# update dependencies and install curl
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./ \
#     ./source ./

# This will copy everything from the source path 
# --more of a convenience when testing locally.
COPY . .
# update each dependency in package.json to the latest version
RUN yarn global add npm-check-updates \
    ncu -u \
    yarn install \
    yarn add express \
    yarn add jest \
    yarn add supertest
# If you are building your code for production
RUN yarn install --frozen-lockfile
# Bundle app source
COPY . /app
CMD ["sh", "-c", "node ./bin/www"]
