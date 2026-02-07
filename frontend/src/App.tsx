import { useState } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    AppBar,
    Toolbar,
    Stack,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    LinearProgress,
    Badge
} from '@mui/material'
import {
    Search,
    Translate,
    Dashboard as DashboardIcon,
    Work as WorkIcon,
    Home as HomeIcon,
    AccountCircle,
    NotificationsNone,
    Place,
    BookmarkBorder,
    ChevronRight,
    VerifiedUser,
    Public,
    FactCheck
} from '@mui/icons-material'
import { motion } from 'framer-motion'

// Translation Map
const translations = {
    bn: {
        tagline: "বিকল্পহীন সচ্ছতা",
        heroTitle: "গ্লোবাল মোবিলিটি।",
        heroHighlight: "পেশাগত উন্নতি।",
        heroSub: "skillconnect.my হলো গ্লোবাল ওয়ার্কফোর্সের জন্য একটি প্রিমিয়াম প্ল্যাটফর্ম। সোহেল তাসনীম ফাউন্ডেশন লিমিটেড (STFL)-এর মাধ্যমে দক্ষ পেশাদারদের ইতালিতে সমৃদ্ধি নিশ্চিত করি।",
        jobs: "চাকরি",
        dashboard: "ড্যাশবোর্ড",
        home: "মূল পাতা",
        categories: "বিভাগসমূহ",
        hotJobs: "হট করিডোর",
        searchJob: "মূল কাজ বা দক্ষতা...",
        searchLoc: "অবস্থান (যেমন: মিলান)",
        apply: "আবেদন করুন",
        status: "অবস্থা",
        date: "তারিখ",
        type: "ধরণ",
        recentJobs: "সম্প্রতিক পেশাদার তালিকা",
        myApplications: "আমার আবেদন সমূহ",
        prosperity: "সমৃদ্ধি",
        profileComplete: "প্রোফাইল পূর্ণতা",
        calibration: "ক্যালিব্রেশন অবস্থা",
        verified: "STFL দ্বারা যাচাইকৃত",
        global: "গ্লোবাল ম্যাচ",
        functional: "ফাংশনাল এরিয়া",
        industry: "ইন্ডাস্ট্রি",
        skillLevel: "দক্ষতা স্তর",
        process: "প্রক্রিয়া",
        contactBangladesh: "নাজমুল: +৮৮০১৮৬১৭৭৯৯০০ (বাংলাদেশ)",
        contactMalaysia: "ফিরদাউস: +৬০১৮৭৮৬৯৬১৯ (মালয়েশিয়া)",
        signupCTA: "সর্বশেষ তথ্য এবং চাকরির সংবাদের জন্য skillconnect.my-তে সাইন আপ করুন এবং এখন আপনার দক্ষতা ক্যালিব্রেট করুন!",
        processTitle: "বাংলাদেশ → ইতালি: কাজের ভিসা গাইড (Decreto Flussi)",
        processSub: "অফিসিয়াল প্রক্রিয়া + টাইমলাইন",
        timeline: "টাইমলাইন",
        sectors: "সেক্টরসমূহ",
        redflags: "সতর্কতা",
        scamAlert: "স্ক্যাম সতর্কতা (তাত্ক্ষণিক এড়িয়ে চলুন)",
        faq: "সাধারণ জিজ্ঞাসা (FAQ)",
        contactUs: "যোগাযোগ: +৮৮০১৮৬১৭৭৯৯০০",
        steps: [
            { title: "ধাপ ১ — Decreto Flussi ওপেনিং: Day 0", desc: "কোটা ওপেনিং হঠাৎ আসে; দ্রুত আবেদন না করলে স্লট শেষ হতে পারে।" },
            { title: "ধাপ ২ — এমপ্লয়ার প্রস্তুতি (আগে থেকেই): ৭–১৪ দিন", desc: "কাগজপত্র, ড্রাফট কন্ট্রাক্ট, একোমোডেশন ডিক্লারেশন—সব প্রস্তুত রাখতে হয়।" },
            { title: "ধাপ ৩ — Nulla Osta (ওয়ার্ক অথরাইজেশন): ৩০–৯০ দিন", desc: "এমপ্লয়ার যাচাই + অনুমোদন। এটা ছাড়া ভিসা স্টেপ এগোয় না।" },
            { title: "ধাপ ৪ — বাংলাদেশ ভিসা অ্যাপয়েন্টমেন্ট: ২–৬ সপ্তাহ", desc: "ভিএফএস/এম্বেসি অ্যাপয়েন্টমেন্ট লাইন বড় হলে সময় বাড়ে।" },
            { title: "ধাপ ৫ — ভিসা প্রসেসিং: ১–৩ সপ্তাহ", desc: "ফাইল ক্লিন হলে দ্রুত, ডক ঘাটতি হলে ডিলে।" },
            { title: "ধাপ ৬ — ইতালিতে আগমন: ভিসা পাওয়ার পর দ্রুত", desc: "এমপ্লয়ারকে দ্রুত রেসপন্ড করতে হয়।" },
            { title: "ধাপ ৭ — কন্ট্রাক্ট কনফার্মেশন: সর্বোচ্চ ৮ দিনের মধ্যে", desc: "ইতালিতে ঢোকার পরে নির্ধারিত সময়ের মধ্যে কন্ট্রাক্ট ফাইনালাইজ + রেসিডেন্স পারমিট কিট।" },
            { title: "ধাপ ৮ — রেসিডেন্স পারমিট প্রদান: ১–৪ মাস", desc: "কোয়েস্টুরা প্রসেসিং। অনেক ক্ষেত্রে অপেক্ষার মধ্যেও কাজ চালু থাকে।" }
        ],
        downloadsTitle: "ডাউনলোড",
        signupReqTitle: "সাইনআপের জন্য যা প্রয়োজন",
        reqMobile: "আবেদনকারীর নিজের নামে বিকাশ বা নগদ অ্যাকাউন্টসহ সচল মোবাইল নম্বর (তৃতীয় পক্ষের নাম গ্রহণযোগ্য নয়)",
        reqDocs: "জাতীয় পরিচয়পত্র (NID), জন্ম সনদ এবং পাসপোর্ট (ন্যূনতম ২ বছর মেয়াদ থাকতে হবে)",
        reqScan: "পাসপোর্টের সব পৃষ্ঠা কম্পিউটার স্ক্যান কপি (সর্বনিম্ন ৩৩০ DPI)",
        reqPolice: "পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (৬ মাসের বেশি পুরনো হওয়া যাবে না)",
        reqPhoto: "পাসপোর্ট সাইজ ছবি (৩ মাসের বেশি পুরনো হওয়া যাবে না)",
        reqMedical: "মেডিকেল ক্লিয়ারেন্স",
        reqWait: "সাবমিট করার পর ক্যালিব্রেশন অ্যাপয়েন্টমেন্টের জন্য কলের অপেক্ষা করুন। শিডিউল অনুযায়ী কয়েক দিন সময় লাগতে পারে।",
        downloadApp: "অ্যাপস্টোর বা প্লে-স্টোর থেকে অ্যাপ ডাউনলোড করুন",
        agreement: "চুক্তিপত্র",
        financialAid: "অ-স্থানীয় দক্ষ চাকরিজীবীদের জন্য আর্থিক সহায়তা",
        migrationForm: "বিশেষ মাইগ্রেশন ফর্ম",
        safetyCompliance: "নিরাপত্তা কমপ্লায়েন্স (D.Lgs. 81/08)",
        decretoFlussi: "Decreto Flussi নোটিস",
        nullaOstaForm: "Nulla Osta আবেদন ফর্ম",
        inpsReg: "INPS রেজিস্ট্রেশন",
        insurance: "বীমা",
        sampleDocs: "নমুনা নথি সেট (পাসপোর্ট, কন্ট্রাক্ট, ইত্যাদি)"
    },
    en: {
        tagline: "Uncompromising Transparency",
        heroTitle: "Global Mobility.",
        heroHighlight: "Professional Growth.",
        heroSub: "skillconnect.my is the premium bridge for the global workforce. We ensure prosperity in Italy through SohaelTasneem Foundation Ltd (STFL).",
        jobs: "Jobs",
        dashboard: "Dashboard",
        home: "Home",
        categories: "Categories",
        hotJobs: "Hot Corridor",
        searchJob: "Role or Skill...",
        searchLoc: "Location (e.g. Milan)",
        apply: "Apply Now",
        status: "Status",
        date: "Date",
        type: "Type",
        recentJobs: "Recent Professional Openings",
        myApplications: "My Applications",
        prosperity: "Prosperity",
        profileComplete: "Profile Completeness",
        calibration: "Calibration Status",
        verified: "STFL VERIFIED",
        global: "GLOBAL MATCH",
        functional: "Functional Area",
        industry: "Industry",
        skillLevel: "Skill Level",
        process: "Process",
        contactBangladesh: "Najmul: +8801861779900 (Bangladesh)",
        contactMalaysia: "Firdaus: +60187869619 (Malaysia)",
        signupCTA: "For all latest info and job news at skillconnect.my, signup and calibrate your skill now!",
        processTitle: "Bangladesh → Italy: Work Visa Guide (Decreto Flussi)",
        processSub: "Official Process + Timeline",
        timeline: "Timeline",
        sectors: "Sectors",
        redflags: "Alerts",
        scamAlert: "Scam Red Flags (Avoid Immediately)",
        faq: "FAQ",
        contactUs: "Contact: +8801861779900",
        steps: [
            { title: "Step 1 — Decreto Flussi Opens: Day 0", desc: "Opening comes suddenly; slots fill rapidly." },
            { title: "Step 2 — Employer Prep (Advance): 7–14 Days", desc: "Draft contracts, accommodation declarations—prep is key." },
            { title: "Step 3 — Nulla Osta (Authorization): 30–90 Days", desc: "Employer verification + approval. Crucial for visa." },
            { title: "Step 4 — Bangladesh Visa Appointment: 2–6 Weeks", desc: "VFS/Embassy wait times vary by season." },
            { title: "Step 5 — Visa Processing: 1–3 Weeks", desc: "Fast for clean files; delayed for doc gaps." },
            { title: "Step 6 — Arrival in Italy: Post-Visa", desc: "Quick coordination with employer is required." },
            { title: "Step 7 — Contract Confirmation: Within 8 Days", desc: "Contract finalized + residence permit kit upon entry." },
            { title: "Step 8 — Residence Permit Issuance: 1–4 Months", desc: "Questura processing. Work often starts during wait." }
        ],
        downloadsTitle: "Downloads",
        signupReqTitle: "Signup Requirements",
        reqMobile: "Valid mobile phone number with bKash or Nagad account under same applicant's name",
        reqDocs: "National ID, Birth certificate, and Passport (2 years validity remaining)",
        reqScan: "Passport: submit cover to cover computer scan copy (min 330 DPI)",
        reqPolice: "Police Clearance Certificate (not older than 6 months)",
        reqPhoto: "Photo: PP size (not older than 3 months)",
        reqMedical: "Medical clearance",
        reqWait: "After submission, wait for calibration appointment call. It may take several days.",
        downloadApp: "Download App from App Store or Play Store",
        agreement: "Agreement",
        financialAid: "Financial aid against non-local skilled job holders",
        migrationForm: "Special Migration Form",
        safetyCompliance: "Safety Compliance (D.Lgs. 81/08)",
        decretoFlussi: "Decreto Flussi Notice",
        nullaOstaForm: "Nulla Osta application form",
        inpsReg: "INPS registration",
        insurance: "Insurance",
        sampleDocs: "Sample document set (Passport, Contract, etc.)"
    },
    it: {
        tagline: "Trasparenza senza compromessi",
        heroTitle: "Mobilità Globale.",
        heroHighlight: "Crescita Professionale.",
        heroSub: "skillconnect.my è il ponte premium per la forza lavoro globale. Garantiamo prosperità in Italia attraverso SohaelTasneem Foundation Ltd (STFL).",
        jobs: "Lavori",
        dashboard: "Cruscotto",
        home: "Home",
        categories: "Categorie",
        hotJobs: "Corridoio Caldo",
        searchJob: "Ruolo o competenza...",
        searchLoc: "Località (es. Milano)",
        apply: "Candidati ora",
        status: "Stato",
        date: "Data",
        type: "Tipo",
        recentJobs: "Recenti Aperture Professionali",
        myApplications: "Le mie candidature",
        prosperity: "Prosperità",
        profileComplete: "Completezza Profilo",
        calibration: "Stato Calibrazione",
        verified: "VERIFICATO STFL",
        global: "MATCH GLOBALE",
        functional: "Area Funzionale",
        industry: "Settore",
        skillLevel: "Livello di Abilità",
        process: "Processo",
        contactBangladesh: "Najmul: +8801861779900 (Bangladesh)",
        contactMalaysia: "Firdaus: +60187869619 (Malesia)",
        signupCTA: "Per tutte le ultime info e novità sui lavori su skillconnect.my, iscriviti e calibra la tua abilità ora!",
        processTitle: "Bangladesh → Italia: Guida al Visto di Lavoro (Decreto Flussi)",
        processSub: "Processo Ufficiale + Cronologia",
        timeline: "Cronologia",
        sectors: "Settori",
        redflags: "Avvisi",
        scamAlert: "Segnali di Allarme Truffa (Evitare Immediatamente)",
        faq: "Domande Frequenti (FAQ)",
        contactUs: "Contatto: +8801861779900",
        steps: [
            { title: "Passaggio 1 — Apertura Decreto Flussi: Giorno 0", desc: "L'apertura avviene all'improvviso; i posti si esauriscono rapidamente." },
            { title: "Passaggio 2 — Prep. Datore di Lavoro (Anticipo): 7–14 Giorni", desc: "Bozze di contratti, dichiarazioni di alloggio: la preparazione è fondamentale." },
            { title: "Passaggio 3 — Nulla Osta (Autorizzazione): 30–90 Giorni", desc: "Verifica e approvazione del datore di lavoro. Cruciale per il visto." },
            { title: "Passaggio 4 — Appuntamento Visto Bangladesh: 2–6 Settimane", desc: "I tempi di attesa di VFS/Ambasciata variano a seconda della stagione." },
            { title: "Passaggio 5 — Elaborazione Visto: 1–3 Settimane", desc: "Veloce per file puliti; ritardato per lacune documentali." },
            { title: "Passaggio 6 — Arrivo in Italia: Dopo il Visto", desc: "È richiesto un rapido coordinamento con il datore di lavoro." },
            { title: "Passaggio 7 — Conferma del Contratto: Entro 8 Giorni", desc: "Contratto finalizzato + kit permesso di soggiorno all'ingresso." },
            { title: "Passaggio 8 — Rilascio Permesso di Soggiorno: 1–4 Mesi", desc: "Elaborazione in Questura. Il lavoro spesso inizia durante l'attesa." }
        ],
        downloadsTitle: "Download",
        signupReqTitle: "Requisiti di Registrazione",
        reqMobile: "Numero di cellulare valido con account bKash o Nagad a nome dello stesso richiedente",
        reqDocs: "ID nazionale, certificato di nascita e passaporto (2 anni di validità residua)",
        reqScan: "Passaporto: inviare copia scansione computer da copertina a copertina (min 330 DPI)",
        reqPolice: "Certificato di carichi pendenti (non più vecchio di 6 mesi)",
        reqPhoto: "Foto: formato PP (non più vecchia di 3 mesi)",
        reqMedical: "Certificato medico",
        reqWait: "Dopo l'invio, attendi la chiamata per l'appuntamento di calibrazione. Potrebbero volerci diversi giorni.",
        downloadApp: "Scarica l'app dall'App Store o da Play Store",
        agreement: "Contratto",
        financialAid: "Aiuto finanziario per lavoratori qualificati non locali",
        migrationForm: "Modulo di migrazione speciale",
        safetyCompliance: "Conformità alla sicurezza (D.Lgs. 81/08)",
        decretoFlussi: "Decreto Flussi",
        nullaOstaForm: "Modulo di domanda Nulla Osta",
        inpsReg: "Registrazione INPS",
        insurance: "Assicurazione",
        sampleDocs: "Set di documenti di esempio (Passaporto, Contratto, ecc.)"
    }
} as const

