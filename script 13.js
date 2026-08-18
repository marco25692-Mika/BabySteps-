// ==========================================
// 1. DATEN FÜR SCHWANGERSCHAFT
// ==========================================
const sswFruitData = {
    4: { fruit: "ein Mohnsamen", emoji: "🌱" }, 5: { fruit: "ein Apfelkern", emoji: "🍎" }, 6: { fruit: "ein Linsenkorn", emoji: "🫘" },
    7: { fruit: "eine Blaubeere", emoji: "🫐" }, 8: { fruit: "eine Himbeere", emoji: "🍓" }, 9: { fruit: "eine Weintraube", emoji: "🍇" },
    10: { fruit: "eine Pflaume", emoji: "🫐" }, 11: { fruit: "eine Erdbeere", emoji: "🍓" }, 12: { fruit: "eine Limette", emoji: "🍋" },
    13: { fruit: "eine Zitrone", emoji: "🍋" }, 14: { fruit: "eine Nektarine", emoji: "🍑" }, 15: { fruit: "ein Apfel", emoji: "🍎" },
    16: { fruit: "eine Avocado", emoji: "🥑" }, 17: { fruit: "eine Birne", emoji: "🍐" }, 18: { fruit: "eine Paprika", emoji: "🫑" },
    19: { fruit: "eine Mango", emoji: "🥭" }, 20: { fruit: "eine Banane", emoji: "🍌" }, 21: { fruit: "eine Karotte", emoji: "🥕" },
    22: { fruit: "eine Papaya", emoji: "🥭" }, 23: { fruit: "eine Aubergine", emoji: "🍆" }, 24: { fruit: "ein Maiskolben", emoji: "🌽" },
    25: { fruit: "ein Blumenkohl", emoji: "🥦" }, 26: { fruit: "eine Zucchini", emoji: "🥒" }, 27: { fruit: "ein Brokkoli", emoji: "🥦" },
    28: { fruit: "ein Hokkaido-Kürbis", emoji: "🎃" }, 29: { fruit: "ein Butternut-Kürbis", emoji: "🎃" }, 30: { fruit: "eine Ananas", emoji: "🍍" },
    31: { fruit: "ein Chinakohl", emoji: "🥬" }, 32: { fruit: "eine Kokosnuss", emoji: "🥥" }, 33: { fruit: "ein Sellerie", emoji: "🥬" },
    34: { fruit: "eine Honigmelone", emoji: "🍈" }, 35: { fruit: "eine Netzmelone", emoji: "🍈" }, 36: { fruit: "ein Romana-Salat", emoji: "🥬" },
    37: { fruit: "ein Mangold", emoji: "🥬" }, 38: { fruit: "ein Rhabarber", emoji: "🌱" }, 39: { fruit: "eine Wassermelone", emoji: "🍉" },
    40: { fruit: "ein großer Kürbis", emoji: "🎃" }
};

const sswAnimalData = {
    4: { animal: "ein Wasserfloh", emoji: "🦠" }, 5: { animal: "eine Ameise", emoji: "🐜" }, 6: { animal: "eine Fliege", emoji: "🪰" },
    7: { animal: "eine Biene", emoji: "🐝" }, 8: { animal: "ein Schmetterling", emoji: "🦋" }, 9: { animal: "ein Skarabäus", emoji: "🪲" },
    10: { animal: "ein Frosch", emoji: "🐸" }, 11: { animal: "ein Kolibri", emoji: "🐦" }, 12: { animal: "eine Maus", emoji: "🐁" },
    13: { animal: "ein kleiner Fisch", emoji: "🐟" }, 14: { animal: "eine Zwergfledermaus", emoji: "🦇" }, 15: { animal: "ein Eichhörnchen", emoji: "🐿️" },
    16: { animal: "ein Hamster", emoji: "🐹" }, 17: { animal: "eine Ratte", emoji: "🐀" }, 18: { animal: "ein Igel", emoji: "🦔" },
    19: { animal: "ein Meerschweinchen", emoji: "🐹" }, 20: { animal: "ein Papagei", emoji: "🦜" }, 21: { animal: "ein Chinchilla", emoji: "🐁" },
    22: { animal: "ein Opossum", emoji: "🐭" }, 23: { animal: "ein Kaninchen", emoji: "🐇" }, 24: { animal: "ein Frettchen", emoji: "🦦" },
    25: { animal: "eine Taube", emoji: "🕊️" }, 26: { animal: "ein Rebhuhn", emoji: "🐦" }, 27: { animal: "ein Welpe", emoji: "🐶" },
    28: { animal: "ein kleines Kätzchen", emoji: "🐱" }, 29: { animal: "ein Erdmännchen", emoji: "🦦" }, 30: { animal: "ein Schnabeltier", emoji: "🦆" },
    31: { animal: "ein Koala-Baby", emoji: "🐨" }, 32: { animal: "ein kleiner Fuchs", emoji: "🦊" }, 33: { animal: "ein Waschbär-Baby", emoji: "🦝" },
    34: { animal: "ein Pinguin", emoji: "🐧" }, 35: { animal: "ein Zwergpudel", emoji: "🐩" }, 36: { animal: "ein Faultier-Baby", emoji: "🦥" },
    37: { animal: "ein Biber", emoji: "🦫" }, 38: { animal: "ein Katzenjunges", emoji: "🐈" }, 39: { animal: "ein Schwan", emoji: "🦢" },
    40: { animal: "eine Hauskatze", emoji: "🐈" }
};

// ==========================================
// 2. BASIS-VARIABLEN
// ==========================================
let kids = [];
let allPosts = {};
let growthData = {}; 
let pregnancyData = {};
let wishlistData = {};
let sleepData = {};
let currentUserRole = "Papa 👨";
let assignedRoles = { mama: null, papa: null };
let appUnits = { size: 'cm', weight: 'kg', liquid: 'ml', temp: '°C' };
let appSettings = { notif: true, pregShare: false };
let isLoggedIn = false;

try {
    kids = JSON.parse(localStorage.getItem('request_kids')) || JSON.parse(localStorage.getItem('BabySteps_kids')) || [];
    allPosts = JSON.parse(localStorage.getItem('request_posts')) || JSON.parse(localStorage.getItem('BabySteps_posts')) || {};
    growthData = JSON.parse(localStorage.getItem('request_growth')) || JSON.parse(localStorage.getItem('BabySteps_growth')) || {};
    pregnancyData = JSON.parse(localStorage.getItem('request_pregnancy')) || JSON.parse(localStorage.getItem('BabySteps_pregnancy')) || {};
    wishlistData = JSON.parse(localStorage.getItem('request_wishlist')) || JSON.parse(localStorage.getItem('BabySteps_wishlist')) || {};
    sleepData = JSON.parse(localStorage.getItem('request_sleep')) || JSON.parse(localStorage.getItem('BabySteps_sleep')) || {};
    
    currentUserRole = localStorage.getItem('request_userRole') || localStorage.getItem('BabySteps_userRole') || "Papa 👨";
    
    let savedAssignedRoles = JSON.parse(localStorage.getItem('request_assignedRoles')) || JSON.parse(localStorage.getItem('BabySteps_assignedRoles'));
    if (savedAssignedRoles) assignedRoles = savedAssignedRoles;

    let savedUnits = JSON.parse(localStorage.getItem('request_units')) || JSON.parse(localStorage.getItem('BabySteps_units'));
    if (savedUnits) appUnits = savedUnits;

    let savedSettings = JSON.parse(localStorage.getItem('request_settings')) || JSON.parse(localStorage.getItem('BabySteps_settings'));
    if (savedSettings) appSettings = savedSettings;

    let savedLogin = localStorage.getItem('request_isLoggedIn') || localStorage.getItem('BabySteps_isLoggedIn');
    if (savedLogin !== null) isLoggedIn = JSON.parse(savedLogin);
} catch(e) {
    console.error("Fehler beim Lesen aus localStorage:", e);
}

let editingIndex = null;
let editingGrowthIndex = null;
let editingPregIndex = null;
let editingWishIndex = null;
let editingSleepIndex = null;
let selectedDayForModal = null;
let editingPostIndex = null;
let viewingPostIndex = null;
let isCalendarExpanded = true;
let currentAvatarOverride = null; 

// ==========================================
// HILFSFUNKTIONEN
// ==========================================
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        // Videos können nicht wie Bilder komprimiert werden
        if (file.type.startsWith('video')) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
            return;
        }

        // Bilder automatisch komprimieren, um localStorage-Limit zu umgehen
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Als komprimiertes JPEG (0.75 Qualität) exportieren
                const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                resolve(dataUrl);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}


function isChildBorn(kid) {
    if (!kid || !kid.birthDate) return false;
    let today = new Date();
    today.setHours(23, 59, 59, 999);
    let bDate = new Date(kid.birthDate);
    return (kid.dateType === 'geburtstag' || bDate <= today) && bDate <= today;
}

