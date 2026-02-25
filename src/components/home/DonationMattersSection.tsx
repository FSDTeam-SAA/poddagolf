"use client";

import Image from "next/image";

interface DonationMatterCard {
  icon: string;
  title: string;
  description: string;
}

const cards: DonationMatterCard[] = [
  {
    icon: "/images/donation1.png",
    title: "Immediate Impact",
    description:
      "Your contribution goes straight to the people who need it most, delivering fast and meaningful support where it matters.",
  },
  {
    icon: "/images/donation1.png",
    title: "Trusted results",
    description:
      "Our campaigns consistently achieve their goals, creating measurable and lasting change for the communities we support.",
  },
  {
    icon: "/images/donation1.png",
    title: "Full Transparency",
    description:
      "We believe in openness at every step—clearly showing how funds are used and the real outcomes they help create.",
  },
];

export function DonationMattersSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[48px] font-medium text-foreground text-balance">
            Your donation matters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/70 text-balance max-w-3xl mx-auto">
            Whether it&apos;s through donations, volunteering, or fundraising,
            there are many ways to make a meaningful impact. Find out how you
            can contribute to our mission.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={index} className="group flex flex-col overflow-hidden">
              <div className="flex-shrink-0 bg-[#E4F3FF] p-8 flex items-center justify-center">
                <Image
                  src={card.icon}
                  width={150}
                  height={80}
                  quality={100}
                  alt={card.title}
                />
              </div>
              <div className="flex flex-col flex-grow p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-foreground/70 text-sm sm:text-base leading-relaxed flex-grow">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
