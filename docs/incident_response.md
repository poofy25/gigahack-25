# Documentația Agentului AI pentru Raportarea Incidentelor Cyber

## Prezentare Generală

Acest agent AI este un sistem interactiv de raportare a incidentelor de securitate cibernetică, construit cu n8n și alimentat de Google Gemini. Agentul colectează informații despre incidentele cyber prin conversații naturale și generează rapoarte HTML profesionale care sunt trimise automat la autoritățile competente din Moldova.

## Arhitectura Agentului

### Componente de Bază

1. **Chat Trigger** - Interfață conversațională pentru utilizatori
2. **AI Agent** - Motor central de procesare și conversație
3. **Google Gemini Chat Model** - Model de limbaj pentru interacțiunea naturală
4. **Simple Memory** - Memorie conversațională pentru context
5. **Gmail Tool** - Sistem automat de trimitere a rapoartelor

### Stack Tehnologic

- **Platformă**: n8n workflow automation
- **Model AI**: Google Gemini Chat Model
- **Interfață**: Chat webhook public
- **Email**: Gmail API pentru trimiterea rapoartelor
- **Format Output**: HTML profesional pentru rapoarte

## Funcționalitate

### Obiectivul Principal

Agentul colectează informații despre incidente de securitate cibernetică în maxim 5 întrebări și generează un raport HTML profesional care este trimis automat autorităților din Moldova.

### Proces de Colectare Informații

#### Informații Obligatorii
1. **incident_description** - Descrierea detaliată a incidentului
2. **detection_date** - Data și ora exactă de detectare
3. **affected_system** - Sistemul sau serverul afectat

#### Informații Opționale
4. **detected_by** - Persoana care a detectat incidentul (implicit: "Administrator sistem")
5. **impact** - Serviciile care nu mai funcționează
6. **company_name** - Numele companiei afectate
7. **contact_data** - Date de contact

### Fluxul de Conversație

#### Faza 1: Salutul și Explicația
```
Salut! Sunt agentul pentru raportarea incidentelor cyber.

Îmi poți spune ce s-a întâmplat? Orice detalii ai - când, unde, 
cum ai observat problema, etc.

*Îți iau informațiile rapid și generez un raport profesional HTML pentru autorități*
```

#### Faza 2: Colectarea Informațiilor
Agentul pune întrebări directe și scurte pentru informațiile lipsă:
- "Când exact a fost detectat incidentul? (data și ora precisă)"
- "Ce sistem sau server este afectat?"
- "Cine a detectat prima dată problema?"
- "Ce servicii nu mai funcționează din cauza acestui incident?"

#### Faza 3: Generarea și Trimiterea Raportului
După colectarea informațiilor minime, agentul:
1. Generează raportul HTML profesional
2. Trimite raportul prin email la autoritățile competente
3. Confirmă trimiterea către utilizator

## Caracteristici Tehnice

### Configurația Workflow-ului

#### 1. Chat Trigger (When chat message received)
- **Tip**: Webhook public
- **ID Webhook**: `205f2710-0578-4919-aa63-8b4f887a6372`
- **Origini Permise**: Toate ("*")
- **Acces**: Public pentru utilizatori

#### 2. AI Agent (Motor Principal)
- **Sistem de Mesaje**: Specialist în securitate cibernetică
- **Prompt Principal**: Ghid pentru colectarea informațiilor
- **Limită Întrebări**: Maximum 5 întrebări
- **Format Output**: Raport HTML profesional

#### 3. Google Gemini Chat Model
- **Funcție**: Procesarea limbajului natural
- **Capabilități**: Conversație în română, înțelegere context
- **Integrare**: API Google Palm

#### 4. Simple Memory (Buffer Window)
- **Lungime Context**: 10 mesaje
- **Funcție**: Păstrarea istoricului conversației
- **Beneficiu**: Context continuu în conversație

#### 5. Gmail Tool (send incident email)
- **Destinatar**: mocreacgeorge@gmail.com
- **Subiect**: "Incident Report"
- **Expeditor**: AEGI
- **Format**: HTML în corpul emailului

### Specificații Tehnice

#### Webhook Configuration
```json
{
  "public": true,
  "mode": "webhook",
  "options": {
    "allowedOrigins": "*"
  },
  "webhookId": "205f2710-0578-4919-aa63-8b4f887a6372"
}
```

#### Email Configuration
```json
{
  "sendTo": "mocreacgeorge@gmail.com",
  "subject": "Incident Report",
  "senderName": "AEGI",
  "format": "HTML"
}
```

## Generarea Raportului HTML

### Structura Raportului

#### Header
- Logo și titlu oficial
- Informații despre organizația raportoare
- Timestamp-ul generării

#### Secțiunea Principală
- **Informații Incident**: Tabel structurat cu toate detaliile
- **Descrierea Incidentului**: Text detaliat
- **Data și Ora Detecției**: Format precis cu numere
- **Sistemul Afectat**: Specificații tehnice
- **Persoana care a Detectat**: Informații contact
- **Impactul**: Lista serviciilor afectate

