/**
 * PulseCare - Health & Hygiene Portal JavaScript Application
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Global Search Data Index & Engine
       -------------------------------------------------------------------------- */
    const searchableItems = [
        // Personal Hygiene
        { category: 'Personal Hygiene', title: 'Why Personal Hygiene Matters', snippet: 'Prevent germ spread, skin cleanliness, dental health, odor reduction, physical health, confidence boost.', sectionId: 'personal-hygiene', targetId: 'hygiene-importance' },
        { category: 'Personal Hygiene', title: 'Bathing Regularly', snippet: 'Clean underarms, neck, feet, and skin folds after exercise or sweating.', sectionId: 'personal-hygiene', targetId: 'hygiene-body' },
        { category: 'Personal Hygiene', title: 'Clean Clothes & Foot Care', snippet: 'Change undergarments daily, dry clothes thoroughly, wash feet between toes.', sectionId: 'personal-hygiene', targetId: 'hygiene-body' },
        { category: 'Personal Hygiene', title: 'Oral Hygiene & Brushing', snippet: 'Brush twice a day with fluoride toothpaste, clean tongue, floss regularly.', sectionId: 'personal-hygiene', targetId: 'hygiene-oral' },
        { category: 'Personal Hygiene', title: 'Grooming & Nail Care', snippet: 'Trim nails cleanly, wash hair regularly, moisturize skin, personal grooming.', sectionId: 'personal-hygiene', targetId: 'hygiene-oral' },

        // Diseases
        { category: 'Diseases & Cure', title: 'Common Cold & Flu Symptoms', snippet: 'Runny nose, sneezing, sore throat, cough, mild headache, low-grade fever.', sectionId: 'diseases', targetId: 'disease-cold' },
        { category: 'Diseases & Cure', title: 'Common Cold Prevention & Treatment', snippet: 'Wash hands, cover mouth, rest, warm fluids. Antibiotics do NOT cure viral colds.', sectionId: 'diseases', targetId: 'disease-cold' },
        { category: 'Diseases & Cure', title: 'Dengue Fever Symptoms & Prevention', snippet: 'High fever, severe headache, retro-orbital pain, muscle/joint pain, mosquito repellent, window nets.', sectionId: 'diseases', targetId: 'disease-dengue' },
        { category: 'Diseases & Cure', title: 'Dengue Warning Signs', snippet: '⚠️ Severe abdominal pain, persistent vomiting, bleeding, difficulty breathing - seek urgent emergency care.', sectionId: 'diseases', targetId: 'disease-dengue' },
        { category: 'Diseases & Cure', title: 'Obesity Risk Factors & Management', snippet: 'Calorie intake, lack of activity, processed foods. Nutrition changes, exercise, medical support.', sectionId: 'diseases', targetId: 'disease-obesity' },
        { category: 'Diseases & Cure', title: 'Anemia Symptoms & Iron Intake', snippet: 'Tiredness, pale skin, dizziness, shortness of breath. Eat iron-rich foods & Vitamin C.', sectionId: 'diseases', targetId: 'disease-anemia' },

        // BMI
        { category: 'BMI Calculator', title: 'Body Mass Index Calculator', snippet: 'Calculate height & weight ratio, WHO weight categories (Underweight, Healthy, Overweight, Obesity).', sectionId: 'bmi-calculator', targetId: 'bmi-calculator' },

        // First Aid
        { category: 'First Aid', title: 'Burns First Aid', snippet: 'Cool under running water for 20 mins, do NOT apply ice, butter, toothpaste or pop blisters.', sectionId: 'first-aid', targetId: 'first-aid' },
        { category: 'First Aid', title: 'Cuts & Wounds First Aid', snippet: 'Apply pressure with clean gauze, wash with clean water, bandage. Seek help if deep or bleeding heavily.', sectionId: 'first-aid', targetId: 'first-aid' },
        { category: 'First Aid', title: 'Sprains & Strains (RICE)', snippet: 'Rest, ice pack wrapped in cloth, compression, elevation. Avoid direct ice on skin.', sectionId: 'first-aid', targetId: 'first-aid' }
    ];

    const globalSearchInput = document.getElementById('global-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchModal = document.getElementById('search-results-modal');
    const searchCountEl = document.getElementById('search-count');
    const searchResultsList = document.getElementById('search-results-list');
    const closeSearchModalBtn = document.getElementById('close-search-modal');

    function performSearch(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
            searchModal.classList.add('hidden');
            clearSearchBtn.hidden = true;
            return;
        }

        clearSearchBtn.hidden = false;
        const matches = searchableItems.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.snippet.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );

        searchCountEl.textContent = matches.length;
        searchResultsList.innerHTML = '';

        if (matches.length === 0) {
            searchResultsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass empty-icon"></i>
                    <p>No results found matching "${query}". Try searching for symptoms, first aid, or BMI.</p>
                </div>
            `;
        } else {
            matches.forEach(item => {
                const card = document.createElement('div');
                card.className = 'search-item';
                card.innerHTML = `
                    <span class="search-item-cat">${item.category}</span>
                    <h4 class="search-item-title">${item.title}</h4>
                    <p class="search-item-snippet">${item.snippet}</p>
                `;
                card.addEventListener('click', () => {
                    searchModal.classList.add('hidden');
                    switchMainSection(item.sectionId);

                    // If hygiene sub-tab, open it
                    if (item.sectionId === 'personal-hygiene' && item.targetId) {
                        const targetSubBtn = document.querySelector(`.subnav-btn[data-target="${item.targetId}"]`);
                        if (targetSubBtn) targetSubBtn.click();
                    }

                    // If disease chip, open it
                    if (item.sectionId === 'diseases' && item.targetId) {
                        const diseaseKey = item.targetId.replace('disease-', '');
                        const targetChip = document.querySelector(`.chip-btn[data-disease="${diseaseKey}"]`);
                        if (targetChip) targetChip.click();
                    }

                    const targetEl = document.getElementById(item.sectionId);
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                });
                searchResultsList.appendChild(card);
            });
        }

        searchModal.classList.remove('hidden');
    }

    globalSearchInput.addEventListener('input', (e) => performSearch(e.target.value));

    clearSearchBtn.addEventListener('click', () => {
        globalSearchInput.value = '';
        clearSearchBtn.hidden = true;
        searchModal.classList.add('hidden');
    });

    closeSearchModalBtn.addEventListener('click', () => {
        searchModal.classList.add('hidden');
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) searchModal.classList.add('hidden');
    });


    /* --------------------------------------------------------------------------
       2. Section Switching & Navigation
       -------------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const appSections = document.querySelectorAll('.app-section');

    function switchMainSection(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        appSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            switchMainSection(targetSection);
            const targetEl = document.getElementById(targetSection);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        });
    });


    /* --------------------------------------------------------------------------
       3. Personal Hygiene Sub-tabs
       -------------------------------------------------------------------------- */
    const subnavBtns = document.querySelectorAll('.subnav-btn');
    const subnavContents = document.querySelectorAll('.subnav-content');

    subnavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            subnavBtns.forEach(b => b.classList.remove('active'));
            subnavContents.forEach(c => c.classList.remove('active-content'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active-content');
        });
    });


    /* --------------------------------------------------------------------------
       4. Disease Chips Selector
       -------------------------------------------------------------------------- */
    const chipBtns = document.querySelectorAll('.chip-btn');
    const diseasePanels = document.querySelectorAll('.disease-panel');

    chipBtns.forEach(chip => {
        chip.addEventListener('click', () => {
            const diseaseKey = chip.getAttribute('data-disease');

            chipBtns.forEach(c => c.classList.remove('active'));
            diseasePanels.forEach(p => p.classList.remove('active-panel'));

            chip.classList.add('active');
            const targetPanel = document.getElementById(`disease-${diseaseKey}`);
            if (targetPanel) targetPanel.classList.add('active-panel');
        });
    });


    /* --------------------------------------------------------------------------
       5. Theme Toggle (Dark / Light)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // In-memory theme preference (browser storage APIs are not used)
    let currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    });

    function updateThemeIcon(theme) {
        themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    }


    /* --------------------------------------------------------------------------
       6. BMI Calculator Logic & Gauge Pointer
       -------------------------------------------------------------------------- */
    let unitMode = 'metric'; // 'metric' (meters) or 'cm' (centimeters)

    const unitMetricBtn = document.getElementById('unit-metric');
    const unitCmBtn = document.getElementById('unit-cm');
    const heightUnitLabel = document.getElementById('height-unit-label');
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');
    const calcBmiBtn = document.getElementById('calc-bmi-btn');

    const bmiEmptyState = document.getElementById('bmi-empty-state');
    const bmiResultContent = document.getElementById('bmi-result-content');
    const bmiValEl = document.getElementById('bmi-val');
    const bmiCategoryEl = document.getElementById('bmi-category');
    const meterNeedle = document.getElementById('meter-needle');
    const bmiIdealText = document.getElementById('bmi-ideal-text');
    const bmiRecommendation = document.getElementById('bmi-recommendation');

    unitMetricBtn.addEventListener('click', () => {
        unitMode = 'metric';
        unitMetricBtn.classList.add('active');
        unitCmBtn.classList.remove('active');
        heightUnitLabel.textContent = 'meters';
        heightInput.placeholder = 'e.g. 1.75';
        heightInput.step = '0.01';
        heightInput.min = '0.5';
        heightInput.max = '3';
    });

    unitCmBtn.addEventListener('click', () => {
        unitMode = 'cm';
        unitCmBtn.classList.add('active');
        unitMetricBtn.classList.remove('active');
        heightUnitLabel.textContent = 'cm';
        heightInput.placeholder = 'e.g. 175';
        heightInput.step = '1';
        heightInput.min = '50';
        heightInput.max = '300';
    });

    calcBmiBtn.addEventListener('click', calculateBMI);

    function calculateBMI() {
        let rawHeight = parseFloat(heightInput.value);
        let weight = parseFloat(weightInput.value);

        if (!rawHeight || !weight || rawHeight <= 0 || weight <= 0) {
            alert('Please enter valid positive numbers for height and weight.');
            return;
        }

        // Convert height to meters if in cm mode
        let heightMeters = unitMode === 'cm' ? rawHeight / 100 : rawHeight;

        // BMI Formula: weight / (height^2)
        const bmi = weight / (heightMeters * heightMeters);
        const formattedBmi = bmi.toFixed(1);

        // Determine category details
        let category = '';
        let badgeColor = '';
        let advice = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            badgeColor = 'var(--color-under)';
            advice = 'Your BMI indicates you are underweight. Consider consulting a nutritionist to build a nutrient-rich diet that supports healthy weight gain.';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Healthy weight';
            badgeColor = 'var(--color-normal)';
            advice = 'Great job! Your BMI is within the healthy range. Maintain your balanced diet and regular physical activity.';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            badgeColor = 'var(--color-over)';
            advice = 'Your BMI indicates you are overweight. Increasing physical activity and reducing refined calorie intake can help manage your weight effectively.';
        } else if (bmi >= 30 && bmi < 34.9) {
            category = 'Obesity class 1';
            badgeColor = 'var(--color-ob1)';
            advice = 'You fall into Obesity Class 1. Consult a physician or dietitian to create a structured wellness plan focusing on sustainable lifestyle adjustments.';
        } else if (bmi >= 35 && bmi < 39.9) {
            category = 'Obesity class 2';
            badgeColor = 'var(--color-ob2)';
            advice = 'You fall into Obesity Class 2. Medical consultation is strongly recommended to evaluate potential metabolic risks and tailor a personalized weight health plan.';
        } else {
            category = 'Obesity class 3';
            badgeColor = 'var(--color-ob3)';
            advice = 'You fall into Obesity Class 3. Please seek comprehensive evaluation from a healthcare professional for clinical advice and guided intervention.';
        }

        // Calculate ideal weight range (18.5 * h^2 to 24.9 * h^2)
        const minIdealWeight = (18.5 * heightMeters * heightMeters).toFixed(1);
        const maxIdealWeight = (24.9 * heightMeters * heightMeters).toFixed(1);

        // Update UI elements
        bmiValEl.textContent = formattedBmi;
        bmiCategoryEl.textContent = category;
        bmiCategoryEl.style.backgroundColor = badgeColor;
        bmiIdealText.innerHTML = `<i class="fa-solid fa-bullseye"></i> Ideal Weight Range: <strong>${minIdealWeight} kg – ${maxIdealWeight} kg</strong>`;
        bmiRecommendation.textContent = advice;

        // Map BMI score (range 12 to 42) to percentage position (0% to 100%)
        let pointerPercent = ((bmi - 12) / (42 - 12)) * 100;
        if (pointerPercent < 2) pointerPercent = 2;
        if (pointerPercent > 98) pointerPercent = 98;
        meterNeedle.style.left = `${pointerPercent}%`;

        // Reveal result box
        bmiEmptyState.classList.add('hidden');
        bmiResultContent.classList.remove('hidden');
    }

});
