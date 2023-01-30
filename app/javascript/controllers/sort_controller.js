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

        var button1 = document.createElement("button")
        button1.classList.add("flexit-center")

        var text = document.createElement("p")
        text.innerHTML = "or"
        text.classList.add("flexit-center")

        var button2 = document.createElement("button")
        button2.classList.add("flexit-center")

        decision.appendChild(button1)
        decision.appendChild(text)
        decision.appendChild(button2)
        decisionBox.appendChild(decision)

        button1.innerHTML = choice1.title
        button2.innerHTML = choice2.title
        button1.item = choice1
        button2.item = choice2

        var results = {}

        // Initialize results
        items.forEach((item) => {
            results[item.title] = 0
        })

        function orderResults () {
            var entries = Object.entries(results)

            entries.sort(function(a, b) {
                return b[1] - a[1]
            })

            return entries
        }

        function calculateDecision () {

            // Todo: Kick off confetti

            // update instructions
            document.getElementById("instructions").innerHTML = "Congratulations! These are your results."
            
            var finalResults = orderResults(results)

            // display results
            var finalResultsElement = document.getElementById("final-results")
            finalResults.forEach((res, idx) => {
                var resultDiv = document.createElement("div")
                resultDiv.innerHTML = idx + 1 + " " + res[0]
                resultDiv.classList.add("results-div")
                finalResultsElement.appendChild(resultDiv)
            })

            // hide submit button
            document.getElementById("submit-button").style.display = "none"
        }

        function advanceDecision (e) {
            // record decision
            results[e.currentTarget.item.title] += 1

            // update questions
            if (i < decisionSet.length - 1) {
                i++
                button1.innerHTML = items[decisionSet[i][0]].title
                button2.innerHTML = items[decisionSet[i][1]].title
                button1.item = items[decisionSet[i][0]]
                button2.item = items[decisionSet[i][1]]
            }
            else {
                document.getElementById("instructions").innerHTML = "Click Submit to Finish!"
                decisionBox.style.display = "none"
                var submitButton = document.createElement("button")
                submitButton.setAttribute("id", "submit-button")
                submitButton.innerHTML = "Submit"
                submitButton.addEventListener("click", calculateDecision)
                document.getElementById("final-results").appendChild(submitButton)
            }
        }

        button1.addEventListener("click", advanceDecision)
        button2.addEventListener("click", advanceDecision)
    }

    //
}