function ensureInitialGrowthEntry(childIndex, birthDate, size, weight) {
    if (!growthData[childIndex]) growthData[childIndex] = [];
    let existingEntry = growthData[childIndex].find(e => e.date === birthDate);
    if (!existingEntry) {
        growthData[childIndex].push({
            date: birthDate,
            size: size || "",
            weight: weight || ""
        });
        growthData[childIndex].sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('request_growth', JSON.stringify(growthData));
    }
}

function ensureOvulationPoint(childIndex, birthDate) {
    let etDate = new Date(birthDate);
    if (isNaN(etDate.getTime())) return;
    let ovulationDate = new Date(etDate);
    ovulationDate.setDate(etDate.getDate() - 266);
    let ovulationDateStr = ovulationDate.toISOString().split('T')[0];

    if (!growthData[childIndex]) growthData[childIndex] = [];

    let hasZeroPoint = growthData[childIndex].some(item => Number(item.size) === 0 && Number(item.weight) === 0);

    if (!hasZeroPoint) {
        growthData[childIndex].unshift({ date: ovulationDateStr, size: "0", weight: "0" });
    } else {
        growthData[childIndex].forEach(item => {
            if (Number(item.size) === 0 && Number(item.weight) === 0) item.date = ovulationDateStr;
        });
    }

    growthData[childIndex].sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('request_growth', JSON.stringify(growthData));
}

// ==========================================
// INITIALISIERUNG & LOGIN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateRoleSelectOptions();

    let roleSelect = document.getElementById('userRoleSelect');
    if (roleSelect) roleSelect.value = currentUserRole;

    let profileHeaderName = document.getElementById('profileHeaderName');
    if (profileHeaderName) profileHeaderName.innerText = `Profil (${currentUserRole.split(' ')[0]})`;

    let settingNotif = document.getElementById('settingNotif');
    if (settingNotif) settingNotif.checked = appSettings.notif;

    let settingPregShare = document.getElementById('settingPregShare');
    if (settingPregShare) settingPregShare.checked = appSettings.pregShare;

    if (document.getElementById('unitSize')) document.getElementById('unitSize').value = appUnits.size;
    if (document.getElementById('unitWeight')) document.getElementById('unitWeight').value = appUnits.weight;

    updateUnitLabels();
    updatePregnancyNavVisibility();
    renderAuthStatus();

    kids.forEach((kid, idx) => {
        if (!kid) return;
        if (kid.birthDate && kid.dateType && kid.dateType.toLowerCase() === 'et') ensureOvulationPoint(idx, kid.birthDate);
        if (kid.birthDate && isChildBorn(kid) && (kid.size || kid.weight)) ensureInitialGrowthEntry(idx, kid.birthDate, kid.size, kid.weight);
    });
    
    // Login-Prüfung beim Start
    if (!isLoggedIn) {
        document.getElementById('mainBottomNav').classList.add('hidden');
        switchScreen('loginScreen');
    } else {
        document.getElementById('mainBottomNav').classList.remove('hidden');
        showMainAppScreen();
    }
});

function handleLoginSubmit() {
    isLoggedIn = true;
    localStorage.setItem('request_isLoggedIn', JSON.stringify(isLoggedIn));
    document.getElementById('mainBottomNav').classList.remove('hidden');
    renderAuthStatus();
    showMainAppScreen();
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.setItem('request_isLoggedIn', JSON.stringify(isLoggedIn));
    document.getElementById('mainBottomNav').classList.add('hidden');
    renderAuthStatus();
    switchScreen('loginScreen');
}

// ==========================================
// EINSTELLUNGEN & PROFIL
// ==========================================
function updateDateLabel() {
    let type = document.getElementById('newDateType').value;
    let label = document.getElementById('labelDateInput');
    if (type === 'et') label.innerText = "Errechneter Geburtstermin (ET)";
    else label.innerText = "Tatsächlicher Geburtstag";
}

function updateRoleSelectOptions() {
    let mamaOpt = document.getElementById('roleOptionMama');
    let papaOpt = document.getElementById('roleOptionPapa');
    if (!mamaOpt || !papaOpt) return;

    if (assignedRoles.mama && assignedRoles.mama !== currentUserRole) {
        mamaOpt.disabled = true; mamaOpt.innerText = "Mama 👩 (Bereits vergeben)";
    } else {
        mamaOpt.disabled = false; mamaOpt.innerText = "Mama 👩";
    }

    if (assignedRoles.papa && assignedRoles.papa !== currentUserRole) {
        papaOpt.disabled = true; papaOpt.innerText = "Papa 👨 (Bereits vergeben)";
    } else {
        papaOpt.disabled = false; papaOpt.innerText = "Papa 👨";
    }
}

function saveUserRole() {
    let roleSelect = document.getElementById('userRoleSelect');
    if (!roleSelect) return;
    let selectedVal = roleSelect.value;

    if (selectedVal.includes("Mama")) {
        if (assignedRoles.mama && assignedRoles.mama !== currentUserRole) { alert("Diese Option ist bereits für Mama vergeben!"); roleSelect.value = currentUserRole; return; }
        assignedRoles.mama = selectedVal;
    } else if (selectedVal.includes("Papa")) {
        if (assignedRoles.papa && assignedRoles.papa !== currentUserRole) { alert("Diese Option ist bereits für Papa vergeben!"); roleSelect.value = currentUserRole; return; }
        assignedRoles.papa = selectedVal;
    }

    currentUserRole = selectedVal;
    localStorage.setItem('request_userRole', currentUserRole);
    localStorage.setItem('request_assignedRoles', JSON.stringify(assignedRoles));

    updateRoleSelectOptions();
    let profileHeaderName = document.getElementById('profileHeaderName');
    if (profileHeaderName) profileHeaderName.innerText = `Profil (${currentUserRole.split(' ')[0]})`;
    updatePregnancyNavVisibility();
}

function updatePregnancyNavVisibility() {
    let navItem = document.getElementById('navPregnancyItem');
    let shareCard = document.getElementById('familyPregnancyShareCard');
    if (!navItem || !shareCard) return;

    let isMomOrDad = currentUserRole.includes("Mama") || currentUserRole.includes("Papa");
    
    if (isMomOrDad) {
        shareCard.style.display = 'block'; navItem.style.display = 'flex';
    } else {
        shareCard.style.display = 'none';
        if (appSettings.pregShare) navItem.style.display = 'flex';
        else {
            navItem.style.display = 'none';
            let pregScreen = document.getElementById('pregnancyScreen');
            if (pregScreen && pregScreen.classList.contains('active')) showMainAppScreen();
        }
    }
}

function openProfileSubpage(subpageId) {
    document.getElementById('profileMainView').style.display = 'none';
    document.querySelectorAll('#profileScreen .subpage').forEach(page => page.classList.remove('active'));
    document.getElementById(subpageId).classList.add('active');
    if (subpageId === 'authSubpage') renderAuthStatus();
}

function closeProfileSubpage() {
    document.querySelectorAll('#profileScreen .subpage').forEach(page => page.classList.remove('active'));
    document.getElementById('profileMainView').style.display = 'block';
}

function renderAuthStatus() {
    let container = document.getElementById('authStatusContainer');
    if (!container) return;
    
    if (isLoggedIn) {
        container.innerHTML = `
            <div class="highlight-box">🟢 Du bist aktuell angemeldet als <strong>${currentUserRole}</strong>.</div>
            <button onclick="handleLogout()" class="btn" style="background:#fee2e2; color:#dc2626;">🔒 Abmelden</button>
        `;
    } else {
        container.innerHTML = `
            <div class="highlight-box">🔴 Du bist aktuell abgemeldet.</div>
            <button onclick="handleLoginSubmit()" class="btn">🔑 Wieder Anmelden</button>
        `;
    }
}

function submitContactForm() {
    let msg = document.getElementById('contactUserMsg').value.trim();
    if (!msg) {
        alert("Bitte schreibe eine kurze Nachricht in das Feld.");
        return;
    }
    
    let subject = encodeURIComponent("Support Anfrage BabySteps");
    let body = encodeURIComponent(msg);
    window.location.href = `mailto:babystep@gmx.net?subject=${subject}&body=${body}`;
    
    document.getElementById('contactUserEmail').value = '';
    document.getElementById('contactUserMsg').value = '';
    closeProfileSubpage();
}

function saveSettings() {
    appSettings = {
        notif: document.getElementById('settingNotif').checked,
        pregShare: document.getElementById('settingPregShare') ? document.getElementById('settingPregShare').checked : appSettings.pregShare
    };
    localStorage.setItem('request_settings', JSON.stringify(appSettings));

    appUnits = {
        size: document.getElementById('unitSize') ? document.getElementById('unitSize').value : 'cm',
        weight: document.getElementById('unitWeight') ? document.getElementById('unitWeight').value : 'kg'
    };
    localStorage.setItem('request_units', JSON.stringify(appUnits));

    updateUnitLabels();
    updatePregnancyNavVisibility();
    renderDashboard();
}

