window.addEventListener('load', (event) => {
	__funcRippleEffect();
	// __funcDisplayModalContainer(
	// 	'__hidden-modal-container',
	// 	{ style: 'flex' },
	// 	{ style: 'block' },
	// 	{ h1: 'This is header', p: 'This is paragraph', btn1: 'asasds', btn2: 'True' }
	// );
	// __funcHideModalContainer();

	/* Message Hover Function */
	__funcHoverMessage();
	/* Menu Hover Function */
	__funcHoverMenu();
	/* AOS animation init */
	AOS.init({
		duration : 400,
		once     : true
	});
});

/* Shows off modal box */

function __funcDisplayModalContainer(
	eModalName,
	eBackgroundSectionStyles,
	eModalContainerStyles,
	eCustomText = null,
	dRepeatResult = null
) {
	let eBackgroundSection = document.body.querySelector('.__section-hidden-container');
	let eModalContainer = document.body.querySelector('.' + eModalName);
	let eModalContainerButtons = eModalContainer.querySelectorAll('.__modal-buttons button');
	let eModalContainerH1 = eModalContainer.querySelector('.__header-title h1');
	let eModalContainerP = eModalContainer.querySelector('.__header-title p');

	if (
		typeof eBackgroundSectionStyles === 'object' &&
		eBackgroundSectionStyles !== null &&
		typeof eModalContainerStyles === 'object' &&
		eModalContainerStyles !== null &&
		typeof eCustomText === 'object' &&
		eCustomText !== null
	) {
		for (const property in eBackgroundSectionStyles) {
			eBackgroundSection.style.display = eBackgroundSectionStyles[property];
		}
		for (const property in eModalContainerStyles) {
			eModalContainer.style.display = eModalContainerStyles[property];
		}
		for (const property in eCustomText) {
			eModalContainerH1.innerHTML = eCustomText['h1'];
			eModalContainerP.innerHTML = eCustomText['p'];
			eModalContainerButtons[0].innerHTML = eCustomText['btn1'];
			eModalContainerButtons[1].innerHTML = eCustomText['btn2'];
		}
	}

	eModalContainerButtons.forEach((eModalContainerButton, index) => {
		eModalContainerButton.addEventListener('click', (e) => {
			if (e.target.getAttribute('modal-response') === 'false') {
				__funcDisplayModalContainer('__hidden-modal-container', { style: 'none' }, { style: 'none' }, {}, true);
			} else {
				__funcDisplayModalContainer('__hidden-modal-container', { style: 'none' }, { style: 'none' }, {}, true);
			}
		});
	});
}

/* Click on times in modal box hide everything */

function __funcHideModalContainer() {
	let eModalContainerCloses = document.body.querySelectorAll('.__modal-close');

	eModalContainerCloses.forEach((eModalContainerClose, index) => {
		eModalContainerClose.addEventListener('click', () => {
			let eModalContainer = eModalContainerClose.parentElement;
			let eBackgroundSection = eModalContainer.parentElement;

			eModalContainer.style.display = 'none';
			eBackgroundSection.style.display = 'none';
		});
	});
}

/* Hover box */

