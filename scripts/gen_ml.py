"""
Introduction to Machine Learning (ECEg5407) - All 5 Chapters
Authoritative References:
- Andreas C. Müller & Sarah Guido: Introduction to Machine Learning with Python (O'Reilly)
- Christopher M. Bishop: Pattern Recognition and Machine Learning (Springer)
- Aurélien Géron: Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow
- AASTU Official Slide Decks (Instructors: Berta Delango & Bayable Teshome)
"""

def get_ml_notes():
    return {
        "eceg5407-ch1": {
            "courseId": "eceg5407",
            "courseCode": "ECEg5407",
            "chapterNum": 1,
            "title": "Introduction to Machine Learning & Core Python Stack",
            "readTime": "11 min read",
            "cloRef": "CLO1: Define machine learning paradigms and utilize NumPy, Pandas, Scikit-Learn",
            "authoritativeSources": "Müller & Guido (Ch. 1); Bishop (Ch. 1); AASTU Slide Deck Ch. 1",
            "sections": [
                {
                    "id": "ml-1-1",
                    "heading": "1.1 Machine Learning Definition & The Paradigm Shift",
                    "content": """Arthur Samuel (1959) defined **Machine Learning** as the *\"field of study that gives computers the ability to learn without being explicitly programmed.\"*

Tom Mitchell (1997) provided the operational engineering definition:
> *A computer program is said to learn from experience $E$ with respect to some class of tasks $T$ and performance measure $P$, if its performance at tasks in $T$, as measured by $P$, improves with experience $E$.*

### The Paradigm Shift: Classical Programming vs Machine Learning
- **Classical Software Engineering:**
  $$\\text{Rules (Algorithm)} + \\text{Data} \\longrightarrow \\text{Answers}$$
  A human software engineer writes explicit `if-else` rules. Fails for perception tasks (e.g., distinguishing a cat from a dog in a $1000 \\times 1000$ pixel grid).
- **Machine Learning Paradigm:**
  $$\\text{Data} + \\text{Answers (Labels)} \\longrightarrow \\text{Rules (Learned Model Parameters } \\theta)$$
  The algorithm automatically extracts statistical patterns and decision boundaries from historical training examples."""
                },
                {
                    "id": "ml-1-2",
                    "heading": "1.2 Taxonomy of Machine Learning Paradigms",
                    "content": """Machine learning problems are categorized into three broad paradigms based on supervision signal:

| Paradigm | Nature of Training Data | Objective / Loss Function | Canonical Real-World Applications |
|---|---|---|---|
| **Supervised Learning** | Input features $X$ paired with ground-truth targets $y$: $\\mathcal{D} = \\{(x_i, y_i)\\}_{i=1}^N$ | Minimize prediction error: $\\min_\\theta \\sum \\mathcal{L}(f(x_i; \\theta), y_i)$ | **Classification:** Spam filtering, medical tumor diagnosis.<br>**Regression:** Stock price forecasting, housing appraisal. |
| **Unsupervised Learning** | Unlabeled data points $X$ only: $\\mathcal{D} = \\{x_i\\}_{i=1}^N$ | Discover latent structure, probability density, or low-dimensional manifolds | **Clustering:** Customer market segmentation.<br>**Dimensionality Reduction:** PCA compression, gene expression visualization. |
| **Reinforcement Learning** | No static dataset; an **Agent** interacts with a dynamic **Environment** | Maximize cumulative discounted future reward: $\\max_\\pi \\mathbb{E}\\left[\\sum_{t=0}^\\infty \\gamma^t R_t\\right]$ | Autonomous driving, robotic manipulation, AlphaGo, LLM RLHF fine-tuning. |"""
                },
                {
                    "id": "ml-1-3",
                    "heading": "1.3 Mathematical Data Representation: Feature Matrices & Target Vectors",
                    "content": """In Scikit-Learn and tabular machine learning:

### 1. The Feature Matrix ($X$):
Represented as a 2-dimensional NumPy array or Pandas DataFrame of shape $(n_{samples}, n_{features})$:
$$X = \\begin{bmatrix} x_{11} & x_{12} & \\dots & x_{1d} \\\\ x_{21} & x_{22} & \\dots & x_{2d} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ x_{n1} & x_{n2} & \\dots & x_{nd} \\end{bmatrix} \\in \\mathbb{R}^{n \\times d}$$
- Each **row** represents an individual sample/instance (e.g., a patient, an email).
- Each **column** represents a quantitative feature/attribute (e.g., age, blood pressure, cholesterol).

### 2. The Target Vector ($y$):
A 1-dimensional array of length $n_{samples}$:
$$y = [y_1, y_2, \\dots, y_n]^T \\in \\mathbb{R}^n$$
- Continuous real values ($y_i \\in \\mathbb{R}$) for **Regression**.
- Discrete categorical integers ($y_i \\in \\{0, 1, \\dots, K-1\\}$) for **Classification**."""
                },
                {
                    "id": "ml-1-4",
                    "heading": "1.4 The Scientific Python Machine Learning Ecosystem",
                    "content": """The Python machine learning stack is built on four core libraries:

1. **NumPy (Numerical Python):** Provides the foundational $N$-dimensional array (`ndarray`) with C-speed vectorized contiguous memory operations and linear algebra routines (`np.linalg`).
2. **Pandas:** High-performance tabular data structures (`DataFrame`, `Series`) providing SQL-like filtering, handling missing data (`NaN`), and merging datasets.
3. **Scikit-Learn (`sklearn`):** The standard machine learning library designed with a uniform, object-oriented API:
   - `Estimator.fit(X, y)`: Trains the model on historical training data.
   - `Estimator.predict(X_new)`: Generates predictions on unseen test samples.
   - `Transformer.transform(X)`: Applies data preprocessing (scaling, imputation).
4. **Matplotlib & Seaborn:** Publication-quality scientific data visualization (scatter plots, heatmaps, decision boundaries)."""
                },
                {
                    "id": "ml-1-5",
                    "heading": "1.5 Data Splitting & The Golden Rule of Machine Learning",
                    "content": """### Train / Validation / Test Splitting:
Evaluating a machine learning model on the exact same data used to train it is a fatal methodological error (equivalent to giving students exam questions before the test).
- **Training Set ($60 - 80\\%$):** Used by the optimizer to adjust internal parameters $\\theta$.
- **Validation Set ($10 - 20\\%$):** Used to tune hyper-parameters (e.g., $k$ in $k$-NN, regularization $\\lambda$) and perform early stopping.
- **Test Set ($10 - 20\\%$):** Held out completely in a "vault" until final sign-off to provide an unbiased estimate of real-world generalization performance.

> [!CAUTION]
> **The Cardinal Rule Against Data Leakage:**
> Any data transformation (e.g., calculating mean $\\mu$ and standard deviation $\\sigma$ for feature scaling) must be computed **ONLY from the training set** and then applied to the test set! Never scale before splitting!"""
                }
            ]
        },
        "eceg5407-ch2": {
            "courseId": "eceg5407",
            "courseCode": "ECEg5407",
            "chapterNum": 2,
            "title": "Supervised Learning: Foundations, Bias-Variance & 6 Core Models",
            "readTime": "15 min read",
            "cloRef": "CLO2: Implement and evaluate supervised learning classification and regression algorithms",
            "authoritativeSources": "Müller & Guido (Ch. 2); Bishop (Ch. 3-4); Géron (Ch. 4-5); AASTU Slide Deck Ch. 2",
            "sections": [
                {
                    "id": "ml-2-1",
                    "heading": "2.1 The Bias-Variance Tradeoff & Generalization Error Decomposition",
                    "content": """The fundamental challenge in supervised learning is balancing model complexity:

### Mathematical Decomposition of Expected Test Error:
For true data generating process $y = f(x) + \\epsilon$, where $\\mathbb{E}[\\epsilon] = 0$ and $\\text{Var}(\\epsilon) = \\sigma^2$:
$$\\mathbb{E}\\left[(y - \\hat{f}(x))^2\\right] = \\underbrace{\\left(\\text{Bias}[\\hat{f}(x)]\\right)^2}_{\\text{Underfitting}} + \\underbrace{\\text{Var}[\\hat{f}(x)]}_{\\text{Overfitting}} + \\underbrace{\\sigma^2}_{\\text{Irreducible Noise}}$$

1. **Bias (Underfitting):** Error introduced by approximating a complex real-world phenomenon with an overly simplistic model (e.g., fitting a straight line to quadratic data). High training error, high test error.
2. **Variance (Overfitting):** Sensitivity of the model to small fluctuations in the training dataset. The model memorizes training noise rather than the underlying pattern. Low training error, massive test error.
3. **Irreducible Error ($\\sigma^2$):** Noise inherent in the physical measurement process."""
                },
                {
                    "id": "ml-2-2",
                    "heading": "2.2 $k$-Nearest Neighbors ($k$-NN) Classification & Regression",
                    "content": """$k$-NN is a **non-parametric, instance-based (lazy learning)** algorithm. It constructs no explicit model during training; it simply stores the entire dataset.

### Algorithm Steps:
To predict target for query sample $x_q$:
1. Calculate Euclidean distance $d(x_q, x_i)$ to all training points:
   $$d(x_q, x_i) = \\sqrt{\\sum_{j=1}^d (x_{q,j} - x_{i,j})^2}$$
2. Select the $k$ closest training points $\\mathcal{N}_k(x_q)$.
3. **Classification:** Take the majority vote:
   $$\\hat{y} = \\arg\\max_c \\sum_{i \\in \\mathcal{N}_k} \\mathbb{I}(y_i = c)$$
4. **Regression:** Compute the local arithmetic average:
   $$\\hat{y} = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k} y_i$$

> [!NOTE]
> - Small $k$ (e.g., $k=1$): Extremely complex, jagged decision boundaries $\\implies$ **High Variance (Overfitting)**.
> - Large $k$ (e.g., $k=100$): Overly smooth, rigid boundaries $\\implies$ **High Bias (Underfitting)**."""
                },
                {
                    "id": "ml-2-3",
                    "heading": "2.3 Linear Regression, OLS Normal Equations & Regularization (L1 vs L2)",
                    "content": """Linear regression models output as a linear combination of input features:
$$\\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \\dots + w_d x_d = X w$$

### 1. Ordinary Least Squares (OLS) Closed-Form Solution:
Minimizes Residual Sum of Squares (RSS):
$$\\mathcal{L}_{OLS}(w) = \\|y - Xw\\|^2 \\implies \\nabla_w \\mathcal{L} = -2X^T (y - Xw) = 0$$
Yielding the **Normal Equation**:
$$w^* = (X^T X)^{-1} X^T y$$

---

### Regularization Techniques to Prevent Overfitting:
1. **Ridge Regression (L2 Regularization):**
   Adds squared penalty on weight magnitudes:
   $$\\mathcal{L}_{Ridge}(w) = \\|y - Xw\\|^2 + \\alpha \\sum_{j=1}^d w_j^2 = \\|y - Xw\\|^2 + \\alpha \\|w\\|_2^2$$
   Closed-form: $w_{Ridge} = (X^T X + \\alpha I)^{-1} X^T y$. Shrinks weights smoothly toward zero, mitigating collinearity.
2. **Lasso Regression (L1 Regularization):**
   Adds absolute value penalty:
   $$\\mathcal{L}_{Lasso}(w) = \\|y - Xw\\|^2 + \\alpha \\sum_{j=1}^d |w_j|$$
   > [!IMPORTANT]
   > Because the L1 constraint region is a diamond with sharp vertices, Lasso drives non-essential weights **identically to ZERO**! Lasso functions as an automatic **feature selection algorithm**."""
                },
                {
                    "id": "ml-2-4",
                    "heading": "2.4 Logistic Regression & Binary Cross-Entropy Loss",
                    "content": """Despite its name, Logistic Regression is a **probabilistic binary classification algorithm**.

### The Logistic / Sigmoid Function:
Maps any real value $z \\in (-\\infty, +\\infty)$ into a calibrated probability $p \\in (0, 1)$:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$
Where $z = w^T x + b$.

### Binary Cross-Entropy Loss (Log Loss):
Because Mean Squared Error (MSE) produces a non-convex loss surface with numerous local minima when combined with the sigmoid function, Logistic Regression utilizes the convex **Negative Log-Likelihood**:
$$\\mathcal{L}_{BCE}(w) = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i) \\right]$$
Optimized using Gradient Descent:
$$w := w - \\eta \\cdot \\frac{1}{n} X^T (\\sigma(Xw) - y)$$"""
                },
                {
                    "id": "ml-2-5",
                    "heading": "2.5 Decision Trees & Support Vector Machines (SVM)",
                    "content": """### 1. Decision Trees:
Hierarchical binary split models. At each node, the feature and split threshold are chosen to maximize **Information Gain** (minimizing node impurity):
- **Gini Impurity (CART algorithm default):**
  $$G = 1 - \\sum_{k=1}^K p_k^2$$
- **Shannon Entropy (ID3 / C4.5):**
  $$H = -\\sum_{k=1}^K p_k \\log_2(p_k)$$

### 2. Support Vector Machines (SVM):
Finds the unique hyperplane $w^T x + b = 0$ that separates classes while **maximizing the geometric margin** $\\frac{2}{\\|w\\|}$:
$$\\min_{w, b} \\frac{1}{2} \\|w\\|^2 \\quad \\text{subject to } y_i(w^T x_i + b) \\ge 1, \\ \\forall i$$
- **Support Vectors:** The critical training instances lying directly on the margin boundaries. All other data points can be deleted without altering the decision surface!
- **The Kernel Trick:** Maps linearly non-separable input vectors into an infinite-dimensional feature space using Mercer kernels without computing the explicit mapping:
  $$K(x, x') = e^{-\\gamma \\|x - x'\\|^2} \\quad (\\text{Radial Basis Function / RBF Kernel})$$"""
                }
            ]
        },
        "eceg5407-ch3": {
            "courseId": "eceg5407",
            "courseCode": "ECEg5407",
            "chapterNum": 3,
            "title": "Unsupervised Learning, Preprocessing & Dimensionality Reduction",
            "readTime": "12 min read",
            "cloRef": "CLO3: Implement clustering, preprocessing, and PCA dimensionality reduction",
            "authoritativeSources": "Müller & Guido (Ch. 3); Bishop (Ch. 9, 12); Géron (Ch. 8-9); AASTU Syllabus",
            "sections": [
                {
                    "id": "ml-3-1",
                    "heading": "3.1 Feature Preprocessing & Scaling Techniques",
                    "content": """Distance-based algorithms ($k$-NN, SVM, $k$-Means, PCA, Gradient Descent) are heavily distorted if features have mismatched numerical ranges (e.g., Age in $[20, 60]$ vs Annual Income in $[20,000, 200,000]$).

### Common Scalers in Scikit-Learn:
1. **StandardScaler (Z-Score Standardization):**
   Transforms features to have zero mean and unit variance:
   $$z = \\frac{x - \\mu}{\\sigma}$$
2. **MinMaxScaler:**
   Rescales features into a bounded interval $[0, 1]$:
   $$x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}$$
   Highly sensitive to extreme outliers.
3. **RobustScaler:**
   Uses median and Interquartile Range (IQR = $Q_3 - Q_1$), making it immune to extreme anomalies:
   $$x_{robust} = \\frac{x - Q_2}{Q_3 - Q_1}$$"""
                },
                {
                    "id": "ml-3-2",
                    "heading": "3.2 $k$-Means Clustering & The Elbow Method",
                    "content": """$k$-Means partitions $n$ unlabeled observations into $k$ distinct, non-overlapping clusters.

### Mathematical Objective (Inertia / WCSS):
Minimizes the Within-Cluster Sum of Squares (WCSS):
$$\\mathcal{J} = \\sum_{j=1}^k \\sum_{x_i \\in S_j} \\|x_i - \\mu_j\\|^2$$
Where $\\mu_j$ is the centroid (mean) of cluster $S_j$.

### Lloyd's Expectation-Maximization Iteration:
1. Initialize $k$ cluster centroids randomly (or via **$k$-Means++**, which spaces initial centroids far apart proportionally to squared distance).
2. **Assignment Step (E-step):** Assign each sample to its nearest centroid.
3. **Update Step (M-step):** Recompute each centroid as the arithmetic mean of all samples assigned to that cluster.
4. Repeat until centroids stop shifting.

### Determining Optimal $k$:
- **The Elbow Method:** Plot WCSS versus $k$. Select the bend ("elbow") where rate of inertia decrease levels off.
- **Silhouette Coefficient ($s$):** Measures cohesion vs separation:
  $$s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))} \\in [-1, +1]$$
  Values close to $+1$ indicate well-clustered points."""
                },
                {
                    "id": "ml-3-3",
                    "heading": "3.3 Hierarchical Clustering & DBSCAN Density Clustering",
                    "content": """### 1. Agglomerative Hierarchical Clustering:
Bottom-up clustering: Starts with each sample as an individual cluster; iteratively merges the closest pair of clusters until one master cluster remains.
Visualized via a **Dendrogram** (tree diagram where vertical branch height indicates distance between merged clusters).
- **Linkage Criteria:** Ward's linkage (minimizes variance growth), Complete linkage (max pairwise distance), Average linkage.

### 2. DBSCAN (Density-Based Spatial Clustering of Applications with Noise):
Groups points that are packed closely together, marking points that lie alone in low-density regions as **outlier noise**.
- Parameters: $\\epsilon$ (neighborhood radius) and `min_samples`.
- Categorizes points into:
  - **Core Points:** Have $\\ge \\text{min\\_samples}$ points within radius $\\epsilon$.
  - **Border Points:** Within $\\epsilon$ of a core point, but fewer than `min_samples` neighbors.
  - **Noise Points:** Neither core nor border points.
- *Advantage:* Discovers clusters of arbitrary non-convex geometric shapes; does not require specifying $k$ in advance!"""
                },
                {
                    "id": "ml-3-4",
                    "heading": "3.4 Principal Component Analysis (PCA) Derivation",
                    "content": """**Principal Component Analysis (PCA)** is an orthogonal linear transformation that projects high-dimensional data into a lower-dimensional subspace while preserving maximum variance.

### Mathematical Derivation via Covariance Eigen-Decomposition:
1. Zero-center the feature matrix: $X_{centered} = X - \\bar{X}$.
2. Compute the sample covariance matrix ($d \\times d$):
   $$\\Sigma = \\frac{1}{n - 1} X_{centered}^T X_{centered}$$
3. Perform Eigenvalue Decomposition on $\\Sigma$:
   $$\\Sigma v_i = \\lambda_i v_i$$
   Where $v_i$ are orthogonal eigenvectors (Principal Components) and $\\lambda_i$ are eigenvalues representing the variance explained along that axis.
4. Sort eigenvalues in descending order: $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_d$.
5. Construct projection matrix $W_k = [v_1, v_2, \\dots, v_k]$ ($d \\times k$).
6. Project data:
   $$X_{reduced} = X_{centered} \\cdot W_k \\in \\mathbb{R}^{n \\times k}$$

### Explained Variance Ratio:
$$\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{i=1}^d \\lambda_i}$$"""
                },
                {
                    "id": "ml-3-5",
                    "heading": "3.5 Non-Linear Dimensionality Reduction: t-SNE for Visualization",
                    "content": """While PCA finds linear projections, **t-SNE (t-Distributed Stochastic Neighbor Embedding)** captures non-linear manifold topologies:
- Converts Euclidean distances between data points into conditional probabilities representing similarities.
- Uses Student-t distribution in the low-dimensional space to solve the "crowding problem".
- Outstanding for creating 2D visualization scatter plots of complex high-dimensional datasets (e.g., MNIST digit clusters)."""
                }
            ]
        },
        "eceg5407-ch4": {
            "courseId": "eceg5407",
            "courseCode": "ECEg5407",
            "chapterNum": 4,
            "title": "Model Evaluation, Cross-Validation & Hyperparameter Tuning",
            "readTime": "12 min read",
            "cloRef": "CLO4: Evaluate ML models using cross-validation, confusion matrices, and ROC-AUC",
            "authoritativeSources": "Müller & Guido (Ch. 5); Géron (Ch. 2-3); AASTU Syllabus",
            "sections": [
                {
                    "id": "ml-4-1",
                    "heading": "4.1 Cross-Validation Protocols ($k$-Fold & Stratified)",
                    "content": """A single train-test split can yield misleading performance estimates due to lucky or unlucky data partitioning.

### $k$-Fold Cross-Validation:
1. Partition dataset randomly into $k$ equal-sized folds (typically $k = 5$ or $k = 10$).
2. Train on $k-1$ folds; evaluate on the remaining held-out fold.
3. Repeat $k$ times such that every fold serves as the validation test set exactly once.
4. Final performance is the mean and standard deviation:
   $$\\bar{P} = \\frac{1}{k} \\sum_{i=1}^k P_i \\pm \\sigma_P$$

### Stratified $k$-Fold Cross-Validation:
For imbalanced classification datasets (e.g., $95\\%$ benign, $5\\%$ malignant cancer), standard random splitting can create folds with zero minority samples.
**Stratified $k$-Fold** guarantees that every fold contains the exact same percentage proportion of each target class as the complete dataset."""
                },
                {
                    "id": "ml-4-2",
                    "heading": "4.2 Classification Metrics: The Confusion Matrix, Precision & Recall",
                    "content": """Accuracy ($\\frac{\\text{Correct}}{\\text{Total}}$) is completely misleading on skewed datasets (e.g., a model that always predicts \"no fraud\" achieves $99.9\\%$ accuracy on a fraud detection dataset).

### The Confusion Matrix:
| | Predicted Negative (0) | Predicted Positive (1) |
|---|---|---|
| **Actual Negative (0)** | **True Negative (TN)** | **False Positive (FP)** (Type I Error) |
| **Actual Positive (1)** | **False Negative (FN)** (Type II Error) | **True Positive (TP)** |

### Mathematical Metrics:
1. **Precision:** Out of all positive predictions, how many were genuinely positive?
   $$\\text{Precision} = \\frac{TP}{TP + FP}$$
   Crucial when False Positives are expensive (e.g., spam filter deleting critical emails).
2. **Recall / Sensitivity:** Out of all actual positive cases, how many did the model find?
   $$\\text{Recall} = \\frac{TP}{TP + FN}$$
   Crucial when False Negatives are fatal (e.g., cancer diagnosis, bridge crack detection).
3. **$F_1$-Score:** Harmonic mean of Precision and Recall:
   $$F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}$$"""
                },
                {
                    "id": "ml-4-3",
                    "heading": "4.3 ROC Curves, Precision-Recall Curves & Area Under Curve (AUC)",
                    "content": """Binary classifiers generate a continuous confidence score $\\hat{p} \\in [0, 1]$. Classifying as positive requires selecting a **Decision Threshold** (default = $0.5$).

### The Receiver Operating Characteristic (ROC) Curve:
Plots **True Positive Rate (Recall)** versus **False Positive Rate (FPR)** across all possible classification thresholds from $0.0$ to $1.0$:
$$\\text{TPR} = \\frac{TP}{TP + FN}, \\quad \\text{FPR} = \\frac{FP}{FP + TN}$$
- **Random Guessing:** Diagonal line from $(0,0)$ to $(1,1)$ with $\\text{AUC} = 0.50$.
- **Perfect Classifier:** Steps straight up to $(0,1)$ and right to $(1,1)$ with $\\text{AUC} = 1.00$."""
                },
                {
                    "id": "ml-4-4",
                    "heading": "4.4 Regression Performance Metrics: MAE, MSE, RMSE & $R^2$",
                    "content": """| Metric | Mathematical Formula | Physical Interpretation |
|---|---|---|
| **Mean Absolute Error (MAE)** | $\\frac{1}{n} \\sum_{i=1}^n \\|y_i - \\hat{y}_i\\|$ | Average magnitude of errors in original physical units; robust to outliers. |
| **Mean Squared Error (MSE)** | $\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2$ | Heavily penalizes large outlier errors due to squaring. |
| **Root Mean Squared Error (RMSE)** | $\\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}$ | Standard deviation of residuals; in original units. |
| **Coefficient of Determination ($R^2$)** | $1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}$ | Fraction of target variance explained by model ($R^2 \\le 1.0$). Baseline mean model has $R^2 = 0$. |"""
                },
                {
                    "id": "ml-4-5",
                    "heading": "4.5 Hyperparameter Tuning: GridSearchCV vs RandomizedSearchCV",
                    "content": """- **Parameters:** Learned automatically from data during training (weights $w$, bias $b$).
- **Hyperparameters:** Configured manually before training ($k$ in $k$-NN, tree depth, learning rate $\\eta$, regularization $\\alpha$).

### Tuning Strategies:
1. **GridSearchCV:** Exhaustively evaluates all Cartesian combinations of candidate values across $k$-fold cross-validation. Computationally expensive ($O(\\prod |V_i|)$).
2. **RandomizedSearchCV:** Samples a fixed budget of random hyperparameter combinations from specified statistical distributions. Significantly faster and frequently finds superior optima in high-dimensional spaces."""
                }
            ]
        },
        "eceg5407-ch5": {
            "courseId": "eceg5407",
            "courseCode": "ECEg5407",
            "chapterNum": 5,
            "title": "Deep Learning Fundamentals & Neural Networks",
            "readTime": "14 min read",
            "cloRef": "CLO5: Analyze artificial neural networks, backpropagation, and deep architectures",
            "authoritativeSources": "Ian Goodfellow, Yoshua Bengio, Aaron Courville: Deep Learning (MIT Press); Bishop (Ch. 5)",
            "sections": [
                {
                    "id": "ml-5-1",
                    "heading": "5.1 The Biological Neuron & The Artificial Perceptron",
                    "content": """Frank Rosenblatt (1958) created the **Perceptron**, the foundational building block of artificial neural networks:

### Mathematical Model of a Neuron:
Inputs $x_1, x_2, \\dots, x_d$ are multiplied by synaptic weights $w_j$, summed with bias $b$, and passed through non-linear activation function $f$:
$$z = \\sum_{j=1}^d w_j x_j + b = w^T x + b$$
$$a = f(z)$$

### The XOR Inseparability Crisis (Minsky & Papert 1969):
A single-layer perceptron can only learn **linearly separable decision boundaries**. Marvin Minsky proved that a single perceptron cannot learn the simple Exclusive-OR (XOR) logic gate, stalling neural network research for a decade until the discovery of Multi-Layer Perceptrons trained via Backpropagation."""
                },
                {
                    "id": "ml-5-2",
                    "heading": "5.2 Activation Functions Taxonomy & Vanishing Gradients",
                    "content": """Without non-linear activation functions, a neural network with 100 stacked layers is mathematically identical to a single linear regression model ($W_2(W_1 x) = W_{combined} x$).

| Activation Function | Formula | Output Range | Key Advantages & Fatal Vulnerabilities |
|---|---|---|---|
| **Sigmoid** | $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ | $(0, 1)$ | Smooth probabilistic interpretation. **Fatal: Vanishing Gradient Problem** (derivative saturates to 0 for $|z| > 4$, killing gradient flow). |
| **Tanh** | $\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1, +1)$ | Zero-centered outputs (speeds up gradient convergence). Still suffers from gradient saturation. |
| **ReLU (Rectified Linear)** | $\\max(0, z)$ | $[0, +\\infty)$ | **Modern Standard:** Constant derivative of 1 for $z > 0$, completely eliminating vanishing gradients! Blazing fast compute. Suffers from \"Dying ReLU\" if neurons get stuck below 0. |
| **Leaky ReLU** | $\\max(\\alpha z, z)$ | $(-\\infty, +\\infty)$ | Introduces small slope ($\\alpha = 0.01$) for $z < 0$, preventing dead neurons. |
| **Softmax** | $\\frac{e^{z_i}}{\\sum_j e^{z_j}}$ | $(0, 1); \\sum = 1$ | Exclusively used in the output layer for multi-class classification. |"""
                },
                {
                    "id": "ml-5-3",
                    "heading": "5.3 Multi-Layer Perceptrons & The Backpropagation Algorithm",
                    "content": """**Backpropagation** (Rumelhart, Hinton, Williams 1986) computes the exact partial derivatives of the scalar loss $\\mathcal{L}$ with respect to every weight in the network by applying the **Multivariate Chain Rule of Calculus** backwards:

### Forward Pass:
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = f(z^{[l]})$$

### Backward Pass (Propagating Errors):
For output layer $L$:
$$\\delta^{[L]} = \\frac{\\partial \\mathcal{L}}{\\partial z^{[L]}} = \\nabla_a \\mathcal{L} \\odot f'(z^{[L]})$$
For hidden layers $l = L-1, \\dots, 1$:
$$\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot f'(z^{[l]})$$
The gradient with respect to layer weights is the outer product:
$$\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T, \\quad \\frac{\\partial \\mathcal{L}}{\\partial b^{[l]}} = \\delta^{[l]}$$"""
                },
                {
                    "id": "ml-5-4",
                    "heading": "5.4 Deep Optimization Algorithms (SGD, Momentum, Adam)",
                    "content": """1. **Stochastic Gradient Descent (SGD):**
   Updates weights on small mini-batches of data:
   $$\\theta := \\theta - \\eta \\nabla_\\theta \\mathcal{L}(\\theta)$$
   Can oscillate violently across narrow ravines.
2. **Momentum Optimization:**
   Accelerates SGD in the direction of persistent gradients by accumulating velocity vector $v$:
   $$v := \\beta v + \\eta \\nabla_\\theta \\mathcal{L}, \\quad \\theta := \\theta - v$$
3. **Adam (Adaptive Moment Estimation - Kingma & Ba 2014):**
   Combines Momentum (first moment $m_t$) and RMSProp (uncentered second moment $v_t$) with bias correction:
   $$m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$$
   $$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$
   $$\\theta := \\theta - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t$$
   The de facto standard optimizer across modern deep learning."""
                },
                {
                    "id": "ml-5-5",
                    "heading": "5.5 Deep Regularization: Dropout & Batch Normalization",
                    "content": """- **Dropout (Srivastava & Hinton 2014):** During each training pass, randomly deactivates each neuron with probability $p$ (typically $p=0.5$). Prevents complex co-adaptations of neurons, acting as an ensemble of $2^N$ sub-networks.
- **Batch Normalization (Ioffe & Szegedy 2015):** Normalizes layer inputs across the mini-batch to zero mean and unit variance before the activation function:
  $$\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y = \\gamma \\hat{x} + \\beta$$
  Drastically mitigates internal covariate shift, allowing $10\\times$ higher learning rates."""
                }
            ]
        }
    }
