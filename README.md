# CyberDoc - Platformă de Conformitate Cibernetică și Evaluare Vulnerabilități

## Prezentare Generală

CyberDoc este o platformă comprehensivă de conformitate cibernetică și evaluare vulnerabilități, concepută special pentru întreprinderile din Moldova pentru a se conforma cu **Legea 142/2023** (Legea Cibernetică). Platforma combină scanarea automată de securitate cu evaluarea inteligentă a conformității pentru a ajuta organizațiile să evite amenzi de până la **15.000 MDL** pentru neconformitate.

Aplicația oferă un flux complet de audit cibernetic, de la evaluarea inițială prin scanarea vulnerabilităților până la îndrumări acționabile de remediere. Are o interfață modernă cu temă întunecată construită cu componente React și Tailwind CSS, cu baza de date PostgreSQL pentru persistența datelor folosind Drizzle ORM.

## Funcționalități Cheie

### 🔍 **Scanare Automată de Securitate**
- **Evaluarea Vulnerabilităților Domeniului**: Scanare comprehensivă a site-urilor web și aplicațiilor web
- **Detectarea Stack-ului Tehnologic**: Identificarea automată a framework-urilor, bibliotecilor și infrastructurii
- **Analiza Configurației SSL/TLS**: Validarea certificatelor și evaluarea puterii criptării
- **Validarea Antetelor de Securitate**: Detectarea antetelor de securitate lipsă sau configurate greșit
- **Scanarea Vulnerabilităților Dependențelor**: Identificarea pachetelor învechite cu probleme de securitate cunoscute

### 📋 **Chestionar de Evaluare a Conformității**
- **Chestionar Interactiv**: 100+ întrebări acoperind toate aspectele conformității cu Legea 142/2023
- **Rutare Bazată pe Risc**: Flux dinamic de întrebări bazat pe răspunsurile anterioare
- **Evaluarea Riscurilor în Timp Real**: Identificarea imediată a problemelor critice, înalte, medii și scăzute
- **Referințe la Articolele Legii**: Fiecare întrebare legată de cerințele legale specifice

### 📊 **Dashboard Comprehensiv de Rezultate**
- **Vizualizarea Scorului de Securitate**: Urmărirea progresului în timp real cu indicatori colorați
- **Managementul Elementelor de Acțiune**: Lista prioritară de îmbunătățiri de securitate cu analiza impactului asupra business-ului
- **Tabelul de Conformitate Tehnică**: Vulnerabilități tehnice detaliate cu locația și prioritatea
- **Urmărirea Progresului**: Statusul de completare pentru fiecare sarcină de remediere

### 🚨 **Sistemul de Raportare Incidente**
- **Generarea Automată de Rapoarte**: Crearea rapoartelor de incidente alimentată de AI
- **Notificarea Autorităților**: Trimiterea directă către autoritățile cibernetice din Moldova
- **Documentația Profesională**: Rapoarte formatate HTML care îndeplinesc standardele de reglementare

### 🎓 **Instruire și Conștientizare**
- **Instruirea de Securitate a Angajaților**: Module interactive pentru educația cibernetică a personalului
- **Îndrumări pentru Bunele Practici**: Instrucțiuni pas cu pas pentru îmbunătățiri de securitate
- **Foaia de Cale a Conformității**: Cronologia clară pentru atingerea conformității complete de reglementare

## Călătoria Utilizatorului

### 1. **Evaluarea Inițială** (`/`)
- Pagina de destinație explicând cerințele de conformitate cu Legea 142/2023
- Call-to-action clar pentru a începe procesul de auto-audit
- Informații despre amenzi potențiale și beneficiile conformității

### 2. **Verificarea Email-ului** (`/scan`)
- Verificarea email-ului corporativ pentru validarea organizației
- Formular simplu pentru a asigura utilizarea legitimă a business-ului

### 3. **Chestionarul de Conformitate** (`/survey`)
- Chestionar interactiv cu 100+ întrebări de conformitate
- Rutare dinamică bazată pe tipul de business și răspunsurile anterioare
- Evaluarea riscurilor în timp real și urmărirea progresului

### 4. **Scanarea de Securitate** (`/dashboard`)
- Scanarea automată a domeniului cu vizualizarea progresului
- Detectarea stack-ului tehnologic și evaluarea vulnerabilităților
- Statusul de scanare în timp real cu timpul estimat de completare

