'use client';

import { useRouter } from 'next/navigation';

const completedSteps = [
  { id: 1, label: 'Get Started' },
  { id: 2, label: 'Payment' },
];

export default function DonorPaymentMethods() {
  const router = useRouter();

  const handleDownloadReceipt = () => {
    // handle receipt download
  };

  const handleViewCampaigns = () => {
    router.push('/campaigns');
  };

  return (
    <div className="flex flex-col py-10">
      {/* Download Receipt - top right */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download receipt
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-12 w-full max-w-6xl">

          {/* Left - Steps completed */}
          <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] space-y-20">
            {completedSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Success */}
          <div className="flex flex-col items-center gap-6 flex-1">
            {/* Big green check */}
            <div className="w-[230px] h-[230px] rounded-full bg-green-600 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-28 h-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Donation Done text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
              Donation Done
            </h2>

            {/* View campaigns button */}
            <button
              onClick={handleViewCampaigns}
              className="w-full sm:w-72 lg:w-[90%] bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-3 transition-colors"
            >
              View other campaigns
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}