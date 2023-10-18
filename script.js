const emojiTable = document.getElementById("emojiBody");
const searchBar = document.getElementById("search");
let emojiLi = [];

const emojiArray = [];
const emojiTags = [];
const emojiIndex = {};


window.addEventListener("DOMContentLoaded", () => {
  emojiLi = [...emojiList1];
  displayEmojis(emojiList1);
});

function displayEmojis(emojiData) {
  emojiTable.innerHTML = "";

  emojiData.forEach((data) => {
    const row = emojiTable.insertRow();
    const emojiCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const categoryCell = row.insertCell(2);

    emojiCell.textContent = data.emoji;
    nameCell.textContent = data.description;
    categoryCell.textContent = data.category;

    emojiArray.push(...data.aliases);
    emojiTags.push(...data.tags);

    const searchableFields = [
      data.emoji,
      data.description,
      ...data.aliases,
      ...data.tags,
    ];
    searchableFields.forEach((field) => {
      field = field.toLowerCase();
      if (!emojiIndex[field]) {
        emojiIndex[field] = [];
      }
      emojiIndex[field].push(data);
    });
  });
}

//--------------------- Function to reset the table 
function resetTable() {
  displayEmojis(emojiLi);
}

//------------------------------------- Search functionality
searchBar.addEventListener("input", () => {
  const searchQuery = searchBar.value.toLowerCase();

  if (searchQuery === "") {
    resetTable();
  } else {
    const Results = emojiLi.filter((data) => {
      const lowerSearchQuery = searchQuery.toLowerCase();
      return (
        data.description.toLowerCase().includes(lowerSearchQuery) ||
        data.category.toLowerCase().includes(lowerSearchQuery) ||
        data.aliases.some((alias) =>
          alias.toLowerCase().includes(lowerSearchQuery)
        ) ||
        data.tags.some((tag) => tag.toLowerCase().includes(lowerSearchQuery))
      );
    });

    displayEmojis(Results);
  }
});

const emojiPopup = document.getElementById("emojis");
const emojiChar = document.getElementById("emojiChar");
const speechSynthesis = window.speechSynthesis;
const overlay = document.getElementById("over");

emojiTable.addEventListener("mouseover", (event) => {
  if (event.target && event.target.tagName === "TD") {
    const emojiData = emojiLi.find(
      (data) => data.emoji === event.target.textContent
    );
    if (emojiData) {
      overlay.style.display = "block";
      emojiChar.textContent = emojiData.emoji;
      const utterance = new SpeechSynthesisUtterance(emojiData.emoji);
      speechSynthesis.speak(utterance);
      emojiPopup.style.display = "block";
    }
  }
});

emojiTable.addEventListener("mouseout", () => {
  overlay.style.display = "none";
  emojiPopup.style.display = "none";
  speechSynthesis.cancel();
});