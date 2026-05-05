"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicyLanding() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: "url('/privacy.png')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1 - WHAT DO WE DO WITH YOUR INFORMATION ?
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              When you purchase something from our store, as part of the buying
              and selling process, we collect the personal information you give
              us such as your name, address and email address.
            </p>
            <p>
              When you browse our store, we also automatically receive your
              computer&apos;s internet protocol (IP) address in order to provide
              us with information that helps us learn about your browser and
              operating system.
            </p>
            <p>
              Email marketing (if applicable): With your permission, we may send
              you emails about our store, new products and other updates.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2 - CONSENT</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="text-lg font-semibold text-gray-900">
              How do you get my consent ?
            </h3>
            <p>
              When you provide us with personal information to complete a
              transaction, verify your credit card, place an order, arrange for
              a delivery or return a purchase, we imply that you consent to our
              collecting it and using it for that specific reason only.
            </p>
            <p>
              If we ask for your personal information for a secondary reason,
              like marketing, we will either ask you directly for your expressed
              consent, or provide you with an opportunity to say no.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3 - DISCLOSURE
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may disclose your personal information if we are required by law
            to do so or if you violate our Terms of Service.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4 - PAYMENT</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We use Razorpay for processing payments. We/Razorpay do not store
              your card data on their servers. The data is encrypted through the
              Payment Card Industry Data Security Standard (PCI-DSS) when
              processing payment. Your purchase transaction data is only used as
              long as is necessary to complete your purchase transaction. After
              that is complete, your purchase transaction information is not
              saved.
            </p>
            <p>
              Our payment gateway adheres to the standards set by PCI-DSS as
              managed by the PCI Security Standards Council, which is a joint
              effort of brands like Visa, MasterCard, American Express and
              Discover.
            </p>
            <p>
              PCI-DSS requirements help ensure the secure handling of credit
              card information by our store and its service providers. For more
              insight, you may also want to read terms and conditions of
              razorpay on{" "}
              <a
                href="https://razorpay.com"
                className="text-blue-600 hover:underline"
              >
                https://razorpay.com
              </a>
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5 - THIRD-PARTY SERVICES
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              In general, the third-party providers used by us will only collect,
              use and disclose your information to the extent necessary to allow
              them to perform the services they provide to us.
            </p>
            <p>
              However, certain third-party service providers, such as payment
              gateways and other payment transaction processors, have their own
              privacy policies in respect to the information we are required to
              provide to them for your purchase-related transactions.
            </p>
            <p>
              For these providers, we recommend that you read their privacy
              policies so you can understand the manner in which your personal
              information will be handled by these providers.
            </p>
            <p>
              In particular, remember that certain providers may be located in
              or have facilities that are located a different jurisdiction than
              either you or us. So if you elect to proceed with a transaction
              that involves the services of a third-party service provider, then
              your information may become subject to the laws of the jurisdiction(s)
              in which that service provider or its facilities are located.
            </p>
            <p>
              Once you leave our store&apos;s website or are redirected to a
              third-party website or application, you are no longer governed by
              this Privacy Policy or our website&apos;s Terms of Service.
            </p>
          </div>
        </section>

        {/* Section - Links */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Links</h3>
          <p className="text-gray-700 leading-relaxed">
            When you click on links on our store, they may direct you away from
            our site. We are not responsible for the privacy practices of other
            sites and encourage you to read their privacy statements.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6 - SECURITY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To protect your personal information, we take reasonable precautions
            and follow industry best practices to make sure it is not
            inappropriately lost, misused, accessed, disclosed, altered or
            destroyed.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7 - COOKIES
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies to maintain session of your user. It is not used to
            personally identify you on other websites.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8 - AGE OF CONSENT
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By using this site, you represent that you are at least the age of
            majority in your state or province of residence, or that you are the
            age of majority in your state or province of residence and you have
            given us your consent to allow any of your minor dependents to use
            this site.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9 - CHANGES TO THIS PRIVACY POLICY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If our store is acquired or merged with another company, your
            information may be transferred to the new owners so that we may
            continue to sell products to you.
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            QUESTIONS AND CONTACT INFORMATION
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              If you would like to: access, correct, amend or delete any
              personal information we have about you, register a complaint, or
              simply want more information contact our Privacy Compliance Officer
              at{" "}
              <a
                href="mailto:spakstrip@gmail.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                spakstrip@gmail.com
              </a>{" "}
              or by mail at{" "}
              <span className="font-semibold">
                E-38, Budh Vihar, Badarpur, New Delhi, Delhi -110044
              </span>
              .
            </p>
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                [ Privacy Compliance Officer ]
              </p>
              <p className="font-semibold text-gray-900">MR. S K Meena</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/logo.svg"
                    alt="Spaks Trip"
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  SPAKSTRIP
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Spaks Trip, we specialize in crafting unforgettable journeys —
                whether you&apos;re exploring the charm of India or venturing
                across the globe.
              </p>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Important Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-cancellation"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Refund & Cancellation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/flight"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Flight
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner/login"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Partner Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="text-gray-600">Customer Support</p>
                    <p className="text-gray-900 font-semibold">
                      +91 870 045 8818
                    </p>
                    <p className="text-gray-900 font-semibold">032 8072</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-gray-600 text-sm">
              © 2024 Spaks Trip. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all"
      >
        ↑
      </button>
    </div>
  );
}

function Lock({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m3.5-9c0 1.933-1.567 3.5-3.5 3.5S8.5 13.933 8.5 12 10.067 8.5 12 8.5s3.5 1.567 3.5 3.5M12 6C8.134 6 5 9.134 5 13c0 2.389 1.266 4.459 3.158 5.598.258-.735.851-1.35 1.592-1.592V15h4.5v1.968c.782.257 1.453.928 1.658 1.755C17.738 17.535 19 15.436 19 13c0-3.866-3.134-7-7-7" />
    </svg>
  );
}
