// task id = 4186
document.addEventListener('DOMContentLoaded', function () {
	const html = document.documentElement
	const currLangDom = document.querySelector('.curr_lang')
	const langSwitcher = document.querySelector('.lang_switcher_outer')
	const langListItem = Array.from(document.querySelectorAll('.lang_list_item'))
	const userLangBrowser = navigator.language || navigator.userLanguage
	const languageParts = userLangBrowser.split('-')
	const userLang = languageParts[0]

	const listOfLang = ['tr']

	const countryToLang = {
		default: 'tr',
	}

	let lang = countryToLang[userLang] || countryToLang.default

	listOfLang.forEach((item) => {
		html.classList.remove(item)
	})
	html.classList.add(lang)
	html.setAttribute('data-lang', lang)

	function changeLanguage(item) {
		hidePreloader()
		const lang = item.getAttribute('data-lang')

		listOfLang.forEach((langItem) => {
			html.classList.contains(langItem) && html.classList.remove(langItem)
		})

		html.classList.add(lang)
		html.setAttribute('data-lang', lang)

		langListItem.forEach((langItem) => langItem.classList.remove('curr'))
		item.classList.add('curr')
		currLangDom.innerHTML = item.innerHTML
	}

	langListItem.forEach((item) => {
		item.classList.remove('curr')
		item.addEventListener('click', () => changeLanguage(item))
	})

	const currLangItem = langListItem.find((item) => item.getAttribute('data-lang') === lang)
	if (currLangItem) {
		currLangItem.classList.add('curr')
		currLangDom.innerHTML = currLangItem.innerHTML
	} else {
		currLangDom.innerHTML = `<span>${countryToLang.default}</span>`
	}

	langSwitcher.addEventListener('click', () => {
		langSwitcher.classList.toggle('act')
		document.querySelector('.lang_list').classList.toggle('act')
	})

	document.addEventListener('click', function (e) {
		if (!langSwitcher.contains(e.target)) {
			langSwitcher.classList.remove('act')
			document.querySelector('.lang_list').classList.remove('act')
		}
	})

	document.getElementById('year').textContent = new Date().getFullYear()

	function startStepsAnimation() {
		const steps = document.querySelectorAll('.step')
		steps.forEach((step, index) => {
			setTimeout(() => {
				step.classList.add('visible')
				setTimeout(() => step.classList.add('final-scale'), 400)
			}, index * 600)
		})
	}

	function hidePreloader() {
		html.classList.remove('hide')
		setTimeout(() => {
			html.classList.add('hide')
			startStepsAnimation()
		}, 1000)
	}

	hidePreloader()

	document.querySelectorAll('.stroke span, .shadow-text span').forEach((element) => {
		element.setAttribute('data-text', element.textContent.trim())
	})
})

let isActive = false
let touchStartX = 0
let touchEndX = 0

const mainWrapper = document.querySelector('.main-wrapper')
const main = document.getElementById('main')
const sections = document.querySelectorAll('.main__section')
const closeBtn = document.getElementById('closeBtn')

const isMobile = () => true


const openSection = (sectionType) => {
	if (isActive) return
	main.className = `main main--${sectionType}-active`
	mainWrapper.classList.add('main-wrapper_active')
	isActive = true
}

const handleSectionClick = (e) => {
	const section = e.currentTarget
	const sectionType = section.dataset.section
	openSection(sectionType)
}

const handleTouchStart = (e) => {
	if (!isMobile() || isActive) return
	touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
	if (!isMobile() || isActive) return
	touchEndX = e.changedTouches[0].screenX
	handleSwipe()
}

const handleSwipe = () => {
	const swipeThreshold = 50
	const swipeDistance = touchEndX - touchStartX
	if (Math.abs(swipeDistance) < swipeThreshold) return
	if (swipeDistance > 0) {
		openSection('slots')
	} else {
		openSection('sports')
	}
}

const closeSections = () => {
	main.className = 'main'
	mainWrapper.classList.remove('main-wrapper_active')
	isActive = false
}

const handleKeyDown = (e) => {
	if (e.key === 'Escape' && isActive) {
		closeSections()
	}
}

const initEvents = () => {
	sections.forEach((section) => {
		section.addEventListener('click', handleSectionClick)
	})
	main.addEventListener('touchstart', handleTouchStart, { passive: true })
	main.addEventListener('touchend', handleTouchEnd, { passive: true })
	closeBtn.addEventListener('click', closeSections)
	document.addEventListener('keydown', handleKeyDown)
}

document.addEventListener('DOMContentLoaded', initEvents)

// let isActive = false
// let touchStartX = 0
// let touchEndX = 0

// const mainWrapper = document.querySelector('.main-wrapper')
// const main = document.getElementById('main')
// const sections = document.querySelectorAll('.main__section')
// const closeBtn = document.getElementById('closeBtn')

// const isMobile = () => window.innerWidth <= 640

// const openSection = (sectionType) => {
// 	if (isActive) return
// 	main.className = `main main--${sectionType}-active`
// 	mainWrapper.classList.add('main-wrapper_active')
// 	isActive = true
// }

// const handleSectionClick = (e) => {
// 	if (isMobile()) return
// 	const section = e.currentTarget
// 	const sectionType = section.dataset.section
// 	openSection(sectionType)
// }

// const handleTouchStart = (e) => {
// 	if (!isMobile() || isActive) return
// 	touchStartX = e.changedTouches[0].screenX
// }

// const handleTouchEnd = (e) => {
// 	if (!isMobile() || isActive) return
// 	touchEndX = e.changedTouches[0].screenX
// 	handleSwipe()
// }

// const handleSwipe = () => {
// 	const swipeThreshold = 50
// 	const swipeDistance = touchEndX - touchStartX
// 	if (Math.abs(swipeDistance) < swipeThreshold) return
// 	if (swipeDistance > 0) {
// 		openSection('slots')
// 	} else {
// 		openSection('sports')
// 	}
// }

// const closeSections = () => {
// 	main.className = 'main'
// 	mainWrapper.classList.remove('main-wrapper_active')
// 	isActive = false
// }

// const handleKeyDown = (e) => {
// 	if (e.key === 'Escape' && isActive) {
// 		closeSections()
// 	}
// }

// const initEvents = () => {
// 	sections.forEach((section) => {
// 		section.addEventListener('click', handleSectionClick)
// 	})
// 	main.addEventListener('touchstart', handleTouchStart, { passive: true })
// 	main.addEventListener('touchend', handleTouchEnd, { passive: true })
// 	closeBtn.addEventListener('click', closeSections)
// 	document.addEventListener('keydown', handleKeyDown)
// }

// document.addEventListener('DOMContentLoaded', initEvents)
