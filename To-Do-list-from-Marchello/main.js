import { alert, error } from "@pnotify/core"
import "@pnotify/core/dist/PNotify.css"
import "@pnotify/core/dist/BrightTheme.css"
import "./reset.scss"
import "./style.scss"

class Lists {
  #nameList
  #textList
  #tagList

  constructor({ nameList, textList, tagList }) {
    this.#nameList = nameList
    this.#textList = textList
    this.#tagList = tagList
  }

  get nameList() {
    return this.#nameList
  }

  get textList() {
    return this.#textList
  }

  get tagList() {
    return this.#tagList
  }

  toJSON() {
    return {
      nameList: this.#nameList,
      textList: this.#textList,
      tagList: this.#tagList,
    }
  }
}

const htmlElements = {
  section2: document.querySelector("#section2"),
  nameInput: document.querySelector("#nameInput"),
  textinput: document.querySelector("#textinput"),
  tagsInput: document.querySelector("#tagsInput"),
  buttonCreate: document.querySelector("#buttonCreate"),
  renderListsBlock: document.querySelector("#renderListsBlock"),
  renderListsBlock2: document.querySelector("#renderListsBlock2"),
  renderListsBlock3: document.querySelector("#renderListsBlock3"),
}

let arrayLists = JSON.parse(localStorage.getItem("arrayLists"))?.map((item) => new Lists(item)) || []

function renderLists() {
  htmlElements.renderListsBlock.innerHTML = ""
  htmlElements.renderListsBlock2.innerHTML = ""
  htmlElements.renderListsBlock3.innerHTML = ""

  arrayLists.forEach((list, index) => {
    const listElement = document.createElement("div")
    listElement.className = "targetBlock section2_flexBlock"
    listElement.dataset.index = index
    listElement.innerHTML = `
      <div class="section2_flexBlock_listBlock">
        <div class="section2_flexBlock_listBlock_flexTexts">
          <div class="section2_flexBlock_listBlock_flexTexts_listElements">
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_nameList">Name note:</p>
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_nameText">${list.nameList}</p>
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_textList">Text note:</p>
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_text">${list.textList}</p>
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_tagList">Tag:</p>
            <p class="section2_flexBlock_listBlock_flexTexts_listElements_tagText">${list.tagList}</p>
          </div>
        </div>
        <button class="section2_flexBlock_buttonDelete" data-index="${index}">Delete</button>
        <button class="section2_flexBlock_buttonNext">Next</button>
      </div>
    `
    htmlElements.renderListsBlock.appendChild(listElement)
  })
  addEventListeners()
}

function saveToLocalStorage() {
  localStorage.setItem("arrayLists", JSON.stringify(arrayLists))
}

htmlElements.buttonCreate.addEventListener("click", () => {
  if (
    htmlElements.nameInput.value === "" ||
    htmlElements.textinput.value === "" ||
    htmlElements.tagsInput.value === ""
  ) {
    error({ text: "You have not filled in all the fields" })
    return
  } else {
    alert({ text: "Note added" })

    let createList = new Lists({
      nameList: htmlElements.nameInput.value,
      textList: htmlElements.textinput.value,
      tagList: htmlElements.tagsInput.value,
    })

    arrayLists.push(createList)
    saveToLocalStorage()
    renderLists()

    htmlElements.nameInput.value = ""
    htmlElements.textinput.value = ""
    htmlElements.tagsInput.value = ""
  }
})

function addEventListeners() {
  const btnsDelete = document.querySelectorAll(".section2_flexBlock_buttonDelete")
  const btnsNext = document.querySelectorAll(".section2_flexBlock_buttonNext")

  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index")
      alert({ text: "Note removed" })
      arrayLists.splice(index, 1)
      saveToLocalStorage()
      renderLists()
    })
  })

  btnsNext.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const block = btn.closest(".targetBlock")
      const index = block.getAttribute("data-index")

      if (htmlElements.renderListsBlock.contains(block)) {
        htmlElements.renderListsBlock2.appendChild(block)
      } else if (htmlElements.renderListsBlock2.contains(block)) {
        htmlElements.renderListsBlock3.appendChild(block)
      }

      block.querySelector(".section2_flexBlock_buttonDelete").setAttribute("data-index", index)
    })
  })
}

renderLists()