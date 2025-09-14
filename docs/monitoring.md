# Documentația Sistemului de Monitorizare Website

## Prezentare Generală

Acest sistem de monitorizare este un workflow n8n simplu și eficient care verifică automat disponibilitatea site-ului web la intervale regulate și trimite alertele prin email în cazul unei probleme. Sistemul monitorizează site-ul `https://unde.io/events` și notifică imediat administratorii în caz de indisponibilitate.

## Arhitectura Sistemului

### Componente de Bază

1. **Schedule Trigger** - Declanșator temporal pentru verificări periodice
2. **HTTP Request** - Client pentru testarea disponibilității site-ului
3. **Gmail Notification** - Sistem de alertă prin email

### Fluxul de Funcționare

```
Schedule Trigger (la fiecare 5 ore)
         ↓
HTTP Request (verificare site)
         ↓
   [Site OK] ← → [Site DOWN]
                     ↓
            Gmail Alert (notificare)
```

## Configurația Detaliată

### 1. Schedule Trigger (Declanșator Programat)

#### Parametri Configurați
- **Tip**: Schedule Trigger
- **Interval**: 300 minute (5 ore)
- **Tip Interval**: Minute
- **Funcționalitate**: Declanșează verificarea automată la fiecare 5 ore

#### Caracteristici
```json
{
  "rule": {
    "interval": [
      {
        "field": "minutes",
        "minutesInterval": 300
      }
    ]
  }
}
```

**Frecvența de Monitorizare:**
- 300 minute = 5 ore
- 4.8 verificări pe zi (24h/5h)
- Aproximativ 144 verificări pe lună

### 2. HTTP Request (Verificarea Site-ului)

#### Parametri Configurați
- **URL Monitorizat**: `https://unde.io/events`
- **Metodă**: GET (implicit)
- **Opțiuni Speciale**: Full Response activat
- **Gestionarea Erorilor**: Continue on Error Output

#### Funcționalitate
```json
{
  "url": "https://unde.io/events",
  "options": {
    "response": {
      "response": {
        "fullResponse": true
      }
    }
  },
  "onError": "continueErrorOutput"
}
```

#### Tipuri de Verificări
- **Status Code**: Verifică codurile de răspuns HTTP
- **Response Time**: Măsoară timpul de răspuns
- **Connection**: Testează conectivitatea la server
- **SSL/TLS**: Validează certificatele de securitate

### 3. Gmail Alert (Sistemul de Alertă)

#### Parametri Configurați
- **Destinatar**: mocreacgeorge@gmail.com
- **Subiect**: "A căzut site-ul"
- **Mesaj**: "A căzut site-ul"
- **Webhook ID**: b3008877-b0df-45d9-bcd9-f8777bde8578

#### Configurația Email
```json
{
  "sendTo": "mocreacgeorge@gmail.com",
  "subject": "A căzut site‐ul",
  "message": "A căzut site‐ul"
}
```

## Logica de Funcționare

### Fluxul Normal (Site Funcțional)
1. **Schedule Trigger** se activează la fiecare 5 ore
2. **HTTP Request** face o cerere GET la `https://unde.io/events`
3. **Site răspunde cu Status 200 OK**
4. **Workflow-ul se termină** - nu se trimite nicio alertă

### Fluxul de Alertă (Site Nefuncțional)
1. **Schedule Trigger** se activează la fiecare 5 ore
2. **HTTP Request** încearcă să acceseze site-ul
3. **Site nu răspunde** sau returnează eroare (4xx, 5xx)
4. **Cererea este direcționată către Error Output**
5. **Gmail Alert** trimite notificarea "A căzut site-ul"

### Scenarii de Alertă

#### Probleme de Conectivitate
- **Timeout de conexiune**: Server inaccesibil
- **DNS Resolution Error**: Problemă de rezolvare domeniu
- **Network Error**: Probleme de rețea

#### Erori de Server
- **500 Internal Server Error**: Problemă internă server
- **502 Bad Gateway**: Problemă proxy/load balancer
- **503 Service Unavailable**: Serviciu temporar indisponibil
- **504 Gateway Timeout**: Timeout la gateway

#### Erori de Client
- **404 Not Found**: Pagina nu există
- **403 Forbidden**: Acces interzis
- **401 Unauthorized**: Autentificare necesară

## Caracteristici Tehnice

### Avantaje ale Sistemului

#### Simplicitate
- **3 noduri** în workflow
- **Configurare minimă** necesară
- **Mentenanță redusă**
- **Înțelegere ușoară**

#### Fiabilitate
- **Continue on Error**: Nu se oprește la erori
- **Full Response**: Informații complete despre răspuns
- **Gmail Integration**: Serviciu de email stabil
- **Scheduled Execution**: Verificări automate

