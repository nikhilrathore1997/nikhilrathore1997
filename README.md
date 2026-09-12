<!-- HEADER -->
<h1 align="center">Hi 👋, I'm Nikhil Rathore</h1>
<h3 align="center">Computer Vision Engineer | Edge AI | Production Surveillance Systems</h3>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&pause=1000&color=2E9EF7&center=true&vCenter=true&width=650&lines=Computer+Vision+Engineer+%7C+4%2B+Years;Face+Recognition+%40+70+Lakh%2B+Identity+Scale;Edge+AI+%7C+OpenVINO+%7C+TensorRT+%7C+CUDA;Real-Time+CCTV+%26+Video+Analytics" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://nikhilrathore1997.github.io/nikhilrathore1997/">
    <img src="https://img.shields.io/badge/🌐_Live_Portfolio-View_Site-2E9EF7?style=for-the-badge" alt="Live Portfolio" />
  </a>
  <a href="https://github.com/nikhilrathore1997/nikhilrathore1997/raw/main/assets/Nikhil_Rathore_Resume.pdf">
    <img src="https://img.shields.io/badge/📄_Resume-Download-7c5cff?style=for-the-badge" alt="Download Resume" />
  </a>
  <a href="https://linkedin.com/in/nikhil-rathore-98416b1ba">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="mailto:nikhilrathore021997@gmail.com">
    <img src="https://img.shields.io/badge/Email-Say_Hi-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=nikhilrathore1997&color=2E9EF7&style=flat&label=Profile+Views" alt="Profile views" />
</p>

---

## 🧠 About Me

- 🔭 Currently building a **modular CCTV analytics platform** — RTSP → YOLOv8 → FastAPI → AWS
- 💼 4+ years shipping production computer vision systems for **banking, retail & surveillance**
- ⚡ Specialized in the **full pipeline**: train → optimize → edge deploy → integrate
- 🏦 Built face recognition at **70 lakh+ identity scale** using ArcFace + HNSW
- 🍓 Deployed a Person Re-ID tracker on **Raspberry Pi at 4 FPS** via OpenVINO INT8
- 🎓 MCA from **National Institute of Technology, Warangal** (2018 – 2021)
- 📫 Reach me at: **nikhilrathore021997@gmail.com**

---

## 🛠️ Tech Stack

**Languages**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=flat&logo=c%2B%2B&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)

**Deep Learning & Computer Vision**

![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-D00000?style=flat&logo=keras&logoColor=white)
![HuggingFace](https://img.shields.io/badge/🤗_HuggingFace-FFD21E?style=flat)
![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=flat&logo=OpenCV&logoColor=white)
![YOLO](https://img.shields.io/badge/YOLOv8-00FFFF?style=flat&logoColor=black)

**Optimization & Edge Deployment**

![TensorRT](https://img.shields.io/badge/TensorRT-76B900?style=flat&logo=nvidia&logoColor=white)
![OpenVINO](https://img.shields.io/badge/OpenVINO-0071C5?style=flat&logo=intel&logoColor=white)
![ONNX](https://img.shields.io/badge/ONNX-005CED?style=flat&logo=onnx&logoColor=white)
![CUDA](https://img.shields.io/badge/CUDA-76B900?style=flat&logo=nvidia&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-A22846?style=flat&logo=raspberrypi&logoColor=white)

**Backend & Infrastructure**

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 🚀 Featured Projects

### 🏦 Face Recognition System for Banking (FRS)
> Real-time customer identification from live CCTV — 70 lakh+ enrolled identities

- **Model**: ArcFace (glint360k) + RetinaFace detection
- **Scale**: 70L+ registered faces with **HNSW approximate nearest neighbor** indexing
- **Inference**: TensorRT GPU engine + face quality filtering on registration
- **Output**: Customer account + tier (A/A+/B/B++) pushed to branch manager in real-time
- **Integration**: Delivered as a C++ JNI library (.so + .jar) for a Java banking application
- `ArcFace` `TensorRT` `HNSW` `C++` `JNI` `OpenCV`

### 🔁 Custom Person Re-ID + Edge Tracker
> Trained from scratch → INT8 quantized → 4 FPS on Raspberry Pi in production

- **Model**: ResNet-50 + ArcFace head + Batch-Hard Triplet Loss + CrossEntropy
- **Sampling**: RandomIdentitySampler for balanced identity batches
- **Optimization**: GPU TensorRT → OpenVINO INT8 → Raspberry Pi deployment
- **Result**: 4 FPS on Pi, live at multiple bank & retail sites
- **Tracker**: C++ multi-object tracker compiled as a JNI library
- `PyTorch` `OpenVINO` `TensorRT` `C++` `JNI` `Raspberry Pi`

### 🤝 Automated Frisking Compliance System
> Novel keypoint-based algorithm — no existing solution, designed from scratch

- **Approach**: Human pose estimation + minimum distance between guard hands and employee keypoints
- **Logic**: Tracks coverage — flags incomplete frisking (<90%) with supervisor notification
- **Impact**: Fully replaces manual CCTV monitoring at bank entry points
- `Pose Estimation` `OpenCV` `Python` `Real-Time Detection`

### 📡 Modular CCTV Intelligence Platform *(In Progress)*
> Productizing surveillance AI as deployable microservices — live on AWS

- **Stack**: RTSP ingestion → YOLOv8 → Redis state → FastAPI → WebSocket dashboard
- **Deployed**: AWS Free Tier
- **Goal**: Package detection modules (intrusion, crowd, anomaly) for SME customers
- [`View Repo`](https://github.com/nikhilrathore1997/cctv-platform)
- `FastAPI` `YOLOv8` `Docker` `Redis` `AWS` `WebSocket`

<details>
<summary><b>More projects</b> — gate counters, quality models & site analytics suite</summary>
<br>

- **Gate-Level People Counter** — object tracking + re-identification with a real-time web client for event visualization.
- **Face Quality Model** — filters good vs. bad quality face captures at registration to boost recognition accuracy.
- **Int8 Person-Vehicle Motion Detection** — motion-triggered detection on a quantized Int8 IR model for efficient always-on monitoring.
- **AI Inference Monitoring Tool** — a web dashboard to run and monitor server-side inference across models, sites and date ranges.
- **Site Analytics Suite** — camera tampering detection, gender/vehicle/weapon detection, object color prediction, no-video detection, image quality enhancement, and staff detection, shipped across live customer sites.

</details>

---

## 🎓 Education & Achievements

- **Master of Computer Application**, National Institute of Technology, Warangal — July 2018 to June 2021
- 🏅 256 AIR — NIMCET MCA Entrance Exam (2018)
- 🏅 27 AIR — VIT MCA Entrance Exam (2018)
- 📜 Certified in Problem Solving by HackerRank

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=nikhilrathore1997&show_icons=true&theme=tokyonight&hide_border=true" width="48%" alt="Nikhil's GitHub stats" />
  <img src="https://streak-stats.demolab.com/?user=nikhilrathore1997&theme=tokyonight&hide_border=true" width="48%" alt="Nikhil's GitHub streak" />
</p>
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=nikhilrathore1997&layout=compact&theme=tokyonight&hide_border=true" width="40%" alt="Top languages" />
</p>

---

## 🤝 Connect With Me

<p align="left">
  <a href="https://linkedin.com/in/nikhil-rathore-98416b1ba" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:nikhilrathore021997@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://nikhilrathore1997.github.io/nikhilrathore1997/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-2E9EF7?style=for-the-badge&logo=googlechrome&logoColor=white" />
  </a>
</p>

<p align="center">
  <i>"I don't just train models — I ship them to production."</i>
</p>