function __funcHoverMessage() {
	let eHoverContainers = document.body.querySelectorAll('.__span-hover-container');

	eHoverContainers.forEach((eHoverContainer, index) => {
		eHoverContainer.addEventListener('mouseover', (e) => {
			/* Creating hover message underneath the hover element */
			let eHoverMessage = document.createElement('span');
			let dHoverMessage = eHoverContainer.getAttribute('hover-message');
			eHoverMessage.setAttribute('class', '__span-hover-message');
			eHoverMessage.innerHTML = dHoverMessage;
			document.body.append(eHoverMessage);

			/* Creating responsive tip arrow in hover message */
			let eTipArrow = document.createElement('span');
			eTipArrow.setAttribute('class', '__tip-arrow');
			eHoverMessage.append(eTipArrow);

			let xLeft = eHoverContainer.getBoundingClientRect().left;
			let xRight = window.innerWidth - eHoverContainer.getBoundingClientRect().right;
			let yTop = eHoverContainer.getBoundingClientRect().top;
			let yBottom = window.innerHeight - eHoverContainer.getBoundingClientRect().bottom;

			let dWindowWidth = window.innerWidth;
			let dHoverMessageWidth = eHoverMessage.offsetWidth;
			let dHoverContainerWidth = eHoverContainer.getBoundingClientRect().width;

			let eBody = document.querySelector('body');
			let dPaddingLeft = window.getComputedStyle(eBody, null).getPropertyValue('padding-left').replace('px', '');
			let dPaddingRight = window.getComputedStyle(eBody, null).getPropertyValue('padding-right').replace('px', '');

			eHoverMessage.style.top = yTop + 25 + 'px';

			if ((xLeft < dHoverMessageWidth && xRight > dHoverMessageWidth) || xLeft <= dWindowWidth / 2) {
				if (xLeft <= dHoverMessageWidth / 2) {
					console.log('1');
					eTipArrow.style.left = xLeft - dPaddingLeft + dHoverContainerWidth / 2 + 'px';
					eTipArrow.style.marginLeft = -eTipArrow.offsetWidth / 2 + 'px';
					eHoverMessage.style.left = dPaddingLeft + 'px';
				} else {
					console.log('2');
					eTipArrow.style.left = dHoverMessageWidth / 2 + 'px';
					eTipArrow.style.marginLeft = -eTipArrow.offsetWidth / 2 + 'px';
					eHoverMessage.style.left = xLeft + 'px';
					eHoverMessage.style.marginLeft = -dHoverMessageWidth / 2 + dHoverContainerWidth / 2 + 'px';
				}
			} else if ((xRight < dHoverMessageWidth && xLeft > dHoverMessageWidth) || xRight <= dWindowWidth / 2) {
				if (xRight <= dHoverMessageWidth / 2) {
					console.log('3');
					eTipArrow.style.right = xRight - dPaddingRight + dHoverContainerWidth / 2 + 'px';
					eTipArrow.style.marginRight = -eTipArrow.offsetWidth / 2 + 'px';
					eHoverMessage.style.right = dPaddingRight + 'px';
				} else {
					console.log('4');
					eTipArrow.style.right = dHoverMessageWidth / 2 + 'px';
					eTipArrow.style.marginRight = -eTipArrow.offsetWidth / 2 + 'px';
					eHoverMessage.style.right = xRight + 'px';
					eHoverMessage.style.marginRight = -dHoverMessageWidth / 2 + dHoverContainerWidth / 2 + 'px';
				}
			} else {
				console.log('Give up');
			}
		});

		eHoverContainer.addEventListener('mouseout', (e) => {
			let eHoverMessages = document.body.querySelectorAll('span.__span-hover-message');
			for (let index = 0; index < eHoverMessages.length; index++) {
				eHoverMessages[index].remove();
			}
		});

		window.addEventListener('resize', (e) => {
			let eHoverMessages = document.body.querySelectorAll('span.__span-hover-message');
			for (let index = 0; index < eHoverMessages.length; index++) {
				eHoverMessages[index].remove();
			}
		});
	});
}

