        const API_BASE = "https://corsproxy.io/?https://cambo-gazetteer.manethpak.dev/api/v1";

        const selects = {
            province: document.getElementById('province'),
            district: document.getElementById('district'),
            commune: document.getElementById('commune'),
            village: document.getElementById('village')
        };

        // Helper to populate a select element
        function populateSelect(element, data, placeholder) {
            element.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
            data.forEach(item => {
                const name = item.name_en || item.name_km;
                const option = new Option(`${name} (${item.name_km})`, item.code);
                element.add(option);
            });
            element.disabled = false;
        }

        // Helper to reset lower-level selects
        function resetBelow(level) {
            const levels = ['province', 'district', 'commune', 'village'];
            const startIndex = levels.indexOf(level) + 1;
            for (let i = startIndex; i < levels.length; i++) {
                const el = selects[levels[i]];
                el.innerHTML = `<option value="" disabled selected>Select ${levels[i].charAt(0).toUpperCase() + levels[i].slice(1)}</option>`;
                el.disabled = true;
            }
        }

        // 1. Initial Load: Fetch Provinces
        async function fetchProvinces() {
            try {
                const response = await fetch(`${API_BASE}/provinces`);
                const data = await response.json();
                populateSelect(selects.province, data.data, "Select Province");
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }

        // 2. Fetch Districts when Province changes
        selects.province.addEventListener('change', async (e) => {
            resetBelow('province');
            try {
                const response = await fetch(`${API_BASE}/districts?province=${e.target.value}`);
                const data = await response.json();
                populateSelect(selects.district, data.data, "Select District");
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        });

        // 3. Fetch Communes when District changes
        selects.district.addEventListener('change', async (e) => {
            resetBelow('district');
            try {
                const response = await fetch(`${API_BASE}/communes?district=${e.target.value}`);
                const data = await response.json();
                populateSelect(selects.commune, data.data, "Select Commune");
            } catch (error) {
                console.error("Error fetching communes:", error);
            }
        });

        // 4. Fetch Villages when Commune changes
        selects.commune.addEventListener('change', async (e) => {
            resetBelow('commune');
            try {
                const response = await fetch(`${API_BASE}/villages?commune=${e.target.value}`);
                const data = await response.json();
                populateSelect(selects.village, data.data, "Select Village");
            } catch (error) {
                console.error("Error fetching villages:", error);
            }
        });

        // Start
        fetchProvinces();