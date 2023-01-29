import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
    }

    hideInstructions() {
        document.getElementById("instructions").innerHTML = "Which is more important?"
        document.getElementById("continue-button").style.display = "none"
    }

    startSort() {
        this.hideInstructions()
        var unparsedItems = document.getElementById("ruby_model").dataset.items
        var items = JSON.parse(unparsedItems)

        var results = {}
        
        var decisionBox = document.getElementById("decision-box")

        if (items.length > 0) {
            for (var i = 0; i < items.length - 1; i++) {
                for (var j = 1; j < items.length; j++) {
                    if (i != j && i < j) {
                        var decision = document.createElement("div")
                        var button_1 = document.createElement("button")
                        var decision = document.createElement("div")
                        var button_2 = document.createElement("button")
                        var text = document.createElement("p")
                        text.innerHTML = "or"
                       
                        button_1.innerHTML = items[i].title
                        button_2.innerHTML = items[j].title

                        decision.appendChild(button_1)
                        decision.appendChild(text)
                        decision.appendChild(button_2)
                        decisionBox.appendChild(decision)

                        //decision.style.display = "none"
                    }
                }
            }
        }

        
    }
}