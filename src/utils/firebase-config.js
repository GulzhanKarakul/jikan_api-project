// Импортируем необходимые функции из SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Конфигурация вашего веб-приложения в Firebase
// Для Firebase JS SDK версии 7.20.0 и новее, параметр measurementId необязателен
const firebaseConfig = {
  apiKey: "AIzaSyDmhEXxewSuRkeuUjwf1mhFj5g2JUG47bk",         // Ключ API вашего проекта Firebase
  authDomain: "anime-website-5a7b4.firebaseapp.com",         // Домен вашего приложения в Firebase
  projectId: "anime-website-5a7b4       ",                   // Идентификатор проекта Firebase
  storageBucket: "anime-website-5a7b4.appspot.com",          // Бакет (контейнер для хранения файлов) в Firebase Storage
  messagingSenderId: "21995325291",                          // Идентификатор отправителя для Firebase Cloud Messaging
  appId: "1:21995325291:web:9bbf89822bd730b090ee2e",         // Идентификатор приложения Firebase
  measurementId: "G-6VJY20XL68"                              // Идентификатор измерения (необязательно)
};

// Инициализация Firebase с использованием конфигурации
const app = initializeApp(firebaseConfig);

// Получение объекта аутентификации Firebase
export const firebaseAuth = getAuth(app);
