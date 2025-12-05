import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faHome,
  faHandshake,
  faShieldAlt,
  faCheckCircle,
  faUsers,
  faClock,
  faGlobe,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const differentiators = [
    {
      icon: faCar,
      title: 'Premium Fleet',
      description:
        'From business sedans to luxury SUVs, every vehicle in our fleet is inspected and maintained to the highest standards.',
    },
    {
      icon: faHome,
      title: 'Curated Stays',
      description:
        'Handpicked properties in prime locations so your trips feel like home, not just a booking.',
    },
    {
      icon: faHandshake,
      title: 'Human-First Service',
      description:
        'Real people, 24/7. From last-minute changes to special requests, our team has you covered.',
    },
    {
      icon: faShieldAlt,
      title: 'Safe & Transparent',
      description:
        'Clear pricing, insured vehicles, and verified hosts for complete peace of mind.',
    },
  ];

  const stats = [
    {
      icon: faUsers,
      number: '1000+',
      label: 'Happy Customers',
    },
    {
      icon: faCar,
      number: '500+',
      label: 'Active Vehicles',
    },
    {
      icon: faHome,
      number: '200+',
      label: 'Premium Properties',
    },
    {
      icon: faClock,
      number: '1+',
      label: 'Years of Experience',
    },
  ];

  const values = [
    {
      title: 'Quality',
      description: 'Only well-maintained vehicles and verified properties make it to our platform.',
    },
    {
      title: 'Reliability',
      description: 'Punctual pickups, accurate listings, and support when you actually need it.',
    },
    {
      title: 'Trust',
      description: 'Honest pricing, transparent policies, and no hidden surprises.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Browse & Compare',
      description:
        'Explore premium cars and properties in your city or destination, with detailed photos and clear pricing.',
    },
    {
      step: '02',
      title: 'Book in Minutes',
      description:
        'Choose your dates, add preferences, and confirm securely with instant booking and digital confirmations.',
    },
    {
      step: '03',
      title: 'Drive, Stay, Relax',
      description:
        'Pick up your car, check in to your stay, and enjoy a smooth experience backed by 24/7 support.',
    },
    {
      step: '04',
      title: 'We Handle the Rest',
      description:
        'From maintenance to coordination with hosts and partners, we take care of everything behind the scenes.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-emerald-500 to-emerald-400 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-20 lg:py-24 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
          {/* Hero Text */}
          <div>
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur-md border border-white/20">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Your trusted partner for premium rentals
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              About <span className="text-emerald-200">RentOrbits</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 max-w-xl">
              We connect travelers and professionals with premium cars and properties,
              blending convenience, comfort, and trust in every journey.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-lg">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-lg text-emerald-200" />
                <p className="text-sm md:text-base text-white/80">
                  Seamless, mobile-friendly booking experience tailored for modern travelers.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-lg text-emerald-200" />
                <p className="text-sm md:text-base text-white/80">
                  Carefully selected partners to ensure safety, comfort, and transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:justify-self-end w-full max-w-md lg:max-w-lg">
            <div className="relative rounded-3xl bg-white/10 p-1 backdrop-blur-md shadow-2xl">
              <div className="relative h-64 md:h-72 rounded-3xl bg-neutral-900/60 overflow-hidden flex flex-col justify-between">
                {/* Top Badge */}
                <div className="flex items-center justify-between px-6 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                      Smart Rentals
                    </p>
                    <p className="mt-1 text-lg font-semibold">Drive & Stay with Confidence</p>
                  </div>
                  <div className="flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                    <FontAwesomeIcon icon={faStar} className="text-amber-300" />
                    <span>4.9 / 5 rating</span>
                  </div>
                </div>

                {/* Stat chips */}
                <div className="px-6 pb-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      <span className="block text-[11px] uppercase tracking-widest text-white/60">
                        Trips
                      </span>
                      <span className="mt-1 block text-lg font-semibold">25K+</span>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      <span className="block text-[11px] uppercase tracking-widest text-white/60">
                        Cities
                      </span>
                      <span className="mt-1 block text-lg font-semibold">35+</span>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      <span className="block text-[11px] uppercase tracking-widest text-white/60">
                        Partners
                      </span>
                      <span className="mt-1 block text-lg font-semibold">450+</span>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/70">
                    Perfect for business trips, vacations, weekend getaways, and everything in
                    between.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section – replaces Brand Story */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-300 mb-2">
              Simple, Clear, Effortless
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How RentOrbits Works</h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              We designed RentOrbits around one idea: premium rentals should feel as smooth as
              ordering your morning coffee. No confusion, no hidden steps — just a clear journey
              from search to keys-in-hand.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-200">
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                Multi-city coverage
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200">
                Instant digital confirmations
              </span>
              <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-200">
                Support before, during & after trip
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative flex items-start space-x-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-semibold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {item.description}
                  </p>
                  {index !== steps.length - 1 && (
                    <div className="mt-3 h-px w-16 bg-gradient-to-r from-primary-500/50 to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950/60">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission & Vision</h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              Everything we do is guided by a clear purpose: to make premium travel experiences
              simple, reliable, and accessible to everyone.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300 mb-2">
                Our Mission
              </p>
              <h3 className="text-xl font-semibold mb-3">Premium Made Practical</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                To deliver premium cars and stays with a booking experience that feels effortless,
                transparent, and human.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300 mb-2">
                Our Vision
              </p>
              <h3 className="text-xl font-semibold mb-3">Travel Without Friction</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                To become the most trusted global platform where every journey begins with confidence
                and ends with satisfaction.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300 mb-2">
                Our Promise
              </p>
              <h3 className="text-xl font-semibold mb-3">No Compromises</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                We continuously refine our fleet, partners, and technology so you never have to
                choose between comfort, reliability, and value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 md:py-16 bg-primary-50 dark:bg-neutral-900/80">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-center space-x-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-100 dark:border-neutral-800 px-5 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40">
                  <FontAwesomeIcon icon={item.icon} className="text-primary-700 dark:text-primary-300" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-primary-700 dark:text-primary-300">
                    {item.number}
                  </p>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">What Sets Us Apart</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              Not just another rental service. We obsess over the details so that every interaction
              feels premium—from your first search to the final checkout.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/40">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-xl text-primary-700 dark:text-primary-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-20 md:pb-24 bg-neutral-50 dark:bg-neutral-950/70">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              These principles guide every decision we make—how we build our product, choose our
              partners, and support our customers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex items-start space-x-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm"
              >
                <div className="mt-1">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-xl text-primary-600 dark:text-primary-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{value.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
