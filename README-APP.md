# FadyFit Apex — Athletic Bio-Engine & AI Health Architecture

Architecture conçue pour la compétition : **« Comment l'IA peut révolutionner le Bodybuilding, la Santé Physique et la Santé Mentale »**.
Développée sur mesure pour **Fady** (19 ans, 60 → 70 kg, Isola d'Elba, test football dans 8 semaines).

---

## 🌍 1. Tri-Lingual Internationalization Engine (i18n)
L'application intègre un switch instantané en haut à droite entre 3 langues :
- **Darija (DA) :** Vocabulaire authentique du plan de coaching, explications anatomiques et psychologiques directes.
- **Italiano (IT) :** Adapté à la vie quotidienne en Italie (Capoliveri / Portoferraio), rayons de supermarché (Conad/Coop), et terminologie pour le *Medico di base*.
- **English (EN) :** Standards internationaux de kinésiologie et science du sport.

---

## 🏋️ 2. Moteur de Kinésiologie & Biophénomènes Avancés
- **Calculateur 1RM Hybride (Brzycki + Epley) :**
  $$\text{Composite } 1\text{RM} = \frac{\frac{\text{Load}}{1.0278 - 0.0278 \times \text{Reps}} + \text{Load} \times \left(1 + \frac{\text{Reps}}{30}\right)}{2}$$
- **Volume Tonnage Accumulé :** Calcul en temps réel des kilogrammes totaux soulevés par séance ($\sum \text{Séries} \times \text{Reps} \times \text{Charge}$).
- **Surcompensation & Micro-charges :** Détection automatique du plafond de répétitions validées $\rightarrow$ signal d'augmentation de **+2.5 kg**.
- **Chronomètre de Repos Anabolique :** Animation SVG en anneau avec sons synthétiques Web Audio et haptique.

---

## 🧠 3. Santé Mentale & Défusion ACT (Acceptance & Commitment)
- **Traitement du Waswas Nocturne :** Déconstruction cognitive en temps réel des ruminations sur la santé et la peur de l'échec au test de football.
- **Protocole Circadien :** Décalage progressif du réveil (11h30 vers 09h00 verrouillé) avec ancrage lux matinal.
- **Export Clinique :** Téléchargement instantané des données en **JSON** et **CSV** pour le médecin et le préparateur physique.

---

## 📲 4. Installation sur iPhone 17 Pro Max

### Méthode A : Utilisation Immédiate (PWA Standalone 100% Plein Écran)
1. Lance le serveur local sur ton PC :
   ```powershell
   cd c:\Users\BOSS\gym\app
   npm run dev:host
   ```
2. Ouvre l'adresse IP affichée (ex: `http://192.168.1.XX:5173`) sur **Safari** sur ton iPhone.
3. Appuie sur **Partager** (icône rectangle avec flèche) $\rightarrow$ **« Sur l'écran d'accueil »**.
4. L'application se lance désormais comme une vraie app native, hors-ligne, sans barre de navigation, avec prise en charge du Dynamic Island !

### Méthode B : Génération du fichier `.IPA` pour Sideloadly
1. Le fichier de workflow automatisé est prêt dans : [build-ipa.yml](file:///c:/Users/BOSS/gym/.github/workflows/build-ipa.yml).
2. Lorsque le projet est synchronisé avec un repository GitHub (privé ou public) :
   - Va dans l'onglet **Actions** sur GitHub.
   - Sélectionne **« Build iOS IPA for Sideloadly »** et clique sur **« Run workflow »**.
   - Le serveur macOS gratuit de GitHub compile l'archive Xcode et produit `FadyFit.ipa` dans les **Artifacts** en 3 minutes.
3. Télécharge `FadyFit.ipa` sur ton PC.
4. Ouvre **Sideloadly**, glisse-dépose le fichier `FadyFit.ipa`, entre ton identifiant Apple ID gratuit, et clique sur **Start**.
5. L'application est installée directement sur ton iPhone 17 Pro Max !
