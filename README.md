# Wod Core Gym - Frontend



Αυτό είναι το **frontend** του Gym App (Wod Core Gym). Το frontend είναι φτιαγμένο με **React + TypeScript + Vite**, και επικοινωνεί με το backend μέσω REST API. Σκοπός του είναι να επιτρέπει στους χρήστες να κάνουν booking σε workout sessions, να βλέπουν τα bookings τους και να διαχειρίζονται sessions ανάλογα με τον ρόλο τους (CUSTOMER, TRAINER, ADMIN).

---

## Τεχνολογίες

- **React** (v18)
- **TypeScript**
- **Vite** (bundler & dev server)
- **Tailwind CSS** (UI styling)
- **Zod** (validation)
- **React Hook Form** (form handling)
- **React Router** (routing)
- **Sonner** (toast notifications)

---

## Ρόλοι & Δυνατότητες

| Ρόλος      | Δυνατότητες                                                            |
|------------|------------------------------------------------------------------------|
| CUSTOMER   | Δείτε διαθέσιμα Workout Sessions, κάνετε booking, δείτε τα bookings σας |
| TRAINER    | Όλα τα παραπάνω + δημιουργία, ενημέρωση και διαγραφή Workout Sessions διαχείριση χρηστών, προαγωγή CUSTOMER σε TRAINER |
| ADMIN      | Όλα τα παραπάνω      |

---

## Απαιτήσεις

- Node.js (>=18)
- npm ή yarn
- Backend σε λειτουργία (Spring Boot + MySQL)

---

## Ρύθμιση & Εκτέλεση

1. **Κλωνοποίηση του repo**
   ```bash
   git clone <git@github.com:bafatosuko/gym_app_frontend.git>
   cd frontend
   ```
   
2. **Εγκατάσταση dependencies**
    `npm install`

3. **Δημιουργήστε ένα αρχείο .env στο root του project**
   VITE_API_URL=http://localhost:8080/api/

4. Τρέξιμο σε development mode
   `npm run dev`

5. build
  `npm run build`


## Test Users!!
Αυτοί οι users φτιάχνονται κατεύθειαν απο το backend.Για πιο εύκολη χρήση της εφαρμογής.
### ADMIN
- username: admin@admin.gr
- password: !Test123

### Trainer

- username: trainer@trainer.gr
- password: !Test123

## Author
- CREATOR: ΚΩΝΣΤΑΝΤΙΝΟΥ Θωμάς
- Backend: Spring Boot + MySQL
- Frontend: React + TypeScript + Vite


