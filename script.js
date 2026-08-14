console.log("script.js wird geladen...");

let kids = [];
let allPosts = {};
let growthData = {}; 

try {
    kids = JSON.parse(localStorage.getItem('babySteps_kids')) || [];
    let rawPosts = JSON.parse(localStorage.getItem('babySteps_posts'));
    
    if (rawPosts && rawPosts['13'] && rawPosts['13'].some(p => p.text === 'Xxx')) {
        localStorage.removeItem('babySteps_posts');
        allPosts = {};
    } else {
        allPosts = rawPosts || {};
    }

    let rawGrowth = JSON.parse(localStorage.getItem('babySteps_growth')) || {};
    Object.keys(rawGrowth).forEach(kidIdx => {
        rawGrowth[kidIdx].forEach(item => {
            if (item.weight && Number(item.weight) > 50) {
                item.weight = (Number(item.weight) / 1000).toFixed(2);
            }
        });
    });
    growthData = rawGrowth;
} catch(e) {
    console.error("Fehler beim Lesen aus localStorage:", e);
    allPosts = {};
}

let editingIndex = null;
let editingGrowthIndex = null;
let selectedDayForModal = null;
let isCalendarExpanded = true;
let currentAvatarOverride = null; 

document.addEventListener('DOMContentLoaded', () => {
    showMainAppScreen();
});

function switchScreen(screenId) {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    let target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
    }
}

function switchNav(screenId, btnElement) {
    switchScreen(screenId);
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (screenId === 'galleryScreen') renderGallery();
    if (screenId === 'growthScreen') initGrowthScreen();
    if (screenId === 'statsScreen') renderStats();
}

function showMainAppScreen() {
    renderDashboard();
    renderCalendar();
    switchScreen('mainAppScreen');
    document.querySelectorAll('.nav-item').forEach((el, idx) => {
        if(idx === 0) el.classList.add('active');
        else el.classList.remove('active');
    });
}

function showAddChildScreen() {
    editingIndex = null;
    currentAvatarOverride = null;
    let titleEl = document.getElementById('formTitle');
    if(titleEl) titleEl.innerText = "Neues Kind anlegen";
    
    let n = document.getElementById('newName'); if(n) n.value = '';
    let g = document.getElementById('newGender'); if(g) g.value = 'male';
    let b = document.getElementById('newBirthDate'); if(b) b.value = '';
    let s = document.getElementById('newSize'); if(s) s.value = '';
    let w = document.getElementById('newWeight'); if(w) w.value = '';
    let f = document.getElementById('newImageFile'); if(f) f.value = '';
    
    switchScreen('addChildScreen');
}

function toggleCalendar() {
    isCalendarExpanded = !isCalendarExpanded;
    let wrapper = document.getElementById('calendarContainer');
    let btn = document.getElementById('calendarToggleBtn');
    
    if (isCalendarExpanded) {
        if(wrapper) wrapper.style.display = 'block';
        if(btn) btn.innerText = '📅 Kalender einklappen';
    } else {
        if(wrapper) wrapper.style.display = 'none';
        if(btn) btn.innerText = '📅 Kalender ausklappen';
    }
}

