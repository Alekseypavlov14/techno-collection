// ========== Header dropdowns ==========
// toggling
const headerCustomersDropdownTrigger = document.getElementById('header-customers-dropdown-trigger')
const headerCustomersDropdown = document.getElementById('header-customers-dropdown')

const headerCatalogDropdownTrigger = document.getElementById('header-catalog-dropdown-trigger')
const headerCatalogDropdown = document.getElementById('header-catalog-dropdown')

const headerDropdownOpenedCSSClass = 'header-dropdown--opened'

headerCustomersDropdownTrigger.addEventListener('click', () => {
  headerCatalogDropdown.classList.remove(headerDropdownOpenedCSSClass)
  headerCustomersDropdown.classList.toggle(headerDropdownOpenedCSSClass)
})
headerCatalogDropdownTrigger.addEventListener('click', () => {
  headerCustomersDropdown.classList.remove(headerDropdownOpenedCSSClass)
  headerCatalogDropdown.classList.toggle(headerDropdownOpenedCSSClass)
})
