'use client';

const receiptData = {
  email: 'inquire@organivu.mail',
  company: 'Template.net',
  phone: '222 555 7777',
  address: 'Bakersfield, CA 93301',
  receiptType: 'School Donation Receipt',
  date: 'January 15, 2050',
  donor: {
    name: 'Whitney Goodwin',
    address: 'Baton Rouge, LA 70801',
    email: 'whitney@you.mail',
  },
  donations: [
    {
      date: 'January 10, 2050',
      description: 'General Donation',
      amount: 500.0,
      type: 'Cash',
    },
    {
      date: 'January 10, 2050',
      description: 'Event Support',
      amount: 200.0,
      type: 'Online Transaction',
    },
  ],
  totalAmount: 700.0,
  companyName: '[YOUR COMPANY NAME]',
  contactEmail: '[YOUR EMAIL]',
};

export default function DonationReceipt() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-start justify-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl px-10 py-10 shadow-sm">
        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-gray-800 mb-8 tracking-wide">
          Donation receipt
        </h1>

        {/* Organization Info */}
        <div className="mb-6 space-y-0.5">
          <p className="text-sm text-blue-600 underline cursor-pointer">{receiptData.email}</p>
          <p className="text-sm text-gray-700">{receiptData.company}</p>
          <p className="text-sm text-gray-700">{receiptData.phone}</p>
          <p className="text-sm text-gray-700">{receiptData.address}</p>
          <p className="text-sm text-gray-700">{receiptData.receiptType}</p>
          <p className="text-sm text-gray-700">Date: {receiptData.date}</p>
        </div>

        {/* Donor Information */}
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-2">Donor Information:</p>
          <ul className="space-y-1">
            <li className="text-sm text-gray-700 flex gap-2">
              <span>·</span>
              <span>Name: {receiptData.donor.name}</span>
            </li>
            <li className="text-sm text-gray-700 flex gap-2">
              <span>·</span>
              <span>Address: {receiptData.donor.address}</span>
            </li>
            <li className="text-sm text-gray-700 flex gap-2">
              <span>·</span>
              <span>
                Email:{' '}
                <a href={`mailto:${receiptData.donor.email}`} className="text-blue-600 underline">
                  {receiptData.donor.email}
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Acknowledgement */}
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-700">
            This receipt acknowledges the generous donation made by the above-named donor to{' '}
            {receiptData.companyName}. The details of the donation are as follows:
          </p>

          {/* Donation Table */}
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
              <tr className="text-left">
                <th className="font-normal py-1 pr-4">Date of Donation</th>
                <th className="font-normal py-1 pr-4">Description</th>
                <th className="font-normal py-1 pr-4">Amount ($)</th>
                <th className="font-normal py-1">Donation Type</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.donations.map((d, i) => (
                <tr key={i}>
                  <td className="py-0.5 pr-4">{d.date}</td>
                  <td className="py-0.5 pr-4">{d.description}</td>
                  <td className="py-0.5 pr-4">{d.amount.toFixed(2)}</td>
                  <td className="py-0.5">{d.type}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-sm text-gray-700">
            Total Amount Donated: ${receiptData.totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Legal & Thank you */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            This donation is a charitable contribution and may be eligible for tax deductions in
            accordance with applicable tax laws. Please retain this receipt for your records.
          </p>
          <p>
            Thank you for your generous contribution to {receiptData.companyName}. Your support
            helps us continue to provide quality education and improve our facilities.
          </p>
          <p>
            For any inquiries or to request additional receipts, please contact us at{' '}
            {receiptData.contactEmail}.
          </p>
        </div>
      </div>
    </div>
  );
}