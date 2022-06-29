    let formBudget = document.querySelector(".budget")
    let budgetValue = document.querySelector(".budget__value")

    let formExpense = document.querySelector(".expense")
    let expenseValue = document.querySelector(".expense__value")

    let budgetNumber = document.querySelector(".budget-number")
    let balanceNumber = document.querySelector(".balanse-number")
    let expenseNumber = document.querySelector(".expense-number")
    let expenseTitle = document.querySelector(".expense__title")



    // <i class="fas fa-trash"></i>

    let elList = document.querySelector(".right-list")

    let budgetArr = []
    let expenseArr = []


    let renderList = function (arr, htmlElement) {
        arr.forEach(e => {
            
            let newItem = document.createElement("li")
            let newtext = document.createElement("p")
            let newValue = document.createElement("span")
            let newButton = document.createElement("button")
            let italic = document.createElement("i")
            italic.setAttribute('class', 'fas fa-trash')

            newItem.style.listStyleType = "none"
            italic.style.color = "red"

            newButton.classList.add("new-button")

            newtext.textContent = e.title
            newValue.textContent = e.number

            newButton.style.border = "none"
            newButton.style.padding = "10px"
            newButton.style.backgroundColor = "#f5f5f5f5"

            htmlElement.appendChild(newItem)
            newItem.appendChild(newtext)
            newItem.appendChild(newValue)
            newItem.appendChild(newButton)
            newButton.appendChild(italic)

            newButton.dataset.deleteId = e.id
            italic.dataset.italicId = e.id
            
        });
   }

    
    elList.addEventListener("click", function (e) {

        let deleteBtnId = e.target.dataset.deleteId *1
        let italicBtnId = e.target.dataset.italicId *1

        let foundIndex = expenseArr.findIndex(e => e.id === deleteBtnId || e.id === italicBtnId )

        if (e.target.matches(".new-button") ||  e.target.matches(".fa-trash")) {
            expenseArr.splice(foundIndex , 1)
        }

        elList.innerHTML = null

        renderList(expenseArr , elList)


    })

    let budgetReduce;

    formBudget.addEventListener("submit", function (e) {
        e.preventDefault()

        budgetArr.push(budgetValue.value * 1)
        budgetValue.value = null
        budgetReduce = budgetArr.reduce(function (acc, e) {

            return (acc + e)

        })
        budgetNumber.textContent = budgetReduce

        balanceNumber.textContent = budgetReduce * 1 - expenseReduce * 1


    })


    let expenseReduce;

    formExpense.addEventListener("submit", function (e) {
        e.preventDefault()

        let obj = {
            title: expenseTitle.value,
            number: expenseValue.value * 1 ,
            id : Math.floor(Math.random()*1000000)
        }


        expenseArr.push(obj)

        let expenseFor = expenseArr.map(function (e) {
            return e.number
        })

        expenseReduce = expenseFor.reduce(function (acc, e) {
            return (acc + e)
        })

        balanceNumber.textContent = budgetReduce * 1 - expenseReduce * 1

        expenseNumber.textContent = expenseReduce

        expenseValue.value = null
        expenseTitle.value = null


        elList.innerHTML = null

        renderList(expenseArr, elList)
    })