### 5. **Rezultate și Plan de Acțiune** (`/scan-results`)
- Scor comprehensiv de securitate și procentul de conformitate
- Elemente de acțiune prioritizate cu analiza impactului asupra business-ului
- Tabelul de conformitate tehnică cu informații detaliate despre vulnerabilități
- Instrucțiuni pas cu pas pentru remediere

### 6. **Raportarea Incidentelor** (`/scan-results/incident-report`)
- Generarea rapoartelor de incidente alimentată de AI
- Trimiterea directă către autoritățile cibernetice din Moldova
- Documentația profesională care îndeplinește standardele de reglementare

### 7. **Instruire și Educație** (`/scan-results/trainings`)
- Module de instruire pentru conștientizarea securității angajaților
- Îndrumări pentru bunele practici și conformitate
- Materiale de învățare interactive

## Arhitectura Sistemului

### Arhitectura Frontend
- **Framework**: Next.js 14 cu App Router pentru server-side rendering și rutare
- **Limbaj**: TypeScript pentru siguranța tipurilor și o experiență mai bună de dezvoltare
- **Biblioteca UI**: componente shadcn/ui construite pe primitive Radix UI pentru componente accesibile și personalizabile
- **Stilizare**: Tailwind CSS cu variabile CSS personalizate pentru teme și design responsiv
- **Managementul Stării**: TanStack Query (React Query) pentru managementul stării serverului și cache
- **Gestionarea Formularilor**: React Hook Form cu validare Zod pentru managementul formularilor type-safe

### Arhitectura Backend
- **Runtime**: Node.js cu configurare server personalizată folosind rutele API Next.js
- **Autentificare**: bcryptjs pentru hash-ul parolelor și autentificarea utilizatorilor
- **Managementul Sesiunilor**: Sesiuni bazate pe PostgreSQL folosind connect-pg-simple
- **Automatizare**: n8n workflow-uri pentru procesarea datelor și analiza AI

### Designul Bazei de Date
- **Baza de Date**: PostgreSQL cu hosting Supabase
- **Tabele**: Managementul utilizatorilor cu sistem de autentificare username/password
- **Conexiunea**: Driver Supabase pentru conexiuni eficiente cu baza de date

### Integrarea AI
- **Workflow-uri n8n**: Raportarea automată a incidentelor și analiza securității
- **Google Gemini**: Generarea rapoartelor alimentată de AI și evaluarea conformității
- **Integrarea Webhook**: Procesarea datelor în timp real și analiza
- **Output Structurat**: Rezultate formatate JSON pentru integrare fără probleme

### Instrumente de Dezvoltare
- **Sistemul de Build**: Next.js built-in bundling pentru dezvoltare și producție
- **Calitatea Codului**: TypeScript strict mode cu verificare comprehensivă a tipurilor
- **Serverul de Dezvoltare**: Next.js development server cu hot reload
- **Managementul Asset-urilor**: Gestionarea asset-urilor statice cu directorul public

### Strategia de Deployment
- **Build de Producție**: Next.js built-in bundling pentru optimizarea client-side și server-side
- **Variabile de Mediu**: SUPABASE_URL și SUPABASE_ANON_KEY necesare pentru conexiunea bazei de date
- **Hosting**: Deployment pe platforme compatibile cu Next.js (Vercel, Netlify, etc.)

## Componente Cheie

### Pagini și Rute
- **`/`** - Pagina de destinație cu prezentarea conformității și call-to-action
- **`/scan`** - Verificarea email-ului și validarea organizației
- **`/survey`** - Chestionar interactiv de conformitate cu rutare dinamică
- **`/dashboard`** - Progresul și statusul scanării de securitate
- **`/scan-results`** - Dashboard comprehensiv de rezultate cu elemente de acțiune
- **`/scan-results/incident-report`** - Sistem de raportare incidente alimentat de AI
- **`/scan-results/trainings`** - Module de instruire de securitate pentru angajați

### Componente de Bază
- **`PageLayout`** - Wrapper-ul principal de layout cu navigare și branding
- **`HeroSection`** - Secțiuni hero reutilizabile pentru pagini diferite
- **`FormSection`** - Componente de formular standardizate cu validare
- **`ScanningProgressCard`** - Vizualizarea progresului de scanare în timp real
- **`QuestionnaireCard`** - Componente interactive pentru întrebările chestionarului
- **`VulnerabilityDetailsDialog`** - Modal cu informații detaliate despre vulnerabilități

