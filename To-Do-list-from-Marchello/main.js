import { alert, error } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css'; 
import './reset.scss'
import './style.scss'

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

const arrayLists = []

class Lists {
    #nameList
    #textList
    #tagList

    constructor({nameList, textList, tagList}) {
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
}

htmlElements.buttonCreate.addEventListener("click", () => {
    if (htmlElements.nameInput.value === "" 
        && htmlElements.textinput.value === "" 
        && htmlElements.tagsInput.value === "") {
        error({
            text: "You have not filled in all the fields"
        })
        return;
    } 
    if (htmlElements.nameInput.value === "" 
        || htmlElements.textinput.value === "" 
        || htmlElements.tagsInput.value === "") {
        error({
            text: "You forgot to fill in one more field"
        })
        return;
    } else {
        alert({
            text: "Note added"
        })

        let createList = new Lists({
            nameList: htmlElements.nameInput.value,
            textList: htmlElements.textinput.value,
            tagList: htmlElements.tagsInput.value
        })
    
        arrayLists.push(createList)

        if (arrayLists.length >= 2) {
            arrayLists.splice(0, 1)
        }

        arrayLists.forEach((list) => {
            htmlElements.renderListsBlock.innerHTML += ``
            htmlElements.renderListsBlock.innerHTML += `
                <div id="listBlock" class="targetBlock section2_flexBlock">
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
                        <button id="btnDelete" class="section2_flexBlock_buttonDelete">Delete</button>
                        <button id="btnNext" class="section2_flexBlock_buttonNext">Next</button>
                    </div>
                </div>
            `
            const btnsDelete = document.querySelectorAll("#btnDelete")
            const btnsNext = document.querySelectorAll("#btnNext")

            btnsDelete.forEach((btn) => {
                btn.addEventListener("click", () => {
                    alert({
                        text: "Note removed"
                    })

                    btn.closest('.targetBlock').remove()
                })
            })

            btnsNext.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const block = btn.closest('.targetBlock')

                    if (htmlElements.renderListsBlock2.contains(block)) {
                        htmlElements.renderListsBlock3.appendChild(block)
                    } else {
                        htmlElements.renderListsBlock2.appendChild(block)
                    }
                })
            })
        })
    }
})