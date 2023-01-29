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

        // Parse items and Set items
        var unparsedItems = document.getElementById("ruby_model").dataset.items
        var items = JSON.parse(unparsedItems)
        
        // Create the decision set for comparing decisions
        var decisionSet = []

        if (items.length > 0) {
            for (var i = 0; i < items.length - 1; i++) {
                for (var j = 1; j < items.length; j++) {
                    if (i != j && i < j) {
                        decisionSet.push([i, j])
                    }
                }
            }
        }
        
        var i = 0

        var choice1 = items[decisionSet[i][0]]
        var choice2 = items[decisionSet[i][1]]

        var decisionBox = document.getElementById("decision-box")

        // Create decision elements
        var decision = document.createElement("div")
        decision.classList.add("decision-container")

        var button_1 = document.createElement("button")

        var text = document.createElement("p")
        text.innerHTML = "or"
        
        var button_2 = document.createElement("button")

        decision.appendChild(button_1)
        decision.appendChild(text)
        decision.appendChild(button_2)
        decisionBox.appendChild(decision)

        button_1.innerHTML = choice1.title
        button_2.innerHTML = choice2.title
        button_1.item = items[decisionSet[i][0]]
        button_2.item = items[decisionSet[i][1]]

        var results = {}

        // Initialize results
        items.forEach((item) => {
            results[item.id] = 0
        })

        function advanceDecision (e) {
            // record decision
            results[e.currentTarget.item.id] += 1

            // update questions
            if (i < decisionSet.length - 1) {
                i++
                button_1.innerHTML = items[decisionSet[i][0]].title
                button_2.innerHTML = items[decisionSet[i][1]].title
                button_1.item = items[decisionSet[i][0]]
                button_2.item = items[decisionSet[i][1]]
            }
            else {
                document.getElementById("instructions").innerHTML = "Click Submit to Finish!"
                decisionBox.style.display = "none"
                console.log(results)
            }
        }

        button_1.addEventListener("click", advanceDecision)
        button_2.addEventListener("click", advanceDecision)
    }
}