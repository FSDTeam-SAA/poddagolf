"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

const COUNTRIES = [
  { value: "nl", label: "Netherlands", flag: "🇳🇱" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
];

const CURRENCIES = [
  { value: "usd", label: "US Dollars", flag: "🇺🇸" },
  { value: "eur", label: "Euro", flag: "🇪🇺" },
  { value: "gbp", label: "British Pound", flag: "🇬🇧" },
];

const STRIPE_COUNTRIES = [
  { value: "nl", label: "Netherlands", flag: "🇳🇱" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
];

export default function StartYourDonation() {
  const [country, setCountry] = useState("nl");
  const [currency, setCurrency] = useState("usd");
  const [stripeCountry, setStripeCountry] = useState("nl");
  const [stripeConnected, setStripeConnected] = useState(false);

  const handleConnectStripe = () => {
    setStripeConnected(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Start Your Donation
        </h1>

        <div className="flex gap-6">
          {/* Left Sidebar - Steps */}
          <div className="w-[350px] shrink-0">
            <div className="bg-white p-6 w-full sm:w-56 lg:w-[350px] shadow-[0px_1px_17.4px_0px_#00000040] ">
              {/* Step 1 - Completed */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <CheckCheck className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Get Started
                </span>
              </div>

              {/* Divider */}
              <div className="ml-4 w-px h-4 bg-gray-200" />

              {/* Step 2 - Active */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-blue-500">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-500">Payment</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                    Enable payment processors for your fundraising page
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-4">
            {/* Donor Payment Methods Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Donor Payment Methods
              </h2>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Please enable payment options for your donation here. Payment
                options shown based on the country funds are being sent to and
                the currency you&apos;ve selected.
              </p>

              {/* Country & Currency Row */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md text-sm">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <span>
                            {
                              COUNTRIES.find((c) => c.value === country)?.flag
                            }
                          </span>
                          <span>
                            {
                              COUNTRIES.find((c) => c.value === country)?.label
                            }
                          </span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Currency
                  </label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md text-sm">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <span>
                            {
                              CURRENCIES.find((c) => c.value === currency)?.flag
                            }
                          </span>
                          <span>
                            {
                              CURRENCIES.find((c) => c.value === currency)?.label
                            }
                          </span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Stripe Card */}
              <div className="border border-gray-200 rounded-xl p-5">
                {/* Stripe Header */}
                <div className="text-center mb-4">
                  <p className="text-xl font-bold text-gray-800 tracking-tight">
                    stripe
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Recommended on all fundraisers
                  </p>
                </div>

                {/* Stripe Info Points */}
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-xs text-gray-600">
                      Stripe makes it easier than ever to accept donations on
                      GoGetFunding via debit and credit cards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-xs text-gray-600">
                      Stripe can be enabled if you&apos;re resident in:
                    </span>
                  </li>
                </ul>

                {/* Stripe Country Select */}
                <div className="mb-4">
                  <Select value={stripeCountry} onValueChange={setStripeCountry}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md text-sm">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <span>
                            {
                              STRIPE_COUNTRIES.find(
                                (c) => c.value === stripeCountry
                              )?.flag
                            }
                          </span>
                          <span>
                            {
                              STRIPE_COUNTRIES.find(
                                (c) => c.value === stripeCountry
                              )?.label
                            }
                          </span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {STRIPE_COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Connect Button */}
                <Button
                  onClick={handleConnectStripe}
                  className={cn(
                    "w-full font-semibold text-sm py-2.5",
                    stripeConnected
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  )}
                >
                  {stripeConnected ? "✓ Connected with Stripe" : "Connect with Stripe"}
                </Button>
              </div>

              {/* Not Connected Notice */}
              {!stripeConnected && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                  <p className="text-xs text-gray-500">
                    Not connected{" "}
                    <span className="text-gray-400">
                      · You have not enabled Stripe yet
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Finish Donation Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-xl">
              Finish Donation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}