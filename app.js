// Database of questionnaires, scoring algorithms, and interpretations
const tests = {
    phq9: {
        title: "Depression Screen (PHQ-9)",
        scoringType: "sum",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
        questions: [
            "Little interest or pleasure in doing things?",
            "Feeling down, depressed, or hopeless?",
            "Trouble falling or staying asleep, or sleeping too much?",
            "Feeling tired or having little energy?",
            "Poor appetite or overeating?",
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
            "Trouble concentrating on things, such as reading the newspaper or watching television?",
            "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
            "Thoughts that you would be better off dead or of hurting yourself in some way?"
        ],
        interpret: (answers) => {
            const score = answers.reduce((a, b) => a + b, 0);
            const criticalFlag = answers[8] > 0; // Question 9 index is 8
            
            let msg = `<h3>Total Score: ${score}</h3>`;
            if (score <= 4) msg += "<p><strong>Result:</strong> Minimal or no depression symptoms.</p>";
            else if (score <= 9) msg += "<p><strong>Result:</strong> Mild depression symptoms.</p>";
            else if (score <= 14) msg += "<p><strong>Result:</strong> Moderate depression symptoms.</p>";
            else if (score <= 19) msg += "<p><strong>Result:</strong> Moderately severe depression symptoms.</p>";
            else msg += "<p><strong>Result:</strong> Severe depression symptoms.</p>";
            
            if (criticalFlag) {
                msg += "<br><div class='critical-alert'>⚠️ <strong>CRITICAL ALERT:</strong> You indicated experiencing thoughts of self-harm or suicide. Please connect with a professional, a trusted person, or a crisis helpline immediately.</div>";
            }
            return msg;
        }
    },
    gad7: {
        title: "Anxiety Screen (GAD-7)",
        scoringType: "sum",
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
            const score = answers.reduce((a, b) => a + b, 0);
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
        scoringType: "binary",
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
            // Questions 1, 2, 3 (indices 0, 1, 2) trigger on Sometimes(2), Often(3), Very Often(4)
            for (let i = 0; i <= 2; i++) {
                if (answers[i] >= 2) positiveTriggers++;
            }
            // Questions 4, 5, 6 (indices 3, 4, 5) trigger on Often(3), Very Often(4)
            for (let i = 3; i <= 5; i++) {
                if (answers[i] >= 3) positiveTriggers++;
            }

            let msg = `<h3>Positive Indicators: ${positiveTriggers} / 6</h3>`;
            if (positiveTriggers >= 4) {
                msg += "<p><strong>Result:</strong> Positive Screen. Your symptoms highly match patterns seen in adult ADHD. A formal clinical interview with a specialist is advised.</p>";
            } else {
                msg += "<p><strong>Result:</strong> Negative Screen. Your symptoms do not currently meet the standard baseline threshold for adult ADHD framework evaluation.</p>";
            }
            return msg;
        }
    },
    vanderbilt: {
        title: "Child ADHD Screen (Parent Vanderbilt Basis)",
        scoringType: "binary",
        options: ["Never", "Occasionally", "Often", "Very Often"],
        questions: [
            "Fails to give close attention to details or makes careless mistakes in schoolwork.",
            "Has difficulty sustaining attention in tasks or play activities.",
            "Does not seem to listen when spoken to directly.",
            "Does not follow through on instructions and fails to finish schoolwork or chores.",
            "Has difficulty organizing tasks and activities.",
            "Fidgets with hands or feet or squirms in seat.",
            "Leaves seat in classroom or in other situations in which remaining seated is expected.",
            "Is 'on the go' or acts as if 'driven by a motor.'",
            "Talks excessively.",
            "Blurts out answers before questions have been completed."
        ],
        interpret: (answers) => {
            let inattentiveCount = 0;
            let hyperactiveCount = 0;

            // Inattentive: Q1-Q5 (indices 0-4) trigger on Often(2) or Very Often(3)
            for (let i = 0; i <= 4; i++) {
                if (answers[i] >= 2) inattentiveCount++;
            }
            // Hyperactive: Q6-Q10 (indices 5-9) trigger on Often(2) or Very Often(3)
            for (let i = 5; i <= 9; i++) {
                if (answers[i] >= 2) hyperactiveCount++;
            }

            let msg = `<h3>Subtype Analysis Matrix:</h3>`;
            msg += `<p>Inattentive Markers flagged: ${inattentiveCount} / 5</p>`;
            msg += `<p>Hyperactive-Impulsive Markers flagged: ${hyperactiveCount} / 5</p>`;

            if (inattentiveCount >= 3 || hyperactiveCount >= 3) {
                msg += "<p><strong>Result:</strong> Screening Indicator Triggered. Behavioral responses suggest patterns aligned with pediatric ADHD. Consider reviewing these metrics with a pediatrician or child psychologist.</p>";
            } else {
                msg += "<p><strong>Result:</strong> Screening Indicator Within Normal Baseline. Symptoms do not meet secondary diagnostic threshold criteria.</p>";
            }
            return msg;
        }
    },
    ad8: {
        title: "Cognitive Impairment Screen (AD8 Informant)",
        scoringType: "sum",
        options: ["No, No Change", "Yes, A Change"],
        questions: [
            "Problems with judgment (e.g., problems making decisions, bad financial decisions, getting scammed)?",
            "Less interest in hobbies/activities?",
            "Repeats the same things over and over (questions, stories, or statements)?",
            "Trouble learning how to use a tool, appliance, or gadget (e.g., computer, microwave, remote control)?",
            "Forgets correct month or year?",
            "Trouble handling complicated financial affairs (e.g., balancing checkbook, paying bills)?",
            "Trouble remembering appointments?",
            "Daily problems with thinking and/or memory?"
        ],
        interpret: (answers) => {
            const score = answers.reduce((a, b) => a + b, 0);
            let msg = `<h3>Total 'Yes' Changes: ${score} / 8</h3>`;
            if (score >= 2) {
                msg += "<p><strong>Result:</strong> Cognitive Impairment Detected. Scores indicate noticeable shifts in memory or functional capacity. Further medical evaluation (e.g., MoCA/MMSE testing) is recommended to assess for MCI or early dementia.</p>";
            } else {
                msg += "<p><strong>Result:</strong> Cognitive Functioning Appears Normal. Consistent with age-baseline limits.</p>";
            }
            return msg;
        }
    },
    ldAdult: {
        title: "Learning Disabilities Risk Checklist",
        scoringType: "sum",
        options: ["No / Rarely", "Yes / Often"],
        questions: [
            "Do you struggle to read unfamiliar words aloud, or read significantly slower than your peers?",
            "Do you frequently misspell words or omit letters/syllables when writing?",
            "Do you find it difficult to summarize a story or extract the main core structural points from text?",
            "Do you struggle to perform basic mental math calculations or process spatial numerical intervals?",
            "Do you frequently reverse numbers, letters, or spatial symbols (e.g., mixing up 6/9 or b/d)?",
            "Do you have trouble cleanly copying notes from a board or logically organizing thoughts on paper?",
            "Do you struggle to cleanly track or execute consecutive multi-step spoken instructions?",
            "Do you experience chronic structural difficulty managing time, estimating timelines, or meeting deadlines?"
        ],
interpret: (answers) => {
const score = answers.reduce((a, b) => a + b, 0);
let msg = <h3>Identified Processing Vulnerabilities: ${score} / 8</h3>;
if (score <= 2) msg += "Result: Low Risk. Processing indicators are within typical baseline parameters.";
else if (score <= 4) msg += "Result: Moderate Risk. Specific vulnerabilities present. May indicate targeted, isolated neurodivergent traits or structural learning discrepancies.";
else msg += "Result: High Risk. Strong likelihood of an underlying processing variations (e.g., Dyslexia, Dyscalculia, Dysgraphia). Educational or neuropsychological testing is highly recommended.";
return msg;
}
},
tics: {
title: "Motor & Vocal Tic Screener",
scoringType: "logic",
options: ["No", "Yes"],
questions: [
"Have you experienced sudden, rapid, recurrent, non-rhythmic motor movements (e.g., eye blinking, head jerking, shoulder shrugging)?",
"Have you experienced sudden, rapid, recurrent, non-rhythmic vocalizations (e.g., throat clearing, sniffing, grunting, repeating words)?",
"If you answered yes to either question above, have these tics occurred consistently for more than 1 structural year?",
"Did these involuntary movements or vocal sounds begin before your 18th birthday?"
],
interpret: (answers) => {
const hasMotor = answers[0] === 1;
const hasVocal = answers[1] === 1;
const chronicDuration = answers[2] === 1;
const onsetBefore18 = answers[3] === 1;
let msg = "Tic Profile Interpretation:";
if (hasMotor && hasVocal && chronicDuration && onsetBefore18) {
msg += "Result: Matches clinical criteria pattern for Tourette's Disorder framework. Evaluation by a neurologist or psychiatrist is advised.";
} else if ((hasMotor || hasVocal) && chronicDuration && onsetBefore18) {
msg += "Result: Matches clinical criteria pattern for Persistent (Chronic) Motor or Vocal Tic Disorder. Clinical validation recommended.";
} else if ((hasMotor || hasVocal) && !chronicDuration && onsetBefore18) {
msg += "Result: Matches structural presentation pattern for Provisional Tic Disorder (symptoms active for less than one year continuous).";
} else {
msg += "Result: Screening results do not establish standard core diagnostic tic condition profiles. Ensure symptoms are investigated to rule out any underlying secondary physical origins.";
}
return msg;
}
}
};
// Global function to render selected test structures onto the interface layout
function switchTest() {
const selectedKey = document.getElementById("test-selector").value;
loadTest(selectedKey);
// Automatically reset visual metrics display clean state
document.getElementById("results-card").classList.add("hidden");
}
function loadTest(testKey) {
const test = tests[testKey];
const container = document.getElementById("questions-container");
container.innerHTML = ""; // Wipe content area cleanly
test.questions.forEach((qText, qIdx) => {
let html = <div class="question-block"><p class="question-text"><strong>Q${qIdx + 1}.</strong> ${qText}</p><div class="options-group">;
test.options.forEach((optText, oIdx) => {
html += `
`;
});
html += </div></div>;
container.innerHTML += html;
});
}
// Global score calculation function parses parameters directly on customer hardware
function calculateScore() {
const selector = document.getElementById("test-selector");
const currentKey = selector.value;
const currentTest = tests[currentKey];
const answers = [];
let allAnswered = true;
for (let i = 0; i < currentTest.questions.length; i++) {
const selected = document.querySelector(input[name="q${i}"]:checked);
if (!selected) {
allAnswered = false;
break;
}
answers.push(parseInt(selected.value));
}
if (!allAnswered) {
alert("Please answer all questions before generating your screening report.");
return;
}
// Call dynamic evaluation methods assigned inside object schemas
const interpretationHtml = currentTest.interpret(answers);
// Smoothly populate results element containers
document.getElementById("interpretation-display").innerHTML = interpretationHtml;
document.getElementById("results-card").classList.remove("hidden");
// Smooth auto-scroll down directly into diagnostic feedback data window
document.getElementById("results-card").scrollIntoView({ behavior: 'smooth' });
}
// Intercept window selection array mutations to switch view options seamlessly on layout boot
window.onload = () => {
// Intercept template elements mapping target
const selector = document.getElementById("test-selector");
if(selector) {
loadTest(selector.value);
}
};
