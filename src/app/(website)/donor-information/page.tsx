import React, { Suspense } from "react";
import DonorInformation from "./_components/DonorInformation";

function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DonorInformation />
      </Suspense>
    </div>
  );
}

export default Page;