/* Toggle cookie on click*/
function __funcSwitch(e) {
	e.getAttribute('value') == 0 ? e.setAttribute('value', 1) : e.setAttribute('value', 0);
}
/* Display password in form input */
function __funcDisplay() {
	const a = document.querySelector('input[name="user_password"]');
	a.getAttribute('type') == 'password' ? a.setAttribute('type', 'text') : a.setAttribute('type', 'password');
}
/* Button ripple effect on click */
function __funcRippleEffect(e) {
	const buttons = document.querySelectorAll('button');

	buttons.forEach((button, i) => {
		button.addEventListener('click', function(e) {
			let x = e.offsetX;
			let y = e.offsetY;

			let ripples = document.createElement('span');
			ripples.setAttribute('class', '__span-ripple');
			ripples.style.left = x + 'px';
			ripples.style.top = y + 'px';
			this.appendChild(ripples);

			setTimeout(() => {
				ripples.remove();
			}, 1000);
		});
	});
}
/* Display modal container */
function __funcDisplayModal(id1, parameter1, parameter2) {
	const modalParent = document.querySelector('.__footer-container-wrapper');
	const modalChild = document.querySelector(`#${id1}`);
	modalParent.style.display = parameter1;
	modalChild.style.display = parameter2;
}
/* Display modal container with confirmation buttons */
function __funcDisplayConfirmationModal(id1, id2, message1, message2, message3, callback) {
	const modalConfirm = document.querySelector('#__modal-confirmation');
	const modalChild = document.querySelector(`#${id1}`);
	const modalMessage = document.querySelector(`#${id2}`);
	const buttons = document.querySelectorAll('.__confirmation-buttons button');
	const buttonFailure = buttons[0];
	const buttonSuccess = buttons[1];

	modalConfirm.style.maxWidth = '300px';
	modalConfirm.style.display = 'block';
	modalChild.style.display = 'none';
	modalMessage.innerHTML = message1;
	buttonFailure.innerHTML = message2;
	buttonSuccess.innerHTML = message3;

	buttons.forEach((button, i) => {
		button.addEventListener('click', function(e) {
			if (button.id === '__answer-failure') {
				modalConfirm.style.display = 'none';
				modalChild.style.display = 'block';
				callback(false);
			} else if (button.id === '__answer-success') {
				modalConfirm.style.display = 'none';
				modalChild.style.display = 'block';
				callback(true);
			}
		});
	});
}
/* Display cropper container */
function __funcCropperModal(dFile) {
	if (dFile.files && dFile.files[0]) {
		const eCroppingImage = document.querySelector('#__cropper-image');
		const eUserAvatar = document.querySelector('#__avatar-image');
		const eBtnClose = document.querySelector('.__cropper-times');
		const eBtnSuccess = document.querySelector('button[name=crop]');
		const eBtnFailure = document.querySelector('button[name=cancel]');

		/* Reader object to preview image */
		let eFileReader = new FileReader();
		eFileReader.onload = function(e) {
			__funcDisplayModal('__modal-crop', 'flex', 'block');
			eCroppingImage.src = e.target.result;
			/* Set new cropper object */
			let eCropperPlugin = new Cropper(
				eCroppingImage,
				{
					aspectRatio      : 1,
					viewMode         : 3,
					responsive       : true,
					zoomable         : true,
					background       : false,
					minCropBoxWidth  : 40,
					minCropBoxHeight : 40
				},
				(eBtnSuccess.onclick = function() {
					eCanvasCropper = eCropperPlugin.getCroppedCanvas({ width: 200, height: 200 });
					eUserAvatar.src = eCanvasCropper.toDataURL();
					__ajaxUploadImage(eCanvasCropper);
					__funcDisplayModal('__modal-crop', 'none', 'none');
					eCropperPlugin.destroy();
				}),
				(eBtnFailure.onclick = function() {
					__funcDisplayModal('__modal-crop', 'none', 'none');
					eCropperPlugin.destroy();
				}),
				(eBtnClose.onclick = function() {
					__funcDisplayModal('__modal-crop', 'none', 'none');
					eCropperPlugin.destroy();
				})
			);
		};

		eFileReader.readAsDataURL(dFile.files[0]);
	} else {
		return;
	}
}

/* Display cropper container */
function __funcDisplayAccordion(e) {
	let eEntireSearchContainer = e.nextElementSibling;
	if (
		eEntireSearchContainer.style.maxHeight === '400px' &&
		eEntireSearchContainer.style.marginBottom === '2rem' &&
		eEntireSearchContainer.style.overflow === 'visible'
	) {
		eEntireSearchContainer.removeAttribute('style');
	} else {
		eEntireSearchContainer.style.maxHeight = '400px';
		eEntireSearchContainer.style.paddingTop = '1rem';
		eEntireSearchContainer.style.marginBottom = '2rem';

		setTimeout(() => {
			eEntireSearchContainer.style.overflow = 'visible';
		}, 600);
	}
}

