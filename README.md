# 🏰 Clash Royale Deck Optimizer & Win Rate Predictor

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Scikit-Learn](https://img.shields.io/badge/Library-Scikit--Learn-orange)
![Status](https://img.shields.io/badge/Status-Completed-success)

> **A Hybrid Machine Learning System for Automating Competitive Deck Construction.**

## 📖 Overview
This project addresses the challenge of building optimal decks in the dynamic meta of **Clash Royale**. Instead of relying on manual trial-and-error, this system utilizes a **Hybrid Machine Learning** approach to analyze card synergies and predict deck performance.

By integrating **K-Means Clustering**, **Random Forest Regression**, and **K-Nearest Neighbors (KNN)**, the system can recommend statistically balanced decks with high potential win rates based on a single starter card input.

## 🚀 Key Features
* [cite_start]**Card Role Clustering:** Automatically groups cards into functional roles (Win Condition, Tank, Spell, etc.) using K-Means[cite: 34].
* [cite_start]**Win Rate Prediction:** Predicts the "Win/Loss" potential of a deck using a trained Random Forest model with >50% accuracy on unseen data[cite: 12].
* [cite_start]**Smart Recommendation:** Suggests complementary cards based on feature similarity using KNN to maintain deck synergy[cite: 40].
* [cite_start]**Meta-Valid Composition:** Ensures decks follow competitive rules (e.g., Must have 1 Win Condition, 1 Spell, Average Elixir 2.6 - 4.4)[cite: 494].

## 🛠️ Technology Stack
* [cite_start]**Language:** Python [cite: 200]
* [cite_start]**Environment:** Google Colaboratory / Jupyter Notebook [cite: 203]
* [cite_start]**Data Processing:** Pandas, NumPy [cite: 207, 210]
* [cite_start]**Machine Learning:** Scikit-learn (Sklearn) [cite: 212]
    * `StandardScaler` for Feature Normalization
    * `KMeans` for Unsupervised Clustering
    * `RandomForestRegressor` for Supervised Prediction
    * `NearestNeighbors` for Recommendation Engine

## 🧠 Methodology (How it Works)

The system operates through a 3-stage pipeline:

1.  **Preprocessing & Clustering (K-Means):** Raw card data (Stats: HP, DPS, Cost) is normalized using `StandardScaler`. [cite_start]K-Means groups the 103 cards into **8 Clusters** representing roles (e.g., Tanks, Swarm, Spells)[cite: 261, 262].

2.  **Evaluation Model (Random Forest):**
    The model is trained on **5,000 simulated decks** with strict composition rules. It learns the relationship between card combinations and historical Win Rates. [cite_start]The model prioritizes features like *Average Elixir* and *Spell Count*[cite: 488, 529].

3.  **Recommendation Engine (KNN):**
    [cite_start]When a user inputs a card (e.g., "Goblins"), KNN searches for the best "neighbors" in the feature space to complete the deck, ensuring the final combination has a predicted Win Rate of >50%[cite: 538, 541].

## 📊 Results & Performance

* [cite_start]**Prediction Accuracy:** The Random Forest model demonstrates a positive linear correlation between predicted and actual win rates (Low MAE)[cite: 512, 549].
* [cite_start]**Feature Importance:** Analysis reveals that **Average Elixir (~30%)** and **Spell Count** are the most critical factors for a winning deck[cite: 529].
* **Case Study:** * *Input:* "Goblins"
    * *Output Deck:* Electro Giant, Royal Hogs, Goblins, + Supports.
    * [cite_start]*Predicted Win Rate:* **60.09%**[cite: 541, 554].

## 📂 Repository Structure
├── data/ │ ├── clash_royale_cards.csv # Raw Dataset (103 Cards) │ └── synthetic_decks.csv # Training Data for Random Forest ├── notebooks/ │ └── Final_Project_Code.ipynb # Main Logic (Preprocessing, Training, Testing) ├── images/ # Graphs (Elbow Method, Scatter Plots) ├── requirements.txt # Python Dependencies └── README.md

## 👥 Authors
[cite_start]**Faculty of Advanced Technology and Multidiscipline, Universitas Airlangga** [cite: 4]

* **Dimas Ardhani Putra**
* **Achmad Akbar**
* **Bagas Pamungkas**
* **Haryo Seto Wicaksono**

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues/).

## 📜 License
This project is for academic purposes as a Final Project.

---
*Note: This project uses a dataset of 103 cards and simulates meta interactions based on historical data snapshots.*
