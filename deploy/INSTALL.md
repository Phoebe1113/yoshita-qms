# Deploy yoshita_qms to the ERPNext server

Assumes the server runs ERPNext v16 via frappe_docker (custom image built from apps.json).
Unverified assumptions are marked (CONFIRM).

## 1. Build the image (on the server or a build host with Docker)

    export APPS_JSON_BASE64=$(base64 -w 0 deploy/apps.json)
    git clone https://github.com/frappe/frappe_docker && cd frappe_docker
    docker build \
      --build-arg=FRAPPE_PATH=https://github.com/frappe/frappe \
      --build-arg=FRAPPE_BRANCH=version-16 \
      --build-arg=APPS_JSON_BASE64=$APPS_JSON_BASE64 \
      --tag=yoshita/erpnext-custom:v16 \
      --file=images/custom/Containerfile .

## 2. Point the stack at the new image

Set `image: yoshita/erpnext-custom:v16` in the compose file for backend, scheduler, socketio, workers, then:

    docker compose up -d

## 3. Install the app on the site

    docker compose exec backend bench --site <SITE_NAME> install-app yoshita_qms
    docker compose exec backend bench --site <SITE_NAME> migrate
    docker compose exec backend bench --site <SITE_NAME> clear-cache

Replace `<SITE_NAME>` with the site name (CONFIRM: e.g. yoshita.com.vn).

## 4. Verify

- Change language to Tiếng Việt, open a form with a Department link: names should show in Vietnamese.
- Change language to English: names should show in English.

## Notes

- The Property Setter on Department (show title in link) and the 36 Department translations live in the database, not in the app. They persist.
- The app's `translate_link.js` runs on every desk page via `app_include_js`.