### Managementul Datelor
- **Datele Chestionarului** - 100+ întrebări de conformitate cu rutare bazată pe risc
- **API Mock** - Rezultate simulate de scanare și date de vulnerabilități
- **Definițiile de Tipuri** - Interfețe TypeScript comprehensive pentru toate structurile de date

## Dependențe Externe

### Servicii de Bază de Date
- **Supabase**: Platformă backend-as-a-service cu PostgreSQL și funcții serverless
- **PostgreSQL**: Baza de date relațională cu suport complet pentru SQL

### UI și Sistem de Design
- **Radix UI**: Primitive de componente accesibile pentru componente UI complexe
- **Tailwind CSS**: Framework CSS utility-first pentru dezvoltarea rapidă UI
- **Lucide React**: Biblioteca de icoane pentru iconografie consistentă
- **Inter Font**: Integrarea Google Fonts pentru tipografie

### AI și Automatizare
- **n8n**: Platformă de automatizare workflow pentru integrarea agentului AI
- **Google Gemini**: Model de limbaj mare pentru generarea rapoartelor și analiză
- **Integrarea Webhook**: Procesarea datelor în timp real și comunicare

### Instrumente de Dezvoltare și Build
- **Next.js**: Framework React cu built-in bundling și optimizări
- **TypeScript**: Verificarea statică a tipurilor și experiența îmbunătățită de dezvoltare
- **ESLint**: Linting pentru calitatea codului și consistența
- **PostCSS**: Procesarea CSS cu Tailwind CSS

### Autentificare și Securitate
- **bcryptjs**: Biblioteca de hash pentru parole pentru autentificarea securizată a utilizatorilor
- **connect-pg-simple**: Store de sesiuni PostgreSQL pentru managementul sesiunilor server-side

### Managementul Stării
- **TanStack Query**: Managementul stării serverului cu cache și sincronizare
- **React Hook Form**: Biblioteca de formular focusată pe performanță cu re-render-uri minime
- **Zod**: Biblioteca de validare schema pentru verificarea tipurilor la runtime

## Începerea

### Cerințe Preliminare
- Node.js 18+ 
- Cont Supabase pentru baza de date PostgreSQL
- npm sau yarn package manager

### Instalare
```bash
# Clonează repository-ul
git clone <repository-url>
cd cyberdoc

# Instalează dependențele
npm install

# Configurează variabilele de mediu
cp .env.example .env.local
# Editează .env.local cu credențialele Supabase și alte configurații

# Pornește serverul de dezvoltare
npm run dev
```

### Variabile de Mediu
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Funcționalități de Conformitate

### Conformitatea cu Legea 142/2023
- **Articolul 4**: Cerințele de prezență online și identificarea sistemelor
- **Articolul 5**: Obligațiile de măsuri de securitate și managementul riscurilor
- **Articolul 7**: Cerințele pentru personalul desemnat de securitate cibernetică
- **Articolul 8**: Obligațiile de raportare incidente și monitorizare

### Categoriile de Evaluare a Riscurilor
- **Critic**: Acțiune imediată necesară, potențial pentru amenzi semnificative
- **Înalt**: Lacune importante de securitate care necesită atenție promptă
- **Mediu**: Riscuri moderate cu îmbunătățiri recomandate
- **Scăzut**: Probleme minore pentru considerare viitoare

### Analiza Impactului asupra Business-ului
- **Impactul Financiar**: Amenzi potențiale și penalități
- **Impactul Operațional**: Continuitatea business-ului și disponibilitatea serviciilor
- **Impactul de Reputație**: Încrederea clienților și reputația mărcii
- **Impactul Legal**: Conformitatea de reglementare și răspunderea legală

## Contribuții

Acest proiect a fost dezvoltat pentru un hackathon și se concentrează pe ajutarea întreprinderilor din Moldova să atingă conformitatea cibernetică. Contribuțiile sunt binevenite pentru:

- Capabilități suplimentare de detectare vulnerabilități
- Analiză îmbunătățită alimentată de AI
- Experiența utilizatorului îmbunătățită și accesibilitatea
- Framework-uri suplimentare de conformitate și reglementări
- Optimizări de performanță și îmbunătățiri de scalabilitate

