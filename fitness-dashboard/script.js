const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const messageContainer = document.getElementById('messageContainer');

sendButton.addEventListener('click', function () {
    const userMessage = userInput.value;
    if (userMessage.trim()) {
        // Display user message
        displayMessage(userMessage, 'user');
        userInput.value = ''; // Clear input

        // Get chatbot response
        const botResponse = getBotResponse(userMessage);
        
        // Display bot message
        displayMessage(botResponse.response, 'chatbot');

        // Show follow-up questions if any
        if (botResponse.followUp && botResponse.followUp.length > 0) {
            const followUpMessage = 'Would you like more information on any of these topics?';
            displayMessage(followUpMessage, 'chatbot');

            botResponse.followUp.forEach((followUp, index) => {
                const followUpQuestion = document.createElement('div');
                followUpQuestion.classList.add('follow-up');
                followUpQuestion.dataset.index = index;
                followUpQuestion.textContent = `${index + 1}. ${followUp.question}`;
                messageContainer.appendChild(followUpQuestion);
            });

            // Add event listener for follow-up clicks
            messageContainer.addEventListener('click', function (event) {
                if (event.target && event.target.matches('.follow-up')) {
                    const index = parseInt(event.target.dataset.index, 10);
                    const selectedFollowUp = botResponse.followUp[index];

                    // Display the selected follow-up answer
                    displayMessage(selectedFollowUp.answer, 'chatbot');
                }
            });
        }
        
        // Update food section based on the response
        updateFoodSection(userMessage);
    }
});

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
}

function getBotResponse(message) {
    message = message.toLowerCase();

    // Sleep-related responses and follow-ups
    if (message.includes("sleep") || message.includes("sleeping")) {
        return {
            response: "To improve your sleep quality, consider establishing a calming bedtime routine. This may include activities like reading a book or taking a warm bath. Additionally, aim to go to bed and wake up at the same time every day, even on weekends. Avoid screens before bedtime, as the blue light emitted can disrupt your natural sleep cycle. Make sure your sleep environment is dark, cool, and quiet, and try to limit caffeine intake in the afternoon and evening.",
            followUp: [
                {
                    question: "What are some foods I should avoid before bed?",
                    answer: "It's best to avoid heavy meals, caffeine, alcohol, and sugary snacks before bed. Caffeine and alcohol can disrupt your sleep cycle, and heavy or spicy foods may cause discomfort or indigestion."
                },
                {
                    question: "Can exercise help me sleep better?",
                    answer: "Yes, regular physical activity can improve sleep quality. However, try to avoid vigorous exercise too close to bedtime as it may make it harder for you to wind down."
                },
                {
                    question: "What are some relaxation techniques I can use before bed?",
                    answer: "Some effective relaxation techniques include deep breathing exercises, progressive muscle relaxation, guided meditation, or even a warm bath to help your body and mind unwind."
                }
            ]
        };
    }

    // Muscle-building responses and follow-ups
    if (message.includes("muscle") || message.includes("muscles")) {
        return {
            response: "Building muscle involves a combination of resistance training and adequate nutrition. Incorporate exercises that target multiple muscle groups, such as squats, deadlifts, and bench presses, into your workout routine. Consuming enough protein is crucial for muscle repair and growth; aim for sources like chicken, fish, eggs, legumes, and dairy. Additionally, ensure you're getting enough calories overall to support your training. Rest days are just as important as workout days, as muscles need time to recover and grow.",
            followUp: [
                {
                    question: "How much protein should I be eating to build muscle?",
                    answer: "For muscle growth, a common recommendation is to consume 1.6-2.2 grams of protein per kilogram of body weight per day. Protein-rich foods like lean meats, fish, eggs, and legumes can help you meet this goal."
                },
                {
                    question: "How often should I train each muscle group?",
                    answer: "Training each muscle group 2-3 times per week is optimal for muscle growth. Ensure you are allowing adequate recovery time between sessions, and vary your workouts to prevent plateaus."
                },
                {
                    question: "Should I focus on compound or isolation exercises for building muscle?",
                    answer: "Compound exercises (like squats, deadlifts, and bench presses) are excellent for building muscle because they work multiple muscle groups at once. Isolation exercises (like bicep curls) can also help target specific muscles once the compound movements are in place."
                }
            ]
        };
    }

    // Weight loss responses and follow-ups
    if (message.includes("weight") || message.includes("weight loss")) {
        return {
            response: "Achieving weight loss requires a combination of a balanced diet and regular exercise. Focus on consuming whole, nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins. It's also important to watch portion sizes. Engaging in physical activities, such as walking, running, or strength training, can help burn calories and improve overall fitness. Remember to stay hydrated, as drinking water can aid in weight management. Consistency is key, so set realistic goals and track your progress.",
            followUp: [
                {
                    question: "What types of foods should I focus on eating to lose weight?",
                    answer: "For weight loss, focus on nutrient-dense foods that are lower in calories but high in fiber, protein, and healthy fats. Foods like leafy greens, lean proteins (chicken, fish), whole grains, and legumes are great choices."
                },
                {
                    question: "How can I track my calories effectively?",
                    answer: "To track calories, you can use food tracking apps like MyFitnessPal or Cronometer. These apps allow you to log your meals and monitor your daily calorie intake to help you stay on track with your goals."
                },
                {
                    question: "What are some common mistakes people make when trying to lose weight?",
                    answer: "Common mistakes include skipping meals, cutting out entire food groups, or relying too much on fad diets. It's also important not to aim for rapid weight loss, as slow and steady progress is more sustainable in the long term."
                }
            ]
        };
    }

    // Default response if no keywords match
    return {
        response: "I'm here to assist you! If you have any questions regarding sleep, weight management, or muscle building, feel free to ask, and I'll do my best to provide you with helpful information."
    };
}

function updateFoodSection(userMessage) {
    const foodTable = document.querySelector('.food-tracking table');

    // Clear existing rows except the header
    const existingRows = foodTable.querySelectorAll('tr:not(:first-child)');
    existingRows.forEach(row => row.remove());

    // Suggestions based on keywords present in user message
    if (userMessage.toLowerCase().includes("sleep") || userMessage.toLowerCase().includes("sleeping")) {
        addFoodSuggestion("Chamomile Tea", "Before bed", "0 kcal", "0 g", "0 g");
        addFoodSuggestion("Almonds", "Snack", "160 kcal", "6 g", "6 g");
    }
    
    if (userMessage.toLowerCase().includes("weight") || userMessage.toLowerCase().includes("weight loss")) {
        addFoodSuggestion("Vegetable Salad", "Lunch", "150 kcal", "3 g", "10 g");
        addFoodSuggestion("Lean Chicken", "Dinner", "250 kcal", "30 g", "0 g");
    }
    
    if (userMessage.toLowerCase().includes("muscle") || userMessage.toLowerCase().includes("muscles")) {
        addFoodSuggestion("Greek Yogurt", "Snack", "100 kcal", "10 g", "5 g");
        addFoodSuggestion("Oatmeal", "Breakfast", "150 kcal", "5 g", "27 g");
    }
}

function addFoodSuggestion(food, meal, calories, proteins, carbs) {
    const foodTable = document.querySelector('.food-tracking table');
    const newRow = foodTable.insertRow();
    newRow.innerHTML = `
        <td>${food}</td>
        <td>${meal}</td>
        <td>${calories}</td>
        <td>${proteins}</td>
        <td>${carbs}</td>
    `;
}
