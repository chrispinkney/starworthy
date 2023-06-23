# Dockerfile
#
# -------------------------------------
# Context: Build
FROM node:lts-alpine as build

# Set Working Directory Context
WORKDIR "/starworthy"

# Copy package files
COPY package.json .
COPY prisma prisma

# Context: Dependencies
FROM build AS dependencies

# Install Modules
RUN npm install
RUN npm install -g prisma
# COPY .env .env // removed for digital ocean deployment
RUN npm run db:migrate

# -------------------------------------
# Context: Builder
FROM dependencies as builder

# Copy necessary files to build starworthy
COPY src src
COPY tsconfig.json .

# tsc
RUN npm run build

# -------------------------------------
# Context: Release
FROM build AS release

# GET deployment code from previous containers
COPY --from=dependencies /starworthy/node_modules /starworthy/node_modules
COPY --from=builder /starworthy/dist /starworthy/dist
# COPY .env .env // removed for digital ocean deployment

# Running starworthy when the image gets built
CMD ["sh", "-c", "npm start"]
