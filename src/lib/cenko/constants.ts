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

export const legalDataEn: LegalData = {
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
						'Content you add to the app, including shopping lists, receipts and other records.',
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
						'Account data (email address, profile information, app content): processed on the legal basis of performance of a contract (GDPR Article 6(1)(b)) — necessary to provide the service.',
						'Diagnostic and technical data (crash reports, performance metrics, device details): processed on the legal basis of legitimate interests (GDPR Article 6(1)(f)) — to maintain, secure, and improve the app.',
						'Marketing communications and promotional notifications: processed on the legal basis of your consent (GDPR Article 6(1)(a)). You may withdraw consent at any time by contacting us.'
					]
				},
				{
					title: 'Data retention',
					bullets: [
						'We keep personal information only for as long as your account exists. When you delete your account, we delete associated data.',
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

export const legalDataSl: LegalData = {
	lastEdited: '2026-05-17',
	contactEmail: 'lanlebar6@gmail.com',
	documents: [
		{
			id: 'legal',
			title: 'Pravne informacije',
			sections: [
				{
					title: 'Uporaba aplikacije Cenko',
					bullets: [
						'Dovoljena je zgolj uporaba aplikacije na zakonit način. Spoštujte pravice tretjih oseb in podjetij.',
						'Ne poskušajte posegati v delovanje aplikacije, izvajati obratnega inženiringa ali uporabljati aplikacije na način, ki bi lahko škodoval storitvi ali drugim uporabnikom.',
						'Ob ustvarjanju računa, prevzemate odgovornost za varovanje dostopa do računa in dejavnosti, ki potekajo prek njega.'
					]
				},
				{
					title: 'Podatki, ki jih obdelujemo',
					bullets: [
						'Podatki računa, kot so vaš e-poštni naslov in podatki profila.',
						'Vsebina, ki jo dodate v aplikacijo, vključno z nakupovalnimi seznami, računi in ostalimi zapisi.',
						'Tehnični podatki, kot so verzija aplikacije, podatki o napravi in diagnostični podatki, kadar so potrebni za delovanje aplikacije.',
						'Podatki o uporabi in analitiki, kot so ogledi zaslonov in interakcije s funkcijami, zbrani prek Firebase Analytics za razumevanje uporabe aplikacije.',
						'Poročila o napakah in meritve zmogljivosti, zbrane prek Firebase Crashlytics in Firebase Performance Monitoring za diagnosticiranje težav in izboljšanje stabilnosti.'
					]
				},
				{
					title: 'Vaše pravice',
					bullets: [
						'Zahtevate lahko dostop do svojih osebnih podatkov, njihov popravek ali izbris.',
						'Lahko ugovarjate določenim vrstam obdelave ali zahtevate omejitev obdelave, kjer je to primerno.',
						'Svoj račun in z njim povezane podatke lahko kadar koli izbrišete.',
						'Če imate vprašanja glede svojih pravic zasebnosti ali načinov obdelave podatkov, nas lahko kontaktirate.'
					]
				},
				{
					title: 'Kako uporabljamo podatke',
					bullets: [
						'Za zagotavljanje ključnih funkcij, kot so prijava, nakupovalni seznami, iskanje akcij, skeniranje računov in podpora.',
						'Za vzdrževanje, zaščito, odpravljanje težav in izboljšanje aplikacije.',
						'Za izpolnjevanje zakonskih, regulativnih in operativnih zahtev.'
					]
				},
				{
					title: 'Pravna podlaga za obdelavo (GDPR člen 6)',
					bullets: [
						'Podatki računa (e-poštni naslov, podatki profila, vsebina aplikacije): obdelujejo se na pravni podlagi izvajanja pogodbe (GDPR člen 6(1)(b)) — potrebno za zagotavljanje storitve',
						'Diagnostični in tehnični podatki (poročila o napakah, meritve zmogljivosti, podatki o napravi): obdelujejo se na pravni podlagi zakonitih interesov (GDPR člen 6(1)(f)) — za vzdrževanje, zaščito in izboljšanje aplikacije.',
						'Trženjska sporočila in promocijska obvestila: obdelujejo se na podlagi vaše privolitve (GDPR člen 6(1)(a)). Privolitev lahko kadar koli prekličete tako, da nas kontaktirate.'
					]
				},
				{
					title: 'Hramba podatkov',
					bullets: [
						'Osebne podatke hranimo le dokler obstaja vaš uporabniški račun. Ob izbrisu uporabniškega računa vse uporabniške podatke izbrišemo.',
						'Nekateri zapisi lahko za omejen čas ostanejo v varnostnih kopijah ali dnevnikih, preden so prepisani ali izbrisani.'
					]
				},
				{
					title: 'Deljenje in prenosi podatkov',
					bullets: [
						'Podatke lahko delimo s ponudniki storitev, ki nam pomagajo upravljati aplikacijo in zagotavljati njene funkcije.',
						'Podatke lahko razkrijemo, kadar to zahteva zakon, za zaščito pravic in varnosti ali v povezavi z združitvijo, prevzemom ali podobno poslovno transakcijo.',
						'Če se odločite povezati druge storitve ali oddati vsebino prek integrirane funkcije, lahko te podatke obdeluje ustrezni ponudnik kot del uporabljene funkcije.',
						'Firebase in druge Googlove storitve, uporabljene v tej aplikaciji, lahko prenašajo vaše osebne podatke na strežnike v Združenih državah Amerike. Takšni mednarodni prenosi so urejeni z Googlovimi Standardnimi pogodbenimi klavzulami (SCC), ki jih je odobrila Evropska komisija in zagotavljajo ustrezno raven varstva podatkov.'
					]
				},
				{
					title: 'Otroci',
					bullets: [
						'Aplikacija ni namenjena otrokom, mlajšim od minimalne starosti, zahtevane po veljavni zakonodaji njihove države. Zavestno ne zbiramo njihovih osebnih podatkov.',
						'Če menite, da je otrok posredoval osebne podatke, nas kontaktirajte, da to preverimo in ustrezno ukrepamo.'
					]
				},
				{
					title: 'Storitve tretjih oseb',
					bullets: [
						'Aplikacija uporablja Google Sign-In in Firebase Authentication za prijavo in dostop do računa.',
						'Aplikacija uporablja Firebase Firestore, Firebase Functions, Firebase Storage, Firebase App Check in Firebase AI za shranjevanje podatkov, izvajanje strežniških funkcij, zaščito storitve in podporo funkcijam z umetno inteligenco.',
						'Aplikacija uporablja Google ML Kit Text Recognition, Camera, Mobile Scanner in Image Picker za funkcije, povezane z računi in črtnimi kodami.',
						'Aplikacija uporablja Connectivity Plus, Device Info Plus, Package Info Plus, In-App Update in URL Launcher za preverjanje povezljivosti, diagnostiko naprave, preverjanje različice aplikacije, posodobitve in odpiranje zunanjih povezav.'
					]
				},
				{
					title: 'Odgovornost in garancija',
					bullets: [
						'Aplikacija je na voljo po načelu »takšna kot je« in »kot je na voljo«, brez kakršnih koli jamstev.',
						'Ne zagotavljamo neprekinjene razpoložljivosti, točnosti ali brezhibnega delovanja vseh funkcij.',
						'V največjem obsegu, ki ga dovoljuje zakon, ne odgovarjamo za posredno, naključno ali posledično škodo, ki izhaja iz uporabe aplikacije.'
					]
				},
				{
					title: 'Obveščanje o kršitvah varstva podatkov',
					bullets: [
						'V primeru kršitve varstva osebnih podatkov bomo pristojni nadzorni organ obvestili čim prej po zaznavi kršitve, kadar to zahteva GDPR člen 33.',
						'Če bi kršitev lahko povzročila veliko tveganje za vaše pravice in svoboščine, vas bomo brez nepotrebnega odlašanja neposredno obvestili, kot to zahteva GDPR člen 34.'
					]
				},
				{
					title: 'Veljavna zakonodaja',
					bullets: [
						'To besedilo in naše prakse obdelave podatkov urejajo zakoni Republike Slovenije in veljavni predpisi Evropske unije, vključno s Splošno uredbo o varstvu podatkov (GDPR — Uredba (EU) 2016/679).',
						'Če menite, da se vaši osebni podatki obdelujejo nezakonito, imate pravico vložiti pritožbo pri Informacijskem pooblaščencu Republike Slovenije (Informacijski pooblaščenec, www.ip-rs.si).'
					]
				},
				{
					title: 'Posodobitve te strani',
					bullets: [
						'To stran lahko kadar koli posodobimo, pri čemer spremenjena različica začne veljati takoj po objavi, razen če ni navedeno drugače.',
						'Zgornji datum prikazuje, kdaj je bila ta stran nazadnje spremenjena.'
					]
				}
			]
		}
	]
};