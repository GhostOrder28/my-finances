* validation error message added in sale-form-page.vue.
* navigation menu now auto closes when a link is clicked.
* navigation menu now doesn't have different color for current page and hovered link.

Frontend.
* last commit lacked updated build files so the changes were not applied.
* phone icon now is only displayed if there is a contact phone.
* label=false prop added to the edit button in the payments table.
* dispatch calls for signupUser and requestGuest actions are now awaited to prevent race condition.
* spinner added in client-list-page.vue, client-page.vue and sale-page.vue.

Backend.
* guest user generation implemented.
* lorem-ipsum package was added to help with randomization.
* itemsSchema _id generation was disabled.
* route for guest deletion added.
