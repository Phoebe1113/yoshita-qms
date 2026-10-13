# yoshita_qms

Frappe/ERPNext app for YOSHITA VN (AS9100 QMS).

- `hooks.py`: app metadata; loads `translate_link.js` on every desk page.
- `public/js/translate_link.js`: makes Department link titles follow the user language (vi/en).

Install: add this app to the bench image, then `bench --site <site> install-app yoshita_qms`.