type Lang = keyof typeof translations
type Translation = (typeof translations)[Lang]

const CATEGORIES = [
    { bn: "ইলেকট্রিশিয়ান/ইলেকট্রনিক্স", en: "Electrician/Electronics", it: "Elettricista/Elettronica", count: 14 },
    { bn: "ড্রাইভার/অপারেটর", en: "Driver/Operator", it: "Autista/Operatore", count: 32 },
    { bn: "মেকানিক/টেকনিশিয়ান", en: "Mechanic/Technician", it: "Meccanico/Tecnico", count: 21 },
    { bn: "ওয়েল্ডার (TIG/MIG)", en: "Welder (TIG/MIG)", it: "Saldatore (TIG/MIG)", count: 9 },
    { bn: "নার্স/প্যারামেডিক", en: "Nurse/Paramedic", it: "Infermiere/Paramedico", count: 12 },
    { bn: "ডেলিভারি ম্যান", en: "Delivery Man", it: "Corriere", count: 45 },
    { bn: "গ্রাফিক ডিজাইনার", en: "Graphic Designer", it: "Grafico", count: 6 },
    { bn: "নির্মাণ শ্রমিক", en: "Construction Worker", it: "Operaio Edile", count: 58 },
    { bn: "আইটি সিস্টেম", en: "IT Systems", it: "Sistemi IT", count: 8 },
    { bn: "এনার্জি টেকনিশিয়ান", en: "Energy Tech", it: "Tecnico Energetico", count: 15 },
    { bn: "লজিস্টিকস/সাপ্লাই", en: "Logistics", it: "Logistica", count: 19 },
    { bn: "হোটেল/কুক", en: "Hotel/Cook", it: "Hotel/Cuoco", count: 22 },
]