#### Eficiență
- **Resource Usage**: Minimal - doar o cerere HTTP la 5 ore
- **Network Load**: Impact foarte mic asupra site-ului
- **Cost**: Practic zero - folosește servicii gratuite

### Limitări Actuale

#### Funcționalități Lipsă
- **Detalii Error**: Mesajul de alertă nu specifică tipul de problemă
- **Recovery Notification**: Nu notifică când site-ul revine online
- **Multiple Recipients**: Un singur destinatar pentru alerte
- **Escalation**: Nu există nivele de escaladare

#### Îmbunătățiri Posibile
- **Rich Alerts**: Mesaje detaliate cu informații tehnice
- **Status Dashboard**: Interfață web pentru monitorizare
- **Multiple Sites**: Monitorizarea mai multor site-uri
- **SLA Reporting**: Rapoarte de disponibilitate

## Exemple de Utilizare

### Scenario 1: Site Funcțional
```
10:00 - Schedule se declanșează
10:01 - HTTP Request către https://unde.io/events
10:02 - Răspuns: 200 OK, content returnat
10:02 - Workflow terminat cu succes
```

### Scenario 2: Site Căzut
```
15:00 - Schedule se declanșează
15:01 - HTTP Request către https://unde.io/events
15:31 - Timeout după 30 secunde
15:31 - Error Output activat
15:32 - Gmail trimite "A căzut site-ul" la mocreacgeorge@gmail.com
15:32 - Workflow terminat
```

### Scenario 3: Server Error
```
20:00 - Schedule se declanșează
20:01 - HTTP Request către https://unde.io/events
20:02 - Răspuns: 500 Internal Server Error
20:02 - Error Output activat (status code != 2xx)
20:03 - Gmail trimite alertă
20:03 - Workflow terminat
```

## Configurare și Implementare

### Cerințe de Sistem
- **n8n Platform**: Versiune compatibilă cu nodurile folosite
- **Gmail Account**: Cont Google cu OAuth2 configurat
- **Internet Access**: Pentru accesul la site-ul monitorizat

### Pași de Configurare

#### 1. Configurarea Gmail
```bash
# Configurare credențiale Gmail OAuth2
1. Accesează Google Cloud Console
2. Creează proiect nou sau folosește unul existent
3. Activează Gmail API
4. Creează credențiale OAuth2
5. Configurează în n8n cu ID-ul: ns7089AmQaTQFjCL
```

#### 2. Testarea Sistemului
```bash
# Test manual workflow
1. Deschide workflow-ul în n8n
2. Execută manual Schedule Trigger
3. Verifică rezultatele HTTP Request
4. Testează trimiterea email-ului
```

### Monitorizarea Sistemului

#### Verificarea Funcționării
- **n8n Execution History**: Istoricul execuțiilor
- **Gmail Sent Items**: Verificarea email-urilor trimise
- **Error Logs**: Logurile de erori ale sistemului

#### Metrici Importante
- **Success Rate**: Procentul de verificări reușite
- **Response Time**: Timpul mediu de răspuns
- **Alert Frequency**: Frecvența alertelor trimise
- **Uptime**: Procentul de uptime al site-ului monitorizat

## Îmbunătățiri Recomandate

### Funcționalități Prioritare

#### 1. Mesaje de Alertă Îmbunătățite
```html
Subiect: [URGENT] Site-ul unde.io este nefuncțional
Mesaj: 
Site-ul https://unde.io/events este inaccesibil de la ora [timestamp].
Error: [detalii error]
Status Code: [cod status]
Response Time: [timp răspuns]
```

#### 2. Notificare de Recuperare
```html
Subiect: [INFO] Site-ul unde.io a revenit online
Mesaj:
Site-ul https://unde.io/events funcționează normal de la ora [timestamp].
Perioada de indisponibilitate: [durată]
```

#### 3. Multiple Recipients
```json
{
  "recipients": [
    "admin1@company.com",
    "admin2@company.com",
    "oncall@company.com"
  ]
}
```

### Funcționalități Avansate

#### 1. Health Check Complet
- Verificarea mai multor endpoint-uri
- Testarea funcționalităților critice
- Monitorizarea performanței

#### 2. Integrări Suplimentare
- **Slack/Discord**: Notificări în chat
- **SMS**: Alerte critice prin text
- **PagerDuty**: Integrare cu servicii de incident management

#### 3. Dashboard de Monitorizare
- Interfață web pentru status în timp real
- Grafice de disponibilitate
- Istoricul incidentelor

---

## Contact și Suport

Pentru modificări ale sistemului de monitorizare sau pentru a raporta probleme, contactați echipa tehnică responsabilă de infrastructura n8n.