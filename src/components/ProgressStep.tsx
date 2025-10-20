export function ProgressStepSidebar(props: any) {
  const steps = ['cntc', 'education', 'skill', 'project', 'social-link'];
  return (
    <>
      <ProgressStep steps={steps} currentStep={props.currentStep} />
    </>
  );
}

function ProgressStep({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="">
      {steps.map((step: string, index: number) => (
        <div key={index} className="">
          <div className="">
            <div
              className={`${index === currentStep - 1 ? 'text-orange-300' : 'text-gray-300'}
                ${index < currentStep - 1 ? 'text-green-300' : ''}
              `}
            >
              <p className="">{step}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
                ${index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-300'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