function renderDashboard() {
    let container = document.getElementById('kidsDashboard');
    if (!container) return;
    container.innerHTML = '';

    if (kids.length === 0) {
        container.innerHTML = '<div class="card"><p style="color:var(--text-muted); margin:0;">Noch keine Kinder angelegt. Lege jetzt dein erstes Kind an!</p></div>';
        return;
    }

    kids.forEach((kid, index) => {
        let lastPost = getLastPostForChild(index);
        let latestGrowth = getLatestGrowth(index);

        let displaySize = latestGrowth ? latestGrowth.size : kid.size;
        let displayWeight = latestGrowth ? latestGrowth.weight : kid.weight;
        let displayDateText = latestGrowth ? `(vom ${latestGrowth.date})` : '';
        let genderText = kid.gender === 'female' ? 'Mädchen' : 'Junge';

        let card = document.createElement('div');
        card.className = 'card';

        let lastPostHtml = '';
        if (lastPost) {
            let firstMedia = (lastPost.media && lastPost.media.length > 0) ? lastPost.media[0] : null;
            let firstSrc = firstMedia ? ((typeof firstMedia === 'string') ? firstMedia : firstMedia.url) : null;
            let imgHtml = firstSrc ? `<img src="${firstSrc}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">` : `<div style="width:50px; height:50px; background:#ddd; display:flex; align-items:center; justify-content:center; font-size:1.2rem; border-radius:8px;">📝</div>`;
            
            lastPostHtml = `
                <div style="margin-top: 15px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #64748b; margin-bottom: 6px;"><span>Letzter Post (Tag ${lastPost.day})</span><span>🕒 Neu</span></div>
                    <div onclick="openViewPostModal(${lastPost.day}, ${index})" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        ${imgHtml}
                        <div style="font-size: 0.9rem; color: #1e293b; font-weight: 500;">${lastPost.text || 'Bild/Video Beitrag'}</div>
                    </div>
                </div>
            `;
        } else {
            lastPostHtml = `
                <div style="margin-top: 15px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
                    <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 4px;">Letzter Post</div>
                    <div style="font-size: 0.8rem; color: #94a3b8;">Noch kein Beitrag vorhanden. Klicke oben auf den Kalender, um einen zu erstellen!</div>
                </div>
            `;
        }

        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${kid.avatar || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150'}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
                <div>
                    <h3 style="margin:0; font-size: 1.1rem;">${kid.name} (${genderText})</h3>
                    <p style="margin:5px 0 0; font-size:0.85rem; color:#64748b;">Geb.: ${kid.birthDate || '-'}<br>Größe: ${displaySize || '-'} cm | Gewicht: ${displayWeight || '-'} kg <span style="font-size:0.75rem; color:var(--primary);">${displayDateText}</span></p>
                </div>
            </div>
            ${lastPostHtml}
            <div style="margin-top:15px; display:flex; gap:10px;">
                <button onclick="openEditChild(${index})" style="background:#f1f5f9; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:0.85rem;">✏️ Bearbeiten</button>
                <button onclick="deleteChild(${index})" style="background:#fee2e2; color:#dc2626; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:0.85rem;">🗑️ Löschen</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function getLastPostForChild(childIndex) {
    let allDays = Object.keys(allPosts);
    if (allDays.length === 0) return null;

    let validDays = allDays.filter(day => {
        let posts = allPosts[day];
        return posts && posts.some(p => p && p.childIndex === childIndex);
    });

    if (validDays.length === 0) return null;

    validDays.sort((a, b) => Number(b) - Number(a));
    let latestDay = validDays[0];
    let postsForDay = allPosts[latestDay];
    let childPost = [...postsForDay].reverse().find(p => p && p.childIndex === childIndex);

    return childPost ? { ...childPost, day: latestDay } : null;
}

function getLatestGrowth(childIndex) {
    let list = growthData[childIndex];
    if (!list || list.length === 0) return null;
    return list[list.length - 1];
}

function saveNewChildData() {
    let nameInput = document.getElementById('newName');
    let genderInput = document.getElementById('newGender');
    let birthDateInput = document.getElementById('newBirthDate');
    let sizeInput = document.getElementById('newSize');
    let weightInput = document.getElementById('newWeight');
    let fileInput = document.getElementById('newImageFile');

    if (!nameInput || !nameInput.value.trim()) {
        alert("Bitte gib einen Namen ein.");
        return;
    }

    let name = nameInput.value;
    let gender = genderInput ? genderInput.value : 'male';
    let birthDate = birthDateInput ? birthDateInput.value : '';
    let size = sizeInput ? sizeInput.value : '';
    let weight = weightInput ? weightInput.value : '';
    let defaultAvatar = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150';

    let avatarUrl = defaultAvatar;
    if (currentAvatarOverride !== null) {
        avatarUrl = currentAvatarOverride;
    } else if (fileInput && fileInput.files && fileInput.files[0]) {
        try {
            avatarUrl = URL.createObjectURL(fileInput.files[0]);
        } catch(e) {
            avatarUrl = defaultAvatar;
        }
    } else if (editingIndex !== null && kids[editingIndex] && kids[editingIndex].avatar) {
        avatarUrl = kids[editingIndex].avatar;
    }

    let kidData = {
        name: name,
        gender: gender,
        birthDate: birthDate,
        size: size,
        weight: weight,
        avatar: avatarUrl
    };

    if (editingIndex !== null) {
        kids[editingIndex] = kidData;
    } else {
        kids.push(kidData);
    }

    localStorage.setItem('babySteps_kids', JSON.stringify(kids));
    showMainAppScreen();
}

function openEditChild(index) {
    editingIndex = index;
    currentAvatarOverride = null;
    let kid = kids[index];
    
    let titleEl = document.getElementById('formTitle');
    if(titleEl) titleEl.innerText = "Kind bearbeiten";
    
    document.getElementById('newName').value = kid.name || '';
    let g = document.getElementById('newGender'); if(g) g.value = kid.gender || 'male';
    document.getElementById('newBirthDate').value = kid.birthDate || '';
    document.getElementById('newSize').value = kid.size || '';
    document.getElementById('newWeight').value = kid.weight || '';
    document.getElementById('newImageFile').value = '';
    
    switchScreen('addChildScreen');
}

function deleteChild(index) {
    if (confirm("Möchtest du dieses Kind wirklich löschen?")) {
        kids.splice(index, 1);
        localStorage.setItem('babySteps_kids', JSON.stringify(kids));
        renderDashboard();
    }
}

function renderCalendar() {
    let grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';
    let now = new Date();
    let monthName = now.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
    let monthTitleEl = document.getElementById('currentMonthTitle');
    if(monthTitleEl) monthTitleEl.innerText = monthName;

    let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.innerText = i;

        if (allPosts[i] && allPosts[i].length > 0) {
            cell.classList.add('has-post');
        }

        cell.onclick = () => onCalendarDayClick(i);
        grid.appendChild(cell);
    }
}

function onCalendarDayClick(day) {
    selectedDayForModal = day;
    let posts = allPosts[day];
    
    if (posts && posts.length > 0) {
        openViewPostModal(day, posts[posts.length - 1].childIndex);
    } else {
        openDayModal(day);
    }
}

function openDayModal(day) {
    selectedDayForModal = day;
    let modalTitle = document.getElementById('modalDayTitle');
    if(modalTitle) modalTitle.innerText = `Eintrag für den ${day}. Tag`;
    
    document.getElementById('postAuthorInput').value = 'Mama'; 
    document.getElementById('dayNoteInput').value = '';
    document.getElementById('dayMediaInput').value = '';

    let select = document.getElementById('postChildSelect');
    if(select) {
        select.innerHTML = '';
        if (kids.length === 0) {
            select.innerHTML = '<option>Bitte zuerst ein Kind anlegen</option>';
        } else {
            kids.forEach((k, idx) => {
                let opt = document.createElement('option');
                opt.value = idx;
                opt.innerText = k.name;
                select.appendChild(opt);
            });
        }
    }

    renderSavedPostsForModal();
    let modal = document.getElementById('dayModal');
    if(modal) modal.style.display = 'flex';
}

function closeDayModal() {
    let modal = document.getElementById('dayModal');
    if(modal) modal.style.display = 'none';
}

function openViewPostModal(day, targetChildIndex) {
    selectedDayForModal = day;
    let posts = allPosts[day];
    if (!posts || posts.length === 0) return;

    let post = posts.find(p => p.childIndex === targetChildIndex) || posts[posts.length - 1];
    let kidName = kids[post.childIndex] ? kids[post.childIndex].name : 'Kind';

    let viewTitle = document.getElementById('viewPostTitle');
    if(viewTitle) viewTitle.innerText = `Beitrag (Tag ${day})`;
    
    let container = document.getElementById('viewPostContent');
    if(container) {
        container.innerHTML = `
            <div style="font-weight: 600; color: var(--primary); margin-bottom: 6px; font-size: 0.95rem;">${post.author} für ${kidName}:</div>
            <div style="margin-bottom: 12px; line-height: 1.4; color: var(--text-main); font-size: 0.95rem;">${post.text || ''}</div>
        `;

        if (post.media && post.media.length > 0) {
            let mediaWrapper = document.createElement('div');
            mediaWrapper.style.cssText = "display: flex; flex-direction: column; gap: 10px; margin-top: 10px;";
            
            post.media.forEach(m => {
                let src = (typeof m === 'string') ? m : m.url;
                let isVideo = (typeof m === 'object' && m.type === 'video') || (typeof src === 'string' && src.startsWith('blob:') && src.includes('video'));

                if (isVideo) {
                    let vid = document.createElement('video');
                    vid.src = src;
                    vid.controls = true;
                    vid.style.cssText = "width: 100%; max-height: 250px; border-radius: 12px; object-fit: cover; background: #000;";
                    mediaWrapper.appendChild(vid);
                } else {
                    let img = document.createElement('img');
                    img.src = src;
                    img.style.cssText = "width: 100%; max-height: 250px; border-radius: 12px; object-fit: cover;";
                    mediaWrapper.appendChild(img);
                }
            });
            container.appendChild(mediaWrapper);
        }
    }

    let viewModal = document.getElementById('viewPostModal');
    if(viewModal) viewModal.style.display = 'flex';
}

function closeViewPostModal() {
    let viewModal = document.getElementById('viewPostModal');
    if(viewModal) viewModal.style.display = 'none';
}

function openCreateFromView() {
    closeViewPostModal();
    openDayModal(selectedDayForModal);
}

function saveDayPost() {
    let authorInput = document.getElementById('postAuthorInput');
    let textInput = document.getElementById('dayNoteInput');
    let childSelect = document.getElementById('postChildSelect');
    let fileInput = document.getElementById('dayMediaInput');

    let author = authorInput ? authorInput.value.trim() || 'Familie' : 'Familie';
    let text = textInput ? textInput.value : '';
    let childIndex = childSelect ? childSelect.value : 0;

    if (!text.trim() && (!fileInput || !fileInput.files || fileInput.files.length === 0)) {
        alert("Bitte schreibe eine Notiz oder wähle ein Bild/Video aus.");
        return;
    }

    if (kids.length === 0) {
        alert("Bitte lege zuerst ein Kind an.");
        return;
    }

    let files = fileInput ? fileInput.files : null;
    let mediaArray = [];

    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let fileUrl = URL.createObjectURL(files[i]);
            mediaArray.push({
                url: fileUrl,
                type: files[i].type.startsWith('video') ? 'video' : 'image'
            });
        }
    }

    let postObj = {
        author: author,
        childIndex: Number(childIndex),
        text: text,
        media: mediaArray
    };

    if (!allPosts[selectedDayForModal]) {
        allPosts[selectedDayForModal] = [];
    }
    allPosts[selectedDayForModal].push(postObj);
    localStorage.setItem('babySteps_posts', JSON.stringify(allPosts));

    if(textInput) textInput.value = '';
    if(fileInput) fileInput.value = '';
    
    renderCalendar();
    renderDashboard();
    closeDayModal();
}

function renderSavedPostsForModal() {
    let container = document.getElementById('savedPostsList');
    if (!container) return;
    container.innerHTML = '';

    let posts = allPosts[selectedDayForModal];
    if (posts && posts.length > 0) {
        container.innerHTML = '<strong>Bereits gespeicherte Beiträge:</strong>';
        posts.forEach(p => {
            let kidName = kids[p.childIndex] ? kids[p.childIndex].name : 'Kind';
            let div = document.createElement('div');
            div.style.cssText = "background:#f1f5f9; padding:10px; border-radius:12px; margin-top:8px; font-size:0.85rem;";
            div.innerHTML = `<div style="font-weight:600; color:var(--primary);">${p.author} für ${kidName}:</div><div>${p.text || ''}</div>`;
            container.appendChild(div);
        });
    }
}

function renderGallery() {
    let container = document.getElementById('fullGalleryGrid');
    if (!container) return;
    container.innerHTML = '';

    let mediaList = [];
    Object.keys(allPosts).forEach(day => {
        allPosts[day].forEach(post => {
            if (post.media && post.media.length > 0) {
                post.media.forEach(m => {
                    mediaList.push({ day: day, media: m, text: post.text });
                });
            }
        });
    });

    if (mediaList.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; grid-column: span 2;">Noch keine Medien in der Galerie vorhanden.</p>';
        return;
    }

    mediaList.forEach(item => {
        let src = (typeof item.media === 'string') ? item.media : item.media.url;
        let isVideo = (typeof item.media === 'object' && item.media.type === 'video') || src.includes('video');

        let box = document.createElement('div');
        box.style.cssText = "background:#f1f5f9; border-radius:12px; overflow:hidden; display:flex; flex-direction:column;";
        
        if (isVideo) {
            box.innerHTML = `<video src="${src}" style="width:100%; height:120px; object-fit:cover;"></video><div style="padding:6px; font-size:0.75rem; color:var(--text-muted);">Tag ${item.day}</div>`;
        } else {
            box.innerHTML = `<img src="${src}" style="width:100%; height:120px; object-fit:cover;"><div style="padding:6px; font-size:0.75rem; color:var(--text-muted);">Tag ${item.day}</div>`;
        }
        container.appendChild(box);
    });
}

function initGrowthScreen() {
    let select = document.getElementById('growthChildSelect');
    if (!select) return;
    select.innerHTML = '';
    
    if (kids.length === 0) {
        select.innerHTML = '<option>Bitte zuerst ein Kind anlegen</option>';
        return;
    }

    kids.forEach((k, idx) => {
        let opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = k.name;
        select.appendChild(opt);
    });

    let dateInput = document.getElementById('growthDateInput');
    if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();

    editingGrowthIndex = null;
    resetGrowthForm();
    renderGrowthData();
}

function resetGrowthForm() {
    let dateInput = document.getElementById('growthDateInput');
    let sizeInput = document.getElementById('growthSizeInput');
    let weightInput = document.getElementById('growthWeightInput');
    let btnContainer = document.getElementById('growthFormButtons');

    if (dateInput) dateInput.valueAsDate = new Date();
    if (sizeInput) sizeInput.value = '';
    if (weightInput) weightInput.value = '';

    if (btnContainer) {
        btnContainer.innerHTML = `<button onclick="saveGrowthEntry()" class="btn btn-primary" id="saveGrowthBtn">Messung eintragen</button>`;
    }
    editingGrowthIndex = null;
}

function saveGrowthEntry() {
    let select = document.getElementById('growthChildSelect');
    let dateInput = document.getElementById('growthDateInput');
    let sizeInput = document.getElementById('growthSizeInput');
    let weightInput = document.getElementById('growthWeightInput');

    if (!select || kids.length === 0) return;
    let childIndex = select.value;

    let date = dateInput ? dateInput.value : '';
    let size = sizeInput ? sizeInput.value : '';
    let weight = weightInput ? weightInput.value : '';

    if (!date || (!size && !weight)) {
        alert("Bitte Datum und mindestens Größe oder Gewicht angeben.");
        return;
    }

    if (!growthData[childIndex]) {
        growthData[childIndex] = [];
    }

    if (editingGrowthIndex !== null) {
        growthData[childIndex][editingGrowthIndex] = { date, size, weight };
    } else {
        growthData[childIndex].push({ date, size, weight });
    }

    growthData[childIndex].sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('babySteps_growth', JSON.stringify(growthData));

    resetGrowthForm();
    renderGrowthData();
    renderDashboard();
}

function editGrowthEntry(index) {
    let select = document.getElementById('growthChildSelect');
    if (!select) return;
    let childIndex = select.value;
    let item = growthData[childIndex][index];

    let dateInput = document.getElementById('growthDateInput');
    let sizeInput = document.getElementById('growthSizeInput');
    let weightInput = document.getElementById('growthWeightInput');

    if (dateInput) dateInput.value = item.date;
    if (sizeInput) sizeInput.value = item.size;
    if (weightInput) weightInput.value = item.weight;

    editingGrowthIndex = index;

    let btnContainer = document.getElementById('growthFormButtons');
    if (btnContainer) {
        btnContainer.innerHTML = `
            <button onclick="saveGrowthEntry()" class="btn btn-primary">Aktualisieren</button>
            <button onclick="resetGrowthForm()" class="btn btn-secondary">Abbrechen</button>
        `;
    }
}

function deleteGrowthEntry(index) {
    if (confirm("Möchtest du diesen Messwert wirklich löschen?")) {
        let select = document.getElementById('growthChildSelect');
        if (!select) return;
        let childIndex = select.value;

        growthData[childIndex].splice(index, 1);
        localStorage.setItem('babySteps_growth', JSON.stringify(growthData));

        resetGrowthForm();
        renderGrowthData();
        renderDashboard();
    }
}

function renderGrowthData() {
    let select = document.getElementById('growthChildSelect');
    let container = document.getElementById('growthHistoryList');
    let chartContainer = document.getElementById('chartContainer');
    if (!select || !container || !chartContainer) return;

    let childIndex = select.value;
    container.innerHTML = '';
    chartContainer.innerHTML = '';

    let list = growthData[childIndex];
    let currentKid = kids[childIndex];

    if (!list || list.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Noch keine Messwerte eingetragen.</p>';
        chartContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:20px;">Keine Daten für das Diagramm vorhanden.</p>';
        return;
    }

    list.forEach((item, index) => {
        let div = document.createElement('div');
        div.style.cssText = "background:#f1f5f9; padding:10px; border-radius:10px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center;";
        div.innerHTML = `
            <span>📅 <b>${item.date}</b></span>
            <span>📏 ${item.size ? item.size + ' cm' : '-'}</span>
            <span>⚖️ ${item.weight ? item.weight + ' kg' : '-'}</span>
            <div style="display:flex; gap:5px;">
                <button onclick="editGrowthEntry(${index})" style="background:none; border:none; cursor:pointer; font-size:1rem;" title="Bearbeiten">✏️</button>
                <button onclick="deleteGrowthEntry(${index})" style="background:none; border:none; cursor:pointer; font-size:1rem;" title="Löschen">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });

    renderGrowthChart(list, chartContainer, currentKid);
}

function renderGrowthChart(list, container, kid) {
    let width = 360;
    let height = 220;
    let paddingLeft = 45;
    let paddingBottom = 45;
    let paddingTop = 30;
    let paddingRight = 20;

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.width = "100%";
    svg.style.height = "auto";

    // Hintergrundfarbe je nach ausgewähltem Geschlecht (Junge = Babyblau, Mädchen = Hellrosa)
    let bgCol = "#e0f2fe"; // Babyblau Standard für Jungs
    if (kid && kid.gender === 'female') {
        bgCol = "#fce7f3"; // Hellrosa für Mädchen
    }

    let bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("x", "0");
    bgRect.setAttribute("y", "0");
    bgRect.setAttribute("width", width);
    bgRect.setAttribute("height", height);
    bgRect.setAttribute("fill", bgCol);
    bgRect.setAttribute("rx", "12");
    svg.appendChild(bgRect);

    let sizes = list.map(i => Number(i.size)).filter(s => s > 0);
    let weights = list.map(i => Number(i.weight)).filter(w => w > 0);

    let minSize = sizes.length ? Math.min(...sizes) : 40;
    let maxSize = sizes.length ? Math.max(...sizes) : 100;
    if (minSize === maxSize) { minSize -= 5; maxSize += 5; }

    let minWeight = weights.length ? Math.min(...weights) : 2;
    let maxWeight = weights.length ? Math.max(...weights) : 15;
    if (minWeight === maxWeight) { minWeight -= 2; maxWeight += 2; }

    let chartWidth = width - paddingLeft - paddingRight;
    let chartHeight = height - paddingBottom - paddingTop;

    let getX = (index) => list.length === 1 ? paddingLeft + chartWidth / 2 : paddingLeft + (index / (list.length - 1)) * chartWidth;
    let getYSize = (val) => paddingTop + chartHeight - ((val - minSize) / (maxSize - minSize)) * chartHeight;
    let getYWeight = (val) => paddingTop + chartHeight - ((val - minWeight) / (maxWeight - minWeight)) * chartHeight;

    // Subtiles Gitternetz
    for (let i = 1; i <= 4; i++) {
        let y = paddingTop + (chartHeight / 5) * i;
        let gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        gridLine.setAttribute("x1", paddingLeft);
        gridLine.setAttribute("y1", y);
        gridLine.setAttribute("x2", width - paddingRight);
        gridLine.setAttribute("y2", y);
        gridLine.setAttribute("stroke", "#ffffff");
        gridLine.setAttribute("stroke-width", "1");
        gridLine.setAttribute("stroke-opacity", "0.6");
        svg.appendChild(gridLine);
    }

    // Achsen (Rot für Gewicht, Grün für Größe)
    const drawAxis = (x1, y1, x2, y2, color) => {
        let l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2);
        l.setAttribute("stroke", color); l.setAttribute("stroke-width", "2");
        svg.appendChild(l);
    };

    drawAxis(paddingLeft, height - paddingBottom, width - paddingRight, height - paddingBottom, "#ef4444"); // X-Achse Rot (Gewicht/Zeit)
    drawAxis(paddingLeft, paddingTop, paddingLeft, height - paddingBottom, "#22c55e"); // Y-Achse Grün (Größe)

    // Legende oben
    let legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.innerHTML = `
        <circle cx="105" cy="14" r="4" fill="#ef4444"></circle>
        <text x="113" y="17" font-size="9" fill="#1e293b" font-weight="bold">Gewicht (Rot)</text>
        <circle cx="210" cy="14" r="4" fill="#22c55e"></circle>
        <text x="218" y="17" font-size="9" fill="#1e293b" font-weight="bold">Größe (Grün)</text>
    `;
    svg.appendChild(legendGroup);

    // Linien zeichnen
    const drawPath = (dataList, getValueFn, color, isSize) => {
        let pathD = "";
        dataList.forEach((item, idx) => {
            let val = getValueFn(item);
            if (val > 0) {
                let x = getX(idx);
                let y = isSize ? getYSize(val) : getYWeight(val);
                pathD += (pathD === "" ? `M ${x} ${y}` : ` L ${x} ${y}`);
            }
        });
        if (pathD) {
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathD);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", "2.5");
            svg.appendChild(path);
        }
    };

    drawPath(list, (i) => Number(i.size), "#22c55e", true);   // Größe = Grün
    drawPath(list, (i) => Number(i.weight), "#ef4444", false); // Gewicht = Rot

    // Datenpunkte, Werte über den Punkten und Datum unten
    list.forEach((item, idx) => {
        let x = getX(idx);

        // Datum auf X-Achse
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x); 
        text.setAttribute("y", height - paddingBottom + 14);
        text.setAttribute("font-size", "9"); 
        text.setAttribute("fill", "#1e293b");
        text.setAttribute("font-weight", "600");
        text.setAttribute("text-anchor", "middle");
        text.textContent = item.date.split('-').slice(1).reverse().join('.');
        svg.appendChild(text);

        // Größe Punkt & Wert (Grün)
        if (Number(item.size) > 0) {
            let ySize = getYSize(Number(item.size));
            let cSize = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cSize.setAttribute("cx", x); cSize.setAttribute("cy", ySize);
            cSize.setAttribute("r", "4"); cSize.setAttribute("fill", "#22c55e");
            svg.appendChild(cSize);

            let valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valText.setAttribute("x", x); valText.setAttribute("y", ySize - 7);
            valText.setAttribute("font-size", "8"); valText.setAttribute("fill", "#166534");
            valText.setAttribute("font-weight", "bold"); valText.setAttribute("text-anchor", "middle");
            valText.textContent = `${item.size}cm`;
            svg.appendChild(valText);
        }

        // Gewicht Punkt & Wert (Rot)
        if (Number(item.weight) > 0) {
            let yWeight = getYWeight(Number(item.weight));
            let cWeight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cWeight.setAttribute("cx", x); cWeight.setAttribute("cy", yWeight);
            cWeight.setAttribute("r", "4"); cWeight.setAttribute("fill", "#ef4444");
            svg.appendChild(cWeight);

            let valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valText.setAttribute("x", x); valText.setAttribute("y", yWeight - 7);
            valText.setAttribute("font-size", "8"); valText.setAttribute("fill", "#991b1b");
            valText.setAttribute("font-weight", "bold"); valText.setAttribute("text-anchor", "middle");
            valText.textContent = `${item.weight}kg`;
            svg.appendChild(valText);
        }
    });

    container.appendChild(svg);
}

function sendWhatsAppInvite() {
    let text = encodeURIComponent("Schau dir unbedingt unsere BabySteps-App an und verfolge die Entwicklung unseres Babys! Die App ist für dich als Zuschauer komplett kostenlos: [App-Link einfügen]");
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function renderStats() {
    let container = document.getElementById('statsContent');
    if (!container) return;
    container.innerHTML = '';

    let totalPosts = 0;
    let totalImages = 0;
    let totalVideos = 0;

    Object.keys(allPosts).forEach(day => {
        allPosts[day].forEach(post => {
            totalPosts++;
            if (post.media) {
                post.media.forEach(m => {
                    let src = (typeof m === 'string') ? m : m.url;
                    let isVideo = (typeof m === 'object' && m.type === 'video') || src.includes('video');
                    if (isVideo) totalVideos++;
                    else totalImages++;
                });
            }
        });
    });

    container.innerHTML = `
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>📝 Gesamtanzahl Posts</span>
            <b style="color:var(--primary); font-size:1.1rem;">${totalPosts}</b>
        </div>
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>🖼️ Gepostete Bilder</span>
            <b style="color:var(--primary); font-size:1.1rem;">${totalImages}</b>
        </div>
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>🎥 Gepostete Videos</span>
            <b style="color:var(--primary); font-size:1.1rem;">${totalVideos}</b>
        </div>
    `;
}
