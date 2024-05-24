var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");
var invalidBox = document.getElementById("invalid-box");

var sitesArr = JSON.parse(localStorage.getItem("sites")) ?? [];

displaySites();

function submitSite() {
  if (isSiteDataValid()) {
    var siteName = siteNameInput.value.trim();
    var siteUrl = siteUrlInput.value.trim();

    if (!siteUrl.match(/^(https?:\/\/)/)) {
      siteUrl = "http://" + siteUrl;
    }

    var site = getSite(siteName, siteUrl);

    addSite(site);

    displaySites();
    onDataChange();
    clearForm();
    hideInvalidBox();
  } else {
    showInvalidBox();
  }
}

function getSite(siteName, siteUrl) {
  var site = {
    name: siteName,
    url: siteUrl,
  };
  return site;
}

function addSite(site) {
  sitesArr.push(site);
}

function displaySites() {
  var siteDisplay = "";

  for (var i = 0; i < sitesArr.length; i++) {
    siteDisplay += `<tr>
          <td class="align-middle text-center">${i + 1}</td>
          <td class="align-middle text-center">${sitesArr[i].name}</td>
          <td class="align-middle text-center">
              <button onclick="visitSite(${i})" class="btn btn-success text-white">
              <i class="fa-solid fa-eye pe-2"></i>
              Visit
              </button>
          </td>
          <td class="align-middle text-center">
              <button onclick="deleteSite(${i})" class="btn btn-danger text-white">
              <i class="fa-solid fa-trash pe-2"></i>
              Delete
              </button>
          </td>
          </tr>`;
  }

  document.getElementById("tableBody").innerHTML = siteDisplay;
}

function onDataChange() {
  localStorage.setItem("sites", JSON.stringify(sitesArr));
  displaySites();
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
}

function deleteSite(index) {
  sitesArr.splice(index, 1);
  onDataChange();
}

function visitSite(index) {
  window.open(sitesArr[index].url, "_blank");
}

function isSiteDataValid() {
  var siteNamePattern = /^[\w\s]{3,}$/;
  var siteUrlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?$/;
  return (
    siteNamePattern.test(siteNameInput.value) &&
    siteUrlPattern.test(siteUrlInput.value)
  );
}

function validateNameInput() {
  var isSiteNameValid = /^[\w\s]{3,}$/.test(siteNameInput.value);
  if (isSiteNameValid) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
  }
}

function validateUrlInput() {
  var isSiteUrlValid = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?$/.test(
    siteUrlInput.value
  );
  if (isSiteUrlValid) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
  }
}

function closeInvalidBox() {
  invalidBox.classList.add("d-none");
}

function showInvalidBox() {
  invalidBox.classList.remove("d-none");
}

function hideInvalidBox() {
  invalidBox.classList.add("d-none");
}
