'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

const completedSteps = [
  { id: 1, label: 'Get Started' },
  { id: 2, label: 'Payment' },
];

interface DonorData {
  donorName:    string;
  donorEmail:   string;
  donorMobile:  string;
  donorCountry: string;
  donorCity:    string;
  amount:       string;
  campaignName: string;
}

const defaultDonor: DonorData = {
  donorName:    '',
  donorEmail:   '',
  donorMobile:  '',
  donorCountry: '',
  donorCity:    '',
  amount:       '0',
  campaignName: 'General Donation',
};

export default function DonorPaymentMethods() {
  // const router = useRouter();

  const [donor, setDonor] = useState<DonorData>(defaultDonor);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('donorData');
      if (saved) {
        const parsed: DonorData = JSON.parse(saved);
        setDonor(parsed);
        localStorage.removeItem('donorData');
      }
    } catch {
      // parse error হলে default value থাকবে
    } finally {
      setDataLoaded(true);
    }
  }, []);

  const donationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const address = [donor.donorCity, donor.donorCountry].filter(Boolean).join(', ');

  const handleDownloadReceipt = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 50;
    let y = 50;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 30);
    doc.text('Donation receipt', pageWidth / 2, y, { align: 'center' });
    y += 50;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    if (donor.donorEmail) {
      doc.setTextColor(0, 0, 200);
      doc.text(donor.donorEmail, margin, y);
      const w = doc.getTextWidth(donor.donorEmail);
      doc.setDrawColor(0, 0, 200);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 2, margin + w, y + 2);
      y += 18;
    }

    doc.setTextColor(30, 30, 30);
    if (donor.donorMobile) { doc.text(donor.donorMobile, margin, y); y += 18; }
    if (address)           { doc.text(address,            margin, y); y += 18; }
    doc.text(donor.campaignName,      margin, y); y += 18;
    doc.text(`Date: ${donationDate}`, margin, y); y += 36;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text('Donor Information:', margin, y);
    y += 22;

    const bulletX = margin + 8;
    const textX   = margin + 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    const donorLines: string[] = [`Name: ${donor.donorName}`];
    if (address)           donorLines.push(`Address: ${address}`);
    if (donor.donorEmail)  donorLines.push(`Email: ${donor.donorEmail}`);
    if (donor.donorMobile) donorLines.push(`Mobile: ${donor.donorMobile}`);

    donorLines.forEach((line) => {
      doc.setFillColor(40, 40, 40);
      doc.circle(bulletX, y - 3, 2, 'F');
      doc.text(line, textX, y);
      y += 18;
    });
    y += 16;

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const ackText = `This receipt acknowledges the generous donation made by the above-named donor to ${donor.campaignName}. The details of the donation are as follows:`;
    const ackLines = doc.splitTextToSize(ackText, pageWidth - margin * 2);
    doc.text(ackLines, margin, y);
    y += ackLines.length * 14 + 14;

    const col1 = margin;
    const col2 = margin + 100;
    const col3 = margin + 240;
    const col4 = margin + 320;
    const rowH = 22;
    const tableRight = pageWidth - margin;

    doc.setFillColor(245, 245, 245);
    doc.rect(col1, y - 14, tableRight - col1, rowH, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text('Date of Donation', col1 + 4, y);
    doc.text('Description',      col2,     y);
    doc.text('Amount ($)',        col3,     y);
    doc.text('Donation Type',    col4,     y);
    y += rowH;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const descLines = doc.splitTextToSize(donor.campaignName, 130);
    doc.text(donationDate,                         col1 + 4, y);
    doc.text(descLines,                            col2,     y);
    doc.text(parseFloat(donor.amount).toFixed(2),  col3,     y);
    doc.text('Online',                             col4,     y);
    y += Math.max(descLines.length * 14, rowH) + 4;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(col1, y, tableRight, y);
    y += 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(`Total Amount Donated: $${parseFloat(donor.amount).toFixed(2)}`, margin, y);
    y += 32;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    const footers = [
      'This donation is a charitable contribution and may be eligible for tax deductions in accordance with applicable tax laws. Please retain this receipt for your records.',
      `Thank you for your generous contribution, ${donor.donorName}. Your support helps us continue to provide quality education and improve our facilities.`,
      ...(donor.donorEmail
        ? [`For any inquiries or to request additional receipts, please contact us at ${donor.donorEmail}.`]
        : []),
    ];

    footers.forEach((para) => {
      const lines = doc.splitTextToSize(para, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 10;
    });

    doc.save(`donation-receipt-${donor.donorName.replace(/\s+/g, '-') || 'donor'}.pdf`);
  };

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[80vh] bg-gray-100">

      {/* Download Receipt — top right */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download receipt
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col sm:flex-row items-center gap-12 w-full max-w-6xl">

          {/* Left — Steps completed */}
          <div className="bg-white p-8 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] rounded-[8px] space-y-16">
            {completedSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-800">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Right — Success */}
          <div className="flex flex-col items-center gap-6 flex-1">

            {/* Big green checkmark */}
            <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] rounded-full bg-green-500 flex items-center justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                Donation Successful!
              </h2>
              <p className="text-gray-500 text-sm">
                Thank you,{' '}
                <span className="font-medium text-gray-700">
                  {donor.donorName || 'Donor'}
                </span>. Your contribution means a lot.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              {/* <button
                onClick={handleDownloadReceipt}
                className="flex-1 flex items-center justify-center gap-2 border border-blue-700 text-blue-700 hover:bg-blue-50 text-sm font-semibold py-3 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download Receipt
              </button> */}
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors"
              >
                View Campaigns
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── View Campaigns Modal ───────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Donation Summary
            </h3>

            {/* Donor info inside modal */}
            <div className="text-sm text-gray-600 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Name</span>
                <span className="font-medium text-gray-800">{donor.donorName || '—'}</span>
              </div>
              {donor.donorEmail && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="truncate max-w-[200px]">{donor.donorEmail}</span>
                </div>
              )}
              {donor.donorMobile && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Mobile</span>
                  <span>{donor.donorMobile}</span>
                </div>
              )}
              {address && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Address</span>
                  <span className="text-right max-w-[200px]">{address}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
                <span className="text-gray-400">Campaign</span>
                <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">
                  {donor.campaignName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="font-semibold text-blue-700">
                  ${parseFloat(donor.amount || '0').toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span>
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* <button
                onClick={() => {
                  setShowModal(false);
                  router.push('/campaigns');
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors"
              >
                Browse All Campaigns
              </button> */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                Close 
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}