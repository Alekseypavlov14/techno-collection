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

// load icons
const headerCatalogLinkIcons = Array.from(document.querySelectorAll('.header-catalog-dropdown-menu__link-icon'))
const headerCatalogLinksDataPathAttribute = 'data-path'

headerCatalogLinkIcons.forEach(icon => {
  icon.style.setProperty('--path', icon.getAttribute(headerCatalogLinksDataPathAttribute))
})
