// script.js

const texts = {
  fa: {
    title: "ویرایشگر متن علمی",
    placeholder: "متن خود را اینجا بنویسید...",
    save: "ذخیره به صورت TXT",
    submit: "ثبت متن",
    submitted: "متن‌های ثبت‌شده",
    aiTitle: "دستیار هوش مصنوعی",
    aiPlaceholder: "متن یا سوال خود را اینجا وارد کنید...",
    aiRun: "اجرا",
    aiResultTitle: "نتیجه:"
  },
  en: {
    title: "Scientific Text Editor",
    placeholder: "Write your scientific text here...",
    save: "Save as TXT file",
    submit: "Submit Text",
    submitted: "Submitted Texts",
    aiTitle: "AI Assistant",
    aiPlaceholder: "Enter your text or question here...",
    aiRun: "Run",
    aiResultTitle: "Result:"
  }
};

// DOM elements
const langSelect = document.getElementById('langSelect');
const title = document.getElementById('title');
const textInput = document.getElementById('textInput');
const saveBtn = document.getElementById('saveBtn');
const submitBtn = document.getElementById('submitBtn');
const submittedTitle = document.getElementById('submittedTitle');
const submittedTexts = document.getElementById('submittedTexts');

const aiTitle = document.getElementById('aiTitle');
const aiInput = document.getElementById('aiInput');
const aiAction = document.getElementById('aiAction');
const aiRunBtn = document.getElementById('aiRunBtn');
const aiResultTitle = document.getElementById('aiResultTitle');
const aiResult = document.getElementById('aiResult');

// تغییر زبان
langSelect.addEventListener('change', () => {
  const lang = langSelect.value;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

  title.textContent = texts[lang].title;
  textInput.placeholder = texts[lang].placeholder;
  saveBtn.textContent = texts[lang].save;
  submitBtn.textContent = texts[lang].submit;
  submittedTitle.textContent = texts[lang].submitted;

  aiTitle.textContent = texts[lang].aiTitle;
  aiInput.placeholder = texts[lang].aiPlaceholder;
  aiRunBtn.textContent = texts[lang].aiRun;
  aiResultTitle.textContent = texts[lang].aiResultTitle;
});

// ذخیره به فایل txt
function downloadTxt() {
  const text = textInput.value.trim();
  if (!text) return alert("متنی برای ذخیره وارد نشده است.");
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'text.txt';
  link.click();
}

// ثبت متن
function submitText() {
  const text = textInput.value.trim();
  if (!text) {
    alert("لطفاً متنی وارد کنید.");
    return;
  }

  const card = document.createElement('div');
  card.className = 'tilt-card';
  card.setAttribute('data-tilt', '');
  card.textContent = text;

  submittedTexts.prepend(card);

  VanillaTilt.init(card, {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2
  });

  textInput.value = '';
}

// دستیار هوش مصنوعی ساده
function aiAssistant(inputText, action) {
  inputText = inputText.trim();
  if (!inputText) return "لطفاً متنی وارد کنید.";

  switch (action) {
    case 'correct':
      return "متن اصلاح‌شده:\n" + inputText.replace(/\s+/g, ' ').trim();
    case 'continue':
      return inputText + " ... ادامه متن با هوش مصنوعی.";
    case 'summarize':
      const sentences = inputText.match(/[^\.!\?]+[\.!\?]+/g) || [inputText];
      return "خلاصه:\n" + sentences.slice(0, 2).join(' ');
    case 'answer':
      return "پاسخ به سوال شما:\n(هوش مصنوعی فعلاً به صورت شبیه‌سازی شده است.)";
    default:
      return "عملیات نامشخص.";
  }
}

// اجرای دستیار
aiRunBtn.addEventListener('click', () => {
  const text = aiInput.value;
  const action = aiAction.value;
  const result = aiAssistant(text, action);
  aiResult.textContent = result;
});