function updateUnitLabels() {
    let labelSizeBirth = document.getElementById('labelSizeBirth');
    if (labelSizeBirth) labelSizeBirth.innerText = `Größe bei Geburt (optional in ${appUnits.size})`;
    let labelWeightBirth = document.getElementById('labelWeightBirth');
    if (labelWeightBirth) labelWeightBirth.innerText = `Gewicht bei Geburt (optional in ${appUnits.weight})`;
    let labelGrowthSize = document.getElementById('labelGrowthSize');
    if (labelGrowthSize) labelGrowthSize.innerText = `Größe (${appUnits.size})`;
    let labelGrowthWeight = document.getElementById('labelGrowthWeight');
    if (labelGrowthWeight) labelGrowthWeight.innerText = `Gewicht (${appUnits.weight})`;
    let labelPregSize = document.getElementById('labelPregSize');
    if (labelPregSize) labelPregSize.innerText = `Größe des Babys im Bauch (${appUnits.size}, opt.)`;
    let labelPregWeight = document.getElementById('labelPregWeight');
    if (labelPregWeight) labelPregWeight.innerText = `Gewicht des Babys im Bauch (${appUnits.weight}, opt.)`;
}

// ==========================================
// NAVIGATION & SCREEN MANAGEMENT
// ==========================================
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    let target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

function switchNav(screenId, btnElement) {
    switchScreen(screenId);
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (screenId === 'profileScreen') closeProfileSubpage();
    if (screenId === 'galleryScreen') renderGallery();
    if (screenId === 'growthScreen') initGrowthScreen();
    if (screenId === 'sleepScreen') initSleepScreen();
    if (screenId === 'pregnancyScreen') initPregnancyScreen();
    if (screenId === 'wishlistScreen') initWishlistScreen();
    if (screenId === 'statsScreen') renderStats();
}

function showMainAppScreen() {
    renderDashboard();
    renderCalendar();
    switchScreen('mainAppScreen');
    document.querySelectorAll('.nav-item').forEach((el, idx) => {
        if(idx === 0) el.classList.add('active'); else el.classList.remove('active');
    });
}

function showAddChildScreen() {
    editingIndex = null; currentAvatarOverride = null;
    document.getElementById('formTitle').innerText = "Kind anlegen";
    document.getElementById('newName').value = '';
    document.getElementById('newGender').value = 'male';
    document.getElementById('newDateType').value = 'et';
    document.getElementById('newBirthDate').value = '';
    document.getElementById('newSize').value = '';
    document.getElementById('newWeight').value = '';
    document.getElementById('newImageFile').value = '';
    updateDateLabel();
    switchScreen('addChildScreen');
}

