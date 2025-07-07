// Header dropdowns
const headerCustomersDropdownTrigger = document.getElementById('header-customers-dropdown-trigger')
const headerCustomersDropdown = document.getElementById('header-customers-dropdown')

const headerCustomersDropdownOpenedCSSClass = 'header-customers-dropdown--opened'

headerCustomersDropdownTrigger.addEventListener('click', () => {
  headerCustomersDropdown.classList.toggle(headerCustomersDropdownOpenedCSSClass)
})