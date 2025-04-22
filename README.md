# 🏆 Metrolympiades - Frontend

> ✨ Une appli sportive stylée pour organiser les *team buildings* comme jamais auparavant ✨

---

## 🔧 Avant de commencer

Avant de foncer tête baissée dans le code comme un rugbyman sur son essai, voici la première étape indispensable :

🧩 **Cloner l'API officielle dans le bon dossier !**

📁 Chemin :

cd src/api  
git clone https://github.com/ClementCatel/metrolympiades-api

➡️ N'oublie pas de lancer cette API en local pour que ton frontend puisse s'y connecter correctement.

---

## 🚀 Fonctionnalités principales

### ✅ Gestion des équipes

- 👤 Création de compte pour le chef d'équipe  
- ✍️ Ajout / suppression de membres dans son équipe  
- 🏷️ Changement du nom d'équipe  

### 🏟️ Matchs & scores

- 🆕 Création de matchs avec :
  - ⏰ Heure
  - 🆚 Équipe adverse
  - 🏅 Discipline
  - 📊 Score
- 🕹️ Effet parallax stylé sur la page de création de match 🎨

### 🧠 Vue détaillée d'une équipe adverse

- 🔍 Consulter les infos complètes d'une autre team

### 🧬 Disciplines personnalisées

- ➕ Création d'une nouvelle épreuve sportive

### 🏁 Classement général

- 📈 Affichage des points, classement et noms de toutes les équipes  
- 👥 Accessible à tout le monde (même sans compte)

---

## 🌈 Bonus & UX

- 🎉 Lancement automatique du serveur via script  
- 🔐 Routes protégées pour les chefs d'équipe uniquement  
- 🪄 Interface intuitive et responsive  
- 💬 Redirections automatiques après login/signup  
- 🧼 Clean UX : boutons désactivés si formulaire incomplet, gestion du loading, etc.

---

## ⚙️ Stack & bibliothèques utilisées

Voici les ingrédients secrets de notre potion magique :

- 🔁 axios — Pour parler à notre belle API REST  
- 🎭 concurrently — Pour lancer plusieurs serveurs en une commande (frontend + backend)  
- 📦 pinia — La gestion d'état moderne, légère et puissante  
- 🧭 vue-router — La navigation sans accroc  
- 🎨 lucide-vue-next — Des icônes SVG sublimes et élégantes  

---

## 🚚 Lancer le projet

Installe les dépendances puis lance le tout avec :

npm install  
npm run dev

🪄 Et magie... tout tourne comme sur des roulettes !

---

## 🤝 Contribuer

Tu veux apporter ta pierre à l’édifice sportif ? Go for it !

- Fork 💻  
- Code 👨‍💻  
- Commit 🔒 (avec des messages clairs et des gitmojis svp 😘)  
- PR 🚀

---

## ⭐ Liens utiles

- API officielle : https://github.com/ClementCatel/metrolympiades-api  
- Vue 3 Course : https://github.com/ClementCatel/vue3-course-2025  
- Cheat Sheet Vue : https://www.vuemastery.com/pdf/Vue-Essentials-Cheat-Sheet.pdf  

---

<div align="center">Made with 💚 in <strong>Vue.js</strong> & 🧠 by passionate devs 🚀</div>
