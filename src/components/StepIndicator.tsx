'use client';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                index < currentStep
                  ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white'
                  : index === currentStep
                  ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white'
                  : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  index <= currentStep
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </span>
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                index <= currentStep
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
        
        {/* Connection lines */}
        <div className="absolute top-5 left-[5%] right-[5%] h-[2px] -z-10">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-gray-900 dark:bg-white transition-all duration-500"
              style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