// ==========================================
// DASHBOARD & KINDER VERWALTUNG
// ==========================================
function calculateAgeString(birthDateStr) {
    let birthDate = new Date(birthDateStr);
    let today = new Date();
    let diffDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Noch nicht geboren (Zukunft)";
    if (diffDays === 0) return "Heute geboren (0 Tage)";
    if (diffDays < 31) return `${diffDays} Tag(e) alt`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30.44)} Monat(e) alt`;
    return `ca. ${(diffDays / 365.25).toFixed(1)} Jahr(e) alt`;
}

function renderDashboard() {
    let container = document.getElementById('kidsDashboard');
    if (!container) return;
    container.innerHTML = '';

    if (kids.length === 0) {
        container.innerHTML = `
            <div class="card">
                <p style="color:var(--text-muted); margin:0;">
                    Noch keine Kinder angelegt. Lege jetzt dein erstes Kind an!
                </p>
            </div>
        `;
        return;
    }

    kids.forEach((kid, index) => {
        if (!kid) return;
        let lastPost = getLastPostForChild(index);
        let latestGrowth = getLatestGrowth(index);

        let displaySize = latestGrowth ? latestGrowth.size : kid.size;
        let displayWeight = latestGrowth ? latestGrowth.weight : kid.weight;
        let displayDateText = latestGrowth ? `(vom ${latestGrowth.date})` : '';
        let genderText = kid.gender === 'female' ? 'Mädchen' : 'Junge';

        let card = document.createElement('div');
        card.className = 'card';
        let bgColor = kid.gender === 'female' ? '#FCE7F3' : '#E0F2FE';
        let borderColor = kid.gender === 'female' ? '#FBCFE8' : '#BAE6FD';
        card.style.cssText = `background-color: ${bgColor} !important; border: 2px solid ${borderColor} !important;`;

        let subInfoText = "";
        let typeVal = kid.dateType ? kid.dateType.toLowerCase() : 'et';
        if (typeVal === 'geburtstag' || isChildBorn(kid)) {
            let ageStr = kid.birthDate ? calculateAgeString(kid.birthDate) : '-';
            subInfoText = `Geburtstag: ${kid.birthDate || '-'} (${ageStr})`;
        } else {
            subInfoText = `ET: ${kid.birthDate || '-'}`;
        }

        let lastPostHtml = '';
        if (lastPost) {
            let firstMedia = (lastPost.media && lastPost.media.length > 0) ? lastPost.media[0] : null;
            let firstSrc = firstMedia ? ((typeof firstMedia === 'string') ? firstMedia : firstMedia.url) : null;
            let imgHtml = firstSrc ? 
                `<img src="${firstSrc}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">` : 
                `<div style="width:50px; height:50px; background:rgba(255,255,255,0.5); display:flex; align-items:center; justify-content:center; font-size:1.2rem; border-radius:8px;">📝</div>`;
            
            let now = new Date();
            let formattedDateStr = `${String(lastPost.day).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;

            lastPostHtml = `
                <div style="margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #64748b; margin-bottom: 6px;">
                        <span>Letzter Post vom ${formattedDateStr}</span>
                        <span>🕒 Neu</span>
                    </div>
                    <div onclick="openViewPostModal(${lastPost.day}, ${index})" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        ${imgHtml}
                        <div style="font-size: 0.9rem; color: #1e293b; font-weight: 500;">${lastPost.text || 'Bild/Video Beitrag'}</div>
                    </div>
                </div>
            `;
        } else {
            lastPostHtml = `
                <div style="margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                    <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 4px;">Letzter Post</div>
                    <div style="font-size: 0.8rem; color: #94a3b8;">Noch kein Beitrag vorhanden.</div>
                </div>
            `;
        }

        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${kid.avatar || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150'}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
                <div>
                    <h3 style="margin:0; font-size: 1.1rem;">${kid.name} (${genderText})</h3>
                    <p style="margin:5px 0 0; font-size:0.85rem; color:#64748b;">
                        ${subInfoText}<br>
                        Größe: ${displaySize ? displaySize + ' ' + appUnits.size : '-'} | Gewicht: ${displayWeight || '-'} ${appUnits.weight} 
                        <span style="font-size:0.75rem; color:var(--primary);">${displayDateText}</span>
                    </p>
                </div>
            </div>
            ${lastPostHtml}
            <div style="margin-top:15px; display:flex; gap:10px;">
                <button onclick="openEditChild(${index})" style="background:rgba(255,255,255,0.7); color:#3A322C; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:0.85rem;">✏️ Bearbeiten</button>
                <button onclick="deleteChild(${index})" style="background:rgba(220, 38, 38, 0.1); color:#dc2626; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:0.85rem;">🗑️ Löschen</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function getLastPostForChild(childIndex) {
    let allDays = Object.keys(allPosts);
    if (allDays.length === 0) return null;
    let validDays = allDays.filter(day => allPosts[day] && Array.isArray(allPosts[day]) && allPosts[day].some(p => p && p.childIndex === childIndex));
    if (validDays.length === 0) return null;
    
    validDays.sort((a, b) => Number(b) - Number(a));
    let latestDay = validDays[0];
    let childPost = [...allPosts[latestDay]].reverse().find(p => p && p.childIndex === childIndex);
    
    return childPost ? { ...childPost, day: latestDay } : null;
}

function getLatestGrowth(childIndex) {
    let list = growthData[childIndex];
    if (!list || list.length === 0) return null;
    let validItems = list.filter(i => Number(i.size) > 0 || Number(i.weight) > 0);
    return validItems.length > 0 ? validItems[validItems.length - 1] : list[list.length - 1];
}

async function saveNewChildData() {
    let name = document.getElementById('newName').value.trim();
    if (!name) { alert("Bitte gib einen Namen ein."); return; }

    let fileInput = document.getElementById('newImageFile');
    let avatarUrl = editingIndex !== null ? kids[editingIndex].avatar : 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150';

    if (currentAvatarOverride) {
        avatarUrl = currentAvatarOverride;
    } else if (fileInput.files && fileInput.files[0]) {
        avatarUrl = await readFileAsDataURL(fileInput.files[0]);
    }

    let kidData = {
        name: name,
        gender: document.getElementById('newGender').value,
        dateType: document.getElementById('newDateType').value,
        birthDate: document.getElementById('newBirthDate').value,
        size: document.getElementById('newSize').value,
        weight: document.getElementById('newWeight').value,
        avatar: avatarUrl
    };

    let targetIndex = editingIndex !== null ? editingIndex : kids.length;
    
    if (editingIndex !== null) kids[editingIndex] = kidData;
    else kids.push(kidData);

    localStorage.setItem('request_kids', JSON.stringify(kids));

    if (kidData.birthDate && isChildBorn(kidData) && (kidData.size || kidData.weight)) {
        ensureInitialGrowthEntry(targetIndex, kidData.birthDate, kidData.size, kidData.weight);
    }

    if (kidData.birthDate && kidData.dateType && kidData.dateType.toLowerCase() === 'et') {
        ensureOvulationPoint(targetIndex, kidData.birthDate);
    }
    showMainAppScreen();
}

function openEditChild(index) {
    editingIndex = index;
    currentAvatarOverride = null;
    let kid = kids[index];
    
    document.getElementById('formTitle').innerText = "Kind bearbeiten";
    document.getElementById('newName').value = kid.name || '';
    document.getElementById('newGender').value = kid.gender || 'male';
    document.getElementById('newDateType').value = kid.dateType || 'et';
    document.getElementById('newBirthDate').value = kid.birthDate || '';
    document.getElementById('newSize').value = kid.size || '';
    document.getElementById('newWeight').value = kid.weight || '';
    document.getElementById('newImageFile').value = '';
    
    updateDateLabel();
    switchScreen('addChildScreen');
}

function deleteChild(index) {
    if (confirm("Möchtest du dieses Kind wirklich löschen?")) {
        kids.splice(index, 1);
        localStorage.setItem('request_kids', JSON.stringify(kids));
        renderDashboard();
    }
}

// ==========================================
// KALENDER & BEITRÄGE
// ==========================================
function toggleCalendar() {
    isCalendarExpanded = !isCalendarExpanded;
    document.getElementById('calendarContainer').style.display = isCalendarExpanded ? 'block' : 'none';
    document.getElementById('calendarToggleBtn').innerText = isCalendarExpanded ? '📅 Kalender einklappen' : '📅 Kalender ausklappen';
}

function renderCalendar() {
    let grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let now = new Date();
    document.getElementById('currentMonthTitle').innerText = now.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

    let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.innerText = i;
        
        if (i === now.getDate() && now.getMonth() === now.getMonth() && now.getFullYear() === now.getFullYear()) {
            cell.classList.add('today');
        }

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
    if (posts && posts.length > 0) openViewPostModal(day, posts[posts.length - 1].childIndex, posts.length - 1);
    else openDayModal(day);
}

function openDayModal(day, postIndexToEdit = null) {
    selectedDayForModal = day;
    editingPostIndex = postIndexToEdit;
    
    let titleEl = document.getElementById('modalDayTitle');
    if(titleEl) titleEl.innerText = editingPostIndex !== null ? "Beitrag bearbeiten" : "Eintrag erstellen";
    
    let btnEl = document.getElementById('savePostBtn');
    if(btnEl) btnEl.innerText = editingPostIndex !== null ? "Änderungen speichern" : "Speichern";
    
    document.getElementById('postAuthorInput').value = currentUserRole;
    
    let dateInput = document.getElementById('postDateInput');
    if (dateInput) {
        let now = new Date();
        let dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dateInput.value = dateStr;
    }

    if (editingPostIndex !== null && allPosts[day] && allPosts[day][editingPostIndex]) {
        document.getElementById('dayNoteInput').value = allPosts[day][editingPostIndex].text || '';
    } else {
        document.getElementById('dayNoteInput').value = '';
    }
    
    document.getElementById('dayMediaInput').value = '';

    let select = document.getElementById('postChildSelect');
    select.innerHTML = kids.length === 0 ? '<option>Bitte zuerst ein Kind anlegen</option>' : '';
    kids.forEach((k, idx) => {
        let opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = k.name;
        if (editingPostIndex !== null && allPosts[day] && allPosts[day][editingPostIndex] && allPosts[day][editingPostIndex].childIndex === idx) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    renderSavedPostsForModal();
    document.getElementById('dayModal').style.display = 'flex';
}

function closeDayModal() { 
    document.getElementById('dayModal').style.display = 'none'; 
}

function openViewPostModal(day, targetChildIndex, postIndex = null) {
    selectedDayForModal = day;
    let posts = allPosts[day];
    if (!posts || posts.length === 0) return;

    let targetIdx = postIndex !== null ? postIndex : posts.findIndex(p => p.childIndex === targetChildIndex);
    if (targetIdx === -1) targetIdx = posts.length - 1;
    viewingPostIndex = targetIdx;
    let post = posts[targetIdx];

    let now = new Date();
    document.getElementById('viewPostTitle').innerText = `Beitrag vom ${String(day).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
    
    let container = document.getElementById('viewPostContent');
    container.innerHTML = `
        <div style="font-weight: 600; color: var(--primary); margin-bottom: 6px;">
            ${post.author} für ${kids[post.childIndex] ? kids[post.childIndex].name : 'Kind'}:
        </div>
        <div style="margin-bottom: 12px;">${post.text || ''}</div>
    `;

    if (post.media && post.media.length > 0) {
        let mediaWrapper = document.createElement('div');
        mediaWrapper.style.cssText = "display: flex; flex-direction: column; gap: 10px; margin-top: 10px;";
        
        post.media.forEach(m => {
            let src = (typeof m === 'string') ? m : m.url;
            let isVideo = (typeof m === 'object' && m.type === 'video') || src.includes('video');
            
            let element;
            if (isVideo) {
                element = document.createElement('video');
                element.src = src;
                element.controls = true;
            } else {
                element = document.createElement('img');
                element.src = src;
            }
            element.style.cssText = "width: 100%; max-height: 250px; border-radius: 12px; object-fit: cover;";
            mediaWrapper.appendChild(element);
        });
        
        container.appendChild(mediaWrapper);
    }
    
    document.getElementById('viewPostModal').style.display = 'flex';
}

function closeViewPostModal() { 
    document.getElementById('viewPostModal').style.display = 'none'; 
}

function openCreateFromView() { 
    closeViewPostModal(); openDayModal(selectedDayForModal); 
}

function editCurrentViewPost() { 
    closeViewPostModal(); openDayModal(selectedDayForModal, viewingPostIndex); 
}

function deleteCurrentViewPost() {
    if (confirm("Möchtest du diesen Beitrag wirklich löschen?")) {
        allPosts[selectedDayForModal].splice(viewingPostIndex, 1);
        if (allPosts[selectedDayForModal].length === 0) delete allPosts[selectedDayForModal];
        localStorage.setItem('request_posts', JSON.stringify(allPosts));
        closeViewPostModal(); renderCalendar(); renderDashboard();
    }
}

function deletePostFromModal(day, index) {
    if (confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
        allPosts[day].splice(index, 1);
        if (allPosts[day].length === 0) delete allPosts[day];
        localStorage.setItem('request_posts', JSON.stringify(allPosts));
        renderCalendar(); renderDashboard(); renderSavedPostsForModal();
        if (!allPosts[day] || allPosts[day].length === 0) closeDayModal();
    }
}

async function saveDayPost() {
    let text = document.getElementById('dayNoteInput').value;
    let files = document.getElementById('dayMediaInput').files;
    let dateInput = document.getElementById('postDateInput');
    let selectedDateStr = dateInput ? dateInput.value : null;

    if (!text.trim() && files.length === 0 && editingPostIndex === null) {
        alert("Bitte schreibe eine Notiz oder wähle ein Bild/Video aus.");
        return;
    }

    let targetDay = selectedDayForModal;
    if (selectedDateStr) {
        targetDay = parseInt(selectedDateStr.split('-')[2], 10);
    }

    let mediaArray = [];
    if (files.length > 0) {
        for (let f of files) {
            let dataUrl = await readFileAsDataURL(f);
            mediaArray.push({ url: dataUrl, type: f.type.startsWith('video') ? 'video' : 'image' });
        }
    } else if (editingPostIndex !== null && allPosts[selectedDayForModal] && allPosts[selectedDayForModal][editingPostIndex]) {
        mediaArray = allPosts[selectedDayForModal][editingPostIndex].media || [];
    }

    let postObj = { 
        author: currentUserRole, 
        childIndex: Number(document.getElementById('postChildSelect').value), 
        text: text, 
        media: mediaArray 
    };

    if (editingPostIndex !== null && targetDay !== selectedDayForModal) {
        allPosts[selectedDayForModal].splice(editingPostIndex, 1);
        if (allPosts[selectedDayForModal].length === 0) delete allPosts[selectedDayForModal];
        editingPostIndex = null; 
    }

    if (!allPosts[targetDay]) {
        allPosts[targetDay] = [];
    }
    
    if (editingPostIndex !== null && targetDay === selectedDayForModal) {
        allPosts[targetDay][editingPostIndex] = postObj;
    } else {
        allPosts[targetDay].push(postObj);
    }

    localStorage.setItem('request_posts', JSON.stringify(allPosts));
    renderCalendar();
    renderDashboard();
    closeDayModal();
}

function renderSavedPostsForModal() {
    let container = document.getElementById('savedPostsList');
    container.innerHTML = '';
    
    let posts = allPosts[selectedDayForModal];
    if (posts && posts.length > 0) {
        container.innerHTML = '<strong>Bereits gespeicherte Beiträge:</strong>';
        posts.forEach((p, idx) => {
            let div = document.createElement('div');
            div.style.cssText = "background:#f1f5f9; padding:10px; border-radius:12px; margin-top:8px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center;";
            div.innerHTML = `
                <div><b>${p.author}:</b> ${p.text || ''}</div>
                <div style="display:flex; gap:6px;">
                    <button onclick="openDayModal(${selectedDayForModal}, ${idx})">✏️</button>
                    <button onclick="deletePostFromModal(${selectedDayForModal}, ${idx})">🗑️</button>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// ==========================================
// GALERIE & STATISTIK
// ==========================================
function renderGallery() {
    let container = document.getElementById('fullGalleryGrid');
    container.innerHTML = '';
    
    let mediaList = [];
    Object.keys(allPosts).forEach(day => {
        allPosts[day].forEach(post => {
            if (post.media) {
                post.media.forEach(m => mediaList.push({ day: day, media: m }));
            }
        });
    });

    if (mediaList.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; grid-column: span 2;">Noch keine Medien vorhanden.</p>';
        return;
    }

    mediaList.forEach(item => {
        let src = (typeof item.media === 'string') ? item.media : item.media.url;
        let box = document.createElement('div');
        box.style.cssText = "background:#f1f5f9; border-radius:12px; overflow:hidden;";
        box.innerHTML = `
            <img src="${src}" style="width:100%; height:120px; object-fit:cover;">
            <div style="padding:6px; font-size:0.75rem; color:var(--text-muted);">Tag ${item.day}</div>
        `;
        container.appendChild(box);
    });
}

function renderStats() {
    let container = document.getElementById('statsContent');
    if (!container) return;
    container.innerHTML = '';
    
    let totalPosts = 0, totalImages = 0, totalVideos = 0;
    Object.keys(allPosts).forEach(day => {
        allPosts[day].forEach(post => {
            totalPosts++;
            if (post.media) {
                post.media.forEach(m => {
                    let src = (typeof m === 'string') ? m : m.url;
                    if ((typeof m === 'object' && m.type === 'video') || src.includes('video')) totalVideos++;
                    else totalImages++;
                });
            }
        });
    });

    container.innerHTML = `
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>📝 Gesamtanzahl Posts</span><b style="color:var(--primary); font-size:1.1rem;">${totalPosts}</b>
        </div>
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>🖼️ Gepostete Bilder</span><b style="color:var(--primary); font-size:1.1rem;">${totalImages}</b>
        </div>
        <div style="background:#f1f5f9; padding:14px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>🎥 Gepostete Videos</span><b style="color:var(--primary); font-size:1.1rem;">${totalVideos}</b>
        </div>
    `;
}

// ==========================================
// WACHSTUM (GRÖSSE & GEWICHT)
// ==========================================
function initGrowthScreen() {
    let select = document.getElementById('growthChildSelect');
    select.innerHTML = '';

    let bornKids = [];
    kids.forEach((k, idx) => {
        if (isChildBorn(k)) bornKids.push({ kid: k, originalIndex: idx });
    });

    if (bornKids.length === 0) {
        select.innerHTML = '<option value="">Keine geborenen Kinder vorhanden</option>';
    } else {
        bornKids.forEach(item => {
            let opt = document.createElement('option');
            opt.value = item.originalIndex;
            opt.innerText = item.kid.name;
            select.appendChild(opt);
        });
    }

    if (document.getElementById('growthDateInput')) document.getElementById('growthDateInput').valueAsDate = new Date();
    resetGrowthForm();
    renderGrowthData();
}

function resetGrowthForm() {
    if (document.getElementById('growthDateInput')) document.getElementById('growthDateInput').valueAsDate = new Date();
    document.getElementById('growthSizeInput').value = '';
    document.getElementById('growthWeightInput').value = '';
    document.getElementById('growthFormButtons').innerHTML = `<button onclick="saveGrowthEntry()" class="btn" id="saveGrowthBtn">Messung eintragen</button>`;
    editingGrowthIndex = null;
}

function saveGrowthEntry() {
    let childIndex = document.getElementById('growthChildSelect').value;
    if (childIndex === "" || childIndex === null || !kids[childIndex]) { alert("Bitte wähle ein gültiges Kind aus."); return; }

    let entry = { 
        date: document.getElementById('growthDateInput').value, 
        size: document.getElementById('growthSizeInput').value, 
        weight: document.getElementById('growthWeightInput').value 
    };
    
    if (!entry.date || (!entry.size && !entry.weight)) { alert("Bitte Datum und mindestens Größe oder Gewicht angeben."); return; }

    if (!growthData[childIndex]) growthData[childIndex] = [];
    if (editingGrowthIndex !== null) growthData[childIndex][editingGrowthIndex] = entry;
    else growthData[childIndex].push(entry);

    growthData[childIndex].sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('request_growth', JSON.stringify(growthData));
    
    resetGrowthForm(); renderGrowthData(); renderDashboard();
}

function editGrowthEntry(index) {
    let childIndex = document.getElementById('growthChildSelect').value;
    let item = growthData[childIndex][index];
    
    document.getElementById('growthDateInput').value = item.date;
    document.getElementById('growthSizeInput').value = item.size || '';
    document.getElementById('growthWeightInput').value = item.weight || '';
    editingGrowthIndex = index;
    
    document.getElementById('growthFormButtons').innerHTML = `<button onclick="saveGrowthEntry()" class="btn">Aktualisieren</button><button onclick="resetGrowthForm()" class="btn btn-secondary" style="margin-top:6px;">Abbrechen</button>`;
}

function deleteGrowthEntry(index) {
    if (confirm("Messwert löschen?")) {
        let childIndex = document.getElementById('growthChildSelect').value;
        growthData[childIndex].splice(index, 1);
        localStorage.setItem('request_growth', JSON.stringify(growthData));
        resetGrowthForm(); renderGrowthData(); renderDashboard();
    }
}

function renderGrowthData() {
    let childIndex = document.getElementById('growthChildSelect').value;
    let container = document.getElementById('growthHistoryList');
    container.innerHTML = '';

    if (childIndex === "" || childIndex === null || childIndex === undefined || !kids[childIndex]) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Keine geborenen Kinder vorhanden oder ausgewählt.</p>';
        document.getElementById('chartContainer').innerHTML = '';
        return;
    }

    let list = growthData[childIndex];

    if (!list || list.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Noch keine Messwerte.</p>';
        document.getElementById('chartContainer').innerHTML = '';
        return;
    }

    list.forEach((item, index) => {
        let div = document.createElement('div');
        div.style.cssText = "background:#f1f5f9; padding:12px; border-radius:10px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;";
        div.innerHTML = `
            <div>
                <span>📏 ${item.size ? item.size + ' ' + appUnits.size : '-'}</span> &nbsp;|&nbsp; 
                <span>⚖️ ${item.weight ? item.weight + ' ' + appUnits.weight : '-'}</span>
                <div style="margin-top:6px; font-size:0.75rem; color:var(--text-muted);">📅 ${item.date}</div>
            </div>
            <div>
                <button onclick="editGrowthEntry(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.1rem;">✏️</button>
                <button onclick="deleteGrowthEntry(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.1rem;">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
    
    renderGrowthChart(list, document.getElementById('chartContainer'), kids[childIndex]);
}

function renderGrowthChart(list, container, kid) {
    container.innerHTML = '';
    let width = 520, height = 360, pL = 55, pR = 25, pB = 65, pT = 40;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.width = "100%";

    let bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("width", width); bg.setAttribute("height", height);
    bg.setAttribute("fill", "#ffffff");
    svg.appendChild(bg);

    let legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.innerHTML = `
        <circle cx="160" cy="18" r="5" fill="#ef4444"/>
        <text x="172" y="21" font-size="12" font-weight="600" fill="#1e293b">Gewicht (Rot)</text>
        <circle cx="310" cy="18" r="5" fill="#10b981"/>
        <text x="322" y="21" font-size="12" font-weight="600" fill="#1e293b">Größe (Grün)</text>
    `;
    svg.appendChild(legendGroup);

    let maxValSize = 80;
    list.forEach(item => { if(Number(item.size) > maxValSize) maxValSize = Math.ceil(Number(item.size) / 10) * 10; });
    let maxValWeight = 20;
    list.forEach(item => { if(Number(item.weight) > maxValWeight) maxValWeight = Math.ceil(Number(item.weight) / 5) * 5; });

    let minTime = new Date(list[0].date).getTime();
    let maxTime = new Date(list[list.length - 1].date).getTime();
    if (minTime === maxTime) maxTime += 86400000;

    let getX = dateStr => {
        let t = new Date(dateStr).getTime();
        return pL + ((t - minTime) / (maxTime - minTime)) * (width - pL - pR);
    };
    let getYSize = val => pT + (height - pB - pT) - (Number(val) / maxValSize) * (height - pB - pT);
    let getYWeight = val => pT + (height - pB - pT) - (Number(val) / maxValWeight) * (height - pB - pT);

    for (let v = 0; v <= maxValSize; v += 10) {
        let y = getYSize(v);
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", pL); line.setAttribute("y1", y); line.setAttribute("x2", width - pR); line.setAttribute("y2", y);
        line.setAttribute("stroke", "#e2e8f0"); line.setAttribute("stroke-dasharray", "3,3");
        svg.appendChild(line);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", pL - 8); text.setAttribute("y", y + 4); text.setAttribute("font-size", "11"); text.setAttribute("fill", "#64748b"); text.setAttribute("text-anchor", "end");
        text.textContent = v + "cm";
        svg.appendChild(text);
    }

    let sizePoints = list.filter(i => i.size !== "" && !isNaN(Number(i.size)));
    if (sizePoints.length > 1) {
        let pathStr = sizePoints.map((item, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(item.date)} ${getYSize(item.size)}`).join(' ');
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathStr); path.setAttribute("fill", "none"); path.setAttribute("stroke", "#10b981"); path.setAttribute("stroke-width", "2.5");
        svg.appendChild(path);
    }

    let weightPoints = list.filter(i => i.weight !== "" && !isNaN(Number(i.weight)));
    if (weightPoints.length > 1) {
        let pathStrW = weightPoints.map((item, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(item.date)} ${getYWeight(item.weight)}`).join(' ');
        let pathW = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathW.setAttribute("d", pathStrW); pathW.setAttribute("fill", "none"); pathW.setAttribute("stroke", "#ef4444"); pathW.setAttribute("stroke-width", "2.5");
        svg.appendChild(pathW);
    }

    for (let w = 0; w <= maxValWeight; w += 5) {
        let x = pL + (w / maxValWeight) * (width - pL - pR);
        let textW = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textW.setAttribute("x", x); textW.setAttribute("y", height - pB + 20); textW.setAttribute("font-size", "10"); textW.setAttribute("fill", "#ef4444"); textW.setAttribute("text-anchor", "middle");
        textW.textContent = w + "kg";
        svg.appendChild(textW);
        
        let lineW = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineW.setAttribute("x1", x); lineW.setAttribute("y1", pT); lineW.setAttribute("x2", x); lineW.setAttribute("y2", height - pB); lineW.setAttribute("stroke", "#f1f5f9"); lineW.setAttribute("stroke-dasharray", "2,2");
        svg.insertBefore(lineW, svg.firstChild);
    }

    list.forEach(item => {
        let x = getX(item.date);
        if (item.size && !isNaN(Number(item.size))) {
            let y = getYSize(item.size);
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x); circle.setAttribute("cy", y); circle.setAttribute("r", "4.5"); circle.setAttribute("fill", "#10b981");
            svg.appendChild(circle);
        }
        if (item.weight && !isNaN(Number(item.weight))) {
            let y = getYWeight(item.weight);
            let circleW = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circleW.setAttribute("cx", x); circleW.setAttribute("cy", y); circleW.setAttribute("r", "4.5"); circleW.setAttribute("fill", "#ef4444");
            svg.appendChild(circleW);
        }

        let dateText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dateText.setAttribute("x", x); dateText.setAttribute("y", height - pB + 35); dateText.setAttribute("font-size", "10"); dateText.setAttribute("fill", "#1e293b"); dateText.setAttribute("text-anchor", "end"); dateText.setAttribute("transform", `rotate(-35, ${x}, ${height - pB + 35})`);
        dateText.textContent = item.date.split('-').reverse().join('.');
        svg.appendChild(dateText);
    });

    container.appendChild(svg);
}

// ==========================================
// SCHLAFTRACKER LOGIK
// ==========================================
function initSleepScreen() {
    let select = document.getElementById('sleepChildSelect'); 
    select.innerHTML = '';
    
    kids.forEach((k, idx) => {
        let opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = k.name;
        select.appendChild(opt);
    });
    
    resetSleepForm(); 
    renderSleepData();
}

function resetSleepForm() {
    document.getElementById('sleepStartInput').value = '';
    document.getElementById('sleepEndInput').value = '';
    document.getElementById('sleepFormButtons').innerHTML = `<button onclick="saveSleepEntry()" class="btn">Schlaf eintragen</button>`;
    editingSleepIndex = null;
}

function saveSleepEntry() {
    let childIndex = document.getElementById('sleepChildSelect').value;
    let start = document.getElementById('sleepStartInput').value;
    let end = document.getElementById('sleepEndInput').value;
    
    if (!start) { alert("Bitte mindestens die Einschlafzeit angeben."); return; }
    
    let startTime = new Date(start).getTime();
    let durationMins = 0;
    let isSleeping = true;

    if (end) {
        let endTime = new Date(end).getTime();
        if (endTime <= startTime) { alert("Die Aufwachzeit muss nach der Einschlafzeit liegen."); return; }
        durationMins = Math.round((endTime - startTime) / 60000);
        isSleeping = false;
    }
    
    let entry = { start: start, end: end || null, duration: durationMins, isSleeping: isSleeping };
    if (!sleepData[childIndex]) sleepData[childIndex] = [];
    
    if (editingSleepIndex !== null) sleepData[childIndex][editingSleepIndex] = entry;
    else sleepData[childIndex].push(entry);
    
    sleepData[childIndex].sort((a, b) => new Date(b.start) - new Date(a.start));
    localStorage.setItem('request_sleep', JSON.stringify(sleepData));
    
    resetSleepForm(); renderSleepData();
}

function formatDuration(mins) {
    let h = Math.floor(mins / 60); let m = mins % 60;
    if (h > 0) return `${h} Std. ${m} Min.`;
    return `${m} Min.`;
}

function editSleepEntry(index) {
    let childIndex = document.getElementById('sleepChildSelect').value;
    let item = sleepData[childIndex][index];
    
    document.getElementById('sleepStartInput').value = item.start;
    document.getElementById('sleepEndInput').value = item.end || '';
    editingSleepIndex = index;
    
    document.getElementById('sleepFormButtons').innerHTML = `<button onclick="saveSleepEntry()" class="btn">Aktualisieren</button><button onclick="resetSleepForm()" class="btn btn-secondary" style="margin-top:6px;">Abbrechen</button>`;
}

function wakeUpChild(index) {
    let childIndex = document.getElementById('sleepChildSelect').value;
    let item = sleepData[childIndex][index];
    
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let endStr = now.toISOString().slice(0, 16);
    
    item.end = endStr;
    let startTime = new Date(item.start).getTime();
    let endTime = new Date(item.end).getTime();
    
    item.duration = Math.round((endTime - startTime) / 60000);
    item.isSleeping = false;
    
    localStorage.setItem('request_sleep', JSON.stringify(sleepData));
    renderSleepData();
}

function renderSleepData() {
    let childIndex = document.getElementById('sleepChildSelect').value;
    let container = document.getElementById('sleepHistoryList'); 
    container.innerHTML = '';
    
    if (!sleepData[childIndex] || sleepData[childIndex].length === 0) {
        container.innerHTML = '<p style="font-size:0.85rem; color:var(--text-muted);">Noch keine Schlafdaten eingetragen.</p>'; 
        document.getElementById('sleepChartContainer').innerHTML = '';
        return;
    }

    sleepData[childIndex].forEach((item, index) => {
        let div = document.createElement('div');
        div.style.cssText = "background:#f1f5f9; padding:12px; border-radius:10px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;";
        
        let sDate = new Date(item.start); 
        let formatOpt = { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' };
        
        let durationText = item.isSleeping ? `<span style="color:var(--primary); font-weight:bold;">Schläft gerade... 😴</span>` : `Dauer: ${formatDuration(item.duration)}`;
        let endText = item.isSleeping ? `<button onclick="wakeUpChild(${index})" style="margin-top:5px; padding:6px 10px; border-radius:6px; border:none; background:var(--primary); color:white; font-size:0.8rem; font-weight:bold; cursor:pointer;">Jetzt aufgewacht</button>` : `Aufgewacht: ${new Date(item.end).toLocaleString('de-DE', formatOpt)}`;
        
        div.innerHTML = `
            <div>
                <div style="font-weight:bold; margin-bottom:4px; color:var(--primary);">${durationText}</div>
                <div style="color:var(--text-main);">Eingeschlafen: ${sDate.toLocaleString('de-DE', formatOpt)}</div>
                <div style="color:var(--text-main);">${endText}</div>
            </div>
            <div style="display:flex; gap:6px;">
                <button onclick="editSleepEntry(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.1rem;">✏️</button>
                <button onclick="deleteSleepEntry(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.1rem;">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });

    renderSleepChart(sleepData[childIndex], document.getElementById('sleepChartContainer'));
}

function renderSleepChart(list, container) {
    container.innerHTML = '';
    if (!list || list.length === 0) return;
    
    let today = new Date();
    let todayStr = today.toLocaleDateString('de-DE');
    
    let todayEntries = list.filter(item => {
        let d = new Date(item.start);
        return d.toLocaleDateString('de-DE') === todayStr;
    });
    
    if (todayEntries.length === 0) {
        container.innerHTML = '<p style="font-size:0.85rem; color:var(--text-muted);">Heute noch kein Schlaf eingetragen.</p>';
        return;
    }

    todayEntries = todayEntries.slice().reverse();

    let chartData = todayEntries.map(item => {
        let durationMins = item.duration;
        if (item.isSleeping) {
            let start = new Date(item.start);
            durationMins = Math.max(0, Math.round((new Date() - start) / 60000));
        }
        return { start: new Date(item.start), duration: durationMins, isSleeping: item.isSleeping };
    });

    let width = 500, height = 200, pL = 40, pR = 20, pB = 30, pT = 20;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.width = "100%";

    let maxMins = Math.max(...chartData.map(d => d.duration));
    if (maxMins === 0) maxMins = 60; 
    let maxHours = Math.ceil(maxMins / 60);
    maxHours = Math.max(maxHours, 2); 

    for (let h = 0; h <= maxHours; h += Math.max(1, Math.ceil(maxHours/4))) {
        let y = pT + (height - pB - pT) - (h / maxHours) * (height - pB - pT);
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", pL); line.setAttribute("y1", y); line.setAttribute("x2", width - pR); line.setAttribute("y2", y);
        line.setAttribute("stroke", "#e2e8f0"); line.setAttribute("stroke-dasharray", "3,3");
        svg.appendChild(line);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", pL - 5); text.setAttribute("y", y + 4); text.setAttribute("font-size", "10"); text.setAttribute("fill", "#64748b"); text.setAttribute("text-anchor", "end");
        text.textContent = h + "h";
        svg.appendChild(text);
    }

    let barWidth = (width - pL - pR) / chartData.length - 20;
    if (barWidth > 45) barWidth = 45; 

    chartData.forEach((data, i) => {
        let x = pL + 10 + i * ((width - pL - pR) / chartData.length) + (((width - pL - pR) / chartData.length - barWidth)/2);
        let hrs = data.duration / 60;
        let barHeight = (hrs / maxHours) * (height - pB - pT);
        let y = pT + (height - pB - pT) - barHeight;

        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x); rect.setAttribute("y", y); rect.setAttribute("width", barWidth); 
        rect.setAttribute("height", Math.max(barHeight, 4)); rect.setAttribute("fill", "var(--primary)"); rect.setAttribute("rx", "4"); 
        
        if (data.isSleeping) rect.classList.add("sleep-active");
        
        svg.appendChild(rect);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x + barWidth/2); text.setAttribute("y", height - pB + 15); text.setAttribute("font-size", "10"); text.setAttribute("fill", "#64748b"); text.setAttribute("text-anchor", "middle");
        text.textContent = data.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); 
        svg.appendChild(text);
    });

    container.appendChild(svg);
}

