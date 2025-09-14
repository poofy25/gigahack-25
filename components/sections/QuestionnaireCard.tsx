import React from 'react';

export function QuestionnaireCard() {
  return (
    <div className="w-[500px] bg-zinc-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Founder Awareness Questionnaire?
      </h2>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-8">
          Are you Cyber-Literate?
        </h3>
        
        {/* Empty space for questionnaire content */}
        <div className="h-64 flex items-center justify-center">
          <div className="text-zinc-500 text-sm">
            Questionnaire content will appear here
          </div>
        </div>
      </div>
    </div>
  );
}
