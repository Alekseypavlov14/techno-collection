// ========== Constants ==========
const PERCENTS = 100

const NORMALIZED_MIN = 0
const NORMALIZED_MAX = 1

// ========== Header dropdowns ==========
// toggling
try {
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
}
catch {}

// ========== Home Catalog ==========
try {
  const homeCatalogLinks = Array.from(document.querySelectorAll('[data-home-catalog-link]'))
  const homeCatalogSubLinks = Array.from(document.querySelectorAll('[data-home-catalog-sub-link]'))
  
  const homeCatalogLinkActiveClassCSS = 'home-catalog-nav__category--active'
  const homeCatalogSubLinkActiveClassCSS = 'home-catalog-nav__subcategory--active'

  homeCatalogLinks.forEach(link => {
    link.addEventListener('click', () => {
      homeCatalogLinks.forEach(link => link.classList.remove(homeCatalogLinkActiveClassCSS))
      link.classList.add(homeCatalogLinkActiveClassCSS)
    })
  })

  homeCatalogSubLinks.forEach(link => {
    link.addEventListener('click', () => {
      homeCatalogSubLinks.forEach(link => link.classList.remove(homeCatalogSubLinkActiveClassCSS))
      link.classList.add(homeCatalogSubLinkActiveClassCSS)
    })
  })
}
catch {}

// ========== Tabs ==========
try {
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
}
catch {}

// ========== Range ==========
try {
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
}
catch {}

// ========== Main Slider ==========
try {
  const mainSlider = document.getElementById('main-slider')
  const mainSliderLeft = document.getElementById('main-slider-left')
  const mainSliderRight = document.getElementById('main-slider-right')

  const slides = Number(mainSlider.getAttribute('data-slides'))
  
  // state
  let index = 0
  
  // listeners
  mainSliderLeft.addEventListener('click', decrementSlider)
  mainSliderRight.addEventListener('click', incrementSlider)

  // init
  initSliderWidth(slides)
  updateSliderPosition(index)

  // handlers
  function incrementSlider() {
    index = (index + 1 + slides) % slides
    updateSliderPosition(index)
  }
  function decrementSlider() {
    index = (index - 1 + slides) % slides
    updateSliderPosition(index)
  }

  // utils
  function updateSliderPosition(index) {
    mainSlider.style.setProperty('--index', index)
  }
  function initSliderWidth(slides) {
    mainSlider.style.setProperty('--width', `${slides * PERCENTS}%`)
  }
}
catch {}

// ========== Forms ==========
try {
  const phoneNumberInputs = Array.from(document.querySelectorAll('[data-form-phone-number]'))
  const phoneNumberCharacters = 10

  phoneNumberInputs.forEach(input => {
    input.value = formatPhoneNumber('')

    input.addEventListener('focus', (e) => {
      const value = e.target.value

      const rawValue = getRawValue(value)
      
      // move cursor
      const cursorPosition = getCursorPosition(rawValue)
      input.setSelectionRange(cursorPosition, cursorPosition)
    })

    input.addEventListener('input', (e) => {
      const value = e.target.value

      // get raw numeric value
      const rawValue = getRawValue(value)
      // format value
      const formattedValue = formatPhoneNumber(rawValue)

      // assign formatted value
      input.value = formattedValue

      // move cursor
      const cursorPosition = getCursorPosition(rawValue)
      input.setSelectionRange(cursorPosition, cursorPosition)
    })
  })

  function formatPhoneNumber(value) {
    const paddedValue = value.padEnd(phoneNumberCharacters, '_')

    let result = '+7 ('

    result += paddedValue.slice(0, 3)
    result += ') '
    result += paddedValue.slice(3, 6)
    result += ' '
    result += paddedValue.slice(6, 8)
    result += ' '
    result += paddedValue.slice(8, 10)
    
    return result
  }
  function getCursorPosition(value) {
    let increment = 4 // covers "+7 ("
    if (value.length <= 3) return increment + value.length

    increment += 2 // space and closing parenthesis
    if (value.length <= 6) return increment + value.length

    increment += 1 // second space
    if (value.length <= 8) return increment + value.length

    increment += 1 // last space
    return increment + value.length
  }
  function getRawValue(value) {
    return value
      .split('')
      .filter(char => char.match(/\d/))
      .slice(1) // to remove country code
      .join('')
  }
}
catch {}

// ========== Product Browser ==========
try {
  const collapses = Array.from(document.querySelectorAll('[data-product-browser-collapse]'))
  const collapseOpenedCSSClass = 'product-browser-filters-collapse--opened'
  
  collapses.forEach(collapse => {
    const header = collapse.querySelector('[data-product-browser-collapse-header]')
    const body = collapse.querySelector('[data-product-browser-collapse-body]')

    if (!header || !body) return

    header.addEventListener('click', () => {
      collapse.classList.toggle(collapseOpenedCSSClass)
    })
  })
}
catch {}

// ========== Multiple slider ==========
const multipleSliders = Array.from(document.querySelectorAll('[data-multiple-slider]'))

multipleSliders.forEach(slider => {
  const left = slider.querySelector('[data-multiple-slider-left]')
  const right = slider.querySelector('[data-multiple-slider-right]')
  const slides = slider.querySelector('[data-multiple-slider-slides]')
  
  let index = 0
  
  let maxIndex = computeMaxIndex()

  left.addEventListener('click', () => {
    index = clamp(0, index - 1, maxIndex)
    updateIndex()
  })
  right.addEventListener('click', () => {
    index = clamp(0, index + 1, maxIndex)
    updateIndex()
  })

  function updateIndex() {
    slider.style.setProperty('--index', index)
  }

  function computeMaxIndex() {
    const sliderWidth = slider.getBoundingClientRect().width
    const slidesWidth = slides.scrollWidth
    
    const slideWidth = parseFloat(getComputedStyle(slider).getPropertyValue('--card-width'))
    const gap = parseFloat(getComputedStyle(slider).getPropertyValue('--gap'))

    const maxIndex = Math.ceil((slidesWidth - sliderWidth) / (slideWidth + gap))
    return Math.max(maxIndex, 0)
  }
})

// ========== Utils ==========
function clamp(min, value, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}
function sum(array) {
  return array.reduce((sum, item) => sum + item, 0)
}
function average(array) {
  if (!array.length) return 0
  return sum(array) / array.length
}
