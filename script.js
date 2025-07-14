// 칭찬 도장판 JS
const bunnySlots = document.querySelectorAll('.bunny-slot');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const cancelPassword = document.getElementById('cancelPassword');
const message = document.getElementById('message');
const stickerCount = document.getElementById('sticker-count');
const progressFill = document.getElementById('progress-fill');
const giftModal = document.getElementById('giftModal');
const closeGift = document.getElementById('closeGift');

let currentIndex = null;
let stampedCount = 0;
const PASSWORD = '1015';

// 학생 이름 URL에서 읽기
function getStudentName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || '이름없음';
}
const studentName = getStudentName();
document.getElementById('studentName').textContent = studentName + ' 학생';

// 학생별 도장판 상태 저장/불러오기
const STORAGE_KEY = 'bunnyStamps_' + studentName;
let stampedArr = JSON.parse(localStorage.getItem(STORAGE_KEY)) || Array(10).fill(false);

// 초기 도장 표시
bunnySlots.forEach((slot, idx) => {
    if (stampedArr[idx]) {
        slot.classList.add('stamped');
        slot.querySelector('.bunny-stamp').textContent = '참잘했어요!';
        stampedCount++;
    }
});
stickerCount.textContent = stampedCount;
progressFill.style.width = (stampedCount * 10) + '%';

// 칸 클릭 이벤트 (수정)
bunnySlots.forEach((slot, idx) => {
    slot.addEventListener('click', () => {
        if (slot.classList.contains('stamped')) return;
        currentIndex = idx;
        passwordInput.value = '';
        passwordModal.style.display = 'block';
        passwordInput.focus();
    });
});

// 비밀번호 확인
submitPassword.addEventListener('click', handlePasswordSubmit);
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlePasswordSubmit();
});
cancelPassword.addEventListener('click', () => {
    passwordModal.style.display = 'none';
    currentIndex = null;
});

function handlePasswordSubmit() {
    if (passwordInput.value === PASSWORD) {
        stampBunny(currentIndex);
        passwordModal.style.display = 'none';
        message.textContent = '';
    } else {
        message.textContent = '비밀번호가 틀렸어요!';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function stampBunny(idx) {
    const slot = bunnySlots[idx];
    if (!slot || slot.classList.contains('stamped')) return;
    slot.classList.add('stamped');
    const stamp = slot.querySelector('.bunny-stamp');
    stamp.textContent = '참잘했어요!';
    stampedArr[idx] = true;
    stampedCount++;
    stickerCount.textContent = stampedCount;
    progressFill.style.width = (stampedCount * 10) + '%';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stampedArr));
    if (stampedCount === 10) {
        setTimeout(() => {
            giftModal.style.display = 'block';
        }, 500);
    }
}

closeGift.addEventListener('click', () => {
    giftModal.style.display = 'none';
});

// 모달 바깥 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === passwordModal) passwordModal.style.display = 'none';
    if (e.target === giftModal) giftModal.style.display = 'none';
}); 