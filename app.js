// ฐานข้อมูลแบบสอบถาม อัลกอริทึมการให้คะแนน และการแปลผล
const tests = {
    phq9: {
        title: "แบบประเมินโรคซึมเศร้า (PHQ-9)",
        options: ["ไม่มีเลย", "มีบางวัน", "มีบ่อย", "มีทุกวัน"],
        questions: [
            "เบื่อ ทำอะไรก็ไม่เพลิดเพลิน",
            "ไม่สบายใจ เศร้า หรือท้อแท้",
            "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากเกินไป",
            "เหนื่อยง่าย หรือไม่ค่อยมีแรง",
            "เบื่ออาหาร หรือกินมากเกินไป",
            "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตนเองหรือครอบครัวผิดหวัง",
            "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
            "พูดหรือทำอะไรช้าจนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายจนไม่อาจอยู่นิ่งได้เหมือนเคย",
            "คิดทำร้ายตนเอง หรือคิดว่าถ้าตายไปคงจะดี"
        ],
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            
            const lastAnswerIndex = answers.length - 1;
            const selfHarmValue = answers[lastAnswerIndex];
            const criticalFlag = selfHarmValue > 0;
            
            let msg = `<h3>คะแนนรวม: ${score}</h3>`;
            if (score <= 4) msg += "<p><strong>ผลลัพธ์:</strong> ไม่มีอาการซึมเศร้าหรือมีอาการในระดับน้อยมาก</p>";
            else if (score <= 9) msg += "<p><strong>ผลลัพธ์:</strong> มีอาการซึมเศร้าในระดับน้อย</p>";
            else if (score <= 14) msg += "<p><strong>ผลลัพธ์:</strong> มีอาการซึมเศร้าในระดับปานกลาง</p>";
            else if (score <= 19) msg += "<p><strong>ผลลัพธ์:</strong> มีอาการซึมเศร้าในระดับค่อนข้างรุนแรง</p>";
            else msg += "<p><strong>ผลลัพธ์:</strong> มีอาการซึมเศร้าในระดับรุนแรง</p>";
            
            if (criticalFlag) {
                msg += "<br><div style='background-color:#fff3cd; color:#856404; padding:15px; border-left:5px solid #ffc107; margin-top:15px;'>⚠️ <strong>คำเตือนเร่งด่วน:</strong> คุณระบุว่ามีความคิดที่จะทำร้ายตนเองหรือฆ่าตัวตาย โปรดติดต่อขอความช่วยเหลือจากผู้เชี่ยวชาญ คนที่คุณไว้วางใจ หรือสายด่วนสุขภาพจิต (1323) ทันที</div>";
            }
            return msg;
        }
    },
    gad7: {
        title: "แบบประเมินวิตกกังวล (GAD-7)",
        options: ["ไม่มีเลย", "มีบางวัน", "มีเกินครึ่งวัน", "มีเกือบทุกวัน"],
        questions: [
            "รู้สึกกระวนกระวาย วิตกกังวล หรือว้าวุ่นใจ",
            "ไม่สามารถหยุดหรือควบคุมความกังวลได้",
            "กังวลมากเกินไปในหลายๆ เรื่อง",
            "ทำตัวให้ผ่อนคลายได้ยาก",
            "รู้สึกกระสับกระส่ายจนไม่สามารถนั่งนิ่งๆ ได้",
            "กลายเป็นคนหงุดหงิดง่าย",
            "รู้สึกกลัวเหมือนจะมีอะไรที่น่ากลัวเกิดขึ้น"
        ],
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            let msg = `<h3>คะแนนรวม: ${score}</h3>`;
            if (score <= 4) msg += "<p><strong>ผลลัพธ์:</strong> ไม่มีอาการวิตกกังวลหรือมีอาการน้อยมาก</p>";
            else if (score <= 9) msg += "<p><strong>ผลลัพธ์:</strong> มีอาการวิตกกังวลในระดับน้อย</p>";
            else if (score <= 14) msg += "<p><strong>ผลลัพธ์:</strong> มีอาการวิตกกังวลในระดับปานกลาง ควรปรึกษาผู้เชี่ยวชาญ</p>";
            else msg += "<p><strong>ผลลัพธ์:</strong> มีอาการวิตกกังวลในระดับรุนแรง ควรพบแพทย์เพื่อประเมินอย่างละเอียด</p>";
            return msg;
        }
    },
    asrs: {
        title: "แบบคัดกรองสมาธิสั้นในผู้ใหญ่ (ASRS v1.1)",
        options: ["ไม่เคย", "นานๆ ครั้ง", "บางครั้ง", "บ่อยครั้ง", "บ่อยมาก"],
        questions: [
            "คุณทำงานชิ้นสุดท้ายที่ท้าทายเสร็จแล้ว แต่กลับมีปัญหาในการเก็บรายละเอียดสุดท้ายของงานบ่อยแค่ไหน?",
            "คุณมีปัญหาในการจัดระเบียบสิ่งต่างๆ เมื่อต้องทำงานที่ต้องมีการวางแผนบ่อยแค่ไหน?",
            "คุณมีปัญหาในการจดจำการนัดหมายหรือภาระผูกพันบ่อยแค่ไหน?",
            "เมื่อมีงานที่ต้องใช้ความคิดมาก คุณมักจะหลีกเลี่ยงหรือผัดวันประกันพรุ่งบ่อยแค่ไหน?",
            "คุณขยับมือหรือเท้าไปมา หรือนั่งไม่ติดที่เมื่อต้องนั่งนานๆ บ่อยแค่ไหน?",
            "คุณรู้สึกกระตือรือร้นมากเกินไปและถูกผลักดันให้ทำสิ่งต่างๆ ราวกับว่าถูกขับเคลื่อนด้วยมอเตอร์บ่อยแค่ไหน?"
        ],
        interpret: (answers) => {
            let positiveTriggers = 0;
            for (let i = 0; i < answers.length; i++) {
                if (i <= 2 && answers[i] >= 2) {
                    positiveTriggers++;
                } else if (i >= 3 && answers[i] >= 3) {
                    positiveTriggers++;
                }
            }
            let msg = `<h3>ตัวบ่งชี้ที่เป็นบวก: ${positiveTriggers} / 6</h3>`;
            if (positiveTriggers >= 4) {
                msg += "<p><strong>ผลลัพธ์:</strong> ผลการคัดกรองเป็นบวก อาการของคุณสอดคล้องกับรูปแบบที่พบในโรคสมาธิสั้นในผู้ใหญ่ แนะนำให้ปรึกษาผู้เชี่ยวชาญเพื่อรับการประเมินอย่างเป็นทางการ</p>";
            } else {
                msg += "<p><strong>ผลลัพธ์:</strong> ผลการคัดกรองเป็นลบ อาการของคุณยังไม่ถึงเกณฑ์มาตรฐานเบื้องต้นสำหรับการประเมินโรคสมาธิสั้นในผู้ใหญ่</p>";
            }
            return msg;
        }
    },
    vanderbilt: {
        title: "แบบประเมินสมาธิสั้นในเด็ก (Vanderbilt - ฉบับผู้ปกครอง)",
        options: ["ไม่เคย", "บางครั้ง", "บ่อย", "บ่อยมาก"],
        questions: [
            "ไม่ค่อยสนใจในรายละเอียดหรือสะเพร่าในการทำงานโรงเรียน",
            "มีปัญหาในการตั้งสมาธิกับงานหรือการเล่น",
            "ดูเหมือนไม่ฟังเวลาพูดด้วยโดยตรง",
            "ทำตามคำสั่งไม่จบ หรือทำงานโรงเรียน/งานบ้านไม่เสร็จ",
            "มีปัญหาในการจัดระเบียบงานและกิจกรรม",
            "ยุกยิก ขยับมือเท้า หรือนั่งไม่นิ่ง",
            "ลุกจากที่นั่งในห้องเรียนหรือสถานการณ์ที่ควรนั่งนิ่งๆ",
            "วิ่งวุ่นหรือปีนป่ายมากเกินไปในสถานการณ์ที่ไม่เหมาะสม",
            "พูดมากเกินไป",
            "โพล่งคำตอบออกมาก่อนที่คำถามจะจบ"
        ],
        interpret: (answers) => {
            let inattentiveCount = 0;
            let hyperactiveCount = 0;
            for (let i = 0; i < answers.length; i++) {
                if (i <= 4 && answers[i] >= 2) {
                    inattentiveCount++;
                } else if (i >= 5 && answers[i] >= 2) {
                    hyperactiveCount++;
                }
            }
            let msg = `<h3>วิเคราะห์ประเภทย่อย:</h3>`;
            msg += `<p>ตัวบ่งชี้ด้านขาดสมาธิ: ${inattentiveCount} / 5</p>`;
            msg += `<p>ตัวบ่งชี้ด้านซน/วู่วาม: ${hyperactiveCount} / 5</p>`;
            if (inattentiveCount >= 3 || hyperactiveCount >= 3) {
                msg += "<p><strong>ผลลัพธ์:</strong> มีตัวบ่งชี้ที่ควรเฝ้าระวัง พฤติกรรมสอดคล้องกับรูปแบบของโรคสมาธิสั้นในเด็ก ควรนำข้อมูลนี้ไปปรึกษากุมารแพทย์หรือนักจิตวิทยาเด็ก</p>";
            } else {
                msg += "<p><strong>ผลลัพธ์:</strong> อยู่ในเกณฑ์ปกติ อาการยังไม่ถึงเกณฑ์การวินิจฉัยขั้นต้น</p>";
            }
            return msg;
        }
    },
    ad8: {
        title: "แบบคัดกรองภาวะสมองเสื่อม (AD8)",
        options: ["ไม่มีการเปลี่ยนแปลง", "มีการเปลี่ยนแปลง"],
        questions: [
            "มีปัญหาเรื่องการตัดสินใจ (เช่น ตัดสินใจเรื่องต่างๆ ผิดพลาด, ตัดสินใจเรื่องการเงินไม่ดี, ถูกหลอกง่าย)?",
            "ความสนใจในงานอดิเรกหรือกิจกรรมต่างๆ ลดลง?",
            "ถามคำถามเดิมซ้ำๆ เล่าเรื่องเดิมซ้ำๆ หรือพูดเรื่องเดิมซ้ำๆ?",
            "มีปัญหาในการเรียนรู้วิธีการใช้เครื่องมือหรืออุปกรณ์ใหม่ๆ (เช่น คอมพิวเตอร์, ไมโครเวฟ, รีโมทคอนโทรล)?",
            "จำเดือนหรือปีที่ถูกต้องไม่ได้?",
            "มีปัญหาในการจัดการเรื่องการเงินที่ซับซ้อน (เช่น การจ่ายบิล, การทำบัญชี)?",
            "มีปัญหาในการจดจำการนัดหมาย?",
            "มีปัญหาเรื่องความคิดและ/หรือความจำในชีวิตประจำวันอย่างต่อเนื่อง?"
        ],
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            let msg = `<h3>คะแนนรวม 'มีการเปลี่ยนแปลง': ${score} / 8</h3>`;
            if (score >= 2) {
                msg += "<p><strong>ผลลัพธ์:</strong> ตรวจพบความเสี่ยงภาวะบกพร่องทางสติปัญญา คะแนนบ่งชี้ว่ามีการเปลี่ยนแปลงที่เห็นได้ชัดในความจำหรือความสามารถในการทำกิจวัตร แนะนำให้พบแพทย์เพื่อประเมินเพิ่มเติม</p>";
            } else {
                msg += "<p><strong>ผลลัพธ์:</strong> การทำงานของสมองยังอยู่ในเกณฑ์ปกติ</p>";
            }
            return msg;
        }
    },
    ldAdult: {
        title: "แบบสำรวจความเสี่ยงปัญหาการเรียนรู้ (Learning Disabilities)",
        options: ["ไม่ใช่ / นานๆ ครั้ง", "ใช่ / บ่อยครั้ง"],
        questions: [
            "คุณมีปัญหาในการอ่านคำที่ไม่คุ้นเคยออกเสียง หรืออ่านช้ากว่าเพื่อนรุ่นเดียวกันอย่างเห็นได้ชัดหรือไม่?",
            "คุณสะกดคำผิดบ่อยครั้ง หรือลืมตัวอักษร/พยางค์เวลาเขียนหรือไม่?",
            "คุณพบว่าเป็นเรื่องยากในการสรุปเรื่องราวหรือดึงใจความสำคัญจากข้อความหรือไม่?",
            "คุณมีปัญหาในการคำนวณเลขในใจหรือการประมวลผลระยะห่างของตัวเลขหรือไม่?",
            "คุณสลับตัวเลข ตัวอักษร หรือสัญลักษณ์บ่อยๆ หรือไม่ (เช่น สับสนระหว่าง 6/9 หรือ b/d)?",
            "คุณมีปัญหาในการลอกข้อความจากกระดานหรือการจัดระเบียบความคิดลงบนกระดาษหรือไม่?",
            "คุณมีปัญหาในการติดตามหรือทำตามคำสั่งที่พูดต่อเนื่องหลายขั้นตอนหรือไม่?",
            "คุณมีปัญหาเรื้อรังในการบริหารจัดการเวลา การประมาณเวลา หรือการทำงานให้ทันกำหนดหรือไม่?"
        ],
        interpret: (answers) => {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                score += answers[i];
            }
            let msg = `<h3>ตัวบ่งชี้ความเสี่ยง: ${score} / 8</h3>`;
            if (score <= 2) msg += "<p><strong>ผลลัพธ์:</strong> ความเสี่ยงต่ำ ตัวบ่งชี้การประมวลผลอยู่ในเกณฑ์ปกติ</p>";
            else if (score <= 4) msg += "<p><strong>ผลลัพธ์:</strong> ความเสี่ยงปานกลาง พบความเปราะบางในบางด้าน อาจบ่งชี้ถึงลักษณะเฉพาะบางประการของการเรียนรู้</p>";
            else msg += "<p><strong>ผลลัพธ์:</strong> ความเสี่ยงสูง มีความเป็นไปได้สูงที่จะมีปัญหาด้านการประมวลผล (เช่น โรคการเรียนรู้บกพร่อง หรือ LD) แนะนำให้เข้ารับการทดสอบทางจิตวิทยาการศึกษา</p>";
            return msg;
        }
    },
    tics: {
        title: "แบบคัดกรองอาการกระตุก (Motor & Vocal Tic Screener)",
        options: ["ไม่ใช่", "ใช่"],
        questions: [
            "คุณเคยมีอาการขยับตัวที่เกิดขึ้นทันที รวดเร็ว ซ้ำๆ และไม่เป็นจังหวะ (เช่น กะพริบตา, สะบัดหน้า, ยักไหล่) หรือไม่?",
            "คุณเคยมีอาการเปล่งเสียงที่เกิดขึ้นทันที รวดเร็ว ซ้ำๆ และไม่เป็นจังหวะ (เช่น กระแอม, สูดจมูก, ทำเสียงในลำคอ, พูดซ้ำคำ) หรือไม่?",
            "หากตอบ 'ใช่' ในข้อใดข้อหนึ่งข้างต้น อาการเหล่านี้เกิดขึ้นต่อเนื่องมานานกว่า 1 ปีหรือไม่?",
            "อาการเหล่านี้เริ่มเกิดขึ้นก่อนอายุ 18 ปีหรือไม่?"
        ],
        interpret: (answers) => {
            const hasMotor = answers[0] === 1;
            const hasVocal = answers[1] === 1;
            const chronicDuration = answers[2] === 1;
            const onsetBefore18 = answers[3] === 1;
            let msg = "<h3>การแปลผลอาการกระตุก:</h3>";
            if (hasMotor && hasVocal && chronicDuration && onsetBefore18) {
                msg += "<p><strong>ผลลัพธ์:</strong> เข้าข่ายเกณฑ์การวินิจฉัยโรคทูเร็ตต์ (Tourette's Disorder) แนะนำให้พบประสาทแพทย์หรือจิตแพทย์เพื่อรับการประเมิน</p>";
            } else if ((hasMotor || hasVocal) && chronicDuration && onsetBefore18) {
                msg += "<p><strong>ผลลัพธ์:</strong> เข้าข่ายเกณฑ์การวินิจฉัยโรคอาการกระตุกเรื้อรัง (Persistent Motor or Vocal Tic Disorder) แนะนำให้พบแพทย์เพื่อรับการประเมิน</p>";
            } else if ((hasMotor || hasVocal) && !chronicDuration && onsetBefore18) {
                msg += "<p><strong>ผลลัพธ์:</strong> เข้าข่ายรูปแบบของ Provisional Tic Disorder (อาการยังไม่ถึง 1 ปี)</p>";
            } else {
                msg += "<p><strong>ผลลัพธ์:</strong> ผลการคัดกรองยังไม่เข้าเกณฑ์มาตรฐานของกลุ่มโรคอาการกระตุก หากอาการรบกวนการใช้ชีวิตควรปรึกษาแพทย์</p>";
            }
            return msg;
        }
    }
};