#### Footer
- Informații de contact AEGI
- Timestamp complet al raportului
- Referință pentru urmărirea cazului

### Exemple de Format

#### Format GREȘIT (evitat):
```
Descrierea Incidentului: Landing page-ul personal nu poate fi accesat.
Data și Ora Detecției: Azi, la ora 4.
Sistemul/Serverul Afectat: Landing page-ul personal.
```

#### Format CORECT (utilizat):
```
Descrierea Incidentului: Site-ul web www.exemplu.md nu poate fi accesat 
de către utilizatori, returnând eroare 500 Internal Server Error.

Data și Ora Detecției: 14 septembrie 2025, ora 16:30

Sistemul/Serverul Afectat: Server web Apache pe www.exemplu.md (IP: 192.168.1.100)
```

## Reguli și Limitări

### Reguli de Operare

1. **Limita de Întrebări**: Maximum 5 întrebări per conversație
2. **Informații Minime**: Cel puțin 3 câmpuri obligatorii pentru generarea raportului
3. **Format Date**: Date și ore exacte, nu aproximative
4. **Limbaj**: Exclusiv în română
5. **Profesionalism**: Rapoarte formale pentru autorități

### Limitări Tehnice

1. **Memorie Conversație**: 10 mesaje în buffer
2. **Un Raport per Sesiune**: Fiecare conversație generează un singur raport
3. **Validare Minimă**: Agentul generează raportul cu informațiile disponibile
4. **Destinatar Fix**: Toate rapoartele merg la aceeași adresă

## Cazuri de Utilizare

### Scenarii Tipice

#### 1. Incident de Indisponibilitate
```
Utilizator: "Site-ul nostru nu mai funcționează de azi dimineață"
Agent: "Când exact a fost detectat incidentul? Ce adresă web?"
```

#### 2. Incident de Securitate
```
Utilizator: "Cineva a intrat în sistemul nostru"
Agent: "Ce sistem a fost compromis și când ați observat intruziunea?"
```

#### 3. Incident de Date
```
Utilizator: "Ne-au dispărut toate datele din baza de date"
Agent: "Ce bază de date și când ați observat prima dată problema?"
```

### Audiența Țintă

- **Administratori IT**: Raportarea rapidă a incidentelor
- **Manageri de Securitate**: Documentarea oficială
- **Proprietari de Business**: Raportarea la autorități
- **Personal Non-tehnic**: Interfață simplă pentru raportare

## Integrare și Acces

### Endpoint Chat
```
Webhook URL: /webhook/205f2710-0578-4919-aa63-8b4f887a6372
Metoda: POST/GET
Acces: Public
Format: JSON chat message
```

### Utilizare
1. Accesează URL-ul webhook-ului
2. Începe conversația descriind incidentul
3. Răspunde la întrebările agentului
4. Primește confirmarea trimiterii raportului

## Avantaje și Beneficii

### Pentru Utilizatori
- **Simplitate**: Conversație naturală, fără formulare complexe
- **Rapiditate**: Raport generat în sub 5 minute
- **Automatizare**: Trimitere automată la autorități
- **Profesionalism**: Format oficial pentru rapoarte

### Pentru Organizații
- **Conformitate**: Raportare corectă la autorități
- **Eficiență**: Reducerea timpului de procesare
- **Standardizare**: Format consistent al rapoartelor
- **Trasabilitate**: Istoric complet al incidentelor

## Îmbunătățiri și Dezvoltare Viitoare

### Funcționalități Planificate
- **Multi-destinatari**: Trimitere la mai multe autorități
- **Categorii Incidente**: Clasificare automată
- **Dashboard**: Interfață web pentru monitorizare
- **Integrări**: Conectare cu sisteme SIEM

### Optimizări Tehnice
- **Validare Avansată**: Verificarea informațiilor
- **Template-uri**: Rapoarte specializate pe tip incident
- **Notificări**: Confirmări prin SMS sau alte canale
- **Analytics**: Statistici despre incidentele raportate

## Securitate și Confidențialitate

### Măsuri de Securitate
- **Webhook Securizat**: HTTPS pentru toate comunicările
- **Acces Controlat**: Monitorizarea utilizării
- **Date Sensibile**: Gestionarea corectă a informațiilor
- **Audit Trail**: Logarea tuturor acțiunilor

### Conformitate
- **GDPR**: Respectarea regulamentului de protecție a datelor
- **Legislația MD**: Conformitate cu legile locale
- **Confidențialitate**: Protecția informațiilor de incident
- **Retenția Datelor**: Politici clare de păstrare

---

## Contact și Suport Tehnic

Pentru asistență tehnică sau întrebări despre funcționarea agentului, contactați echipa de dezvoltare prin canalele oficiale ale organizației AEGI.