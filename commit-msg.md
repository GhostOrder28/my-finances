Big update, css and scss were replaced by bootstrap, new components, the app is now in a usable state.

# Frontend.
* vanila css and scss were replaced by bootstrap.
* a bootstrap-extended.scss file was create to extend the bootstrap scss variables.
* getReferenceHeight function was adjusted to calculate the relative height of the current element properly.
* vue-datepicker-next package was added to handle date picking in sale-form-page.vue and payment-form-page.vue components.
* new action-button.vue component added for edit and delete actions.
* edit-button.vue and delete-button.vue components were added along with the edit and thrash icons.
* new back-link.vue component added along with the back icon.
* submit and cancel form buttons were grouped under their own component form-buttons.vue.
* new modal.vue component was added to handle confirmation before deletion.
* new icon for the close buttons added.
* all pages and components are styled.
* all dates are parsed to have the dd-MM-yyyy format.

# Backend.
* the SalePatchReqBody saleDate field was change from string to Date.
* User type from auth.types was moved to a new user.types file.
