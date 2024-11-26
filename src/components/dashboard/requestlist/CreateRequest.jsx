import { useState } from "react";
import { FileText, Truck, CreditCard, Check } from "lucide-react";
import Supplies from "./Supplies";
import Procurements from "./Procurements";
import Commercials from "./Commercials";

const CreateRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({
    commercials: {},
    procurements: {},
    supplies: [],
    remarks: "",
  });

  const steps = [
    {
      title: "Commercials",
      icon: FileText,
      content: (
        <Commercials
          formData={formData.commercials}
          setFormData={(data) =>
            setFormData((prev) => ({
              ...prev,
              commercials:
                typeof data === "function" ? data(prev.commercials) : data,
            }))
          }
          onNext={() => handleStepComplete(0)}
        />
      ),
    },
    {
      title: "Procurements",
      icon: CreditCard,
      content: (
        <Procurements
          formData={formData.procurements}
          setFormData={(data) =>
            setFormData((prev) => ({
              ...prev,
              procurements:
                typeof data === "function" ? data(prev.procurements) : data,
            }))
          }
          onNext={() => handleStepComplete(1)}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Supplies",
      icon: Truck,
      content: (
        <Supplies
          formData={formData.supplies}
          setFormData={(data) =>
            setFormData((prev) => ({
              ...prev,
              supplies: typeof data === "function" ? data(prev.supplies) : data,
            }))
          }
          remarks={formData.remarks}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
  ];

  const handleStepComplete = (stepIndex) => {
    // Mark step as completed
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
   
  };

  return (
    <div className="w-full  mx-auto bg-gray-50  p-6">
      {/* Improved Stepper Navigation */}
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === index;
          const isCompleted = completedSteps.includes(index);

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Step Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-1/2 w-full h-0.5 transform -translate-x-1/2 -z-10 
                    ${
                      isCompleted || isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                />
              )}

              {/* Step Indicator */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2
                  ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : isCompleted
                      ? "border-green-500 bg-green-50 text-green-500"
                      : "border-gray-300 bg-gray-100 text-gray-400"
                  }
                  transition-all duration-300`}
              >
                {isCompleted && !isActive ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <StepIcon className="w-6 h-6" />
                )}
              </div>

              {/* Step Title */}
              <h3
                className={`text-center font-semibold text-sm
                  ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                  transition-colors duration-300`}
              >
                {step.title}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="mt-6">{steps[currentStep].content}</div>
    </div>
  );
};

export default CreateRequest;
