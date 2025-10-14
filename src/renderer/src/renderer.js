function init() {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
  })
}

function doAThing() {

  const menuItems = Array.from(document.querySelectorAll('.menu li'))
  let activeIndex = Math.max(0, menuItems.findIndex(li => li.classList.contains('active')))
  if (menuItems.length > 0 && activeIndex === -1) {
    activeIndex = 0
    menuItems[0].classList.add('active')
  }

  function setActive(index) {
    if (menuItems.length === 0) return
    const bounded = ((index % menuItems.length) + menuItems.length) % menuItems.length
    if (bounded === activeIndex) return
    menuItems[activeIndex]?.classList.remove('active')
    menuItems[bounded]?.classList.add('active')
    activeIndex = bounded
  }

  const leftBtn = document.querySelector('.wheel .left')
  leftBtn?.addEventListener('click', () => {
    if (menuItems.length === 0) return
    setActive(activeIndex - 1)
  })

  const rightBtn = document.querySelector('.wheel .right')
  rightBtn?.addEventListener('click', () => {
    if (menuItems.length === 0) return
    setActive(activeIndex + 1)
  })

  const menuBtn = document.querySelector('.wheel .menu-btn')
  menuBtn?.addEventListener('click', () => {
    if (menuItems.length === 0) return
    setActive(0)
  })

  const centerBtn = document.querySelector('.center-btn')
  centerBtn?.addEventListener('click', () => {
    if (menuItems.length === 0) return
    const selected = menuItems[activeIndex]?.textContent?.trim() || ''
    document.dispatchEvent(new CustomEvent('menu:selected', { detail: { index: activeIndex, label: selected } }))
    menuItems[activeIndex]?.classList.add('active')
  })

  let isPlaying = false
  const playBtn = document.querySelector('.wheel .play')
  function renderPlay() {
    if (!playBtn) return
    // playBtn.textContent = isPlaying ? 
  }
  renderPlay()
  playBtn?.addEventListener('click', () => {
    isPlaying = !isPlaying
    renderPlay()
    document.dispatchEvent(new CustomEvent('player:toggle', { detail: { playing: isPlaying } }))
  })
}

function replaceText(selector, text) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = text
  }
}

init()