function __funcSelectInput() {
	const eSelects = document.querySelectorAll('.__select-input');

	eSelects.forEach((eSelect, i) => {
		eSelect.addEventListener('click', function(e) {
			let eArrowIcon = this.childNodes[3];
			let ePlacerHolder = this.childNodes[1];
			let eDropdownContainer = this.nextElementSibling;
			let eInnerSelectorContent = this.querySelectorAll('small.__input-option');

			if (eInnerSelectorContent.length > 0 && eDropdownContainer.style.display === 'block') {
				eArrowIcon.classList.remove('__arrow-spin');
				eDropdownContainer.removeAttribute('style');
			} else if (
				(ePlacerHolder.className === '__placer' && eArrowIcon.className === 'fas fa-caret-down') ||
				(ePlacerHolder.className === '__placer __placer-focus' && eArrowIcon.className === 'fas fa-caret-down')
			) {
				eArrowIcon.classList.add('__arrow-spin');
				ePlacerHolder.classList.add('__placer-focus');
				eDropdownContainer.style.display = 'block';
			} else {
				eArrowIcon.classList.remove('__arrow-spin');
				ePlacerHolder.classList.remove('__placer-focus');
				eDropdownContainer.removeAttribute('style');
			}
		});
	});

	document.addEventListener('click', function(e) {
		let eNodeName = e.target.localName;
		let eClassName = e.target.className;
		let eTargetName = eNodeName + '.' + eClassName;

		let eDropdownContainers = document.querySelectorAll('.__select-dropdown');

		if (
			eTargetName !== 'div.__select-input' &&
			eTargetName !== 'li.__dropdown-option' &&
			eTargetName !== 'small.__input-option'
		) {
			for (let i = 0; i < eDropdownContainers.length; i++) {
				let eArrowIcons = eDropdownContainers[i].previousElementSibling.querySelectorAll('.fas.fa-caret-down');
				let ePlacerHolders = eDropdownContainers[i].previousElementSibling.querySelectorAll('.__placer');
				let eInnerSelectorContents = eDropdownContainers[i].previousElementSibling.querySelectorAll(
					'small.__input-option'
				);

				if (eInnerSelectorContents.length > 0 && eDropdownContainers[i].style.display === 'block') {
					eArrowIcons[0].classList.remove('__arrow-spin');
					eDropdownContainers[i].removeAttribute('style');
				} else if (eInnerSelectorContents.length > 0 && !eDropdownContainers[i].hasAttribute('style')) {
					eArrowIcons[0].classList.remove('__arrow-spin');
				} else {
					eArrowIcons[0].classList.remove('__arrow-spin');
					ePlacerHolders[0].classList.remove('__placer-focus');
					eDropdownContainers[i].removeAttribute('style');
				}
			}
		}
	});
}

function __funcSelectOptions(e) {
	let eInnerText = e.childNodes[0].textContent;
	let eNewOption = document.createElement('small');
	let eSelectContainer = e.parentElement.parentElement.previousElementSibling;
	/* Create inside element in select area */
	eNewOption.setAttribute('class', '__input-option');
	eNewOption.setAttribute('onclick', '__funcSelectDelete(this)');
	eNewOption.innerHTML = eInnerText;
	eSelectContainer.appendChild(eNewOption);
	e.parentElement.parentElement.style.top = 'calc(' + eSelectContainer.offsetHeight + 'px + 1rem)';
	e.style.display = 'none';
}

function __funcSelectDelete(e) {
	let eSelectContent = e.parentElement;
	let eDropdownContent = eSelectContent.nextElementSibling.querySelectorAll('li');

	for (var i = 0; i < eDropdownContent.length; i++) {
		if (eDropdownContent[i].childNodes[0].textContent == e.childNodes[0].textContent) {
			eDropdownContent[i].removeAttribute('style');
			e.remove();
		}
	}
}

function __funcSelectSearch(e) {
	let dSearchText = e.childNodes[0].textContent;
	let eInputDropdown = e.parentElement.parentElement;
	let eInputSearch = e.parentElement.parentElement.previousElementSibling.previousElementSibling;

	eInputSearch.value = dSearchText;
	eInputDropdown.removeAttribute('style');
}

//__funcDisplayConfirmationModal('__modal-achievement', '__message', 'Are you sure?', '0', '1', __funcAchievementsCompletionCallback);