function deleteSleepEntry(index) {
    if(confirm("Diesen Schlafeintrag wirklich löschen?")) {
        let childIndex = document.getElementById('sleepChildSelect').value;
        sleepData[childIndex].splice(index, 1);
        localStorage.setItem('request_sleep', JSON.stringify(sleepData));
        renderSleepData();
    }
}

// ==========================================
// SCHWANGERSCHAFT & UNTERSUCHUNGEN
// ==========================================
function initPregnancyScreen() {
    let select = document.getElementById('pregChildSelect');
    select.innerHTML = kids.length === 0 ? '<option>Bitte zuerst ein Kind anlegen</option>' : '';
    
    kids.forEach((k, idx) => {
        let opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = k.name;
        select.appendChild(opt);
    });
    
    if (document.getElementById('pregDateInput')) document.getElementById('pregDateInput').valueAsDate = new Date();
    resetPregnancyForm(); renderPregnancyData();
}

function resetPregnancyForm() {
    if (document.getElementById('pregDateInput')) document.getElementById('pregDateInput').valueAsDate = new Date();
    document.getElementById('pregSizeInput').value = '';
    document.getElementById('pregWeightInput').value = '';
    document.getElementById('pregNoteInput').value = '';
    document.getElementById('pregMediaInput').value = '';
    document.getElementById('pregFormButtons').innerHTML = `<button onclick="savePregnancyEntry()" class="btn" id="savePregBtn">Untersuchung eintragen</button>`;
    editingPregIndex = null;
}

