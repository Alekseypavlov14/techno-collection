// ========== Constants ==========
const PERCENTS = 100

const NORMALIZED_MIN = 0
const NORMALIZED_MAX = 1

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

// ========== Range ==========
const ranges = Array.from(document.querySelectorAll('[data-range]'))

ranges.forEach(range => {
  const track = range.querySelector('[data-range-track]')
  const pointMin = range.querySelector('[data-range-point-min]')
  const pointMax = range.querySelector('[data-range-point-max]')

  const labelMin = range.querySelector('[data-range-label-min]')
  const labelMax = range.querySelector('[data-range-label-max]')

  // check required elements
  if (!track || !pointMin || !pointMax) return 

  // store range boundaries
  const rangeMin = Number(range.getAttribute('data-range-value-min') || NORMALIZED_MIN)
  const rangeMax = Number(range.getAttribute('data-range-value-max') || NORMALIZED_MAX)

  // store values
  let valueMin = NORMALIZED_MIN
  let valueMax = NORMALIZED_MAX

  // init control
  handleUpdateMin(valueMin)
  handleUpdateMax(valueMax)

  let isPointMinMoving = false
  let isPointMaxMoving = false

  // handle moving initiation
  pointMin.addEventListener('mousedown', () => {
    isPointMinMoving = true
  })
  pointMax.addEventListener('mousedown', () => {
    isPointMaxMoving = true
  })

  // handle value changing 
  document.addEventListener('mousemove', (e) => {
    if (!isPointMinMoving && !isPointMaxMoving) return

    const trackRect = track.getBoundingClientRect()
    
    const mouseX = e.clientX
    const trackX = trackRect.x

    const dx = mouseX - trackX
    const trackWidth = trackRect.width

    const newValue = clamp(NORMALIZED_MIN, dx / trackWidth, NORMALIZED_MAX)
    
    if (isPointMinMoving) handleUpdateMin(newValue)
    if (isPointMaxMoving) handleUpdateMax(newValue)
  })

  // handle moving stop
  window.addEventListener('mouseup', () => {
    isPointMinMoving = false
    isPointMaxMoving = false
  })
  window.addEventListener('mouseleave', () => {
    isPointMinMoving = false
    isPointMaxMoving = false
  })
  
  // handle updates
  function handleUpdateMin(value) {
    // prevent min and max swap
    if (value > valueMax) value = valueMax

    // update state
    valueMin = value

    // update styles
    range.style.setProperty('--value-min', `${value * PERCENTS}%`)   

    // update hints
    if (labelMin) labelMin.innerHTML = formatHintValue(computeAbsoluteValue(value))
  }
  function handleUpdateMax(value) {
    // prevent min and max swap
    if (value < valueMin) value = valueMin

    // update state
    valueMax = value

    // update styles
    range.style.setProperty('--value-max', `${value * PERCENTS}%`)

    // update hints
    if (labelMax) labelMax.innerHTML = formatHintValue(computeAbsoluteValue(value))
  }

  // utils
  function computeAbsoluteValue(value) {
    const amplitude = rangeMax - rangeMin
    return Math.round(amplitude * value + rangeMin)
  }
  function formatHintValue(absoluteValue) {
    return absoluteValue.toLocaleString('ru-Ru')
  }
})

// ========== Utils ==========
function clamp(min, value, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}