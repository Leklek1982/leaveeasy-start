// ─────────────────────────────────────────────────────────────
// js/firebase-config.js — ตั้งค่าการเชื่อมต่อ Firebase (ใช้ Firestore)
// เริ่มใช้ตั้งแต่สัปดาห์ที่ 6
//
// ⚠️ ไฟล์นี้ต้องถูกโหลดด้วย <script type="module"> เท่านั้น เพราะใช้ import
//    ไฟล์ที่จะเรียกใช้ db (เช่น js/leave-requests.js, js/seed.js) ก็ต้องเป็น
//    type="module" เหมือนกัน แล้ว import { db } from "./firebase-config.js"
// ─────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ค่าตั้งต้นของโปรเจกต์ leaveeasy-6910115 ใน Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDydxqPXu_e2D-zdWUzHl5xlba3SwcxOss",
  authDomain: "leaveeasy-6910115.firebaseapp.com",
  projectId: "leaveeasy-6910115",
  storageBucket: "leaveeasy-6910115.firebasestorage.app",
  messagingSenderId: "1096311805332",
  appId: "1:1096311805332:web:49261119839443a4d8ab81"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