async function savePregnancyEntry() {
    let childIndex = document.getElementById('pregChildSelect').value;
    let files = document.getElementById('pregMediaInput').files;
    let mediaArray = [];

    if (files.length > 0) {
        for (let f of files) {
            let dataUrl = await readFileAsDataURL(f);
            mediaArray.push(dataUrl);
        }
    } else if (editingPregIndex !== null && pregnancyData[childIndex] && pregnancyData[childIndex][editingPregIndex]) {
        mediaArray = pregnancyData[childIndex][editingPregIndex].media || [];
    }

    let entry = {
        date: document.getElementById('pregDateInput').value, size: document.getElementById('pregSizeInput').value, weight: document.getElementById('pregWeightInput').value, note: document.getElementById('pregNoteInput').value, media: mediaArray
    };

    if (!entry.date) { alert("Bitte ein Datum angeben."); return; }
    
    if (!pregnancyData[childIndex]) pregnancyData[childIndex] = [];

    if (editingPregIndex !== null) pregnancyData[childIndex][editingPregIndex] = entry;
    else pregnancyData[childIndex].push(entry);

    pregnancyData[childIndex].sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('request_pregnancy', JSON.stringify(pregnancyData));
    
    resetPregnancyForm(); renderPregnancyData();
}

function renderPregnancyData() {
    let childIndex = document.getElementById('pregChildSelect').value;
    let historyContainer = document.getElementById('pregHistoryList');
    let galleryContainer = document.getElementById('pregGalleryGrid');
    let widgetTitle = document.getElementById('pregWidgetTitle');
    let widgetDetails = document.getElementById('pregWidgetDetails');

    historyContainer.innerHTML = ''; galleryContainer.innerHTML = '';

    let list = pregnancyData[childIndex] || [];
    let kid = kids[childIndex];

    if (kid && kid.birthDate) {
        if (isChildBorn(kid)) {
            let ageStr = calculateAgeString(kid.birthDate);
            widgetTitle.innerText = "Baby ist da! 🥳";
            widgetDetails.innerHTML = `Das Kind ist bereits auf der Welt.<br>Aktuelles Alter: <b>${ageStr}</b>.`;
            document.getElementById('ssw-size-card').style.display = 'none';
        } else {
            let et = new Date(kid.birthDate);
            let today = new Date();
            let diffDays = Math.ceil((et - today) / (1000 * 60 * 60 * 24));
            let passedDays = 266 - diffDays;
            let currentWeek = Math.floor(passedDays / 7) + 1;

            if (currentWeek < 1) currentWeek = 1;
            if (currentWeek > 40) currentWeek = 40;

            widgetTitle.innerText = `Schwangerschaftswoche: SSW ${currentWeek}`;
            widgetDetails.innerHTML = `Noch <b>${diffDays > 0 ? diffDays : 0} Tage</b> bis zum errechneten Entbindungstermin (${kid.birthDate}).`;

            document.getElementById('ssw-size-card').style.display = 'block';
            let compType = document.getElementById('comparisonTypeSelect') ? document.getElementById('comparisonTypeSelect').value : 'fruit';
            let dataMap = (compType === 'animal') ? sswAnimalData : sswFruitData;
            let info = dataMap[currentWeek] || { fruit: "ein Baby", animal: "ein Baby", emoji: "👶" };
            let comparisonName = compType === 'animal' ? info.animal : info.fruit;

            let fruitEmoji = document.getElementById('ssw-fruit-emoji');
            if (fruitEmoji) fruitEmoji.innerText = info.emoji;

            let fruitTitle = document.getElementById('ssw-fruit-title');
            if (fruitTitle) fruitTitle.innerText = `So groß wie ${comparisonName}`;

            let fruitDesc = document.getElementById('ssw-fruit-desc');
            if (fruitDesc) fruitDesc.innerText = `Aktuell in der ${currentWeek}. SSW.`;
        }
    } else {
        widgetTitle.innerText = "Status";
        widgetDetails.innerText = "Kein ET hinterlegt.";
        document.getElementById('ssw-size-card').style.display = 'none';
    }

    if (list.length === 0) {
        historyContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Noch keine Untersuchungen eingetragen.</p>';
        galleryContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; grid-column: span 2;">Keine Ultraschallbilder vorhanden.</p>';
        document.getElementById('pregChartContainer').innerHTML = '';
        return;
    }

    list.forEach((item, index) => {
        let div = document.createElement('div');
        div.style.cssText = "background:#f1f5f9; padding:12px; border-radius:10px; font-size:0.85rem; margin-bottom:8px;";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:4px;">
                <span>📅 ${item.date}</span>
                <div>
                    <button onclick="editPregEntry(${index})" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>
                    <button onclick="deletePregEntry(${index})" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">🗑️</button>
                </div>
            </div>
            <div>Größe: ${item.size ? item.size + ' ' + appUnits.size : '-'} | Gewicht: ${item.weight ? item.weight + ' ' + appUnits.weight : '-'}</div>
            ${item.note ? '<div style="margin-top:4px; color:var(--text-muted);">' + item.note + '</div>' : ''}
        `;
        historyContainer.appendChild(div);

        if (item.media && item.media.length > 0) {
            item.media.forEach(src => {
                let img = document.createElement('img');
                img.src = src;
                img.style.cssText = "width:100%; height:120px; object-fit:cover; border-radius:8px;";
                galleryContainer.appendChild(img);
            });
        }
    });

    if (galleryContainer.children.length === 0) galleryContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; grid-column: span 2;">Keine Ultraschallbilder vorhanden.</p>';

    renderGrowthChart(list, document.getElementById('pregChartContainer'), kid);
}

function editPregEntry(index) {
    let item = pregnancyData[document.getElementById('pregChildSelect').value][index];
    document.getElementById('pregDateInput').value = item.date;
    document.getElementById('pregSizeInput').value = item.size || '';
    document.getElementById('pregWeightInput').value = item.weight || '';
    document.getElementById('pregNoteInput').value = item.note || '';
    editingPregIndex = index;
    
    document.getElementById('pregFormButtons').innerHTML = `<button onclick="savePregnancyEntry()" class="btn">Aktualisieren</button><button onclick="resetPregnancyForm()" class="btn btn-secondary" style="margin-top:6px;">Abbrechen</button>`;
}

function deletePregEntry(index) {
    if (confirm("Untersuchung löschen?")) {
        pregnancyData[document.getElementById('pregChildSelect').value].splice(index, 1);
        localStorage.setItem('request_pregnancy', JSON.stringify(pregnancyData));
        resetPregnancyForm(); renderPregnancyData();
    }
}

// ==========================================
// WUNSCHLISTE
// ==========================================
function initWishlistScreen() {
    let select = document.getElementById('wishChildSelect');
    select.innerHTML = kids.length === 0 ? '<option>Bitte zuerst ein Kind anlegen</option>' : '';
    
    kids.forEach((k, idx) => {
        let opt = document.createElement('option');
        opt.value = idx; opt.innerText = k.name;
        select.appendChild(opt);
    });
    
    resetWishForm(); renderWishlist();
}

function resetWishForm() {
    document.getElementById('wishTitleInput').value = '';
    document.getElementById('wishOccasionInput').value = '';
    document.getElementById('wishLinkInput').value = '';
    let btnContainer = document.getElementById('wishFormButtons');
    if (btnContainer) btnContainer.innerHTML = `<button onclick="saveWishItem()" class="btn">Wunsch hinzufügen</button>`;
    editingWishIndex = null;
}

function saveWishItem() {
    let childIndex = document.getElementById('wishChildSelect').value;
    let title = document.getElementById('wishTitleInput').value.trim();
    let linkVal = document.getElementById('wishLinkInput').value.trim();
    
    if (!title) { alert("Bitte einen Wunsch eingeben."); return; }
    
    if (linkVal && !linkVal.startsWith('http://') && !linkVal.startsWith('https://')) {
        linkVal = 'https://' + linkVal;
    }

    let item = {
        title: title,
        occasion: document.getElementById('wishOccasionInput').value.trim(),
        link: linkVal,
        done: (editingWishIndex !== null && wishlistData[childIndex] && wishlistData[childIndex][editingWishIndex]) ? wishlistData[childIndex][editingWishIndex].done : false
    };

    if (!wishlistData[childIndex]) wishlistData[childIndex] = [];
    
    if (editingWishIndex !== null) wishlistData[childIndex][editingWishIndex] = item;
    else wishlistData[childIndex].push(item);

    localStorage.setItem('request_wishlist', JSON.stringify(wishlistData));
    resetWishForm(); renderWishlist();
}

function editWishItem(index) {
    let childIndex = document.getElementById('wishChildSelect').value;
    let item = wishlistData[childIndex][index];
    
    document.getElementById('wishTitleInput').value = item.title || '';
    document.getElementById('wishOccasionInput').value = item.occasion || '';
    document.getElementById('wishLinkInput').value = item.link || '';
    editingWishIndex = index;
    
    let btnContainer = document.getElementById('wishFormButtons');
    if (btnContainer) btnContainer.innerHTML = `<button onclick="saveWishItem()" class="btn">Wunsch aktualisieren</button><button onclick="resetWishForm()" class="btn btn-secondary" style="margin-top:6px;">Abbrechen</button>`;
}

function toggleWishItem(index) {
    let childIndex = document.getElementById('wishChildSelect').value;
    wishlistData[childIndex][index].done = !wishlistData[childIndex][index].done;
    localStorage.setItem('request_wishlist', JSON.stringify(wishlistData));
    renderWishlist();
}

function deleteWishItem(index) {
    if (confirm("Wunsch löschen?")) {
        let childIndex = document.getElementById('wishChildSelect').value;
        wishlistData[childIndex].splice(index, 1);
        localStorage.setItem('request_wishlist', JSON.stringify(wishlistData));
        resetWishForm(); renderWishlist();
    }
}

function renderWishlist() {
    let childIndex = document.getElementById('wishChildSelect').value;
    let container = document.getElementById('wishlistContainer');
    container.innerHTML = '';

    let list = wishlistData[childIndex] || [];
    if (list.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Noch keine Wünsche eingetragen.</p>';
        return;
    }

    list.forEach((item, index) => {
        let div = document.createElement('div');
        div.style.cssText = `background:#f1f5f9; padding:12px; border-radius:10px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px; ${item.done ? 'opacity:0.6;' : ''}`;
        
        // URL immer sauber formatieren, falls das https:// vergessen wurde
        let safeUrl = item.link;
        if (safeUrl && !safeUrl.startsWith('http://') && !safeUrl.startsWith('https://')) {
            safeUrl = 'https://' + safeUrl;
        }
        
        // Klassischer <a> Tag: Zwingend notwendig, damit Smartphones langes Drücken und Klicken als echten Link erkennen
        let linkHtml = safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); text-decoration:underline; display:inline-block; margin-top:4px; font-weight:bold; font-size:0.85rem; padding:4px 0;">🔗 Produkt ansehen</a>` : '';
        
        let occasionHtml = item.occasion ? `<div style="color:var(--text-muted); font-size:0.75rem; margin-top:2px;">Anlass: ${item.occasion}</div>` : '';

        div.innerHTML = `
            <div style="flex-grow: 1;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleWishItem(${index})" style="width:16px; height:16px; accent-color:var(--primary); cursor:pointer;">
                    <span style="${item.done ? 'text-decoration:line-through;' : ''} font-weight:600; font-size:0.9rem;">${item.title}</span>
                </div>
                <div style="padding-left: 24px;">
                    ${occasionHtml}
                    ${linkHtml}
                </div>
            </div>
            <div style="display:flex; gap:6px;">
                <button onclick="editWishItem(${index})" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>
                <button onclick="deleteWishItem(${index})" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}


// Sichere Funktion zum Öffnen externer Links auf Smartphones
function openProductLink(url) {
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}



// ==========================================
// SHARE MODAL & WHATSAPP
// ==========================================
function openShareModal() {
    document.getElementById('shareAppModal').style.display = 'flex';
}

function closeShareModal() {
    document.getElementById('shareAppModal').style.display = 'none';
}

function copyReferralCode(code) {
    let inviteLink = `https://deine-app-domain.de/invite/${code}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Dein persönlicher Link wurde erfolgreich in die Zwischenablage kopiert!");
        closeShareModal();
    }).catch(err => {
        console.error("Fehler beim Kopieren: ", err);
    });
}

function shareAppViaWhatsApp(type) {
    let code = "BABYSTEPS-10";
    let text = "";
    
    if (type === 'premium') {
        text = encodeURIComponent(`Hallo Schatz! Lade dir die BabySteps-App herunter. Nutze diesen Link und wir sparen 10% bei der Premium-Version! https://deine-app-domain.de/invite/${code}`);
    } else {
        text = encodeURIComponent(`Schau dir unbedingt unsere BabySteps-App an und verfolge die Entwicklung unseres Babys! Die App ist für dich komplett kostenlos: https://deine-app-domain.de/invite/${code}`);
    }
    
    // Native WhatsApp App auf dem Smartphone direkt öffnen
    window.location.href = `whatsapp://send?text=${text}`;
    
    // Fallback: Web-Link
    setTimeout(() => {
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }, 300);
    
    closeShareModal();
}
