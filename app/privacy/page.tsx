import Link from 'next/link';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Brighton Road Landscaping',
  description:
    'How Brighton Road Landscaping collects, uses, and protects your information — including contact details submitted through our Facebook and Instagram lead forms.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'June 30, 2026';
const EMAIL = 'brightonroadlandscaping@gmail.com';
const PHONE_DISPLAY = '(484) 535-1936';
const PHONE_RAW = '4845351936';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4 leading-relaxed text-gray-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header band */}
      <div className="bg-gradient-to-b from-green-800 to-green-700 text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <ShieldCheck size={18} /> Your privacy matters
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-green-100">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="leading-relaxed text-gray-700">
          This Privacy Policy explains how <strong>Brighton Road Landscaping</strong> (&ldquo;Brighton Road
          Landscaping,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
          your information when you visit{' '}
          <span className="font-medium">brightonroadlandscaping.com</span> (the &ldquo;Site&rdquo;), contact us, or
          submit a request through our website or through our social media lead forms. By using the Site or submitting
          your information to us, you agree to this Policy.
        </p>

        {/* Highlighted lead-form disclosure (the key line for Meta) */}
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-green-900">
            <ShieldCheck size={20} className="shrink-0 text-green-700" /> Facebook &amp; Instagram Lead Forms
          </h2>
          <p className="mt-3 leading-relaxed text-green-900/90">
            When you submit an instant form (lead form) through our advertisements on Facebook or Instagram, we collect
            the contact information you provide — such as your name, email address, phone number, and any project
            details. <strong>This contact information is passed to Jobber, our customer relationship and quoting
            software, so that our team can follow up with you about your quote and requested services.</strong> We use
            this information only to respond to your inquiry and provide the services you asked about.
          </p>
        </div>

        <Section title="Information We Collect">
          <p>We collect information in the following ways:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Information you give us directly.</strong> When you fill out a form on our Site, request a quote,
              call, text, or email us, we collect details such as your name, email address, phone number, mailing or
              service address, and any information you share about your project.
            </li>
            <li>
              <strong>Information from Facebook &amp; Instagram lead forms.</strong> If you submit a lead form through
              our ads on Facebook or Instagram, we receive the contact information and project details you provided in
              that form, as described above.
            </li>
            <li>
              <strong>Information collected automatically.</strong> Like most websites, we automatically collect certain
              technical information — such as your IP address, browser type, device information, and pages viewed —
              through cookies and similar technologies, including the Meta (Facebook) Pixel, to help us understand site
              usage and measure the performance of our advertising.
            </li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Respond to your inquiries and provide quotes, estimates, and follow-up communication;</li>
            <li>Schedule and deliver landscaping and related services you request;</li>
            <li>Pass contact information from our lead forms to Jobber for quote follow-up and service management;</li>
            <li>Operate, maintain, and improve our Site and advertising; and</li>
            <li>Comply with our legal obligations and protect our rights.</li>
          </ul>
        </Section>

        <Section title="How We Share Your Information">
          <p>
            We do <strong>not</strong> sell your personal information. We share your information only with trusted
            service providers who help us operate our business and follow up with you, and only as needed to provide
            those services. These include:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Jobber</strong> — our customer relationship management and quoting platform, which stores your
              contact and project information so we can prepare quotes and manage your service.
            </li>
            <li>
              <strong>Meta (Facebook &amp; Instagram)</strong> — the platform through which our lead forms and
              advertising are delivered.
            </li>
          </ul>
          <p>
            We may also disclose information if required by law, to enforce our agreements, or to protect the rights,
            safety, or property of Brighton Road Landscaping or others.
          </p>
        </Section>

        <Section title="Cookies & Tracking Technologies">
          <p>
            Our Site uses cookies and the Meta Pixel to understand how visitors use the Site and to measure and improve
            our advertising. You can control cookies through your browser settings, and you can manage ad preferences
            through your Facebook and Instagram account settings. Disabling cookies may affect some features of the
            Site.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            We keep your information for as long as needed to respond to your inquiry, provide our services, and meet
            our legal, accounting, or reporting obligations. When we no longer need it, we take reasonable steps to
            securely delete or de-identify it.
          </p>
        </Section>

        <Section title="How We Protect Your Information">
          <p>
            We use reasonable administrative, technical, and physical safeguards to protect the information we collect.
            However, no method of transmission or storage is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </Section>

        <Section title="Your Choices & Rights">
          <p>
            You may request to access, correct, or delete the personal information we hold about you, or ask us to stop
            contacting you, at any time by emailing or calling us using the details below. To stop receiving marketing
            messages, you can also reply STOP to a text or use the unsubscribe option in an email.
          </p>
        </Section>

        <Section title="Third-Party Links">
          <p>
            Our Site and ads may link to third-party websites or platforms (such as Facebook, Instagram, or Jobber) that
            we do not control. This Policy does not apply to those third parties, and we encourage you to review their
            privacy policies.
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            Our Site and services are intended for adults. We do not knowingly collect personal information from
            children under 13. If you believe a child has provided us with personal information, please contact us and
            we will delete it.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo;
            date at the top of this page. Your continued use of the Site after any changes means you accept the updated
            Policy.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>If you have any questions about this Privacy Policy or your information, please contact us:</p>
          <div className="mt-2 space-y-3">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-green-50">
              <Mail className="shrink-0 text-green-700" size={20} />
              <span className="break-all font-semibold text-green-700">{EMAIL}</span>
            </a>
            <a href={`tel:${PHONE_RAW}`} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-green-50">
              <Phone className="shrink-0 text-green-700" size={20} />
              <span className="font-semibold text-green-700">{PHONE_DISPLAY}</span>
            </a>
          </div>
          <p className="pt-2 text-sm text-gray-600">Brighton Road Landscaping · Main Line &amp; Montgomery County, PA</p>
        </Section>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link href="/" className="font-semibold text-green-700 hover:text-green-600">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
