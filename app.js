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
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            
            // Safe index checking for Question 9 (index 8)
            const criticalFlag = answers[8] > 0; 
            
            let msg = `<h3>Total Score: ${score}</h3>`;
            if (score <= 4) msg += "<p><strong>Result:</strong> Minimal or no depression symptoms.</p>";
            else if (score <= 9) msg += "<p><strong>Result:</strong> Mild depression symptoms.</p>";
            else if (score <= 14) msg += "<p><strong>Result:</strong> Moderate depression symptoms.</p>";
            else if (score <= 19) msg += "<p><strong>Result:</strong> Moderately severe depression symptoms.</p>";
            else msg += "<p><strong>Result:</strong> Severe depression symptoms.</p>";
            
            if (criticalFlag) {
                msg += "<br><div style='background-color:#fff3cd; color:#856404; padding:15px; border-left:5px solid #ffc107; margin-top:15px;'>⚠️ <strong>CRITICAL ALERT:</strong> You indicated experiencing thoughts of self-harm or suicide. Please connect with a professional, a trusted person, or a crisis helpline immediately.</div>";
            }
            return msg;
        }
   },
gad7: {
        title: "Anxiety Screen (GAD-7)",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
        questions: [
            "Feeling nervous, anxious, or on edge?",
            "Not being able to stop or control worrying?",
            "Worrying too much about different things?",
            "Trouble relaxing?",
            "Being so restless that it is hard to sit still?",
            "Becoming easily annoyed or irritable?",
            "Feeling afraid as if something awful might happen?"
        ],
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            let msg = `<h3>Total Score: ${score}</h3>`;
            if (score <= 4) msg += "<p><strong>Result:</strong> Minimal or no anxiety symptoms.</p>";
            else if (score <= 9) msg += "<p><strong>Result:</strong> Mild anxiety symptoms.</p>";
            else if (score <= 14) msg += "<p><strong>Result:</strong> Moderate anxiety symptoms. A clinical consultation is recommended.</p>";
            else msg += "<p><strong>Result:</strong> Severe anxiety symptoms. Professional evaluation is strongly recommended.</p>";
            return msg;
        }
    },
    asrs: {
        title: "Adult ADHD Screen (ASRS v1.1)",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
        questions: [
            "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
            "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
            "How often do you have problems remembering appointments or obligations?",
            "How often, when you have a task that requires a lot of thought, do you avoid or delay getting started?",
            "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
            "How often do you feel overly active and compelled to do things, as if you were driven by a motor?"
        ],
        interpret: (answers) => {
            let positiveTriggers = 0;
            if (answers[0] >= 2) positiveTriggers++;
            if (answers[1] >= 2) positiveTriggers++;
            if (answers[2] >= 2) positiveTriggers++;
            if (answers[3] >= 3) positiveTriggers++;
            if (answers[4] >= 3) positiveTriggers++;
            if (answers[5] >= 3) positiveTriggers++;

            let msg = `<h3>Positive Indicators: ${positiveTriggers} / 6</h3>`;
            if (positiveTriggers >= 4) {
                msg += "<p><strong>Result:</strong> Positive Screen. Your symptoms highly match patterns seen in adult ADHD. A formal clinical interview with a specialist is advised.</p>";
            } else {
                msg += "<p><strong>Result:</strong> Negative Screen. Your symptoms do not currently meet the standard baseline threshold for adult ADHD framework evaluation.</p>";
            }
            return msg;
        }
    },    
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
