# Dockerfile
#
# -------------------------------------
# Context: Build
FROM node:lts-alpine as build

# Set Working Directory Context
WORKDIR "/starworthy"

# Copy package files
COPY api/package.json .
COPY api/prisma prisma

# Context: Dependencies
FROM build AS dependencies

ARG POSTGRES_PRISMA_URL
ARG POSTGRES_URL_NON_POOLING

# Install Modules
RUN npm install
RUN npm install -g prisma
RUN npm run db:generate

# -------------------------------------
# Context: Builder
FROM dependencies as builder

# Copy necessary files to build starworthy
COPY api/src src
COPY api/tsconfig.json .

# tsc
RUN npm run build

# -------------------------------------
# Context: Release
FROM build AS release

# GET deployment code from previous containers
COPY --from=dependencies /starworthy/node_modules /starworthy/node_modules
COPY --from=builder /starworthy/dist /starworthy/dist

# Running starworthy when the image gets built
CMD ["sh", "-c", "npm start"]
