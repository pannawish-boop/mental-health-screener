// Database of questions matching the validated scales
const tests = {
    phq9: {
        title: "Depression Screen (PHQ-9)",
        scoringType: "sum",
        questions: [
            "Little interest or pleasure in doing things?",
            "Feeling down, depressed, or hopeless?",
            "Trouble falling or staying asleep, or sleeping too much?",
            "Feeling tired or having little energy?",
            "Poor appetite or overeating?",
            "Feeling bad about yourself, or that you are a failure?",
            "Trouble concentrating on things, such as reading?",
            "Moving or speaking so slowly, or being overly restless?",
            "Thoughts that you would be better off dead or hurting yourself?"
        ],
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
        interpret: (score, criticalFlag) => {
            let msg = "";
            if (score <= 4) msg = "Minimal depression symptoms.";
            else if (score <= 9) msg = "Mild depression symptoms.";
            else if (score <= 14) msg = "Moderate depression symptoms.";
            else if (score <= 19) msg = "Moderately severe depression symptoms.";
            else msg = "Severe depression symptoms.";
            
            if (criticalFlag) {
                msg += "<br><br>🚨 <strong>Critical Note:</strong> You indicated thoughts of self-harm. Please contact a professional or a crisis helpline immediately.";
            }
            return msg;
        }
    }
};

// Function to inject questions into the HTML page
function loadTest(testKey) {
    const test = tests[testKey];
    const container = document.getElementById("questions-container");
    container.innerHTML = ""; // Clear old text

    test.questions.forEach((q, qIdx) => {
        let html = `<div class="question-block"><p>${qIdx + 1}. ${q}</p>`;
        test.options.forEach((opt, oIdx) => {
            html += `
                <label>
                    <input type="radio" name="q${qIdx}" value="${oIdx}" required>
                    ${opt}
                </label><br>
            `;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

// Function to read selected radio values and execute the scoring algorithm
function calculateScore() {
    const currentTest = tests[document.getElementById("test-selector").value];
    let totalScore = 0;
    let criticalFlag = false;

    currentTest.questions.forEach((_, qIdx) => {
        const selected = document.querySelector(`input[name="q${qIdx}"]:checked`);
        if (selected) {
            const val = parseInt(selected.value);
            totalScore += val;
            
            // Safety check for PHQ-9 Question 9 (index 8)
            if (qIdx === 8 && val > 0) {
                criticalFlag = true;
            }
        }
    });

    // Display the results smoothly on the UI
    document.getElementById("score-display").innerText = `Total Score: ${totalScore}`;
    document.getElementById("interpretation-display").innerHTML = currentTest.interpret(totalScore, criticalFlag);
    document.getElementById("results-card").classList.remove("hidden");
}

// Initialize on page load
window.onload = () => loadTest('phq9');
