const addQuote = document.querySelector('#quoteInput')
const addQuoteForm = document.querySelector('#quoteInputForm')
const quoteDropdown = document.getElementsByName('quote')
const editQuote = document.querySelector('#quoteEdit')
const editedQuote = document.querySelector('#editedQuote')
const editQuoteForm = document.querySelector('#quoteEditForm')
const deleteQuote = document.querySelector('#quoteDelete')
const deleteQuoteForm = document.querySelector('#quoteDeleteForm')
const quoteList = document.querySelector('#quoteSection')

const inputQuote = event => {
    event.preventDefault()
    let newQuote = {
        quote: addQuote.value
    }
    axios.post("http://localhost:4000/api/quote/", newQuote)
    .then(res => {
        getQuotes()
    })
    addQuote.value = ''
}

const changeQuote = event => {
    event.preventDefault()
    let newQuote = {
        id: +editQuote.value,
        quote: editedQuote.value
    }
    axios.put(`http://localhost:4000/api/quote/${newQuote.id}`, newQuote)
    .then(res => {
        getQuotes()
    })
    editedQuote.value = ''
}

const removeQuote = event => {
    event.preventDefault()
    let id = +deleteQuote.value
    axios.delete(`http://localhost:4000/api/quote/${id}`)
    .then(res => {
        getQuotes()
    })
}

const getQuotes = () => {
    
    axios.get('http://localhost:4000/api/quote')
    .then(res => {
        for (x = 0; x < quoteDropdown.length; x++) {
            quoteDropdown[x].innerHTML = ''
        }
        quoteList.innerHTML = '';
        for(i = 0; i < res.data.length; i++) {
            let addedQuote = document.createElement('h3')
            addedQuote.textContent = `"${res.data[i].quote}"`
            quoteList.appendChild(addedQuote)
            for(j = 0; j < quoteDropdown.length; j++) {
                let addedQuoteDropdown = document.createElement('option')
                addedQuoteDropdown.value = i
                addedQuoteDropdown.text = res.data[i].quote.slice(0, 20) + '...'
                quoteDropdown[j].appendChild(addedQuoteDropdown, 0)
            }
        }
    }) 
}

addQuoteForm.addEventListener('submit', inputQuote)
editQuoteForm.addEventListener('submit', changeQuote)
deleteQuoteForm.addEventListener('submit', removeQuote)

getQuotes()