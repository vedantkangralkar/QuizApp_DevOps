const Question = ({ question, onAnswerSelect, isDarkMode }) => {
    if (!question) return null; // Ensure question is defined
    console.log(question);
    return (
        <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <h3 className="text-xl font-semibold mb-4">{question.question}</h3> 
            <div className="space-y-2">
                {question.options.map((option, index) => (
                    // Clicking an option triggers 'onAnswerSelect(index)' to handle answer logic
                    <button
                        key={index}
                        onClick={() => onAnswerSelect(index)}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                            isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;