function switchTest() {
    const selectedKey = document.getElementById("test-selector").value;
    loadTest(selectedKey);
    document.getElementById("results-card").classList.add("hidden");
}

function loadTest(testKey) {
    const test = tests[testKey];
    const container = document.getElementById("questions-container");
    container.innerHTML = "";
    
    test.questions.forEach((qText, qIdx) => {
        let html = `<div class="question-block">
            <p class="question-text"><strong>ข้อที่ ${qIdx + 1}.</strong> ${qText}</p>
            <div class="options-group">`;
            
        test.options.forEach((optText, oIdx) => {
            html += `
                <label style="display: block;">
                    <input type="radio" name="q${qIdx}" value="${oIdx}"> ${optText}
                </label>`;
        });
        
        html += `</div></div>`;
        container.innerHTML += html;
    });
}

function calculateScore() {
    const selector = document.getElementById("test-selector");
    const currentKey = selector.value;
    const currentTest = tests[currentKey];
    const answers = [];
    let allAnswered = true;
    
    for (let i = 0; i < currentTest.questions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
            allAnswered = false;
            break;
        }
        answers.push(parseInt(selected.value));
    }
    
    if (!allAnswered) {
        alert("โปรดตอบคำถามให้ครบทุกข้อก่อนคำนวณผลลัพธ์");
        return;
    }
    
    const interpretationHtml = currentTest.interpret(answers);
    document.getElementById("interpretation-display").innerHTML = interpretationHtml;
    document.getElementById("results-card").classList.remove("hidden");
    document.getElementById("results-card").scrollIntoView({ behavior: 'smooth' });
}

// เรียกใช้เมื่อโหลดหน้าเว็บ
window.onload = () => {
    const selector = document.getElementById("test-selector");
    if(selector) {
        loadTest(selector.value);
    }
};