type LayoutProps = {
    children: ReactNode
    lang: Lang
    setLang: Dispatch<SetStateAction<Lang>>
}

const Layout = ({ children, lang, setLang }: LayoutProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const location = useLocation()
    const t = translations[lang]

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#000000', color: '#FFFFFF' }}>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
                        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Box
                                component="img"
                                src={lang === 'bn' ? "/logo_bn.png" : "/logo_en.png"}
                                sx={{ height: 55, objectFit: 'contain' }}
                            />
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 700, border: location.pathname === '/' ? '2px solid #FFFFFF' : 'none' }}>{t.home}</Button>
                            <Button component={Link} to="/jobs" color="inherit" sx={{ fontWeight: 700, border: location.pathname === '/jobs' ? '2px solid #FFFFFF' : 'none' }}>{t.jobs}</Button>
                            <Button component={Link} to="/dashboard" color="inherit" sx={{ fontWeight: 700, border: location.pathname === '/dashboard' ? '2px solid #FFFFFF' : 'none' }}>{t.dashboard}</Button>
                            <Button component={Link} to="/process" color="inherit" sx={{ fontWeight: 700, border: location.pathname === '/process' ? '2px solid #FFFFFF' : 'none' }}>{t.process}</Button>

                            <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FFFFFF', mx: 2 }} />

                            <IconButton color="inherit" size="large">
                                <Badge variant="dot" color="primary">
                                    <NotificationsNone />
                                </Badge>
                            </IconButton>

                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
                                <Translate />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                <MenuItem onClick={() => { setLang('bn'); setAnchorEl(null); }}>BN - বাংলা</MenuItem>
                                <MenuItem onClick={() => { setLang('en'); setAnchorEl(null); }}>EN - English</MenuItem>
                                <MenuItem onClick={() => { setLang('it'); setAnchorEl(null); }}>IT - Italiano</MenuItem>
                            </Menu>
                            <IconButton color="inherit"><AccountCircle /></IconButton>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ pt: 14 }}>{children}</Box>

            {/* Footer */}
            <Box sx={{ borderTop: '2px solid #FFFFFF', py: 10, mt: 15, bgcolor: '#000000' }}>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sx={{ mb: 6 }}>
                            <Box
                                component="img"
                                src={lang === 'bn' ? "/logo_bn.png" : "/logo_en.png"}
                                sx={{ height: 45, objectFit: 'contain' }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>ABOUT HIREDLY</Typography>
                            <Stack spacing={1}>
                                {["About Us", "Contact Us", "Frequently Asked Questions", "Newsroom", "Skillconnect X"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>FOR JOBSEEKERS</Typography>
                            <Stack spacing={1}>
                                {["Advice", "Explore Companies", "Explore Job Opportunities", "Send Us Your Resume"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>FOR EMPLOYERS</Typography>
                            <Stack spacing={1}>
                                {["Why Skillconnect", "Terms of Use"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                                <Typography variant="h6" sx={{ fontWeight: 900, mt: 3, mb: 2 }}>TERMS & GUIDELINES</Typography>
                                {["Community Guidelines", "Privacy Policy", "Terms and Conditions"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                                <Typography variant="h6" sx={{ fontWeight: 900, mt: 3, mb: 2 }}>REGIONAL COORDINATION</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 700 }}>{t.contactBangladesh}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 700 }}>{t.contactMalaysia}</Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>OUR PARTNERS</Typography>
                            <Stack spacing={1}>
                                {["AirAsia Academy", "iTrain Asia", "Akademi GA", "LEAD", "CIMA", "Forward School", "SHRDC"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>BROWSE JOBS</Typography>
                            <Stack spacing={1}>
                                {[
                                    "Jobs by Company", "Jobs by Experience Level", "Jobs by Job Type",
                                    "Jobs by Location", "Jobs by Specialisation"
                                ].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>DIRECTORY</Typography>
                            <Stack spacing={1}>
                                {["Companies", "Advice"].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                                <Typography variant="h6" sx={{ fontWeight: 900, mt: 3, mb: 2 }}>ADVANCED SEARCH</Typography>
                                {[
                                    "By Location & Experience", "By Location & Job Type",
                                    "By Specialisation & Experience"
                                ].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>{t.downloadsTitle.toUpperCase()}</Typography>
                            <Stack spacing={1}>
                                {[
                                    t.agreement, t.financialAid, t.migrationForm, t.safetyCompliance,
                                    t.decretoFlussi, t.nullaOstaForm, t.inpsReg, t.insurance, t.sampleDocs
                                ].map(link => (
                                    <Typography key={link} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>{link}</Typography>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ opacity: 0.5 }}>
                                © {new Date().getFullYear()} skillconnect.my | SohaelTasneem Foundation Ltd (STFL) | Reg: 20221212
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

type HomeProps = {
    t: Translation
    lang: Lang
}

const Home = ({ t, lang }: HomeProps) => (
    <Container maxWidth="lg">
        <Box sx={{ py: 10, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Typography sx={{ border: '2px solid #FFFFFF', display: 'inline-block', px: 3, py: 1, mb: 6, fontWeight: 900, textTransform: 'uppercase' }}>
                    {t.tagline}
                </Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, mb: 4, lineHeight: 1 }}>
                    {t.heroTitle}<br />{t.heroHighlight}
                </Typography>
                <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', mb: 8, opacity: 0.8, lineHeight: 1.6 }}>
                    {t.heroSub}
                </Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button variant="contained" size="large" component={Link} to="/jobs">{t.jobs}</Button>
                    <Button variant="outlined" size="large">{t.prosperity}</Button>
                </Stack>
            </motion.div>
        </Box>

        {/* BDJobs Inspired Hot Corridor (Tiled Showcase) */}
        <Box sx={{ mt: 10, py: 8 }}>
            <Typography variant="h3" sx={{ mb: 4, textTransform: 'uppercase', borderLeft: '8px solid #FFFFFF', pl: 3 }}>
                🔥 {t.hotJobs}
            </Typography>
            <Grid container spacing={2}>
                {[
                    { title: "Senior Welder", org: "Fincantieri", loc: "Monfalcone", badge: "HIGH DEMAND" },
                    { title: "Logistics Lead", org: "MSC", loc: "Genoa", badge: "STFL PRIORITY" },
                    { title: "Systems Admin", org: "Leonardo", loc: "Rome", badge: "SKILLED MATCH" },
                    { title: "Precision Tech", org: "Eni", loc: "Milan", badge: "GLOBAL MATCH" },
                ].map((item, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { bgcolor: '#FFFFFF', color: '#000000' } }}>
                            <Typography variant="caption" sx={{ fontWeight: 900, mb: 1, display: 'block', opacity: 0.6 }}>{item.badge}</Typography>
                            <Typography variant="h5" sx={{ mb: 1, fontWeight: 900 }}>{item.title}</Typography>
                            <Typography variant="body2">{item.org}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.5 }}>{item.loc}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

        {/* Category Explorer (High-Density Grid) */}
        <Box sx={{ mt: 10, py: 8, borderTop: '2px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="h3" sx={{ mb: 6, fontWeight: 900 }}>{t.categories}</Typography>
            <Grid container spacing={1}>
                {CATEGORIES.map((cat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Box sx={{
                            p: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { border: '1px solid #FFFFFF', bgcolor: 'rgba(255,255,255,0.05)' }
                        }}>
                            <Typography variant="body2">{lang === 'bn' ? cat.bn : lang === 'en' ? cat.en : cat.it}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.5 }}>({cat.count})</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ mt: 15, py: 10, borderTop: '2px solid #FFFFFF' }}>
            <Typography variant="h3" sx={{ mb: 8, textAlign: 'center', fontWeight: 900 }}>CALIBRATION LIFECYCLE</Typography>
            <Grid container spacing={4}>
                {[
                    { icon: <VerifiedUser sx={{ fontSize: 40 }} />, title: "Verification", desc: "Native documentation and skill validation through STFL." },
                    { icon: <Public sx={{ fontSize: 40 }} />, title: "Mobility", desc: "End-to-end logistics for the Bangladesh-Italy labor corridor." },
                    { icon: <FactCheck sx={{ fontSize: 40 }} />, title: "Dignity", desc: "Ensuring fair treatment and competitive compensation globally." },
                ].map((item, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Box sx={{ p: 4, border: '2px solid #FFFFFF', height: '100%' }}>
                            {item.icon}
                            <Typography variant="h4" sx={{ my: 2 }}>{item.title}</Typography>
                            <Typography variant="body1" sx={{ opacity: 0.7 }}>{item.desc}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ mt: 10, mb: 15, p: { xs: 4, md: 8 }, bgcolor: '#FF2D8D', color: '#FFFFFF', textAlign: 'center', border: '4px solid #FFFFFF' }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>JOIN THE CALIBRATION</Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>{t.signupCTA}</Typography>
            <Button
                component={Link}
                to="/jobs"
                size="large"
                sx={{
                    bgcolor: '#FFFFFF',
                    color: '#FF2D8D',
                    fontWeight: 900,
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    mb: 4,
                    '&:hover': { bgcolor: '#EEEEEE' }
                }}
            >
                {lang === 'bn' ? 'এখনই সাইন আপ করুন' : 'SIGN UP NOW'}
            </Button>

            <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.3)' }} />

            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>{t.signupReqTitle.toUpperCase()}</Typography>
            <Grid container spacing={4} sx={{ textAlign: 'left', mb: 6 }}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="body1">✅ <strong>{t.reqMobile}</strong></Typography>
                        <Typography variant="body1">✅ {t.reqDocs}</Typography>
                        <Typography variant="body1">✅ {t.reqScan}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="body1">✅ {t.reqPolice}</Typography>
                        <Typography variant="body1">✅ {t.reqPhoto}</Typography>
                        <Typography variant="body1">✅ {t.reqMedical}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mt: 2, p: 2, border: '1px dashed #FFFFFF', textAlign: 'center' }}>
                        📌 <em>{t.reqWait}</em>
                    </Typography>
                </Grid>
            </Grid>

            {/* App Download Buttons */}
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 8 }}>
                <Button variant="outlined" color="inherit" sx={{ borderColor: '#FFFFFF', borderSize: 2 }}>App Store</Button>
                <Button variant="outlined" color="inherit" sx={{ borderColor: '#FFFFFF', borderSize: 2 }}>Play Store</Button>
            </Stack>

            <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>🇧🇩 {t.contactBangladesh}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>🇲🇾 {t.contactMalaysia}</Typography>
            </Stack>
        </Box>
    </Container>
)

const Jobs = ({ t }: any) => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 6 }}>
                <Typography variant="h2" sx={{ mb: 6, fontWeight: 900 }}>{t.recentJobs}</Typography>

                {/* Discovery Tabs (Hiredly x BDJobs Fusion) */}
                <Stack direction="row" spacing={0} sx={{ mb: 4, borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                    {[t.functional, t.industry, t.skillLevel].map((tab, idx) => (
                        <Button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            sx={{
                                border: 'none',
                                borderBottom: activeTab === idx ? '4px solid #FFFFFF' : 'none',
                                opacity: activeTab === idx ? 1 : 0.5,
                                px: 4,
                                py: 2
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Stack>

                {/* Developed Dual Search Bar */}
                <Box sx={{ mb: 8, display: 'flex', gap: 0 }}>
                    <TextField
                        fullWidth
                        placeholder={t.searchJob}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#FFFFFF' }} /></InputAdornment>,
                            sx: { bgcolor: '#000000' }
                        }}
                    />
                    <TextField
                        sx={{ width: '400px', bgcolor: '#000000' }}
                        placeholder={t.searchLoc}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Place sx={{ color: '#FFFFFF' }} /></InputAdornment>,
                        }}
                    />
                    <Button variant="contained" sx={{ px: 6, borderLeft: 'none' }}>GO</Button>
                </Box>

                <Grid container spacing={4}>
                    {[
                        { title: "Specialized Welder (TIG/MIG)", location: "Brescia, IT", salary: "€2,800 - 3,200", badges: [t.global, t.verified], date: "2 days ago" },
                        { title: "Network Systems Engineer", location: "Rome, IT", salary: "€3,500 - 4,200", badges: [t.verified], date: "1 week ago" },
                        { title: "Renewable Energy Tech", location: "Palermo, IT", salary: "€2,500 - 3,000", badges: [t.global], date: "Just now" },
                        { title: "Heavy Equipment Operator", location: "Genoa, IT", salary: "€3,000", badges: [t.global, t.verified], date: "3 days ago" },
                    ].map((job, i) => (
                        <Grid item xs={12} key={i}>
                            <Card sx={{ p: i === 0 ? 5 : 4, position: 'relative', '&:hover': { bgcolor: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent' } }}>
                                <IconButton sx={{ position: 'absolute', top: 20, right: 20, color: '#FFFFFF' }}><BookmarkBorder /></IconButton>
                                <Grid container alignItems="center">
                                    <Grid item xs={12} md={8}>
                                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                            {job.badges.map((b, bi) => (
                                                <Box key={bi} sx={{ px: 1, py: 0.2, bgcolor: '#FFFFFF', color: '#000000', fontSize: '0.65rem', fontWeight: 900 }}>
                                                    {b}
                                                </Box>
                                            ))}
                                        </Stack>
                                        <Typography variant="h3" sx={{ mb: 1 }}>{job.title}</Typography>
                                        <Stack direction="row" spacing={3} sx={{ opacity: 0.7 }}>
                                            <Typography variant="body1">{job.location}</Typography>
                                            <Typography variant="body1">• {job.date}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' }, mt: { xs: 3, md: 0 } }}>
                                        <Typography variant="h4" sx={{ mb: 2 }}>{job.salary}</Typography>
                                        <Button variant="contained" endIcon={<ChevronRight />}>{t.apply}</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

const Dashboard = ({ t }: any) => (
    <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
            <Typography variant="h2" sx={{ mb: 8, fontWeight: 900 }}>{t.dashboard}</Typography>

            <Grid container spacing={4}>
                {/* Profile Progress Widget */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 5, height: '100%', bgcolor: '#FFFFFF', color: '#000000' }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>{t.profileComplete}</Typography>
                        <Typography variant="h1" sx={{ mb: 2 }}>85%</Typography>
                        <LinearProgress variant="determinate" value={85} color="inherit" sx={{ height: 12, bgcolor: 'rgba(0,0,0,0.1)' }} />
                        <Typography variant="body1" sx={{ mt: 4, fontWeight: 700 }}>Next: ID Verification</Typography>
                    </Card>
                </Grid>

                {/* Calibration Stream Widget */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Typography variant="h4" sx={{ fontWeight: 900 }}>{t.myApplications}</Typography>
                        <Button variant="text" color="inherit" sx={{ border: 'none', '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}>VIEW ALL</Button>
                    </Box>
                    <TableContainer component={Paper} elevation={0} sx={{ border: '2px solid #FFFFFF' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#FFFFFF' }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#000000', fontWeight: 900, fontSize: '1.1rem' }}>PROGRAM/ROLE</TableCell>
                                    <TableCell sx={{ color: '#000000', fontWeight: 900, fontSize: '1.1rem' }}>{t.date}</TableCell>
                                    <TableCell sx={{ color: '#000000', fontWeight: 900, fontSize: '1.1rem' }}>{t.status}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    { job: "ITALY CORRIDOR - SENIOR WELDER", date: "FEB 01, 2026", status: "STFL VERIFYING" },
                                    { job: "MALAYSIA MATCH - NETWORK ENG", date: "JAN 12, 2026", status: "INTERVIEW" },
                                    { job: "GENOA HUB - HEAVY OPERATOR", date: "JAN 05, 2026", status: "MATCHED" },
                                ].map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell sx={{ py: 3, fontWeight: 700 }}>{row.job}</TableCell>
                                        <TableCell sx={{ py: 3, opacity: 0.8 }}>{row.date}</TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Box sx={{ border: '2px solid #FFFFFF', px: 2, py: 0.5, fontWeight: 900, fontSize: '0.8rem' }}>
                                                {row.status}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Regional Insight Widget (Fusion) */}
                <Grid item xs={12}>
                    <Box sx={{ p: 4, border: '2px solid #FFFFFF', mt: 4 }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 900 }}>REGIONAL CALIBRATION INSIGHT (BD)</Typography>
                        <Grid container spacing={4}>
                            {[
                                { div: "Dhaka", count: "1,240 workers" },
                                { div: "Chattogram", count: "890 workers" },
                                { div: "Sylhet", count: "450 workers" },
                                { div: "Khulna", count: "320 workers" },
                            ].map((reg, i) => (
                                <Grid item xs={12} sm={3} key={i}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{reg.div}</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.6 }}>{reg.count}</Typography>
                                    <LinearProgress variant="determinate" value={70 - i * 15} color="inherit" sx={{ mt: 1, height: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Container>
)

type ProcessProps = {
    t: Translation
    lang: Lang
}

const Process = ({ t, lang }: ProcessProps) => (
    <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box sx={{ p: 6, border: '2px solid #FFFFFF', mb: 8, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>{t.processTitle}</Typography>
                    <Typography variant="h5" sx={{ opacity: 0.8, mb: 4 }}>{t.processSub}</Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center">
                        <Box sx={{ p: 2, border: '2px solid #FF2D8D', bgcolor: 'rgba(255, 45, 141, 0.1)' }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#FF2D8D' }}>{t.contactBangladesh}</Typography>
                        </Box>
                        <Box sx={{ p: 2, border: '2px solid #00D1FF', bgcolor: 'rgba(0, 209, 255, 0.1)' }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#00D1FF' }}>{t.contactMalaysia}</Typography>
                        </Box>
                    </Stack>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ mb: 4, fontWeight: 900 }}>🟦 {t.timeline}</Typography>
                        <Stack spacing={2}>
                            {t.steps.map((step: any, i: number) => (
                                <Card key={i} sx={{ p: 3, borderLeft: '8px solid #FFFFFF' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>{step.title}</Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>{step.desc}</Typography>
                                </Card>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 4, height: '100%', border: '2px solid #FFFFFF' }}>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>🌾 {lang === 'bn' ? 'কৃষি' : 'Agriculture'}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>{lang === 'bn' ? '৩-৯ মাসের সিজনাল কোটা।' : '3-9 month seasonal quotas.'}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 4, height: '100%', border: '2px solid #FFFFFF' }}>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>🏗️ {lang === 'bn' ? 'নির্মাণ' : 'Construction'}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>{lang === 'bn' ? 'স্কিলড এবং সেমি-স্কিলড রোল।' : 'Skilled and semi-skilled roles.'}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 4, height: '100%', border: '2px solid #FFFFFF' }}>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>👵 {lang === 'bn' ? 'কেয়ারগিভার' : 'Caregiver'}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>{lang === 'bn' ? 'চাহিদা বেশি, ভেরিফিকেশন কঠিন।' : 'High demand, strict verification.'}</Typography>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ p: 5, bgcolor: '#FF0000', color: '#FFFFFF', border: '4px solid #FFFFFF', mt: 4 }}>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>🚫 {t.scamAlert}</Typography>
                            <Grid container spacing={2}>
                                {(lang === 'bn' ? [
                                    "এমপ্লয়ার ছাড়া ইতালি ভিসা — সম্ভব নয়",
                                    "কোটা ১০০% গ্যারান্টি — প্রতারণা",
                                    "আগে টাকা পরে জব — রেড ফ্ল্যাগ"
                                ] : [
                                    "Visa without Employer — Impossible",
                                    "100% Quota Guarantee — Scam",
                                    "Money first, Job later — Red Flag"
                                ]).map((flag: string, i: number) => (
                                    <Grid item xs={12} key={i}>
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>• {flag}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    </Container>
)

function App() {
    const [lang, setLang] = useState<Lang>('bn')
    const t = translations[lang]

    return (
        <Layout lang={lang} setLang={setLang}>
            <Routes>
                <Route path="/" element={<Home t={t} lang={lang} />} />
                <Route path="/jobs" element={<Jobs t={t} />} />
                <Route path="/dashboard" element={<Dashboard t={t} />} />
                <Route path="/process" element={<Process t={t} lang={lang} />} />
            </Routes>
        </Layout>
    )
}

export default App
