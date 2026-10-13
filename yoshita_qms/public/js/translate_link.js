// Make Department titles in Link fields translate with the user's language.
// Frappe only translates link titles for DocTypes listed in frappe.boot.translated_doctypes.
// Translations come from the Translation doctype (language vi).
(function () {
	if (!frappe.boot) return;
	frappe.boot.translated_doctypes = frappe.boot.translated_doctypes || [];
	if (!frappe.boot.translated_doctypes.includes("Department")) {
		frappe.boot.translated_doctypes.push("Department");
	}
})();
