// ─────────────────────────────────────────────────────────────
// js/seed.js — ใส่ข้อมูลตัวอย่างจาก js/data.js ลง Firestore
// ใช้ครั้งเดียวตอนตั้งค่าสัปดาห์ที่ 6 (กดซ้ำได้ ข้อมูลจะถูกเขียนทับด้วยชุดเดิม)
//
// ⚠️ ไฟล์นี้โหลดแบบ <script type="module"> เพราะ import Firestore SDK
// ─────────────────────────────────────────────────────────────
import { db } from "./firebase-config.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

(function () {
  var ปุ่ม = document.getElementById("seedBtn");
  var กล่องล็อก = document.getElementById("log");

  function พิมพ์(ข้อความ, ระดับ) {
    var บรรทัด = document.createElement("div");
    บรรทัด.className = "alert alert-" + (ระดับ || "ok");
    บรรทัด.textContent = ข้อความ;
    กล่องล็อก.appendChild(บรรทัด);
  }

  ปุ่ม.addEventListener("click", async function () {
    ปุ่ม.disabled = true;
    กล่องล็อก.innerHTML = "";
    พิมพ์("เริ่มใส่ข้อมูลตัวอย่างลง Firestore…");

    try {
      // 📁 users
      for (var i = 0; i < window.LEAVE_DATA.users.length; i++) {
        var u = window.LEAVE_DATA.users[i];
        await setDoc(doc(db, "users", u.id), {
          name: u.name, email: u.email, role: u.role
        });
        พิมพ์("✅ users/" + u.id + " — " + u.name);
      }

      // 📁 leaveTypes
      for (var j = 0; j < window.LEAVE_DATA.leaveTypes.length; j++) {
        var lt = window.LEAVE_DATA.leaveTypes[j];
        await setDoc(doc(db, "leaveTypes", lt.id), { name: lt.name });
        พิมพ์("✅ leaveTypes/" + lt.id + " — " + lt.name);
      }

      // 📁 leaveRequests
      for (var k = 0; k < window.LEAVE_DATA.leaveRequests.length; k++) {
        var lr = window.LEAVE_DATA.leaveRequests[k];
        var lrId = lr.id;
        var lrข้อมูล = Object.assign({}, lr);
        delete lrข้อมูล.id;
        await setDoc(doc(db, "leaveRequests", lrId), lrข้อมูล);
        พิมพ์("✅ leaveRequests/" + lrId + " — " + lr.title);
      }

      // 📁 approvals — โฟลเดอร์ย่อยของแต่ละใบลาใน leaveRequests
      for (var m = 0; m < window.LEAVE_DATA.approvals.length; m++) {
        var ap = window.LEAVE_DATA.approvals[m];
        var apข้อมูล = Object.assign({}, ap);
        delete apข้อมูล.id;
        delete apข้อมูล.requestId;
        await setDoc(doc(db, "leaveRequests", ap.requestId, "approvals", ap.id), apข้อมูล);
        พิมพ์("✅ leaveRequests/" + ap.requestId + "/approvals/" + ap.id);
      }

      พิมพ์("🎉 ใส่ข้อมูลตัวอย่างเสร็จแล้ว — เปิด Firebase Console ดูได้เลย");
    } catch (err) {
      พิมพ์("❌ เกิดข้อผิดพลาด: " + err.message, "error");
    }

    ปุ่ม.disabled = false;
  });
})();
