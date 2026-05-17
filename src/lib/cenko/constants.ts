export type LegalSection = {
	title: string;
	bullets: string[];
};

export type LegalDocument = {
	id: string;
	title: string;
	sections: LegalSection[];
};

export type LegalData = {
	lastEdited: string;
	contactEmail: string;
	documents: LegalDocument[];
};

export const legalData: LegalData = {
	lastEdited: '2026-05-17',
	contactEmail: 'lanlebar6@gmail.com',
	documents: [
		{
			id: 'legal',
			title: 'Legal information',
			sections: [
				{
					title: 'Using Cenko',
					bullets: [
						'Use the app only in a lawful way and respect the rights of other people and businesses.',
						'Do not try to interfere with the app, reverse engineer it, or use it in a way that could harm the service or other users.',
						'If you create an account, you are responsible for keeping your access secure and for activity that happens under your account.'
					]
				},
				{
					title: 'Information we handle',
					bullets: [
						'Account details such as your email address and profile information.',
						'Content you add to the app, including shopping lists, receipts, favorites, and similar records.',
						'Technical information such as app version, device details, and diagnostic data when needed to keep the app working.',
						'Usage and analytics data such as screen views and feature interactions, collected via Firebase Analytics to understand how the app is used.',
						'Crash reports and performance metrics collected via Firebase Crashlytics and Firebase Performance Monitoring to diagnose issues and improve stability.'
					]
				},
				{
					title: 'Your rights',
					bullets: [
						'You may request access to, correction of, or deletion of your personal information.',
						'You may object to certain types of processing or request restriction where applicable.',
						'You may delete your account and data associated with it at any time.',
						'You may contact us if you have questions about your privacy rights or data handling practices.'
					]
				},
				{
					title: 'How information is used',
					bullets: [
						'To provide core features like authentication, shopping lists, deal discovery, receipt scanning, and support.',
						'To maintain, secure, troubleshoot, and improve the app.',
						'To meet legal, regulatory, and operational requirements.'
					]
				},
				{
					title: 'Legal basis for processing (GDPR Article 6)',
					bullets: [
						'Account data (email address, profile information, app content): processed on the legal basis of performance of a contract (GDPR Article 6(1)(b)) — necessary to provide the service you have signed up for.',
						'Diagnostic and technical data (crash reports, performance metrics, device details): processed on the legal basis of legitimate interests (GDPR Article 6(1)(f)) — to maintain, secure, and improve the app.',
						'Marketing communications and promotional notifications: processed on the legal basis of your consent (GDPR Article 6(1)(a)). You may withdraw consent at any time via app settings or by contacting us.'
					]
				},
				{
					title: 'Data retention',
					bullets: [
						'We keep personal information only for as long as needed to provide the app, fulfill the purposes described here, or meet legal and operational requirements.',
						'When you delete your account, we remove all associated data immediately.',
						'Some records may remain in backups or logs for a limited time before they are overwritten or deleted.'
					]
				},
				{
					title: 'Sharing and transfers',
					bullets: [
						'We may share information with service providers who help us operate the app and deliver its features.',
						'We may disclose information when required by law, to protect rights and safety, or in connection with a merger, acquisition, or similar business transaction.',
						'If you choose to connect other services or submit content through an integrated feature, that information may be processed by the relevant provider as part of the feature you use.',
						"Firebase and other Google services used by this app may transfer your personal data to servers located in the United States. Such international transfers are governed by Google's Standard Contractual Clauses (SCCs) as approved by the European Commission, ensuring an adequate level of data protection."
					]
				},
				{
					title: 'Children',
					bullets: [
						'The app is not intended for children under the minimum age required by applicable law in their country. We do not knowingly collect personal information from them.',
						'If you believe a child has provided personal information, contact us so we can review and address it.'
					]
				},
				{
					title: 'Third-party services',
					bullets: [
						'The app uses Google Sign-In and Firebase Authentication for sign-in and account access.',
						'The app uses Firebase Firestore, Firebase Functions, Firebase Storage, Firebase App Check, and Firebase AI to store data, run backend features, protect the service, and support AI-assisted functions.',
						'The app uses Google ML Kit Text Recognition, Camera, Mobile Scanner, and Image Picker for receipt and barcode-related features.',
						'The app uses Connectivity Plus, Device Info Plus, Package Info Plus, In-App Update, and URL Launcher for connectivity checks, device diagnostics, app version checks, updates, and opening external links.'
					]
				},
				{
					title: 'Liability and warranty',
					bullets: [
						'The app is provided on an "as is" and "as available" basis without warranties of any kind.',
						'We do not guarantee uninterrupted availability, accuracy, or error-free operation of all features.',
						'To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of the app.'
					]
				},
				{
					title: 'Data breach notification',
					bullets: [
						'In the event of a personal data breach, we will notify the competent supervisory authority as soon as possible of becoming aware of the breach, where required by GDPR Article 33.',
						'If a breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly without undue delay, as required by GDPR Article 34.'
					]
				},
				{
					title: 'Governing law',
					bullets: [
						'This page and our data processing practices are governed by the laws of the Republic of Slovenia and applicable European Union regulations, including the General Data Protection Regulation (GDPR — Regulation (EU) 2016/679).',
						'You have the right to lodge a complaint with the Information Commissioner of the Republic of Slovenia (Informacijski pooblaščenec, www.ip-rs.si) if you believe your personal data is being processed unlawfully.'
					]
				},
				{
					title: 'Updates to this page',
					bullets: [
						'We may update this page at any time, and a revised version becomes effective immediately when it is posted unless stated otherwise.',
						'The date above shows when this page was last changed.'
					]
				}
			]
		}
	]
};
