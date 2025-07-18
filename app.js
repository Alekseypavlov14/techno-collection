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

  left.addEventListener('click', () => {
    let maxIndex = computeMaxIndex()
    index = clamp(0, index - 1, maxIndex)
    
    updateIndex()
  })
  right.addEventListener('click', () => {
    let maxIndex = computeMaxIndex()
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

// ========== Preview ==========
try {
  const previews = Array.from(document.querySelectorAll('[data-preview]'))
  const activeCSSClass = 'active'
  
  previews.forEach(preview => {
    const options = preview.querySelectorAll('[data-preview-option]')
    const current = preview.querySelector('[data-preview-current]')
    const links = Array.from(preview.querySelectorAll('[data-preview-link]'))
    const image = current.querySelector('img')
  
    options.forEach(option => {
      option.addEventListener('click', () => {
        const src = option.getAttribute('data-preview-option')
        image.setAttribute('src', src)
      })
    })
  
    links.forEach((link, index) => {
      link.addEventListener('click', () => {
        options.forEach(option => option.classList.remove(activeCSSClass))
        options[index].classList.add(activeCSSClass)

        links.forEach(link => link.classList.remove(activeCSSClass))
        links[index].classList.add(activeCSSClass)
      })
    })
  })
}
catch {}

// ========== Algorithm ==========
try {
  const algorithmBlocks = Array.from(document.querySelectorAll('[data-algorithm]'))
  const stepActiveCSSClass = 'algorithm-step--active'
  
  algorithmBlocks.forEach(block => {
    // get steps
    const stepsContainer = document.querySelector('[data-algorithm-steps]')
    const steps = Array.from(document.querySelectorAll('[data-algorithm-step]'))
    
    // set placeholder height to allow sticky
    block.style.setProperty('--placeholder-height', `${stepsContainer.scrollHeight}px`)
    // set steps z-indexes
    steps.forEach((step, index) => step.style.setProperty('--step', index + 1))

    // compute max deviations
    const maxDeviations = steps.map(step => {
      return step.getBoundingClientRect().top - steps[0].getBoundingClientRect().top
    })

    // handle scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY - block.offsetTop

      steps.forEach((step, index) => {
        const deviation = clamp(0, scrolled, maxDeviations[index])
        step.style.setProperty('--deviation', `${-deviation}px`)

        // update current step
        if (scrolled > maxDeviations[index]) {
          steps.forEach(step => step.classList.remove(stepActiveCSSClass))
          step.classList.add(stepActiveCSSClass)
        }
      })
    })
  })

  // mobile slider
  const algorithmSliders = Array.from(document.querySelectorAll('[data-algorithm-slider]'))

  algorithmSliders.forEach(slider => {
    const left = slider.querySelector('[data-algorithm-slider-left]')
    const right = slider.querySelector('[data-algorithm-slider-right]')
    const slides = slider.querySelector('[data-algorithm-steps]')
    
    const maxIndex = slides.children.length - 1

    let index = 0

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
  })
}
catch {}

//======== questions ========
try {
  const openedModifier = 'question--opened'
  
  document.querySelectorAll('[data-question]').forEach(block => {
    block.addEventListener('click', () => {
      block.classList.toggle(openedModifier)
    })
  })
}
catch {}

//============== scrolable block home ================//
try {
  const scalableBlocks = Array.from(document.querySelectorAll('[data-scalable-image-block]'))
  
  const MINIMAL_SCALE = 0.8
  const MAXIMUM_SCALE = 1

  scalableBlocks.forEach(block => {
    const image = document.querySelector('[data-scalable-image]');
    
    window.addEventListener('scroll', () => {
      const minimalScroll = block.offsetTop - window.innerHeight
      const maximumScroll = block.offsetTop

      const ratio = (window.scrollY - minimalScroll) / (maximumScroll - minimalScroll)
      const scale = MINIMAL_SCALE + (MAXIMUM_SCALE - MINIMAL_SCALE) * ratio

      const adjustedScale = clamp(MINIMAL_SCALE, scale, MAXIMUM_SCALE)

      image.style.setProperty('--scale', adjustedScale)
    });
  })

} catch {}

// ========== Burger button ==========
const burgerButtons = Array.from(document.querySelectorAll('[data-burger-button]'))

const burgerButtonActiveCSSClass = 'burger-button--active'

burgerButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle(burgerButtonActiveCSSClass)
  })
})

// ========== Select ==========
try {
  const selects = Array.from(document.querySelectorAll('[data-select]'))

  const selectValueAttribute = 'data-select-value'
  const selectOpenedCSSClass = 'select--opened'
  
  selects.forEach(select => {
    const control = select.querySelector('[data-select-control]') 
    const label = select.querySelector('[data-select-label]')
    const options = Array.from(select.querySelectorAll('[data-select-option]'))

    control.addEventListener('click', () => {
      select.classList.toggle(selectOpenedCSSClass)
    })

    options.forEach(option => {
      option.addEventListener('click', () => {
        // update value
        const value = option.getAttribute(selectValueAttribute) ?? ''
        select.setAttribute(selectValueAttribute, value)

        // update label
        label.innerHTML = option.innerHTML

        // close select
        select.classList.remove(selectOpenedCSSClass)
      })
    })

    // handle outside clicks
    onOutsideClick(select, () => {
      select.classList.remove(selectOpenedCSSClass)
    })
  })
}
catch {}

// ========== dropdowns ==========
try {
  const dropdowns = Array.from(document.querySelectorAll('[data-dropdown]'))
  
  const dropdownOpenedCSSClass = 'dropdown--opened'
  
  dropdowns.forEach(dropdown => {
    const control = dropdown.querySelector('[data-dropdown-control]')
  
    control.addEventListener('click', () => {
      dropdown.classList.toggle(dropdownOpenedCSSClass)
    })
  
    onOutsideClick(dropdown, () => {
      dropdown.classList.remove(dropdownOpenedCSSClass)
    })
  })
}
catch {}

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
function onOutsideClick(block, callback) {
  window.addEventListener('click', (e) => {
    if (!block.contains(e.target)) callback(e)
  })
}
