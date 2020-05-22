const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
    <label><b>Search</b></label>
    <input class = "input">
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`;

	const dropdown = root.querySelector('.dropdown');
	const dropdownResult = root.querySelector('.results');
	const input = root.querySelector('input');

	const onInput = async (event) => {
		const allOptions = await fetchData(event.target.value);

		if (!allOptions.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		dropdown.classList.add('is-active');

		dropdownResult.innerHTML = '';
		for (singleOption of allOptions) {
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			let tempSingleOption = singleOption;
			option.innerHTML = renderOption(singleOption); //to render the particular option in the dropdown menu

			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(tempSingleOption);

				onOptionSelect(tempSingleOption);
			});

			dropdownResult.appendChild(option);
		}
	};

	input.addEventListener('input', debounce(onInput));

	document.addEventListener('click', (event) => {
		if (!dropdown.contains(event.target)) dropdown.classList.remove('is-active');
	});
};
