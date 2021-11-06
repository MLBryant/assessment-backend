const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

let quotes = [{'id': 0,'quote':'We shine bright so that others may shine brighter.'}, {'id': 1,'quote':'Success is not final, failure is not fatal: it is the courage to continue that counts.'}, {'id': 2,'quote':'Life is like riding a bicycle. To keep your balance, you must keep moving.'}]
quoteId = quotes.length

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', (req, res) => {
  const fortunes = ['Listen not to vain words of empty tongue.', 'Like the river flow into the sea. Something are just meant to be.', 'Po Says: Pandas like eating bamboo, but I prefer mine dipped in chocolate.', 'Society prepares the crime; the criminal commits it.', 'The first man gets the oyster, the second man gets the shell.', 'Tonight you will be blinded by passion.', 'Fortune Not Found: Abort, Retry, Ignore?', 'Feeding a cow with roses does not get extra appreciation.', 'Do not demand for someone’s soul if you already got his heart.', 'Any decision you have to make tomorrow is a good decision.']
  let randomFortune = fortunes[Math.floor(Math.random() * 10)]
  res.status(200).send(randomFortune)
})

app.get(`/api/quote`, (req, res) => res.status(200).send(quotes))
app.post(`/api/quote`, (req, res) => {
  let {quote} = req.body
  let quoteToAdd = {
    id: quoteId,
    quote
  }
  quotes.push(quoteToAdd)
  res.status(200).send(quoteToAdd)
})
app.put(`/api/quote/:id`, (req, res) => {
  let {id} = req.params
  let {quote} = req.body
  quotes[+id].quote = quote
  res.status(200).send(quotes[+id])
})
app.delete(`/api/quote/:id`, (req, res) => {
  let {id} = req.params
  removedQuote = quotes.splice(id, 1)
  res.status(200).send(removedQuote)
})

app.listen(4000, () => console.log("Server running on 4000"));
