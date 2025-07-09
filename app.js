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

// ========== Tabs ==========
const tabs = Array.from(document.querySelectorAll('[data-tabs]'))

const tabsLinkActiveClass = 'tabs__link--active'
const tabsPagesActiveClass = 'tabs__page--active'

tabs.forEach(tab => {
  const links = Array.from(document.querySelectorAll('[data-tabs-link]'))
  const pages = Array.from(document.querySelectorAll('[data-tabs-page]'))

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove(tabsLinkActiveClass))
      link.classList.add(tabsLinkActiveClass)
      
      pages.forEach(page => page.classList.remove(tabsPagesActiveClass))
      pages[index].classList.add(tabsPagesActiveClass)
    })
  })
})