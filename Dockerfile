# ---------- build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_PUBLIC_BASE_URL
ARG VITE_PUBLIC_API_BASE_URL
ARG VITE_KAKAO_JS_KEY

ENV VITE_PUBLIC_BASE_URL=$VITE_PUBLIC_BASE_URL
ENV VITE_PUBLIC_API_BASE_URL=$VITE_PUBLIC_API_BASE_URL
ENV VITE_KAKAO_JS_KEY=$VITE_KAKAO_JS_KEY

RUN pnpm build


# ---------- runtime stage ----------
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
